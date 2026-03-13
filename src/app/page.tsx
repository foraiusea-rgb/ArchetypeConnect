import { ARCHETYPES, ARCHETYPE_NAMES } from "@/lib/archetypes";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 text-sm font-medium text-indigo-700 border border-indigo-100 mb-8 animate-fade-in">
              <span>✨</span> Discover your unique creator identity
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
              Find Your{" "}
              <span className="gradient-text">Creator Archetype</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed animate-slide-up">
              Take a 2-minute personality quiz, uncover your archetype identity,
              join groups of compatible creators, and schedule meetings that
              spark real collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <a
                href="/quiz"
                className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:-translate-y-0.5"
              >
                Take the Quiz →
              </a>
              <a
                href="#archetypes"
                className="px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-lg hover:border-indigo-200 hover:text-indigo-600 transition-all"
              >
                Explore Archetypes
              </a>
            </div>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Three simple steps to discover your creator identity and connect
              with like-minded people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "🎯",
                title: "Take the Quiz",
                description:
                  "Answer 12 quick questions to reveal your unique blend of creator archetypes.",
              },
              {
                step: "02",
                icon: "🧬",
                title: "Get Your Identity",
                description:
                  "Receive your archetype chord — Core, Balance, and Inverse — plus a unique identity name.",
              },
              {
                step: "03",
                icon: "🤝",
                title: "Connect & Meet",
                description:
                  "Join your archetype group, find compatible creators, and schedule meaningful meetings.",
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

      {/* Example Identity Cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Example Identities
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every combination creates a unique identity. Here are some examples.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Framework Rebel", core: "Teacher", balance: "Strategist", inverse: "Pirate", rarity: 7 },
              { name: "Execution Architect", core: "Builder", balance: "Systems Thinker", inverse: "Comedian", rarity: 4 },
              { name: "Empathy Communicator", core: "Guide", balance: "Connector", inverse: "Reporter", rarity: 9 },
              { name: "Creative Catalyst", core: "Artist", balance: "Storyteller", inverse: "Philosopher", rarity: 5 },
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
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                    {identity.core}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">
                    {identity.balance}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">
                    {identity.inverse}
                  </span>
                </div>
                <p className="text-xs text-indigo-500 font-medium">
                  ✨ {identity.rarity}% share this identity
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archetypes Grid */}
      <section id="archetypes" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              12 Creator Archetypes
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Each archetype represents a unique way of creating, connecting,
              and contributing to the world.
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

      {/* CTA Section */}
      <section className="py-24 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Discover Your Identity?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join thousands of creators who have found their archetype and
            connected with compatible minds.
          </p>
          <a
            href="/quiz"
            className="inline-flex px-10 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-0.5"
          >
            Start Your Quiz Now →
          </a>
        </div>
      </section>
    </>
  );
}
