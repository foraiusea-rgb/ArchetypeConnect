"use client";

import { Meeting } from "@/types";

interface MeetingCardProps {
  meeting: Meeting;
  onJoin?: () => void;
}

const TYPE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  peer: { label: "Peer Learning", color: "text-emerald-700", bg: "bg-emerald-50" },
  collaboration: { label: "Collaboration", color: "text-blue-700", bg: "bg-blue-50" },
  mastermind: { label: "Mastermind", color: "text-purple-700", bg: "bg-purple-50" },
};

export default function MeetingCard({ meeting, onJoin }: MeetingCardProps) {
  const typeInfo = TYPE_LABELS[meeting.type] ?? TYPE_LABELS.peer;
  const date = new Date(meeting.dateTime);
  const spotsLeft = meeting.participantLimit - (meeting.participantCount ?? 0);
  const isFull = spotsLeft <= 0;
  const isPast = date < new Date();

  return (
    <div className={`p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 ${meeting.cancelled ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${typeInfo.bg} ${typeInfo.color}`}
        >
          {typeInfo.label}
        </span>
        {meeting.cancelled ? (
          <span className="text-xs font-semibold text-red-500">Cancelled</span>
        ) : isFull ? (
          <span className="text-xs font-semibold text-orange-500">Full</span>
        ) : (
          <span className="text-xs text-gray-400">
            {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{meeting.title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {meeting.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <time dateTime={meeting.dateTime}>
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </div>
        <div className="flex items-center gap-1.5">
          {meeting.duration}min
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {meeting.hostName && (
            <>Hosted by <span className="font-medium text-gray-600">{meeting.hostName}</span></>
          )}
        </p>
        {onJoin && !isFull && !isPast && !meeting.cancelled && (
          <button
            onClick={onJoin}
            className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
}
