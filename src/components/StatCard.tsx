import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color?: string;
}

export default function StatCard({ label, value, icon, trend, color = "#D4654A" }: StatCardProps) {
  return (
    <div className="relative p-6 rounded-[20px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] text-center">
      <div className="h-[3px] absolute top-0 left-0 right-0" style={{ backgroundColor: color }} />
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${color}10`, color }}>
        {icon}
      </div>
      <p className="text-3xl font-extrabold text-[#1A1A2E] dark:text-gray-100 tracking-tight">{value}</p>
      <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mt-1">{label}</p>
      {trend && (
        <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
  );
}
