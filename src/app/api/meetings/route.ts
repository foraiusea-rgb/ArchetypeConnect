import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const meetings = await prisma.meeting.findMany({
      orderBy: { dateTime: "asc" },
      include: { host: true, participants: true },
      take: 50,
    });

    return NextResponse.json(meetings);
  } catch (error) {
    console.error("Meetings list error:", error);
    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      hostName,
      dateTime,
      duration,
      type,
      participantLimit,
      groupSlug,
    } = body;

    // Find or create a host user
    let host = await prisma.user.findFirst({
      where: { name: hostName },
    });

    if (!host) {
      host = await prisma.user.create({
        data: {
          name: hostName,
          coreArchetype: "Builder",
          balanceArchetype: "Strategist",
          inverseArchetype: "Comedian",
          identityName: `${hostName}'s Identity`,
          identityDesc: "A meeting creator exploring their archetype.",
          scores: "[]",
          rarity: 10,
        },
      });
    }

    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        hostId: host.id,
        dateTime: new Date(dateTime),
        duration: duration ?? 60,
        type: type ?? "peer",
        participantLimit: participantLimit ?? 10,
        groupSlug,
      },
    });

    return NextResponse.json(meeting, { status: 201 });
  } catch (error) {
    console.error("Meeting create error:", error);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 }
    );
  }
}
