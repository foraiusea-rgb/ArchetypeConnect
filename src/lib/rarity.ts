import { ArchetypeChord } from "@/types";
import { prisma } from "./db";

export async function calculateRealRarity(
  chord: ArchetypeChord
): Promise<number> {
  try {
    const [total, sameIdentity] = await Promise.all([
      prisma.user.count({ where: { quizCompleted: true } }),
      prisma.user.count({
        where: {
          coreArchetype: chord.core,
          balanceArchetype: chord.balance,
          inverseArchetype: chord.inverse,
          quizCompleted: true,
        },
      }),
    ]);

    if (total === 0) return 5;
    const percentage = Math.round((sameIdentity / total) * 100);
    return Math.max(1, Math.min(100, percentage));
  } catch {
    return 5;
  }
}
