"use client";

import { QuizQuestion } from "@/types";

interface QuizCardProps {
  question: QuizQuestion;
  value: number | undefined;
  onAnswer: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const LABELS = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

export default function QuizCard({
  question,
  value,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuizCardProps) {
  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 leading-snug">
        {question.text}
      </h2>

      {/* Rating scale */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onAnswer(rating)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
              value === rating
                ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100"
                : "border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                value === rating
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {rating}
            </div>
            <span
              className={`font-medium ${
                value === rating ? "text-indigo-700" : "text-gray-600"
              }`}
            >
              {LABELS[rating - 1]}
            </span>
            {value === rating && (
              <svg
                className="ml-auto w-5 h-5 text-indigo-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
