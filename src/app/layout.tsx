import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/Header";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "ArchetypeConnect — Discover Your Creator Archetype",
    template: "%s | ArchetypeConnect",
  },
  description:
    "Take a 2-minute personality quiz to discover your creator archetype, get a unique identity name, and connect with compatible creators.",
  openGraph: {
    title: "ArchetypeConnect — Discover Your Creator Archetype",
    description:
      "Take a 2-minute personality quiz. Get your archetype chord. Connect with compatible creators.",
    type: "website",
    siteName: "ArchetypeConnect",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArchetypeConnect — Discover Your Creator Archetype",
    description:
      "Take a 2-minute personality quiz. Get your archetype chord. Connect with compatible creators.",
  },
  robots: {
    index: true,
    follow: true,
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
        <Providers>
          <ToastProvider>
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
        </Providers>
      </body>
    </html>
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
            <p className="text-gray-500 text-sm max-w-md mb-4">
              A personality-based platform for creators, makers, educators, and thinkers
              to discover their archetype identity and connect with compatible minds.
            </p>
            <p className="text-xs text-gray-400">
              Built for anyone who creates, teaches, builds, or thinks for a living.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/quiz" className="hover:text-indigo-600 transition-colors">Take the Quiz</a></li>
              <li><a href="/groups" className="hover:text-indigo-600 transition-colors">Archetype Groups</a></li>
              <li><a href="/meetings" className="hover:text-indigo-600 transition-colors">Meetings</a></li>
              <li><a href="/community" className="hover:text-indigo-600 transition-colors">Community Stats</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">About</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/about" className="hover:text-indigo-600 transition-colors">How It Works</a></li>
              <li><a href="/methodology" className="hover:text-indigo-600 transition-colors">Our Methodology</a></li>
              <li><a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&#169; 2026 ArchetypeConnect. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="/methodology" className="hover:text-indigo-600 transition-colors">Methodology</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
