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
    { label: "Total Users", value: stats.totalUsers, icon: <Users size={22} />, color: "#D4654A" },
    { label: "Quizzes Completed", value: stats.quizCompletedCount, icon: <FileCheck size={22} />, color: "#3D8B7A" },
    { label: "Meetings Created", value: stats.totalMeetings, icon: <CalendarDays size={22} />, color: "#C4A35A" },
    { label: "Active Groups", value: stats.archetypeCounts.filter((a) => a._count > 0).length, icon: <Building size={22} />, color: "#8B6DB0" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900">
      {/* Hero Header */}
      <div className="bg-[#FEF0EC] dark:bg-slate-800/60 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Analytics</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3 font-display">Community Stats</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">See how archetypes are distributed across the community.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card) => (
            <div key={card.label} className="relative p-6 bg-white rounded-[20px] border border-black/[0.06] dark:bg-slate-800 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="h-1 absolute top-0 left-0 right-0" style={{ backgroundColor: card.color }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${card.color}15`, color: card.color, boxShadow: `0 0 0 3px ${card.color}08` }}>
                {card.icon}
              </div>
              <p className="text-4xl font-bold text-[#1A1A2E] dark:text-gray-100">{card.value}</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Most / Rarest */}
        {(stats.mostCommon || stats.rarest) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {stats.mostCommon && (() => {
              const mcColor = ARCHETYPES[stats.mostCommon as ArchetypeName]?.color ?? "#D4654A";
              return (
                <div className="p-6 bg-white rounded-[20px] border border-black/[0.06] dark:bg-slate-800 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                  <div className="h-1 absolute top-0 left-0 right-0" style={{ backgroundColor: mcColor }} />
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Most Common Archetype</p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${mcColor}20`, boxShadow: `0 0 0 3px ${mcColor}08` }}>
                      <ArchetypeIcon name={stats.mostCommon as ArchetypeName} size={30} color={mcColor} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100">{stats.mostCommon}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stats.archetypeCounts[0]?._count ?? 0} creators</p>
                    </div>
                  </div>
                </div>
              );
            })()}
            {stats.rarest && stats.rarest !== stats.mostCommon && (() => {
              const rColor = ARCHETYPES[stats.rarest as ArchetypeName]?.color ?? "#3D8B7A";
              return (
                <div className="p-6 bg-white rounded-[20px] border border-black/[0.06] dark:bg-slate-800 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                  <div className="h-1 absolute top-0 left-0 right-0" style={{ backgroundColor: rColor }} />
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Rarest Archetype</p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${rColor}20`, boxShadow: `0 0 0 3px ${rColor}08` }}>
                      <ArchetypeIcon name={stats.rarest as ArchetypeName} size={30} color={rColor} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100">{stats.rarest}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stats.archetypeCounts[stats.archetypeCounts.length - 1]?._count ?? 0} creators</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Empty state */}
        {stats.quizCompletedCount === 0 && (
          <div className="bg-white rounded-[20px] border border-black/[0.06] dark:border-slate-700 shadow-lg p-16 text-center mb-12 overflow-hidden">
            <div className="w-20 h-20 rounded-2xl bg-[#FEF0EC] dark:bg-[#D4654A]/10 flex items-center justify-center mx-auto mb-5">
              <BarChart3 size={36} className="text-[#D4654A] dark:text-[#E8806A]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-2 font-display">No quiz data yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Statistics will appear here once creators start taking the quiz.</p>
            <a href="/quiz" className="inline-flex px-7 py-3.5 rounded-xl bg-[#D4654A] text-white font-semibold hover:bg-[#C05A42] transition-all shadow-lg shadow-[#D4654A]/20 hover:shadow-xl hover:-translate-y-0.5">Be the First</a>
          </div>
        )}

        {/* Distribution */}
        {stats.quizCompletedCount > 0 && (
          <div className="bg-white rounded-[20px] border border-black/[0.06] dark:bg-slate-800 dark:border-slate-700 shadow-md p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Breakdown</p>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-6 font-display">Archetype Distribution</h2>
            <div className="space-y-4">
              {ARCHETYPE_NAMES.map((name) => {
                const count = stats.archetypeCounts.find((a) => a.coreArchetype === name)?._count ?? 0;
                const pct = stats.quizCompletedCount > 0 ? (count / stats.quizCompletedCount) * 100 : 0;
                const archetype = ARCHETYPES[name];
                return (
                  <div key={name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${archetype.color}12` }}>
                      <ArchetypeIcon name={name} size={16} color={archetype.color} />
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A2E] dark:text-gray-300 w-36 shrink-0">{name}</span>
                    <div className="flex-1 h-7 bg-[#FAF8F5] dark:bg-slate-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={count} aria-valuemax={stats.quizCompletedCount} aria-label={`${name}: ${count} creators`}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(pct, count > 0 ? 2 : 0)}%`, backgroundColor: archetype.color, boxShadow: `0 0 8px ${archetype.color}40` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400 w-20 text-right">{count} ({pct.toFixed(0)}%)</span>
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
