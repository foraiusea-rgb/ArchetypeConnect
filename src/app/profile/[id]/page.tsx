import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ARCHETYPES } from "@/lib/archetypes";
import { ArchetypeName } from "@/types";
import IdentityCard from "@/components/IdentityCard";

interface Props {
  params: Promise<{ id: string }>;
}

async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        hostedMeetings: { where: { cancelled: false } },
        participations: true,
      },
    });
    return user;
  } catch {
    return null;
  }
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) notFound();

  const hasQuizResults = user.quizCompleted && user.coreArchetype;
  const coreArchetype = hasQuizResults
    ? ARCHETYPES[user.coreArchetype as ArchetypeName]
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div
            className="h-32"
            style={{
              background: `linear-gradient(135deg, ${coreArchetype?.color ?? "#6366f1"}, ${coreArchetype?.color ?? "#6366f1"}88)`,
            }}
          />
          <div className="px-8 pb-8 -mt-12">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-lg"
              style={{ backgroundColor: coreArchetype?.color ?? "#6366f1" }}
            >
              {(user.name ?? "A").charAt(0).toUpperCase()}
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900">{user.name ?? "Anonymous"}</h1>
              {user.identityName && (
                <p className="text-gray-500">{user.identityName}</p>
              )}
            </div>
            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {user.hostedMeetings.length}
                </p>
                <p className="text-sm text-gray-500">Meetings Created</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {user.participations.length}
                </p>
                <p className="text-sm text-gray-500">Meetings Attended</p>
              </div>
            </div>
          </div>
        </div>

        {/* Identity Card */}
        {hasQuizResults && user.identityName && user.identityDesc && (
          <div className="max-w-lg mx-auto mb-8">
            <IdentityCard
              identity={{
                name: user.identityName,
                description: user.identityDesc,
                chord: {
                  core: user.coreArchetype as ArchetypeName,
                  balance: user.balanceArchetype as ArchetypeName,
                  inverse: user.inverseArchetype as ArchetypeName,
                },
                rarity: user.rarity,
              }}
            />
          </div>
        )}

        {/* No quiz results prompt */}
        {!hasQuizResults && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center mb-8">
            <div className="text-4xl mb-4" aria-hidden="true">&#10022;</div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No quiz results yet</h2>
            <p className="text-gray-500 mb-4">Take the quiz to discover your creator identity.</p>
            <a
              href="/quiz"
              className="inline-flex px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Take the Quiz
            </a>
          </div>
        )}

        {/* Groups */}
        {hasQuizResults && user.coreArchetype && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Groups</h2>
            <a
              href={`/groups/${user.coreArchetype.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all"
            >
              <span className="text-2xl" aria-hidden="true">{coreArchetype?.icon}</span>
              <div>
                <p className="font-semibold text-gray-900">
                  {user.coreArchetype} Group
                </p>
                <p className="text-sm text-gray-500">Core archetype group</p>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
