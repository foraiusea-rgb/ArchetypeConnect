"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import IdentityCard from "@/components/IdentityCard";
import ArchetypeCard from "@/components/ArchetypeCard";
import { useQuizStore } from "@/store/quiz-store";
import { ARCHETYPES } from "@/lib/archetypes";
import { Identity, ArchetypeScore, ArchetypeName } from "@/types";

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

  useEffect(() => {
    // First try store data
    if (storeIdentity && storeScores) {
      setResult({ identity: storeIdentity, scores: storeScores });
      setLoading(false);
      return;
    }

    // Then try API
    fetch(`/api/quiz/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Result not found");
        return res.json();
      })
      .then((data) => {
        // Scores come from normalized ArchetypeScore table
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
      })
      .catch((err) => {
        setError(err.message || "Failed to load results");
      })
      .finally(() => setLoading(false));
  }, [params.id, storeIdentity, storeScores]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-5xl mb-2" aria-hidden="true">&#128270;</div>
        <p className="text-gray-500">{error || "Result not found."}</p>
        <a
          href="/quiz"
          className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Take the Quiz
        </a>
      </div>
    );
  }

  const maxScore = Math.max(...result.scores.map((s) => s.score), 1);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Your Creator Identity
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Results
          </h1>
        </div>

        {/* Identity Card */}
        <div className="max-w-lg mx-auto mb-16">
          <IdentityCard identity={result.identity} showShare />
        </div>

        {/* Score Breakdown */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Archetype Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.scores.slice(0, 6).map((score, index) => (
              <ArchetypeCard
                key={score.name}
                name={score.name}
                score={score.score}
                maxScore={maxScore}
                label={
                  index === 0
                    ? "Core"
                    : index === 1
                    ? "Balance"
                    : index === result.scores.length - 1
                    ? "Inverse"
                    : undefined
                }
                compact
              />
            ))}
          </div>
        </div>

        {/* All Scores Bar Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-16">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Full Score Distribution
          </h3>
          <div className="space-y-3">
            {result.scores.map((score) => {
              const archetype = ARCHETYPES[score.name];
              const pct = maxScore > 0 ? (score.score / maxScore) * 100 : 0;
              return (
                <div key={score.name} className="flex items-center gap-3">
                  <span className="text-lg w-8 text-center" aria-hidden="true">
                    {archetype?.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 w-32 shrink-0">
                    {score.name}
                  </span>
                  <div
                    className="flex-1 h-6 bg-gray-50 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={score.score}
                    aria-valuemax={maxScore}
                    aria-label={`${score.name} score`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: archetype?.color ?? "#6366f1",
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-500 w-10 text-right">
                    {score.score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What&apos;s Next?</h2>
          <p className="text-gray-500 mb-8">
            Join your archetype group and start connecting with compatible creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/groups/${result.identity.chord.core.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Join {result.identity.chord.core} Group
            </a>
            <a
              href="/meetings"
              className="px-8 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-indigo-200 hover:text-indigo-600 transition-colors"
            >
              Browse Meetings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
