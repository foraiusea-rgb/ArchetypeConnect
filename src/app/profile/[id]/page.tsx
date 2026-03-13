import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ARCHETYPES } from "@/lib/archetypes";
import { ArchetypeName } from "@/types";
import IdentityCard from "@/components/IdentityCard";
import ArchetypeIcon from "@/components/ArchetypeIcon";
import { Sparkles } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

async function getUser(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        hostedMeetings: { where: { cancelled: false } },
        participations: true,
      },
    });
  } catch {
    return null;
  }
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id);
  if (!user) notFound();

  const hasQuizResults = user.quizCompleted && user.coreArchetype;
  const coreArchetype = hasQuizResults ? ARCHETYPES[user.coreArchetype as ArchetypeName] : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-black/[0.06] dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] overflow-hidden mb-8">
          <div className="h-32" style={{ background: `linear-gradient(135deg, ${coreArchetype?.color ?? "#D4654A"}, ${coreArchetype?.color ?? "#D4654A"}88)` }} />
          <div className="px-8 pb-8 -mt-12">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white border-4 border-white dark:border-slate-800 shadow-lg" style={{ backgroundColor: coreArchetype?.color ?? "#D4654A" }}>
              {(user.name ?? "A").charAt(0).toUpperCase()}
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100 font-display">{user.name ?? "Anonymous"}</h1>
              {user.identityName && <p className="text-gray-500 dark:text-gray-400">{user.identityName}</p>}
            </div>
            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100">{user.hostedMeetings.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Meetings Created</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100">{user.participations.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Meetings Attended</p>
              </div>
            </div>
          </div>
        </div>

        {hasQuizResults && user.identityName && user.identityDesc && (
          <div className="max-w-lg mx-auto mb-8">
            <IdentityCard identity={{ name: user.identityName, description: user.identityDesc, chord: { core: user.coreArchetype as ArchetypeName, balance: user.balanceArchetype as ArchetypeName, inverse: user.inverseArchetype as ArchetypeName }, rarity: user.rarity }} />
          </div>
        )}

        {!hasQuizResults && (
          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-black/[0.06] dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-12 text-center mb-8">
            <Sparkles size={36} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#1A1A2E] dark:text-gray-100 mb-2 font-display">No quiz results yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Take the quiz to discover your creator identity.</p>
            <a href="/quiz" className="inline-flex px-6 py-3 rounded-xl bg-[#D4654A] text-white font-semibold hover:bg-[#C05A42] transition-colors">Take the Quiz</a>
          </div>
        )}

        {hasQuizResults && user.coreArchetype && (
          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-black/[0.06] dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Community</p>
            <h2 className="text-lg font-bold text-[#1A1A2E] dark:text-gray-100 mb-4 font-display">Groups</h2>
            <a href={`/groups/${user.coreArchetype.toLowerCase().replace(/\s+/g, "-")}`} className="inline-flex items-center gap-3 p-4 rounded-xl border border-black/[0.06] dark:border-white/10 hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${coreArchetype?.color}15` }}>
                <ArchetypeIcon name={user.coreArchetype as ArchetypeName} size={20} color={coreArchetype?.color} />
              </div>
              <div>
                <p className="font-semibold text-[#1A1A2E] dark:text-gray-100">{user.coreArchetype} Group</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Core archetype group</p>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
