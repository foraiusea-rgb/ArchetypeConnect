import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "ArchetypeConnect — Discover Your Creator Identity",
  description:
    "Take a personality quiz, discover your creator archetype, join compatible groups, and schedule meetings with like-minded creators.",
  openGraph: {
    title: "ArchetypeConnect — Discover Your Creator Identity",
    description: "Take a 2-minute quiz, get your archetype chord, and connect with compatible creators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ToastProvider>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-gray-200/50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2" aria-label="ArchetypeConnect home">
            <span className="text-2xl" aria-hidden="true">&#10022;</span>
            <span className="text-xl font-bold gradient-text">
              ArchetypeConnect
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <a href="/quiz" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Take Quiz
            </a>
            <a href="/groups" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Groups
            </a>
            <a href="/meetings" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Meetings
            </a>
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Dashboard
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors hidden sm:block"
            >
              Sign In
            </a>
            <a
              href="/quiz"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-24" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl" aria-hidden="true">&#10022;</span>
              <span className="text-lg font-bold gradient-text">ArchetypeConnect</span>
            </div>
            <p className="text-gray-500 text-sm max-w-md">
              Discover your creator archetype, connect with compatible minds,
              and collaborate through personality-matched meetings.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/quiz" className="hover:text-indigo-600 transition-colors">Take Quiz</a></li>
              <li><a href="/groups" className="hover:text-indigo-600 transition-colors">Groups</a></li>
              <li><a href="/meetings" className="hover:text-indigo-600 transition-colors">Meetings</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">About</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</a></li>
              <li><a href="/#archetypes" className="hover:text-indigo-600 transition-colors">Archetypes</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-8 text-center text-sm text-gray-400">
          &#169; 2026 ArchetypeConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
