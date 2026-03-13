"use client";

import { Identity } from "@/types";
import { ARCHETYPES } from "@/lib/archetypes";

interface IdentityCardProps {
  identity: Identity;
  showShare?: boolean;
}

export default function IdentityCard({ identity, showShare }: IdentityCardProps) {
  const coreArchetype = ARCHETYPES[identity.chord.core];
  const balanceArchetype = ARCHETYPES[identity.chord.balance];
  const inverseArchetype = ARCHETYPES[identity.chord.inverse];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-xl animate-scale-in">
      {/* Gradient header */}
      <div
        className="h-32 relative"
        style={{
          background: `linear-gradient(135deg, ${coreArchetype.color}, ${balanceArchetype.color})`,
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Identity icon */}
      <div className="relative -mt-12 flex justify-center">
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl bg-white shadow-lg border-4 border-white"
        >
          {coreArchetype.icon}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 pt-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {identity.name}
        </h2>
        <p className="text-sm text-gray-500 mb-6">{identity.description}</p>

        {/* Archetype chord */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Core", name: identity.chord.core, data: coreArchetype },
            { label: "Balance", name: identity.chord.balance, data: balanceArchetype },
            { label: "Inverse", name: identity.chord.inverse, data: inverseArchetype },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-xl border border-gray-100 bg-gray-50/50"
            >
              <span className="text-xl">{item.data.icon}</span>
              <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Rarity */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
          <span>✨</span>
          Only {identity.rarity}% of users share this identity
        </div>

        {showShare && (
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Share Result
            </button>
            <a
              href={`/groups/${identity.chord.core.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-5 py-2.5 rounded-full border-2 border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors"
            >
              Join Your Group
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
