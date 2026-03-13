"use client";

import { ArchetypeName } from "@/types";
import { ARCHETYPES } from "@/lib/archetypes";
import ArchetypeIcon from "./ArchetypeIcon";

interface ArchetypeCardProps {
  name: ArchetypeName;
  score?: number;
  maxScore?: number;
  label?: string;
  compact?: boolean;
}

export default function ArchetypeCard({
  name,
  score,
  maxScore,
  label,
  compact,
}: ArchetypeCardProps) {
  const archetype = ARCHETYPES[name];
  if (!archetype) return null;

  const percentage = score && maxScore ? (score / maxScore) * 100 : 0;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm" style={{ borderLeft: `3px solid ${archetype.color}` }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${archetype.color}15` }}>
          <ArchetypeIcon name={name} size={18} color={archetype.color} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{name}</p>
          {label && <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>}
        </div>
        {score !== undefined && (
          <span className="text-sm font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${archetype.color}15`, color: archetype.color }}>
            {score}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="group relative p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ borderLeft: `3px solid ${archetype.color}` }}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${archetype.color}10, ${archetype.color}20)` }} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${archetype.color}20, ${archetype.color}10)`, border: `1px solid ${archetype.color}20` }}>
            <ArchetypeIcon name={name} size={24} color={archetype.color} />
          </div>
          {label && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${archetype.color}15`, color: archetype.color }}>
              {label}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{archetype.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {archetype.traits.map((trait) => (
            <span key={trait} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-slate-600">
              {trait}
            </span>
          ))}
        </div>
        {score !== undefined && maxScore && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Score</span>
              <span>{score} / {maxScore}</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${percentage}%`, background: `linear-gradient(90deg, ${archetype.color}88, ${archetype.color})`, boxShadow: `0 0 8px ${archetype.color}40` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
