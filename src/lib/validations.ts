import { z } from "zod";

const VALID_ARCHETYPES = [
  "Pirate", "Guide", "Connector", "Builder", "Reporter", "Comedian",
  "Storyteller", "Artist", "Strategist", "Philosopher", "Teacher", "Systems Thinker",
] as const;

const VALID_MEETING_TYPES = ["peer", "collaboration", "mastermind"] as const;

export const archetypeEnum = z.enum(VALID_ARCHETYPES);
export const meetingTypeEnum = z.enum(VALID_MEETING_TYPES);

export const quizAnswerSchema = z.object({
  questionId: z.number().int().min(1).max(12),
  value: z.number().int().min(1).max(5),
});

export const archetypeScoreSchema = z.object({
  name: archetypeEnum,
  score: z.number().min(0),
});

export const chordSchema = z.object({
  core: archetypeEnum,
  balance: archetypeEnum,
  inverse: archetypeEnum,
});

export const identitySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  chord: chordSchema,
  rarity: z.number().min(0).max(100),
});

export const quizSubmitSchema = z.object({
  answers: z.array(quizAnswerSchema).min(10).max(12),
  scores: z.array(archetypeScoreSchema).min(1).max(12),
  chord: chordSchema,
  identity: identitySchema,
});

export const meetingCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description too long"),
  dateTime: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date > new Date();
  }, "Must be a valid future date"),
  duration: z.number().int().min(15).max(180),
  type: meetingTypeEnum,
  participantLimit: z.number().int().min(2).max(50),
  groupSlug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/, "Invalid group slug"),
});

export const meetingJoinSchema = z.object({
  userId: z.string().cuid("Invalid user ID"),
});

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string; details: { path: string[]; message: string }[] } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path.map(String),
      message: issue.message,
    }));
    const firstError = result.error.issues[0];
    return {
      success: false,
      error: `${firstError.path.join(".")}: ${firstError.message}`,
      details,
    };
  }
  return { success: true, data: result.data };
}
