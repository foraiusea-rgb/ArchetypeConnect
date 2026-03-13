import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { ARCHETYPES, ARCHETYPE_NAMES } from "@/lib/archetypes";

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
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent dark mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900 text-gray-700 dark:text-gray-100">
        <Providers>
          <ToastProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#D4654A] focus:text-white focus:rounded-lg"
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
    <footer className="border-t border-black/[0.06] dark:border-slate-700 bg-white dark:bg-slate-900 mt-24" role="contentinfo">
      {/* Archetype rainbow stripe */}
      <div className="flex h-[3px]">
        {ARCHETYPE_NAMES.map((name) => (
          <div key={name} className="flex-1" style={{ backgroundColor: ARCHETYPES[name].color }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-xl text-[#1A1A2E] dark:text-gray-100">
                Archetype<span className="text-[#D4654A]">Connect</span>
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mb-4">
              A personality-based platform for creators, makers, educators, and thinkers
              to discover their archetype identity and connect with compatible minds.
            </p>
            <a
              href="/quiz"
              className="inline-flex px-5 py-2.5 rounded-xl bg-[#D4654A] text-white text-sm font-semibold hover:bg-[#C05A42] transition-colors shadow-sm"
            >
              Take the Quiz
            </a>
          </div>
          <div>
            <h4 className="font-semibold text-[#1A1A2E] dark:text-gray-100 mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="/quiz" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Take the Quiz</a></li>
              <li><a href="/groups" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Archetype Groups</a></li>
              <li><a href="/meetings" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Meetings</a></li>
              <li><a href="/community" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Community Stats</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#1A1A2E] dark:text-gray-100 mb-3">About</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="/about" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">How It Works</a></li>
              <li><a href="/methodology" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Our Methodology</a></li>
              <li><a href="/privacy" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-black/[0.06] dark:border-slate-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
          <p>&copy; 2026 ArchetypeConnect. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Terms</a>
            <a href="/methodology" className="hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">Methodology</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
