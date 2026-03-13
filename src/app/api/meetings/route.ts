import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { validateAndSanitize, meetingCreateSchema, sanitizeHtml } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
    const pageSize = Math.min(50, Math.max(1, parseInt(url.searchParams.get("pageSize") ?? "20")));
    const type = url.searchParams.get("type");
    const search = url.searchParams.get("search");
    const group = url.searchParams.get("group");

    const where: Record<string, unknown> = { cancelled: false };
    if (type && ["peer", "collaboration", "mastermind"].includes(type)) {
      where.type = type;
    }
    if (group) {
      where.groupSlug = group;
    }
    if (search) {
      where.title = { contains: search };
    }

    const [meetings, total] = await Promise.all([
      prisma.meeting.findMany({
        where,
        orderBy: { dateTime: "asc" },
        include: {
          host: { select: { id: true, name: true, image: true } },
          _count: { select: { participants: true } },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.meeting.count({ where }),
    ]);

    return NextResponse.json({
      data: meetings.map((m) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        hostId: m.hostId,
        hostName: m.host.name ?? "Anonymous",
        dateTime: m.dateTime.toISOString(),
        duration: m.duration,
        type: m.type,
        participantLimit: m.participantLimit,
        participantCount: m._count.participants,
        groupSlug: m.groupSlug,
        cancelled: m.cancelled,
      })),
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total,
    });
  } catch (error) {
    console.error("Meetings list error:", error);
    return NextResponse.json({ error: "Failed to fetch meetings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required to create meetings" }, { status: 401 });
    }

    const body = await req.json();
    const validation = validateAndSanitize(meetingCreateSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error, details: validation.details }, { status: 400 });
    }

    const data = validation.data;
    const meeting = await prisma.meeting.create({
      data: {
        title: sanitizeHtml(data.title),
        description: sanitizeHtml(data.description),
        hostId: session.user.id,
        dateTime: new Date(data.dateTime),
        duration: data.duration,
        type: data.type,
        participantLimit: data.participantLimit,
        groupSlug: data.groupSlug,
      },
    });

    return NextResponse.json({ id: meeting.id }, { status: 201 });
  } catch (error) {
    console.error("Meeting create error:", error);
    return NextResponse.json({ error: "Failed to create meeting" }, { status: 500 });
  }
}
