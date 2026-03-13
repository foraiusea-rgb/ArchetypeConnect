import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scores, chord, identity } = body;

    const user = await prisma.user.create({
      data: {
        name: identity.name,
        coreArchetype: chord.core,
        balanceArchetype: chord.balance,
        inverseArchetype: chord.inverse,
        identityName: identity.name,
        identityDesc: identity.description,
        scores: JSON.stringify(scores),
        rarity: identity.rarity,
      },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json(
      { error: "Failed to save quiz results" },
      { status: 500 }
    );
  }
}
