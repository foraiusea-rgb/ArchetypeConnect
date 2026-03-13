import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
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

    const mostCommon = archetypeCounts[0]?.coreArchetype ?? null;
    const rarest =
      archetypeCounts.length > 0
        ? archetypeCounts[archetypeCounts.length - 1].coreArchetype
        : null;

    return NextResponse.json({
      totalUsers,
      totalQuizzes: totalUsers,
      totalMeetings,
      mostCommonArchetype: mostCommon,
      rarestArchetype: rarest,
      archetypeDistribution: archetypeCounts.map((a) => ({
        archetype: a.coreArchetype,
        count: a._count,
      })),
      activeGroups: archetypeCounts.length,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
