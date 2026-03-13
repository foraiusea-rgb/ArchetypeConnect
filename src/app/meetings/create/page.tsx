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
    title: "",
    description: "",
    dateTime: "",
    duration: "60",
    type: "peer",
    participantLimit: "10",
    groupSlug: GROUPS[0].slug,
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
          title: form.title,
          description: form.description,
          dateTime: form.dateTime,
          duration: parseInt(form.duration),
          type: form.type,
          participantLimit: parseInt(form.participantLimit),
          groupSlug: form.groupSlug,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          toast("Please sign in to create a meeting", "error");
          router.push("/login");
          return;
        }
        if (data.details && Array.isArray(data.details)) {
          const fieldErrors: Record<string, string> = {};
          data.details.forEach((d: { path: string[]; message: string }) => {
            if (d.path?.[0]) fieldErrors[d.path[0]] = d.message;
          });
          setErrors(fieldErrors);
          toast("Please fix the errors below", "error");
        } else {
          toast(data.error || "Failed to create meeting", "error");
        }
        return;
      }

      toast("Meeting created successfully!", "success");
      router.push("/meetings");
    } catch {
      toast("Network error. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field] ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-100"
    } focus:ring-2 outline-none transition-all text-gray-900`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create a Meeting
          </h1>
          <p className="text-gray-500">
            Set up a session for creators to connect and collaborate.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6"
          noValidate
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Meeting Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Weekly Strategist Sync"
              className={inputClass("title")}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What will this meeting be about?"
              rows={3}
              className={`${inputClass("description")} resize-none`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Date & Time + Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dateTime" className="block text-sm font-semibold text-gray-700 mb-2">
                Date &amp; Time
              </label>
              <input
                id="dateTime"
                type="datetime-local"
                required
                value={form.dateTime}
                onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                className={inputClass("dateTime")}
              />
              {errors.dateTime && <p className="text-red-500 text-xs mt-1">{errors.dateTime}</p>}
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <select
                id="duration"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className={inputClass("duration")}
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>

          {/* Type + Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                Meeting Type
              </label>
              <select
                id="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass("type")}
              >
                <option value="peer">Peer Learning</option>
                <option value="collaboration">Collaboration</option>
                <option value="mastermind">Mastermind Session</option>
              </select>
            </div>
            <div>
              <label htmlFor="groupSlug" className="block text-sm font-semibold text-gray-700 mb-2">
                Group
              </label>
              <select
                id="groupSlug"
                value={form.groupSlug}
                onChange={(e) => setForm({ ...form, groupSlug: e.target.value })}
                className={inputClass("groupSlug")}
              >
                {GROUPS.map((group) => (
                  <option key={group.slug} value={group.slug}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Participant Limit */}
          <div>
            <label htmlFor="participantLimit" className="block text-sm font-semibold text-gray-700 mb-2">
              Participant Limit
            </label>
            <input
              id="participantLimit"
              type="number"
              min="2"
              max="50"
              value={form.participantLimit}
              onChange={(e) =>
                setForm({ ...form, participantLimit: e.target.value })
              }
              className={inputClass("participantLimit")}
            />
            {errors.participantLimit && <p className="text-red-500 text-xs mt-1">{errors.participantLimit}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
          >
            {submitting ? "Creating..." : "Create Meeting"}
          </button>
        </form>
      </div>
    </div>
  );
}
