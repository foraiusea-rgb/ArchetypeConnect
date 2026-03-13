import { ARCHETYPES, ARCHETYPE_NAMES } from "@/lib/archetypes";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 text-sm font-medium text-indigo-700 border border-indigo-100 mb-8 animate-fade-in">
              <span aria-hidden="true">&#127793;</span> Early access &mdash; help shape the community
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
              What Kind of{" "}
              <span className="gradient-text">Creator</span> Are You?
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed animate-slide-up">
              Whether you write, design, code, teach, build, or strategize &mdash;
              you have a creator archetype. Take a 2-minute quiz to discover yours.
            </p>
            <p className="text-base text-gray-500 mb-10 animate-slide-up">
              Your result includes a unique <strong>Archetype Chord</strong> (your top, secondary, and
              contrasting styles) plus a generated identity name you can share.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <a
                href="/quiz"
                className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:-translate-y-0.5"
              >
                Take the Quiz &rarr;
              </a>
              <a
                href="/about"
                className="px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-lg hover:border-indigo-200 hover:text-indigo-600 transition-all"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" aria-hidden="true" />
      </section>

      {/* What You Get */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You Get
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A concrete identity system, not just another personality label.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "\uD83C\uDFAF",
                title: "Your Archetype Chord",
                description:
                  "12 quick questions reveal your Core archetype (strongest style), Balance (secondary strength), and Inverse (your contrast). Together they form your unique chord.",
              },
              {
                step: "02",
                icon: "\uD83E\uDDEC",
                title: "A Generated Identity",
                description:
                  "Your chord combination produces a unique identity name like \"Blueprint Architect\" or \"Corsair Visionary\" \u2014 yours to share and claim.",
              },
              {
                step: "03",
                icon: "\uD83E\uDD1D",
                title: "Your Creator Group",
                description:
                  "Join a group of creators who share your core archetype. Browse meetings, connect with compatible thinkers, and find collaborators.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-6xl font-bold text-gray-100 absolute top-4 right-6 group-hover:text-indigo-100 transition-colors">
                  {item.step}
                </span>
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is a Creator? - Fixes #17 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What&apos;s a &ldquo;Creator&rdquo;?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Not just YouTubers. Anyone who makes things and shares them with the world.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Writers & Journalists", icon: "\u270D\uFE0F" },
              { label: "Designers & Artists", icon: "\uD83C\uDFA8" },
              { label: "Developers & Builders", icon: "\u2699\uFE0F" },
              { label: "Educators & Coaches", icon: "\uD83D\uDCDA" },
              { label: "Strategists & Consultants", icon: "\uD83D\uDCCA" },
              { label: "Entrepreneurs & Founders", icon: "\uD83D\uDE80" },
              { label: "Researchers & Analysts", icon: "\uD83D\uDD2C" },
              { label: "Content Creators", icon: "\uD83C\uDFA5" },
            ].map((type) => (
              <div
                key={type.label}
                className="p-4 rounded-2xl bg-white border border-gray-100 text-center hover:shadow-md transition-all"
              >
                <span className="text-2xl block mb-2">{type.icon}</span>
                <p className="text-sm font-medium text-gray-700">{type.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archetype Chord Explained - Fixes #13 */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Understanding Your Archetype Chord
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Your result isn&apos;t a single label. It&apos;s a three-part chord that captures the nuance of how you create.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-lg font-bold mb-4">C</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Core</h3>
              <p className="text-gray-600 leading-relaxed">
                Your dominant archetype. The lens through which you naturally approach creative work. This is who you are at your strongest.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-600 text-white flex items-center justify-center text-lg font-bold mb-4">B</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Balance</h3>
              <p className="text-gray-600 leading-relaxed">
                Your secondary strength. This complements your core and adds depth. Often it&apos;s the skill you lean on when your core isn&apos;t enough.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-pink-50 border border-pink-100">
              <div className="w-12 h-12 rounded-xl bg-pink-600 text-white flex items-center justify-center text-lg font-bold mb-4">I</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inverse</h3>
              <p className="text-gray-600 leading-relaxed">
                Your creative blind spot &mdash; the archetype furthest from your natural style. Knowing this reveals where you benefit most from collaborators.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <a href="/methodology" className="text-indigo-600 font-medium text-sm hover:underline">
              Read about our methodology &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Example Identity Cards - Fixes #6 (removed fake percentages) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Example Identities
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every chord combination produces a unique identity. Here are some possibilities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Framework Rebel", core: "Teacher", balance: "Strategist", inverse: "Pirate" },
              { name: "Execution Architect", core: "Builder", balance: "Systems Thinker", inverse: "Comedian" },
              { name: "Empathy Communicator", core: "Guide", balance: "Connector", inverse: "Reporter" },
              { name: "Creative Catalyst", core: "Artist", balance: "Storyteller", inverse: "Philosopher" },
            ].map((identity) => (
              <div
                key={identity.name}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{
                    backgroundColor: `${ARCHETYPES[identity.core as keyof typeof ARCHETYPES].color}15`,
                  }}
                >
                  {ARCHETYPES[identity.core as keyof typeof ARCHETYPES].icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {identity.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                    Core: {identity.core}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">
                    Balance: {identity.balance}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">
                    Inverse: {identity.inverse}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Archetypes Grid */}
      <section id="archetypes" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The 12 Creator Archetypes
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Each archetype represents a distinct approach to creative work.
              Most people are a blend of several, weighted by their chord.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ARCHETYPE_NAMES.map((name) => {
              const archetype = ARCHETYPES[name];
              return (
                <div
                  key={name}
                  className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: `${archetype.color}15` }}
                  >
                    {archetype.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {archetype.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {archetype.traits.map((trait) => (
                      <span
                        key={trait}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Early Access CTA - Fixes #16 (cold start) */}
      <section className="py-24 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 text-sm font-medium text-indigo-700 border border-indigo-100 mb-6">
            <span aria-hidden="true">&#127793;</span> Early Access
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We&apos;re Building This Together
          </h2>
          <p className="text-lg text-gray-600 mb-4 max-w-xl mx-auto">
            ArchetypeConnect is in early access. Take the quiz, get your identity,
            and be among the first creators in your archetype group.
          </p>
          <p className="text-base text-gray-500 mb-10">
            Early members help shape how groups, meetings, and matching work.
            Your feedback builds the platform.
          </p>
          <a
            href="/quiz"
            className="inline-flex px-10 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-0.5"
          >
            Take the Quiz &rarr;
          </a>
        </div>
      </section>
    </>
  );
}
