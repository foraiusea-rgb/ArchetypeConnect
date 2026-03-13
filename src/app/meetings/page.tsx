"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MeetingCard from "@/components/MeetingCard";
import { SkeletonMeetingCard } from "@/components/Skeleton";
import AnimateIn from "@/components/AnimateIn";
import { Meeting, PaginatedResponse } from "@/types";
import { Search, LayoutGrid, Users, Handshake, Brain, CalendarDays, Plus } from "lucide-react";

const FILTERS = [
  { label: "All", value: "all", icon: <LayoutGrid size={14} /> },
  { label: "Peer Learning", value: "peer", icon: <Users size={14} /> },
  { label: "Collaboration", value: "collaboration", icon: <Handshake size={14} /> },
  { label: "Mastermind", value: "mastermind", icon: <Brain size={14} /> },
] as const;

export default function MeetingsPage() {
  return (
    <Suspense fallback={<MeetingsLoading />}>
      <MeetingsContent />
    </Suspense>
  );
}

function MeetingsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skeleton-shimmer h-12 rounded w-48 mb-4" />
        <div className="skeleton-shimmer h-6 rounded w-96 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (<SkeletonMeetingCard key={i} />))}
        </div>
      </div>
    </div>
  );
}

function MeetingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [data, setData] = useState<PaginatedResponse<Meeting> | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchQuery);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", String(currentPage));
    params.set("pageSize", "12");
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (searchQuery) params.set("search", searchQuery);
    try {
      const res = await fetch(`/api/meetings?${params.toString()}`);
      if (res.ok) setData(await res.json());
    } catch { /* empty state */ } finally { setLoading(false); }
  }, [currentPage, typeFilter, searchQuery]);

  useEffect(() => { fetchMeetings(); }, [fetchMeetings]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "1") params.set(key, value);
      else params.delete(key);
    });
    router.push(`/meetings?${params.toString()}`);
  };

  const meetings = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Header */}
      <div className="hero-gradient py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-display">Meetings</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">Browse, join, or create meetings with compatible creators.</p>
              </div>
              <a href="/meetings/create" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-300/40 dark:shadow-indigo-900/30 shrink-0 hover:shadow-xl hover:-translate-y-0.5">
                <Plus size={16} /> Create Meeting
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <form onSubmit={(e) => { e.preventDefault(); updateParams({ search, page: "1" }); }} className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meetings..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm"
              aria-label="Search meetings"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          </div>
        </form>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap" role="group" aria-label="Filter by meeting type">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => updateParams({ type: filter.value, page: "1" })}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                typeFilter === filter.value
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900/30"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm"
              }`}
              aria-pressed={typeFilter === filter.value}
            >
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (<SkeletonMeetingCard key={i} />))}
          </div>
        ) : meetings.length === 0 ? (
          <div className="relative rounded-3xl border border-gray-100 dark:border-slate-700 shadow-lg p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 dark:from-indigo-950/30 dark:via-slate-800 dark:to-purple-950/20" />
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mx-auto mb-5">
                <CalendarDays size={36} className="text-indigo-500 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-display">
                {searchQuery || typeFilter !== "all" ? "No meetings match your filters" : "No meetings yet"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {searchQuery || typeFilter !== "all" ? "Try adjusting your search or filters." : "Be the first to create a meeting and bring creators together."}
              </p>
              <a href="/meetings/create" className="inline-flex px-7 py-3.5 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-300/40 hover:shadow-xl hover:-translate-y-0.5">
                Create Your First Meeting
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetings.map((meeting, i) => (
                <AnimateIn key={meeting.id} delay={i * 0.05}>
                  <MeetingCard meeting={meeting} />
                </AnimateIn>
              ))}
            </div>
            {data && data.total > data.pageSize && (
              <div className="flex justify-center gap-2 mt-10">
                <button onClick={() => updateParams({ page: String(currentPage - 1) })} disabled={currentPage <= 1} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Page {data.page} of {Math.ceil(data.total / data.pageSize)}
                </span>
                <button onClick={() => updateParams({ page: String(currentPage + 1) })} disabled={!data.hasMore} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
