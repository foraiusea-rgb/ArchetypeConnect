import { ArchetypeChord, ArchetypeName, Identity } from "@/types";

const IDENTITY_PREFIXES: Partial<Record<ArchetypeName, string[]>> = {
  Pirate: ["Rogue", "Rebel", "Maverick", "Frontier"],
  Guide: ["Compass", "Beacon", "Mentor", "Pathfinder"],
  Connector: ["Bridge", "Nexus", "Catalyst", "Weaver"],
  Builder: ["Forge", "Foundation", "Maker", "Architect"],
  Reporter: ["Signal", "Lens", "Probe", "Spotlight"],
  Comedian: ["Spark", "Jester", "Flash", "Wildcard"],
  Storyteller: ["Echo", "Chronicle", "Narrative", "Saga"],
  Artist: ["Canvas", "Prism", "Vision", "Muse"],
  Strategist: ["Blueprint", "Tactical", "Framework", "Apex"],
  Philosopher: ["Sage", "Depth", "Oracle", "Insight"],
  Teacher: ["Framework", "Clarity", "Lighthouse", "Academy"],
  "Systems Thinker": ["Matrix", "Integral", "Lattice", "Network"],
};

const IDENTITY_SUFFIXES: Partial<Record<ArchetypeName, string[]>> = {
  Pirate: ["Rebel", "Raider", "Outlaw", "Renegade"],
  Guide: ["Navigator", "Shepherd", "Wayfinder", "Pathmaker"],
  Connector: ["Communicator", "Networker", "Ambassador", "Liaison"],
  Builder: ["Architect", "Engineer", "Crafter", "Constructor"],
  Reporter: ["Investigator", "Analyst", "Observer", "Chronicler"],
  Comedian: ["Entertainer", "Satirist", "Provocateur", "Performer"],
  Storyteller: ["Narrator", "Bard", "Weaver", "Scribe"],
  Artist: ["Creator", "Visionary", "Painter", "Sculptor"],
  Strategist: ["Commander", "Planner", "Director", "Executor"],
  Philosopher: ["Thinker", "Seeker", "Scholar", "Mystic"],
  Teacher: ["Educator", "Professor", "Mentor", "Illuminator"],
  "Systems Thinker": ["Architect", "Analyst", "Integrator", "Optimizer"],
};

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateIdentityName(chord: ArchetypeChord): string {
  const prefixes = IDENTITY_PREFIXES[chord.core] ?? ["Dynamic"];
  const suffixes = IDENTITY_SUFFIXES[chord.balance] ?? ["Creator"];

  const key = `${chord.core}-${chord.balance}-${chord.inverse}`;
  const hash = hashCode(key);

  const prefix = prefixes[hash % prefixes.length];
  const suffix = suffixes[(hash >> 4) % suffixes.length];

  return `${prefix} ${suffix}`;
}

export function generateIdentityDescription(chord: ArchetypeChord): string {
  const descriptions: Record<string, string> = {
    "Pirate-Strategist": "A bold tactician who disrupts with purpose and executes with precision.",
    "Teacher-Strategist": "A structured visionary who empowers through clear frameworks and long-term thinking.",
    "Storyteller-Connector": "A magnetic communicator who weaves narratives that bring communities together.",
    "Builder-Systems Thinker": "A methodical creator who builds solutions that address systemic challenges.",
    "Philosopher-Guide": "A deep thinker who illuminates pathways through wisdom and reflection.",
    "Artist-Storyteller": "A creative force who transforms emotions into captivating visual narratives.",
    "Connector-Comedian": "A charismatic social catalyst who builds bonds through warmth and wit.",
    "Reporter-Philosopher": "A truth-seeking intellectual who digs deep and questions everything.",
    "Strategist-Builder": "An execution-focused planner who turns ambitious visions into tangible results.",
    "Guide-Teacher": "A nurturing mentor who creates transformative learning experiences.",
    "Comedian-Pirate": "A fearless entertainer who challenges norms with sharp humor and bold energy.",
    "Systems Thinker-Strategist": "A complexity navigator who designs elegant solutions for interconnected problems.",
  };

  const key = `${chord.core}-${chord.balance}`;
  if (descriptions[key]) return descriptions[key];

  return `A unique blend of ${chord.core} vision and ${chord.balance} execution, creating unexpected value through the lens of the ${chord.inverse}.`;
}

export function generateIdentity(
  chord: ArchetypeChord,
  totalUsers: number = 100
): Identity {
  const name = generateIdentityName(chord);
  const description = generateIdentityDescription(chord);
  const rarity = Math.max(1, Math.min(15, Math.floor(Math.random() * 12) + 2));

  return { name, description, chord, rarity };
}
