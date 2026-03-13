"use client";

export function SkeletonLine({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton-shimmer rounded ${className}`} style={style} />;
}

export function SkeletonMeetingCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div className="h-1 skeleton-shimmer" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <SkeletonLine className="h-6 w-24" />
          <SkeletonLine className="h-4 w-16" />
        </div>
        <SkeletonLine className="h-6 w-3/4" />
        <SkeletonLine className="h-4 w-full" />
        <div className="flex gap-4">
          <SkeletonLine className="h-4 w-24" />
          <SkeletonLine className="h-4 w-16" />
          <SkeletonLine className="h-4 w-12" />
        </div>
        <div className="flex justify-between">
          <SkeletonLine className="h-4 w-32" />
          <SkeletonLine className="h-9 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonIdentityCard() {
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div className="h-32 skeleton-shimmer" />
      <div className="flex justify-center -mt-12">
        <div className="w-24 h-24 rounded-2xl skeleton-shimmer border-4 border-white dark:border-slate-800" />
      </div>
      <div className="px-8 pb-8 pt-4 space-y-4 flex flex-col items-center">
        <SkeletonLine className="h-8 w-48" />
        <SkeletonLine className="h-4 w-64" />
        <div className="grid grid-cols-3 gap-3 w-full">
          {[0, 1, 2].map((i) => (
            <div key={i} className="p-3 rounded-xl border border-gray-100 dark:border-slate-700 space-y-2 flex flex-col items-center">
              <SkeletonLine className="h-5 w-5 rounded-full" />
              <SkeletonLine className="h-3 w-10" />
              <SkeletonLine className="h-4 w-16" />
            </div>
          ))}
        </div>
        <SkeletonLine className="h-8 w-48 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonBarChart() {
  return (
    <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonLine className="h-4 w-24 shrink-0" />
          <div className="flex-1 h-4 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <SkeletonLine className="h-full" style={{ width: `${60 - i * 8}%` } as React.CSSProperties} />
          </div>
          <SkeletonLine className="h-4 w-8 shrink-0" />
        </div>
      ))}
    </div>
  );
}
