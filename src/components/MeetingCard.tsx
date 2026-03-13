"use client";

import { Meeting } from "@/types";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

interface MeetingCardProps {
  meeting: Meeting;
  onJoin?: () => void;
}

const TYPE_STYLES: Record<string, { label: string; color: string; bg: string; stripe: string }> = {
  peer: { label: "Peer Learning", color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30", stripe: "#059669" },
  collaboration: { label: "Collaboration", color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30", stripe: "#2563EB" },
  mastermind: { label: "Mastermind", color: "text-purple-700 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/30", stripe: "#7C3AED" },
};

export default function MeetingCard({ meeting, onJoin }: MeetingCardProps) {
  const typeInfo = TYPE_STYLES[meeting.type] ?? TYPE_STYLES.peer;
  const date = new Date(meeting.dateTime);
  const spotsLeft = meeting.participantLimit - (meeting.participantCount ?? 0);
  const isFull = spotsLeft <= 0;
  const isPast = date < new Date();

  return (
    <div className={`rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 ${meeting.cancelled ? "opacity-60" : ""}`}>
      <div className="h-1.5 w-full" style={{ backgroundColor: typeInfo.stripe }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeInfo.bg} ${typeInfo.color}`}>
            {typeInfo.label}
          </span>
          {meeting.cancelled ? (
            <span className="text-xs font-semibold text-red-500">Cancelled</span>
          ) : isFull ? (
            <span className="text-xs font-semibold text-orange-500">Full</span>
          ) : (
            <span className="text-xs text-gray-400 dark:text-gray-500">{spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left</span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{meeting.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{meeting.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1.5">
            <CalendarDays size={14} className="shrink-0" aria-hidden="true" />
            <time dateTime={meeting.dateTime}>{date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="shrink-0" aria-hidden="true" />
            {date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          </div>
          <span>{meeting.duration}min</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {meeting.hostName && (<>Hosted by <span className="font-medium text-gray-600 dark:text-gray-300">{meeting.hostName}</span></>)}
          </p>
          {onJoin && !isFull && !isPast && !meeting.cancelled && (
            <button onClick={onJoin} className="group/btn inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 hover:shadow-lg">
              Join
              <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
