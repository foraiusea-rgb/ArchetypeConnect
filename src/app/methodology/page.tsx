import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How the ArchetypeConnect quiz was designed, what the 12 archetypes are based on, and our approach to personality-based matching.",
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Methodology
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            How we designed the archetype system, what it measures, and what it doesn&apos;t.
          </p>
        </div>

        <div className="space-y-12 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The 12 Archetypes</h2>
            <p>
              The 12 creator archetypes are synthesized from patterns observed across creative and professional domains. They draw from established frameworks in personality psychology, including trait theory and vocational interest models, but are adapted specifically for people who create, build, teach, or communicate as part of their work.
            </p>
            <p className="mt-4">
              Each archetype represents a <strong>dominant creative approach</strong> &mdash; not a personality type. You are not &ldquo;a Builder&rdquo; or &ldquo;a Storyteller&rdquo; exclusively. You have varying degrees of all 12 archetypes. The quiz measures your relative affinities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Scoring Works</h2>
            <p>
              The quiz presents 12 statements, each designed to measure affinity with multiple archetypes simultaneously. When you rate a statement, your response contributes weighted scores to 2&ndash;4 archetypes.
            </p>
            <p className="mt-4">
              For example, a statement about breaking conventions might contribute positively to the Pirate archetype (rule-breaking) and negatively to the Teacher archetype (structure). This cross-loading design means each question captures multiple dimensions of creative style.
            </p>
            <p className="mt-4">
              Final scores are aggregated across all 12 questions, sorted by magnitude, and used to determine your chord.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Archetype Chord</h2>
            <p>
              Your results aren&apos;t reduced to a single label. Instead, you receive a three-part <strong>Archetype Chord</strong>:
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <strong>Core (highest score):</strong> Your dominant creative approach. The mode you default to when working at your best.
              </li>
              <li>
                <strong>Balance (second-highest):</strong> Your complementary strength. This adds nuance and range to your creative practice.
              </li>
              <li>
                <strong>Inverse (lowest score):</strong> Your creative blind spot. This is the archetype you least identify with, and knowing it helps you identify where collaborators can fill gaps.
              </li>
            </ul>
            <p className="mt-4">
              The chord system is inspired by music theory: a single note (archetype) is less interesting than a chord (combination). The interplay between your Core, Balance, and Inverse creates a more nuanced portrait than any single category.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Identity Generation</h2>
            <p>
              Your chord combination deterministically generates a unique identity name. This name is a compound of a prefix (derived from your Core) and a suffix (derived from your Balance), producing names like &ldquo;Blueprint Architect&rdquo; or &ldquo;Corsair Visionary.&rdquo;
            </p>
            <p className="mt-4">
              The same chord combination always produces the same identity name. This makes your identity shareable, recognizable, and consistent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Matching &amp; Groups</h2>
            <p>
              Users are grouped by their Core archetype, creating communities of creators who share a dominant approach. Within groups, creators can organize meetings and find collaborators.
            </p>
            <p className="mt-4">
              The matching system uses <strong>cosine similarity</strong> on full score vectors (all 12 scores) to find compatible creators. This means matching considers your entire archetype profile, not just your Core.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations &amp; Transparency</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-4 space-y-4">
              <p>
                <strong>This is not a validated psychometric instrument.</strong> The archetype system is designed to be useful and reflective, not clinically diagnostic. It has not been through peer-reviewed validation studies.
              </p>
              <p>
                <strong>12 questions is intentionally short.</strong> We prioritize completion rate over precision. A 60-question assessment would be more accurate but would see significant abandonment. We chose accessibility.
              </p>
              <p>
                <strong>Results are relative, not absolute.</strong> Your scores reflect your relative preferences among the 12 archetypes, not an objective measure of ability in any domain.
              </p>
              <p>
                <strong>Archetypes can shift.</strong> Creative style evolves over time with experience, role changes, and personal growth. The quiz captures where you are now, not who you are forever.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Influences</h2>
            <p>
              The archetype framework draws loose inspiration from several established systems, including Holland&apos;s vocational interest types (RIASEC), the Big Five personality traits, and Jungian archetype theory. It is not a derivative of any single system.
            </p>
            <p className="mt-4">
              The chord concept is original to ArchetypeConnect and is designed to resist the &ldquo;single label&rdquo; reductionism that makes most personality quizzes intellectually unsatisfying.
            </p>
          </section>
        </div>

        <div className="text-center mt-16">
          <a
            href="/quiz"
            className="inline-flex px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
          >
            Try It Yourself &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
