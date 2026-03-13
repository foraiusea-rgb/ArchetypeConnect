import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ARCHETYPE_NAMES, ARCHETYPES } from "@/lib/archetypes";
import { ArchetypeName } from "@/types";
import ArchetypeIcon from "@/components/ArchetypeIcon";
import { Users, FileCheck, CalendarDays, Building, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Community Stats",
  description: "See the archetype distribution, most common and rarest archetypes, and community statistics on ArchetypeConnect.",
};

async function getStats() {
  try {
    const [totalUsers, quizCompletedCount, totalMeetings, archetypeCounts] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { quizCompleted: true } }),
      prisma.meeting.count({ where: { cancelled: false } }),
      prisma.user.groupBy({
        by: ["coreArchetype"],
        where: { quizCompleted: true },
        _count: true,
        orderBy: { _count: { coreArchetype: "desc" } },
      }),
    ]);
    const mostCommon = archetypeCounts[0]?.coreArchetype ?? null;
    const rarest = archetypeCounts.length > 0 ? archetypeCounts[archetypeCounts.length - 1].coreArchetype : null;
    return { totalUsers, quizCompletedCount, totalMeetings, mostCommon, rarest, archetypeCounts };
  } catch {
    return { totalUsers: 0, quizCompletedCount: 0, totalMeetings: 0, mostCommon: null, rarest: null, archetypeCounts: [] };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: <Users size={20} /> },
    { label: "Quizzes Completed", value: stats.quizCompletedCount, icon: <FileCheck size={20} /> },
    { label: "Meetings Created", value: stats.totalMeetings, icon: <CalendarDays size={20} /> },
    { label: "Active Groups", value: stats.archetypeCounts.filter((a) => a._count > 0).length, icon: <Building size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-display">Community Stats</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">See how archetypes are distributed across the community.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card) => (
            <div key={card.label} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
                {card.icon}
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Most / Rarest */}
        {(stats.mostCommon || stats.rarest) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {stats.mostCommon && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Most Common Archetype</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ARCHETYPES[stats.mostCommon as ArchetypeName]?.color ?? "#6366f1"}15` }}>
                    <ArchetypeIcon name={stats.mostCommon as ArchetypeName} size={28} color={ARCHETYPES[stats.mostCommon as ArchetypeName]?.color} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.mostCommon}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stats.archetypeCounts[0]?._count ?? 0} creators</p>
                  </div>
                </div>
              </div>
            )}
            {stats.rarest && stats.rarest !== stats.mostCommon && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Rarest Archetype</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ARCHETYPES[stats.rarest as ArchetypeName]?.color ?? "#6366f1"}15` }}>
                    <ArchetypeIcon name={stats.rarest as ArchetypeName} size={28} color={ARCHETYPES[stats.rarest as ArchetypeName]?.color} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.rarest}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stats.archetypeCounts[stats.archetypeCounts.length - 1]?._count ?? 0} creators</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {stats.quizCompletedCount === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm p-16 text-center mb-12">
            <BarChart3 size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No quiz data yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Statistics will appear here once creators start taking the quiz.</p>
            <a href="/quiz" className="inline-flex px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">Be the First</a>
          </div>
        )}

        {/* Distribution */}
        {stats.quizCompletedCount > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-display">Archetype Distribution</h2>
            <div className="space-y-4">
              {ARCHETYPE_NAMES.map((name) => {
                const count = stats.archetypeCounts.find((a) => a.coreArchetype === name)?._count ?? 0;
                const pct = stats.quizCompletedCount > 0 ? (count / stats.quizCompletedCount) * 100 : 0;
                const archetype = ARCHETYPES[name];
                return (
                  <div key={name} className="flex items-center gap-3">
                    <div className="w-7 flex justify-center shrink-0">
                      <ArchetypeIcon name={name} size={18} color={archetype.color} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-36 shrink-0">{name}</span>
                    <div className="flex-1 h-5 bg-gray-50 dark:bg-slate-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={count} aria-valuemax={stats.quizCompletedCount} aria-label={`${name}: ${count} creators`}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(pct, count > 0 ? 2 : 0)}%`, backgroundColor: archetype.color }} />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-16 text-right">{count} ({pct.toFixed(0)}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
