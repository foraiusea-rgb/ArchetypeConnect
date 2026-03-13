import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;
    const userId = session.user.id;

    // Use a transaction to prevent race conditions on capacity check
    const result = await prisma.$transaction(async (tx) => {
      const meeting = await tx.meeting.findUnique({
        where: { id },
        include: { _count: { select: { participants: true } } },
      });

      if (!meeting) throw new Error("MEETING_NOT_FOUND");
      if (meeting.cancelled) throw new Error("MEETING_CANCELLED");
      if (meeting._count.participants >= meeting.participantLimit) throw new Error("MEETING_FULL");

      const existing = await tx.participant.findUnique({
        where: { userId_meetingId: { userId, meetingId: id } },
      });
      if (existing) throw new Error("ALREADY_JOINED");

      return tx.participant.create({
        data: { userId, meetingId: id },
      });
    });

    return NextResponse.json({ id: result.id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    const errorMap: Record<string, { status: number; error: string }> = {
      MEETING_NOT_FOUND: { status: 404, error: "Meeting not found" },
      MEETING_CANCELLED: { status: 400, error: "Meeting has been cancelled" },
      MEETING_FULL: { status: 400, error: "Meeting is full" },
      ALREADY_JOINED: { status: 400, error: "You already joined this meeting" },
    };

    if (errorMap[message]) {
      return NextResponse.json(errorMap[message], { status: errorMap[message].status });
    }

    console.error("Join meeting error:", error);
    return NextResponse.json({ error: "Failed to join meeting" }, { status: 500 });
  }
}
