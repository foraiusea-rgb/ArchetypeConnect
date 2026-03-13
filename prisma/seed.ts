import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ARCHETYPES = [
  "Pirate", "Guide", "Connector", "Builder", "Reporter", "Comedian",
  "Storyteller", "Artist", "Strategist", "Philosopher", "Teacher", "Systems Thinker",
];

const GROUPS = [
  { slug: "pirate", archetype: "Pirate" },
  { slug: "guide", archetype: "Guide" },
  { slug: "connector", archetype: "Connector" },
  { slug: "builder", archetype: "Builder" },
  { slug: "reporter", archetype: "Reporter" },
  { slug: "comedian", archetype: "Comedian" },
  { slug: "storyteller", archetype: "Storyteller" },
  { slug: "artist", archetype: "Artist" },
  { slug: "strategist", archetype: "Strategist" },
  { slug: "philosopher", archetype: "Philosopher" },
  { slug: "teacher", archetype: "Teacher" },
  { slug: "systems-thinker", archetype: "Systems Thinker" },
];

const DEMO_USERS = [
  { name: "Alex Rivera", core: "Strategist", balance: "Builder", inverse: "Comedian", identity: "Blueprint Architect", desc: "An execution-focused planner who turns ambitious visions into tangible results." },
  { name: "Jordan Chen", core: "Pirate", balance: "Artist", inverse: "Teacher", identity: "Corsair Visionary", desc: "A rebellious creative who breaks every rule to forge something truly original." },
  { name: "Sam Taylor", core: "Teacher", balance: "Connector", inverse: "Pirate", identity: "Clarity Ambassador", desc: "A community educator who multiplies knowledge through genuine human connection." },
  { name: "Morgan Blake", core: "Builder", balance: "Systems Thinker", inverse: "Comedian", identity: "Forge Integrator", desc: "A methodical creator who builds solutions that address systemic challenges." },
  { name: "Casey Kim", core: "Connector", balance: "Comedian", inverse: "Philosopher", identity: "Bridge Entertainer", desc: "A charismatic social catalyst who builds bonds through warmth and wit." },
  { name: "Riley Patel", core: "Storyteller", balance: "Artist", inverse: "Reporter", identity: "Echo Visionary", desc: "A creative force who transforms emotions into captivating visual narratives." },
  { name: "Taylor Nguyen", core: "Guide", balance: "Philosopher", inverse: "Builder", identity: "Compass Oracle", desc: "A wise counselor who helps others find meaning through thoughtful exploration." },
  { name: "Jamie Wright", core: "Philosopher", balance: "Guide", inverse: "Pirate", identity: "Sage Wayfinder", desc: "A deep thinker who illuminates pathways through wisdom and reflection." },
  { name: "Avery Johnson", core: "Artist", balance: "Storyteller", inverse: "Strategist", identity: "Canvas Narrator", desc: "A visual storyteller who paints meaning into every creative endeavor." },
  { name: "Drew Martinez", core: "Reporter", balance: "Strategist", inverse: "Connector", identity: "Signal Tactician", desc: "A data-driven detective who uncovers insights and turns them into action plans." },
  { name: "Quinn Foster", core: "Comedian", balance: "Pirate", inverse: "Teacher", identity: "Spark Disruptor", desc: "A fearless entertainer who challenges norms with sharp humor and bold energy." },
  { name: "Reese Park", core: "Systems Thinker", balance: "Strategist", inverse: "Artist", identity: "Matrix Commander", desc: "A complexity navigator who designs elegant solutions for interconnected problems." },
];

function generateScores(core: string, balance: string, inverse: string) {
  const scores: { archetype: string; score: number }[] = [];
  for (const arch of ARCHETYPES) {
    let score: number;
    if (arch === core) score = 35 + Math.floor(Math.random() * 10);
    else if (arch === balance) score = 25 + Math.floor(Math.random() * 10);
    else if (arch === inverse) score = 5 + Math.floor(Math.random() * 5);
    else score = 10 + Math.floor(Math.random() * 15);
    scores.push({ archetype: arch, score });
  }
  return scores.sort((a, b) => b.score - a.score);
}

