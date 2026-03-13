"use client";

import { QuizQuestion } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface QuizCardProps {
  question: QuizQuestion;
  value: number | undefined;
  onAnswer: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
  direction?: number;
}

const LABELS = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

export default function QuizCard({
  question,
  value,
  onAnswer,
  questionNumber,
  totalQuestions,
  direction = 1,
}: QuizCardProps) {
  const progressPercent = Math.round(((questionNumber - 1) / totalQuestions) * 100);

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`Quiz progress: ${progressPercent}%`}>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span className="font-medium">Question {questionNumber} of {totalQuestions}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-500 rounded-full"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </div>
        {/* Step dots */}
        <div className="flex justify-between mt-2 px-0.5">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i < questionNumber - 1
                  ? "bg-indigo-500"
                  : i === questionNumber - 1
                  ? "bg-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800"
                  : "bg-gray-200 dark:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question with slide animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10 leading-snug" id="quiz-question">
            {question.text}
          </h2>

          <fieldset aria-labelledby="quiz-question">
            <legend className="sr-only">Rate this statement from 1 (Strongly Disagree) to 5 (Strongly Agree)</legend>
            <div className="space-y-3" role="radiogroup">
              {[1, 2, 3, 4, 5].map((rating) => (
                <motion.button
                  key={rating}
                  onClick={() => onAnswer(rating)}
                  role="radio"
                  aria-checked={value === rating}
                  aria-label={`${rating}: ${LABELS[rating - 1]}`}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    value === rating
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md shadow-indigo-100 dark:shadow-indigo-900/20"
                      : "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    value === rating ? "bg-indigo-500 text-white" : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                  }`}>
                    {rating}
                  </div>
                  <span className={`font-medium ${value === rating ? "text-indigo-700 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300"}`}>
                    {LABELS[rating - 1]}
                  </span>
                  {value === rating && (
                    <motion.div className="ml-auto shrink-0" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
                      <Check size={18} className="text-indigo-500" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </fieldset>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
