"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Sparkles } from "lucide-react";
import { ARCHETYPES, ARCHETYPE_NAMES } from "@/lib/archetypes";
import ArchetypeIcon from "@/components/ArchetypeIcon";

export default function LoginPage() {
  const [guestName, setGuestName] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const handleOAuth = async (provider: string) => {
    setLoading(provider);
    await signIn(provider, { callbackUrl: "/quiz" });
  };

  const handleGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("guest");
    await signIn("credentials", {
      name: guestName || "Anonymous Creator",
      callbackUrl: "/quiz",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left branding panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden hero-gradient items-center justify-center p-12">
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-display leading-tight">
            Discover Your Creator Archetype
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Take a 2-minute quiz to uncover your unique identity as a creator,
            then connect with compatible minds.
          </p>
          <div className="flex gap-3 flex-wrap">
            {ARCHETYPE_NAMES.slice(0, 6).map((name) => (
              <div
                key={name}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/60 dark:bg-slate-800/60 shadow-sm"
                style={{ border: `1px solid ${ARCHETYPES[name].color}30` }}
              >
                <ArchetypeIcon name={name} size={18} color={ARCHETYPES[name].color} />
              </div>
            ))}
          </div>
        </div>
        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {ARCHETYPE_NAMES.slice(6).map((name, i) => {
            const positions = [
              { x: 5, y: 10 }, { x: 88, y: 8 }, { x: 90, y: 85 },
              { x: 8, y: 88 }, { x: 50, y: 5 }, { x: 45, y: 92 },
            ];
            const pos = positions[i % positions.length];
            return (
              <div
                key={name}
                className="absolute opacity-[0.1] animate-float"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, animationDelay: `${i * 0.7}s` }}
              >
                <ArchetypeIcon name={name} size={28} color={ARCHETYPES[name].color} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-4">
        <div className="w-full max-w-md">
          {/* Mobile gradient header */}
          <div className="lg:hidden hero-gradient rounded-t-3xl p-6 text-center mb-0">
            <Sparkles size={28} className="text-indigo-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-display">
              Discover Your Creator Archetype
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 lg:rounded-3xl rounded-b-3xl lg:rounded-t-3xl border border-gray-100 dark:border-slate-700 shadow-lg p-8">
            <div className="text-center mb-8 hidden lg:block">
              <Sparkles size={32} className="text-indigo-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Welcome to ArchetypeConnect
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sign in to save your results and join meetings.
              </p>
            </div>
            <div className="text-center mb-8 lg:hidden">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Sign In</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Save your results and join meetings.</p>
            </div>

            {/* OAuth */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleOAuth("github")}
                disabled={loading !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {loading === "github" ? "Connecting..." : "Continue with GitHub"}
                </span>
              </button>
              <button
                onClick={() => handleOAuth("google")}
                disabled={loading !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {loading === "google" ? "Connecting..." : "Continue with Google"}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-slate-600" /></div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-slate-800 px-4 text-gray-400 dark:text-gray-500">or continue as guest</span>
              </div>
            </div>

            {/* Guest */}
            <form onSubmit={handleGuest} className="space-y-3">
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 outline-none transition-all text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                aria-label="Guest name"
              />
              <button
                type="submit"
                disabled={loading !== null}
                className="w-full py-3 rounded-xl bg-gray-900 dark:bg-slate-600 text-white text-sm font-semibold hover:bg-gray-800 dark:hover:bg-slate-500 disabled:opacity-50 transition-colors"
              >
                {loading === "guest" ? "Creating profile..." : "Continue as Guest"}
              </button>
            </form>

            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-6">
              Guest accounts can take the quiz but some features require signing in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
