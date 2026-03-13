import { ArchetypeName, GroupInfo } from "@/types";

export const ARCHETYPES: Record<
  ArchetypeName,
  { description: string; color: string; icon: string; traits: string[] }
> = {
  Pirate: {
    description:
      "Bold risk-takers who challenge conventions and forge new paths. Pirates thrive in uncertainty and inspire others to break free from the status quo.",
    color: "#E11D48",
    icon: "⚓",
    traits: ["Bold", "Disruptive", "Independent", "Adventurous"],
  },
  Guide: {
    description:
      "Trusted mentors who illuminate pathways for others. Guides combine wisdom with empathy to help people navigate complex journeys.",
    color: "#7C3AED",
    icon: "🧭",
    traits: ["Wise", "Empathetic", "Patient", "Nurturing"],
  },
  Connector: {
    description:
      "Social architects who bridge communities and ideas. Connectors see relationships where others see gaps and thrive on bringing people together.",
    color: "#2563EB",
    icon: "🔗",
    traits: ["Social", "Networking", "Collaborative", "Inclusive"],
  },
  Builder: {
    description:
      "Hands-on creators who turn ideas into reality. Builders focus on execution, craftsmanship, and making tangible impact through their work.",
    color: "#D97706",
    icon: "🔨",
    traits: ["Practical", "Persistent", "Detail-oriented", "Productive"],
  },
  Reporter: {
    description:
      "Truth-seekers who uncover stories and share insights. Reporters are driven by curiosity and a commitment to transparency and clarity.",
    color: "#059669",
    icon: "📡",
    traits: ["Curious", "Investigative", "Objective", "Articulate"],
  },
  Comedian: {
    description:
      "Sharp observers who use humor to reveal truth. Comedians disarm tension and create connection through wit and authentic self-expression.",
    color: "#F59E0B",
    icon: "🎭",
    traits: ["Witty", "Observant", "Charismatic", "Expressive"],
  },
  Storyteller: {
    description:
      "Narrative weavers who transform experiences into meaning. Storytellers captivate audiences and make complex ideas resonate through compelling tales.",
    color: "#EC4899",
    icon: "📖",
    traits: ["Creative", "Engaging", "Imaginative", "Emotional"],
  },
  Artist: {
    description:
      "Visual thinkers who express ideas through aesthetics. Artists bring beauty and originality to everything they touch, inspiring new perspectives.",
    color: "#8B5CF6",
    icon: "🎨",
    traits: ["Creative", "Expressive", "Intuitive", "Original"],
  },
  Strategist: {
    description:
      "Pattern-spotters who design winning approaches. Strategists excel at seeing the big picture and creating frameworks for success.",
    color: "#0891B2",
    icon: "♟️",
    traits: ["Analytical", "Visionary", "Decisive", "Systematic"],
  },
  Philosopher: {
    description:
      "Deep thinkers who question assumptions and explore meaning. Philosophers bring intellectual depth and conceptual clarity to every conversation.",
    color: "#6366F1",
    icon: "💭",
    traits: ["Reflective", "Intellectual", "Principled", "Contemplative"],
  },
  Teacher: {
    description:
      "Knowledge amplifiers who empower others to grow. Teachers break down complexity and create learning experiences that transform understanding.",
    color: "#14B8A6",
    icon: "📚",
    traits: ["Patient", "Clear", "Structured", "Empowering"],
  },
  "Systems Thinker": {
    description:
      "Complexity navigators who see how everything connects. Systems Thinkers reveal hidden patterns and design solutions that address root causes.",
    color: "#64748B",
    icon: "⚙️",
    traits: ["Holistic", "Analytical", "Integrative", "Methodical"],
  },
};

export const ARCHETYPE_NAMES = Object.keys(ARCHETYPES) as ArchetypeName[];

export const GROUPS: GroupInfo[] = ARCHETYPE_NAMES.map((name) => ({
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  name: `${name} Group`,
  archetype: name,
  description: ARCHETYPES[name].description,
  memberCount: 0,
  color: ARCHETYPES[name].color,
  icon: ARCHETYPES[name].icon,
}));

export const COMPLEMENTARY_PAIRS: [ArchetypeName, ArchetypeName][] = [
  ["Strategist", "Builder"],
  ["Storyteller", "Connector"],
  ["Teacher", "Artist"],
  ["Philosopher", "Pirate"],
  ["Guide", "Reporter"],
  ["Comedian", "Systems Thinker"],
];

export function getArchetypeColor(name: ArchetypeName): string {
  return ARCHETYPES[name]?.color ?? "#64748B";
}

export function getArchetypeIcon(name: ArchetypeName): string {
  return ARCHETYPES[name]?.icon ?? "✦";
}
