import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        scores: { orderBy: { score: "desc" } },
      },
    });

    if (!user || !user.quizCompleted) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    // Return only public-safe fields (no email, no internal IDs)
    return NextResponse.json({
      id: user.id,
      name: user.name,
      image: user.image,
      coreArchetype: user.coreArchetype,
      balanceArchetype: user.balanceArchetype,
      inverseArchetype: user.inverseArchetype,
      identityName: user.identityName,
      identityDesc: user.identityDesc,
      rarity: user.rarity,
      scores: user.scores.map((s) => ({ name: s.archetype, score: s.score })),
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Quiz get error:", error);
    return NextResponse.json({ error: "Failed to fetch result" }, { status: 500 });
  }
}
