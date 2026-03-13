import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how the ArchetypeConnect quiz works, what an Archetype Chord is, and how groups and meetings connect creators.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Getting Started</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-4 font-display">
            How ArchetypeConnect Works
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            From quiz to identity to community &mdash; here&apos;s the full picture.
          </p>
        </div>

        <div className="space-y-16">
          {/* Step 1 */}
          <section>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-full bg-[#D4654A] text-white flex items-center justify-center text-lg font-bold shrink-0">1</span>
              <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100">Take the Quiz</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                The quiz consists of 12 statements. You rate each on a scale of 1 (not me at all) to 5 (that&apos;s totally me). It takes about 2 minutes.
              </p>
              <p>
                Each statement is designed to measure your affinity with different creator archetypes. There are no right or wrong answers &mdash; it&apos;s about recognizing your natural tendencies.
              </p>
              <p>
                Your progress is saved automatically in your browser, so you can close the page and come back without losing your answers.
              </p>
            </div>
          </section>

          {/* Step 2 */}
          <section>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-full bg-[#D4654A] text-white flex items-center justify-center text-lg font-bold shrink-0">2</span>
              <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100">Get Your Archetype Chord</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Your answers produce scores across all 12 archetypes. From these scores, we calculate your <strong className="text-[#1A1A2E] dark:text-gray-100">Archetype Chord</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-xl bg-[#FEF0EC] dark:bg-[#D4654A]/20 border border-[#D4654A]/10 dark:border-[#D4654A]/30">
                  <p className="font-bold text-[#D4654A] dark:text-[#E8806A] mb-1">Core</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your highest-scoring archetype. This is your dominant creative style.</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-700 border border-black/[0.06] dark:border-white/10">
                  <p className="font-bold text-[#1A1A2E] dark:text-gray-200 mb-1">Balance</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your second-highest. This complements your core and adds range.</p>
                </div>
                <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800">
                  <p className="font-bold text-pink-700 dark:text-pink-400 mb-1">Inverse</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your lowest-scoring. This is your creative blind spot and collaboration opportunity.</p>
                </div>
              </div>
              <p>
                Your specific chord combination generates a unique <strong className="text-[#1A1A2E] dark:text-gray-100">identity name</strong> (like &ldquo;Blueprint Architect&rdquo; or &ldquo;Corsair Visionary&rdquo;) that you can share with others.
              </p>
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-full bg-[#D4654A] text-white flex items-center justify-center text-lg font-bold shrink-0">3</span>
              <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100">Join Your Group</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Your core archetype determines your group. There are 12 groups, one for each archetype. Within your group, you can see other creators who share your dominant style.
              </p>
              <p>
                Groups are where you find people who think like you &mdash; and where meetings are organized for peer learning, collaboration, and mastermind sessions.
              </p>
            </div>
          </section>

          {/* Step 4 */}
          <section>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-10 rounded-full bg-[#D4654A] text-white flex items-center justify-center text-lg font-bold shrink-0">4</span>
              <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100">Connect Through Meetings</h2>
            </div>
            <div className="ml-14 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Meetings are organized sessions where creators come together. There are three types:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-[#D4654A] dark:text-[#E8806A] shrink-0">Peer Learning:</span>
                  <span>Small group sessions where creators share knowledge and skills with each other.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#D4654A] dark:text-[#E8806A] shrink-0">Collaboration:</span>
                  <span>Working sessions where creators pair up to build or create something together.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#D4654A] dark:text-[#E8806A] shrink-0">Mastermind:</span>
                  <span>Structured problem-solving sessions with focused discussion and accountability.</span>
                </li>
              </ul>
              <p>
                Anyone can create a meeting. You pick the type, set a time, choose a group, and invite participants.
              </p>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 p-12 bg-white dark:bg-slate-800 rounded-[20px] border border-black/[0.06] dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
          <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-4 font-display">Ready to find out?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">The quiz takes about 2 minutes. Your results are instant.</p>
          <a
            href="/quiz"
            className="inline-flex px-8 py-4 rounded-xl bg-[#D4654A] text-white font-semibold text-lg hover:bg-[#C05A42] transition-all shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
          >
            Take the Quiz &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
