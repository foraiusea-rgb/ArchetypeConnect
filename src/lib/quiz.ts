import { QuizQuestion, QuizAnswer, ArchetypeScore, ArchetypeName, ArchetypeChord } from "@/types";
import { ARCHETYPE_NAMES } from "./archetypes";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "I enjoy explaining complex ideas to others in a way they can understand.",
    archetypes: { Teacher: 3, Guide: 2, Storyteller: 1 },
  },
  {
    id: 2,
    text: "I often challenge the conventional way of doing things.",
    archetypes: { Pirate: 3, Philosopher: 2, Artist: 1 },
  },
  {
    id: 3,
    text: "I naturally connect people who should know each other.",
    archetypes: { Connector: 3, Guide: 1, Comedian: 1 },
  },
  {
    id: 4,
    text: "I prefer building something tangible over theorizing about it.",
    archetypes: { Builder: 3, "Systems Thinker": 1, Strategist: 1 },
  },
  {
    id: 5,
    text: "I'm driven by uncovering the truth behind a story or situation.",
    archetypes: { Reporter: 3, Philosopher: 2, "Systems Thinker": 1 },
  },
  {
    id: 6,
    text: "I use humor to make serious points or ease tension in a room.",
    archetypes: { Comedian: 3, Storyteller: 1, Connector: 1 },
  },
  {
    id: 7,
    text: "I think in systems and love understanding how parts connect to the whole.",
    archetypes: { "Systems Thinker": 3, Strategist: 2, Philosopher: 1 },
  },
  {
    id: 8,
    text: "I can captivate a room with a compelling narrative.",
    archetypes: { Storyteller: 3, Comedian: 1, Teacher: 1 },
  },
  {
    id: 9,
    text: "I express my ideas best through visual or creative mediums.",
    archetypes: { Artist: 3, Storyteller: 2, Builder: 1 },
  },
  {
    id: 10,
    text: "I love planning long-term strategies and anticipating outcomes.",
    archetypes: { Strategist: 3, "Systems Thinker": 2, Builder: 1 },
  },
  {
    id: 11,
    text: "I question the deeper meaning and purpose behind events and actions.",
    archetypes: { Philosopher: 3, Guide: 2, Reporter: 1 },
  },
  {
    id: 12,
    text: "I thrive when guiding someone through a challenge they're facing.",
    archetypes: { Guide: 3, Teacher: 2, Connector: 1 },
  },
];

export function calculateScores(answers: QuizAnswer[]): ArchetypeScore[] {
  const scores: Record<string, number> = {};

  for (const name of ARCHETYPE_NAMES) {
    scores[name] = 0;
  }

  for (const answer of answers) {
    const question = QUIZ_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;

    for (const [archetype, weight] of Object.entries(question.archetypes)) {
      scores[archetype] += answer.value * (weight ?? 0);
    }
  }

  return ARCHETYPE_NAMES.map((name) => ({
    name,
    score: scores[name] ?? 0,
  })).sort((a, b) => b.score - a.score);
}

export function getChord(scores: ArchetypeScore[]): ArchetypeChord {
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  return {
    core: sorted[0].name,
    balance: sorted[1].name,
    inverse: sorted[sorted.length - 1].name,
  };
}
