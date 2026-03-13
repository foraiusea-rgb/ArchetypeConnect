import { prisma } from "@/lib/db";
import StatCard from "@/components/StatCard";
import { ARCHETYPE_NAMES, ARCHETYPES } from "@/lib/archetypes";
import { ArchetypeName } from "@/types";

async function getStats() {
  try {
    const [totalUsers, totalMeetings, archetypeCounts] = await Promise.all([
      prisma.user.count(),
      prisma.meeting.count(),
      prisma.user.groupBy({
        by: ["coreArchetype"],
        _count: true,
        orderBy: { _count: { coreArchetype: "desc" } },
      }),
    ]);

    const mostCommon = archetypeCounts[0]?.coreArchetype ?? "—";
    const rarest =
      archetypeCounts.length > 0
        ? archetypeCounts[archetypeCounts.length - 1].coreArchetype
        : "—";

    return {
      totalUsers,
      totalMeetings,
      mostCommon,
      rarest,
      archetypeCounts,
    };
  } catch {
    return {
      totalUsers: 0,
      totalMeetings: 0,
      mostCommon: "—",
      rarest: "—",
      archetypeCounts: [],
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-gray-500">
            Platform statistics and archetype distribution.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            label="Total Users"
            value={stats.totalUsers}
            icon="👥"
            trend="+12%"
          />
          <StatCard
            label="Quizzes Completed"
            value={stats.totalUsers}
            icon="📝"
          />
          <StatCard
            label="Meetings Created"
            value={stats.totalMeetings}
            icon="📅"
          />
          <StatCard
            label="Active Groups"
            value={stats.archetypeCounts.length}
            icon="🏘️"
          />
        </div>

        {/* Most / Rarest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Most Common Archetype
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-4xl">
                {ARCHETYPES[stats.mostCommon as ArchetypeName]?.icon ?? "✦"}
              </span>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.mostCommon}
                </p>
                <p className="text-sm text-gray-500">
                  {ARCHETYPES[stats.mostCommon as ArchetypeName]?.description?.slice(0, 80) ?? ""}...
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Rarest Archetype
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-4xl">
                {ARCHETYPES[stats.rarest as ArchetypeName]?.icon ?? "✦"}
              </span>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.rarest}
                </p>
                <p className="text-sm text-gray-500">
                  {ARCHETYPES[stats.rarest as ArchetypeName]?.description?.slice(0, 80) ?? ""}...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Archetype Distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Archetype Distribution
          </h2>
          <div className="space-y-4">
            {ARCHETYPE_NAMES.map((name) => {
              const count =
                stats.archetypeCounts.find(
                  (a) => a.coreArchetype === name
                )?._count ?? 0;
              const pct =
                stats.totalUsers > 0
                  ? (count / stats.totalUsers) * 100
                  : 0;
              const archetype = ARCHETYPES[name];

              return (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-lg w-8 text-center">
                    {archetype.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 w-36 shrink-0">
                    {name}
                  </span>
                  <div className="flex-1 h-5 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.max(pct, 2)}%`,
                        backgroundColor: archetype.color,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-16 text-right">
                    {count} ({pct.toFixed(0)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
