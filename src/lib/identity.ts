import { ArchetypeChord, ArchetypeName, Identity } from "@/types";

const IDENTITY_PREFIXES: Record<ArchetypeName, string[]> = {
  Pirate: ["Rogue", "Rebel", "Maverick", "Frontier", "Corsair", "Daredevil"],
  Guide: ["Compass", "Beacon", "Mentor", "Pathfinder", "Luminary", "Shepherd"],
  Connector: ["Bridge", "Nexus", "Catalyst", "Weaver", "Synapse", "Hub"],
  Builder: ["Forge", "Foundation", "Maker", "Ironclad", "Anvil", "Keystone"],
  Reporter: ["Signal", "Lens", "Probe", "Spotlight", "Dispatch", "Cipher"],
  Comedian: ["Spark", "Jester", "Flash", "Wildcard", "Quip", "Volt"],
  Storyteller: ["Echo", "Chronicle", "Narrative", "Saga", "Fable", "Lore"],
  Artist: ["Canvas", "Prism", "Vision", "Muse", "Palette", "Aurora"],
  Strategist: ["Blueprint", "Tactical", "Apex", "Vanguard", "Keystone", "Vector"],
  Philosopher: ["Sage", "Depth", "Oracle", "Insight", "Zenith", "Essence"],
  Teacher: ["Clarity", "Lighthouse", "Academy", "Scholar", "Primer", "Beacon"],
  "Systems Thinker": ["Matrix", "Integral", "Lattice", "Network", "Nexus", "Circuit"],
};

const IDENTITY_SUFFIXES: Record<ArchetypeName, string[]> = {
  Pirate: ["Rebel", "Raider", "Outlaw", "Renegade", "Disruptor", "Buccaneer"],
  Guide: ["Navigator", "Shepherd", "Wayfinder", "Pathmaker", "Luminary", "Steward"],
  Connector: ["Ambassador", "Networker", "Liaison", "Catalyst", "Synergist", "Diplomat"],
  Builder: ["Architect", "Engineer", "Crafter", "Constructor", "Forger", "Smith"],
  Reporter: ["Investigator", "Analyst", "Observer", "Chronicler", "Sentinel", "Scout"],
  Comedian: ["Entertainer", "Satirist", "Provocateur", "Performer", "Igniter", "Trickster"],
  Storyteller: ["Narrator", "Bard", "Weaver", "Scribe", "Mythmaker", "Minstrel"],
  Artist: ["Creator", "Visionary", "Sculptor", "Dreamer", "Artisan", "Composer"],
  Strategist: ["Commander", "Planner", "Director", "Executor", "Tactician", "Marshal"],
  Philosopher: ["Thinker", "Seeker", "Scholar", "Mystic", "Sage", "Alchemist"],
  Teacher: ["Educator", "Professor", "Mentor", "Illuminator", "Guide", "Tutor"],
  "Systems Thinker": ["Optimizer", "Analyst", "Integrator", "Synthesizer", "Mechanic", "Mapper"],
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
  const prefixes = IDENTITY_PREFIXES[chord.core];
  const suffixes = IDENTITY_SUFFIXES[chord.balance];
  const key = `${chord.core}-${chord.balance}-${chord.inverse}`;
  const hash = hashCode(key);
  const prefix = prefixes[hash % prefixes.length];
  const suffix = suffixes[(hash >> 4) % suffixes.length];

  if (prefix === suffix) {
    const altSuffix = suffixes[(hash >> 8) % suffixes.length];
    return `${prefix} ${altSuffix}`;
  }
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
    "Builder-Connector": "A practical bridge-builder who constructs tangible pathways between ideas and people.",
    "Artist-Philosopher": "A reflective creator who channels deep thought into evocative expression.",
    "Reporter-Strategist": "A data-driven detective who uncovers insights and turns them into action plans.",
    "Teacher-Connector": "A community educator who multiplies knowledge through genuine human connection.",
    "Pirate-Artist": "A rebellious creative who breaks every rule to forge something truly original.",
    "Guide-Philosopher": "A wise counselor who helps others find meaning through thoughtful exploration.",
  };

  const key = `${chord.core}-${chord.balance}`;
  if (descriptions[key]) return descriptions[key];

  return `A unique blend of ${chord.core} vision and ${chord.balance} execution, creating unexpected value through the lens of the ${chord.inverse}.`;
}

export function generateIdentity(chord: ArchetypeChord, rarity: number = 5): Identity {
  const name = generateIdentityName(chord);
  const description = generateIdentityDescription(chord);
  return { name, description, chord, rarity };
}
