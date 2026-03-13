"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizCard from "@/components/QuizCard";
import { useQuizStore } from "@/store/quiz-store";
import { useToast } from "@/components/Toast";
import { QUIZ_QUESTIONS, calculateScores, getChord } from "@/lib/quiz";
import { generateIdentity } from "@/lib/identity";
import { ARCHETYPES, ARCHETYPE_NAMES } from "@/lib/archetypes";
import ArchetypeIcon from "@/components/ArchetypeIcon";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const ANALYZING_STEPS = [
  "Calculating your scores...",
  "Finding your chord...",
  "Generating your identity...",
];

export default function QuizPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showIntro, setShowIntro] = useState(true);
  const [direction, setDirection] = useState(1);
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const prevQuestion = useRef(0);
  const {
    currentQuestion,
    answers,
    isSubmitting,
    isCompleted,
    resultId,
    setAnswer,
    nextQuestion,
    prevQuestion: goToPrev,
    setResults,
    setSubmitting,
    setError,
  } = useQuizStore();

  if (isCompleted && resultId) {
    router.push(`/results/${resultId}`);
    return null;
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const currentAnswer = answers.find((a) => a.questionId === question?.id)?.value;
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;
  const allAnswered = answers.length === QUIZ_QUESTIONS.length;
  const progressPercent = Math.round((answers.length / QUIZ_QUESTIONS.length) * 100);

  const handleSubmit = useCallback(async () => {
    const scores = calculateScores(answers);
    const chord = getChord(scores);
    const identity = generateIdentity(chord);

    setSubmitting(true);
    setAnalyzingStep(0);
    const interval = setInterval(() => {
      setAnalyzingStep((prev) => Math.min(prev + 1, ANALYZING_STEPS.length - 1));
    }, 1200);

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, scores, chord, identity }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit quiz");
      }

      const data = await res.json();
      setResults(scores, chord, identity, data.id);
      toast("Your creator identity has been revealed!", "success");
      router.push(`/results/${data.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      toast(message, "error");
    } finally {
      clearInterval(interval);
    }
  }, [answers, setSubmitting, setResults, setError, toast, router]);

  const handleAnswer = (value: number) => {
    if (!question) return;
    setAnswer(question.id, value);
    if (!isLastQuestion) {
      setTimeout(() => {
        prevQuestion.current = currentQuestion;
        setDirection(1);
        nextQuestion();
      }, 400);
    }
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    if (isLastQuestion && allAnswered) {
      handleSubmit();
    } else {
      prevQuestion.current = currentQuestion;
      setDirection(1);
      nextQuestion();
    }
  };

  const handlePrev = () => {
    prevQuestion.current = currentQuestion;
    setDirection(-1);
    goToPrev();
  };

  if (!question) return null;

  // Analyzing overlay
  if (isSubmitting) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#FAF8F5] dark:bg-slate-900">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-[#FEF0EC] dark:border-[#D4654A]/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#D4654A] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={28} className="text-[#D4654A] dark:text-[#E8806A]" />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={analyzingStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg font-medium text-gray-500 dark:text-gray-400"
            >
              {ANALYZING_STEPS[analyzingStep]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Intro screen
  if (showIntro) {
    return (
      <div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden"
        style={{ background: "#FAF8F5" }}
      >
        <div className="w-full max-w-lg mx-auto px-4 py-12 text-center relative z-10">
          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-black/[0.06] dark:border-slate-700 shadow-xl p-10">
            <Sparkles size={36} className="text-[#D4654A] mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-4 font-display">
              Creator Archetype Quiz
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
              Discover your unique creator identity through{" "}
              <strong className="text-gray-700 dark:text-gray-200">{QUIZ_QUESTIONS.length} quick questions</strong>.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
              Rate each statement from 1 (not me at all) to 5 (that&apos;s totally me).
              Takes about 2 minutes. Your progress is saved automatically.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setShowIntro(false)}
                className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4654A] text-white font-semibold text-lg hover:bg-[#C05A42] transition-all shadow-xl shadow-[#D4654A]/20 dark:shadow-[#D4654A]/10"
              >
                {answers.length > 0 ? "Continue Quiz" : "Start Quiz"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              {answers.length > 0 && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  You&apos;ve answered {answers.length} of {QUIZ_QUESTIONS.length} questions
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Floating archetype constellation */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {ARCHETYPE_NAMES.slice(0, 6).map((name, i) => {
            const arch = ARCHETYPES[name];
            const positions = [
              { x: 10, y: 20 }, { x: 85, y: 15 }, { x: 8, y: 75 },
              { x: 90, y: 70 }, { x: 50, y: 8 }, { x: 45, y: 88 },
            ];
            return (
              <div
                key={name}
                className="absolute opacity-[0.12] animate-float"
                style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%`, animationDelay: `${i * 0.8}s` }}
              >
                <ArchetypeIcon name={name} size={32} color={arch.color} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center transition-colors duration-700"
      style={{ background: "#FAF8F5" }}
    >
      <div className="w-full max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-sm font-semibold text-[#D4654A] dark:text-[#E8806A] uppercase tracking-wider mb-2 font-display">
            Creator Archetype Quiz
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Rate each statement on a scale of 1 to 5
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-black/[0.06] dark:border-slate-700 shadow-lg p-8 md:p-10">
          <QuizCard
            question={question}
            value={currentAnswer}
            onAnswer={handleAnswer}
            questionNumber={currentQuestion + 1}
            totalQuestions={QUIZ_QUESTIONS.length}
            direction={direction}
          />

          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="group inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Go to previous question"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!currentAnswer || isSubmitting}
              className="group inline-flex items-center gap-1.5 px-8 py-2.5 rounded-xl bg-[#D4654A] text-white text-sm font-semibold hover:bg-[#C05A42] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#D4654A]/20 dark:shadow-[#D4654A]/10"
              aria-label={isLastQuestion && allAnswered ? "Submit quiz and see results" : "Go to next question"}
            >
              {isLastQuestion && allAnswered ? "See Results" : "Next"}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
