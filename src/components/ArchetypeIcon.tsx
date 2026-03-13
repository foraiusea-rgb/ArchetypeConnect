"use client";

import {
  Skull,
  Compass,
  Link,
  Hammer,
  Radio,
  Drama,
  BookOpen,
  Palette,
  Target,
  Brain,
  GraduationCap,
  Cog,
} from "lucide-react";
import { ArchetypeName } from "@/types";

const ICON_MAP: Record<ArchetypeName, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; color?: string }>> = {
  Pirate: Skull,
  Guide: Compass,
  Connector: Link,
  Builder: Hammer,
  Reporter: Radio,
  Comedian: Drama,
  Storyteller: BookOpen,
  Artist: Palette,
  Strategist: Target,
  Philosopher: Brain,
  Teacher: GraduationCap,
  "Systems Thinker": Cog,
};

interface ArchetypeIconProps {
  name: ArchetypeName;
  size?: number;
  className?: string;
  color?: string;
}

export default function ArchetypeIcon({ name, size = 24, className = "", color }: ArchetypeIconProps) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} color={color} strokeWidth={1.75} />;
}
