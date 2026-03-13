import { prisma } from "@/lib/db";
import MeetingCard from "@/components/MeetingCard";

async function getMeetings() {
  try {
    const meetings = await prisma.meeting.findMany({
      orderBy: { dateTime: "asc" },
      include: { host: true, participants: true },
      take: 30,
    });

    return meetings.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      hostId: m.hostId,
      hostName: m.host.name,
      dateTime: m.dateTime.toISOString(),
      duration: m.duration,
      type: m.type as "peer" | "collaboration" | "mastermind",
      participantLimit: m.participantLimit,
      participants: m.participants.map((p) => p.userId),
      groupSlug: m.groupSlug,
    }));
  } catch {
    return [];
  }
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Meetings
            </h1>
            <p className="text-lg text-gray-500">
              Browse, join, or create meetings with compatible creators.
            </p>
          </div>
          <a
            href="/meetings/create"
            className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 shrink-0"
          >
            + Create Meeting
          </a>
        </div>

        {/* Meeting Type Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {[
            { label: "All", value: "all" },
            { label: "Peer Learning", value: "peer" },
            { label: "Collaboration", value: "collaboration" },
            { label: "Mastermind", value: "mastermind" },
          ].map((filter) => (
            <button
              key={filter.value}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Meetings Grid */}
        {meetings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No meetings yet
            </h2>
            <p className="text-gray-500 mb-6">
              Be the first to create a meeting and bring creators together.
            </p>
            <a
              href="/meetings/create"
              className="inline-flex px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Create Your First Meeting
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
