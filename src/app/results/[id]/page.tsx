"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import IdentityCard from "@/components/IdentityCard";
import ArchetypeCard from "@/components/ArchetypeCard";
import Confetti from "@/components/Confetti";
import AnimateIn from "@/components/AnimateIn";
import { SkeletonIdentityCard, SkeletonBarChart } from "@/components/Skeleton";
import { useQuizStore } from "@/store/quiz-store";
import { ARCHETYPES } from "@/lib/archetypes";
import { Identity, ArchetypeScore, ArchetypeName } from "@/types";
import ArchetypeIcon from "@/components/ArchetypeIcon";
import { Users, CalendarDays, Search } from "lucide-react";

interface ResultData {
  identity: Identity;
  scores: ArchetypeScore[];
}

export default function ResultsPage() {
  const params = useParams();
  const { identity: storeIdentity, scores: storeScores } = useQuizStore();
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (storeIdentity && storeScores) {
      setResult({ identity: storeIdentity, scores: storeScores });
      setLoading(false);
      setShowConfetti(true);
      return;
    }

    fetch(`/api/quiz/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Result not found");
        return res.json();
      })
      .then((data) => {
        const scores: ArchetypeScore[] = (data.scores || []).map(
          (s: { archetype: string; score: number }) => ({
            name: s.archetype as ArchetypeName,
            score: s.score,
          })
        );
        setResult({
          identity: {
            name: data.identityName,
            description: data.identityDesc,
            chord: {
              core: data.coreArchetype,
              balance: data.balanceArchetype,
              inverse: data.inverseArchetype,
            },
            rarity: data.rarity,
          },
          scores,
        });
        setShowConfetti(true);
      })
      .catch((err) => setError(err.message || "Failed to load results"))
      .finally(() => setLoading(false));
  }, [params.id, storeIdentity, storeScores]);

  // Auto-hide confetti
  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center mb-10">
            <div className="skeleton-shimmer h-4 w-32 mx-auto rounded mb-3" />
            <div className="skeleton-shimmer h-10 w-64 mx-auto rounded" />
          </div>
          <div className="max-w-lg mx-auto"><SkeletonIdentityCard /></div>
          <SkeletonBarChart />
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAF8F5] dark:bg-slate-900">
        <Search size={48} className="text-gray-300 dark:text-gray-600 mb-2" />
        <p className="text-gray-500 dark:text-gray-400">{error || "Result not found."}</p>
        <a href="/quiz" className="px-6 py-2.5 rounded-xl bg-[#D4654A] text-white text-sm font-semibold hover:bg-[#C05A42] transition-colors">
          Take the Quiz
        </a>
      </div>
    );
  }

  const maxScore = Math.max(...result.scores.map((s) => s.score), 1);
  const coreArch = ARCHETYPES[result.identity.chord.core as ArchetypeName];
  const balanceArch = ARCHETYPES[result.identity.chord.balance as ArchetypeName];
  const inverseArch = ARCHETYPES[result.identity.chord.inverse as ArchetypeName];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900">
      {showConfetti && coreArch && balanceArch && inverseArch && (
        <Confetti colors={[coreArch.color, balanceArch.color, inverseArch.color]} />
      )}

      {/* Hero Header */}
      <div
        className="py-16 md:py-20"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(212,101,74,0.06), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(61,139,122,0.05), transparent 50%), #FAF8F5",
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <AnimateIn className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">
              Your Creator Identity
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-[#1A1A2E] dark:text-gray-100 font-display">
              {result.identity.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-lg mx-auto">
              {result.identity.description}
            </p>
          </AnimateIn>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Identity Card */}
        <AnimateIn delay={0.2} className="max-w-lg mx-auto mb-16">
          <IdentityCard identity={result.identity} showShare />
        </AnimateIn>

        {/* Score Breakdown */}
        <AnimateIn delay={0.3} className="mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Your Scores</p>
          <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-6 font-display">Archetype Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.scores.slice(0, 6).map((score, index) => (
              <ArchetypeCard
                key={score.name}
                name={score.name}
                score={score.score}
                maxScore={maxScore}
                label={index === 0 ? "Core" : index === 1 ? "Balance" : index === result.scores.length - 1 ? "Inverse" : undefined}
                compact
              />
            ))}
          </div>
        </AnimateIn>

        {/* All Scores Bar Chart */}
        <AnimateIn delay={0.4} className="mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-black/[0.06] dark:border-slate-700 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Distribution</p>
            <h3 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-6 font-display">Full Score Distribution</h3>
            <div className="space-y-3">
              {result.scores.map((score, i) => {
                const archetype = ARCHETYPES[score.name];
                const pct = maxScore > 0 ? (score.score / maxScore) * 100 : 0;
                return (
                  <div key={score.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${archetype?.color ?? "#6366f1"}12` }}>
                      <ArchetypeIcon name={score.name} size={16} color={archetype?.color} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-32 shrink-0">{score.name}</span>
                    <div className="flex-1 h-7 bg-[#FAF8F5] dark:bg-slate-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={score.score} aria-valuemax={maxScore} aria-label={`${score.name} score`}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: archetype?.color ?? "#6366f1",
                          animation: `grow-bar 0.8s ease-out ${i * 0.08}s both`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400 w-10 text-right">{score.score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateIn>

        {/* Next Steps as cards */}
        <AnimateIn delay={0.5} className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Continue</p>
          <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-4 font-display">What&apos;s Next?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Join your archetype group and start connecting with compatible creators.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <a
              href={`/groups/${result.identity.chord.core.toLowerCase().replace(/\s+/g, "-")}`}
              className="group p-7 rounded-[20px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 overflow-hidden relative"
            >
              <div className="h-1 absolute top-0 left-0 right-0" style={{ backgroundColor: coreArch?.color ?? "#D4654A" }} />
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${coreArch?.color ?? "#D4654A"}15` }}>
                <Users size={24} style={{ color: coreArch?.color ?? "#D4654A" }} />
              </div>
              <p className="font-bold text-[#1A1A2E] dark:text-gray-100 text-lg">Join {result.identity.chord.core} Group</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Meet creators like you</p>
            </a>
            <a
              href="/meetings"
              className="group p-7 rounded-[20px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 overflow-hidden relative"
            >
              <div className="h-1 absolute top-0 left-0 right-0 bg-sky-500" />
              <div className="w-14 h-14 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center mx-auto mb-3">
                <CalendarDays size={24} className="text-sky-500" />
              </div>
              <p className="font-bold text-[#1A1A2E] dark:text-gray-100 text-lg">Browse Meetings</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Find events to join</p>
            </a>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
