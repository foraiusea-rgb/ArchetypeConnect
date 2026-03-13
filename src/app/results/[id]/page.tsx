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
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-slate-900">
        <Search size={48} className="text-gray-300 dark:text-gray-600 mb-2" />
        <p className="text-gray-500 dark:text-gray-400">{error || "Result not found."}</p>
        <a href="/quiz" className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      {showConfetti && coreArch && balanceArch && inverseArch && (
        <Confetti colors={[coreArch.color, balanceArch.color, inverseArch.color]} />
      )}
      <div className="max-w-4xl mx-auto px-4">
        {/* Header — identity name as hero */}
        <AnimateIn className="text-center mb-10">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            Your Creator Identity
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 font-display">
            {result.identity.name}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            {result.identity.description}
          </p>
        </AnimateIn>

        {/* Identity Card */}
        <AnimateIn delay={0.2} className="max-w-lg mx-auto mb-16">
          <IdentityCard identity={result.identity} showShare />
        </AnimateIn>

        {/* Score Breakdown */}
        <AnimateIn delay={0.3} className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-display">Archetype Breakdown</h2>
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Full Score Distribution</h3>
            <div className="space-y-3">
              {result.scores.map((score, i) => {
                const archetype = ARCHETYPES[score.name];
                const pct = maxScore > 0 ? (score.score / maxScore) * 100 : 0;
                return (
                  <div key={score.name} className="flex items-center gap-3">
                    <div className="w-7 flex justify-center shrink-0">
                      <ArchetypeIcon name={score.name} size={18} color={archetype?.color} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-32 shrink-0">{score.name}</span>
                    <div className="flex-1 h-6 bg-gray-50 dark:bg-slate-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={score.score} aria-valuemax={maxScore} aria-label={`${score.name} score`}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: archetype?.color ?? "#6366f1",
                          animation: `grow-bar 0.8s ease-out ${i * 0.08}s both`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 w-10 text-right">{score.score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateIn>

        {/* Next Steps as cards */}
        <AnimateIn delay={0.5} className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-display">What&apos;s Next?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Join your archetype group and start connecting with compatible creators.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <a
              href={`/groups/${result.identity.chord.core.toLowerCase().replace(/\s+/g, "-")}`}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-3">
                <Users size={22} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="font-bold text-gray-900 dark:text-gray-100">Join {result.identity.chord.core} Group</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Meet creators like you</p>
            </a>
            <a
              href="/meetings"
              className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-3">
                <CalendarDays size={22} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="font-bold text-gray-900 dark:text-gray-100">Browse Meetings</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Find events to join</p>
            </a>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
