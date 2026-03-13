"use client";

import { GroupInfo } from "@/types";

interface GroupCardProps {
  group: GroupInfo;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <a
      href={`/groups/${group.slug}`}
      className="group block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: `${group.color}15` }}
        >
          {group.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {group.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {group.description}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs font-medium text-gray-400">
              {group.memberCount} member{group.memberCount !== 1 ? "s" : ""}
            </span>
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${group.color}15`,
                color: group.color,
              }}
            >
              {group.archetype}
            </span>
          </div>
        </div>
        <svg
          className="w-5 h-5 text-gray-300 group-hover:text-indigo-400 transition-colors shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
}
