"use client";

import { useRouter } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import { useQuizStore } from "@/store/quiz-store";
import { QUIZ_QUESTIONS, calculateScores, getChord } from "@/lib/quiz";
import { generateIdentity } from "@/lib/identity";

export default function QuizPage() {
  const router = useRouter();
  const {
    currentQuestion,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    setResults,
  } = useQuizStore();

  const question = QUIZ_QUESTIONS[currentQuestion];
  const currentAnswer = answers.find(
    (a) => a.questionId === question?.id
  )?.value;
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;
  const allAnswered = answers.length === QUIZ_QUESTIONS.length;

  const handleAnswer = (value: number) => {
    if (!question) return;
    setAnswer(question.id, value);
  };

  const handleNext = async () => {
    if (!currentAnswer) return;

    if (isLastQuestion && allAnswered) {
      // Calculate results
      const scores = calculateScores(answers);
      const chord = getChord(scores);
      const identity = generateIdentity(chord);

      // Submit to API
      try {
        const res = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, scores, chord, identity }),
        });
        const data = await res.json();
        setResults(scores, chord, identity, data.id);
        router.push(`/results/${data.id}`);
      } catch {
        // Fallback: generate a client-side ID
        const fallbackId = Math.random().toString(36).substring(2, 10);
        setResults(scores, chord, identity, fallbackId);
        router.push(`/results/${fallbackId}`);
      }
    } else {
      nextQuestion();
    }
  };

  if (!question) return null;

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
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="px-8 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
            >
              {isLastQuestion && allAnswered ? "See Results" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
