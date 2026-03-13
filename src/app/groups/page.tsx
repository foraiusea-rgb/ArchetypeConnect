import GroupCard from "@/components/GroupCard";
import { GROUPS } from "@/lib/archetypes";
import { prisma } from "@/lib/db";

async function getGroupsWithCounts() {
  try {
    const counts = await prisma.user.groupBy({
      by: ["coreArchetype"],
      where: { quizCompleted: true },
      _count: true,
    });
    return GROUPS.map((group) => {
      const count = counts.find((c) => c.coreArchetype === group.archetype);
      return { ...group, memberCount: count?._count ?? 0 };
    });
  } catch {
    return GROUPS;
  }
}

export default async function GroupsPage() {
  const groups = await getGroupsWithCounts();

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900">
      {/* Hero Header */}
      <div
        className="py-16 md:py-20"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(212,101,74,0.06), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(61,139,122,0.05), transparent 50%), #FAF8F5",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Community</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-4 font-display">Archetype Groups</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Each group brings together creators who share the same core archetype. Join your group to connect and collaborate.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.slug} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}
