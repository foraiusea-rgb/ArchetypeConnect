import { notFound } from "next/navigation";
import { GROUPS, ARCHETYPES } from "@/lib/archetypes";
import { prisma } from "@/lib/db";
import { ArchetypeName } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getGroupData(slug: string) {
  const group = GROUPS.find((g) => g.slug === slug);
  if (!group) return null;

  try {
    const members = await prisma.user.findMany({
      where: { coreArchetype: group.archetype },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const meetings = await prisma.meeting.findMany({
      where: { groupSlug: slug },
      orderBy: { dateTime: "desc" },
      take: 10,
      include: { host: true, participants: true },
    });

    return { group, members, meetings };
  } catch {
    return { group, members: [], meetings: [] };
  }
}

export default async function GroupDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getGroupData(slug);

  if (!data) notFound();

  const { group, members, meetings } = data;
  const archetype = ARCHETYPES[group.archetype as ArchetypeName];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Group Header */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{ backgroundColor: `${archetype.color}15` }}
            >
              {archetype.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {group.name}
              </h1>
              <p className="text-gray-500 text-lg mb-4 max-w-2xl">
                {archetype.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="text-sm font-medium text-gray-500">
                  👥 {members.length} member{members.length !== 1 ? "s" : ""}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  📅 {meetings.length} meeting{meetings.length !== 1 ? "s" : ""}
                </span>
                <div className="flex gap-1.5">
                  {archetype.traits.map((trait) => (
                    <span
                      key={trait}
                      className="text-xs px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${archetype.color}15`,
                        color: archetype.color,
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <a
              href="/meetings/create"
              className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 shrink-0"
            >
              Create Meeting
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Members</h2>
            {members.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-gray-400 mb-4">No members yet.</p>
                <a
                  href="/quiz"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Take the quiz to join this group →
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {members.map((member) => (
                  <a
                    key={member.id}
                    href={`/profile/${member.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
                      style={{ backgroundColor: archetype.color }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {member.identityName}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Meetings Sidebar */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Meetings
            </h2>
            {meetings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <p className="text-gray-400 mb-4">No meetings yet.</p>
                <a
                  href="/meetings/create"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Create the first meeting →
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="p-4 rounded-xl bg-white border border-gray-100"
                  >
                    <p className="font-semibold text-gray-900 text-sm">
                      {meeting.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(meeting.dateTime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {meeting.participants.length} / {meeting.participantLimit} joined
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
