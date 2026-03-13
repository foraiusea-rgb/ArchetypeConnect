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
    <div className="relative overflow-hidden rounded-[28px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 shadow-[0_12px_40px_rgba(0,0,0,0.08)] animate-scale-in">
      <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${coreArchetype.color}18, ${balanceArchetype.color}12, ${inverseArchetype.color}08)` }}>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-800 to-transparent" />
      </div>

      <div className="relative -mt-12 flex justify-center">
        <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-800" style={{ background: `linear-gradient(135deg, ${coreArchetype.color}15, ${coreArchetype.color}08)` }}>
          <ArchetypeIcon name={identity.chord.core as ArchetypeName} size={38} color={coreArchetype.color} />
        </div>
      </div>

      <div className="relative px-8 pb-8 pt-4 text-center">
        <h2 className="text-2xl font-bold font-display text-[#1A1A2E] dark:text-gray-100 mb-1">{identity.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{identity.description}</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Core", name: identity.chord.core, data: coreArchetype },
            { label: "Balance", name: identity.chord.balance, data: balanceArchetype },
            { label: "Inverse", name: identity.chord.inverse, data: inverseArchetype },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-xl bg-gray-50/80 dark:bg-slate-700/50 border border-black/[0.04] dark:border-slate-600">
              <div className="flex justify-center mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.data.color }} />
              </div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-bold text-[#1A1A2E] dark:text-gray-100 mt-0.5">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: `${coreArchetype.color}10`, color: coreArchetype.color }}>
          <Sparkles size={14} aria-hidden="true" />
          {identity.rarity <= 5 ? "Exceptionally rare identity" : identity.rarity <= 15 ? `Only ${identity.rarity}% of users share this identity` : `${identity.rarity}% of users share this identity`}
        </div>

        {showShare && (
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={handleShare} className="px-5 py-2.5 rounded-xl bg-[#D4654A] text-white text-sm font-semibold hover:bg-[#C05A42] transition-all shadow-sm hover:shadow-md">
              Share Result
            </button>
            <a href={`/groups/${identity.chord.core.toLowerCase().replace(/\s+/g, "-")}`} className="px-5 py-2.5 rounded-xl border-2 border-black/[0.08] dark:border-slate-600 text-[#1A1A2E] dark:text-gray-300 text-sm font-semibold hover:bg-black/[0.02] dark:hover:bg-slate-700 transition-colors">
              Join Your Group
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
