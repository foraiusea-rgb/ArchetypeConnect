import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meetings",
  description: "Browse, create, and join meetings with compatible creators. Peer learning, collaboration, and mastermind sessions.",
  openGraph: {
    title: "Creator Meetings | ArchetypeConnect",
    description: "Browse and join personality-matched creator meetings.",
  },
};

export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
