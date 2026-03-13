"use client";

import { ARCHETYPES, ARCHETYPE_NAMES } from "@/lib/archetypes";
import { ArchetypeName } from "@/types";
import ArchetypeIcon from "@/components/ArchetypeIcon";
import AnimateIn from "@/components/AnimateIn";
import { ArrowRight, Pen, Palette as PaletteIcon, Cog, BookOpen, BarChart3, Rocket, Microscope, Video } from "lucide-react";

const STEP_COLORS = ["#D4654A", "#3D8B7A", "#C4A35A"];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(212,101,74,0.06), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(61,139,122,0.05), transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(196,163,90,0.04), transparent 60%), #FAF8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FEF0EC] text-[0.8rem] font-semibold text-[#D4654A] mb-8 animate-fade-in tracking-[0.08em] uppercase">
              ✦ Personality-Based Creator Platform
            </div>
            <h1 className="font-display font-bold animate-slide-up text-[#1A1A2E] dark:text-gray-100 leading-[1.08] tracking-[-0.03em]" style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)", maxWidth: "750px", marginLeft: "auto", marginRight: "auto", marginBottom: "1.5rem" }}>
              Discover Your<br />Creator <span className="text-[#D4654A]">Archetype</span>
            </h1>
            <p className="text-[1.2rem] text-gray-500 dark:text-gray-300 mb-10 leading-[1.7] animate-slide-up max-w-[480px] mx-auto">
              12 questions reveal your unique creator chord — your Core drive, Balance strength, and Inverse edge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <a
                href="/quiz"
                className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-[14px] bg-[#D4654A] text-white font-semibold text-base hover:bg-[#C05A42] transition-all shadow-sm hover:shadow-[0_8px_24px_rgba(212,101,74,0.3)] hover:-translate-y-0.5"
              >
                Take the Quiz →
              </a>
              <a
                href="/about"
                className="px-8 py-4 rounded-[14px] border-[1.5px] border-black/[0.12] dark:border-slate-600 text-[#1A1A2E] dark:text-gray-100 font-medium text-base hover:border-[#1A1A2E] dark:hover:border-gray-400 hover:bg-white transition-all"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Archetype color strip */}
          <div className="flex justify-center gap-2 mt-16 animate-fade-in">
            {ARCHETYPE_NAMES.map((name) => (
              <div
                key={name}
                className="w-9 h-9 rounded-[10px] opacity-80 hover:opacity-100 hover:scale-125 hover:-translate-y-1 transition-all duration-300 cursor-default"
                style={{ backgroundColor: ARCHETYPES[name].color }}
                title={name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Identity Preview */}
      <section className="pt-0 pb-20 bg-[#FAF8F5] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-8">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#D4654A] mb-3">Your Result</p>
            <h2 className="font-display font-bold text-[#1A1A2E] dark:text-gray-100 mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              A Name That&apos;s Uniquely Yours
            </h2>
            <p className="text-[1.05rem] text-gray-400 max-w-[450px] mx-auto leading-relaxed">
              Your chord combination generates a one-of-a-kind creator identity.
            </p>
          </AnimateIn>
          <AnimateIn>
            <div className="max-w-[480px] mx-auto rounded-[28px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="h-[100px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.10), rgba(20,184,166,0.08))" }}>
                <span className="text-[2.5rem] relative z-[1]">🧭</span>
              </div>
              <div className="px-8 pb-8 pt-6 text-center">
                <h3 className="text-2xl font-extrabold text-[#1A1A2E] dark:text-gray-100 mb-1">The Luminous Pathfinder</h3>
                <p className="text-[0.85rem] text-gray-400 mb-4">Guide · Artist · Builder</p>
                <div className="flex justify-center gap-2">
                  {[
                    { label: "Core: Guide", color: "#7C3AED" },
                    { label: "Balance: Artist", color: "#8B5CF6" },
                    { label: "Inverse: Builder", color: "#D97706" },
                  ].map((c) => (
                    <span key={c.label} className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold px-3 py-1.5 rounded-[10px]" style={{ backgroundColor: `${c.color}10`, color: c.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* What You Get — Three Steps */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-14">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#D4654A] mb-3">How It Works</p>
            <h2 className="font-display font-bold text-[#1A1A2E] dark:text-gray-100 mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Three Steps to Your Identity
            </h2>
            <p className="text-[1.05rem] text-gray-400 max-w-[450px] mx-auto leading-relaxed">
              No sign-up walls. Just answer, discover, connect.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
            {[
              { step: "01", emoji: "🎵", title: "Answer 12 Questions", description: "Quick, reflective prompts designed to reveal your creative instincts. No right or wrong answers." },
              { step: "02", emoji: "✨", title: "Get Your Chord", description: "Your Core, Balance, and Inverse archetypes combine into a unique identity name that's yours to claim." },
              { step: "03", emoji: "👥", title: "Join Your Group", description: "Connect with creators who share your core archetype. Browse meetings, start conversations." },
            ].map((item, i) => (
              <AnimateIn key={item.step} delay={i * 0.15}>
                <div className="relative rounded-[28px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-black/[0.12] h-full">
                  {/* Big visual area */}
                  <div className="h-[180px] flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${STEP_COLORS[i]}14, ${STEP_COLORS[i]}06)` }}>
                    <span className="text-[4rem] relative z-[1]">{item.emoji}</span>
                    <span className="absolute top-3 right-4 text-[5rem] font-extrabold leading-none opacity-[0.07] text-[#1A1A2E]">{item.step}</span>
                  </div>
                  <div className="px-8 pb-8 pt-6">
                    <h3 className="text-[1.15rem] font-bold text-[#1A1A2E] dark:text-gray-100 mb-2">{item.title}</h3>
                    <p className="text-[0.9rem] text-gray-500 dark:text-gray-400 leading-[1.65]">{item.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Archetype Chord Explained */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-14">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#D4654A] mb-3">The System</p>
            <h2 className="font-display font-bold text-[#1A1A2E] dark:text-gray-100 mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Your Creator Chord
            </h2>
            <p className="text-[1.05rem] text-gray-400 max-w-[450px] mx-auto leading-relaxed">
              Three archetypes combine to form your unique creative signature.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: "C", label: "Core", sublabel: "Your Primary Drive", color: "#D4654A", desc: "The archetype that defines your strongest creative instinct. This is who you are at your core." },
              { key: "B", label: "Balance", sublabel: "Your Complement", color: "#3D8B7A", desc: "The archetype that adds depth and nuance. It tempers your core with a complementary perspective." },
              { key: "I", label: "Inverse", sublabel: "Your Growth Edge", color: "#C4A35A", desc: "The archetype that challenges you. Your biggest potential for creative growth lives here." },
            ].map((item, i) => (
              <AnimateIn key={item.key} delay={i * 0.15}>
                <div className="py-10 px-8 rounded-[28px] border border-transparent h-full text-center transition-all duration-300 hover:-translate-y-1" style={{ background: `${item.color}0F`, borderColor: `${item.color}1F` }}>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-4" style={{ color: item.color }}>{item.label}</p>
                  <div className="text-[3rem] mb-4">{item.key === "C" ? "🎯" : item.key === "B" ? "⚖️" : "🔄"}</div>
                  <h3 className="text-[1.2rem] font-bold text-[#1A1A2E] dark:text-gray-100 mb-2">{item.sublabel}</h3>
                  <p className="text-[0.88rem] text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn className="text-center mt-10">
            <a href="/methodology" className="inline-flex items-center gap-1 text-[#D4654A] font-semibold hover:underline">
              Read about our methodology <ArrowRight size={16} />
            </a>
          </AnimateIn>
        </div>
      </section>

      {/* What is a Creator? */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-12">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#D4654A] mb-3">For Everyone</p>
            <h2 className="font-display font-bold text-[#1A1A2E] dark:text-gray-100 mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              What&apos;s a &ldquo;Creator&rdquo;?
            </h2>
            <p className="text-[1.05rem] text-gray-400 max-w-[450px] mx-auto leading-relaxed">
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
                <div className="p-5 rounded-[16px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 text-center hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${type.color}20`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ background: `${type.color}10`, color: type.color }}>
                    {type.icon}
                  </div>
                  <p className="text-sm font-semibold text-[#1A1A2E] dark:text-gray-300">{type.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Archetypes Grid */}
      <section id="archetypes" className="py-24" style={{ background: "#F5F1EC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-14">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#D4654A] mb-3">The Archetypes</p>
            <h2 className="font-display font-bold text-[#1A1A2E] dark:text-gray-100 mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              12 Ways to Create
            </h2>
            <p className="text-[1.05rem] text-gray-400 max-w-[450px] mx-auto leading-relaxed">
              Each archetype represents a distinct approach to creative work.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ARCHETYPE_NAMES.map((name, i) => {
              const archetype = ARCHETYPES[name];
              return (
                <AnimateIn key={name} delay={i * 0.04}>
                  <a
                    href={`/groups/${name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group block rounded-[28px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] h-full"
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${archetype.color}33`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'}
                  >
                    {/* Big visual area */}
                    <div className="h-[140px] flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${archetype.color}1A, ${archetype.color}0A)` }}>
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        <ArchetypeIcon name={name} size={40} color={archetype.color} />
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: archetype.color }} />
                        <h3 className="text-[1.05rem] font-bold text-[#1A1A2E] dark:text-gray-100">{name}</h3>
                      </div>
                      <p className="text-[0.82rem] text-gray-400 dark:text-gray-500 leading-[1.55] mb-3 line-clamp-2">{archetype.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {archetype.traits.slice(0, 3).map((trait) => (
                          <span key={trait} className="text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-lg" style={{ backgroundColor: `${archetype.color}14`, color: archetype.color }}>
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

      {/* Example Identity Cards */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-14">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#D4654A] mb-3">Possibilities</p>
            <h2 className="font-display font-bold text-[#1A1A2E] dark:text-gray-100 mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Example Identities
            </h2>
            <p className="text-[1.05rem] text-gray-400 max-w-[450px] mx-auto leading-relaxed">
              Every chord combination produces a unique identity.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Framework Rebel", core: "Teacher" as ArchetypeName, balance: "Strategist", inverse: "Pirate" },
              { name: "Execution Architect", core: "Builder" as ArchetypeName, balance: "Systems Thinker", inverse: "Comedian" },
              { name: "Empathy Communicator", core: "Guide" as ArchetypeName, balance: "Connector", inverse: "Reporter" },
              { name: "Creative Catalyst", core: "Artist" as ArchetypeName, balance: "Storyteller", inverse: "Philosopher" },
            ].map((identity, i) => {
              const coreArch = ARCHETYPES[identity.core];
              return (
                <AnimateIn key={identity.name} delay={i * 0.1}>
                  <div className="rounded-[20px] bg-white dark:bg-slate-800 border border-black/[0.06] dark:border-slate-700 overflow-hidden transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${coreArch.color}20`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'}
                  >
                    {/* Visual area */}
                    <div className="h-[100px] flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${coreArch.color}12, ${coreArch.color}05)` }}>
                      <ArchetypeIcon name={identity.core} size={32} color={coreArch.color} />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[#1A1A2E] dark:text-gray-100 mb-3 font-display">{identity.name}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ backgroundColor: `${coreArch.color}10`, color: coreArch.color }}>Core: {identity.core}</span>
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-medium">Balance: {identity.balance}</span>
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-50/60 dark:bg-slate-700/50 text-gray-400 dark:text-gray-500">Inverse: {identity.inverse}</span>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,101,74,0.06), transparent 50%), #F5F1EC" }}>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <AnimateIn>
            <h2 className="font-display font-bold text-[#1A1A2E] dark:text-gray-100 mb-3" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}>
              We&apos;re Building This <span className="text-[#D4654A]">Together</span>
            </h2>
            <p className="text-[1.05rem] text-gray-500 dark:text-gray-400 mb-8 max-w-[400px] mx-auto leading-relaxed">
              Take the quiz, get your identity, and be among the first creators in your archetype group.
            </p>
            <a
              href="/quiz"
              className="inline-flex items-center justify-center px-12 py-[1.1rem] rounded-[14px] bg-[#D4654A] text-white font-semibold text-[1.1rem] hover:bg-[#C05A42] transition-all shadow-sm hover:shadow-[0_8px_24px_rgba(212,101,74,0.3)] hover:-translate-y-0.5"
            >
              Take the Quiz →
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
