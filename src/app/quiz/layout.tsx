import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Archetype Quiz",
  description: "Take a 2-minute personality quiz to discover your creator archetype chord. 12 questions, instant results, shareable identity.",
  openGraph: {
    title: "Creator Archetype Quiz | ArchetypeConnect",
    description: "Take a 2-minute personality quiz to discover your creator archetype chord.",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
