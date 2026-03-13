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
      className="group block rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: group.color }} />
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ backgroundColor: `${group.color}20`, boxShadow: `0 0 0 3px ${group.color}08` }}
          >
            <ArchetypeIcon name={group.archetype as ArchetypeName} size={24} color={group.color} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {group.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {group.description}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                {group.memberCount} member{group.memberCount !== 1 ? "s" : ""}
              </span>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${group.color}18`, color: group.color, fontWeight: 700 }}
              >
                {group.archetype}
              </span>
            </div>
          </div>
          <ChevronRight
            size={18}
            className="text-gray-300 dark:text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 mt-1"
          />
        </div>
      </div>
    </a>
  );
}
