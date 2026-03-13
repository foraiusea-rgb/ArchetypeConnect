import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archetype Groups",
  description: "Browse the 12 creator archetype groups. Find creators who share your core archetype and connect.",
  openGraph: {
    title: "Archetype Groups | ArchetypeConnect",
    description: "12 archetype groups for creators to connect and collaborate.",
  },
};

export default function GroupsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
