"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MeetingCard from "@/components/MeetingCard";
import { Meeting, PaginatedResponse } from "@/types";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Peer Learning", value: "peer" },
  { label: "Collaboration", value: "collaboration" },
  { label: "Mastermind", value: "mastermind" },
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 bg-gray-100 rounded w-48 mb-4 animate-pulse" />
        <div className="h-6 bg-gray-100 rounded w-96 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-24 mb-4" />
              <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-full mb-4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
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
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silently fail, show empty state
    } finally {
      setLoading(false);
    }
  }, [currentPage, typeFilter, searchQuery]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "1") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/meetings?${params.toString()}`);
  };

  const handleFilterChange = (value: string) => {
    updateParams({ type: value, page: "1" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: search, page: "1" });
  };

  const meetings = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Meetings
            </h1>
            <p className="text-lg text-gray-500">
              Browse, join, or create meetings with compatible creators.
            </p>
          </div>
          <a
            href="/meetings/create"
            className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 shrink-0"
          >
            + Create Meeting
          </a>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meetings..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-gray-900 text-sm"
              aria-label="Search meetings"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>

        {/* Meeting Type Filters */}
        <div className="flex gap-3 mb-8 flex-wrap" role="group" aria-label="Filter by meeting type">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                typeFilter === filter.value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600"
              }`}
              aria-pressed={typeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-24 mb-4" />
                <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-full mb-4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : meetings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="text-5xl mb-4" aria-hidden="true">&#128197;</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {searchQuery || typeFilter !== "all" ? "No meetings match your filters" : "No meetings yet"}
            </h2>
            <p className="text-gray-500 mb-6">
              {searchQuery || typeFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Be the first to create a meeting and bring creators together."}
            </p>
            <a
              href="/meetings/create"
              className="inline-flex px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Create Your First Meeting
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>

            {/* Pagination */}
            {data && data.total > data.pageSize && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  onClick={() => updateParams({ page: String(currentPage - 1) })}
                  disabled={currentPage <= 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-500">
                  Page {data.page} of {Math.ceil(data.total / data.pageSize)}
                </span>
                <button
                  onClick={() => updateParams({ page: String(currentPage + 1) })}
                  disabled={!data.hasMore}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
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
