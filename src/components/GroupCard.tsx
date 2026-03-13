"use client";

import { GroupInfo, ArchetypeName } from "@/types";
import ArchetypeIcon from "./ArchetypeIcon";
import { ChevronRight } from "lucide-react";

interface GroupCardProps {
  group: GroupInfo;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <a
      href={`/groups/${group.slug}`}
      className="group block rounded-[20px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
      onMouseEnter={(e) => e.currentTarget.style.borderColor = `${group.color}20`}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'}
    >
      {/* Big visual area */}
      <div className="h-[100px] flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${group.color}12, ${group.color}05)` }}>
        <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <ArchetypeIcon name={group.archetype as ArchetypeName} size={36} color={group.color} />
        </div>
        {/* Gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-slate-800 to-transparent" />
      </div>

      <div className="px-5 pb-5 pt-1">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-[#1A1A2E] dark:text-gray-100 group-hover:text-[#D4654A] dark:group-hover:text-[#E8806A] transition-colors">
              {group.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {group.description}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                {group.memberCount} member{group.memberCount !== 1 ? "s" : ""}
              </span>
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-lg"
                style={{ backgroundColor: `${group.color}10`, color: group.color }}
              >
                {group.archetype}
              </span>
            </div>
          </div>
          <ChevronRight
            size={18}
            className="text-gray-300 dark:text-gray-600 group-hover:text-[#D4654A] group-hover:translate-x-1 transition-all shrink-0 mt-1"
          />
        </div>
      </div>
    </a>
  );
}
