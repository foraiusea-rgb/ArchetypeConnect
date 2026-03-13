"use client";

import { Identity, ArchetypeName } from "@/types";
import { ARCHETYPES } from "@/lib/archetypes";
import ArchetypeIcon from "./ArchetypeIcon";
import { useToast } from "@/components/Toast";
import { Sparkles } from "lucide-react";

interface IdentityCardProps {
  identity: Identity;
  showShare?: boolean;
}

export default function IdentityCard({ identity, showShare }: IdentityCardProps) {
  const { toast } = useToast();
  const coreArchetype = ARCHETYPES[identity.chord.core];
  const balanceArchetype = ARCHETYPES[identity.chord.balance];
  const inverseArchetype = ARCHETYPES[identity.chord.inverse];

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard!", "success");
    } catch {
      toast("Could not copy link", "error");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xl animate-scale-in">
      <div className="absolute inset-0 rounded-3xl" style={{ background: `linear-gradient(135deg, ${coreArchetype.color}12, ${balanceArchetype.color}12)` }} />

      <div className="h-40 relative" style={{ background: `linear-gradient(135deg, ${coreArchetype.color}, ${coreArchetype.color}cc 40%, ${balanceArchetype.color})` }}>
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-slate-800 to-transparent" />
      </div>

      <div className="relative -mt-14 flex justify-center">
        <div className="w-28 h-28 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 shadow-xl border-4 border-white dark:border-slate-800" style={{ background: `linear-gradient(135deg, ${coreArchetype.color}25, ${coreArchetype.color}10)`, boxShadow: `0 8px 30px ${coreArchetype.color}25` }}>
          <ArchetypeIcon name={identity.chord.core as ArchetypeName} size={42} color={coreArchetype.color} />
        </div>
      </div>

      <div className="relative px-8 pb-8 pt-4 text-center">
        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-gray-100 mb-1">{identity.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{identity.description}</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Core", name: identity.chord.core, data: coreArchetype },
            { label: "Balance", name: identity.chord.balance, data: balanceArchetype },
            { label: "Inverse", name: identity.chord.inverse, data: inverseArchetype },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-700/50" style={{ borderLeft: `3px solid ${item.data.color}` }}>
              <div className="flex justify-center mb-1">
                <ArchetypeIcon name={item.name as ArchetypeName} size={20} color={item.data.color} />
              </div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm" style={{ backgroundColor: `${coreArchetype.color}12`, color: coreArchetype.color }}>
          <Sparkles size={14} aria-hidden="true" />
          {identity.rarity <= 5 ? "Exceptionally rare identity" : identity.rarity <= 15 ? `Only ${identity.rarity}% of users share this identity` : `${identity.rarity}% of users share this identity`}
        </div>

        {showShare && (
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={handleShare} className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
              Share Result
            </button>
            <a href={`/groups/${identity.chord.core.toLowerCase().replace(/\s+/g, "-")}`} className="px-5 py-2.5 rounded-full border-2 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
              Join Your Group
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
