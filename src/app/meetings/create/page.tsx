"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { GROUPS } from "@/lib/archetypes";

export default function CreateMeetingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "", description: "", dateTime: "", duration: "60",
    type: "peer", participantLimit: "10", groupSlug: GROUPS[0].slug,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title, description: form.description, dateTime: form.dateTime,
          duration: parseInt(form.duration), type: form.type,
          participantLimit: parseInt(form.participantLimit), groupSlug: form.groupSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) { toast("Please sign in to create a meeting", "error"); router.push("/login"); return; }
        if (data.details && Array.isArray(data.details)) {
          const fieldErrors: Record<string, string> = {};
          data.details.forEach((d: { path: string[]; message: string }) => { if (d.path?.[0]) fieldErrors[d.path[0]] = d.message; });
          setErrors(fieldErrors);
          toast("Please fix the errors below", "error");
        } else { toast(data.error || "Failed to create meeting", "error"); }
        return;
      }
      toast("Meeting created successfully!", "success");
      router.push("/meetings");
    } catch { toast("Network error. Please try again.", "error"); } finally { setSubmitting(false); }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field] ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-black/[0.06] focus:border-[#D4654A] focus:ring-[#D4654A]/20 dark:border-white/10 dark:focus:ring-[#D4654A]/30"
    } bg-white dark:bg-slate-700 focus:ring-2 outline-none transition-all text-[#1A1A2E] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">New Session</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-2 font-display">Create a Meeting</h1>
          <p className="text-gray-500 dark:text-gray-400">Set up a session for creators to connect and collaborate.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-[20px] border border-black/[0.06] dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-8 space-y-6" noValidate>
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-[#1A1A2E] dark:text-gray-300 mb-2">Meeting Title</label>
            <input id="title" type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Weekly Strategist Sync" className={inputClass("title")} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-[#1A1A2E] dark:text-gray-300 mb-2">Description</label>
            <textarea id="description" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What will this meeting be about?" rows={3} className={`${inputClass("description")} resize-none`} />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dateTime" className="block text-sm font-semibold text-[#1A1A2E] dark:text-gray-300 mb-2">Date &amp; Time</label>
              <input id="dateTime" type="datetime-local" required value={form.dateTime} onChange={(e) => setForm({ ...form, dateTime: e.target.value })} className={inputClass("dateTime")} />
              {errors.dateTime && <p className="text-red-500 text-xs mt-1">{errors.dateTime}</p>}
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-[#1A1A2E] dark:text-gray-300 mb-2">Duration (minutes)</label>
              <select id="duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className={inputClass("duration")}>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-[#1A1A2E] dark:text-gray-300 mb-2">Meeting Type</label>
              <select id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass("type")}>
                <option value="peer">Peer Learning</option>
                <option value="collaboration">Collaboration</option>
                <option value="mastermind">Mastermind Session</option>
              </select>
            </div>
            <div>
              <label htmlFor="groupSlug" className="block text-sm font-semibold text-[#1A1A2E] dark:text-gray-300 mb-2">Group</label>
              <select id="groupSlug" value={form.groupSlug} onChange={(e) => setForm({ ...form, groupSlug: e.target.value })} className={inputClass("groupSlug")}>
                {GROUPS.map((g) => (<option key={g.slug} value={g.slug}>{g.name}</option>))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="participantLimit" className="block text-sm font-semibold text-[#1A1A2E] dark:text-gray-300 mb-2">Participant Limit</label>
            <input id="participantLimit" type="number" min="2" max="50" value={form.participantLimit} onChange={(e) => setForm({ ...form, participantLimit: e.target.value })} className={inputClass("participantLimit")} />
            {errors.participantLimit && <p className="text-red-500 text-xs mt-1">{errors.participantLimit}</p>}
          </div>

          <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl bg-[#D4654A] text-white font-semibold text-lg hover:bg-[#C05A42] disabled:opacity-50 transition-all shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            {submitting ? "Creating..." : "Create Meeting"}
          </button>
        </form>
      </div>
    </div>
  );
}
