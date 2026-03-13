import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Check meeting exists and has capacity
    const meeting = await prisma.meeting.findUnique({
      where: { id },
      include: { participants: true },
    });

    if (!meeting) {
      return NextResponse.json(
        { error: "Meeting not found" },
        { status: 404 }
      );
    }

    if (meeting.participants.length >= meeting.participantLimit) {
      return NextResponse.json(
        { error: "Meeting is full" },
        { status: 400 }
      );
    }

    // Check if already joined
    const existing = meeting.participants.find((p) => p.userId === userId);
    if (existing) {
      return NextResponse.json(
        { error: "Already joined" },
        { status: 400 }
      );
    }

    const participant = await prisma.participant.create({
      data: { userId, meetingId: id },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error) {
    console.error("Join meeting error:", error);
    return NextResponse.json(
      { error: "Failed to join meeting" },
      { status: 500 }
    );
  }
}
