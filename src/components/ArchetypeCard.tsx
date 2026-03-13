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
      <div className="flex items-center gap-3 p-3 rounded-[14px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700" style={{ borderLeft: `4px solid ${archetype.color}` }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${archetype.color}15` }}>
          <ArchetypeIcon name={name} size={18} color={archetype.color} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[#1A1A2E] dark:text-gray-100">{name}</p>
          {label && <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>}
        </div>
        {score !== undefined && (
          <span className="text-sm font-bold px-2 py-0.5 rounded-lg" style={{ backgroundColor: `${archetype.color}10`, color: archetype.color }}>
            {score}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="group relative rounded-[20px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
      style={{ borderColor: undefined }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = `${archetype.color}25`}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'}
    >
      {/* Big visual area */}
      <div className="h-[120px] flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${archetype.color}12, ${archetype.color}05)` }}>
        <ArchetypeIcon name={name} size={40} color={archetype.color} />
        {label && (
          <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-lg" style={{ backgroundColor: `${archetype.color}12`, color: archetype.color }}>
            {label}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: archetype.color }} />
          <h3 className="text-lg font-bold text-[#1A1A2E] dark:text-gray-100">{name}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">{archetype.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {archetype.traits.map((trait) => (
            <span key={trait} className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ backgroundColor: `${archetype.color}08`, color: archetype.color }}>
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
            <div className="h-2.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${percentage}%`, background: `linear-gradient(90deg, ${archetype.color}bb, ${archetype.color})` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
