import { ArchetypeScore, ArchetypeName } from "@/types";
import { COMPLEMENTARY_PAIRS } from "./archetypes";

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  const mag = Math.sqrt(magA) * Math.sqrt(magB);
  return mag === 0 ? 0 : dot / mag;
}

export function scoresToVector(scores: ArchetypeScore[]): number[] {
  return scores.map((s) => s.score);
}

export function isPeerMatch(
  coreA: ArchetypeName,
  coreB: ArchetypeName
): boolean {
  return coreA === coreB;
}

export function isComplementaryMatch(
  coreA: ArchetypeName,
  coreB: ArchetypeName
): boolean {
  return COMPLEMENTARY_PAIRS.some(
    ([a, b]) =>
      (a === coreA && b === coreB) || (a === coreB && b === coreA)
  );
}

export function isMastermindCandidate(
  cores: ArchetypeName[]
): boolean {
  const categories = {
    thinker: ["Philosopher", "Strategist", "Systems Thinker"],
    builder: ["Builder", "Artist", "Reporter"],
    communicator: ["Storyteller", "Comedian", "Connector", "Teacher", "Guide"],
  };

  const hasThinker = cores.some((c) =>
    categories.thinker.includes(c)
  );
  const hasBuilder = cores.some((c) =>
    categories.builder.includes(c)
  );
  const hasCommunicator = cores.some((c) =>
    categories.communicator.includes(c)
  );

  return hasThinker && hasBuilder && hasCommunicator;
}

export function getCompatibilityScore(
  scoresA: ArchetypeScore[],
  scoresB: ArchetypeScore[],
  coreA: ArchetypeName,
  coreB: ArchetypeName
): number {
  const similarity = cosineSimilarity(
    scoresToVector(scoresA),
    scoresToVector(scoresB)
  );

  let bonus = 0;
  if (isPeerMatch(coreA, coreB)) bonus += 0.2;
  if (isComplementaryMatch(coreA, coreB)) bonus += 0.3;

  return Math.min(1, similarity * 0.7 + bonus);
}
