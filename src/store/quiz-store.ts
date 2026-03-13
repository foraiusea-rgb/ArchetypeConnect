"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuizAnswer, ArchetypeScore, ArchetypeChord, Identity } from "@/types";

interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  scores: ArchetypeScore[] | null;
  chord: ArchetypeChord | null;
  identity: Identity | null;
  resultId: string | null;
  isCompleted: boolean;
  isSubmitting: boolean;
  error: string | null;

  setAnswer: (questionId: number, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  setResults: (
    scores: ArchetypeScore[],
    chord: ArchetypeChord,
    identity: Identity,
    resultId: string
  ) => void;
  setSubmitting: (val: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  currentQuestion: 0,
  answers: [] as QuizAnswer[],
  scores: null as ArchetypeScore[] | null,
  chord: null as ArchetypeChord | null,
  identity: null as Identity | null,
  resultId: null as string | null,
  isCompleted: false,
  isSubmitting: false,
  error: null as string | null,
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAnswer: (questionId, value) => {
        const { answers } = get();
        const existing = answers.findIndex((a) => a.questionId === questionId);
        const updated =
          existing >= 0
            ? answers.map((a, i) => (i === existing ? { ...a, value } : a))
            : [...answers, { questionId, value }];
        set({ answers: updated, error: null });
      },

      nextQuestion: () => {
        set((state) => ({ currentQuestion: state.currentQuestion + 1 }));
      },

      prevQuestion: () => {
        set((state) => ({
          currentQuestion: Math.max(0, state.currentQuestion - 1),
        }));
      },

      goToQuestion: (index) => {
        set({ currentQuestion: index });
      },

      setResults: (scores, chord, identity, resultId) => {
        set({ scores, chord, identity, resultId, isCompleted: true, isSubmitting: false });
      },

      setSubmitting: (val) => set({ isSubmitting: val }),

      setError: (error) => set({ error, isSubmitting: false }),

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "archetype-quiz",
      partialize: (state) => ({
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        scores: state.scores,
        chord: state.chord,
        identity: state.identity,
        resultId: state.resultId,
        isCompleted: state.isCompleted,
      }),
    }
  )
);
