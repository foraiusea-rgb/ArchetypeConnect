export type ArchetypeName =
  | "Pirate"
  | "Guide"
  | "Connector"
  | "Builder"
  | "Reporter"
  | "Comedian"
  | "Storyteller"
  | "Artist"
  | "Strategist"
  | "Philosopher"
  | "Teacher"
  | "Systems Thinker";

export interface ArchetypeScore {
  name: ArchetypeName;
  score: number;
}

export interface ArchetypeChord {
  core: ArchetypeName;
  balance: ArchetypeName;
  inverse: ArchetypeName;
}

export interface Identity {
  name: string;
  description: string;
  chord: ArchetypeChord;
  rarity: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  archetypes: Partial<Record<ArchetypeName, number>>;
}

export interface QuizAnswer {
  questionId: number;
  value: number; // 1-5
}

export interface QuizResult {
  id: string;
  scores: ArchetypeScore[];
  chord: ArchetypeChord;
  identity: Identity;
  createdAt: Date;
}

export type MeetingType = "peer" | "collaboration" | "mastermind";

export interface Meeting {
  id: string;
  title: string;
  description: string;
  hostId: string;
  hostName: string;
  dateTime: string;
  duration: number;
  type: MeetingType;
  participantLimit: number;
  participants: string[];
  groupSlug: string;
}

export interface GroupInfo {
  slug: string;
  name: string;
  archetype: ArchetypeName;
  description: string;
  memberCount: number;
  color: string;
  icon: string;
}

export interface UserProfile {
  id: string;
  name: string;
  identity: Identity;
  groups: string[];
  meetingsCreated: number;
  meetingsAttended: number;
  createdAt: Date;
}
