"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import QuizCard from "@/components/QuizCard";
import { useQuizStore } from "@/store/quiz-store";
import { useToast } from "@/components/Toast";
import { QUIZ_QUESTIONS, calculateScores, getChord } from "@/lib/quiz";
import { generateIdentity } from "@/lib/identity";

export default function QuizPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showIntro, setShowIntro] = useState(true);
  const {
    currentQuestion,
    answers,
    isSubmitting,
    isCompleted,
    resultId,
    setAnswer,
    nextQuestion,
    prevQuestion,
    setResults,
    setSubmitting,
    setError,
  } = useQuizStore();

  // If quiz was already completed, redirect to results
  if (isCompleted && resultId) {
    router.push(`/results/${resultId}`);
    return null;
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const currentAnswer = answers.find(
    (a) => a.questionId === question?.id
  )?.value;
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;
  const allAnswered = answers.length === QUIZ_QUESTIONS.length;

  const handleSubmit = useCallback(async () => {
    const scores = calculateScores(answers);
    const chord = getChord(scores);
    const identity = generateIdentity(chord);

    setSubmitting(true);
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
    }
  }, [answers, setSubmitting, setResults, setError, toast, router]);

  const handleAnswer = (value: number) => {
    if (!question) return;
    setAnswer(question.id, value);

    // Auto-advance after a short delay for visual feedback
    if (!isLastQuestion) {
      setTimeout(() => {
        nextQuestion();
      }, 400);
    }
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    if (isLastQuestion && allAnswered) {
      handleSubmit();
    } else {
      nextQuestion();
    }
  };

  if (!question) return null;

  // Onboarding intro screen
  if (showIntro) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10">
            <div className="text-5xl mb-6" aria-hidden="true">&#10022;</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Creator Archetype Quiz
            </h1>
            <p className="text-gray-500 mb-3 leading-relaxed">
              Discover your unique creator identity through{" "}
              <strong>{QUIZ_QUESTIONS.length} quick questions</strong>.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Rate each statement from 1 (not me at all) to 5 (that&apos;s totally me).
              Takes about 2 minutes. Your progress is saved automatically.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setShowIntro(false)}
                className="w-full px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
              >
                {answers.length > 0 ? "Continue Quiz" : "Start Quiz"} &#8594;
              </button>
              {answers.length > 0 && (
                <p className="text-xs text-gray-400">
                  You&apos;ve answered {answers.length} of {QUIZ_QUESTIONS.length} questions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Creator Archetype Quiz
          </h1>
          <p className="text-gray-500">
            Rate each statement on a scale of 1 to 5
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-10">
          <QuizCard
            question={question}
            value={currentAnswer}
            onAnswer={handleAnswer}
            questionNumber={currentQuestion + 1}
            totalQuestions={QUIZ_QUESTIONS.length}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Go to previous question"
            >
              &#8592; Back
            </button>
            <button
              onClick={handleNext}
              disabled={!currentAnswer || isSubmitting}
              className="px-8 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
              aria-label={isLastQuestion && allAnswered ? "Submit quiz and see results" : "Go to next question"}
            >
              {isSubmitting
                ? "Analyzing..."
                : isLastQuestion && allAnswered
                ? "See Results"
                : "Next \u2192"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
