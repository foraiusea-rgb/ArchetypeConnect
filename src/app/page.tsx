"use client";

import { ARCHETYPES, ARCHETYPE_NAMES } from "@/lib/archetypes";
import { ArchetypeName } from "@/types";
import ArchetypeIcon from "@/components/ArchetypeIcon";
import AnimateIn from "@/components/AnimateIn";
import { ArrowRight, Target, Dna, Users, Pen, Palette as PaletteIcon, Cog, BookOpen, BarChart3, Rocket, Microscope, Video } from "lucide-react";

const STEP_COLORS = ["#6366f1", "#8b5cf6", "#0ea5e9"];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Decorative blobs for depth */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-pink-400/20 blur-3xl" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-300/15 blur-3xl" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm text-sm font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 mb-8 animate-fade-in shadow-sm">
              Early access &mdash; help shape the community
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up font-display">
              What Kind of{" "}
              <span className="gradient-text">Creator</span> Are You?
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-10 leading-relaxed animate-slide-up max-w-2xl mx-auto">
              12 questions. Your unique creator chord. A community that gets you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <a
                href="/quiz"
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-300/40 dark:shadow-indigo-900/40 hover:shadow-2xl hover:shadow-indigo-400/40 hover:-translate-y-1 animate-pulse-glow"
              >
                Take the Quiz
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/about"
                className="px-10 py-5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 font-semibold text-lg hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>

        {/* Floating archetype constellation — more visible */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {ARCHETYPE_NAMES.map((name, i) => {
            const arch = ARCHETYPES[name];
            const angle = (i / 12) * 360;
            const radius = 40;
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
            return (
              <div
                key={name}
                className="absolute opacity-[0.25] animate-float"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${5 + (i % 3)}s`,
                  color: arch.color,
                }}
              >
                <ArchetypeIcon name={name} size={48} color={arch.color} />
              </div>
            );
          })}
        </div>
      </section>

      {/* What You Get */}
      <section className="py-28 section-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-display">
              What You Get
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              A concrete identity system, not just another personality label.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Target size={30} />,
                title: "Your Archetype Chord",
                description: "12 quick questions reveal your Core archetype (strongest style), Balance (secondary strength), and Inverse (your contrast). Together they form your unique chord.",
              },
              {
                step: "02",
                icon: <Dna size={30} />,
                title: "A Generated Identity",
                description: "Your chord combination produces a unique identity name like \"Blueprint Architect\" or \"Corsair Visionary\" \u2014 yours to share and claim.",
              },
              {
                step: "03",
                icon: <Users size={30} />,
                title: "Your Creator Group",
                description: "Join a group of creators who share your core archetype. Browse meetings, connect with compatible thinkers, and find collaborators.",
              },
            ].map((item, i) => (
              <AnimateIn key={item.step} delay={i * 0.15}>
                <div className="relative p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-300 group h-full hover:-translate-y-1 overflow-hidden" style={{ borderTop: `4px solid ${STEP_COLORS[i]}` }}>
                  <span className="text-7xl font-bold absolute top-3 right-5 transition-colors" style={{ color: `${STEP_COLORS[i]}12` }}>
                    {item.step}
                  </span>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: `linear-gradient(135deg, ${STEP_COLORS[i]}25, ${STEP_COLORS[i]}10)`, color: STEP_COLORS[i], boxShadow: `0 0 0 3px ${STEP_COLORS[i]}10` }}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* What is a Creator? */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-display">
              What&apos;s a &ldquo;Creator&rdquo;?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Not just YouTubers. Anyone who makes things and shares them with the world.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Writers & Journalists", icon: <Pen size={22} />, color: "#EC4899" },
              { label: "Designers & Artists", icon: <PaletteIcon size={22} />, color: "#8B5CF6" },
              { label: "Developers & Builders", icon: <Cog size={22} />, color: "#D97706" },
              { label: "Educators & Coaches", icon: <BookOpen size={22} />, color: "#14B8A6" },
              { label: "Strategists & Consultants", icon: <BarChart3 size={22} />, color: "#0891B2" },
              { label: "Entrepreneurs & Founders", icon: <Rocket size={22} />, color: "#E11D48" },
              { label: "Researchers & Analysts", icon: <Microscope size={22} />, color: "#059669" },
              { label: "Content Creators", icon: <Video size={22} />, color: "#2563EB" },
            ].map((type, i) => (
              <AnimateIn key={type.label} delay={i * 0.05}>
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderLeft: `3px solid ${type.color}` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ background: `${type.color}15`, color: type.color }}>
                    {type.icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{type.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Archetype Chord Explained */}
      <section className="py-28 section-accent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-display">
              Your Archetype Chord
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Your result isn&apos;t a single label. It&apos;s a three-part chord that captures the nuance of how you create.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { key: "C", label: "Core", bg: "bg-indigo-100 dark:bg-indigo-900/40", border: "border-indigo-200 dark:border-indigo-700", badge: "bg-indigo-600", desc: "Your dominant archetype. The lens through which you naturally approach creative work. This is who you are at your strongest." },
              { key: "B", label: "Balance", bg: "bg-violet-50 dark:bg-violet-900/30", border: "border-violet-200 dark:border-violet-700", badge: "bg-violet-600", desc: "Your secondary strength. This complements your core and adds depth. Often it\u2019s the skill you lean on when your core isn\u2019t enough." },
              { key: "I", label: "Inverse", bg: "bg-pink-100 dark:bg-pink-900/40", border: "border-pink-200 dark:border-pink-700", badge: "bg-pink-600", desc: "Your creative blind spot \u2014 the archetype furthest from your natural style. Knowing this reveals where you benefit most from collaborators." },
            ].map((item, i) => (
              <AnimateIn key={item.key} delay={i * 0.15}>
                <div className={`p-8 rounded-3xl border-2 h-full shadow-lg ${item.bg} ${item.border}`}>
                  <div className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center text-xl font-bold mb-5 shadow-lg ${item.badge}`}>{item.key}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-display">{item.label}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn className="text-center mt-10">
            <a href="/methodology" className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Read about our methodology <ArrowRight size={16} />
            </a>
          </AnimateIn>
        </div>
      </section>

      {/* Example Identity Cards */}
      <section className="py-28 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-display">
              Example Identities
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Every chord combination produces a unique identity. Here are some possibilities.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Framework Rebel", core: "Teacher" as ArchetypeName, balance: "Strategist", inverse: "Pirate" },
              { name: "Execution Architect", core: "Builder" as ArchetypeName, balance: "Systems Thinker", inverse: "Comedian" },
              { name: "Empathy Communicator", core: "Guide" as ArchetypeName, balance: "Connector", inverse: "Reporter" },
              { name: "Creative Catalyst", core: "Artist" as ArchetypeName, balance: "Storyteller", inverse: "Philosopher" },
            ].map((identity, i) => {
              const coreArch = ARCHETYPES[identity.core];
              return (
                <AnimateIn key={identity.name} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]" style={{ borderTop: `5px solid ${coreArch.color}` }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${coreArch.color}20`, boxShadow: `0 0 0 3px ${coreArch.color}10` }}>
                      <ArchetypeIcon name={identity.core} size={24} color={coreArch.color} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-display">{identity.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: `${coreArch.color}15`, color: coreArch.color }}>Core: {identity.core}</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-medium">Balance: {identity.balance}</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 dark:bg-slate-700/50 text-gray-400 dark:text-gray-500">Inverse: {identity.inverse}</span>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12 Archetypes Grid */}
      <section id="archetypes" className="py-28 section-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-display">
              The 12 Creator Archetypes
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Each archetype represents a distinct approach to creative work.
              Most people are a blend of several, weighted by their chord.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ARCHETYPE_NAMES.map((name, i) => {
              const archetype = ARCHETYPES[name];
              return (
                <AnimateIn key={name} delay={i * 0.05}>
                  <a
                    href={`/groups/${name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group block p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full relative overflow-hidden"
                    style={{ borderLeft: `4px solid ${archetype.color}` }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${archetype.color}06, ${archetype.color}12)` }} />
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${archetype.color}20`, boxShadow: `0 0 0 3px ${archetype.color}10` }}
                      >
                        <ArchetypeIcon name={name} size={26} color={archetype.color} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{archetype.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {archetype.traits.map((trait) => (
                          <span key={trait} className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${archetype.color}10`, color: archetype.color }}>
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-28 hero-gradient relative overflow-hidden">
        <div className="absolute top-0 -left-20 w-80 h-80 rounded-full bg-indigo-400/15 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 rounded-full bg-pink-400/15 blur-3xl" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <AnimateIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm text-sm font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 mb-6 shadow-sm">
              Early Access
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-display">
              We&apos;re Building This Together
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-4 max-w-xl mx-auto">
              ArchetypeConnect is in early access. Take the quiz, get your identity,
              and be among the first creators in your archetype group.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-10">
              Early members help shape how groups, meetings, and matching work.
            </p>
            <a
              href="/quiz"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-300/40 dark:shadow-indigo-900/40 hover:shadow-2xl hover:-translate-y-1"
            >
              Take the Quiz
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
