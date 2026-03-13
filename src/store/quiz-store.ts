"use client";

import { create } from "zustand";
import { QuizAnswer, ArchetypeScore, ArchetypeChord, Identity } from "@/types";

interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  scores: ArchetypeScore[] | null;
  chord: ArchetypeChord | null;
  identity: Identity | null;
  resultId: string | null;
  isCompleted: boolean;

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
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuestion: 0,
  answers: [],
  scores: null,
  chord: null,
  identity: null,
  resultId: null,
  isCompleted: false,

  setAnswer: (questionId, value) => {
    const { answers } = get();
    const existing = answers.findIndex((a) => a.questionId === questionId);
    const updated =
      existing >= 0
        ? answers.map((a, i) => (i === existing ? { ...a, value } : a))
        : [...answers, { questionId, value }];
    set({ answers: updated });
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
    set({ scores, chord, identity, resultId, isCompleted: true });
  },

  reset: () => {
    set({
      currentQuestion: 0,
      answers: [],
      scores: null,
      chord: null,
      identity: null,
      resultId: null,
      isCompleted: false,
    });
  },
}));
