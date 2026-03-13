import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { validateAndSanitize, quizSubmitSchema, sanitizeHtml } from "@/lib/validations";
import { calculateRealRarity } from "@/lib/rarity";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();

    const validation = validateAndSanitize(quizSubmitSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { scores, chord, identity } = validation.data;
    const rarity = await calculateRealRarity(chord);
    const sanitizedName = sanitizeHtml(identity.name);
    const sanitizedDesc = sanitizeHtml(identity.description);

    const userId = session?.user?.id;
    let user: { id: string };

    if (userId) {
      user = await prisma.user.update({
        where: { id: userId },
        data: {
          coreArchetype: chord.core,
          balanceArchetype: chord.balance,
          inverseArchetype: chord.inverse,
          identityName: sanitizedName,
          identityDesc: sanitizedDesc,
          rarity,
          quizCompleted: true,
        },
      });

      // Delete old scores, insert new (atomic replacement)
      await prisma.archetypeScore.deleteMany({ where: { userId: user.id } });
      await prisma.archetypeScore.createMany({
        data: scores.map((s) => ({
          userId: user.id,
          archetype: s.name,
          score: Math.round(s.score),
        })),
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: sanitizedName,
          coreArchetype: chord.core,
          balanceArchetype: chord.balance,
          inverseArchetype: chord.inverse,
          identityName: sanitizedName,
          identityDesc: sanitizedDesc,
          rarity,
          quizCompleted: true,
        },
      });

      await prisma.archetypeScore.createMany({
        data: scores.map((s) => ({
          userId: user.id,
          archetype: s.name,
          score: Math.round(s.score),
        })),
      });
    }

    return NextResponse.json({ id: user.id, rarity }, { status: 201 });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json(
      { error: "Failed to save quiz results. Please try again." },
      { status: 500 }
    );
  }
}
