import { prisma } from "@/lib/db";
import { ARCHETYPE_NAMES, ARCHETYPES } from "@/lib/archetypes";
import { ArchetypeName } from "@/types";

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
    const rarest =
      archetypeCounts.length > 0
        ? archetypeCounts[archetypeCounts.length - 1].coreArchetype
        : null;

    return {
      totalUsers,
      quizCompletedCount,
      totalMeetings,
      mostCommon,
      rarest,
      archetypeCounts,
    };
  } catch {
    return {
      totalUsers: 0,
      quizCompletedCount: 0,
      totalMeetings: 0,
      mostCommon: null,
      rarest: null,
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
          <DashStatCard label="Total Users" value={stats.totalUsers} icon="&#128101;" />
          <DashStatCard label="Quizzes Completed" value={stats.quizCompletedCount} icon="&#128221;" />
          <DashStatCard label="Meetings Created" value={stats.totalMeetings} icon="&#128197;" />
          <DashStatCard
            label="Active Groups"
            value={stats.archetypeCounts.filter((a) => a._count > 0).length}
            icon="&#127960;"
          />
        </div>

        {/* Most / Rarest */}
        {(stats.mostCommon || stats.rarest) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {stats.mostCommon && (
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Most Common Archetype
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-4xl" aria-hidden="true">
                    {ARCHETYPES[stats.mostCommon as ArchetypeName]?.icon ?? "\u2726"}
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.mostCommon}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stats.archetypeCounts[0]?._count ?? 0} creators
                    </p>
                  </div>
                </div>
              </div>
            )}
            {stats.rarest && stats.rarest !== stats.mostCommon && (
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Rarest Archetype
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-4xl" aria-hidden="true">
                    {ARCHETYPES[stats.rarest as ArchetypeName]?.icon ?? "\u2726"}
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.rarest}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stats.archetypeCounts[stats.archetypeCounts.length - 1]?._count ?? 0} creators
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state when no quiz data */}
        {stats.quizCompletedCount === 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center mb-12">
            <div className="text-5xl mb-4" aria-hidden="true">&#128202;</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No quiz data yet
            </h2>
            <p className="text-gray-500 mb-6">
              Statistics will appear here once creators start taking the quiz.
            </p>
            <a
              href="/quiz"
              className="inline-flex px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Be the First
            </a>
          </div>
        )}

        {/* Archetype Distribution */}
        {stats.quizCompletedCount > 0 && (
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
                  stats.quizCompletedCount > 0
                    ? (count / stats.quizCompletedCount) * 100
                    : 0;
                const archetype = ARCHETYPES[name];

                return (
                  <div key={name} className="flex items-center gap-3">
                    <span className="text-lg w-8 text-center" aria-hidden="true">
                      {archetype.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700 w-36 shrink-0">
                      {name}
                    </span>
                    <div
                      className="flex-1 h-5 bg-gray-50 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={count}
                      aria-valuemax={stats.quizCompletedCount}
                      aria-label={`${name}: ${count} creators`}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.max(pct, count > 0 ? 2 : 0)}%`,
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
        )}
      </div>
    </div>
  );
}

function DashStatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
      <span className="text-2xl" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} />
      <p className="text-3xl font-bold text-gray-900 mt-3">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