async function main() {
  console.log("Seeding database...");

  // Create demo users
  const users = [];
  for (const demo of DEMO_USERS) {
    const user = await prisma.user.create({
      data: {
        name: demo.name,
        coreArchetype: demo.core,
        balanceArchetype: demo.balance,
        inverseArchetype: demo.inverse,
        identityName: demo.identity,
        identityDesc: demo.desc,
        rarity: Math.floor(Math.random() * 15) + 1,
        quizCompleted: true,
      },
    });

    const scores = generateScores(demo.core, demo.balance, demo.inverse);
    await prisma.archetypeScore.createMany({
      data: scores.map((s) => ({
        userId: user.id,
        archetype: s.archetype,
        score: s.score,
      })),
    });

    users.push(user);
    console.log(`  Created user: ${demo.name} (${demo.identity})`);
  }

  // Create demo meetings
  const now = new Date();
  const meetings = [
    {
      title: "Weekly Strategist Sync",
      description: "Strategic planning session for goal-oriented creators. We discuss frameworks, execution plans, and accountability.",
      hostIdx: 0,
      groupSlug: "strategist",
      type: "mastermind",
      daysFromNow: 3,
      duration: 60,
      limit: 8,
    },
    {
      title: "Creative Rebels Meetup",
      description: "For those who break rules and make new ones. Share your boldest ideas and get honest feedback.",
      hostIdx: 1,
      groupSlug: "pirate",
      type: "peer",
      daysFromNow: 5,
      duration: 45,
      limit: 12,
    },
    {
      title: "Teach & Learn Circle",
      description: "Take turns teaching something you know. 15 minutes per person, Q&A after each session.",
      hostIdx: 2,
      groupSlug: "teacher",
      type: "peer",
      daysFromNow: 2,
      duration: 90,
      limit: 6,
    },
    {
      title: "Builder Workshop: Ship Something Today",
      description: "Collaborative building session. Bring a project, pair up, and help each other make real progress.",
      hostIdx: 3,
      groupSlug: "builder",
      type: "collaboration",
      daysFromNow: 7,
      duration: 120,
      limit: 10,
    },
    {
      title: "Connector Speed Networking",
      description: "Structured 5-minute conversations with fellow creators. Walk away with at least 3 new meaningful connections.",
      hostIdx: 4,
      groupSlug: "connector",
      type: "peer",
      daysFromNow: 4,
      duration: 60,
      limit: 20,
    },
    {
      title: "Storytelling Showcase",
      description: "Share your latest creative narrative in any medium — writing, video, audio, visual art. Supportive feedback guaranteed.",
      hostIdx: 5,
      groupSlug: "storyteller",
      type: "collaboration",
      daysFromNow: 6,
      duration: 90,
      limit: 8,
    },
    {
      title: "Philosophy & Big Questions",
      description: "Deep discussion on meaning, purpose, and the creator journey. Come with a question you've been sitting with.",
      hostIdx: 7,
      groupSlug: "philosopher",
      type: "mastermind",
      daysFromNow: 8,
      duration: 60,
      limit: 6,
    },
    {
      title: "Systems Thinking Lab",
      description: "Analyze complex problems together using systems maps and feedback loops. Bring a real challenge to workshop.",
      hostIdx: 11,
      groupSlug: "systems-thinker",
      type: "mastermind",
      daysFromNow: 10,
      duration: 90,
      limit: 8,
    },
  ];

  for (const m of meetings) {
    const meetingDate = new Date(now);
    meetingDate.setDate(meetingDate.getDate() + m.daysFromNow);
    meetingDate.setHours(14 + Math.floor(Math.random() * 6), 0, 0, 0);

    const meeting = await prisma.meeting.create({
      data: {
        title: m.title,
        description: m.description,
        hostId: users[m.hostIdx].id,
        dateTime: meetingDate,
        duration: m.duration,
        type: m.type,
        participantLimit: m.limit,
        groupSlug: m.groupSlug,
      },
    });

    // Add 1-3 random participants to each meeting
    const participantCount = 1 + Math.floor(Math.random() * 3);
    const availableUsers = users.filter((_, i) => i !== m.hostIdx);
    const shuffled = availableUsers.sort(() => Math.random() - 0.5);
    const participants = shuffled.slice(0, participantCount);

    for (const p of participants) {
      await prisma.participant.create({
        data: {
          userId: p.id,
          meetingId: meeting.id,
        },
      });
    }

    console.log(`  Created meeting: ${m.title} (${participantCount} participants)`);
  }

  console.log("\nSeed complete!");
  console.log(`  ${DEMO_USERS.length} users created`);
  console.log(`  ${meetings.length} meetings created`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
