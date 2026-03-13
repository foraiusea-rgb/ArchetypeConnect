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
      const count = counts.find(
        (c) => c.coreArchetype === group.archetype
      );
      return {
        ...group,
        memberCount: count?._count ?? 0,
      };
    });
  } catch {
    return GROUPS;
  }
}

export default async function GroupsPage() {
  const groups = await getGroupsWithCounts();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Archetype Groups
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Each group brings together creators who share the same core
            archetype. Join your group to connect and collaborate.
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.slug} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}
