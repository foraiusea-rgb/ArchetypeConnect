import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to ArchetypeConnect with GitHub, Google, or continue as a guest.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
