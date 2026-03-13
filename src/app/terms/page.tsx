import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ArchetypeConnect terms of service. Rules and guidelines for using the platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-900 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[#D4654A] mb-3">Legal</p>
        <h1 className="text-4xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-2 font-display">Terms of Service</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12">Last updated: March 13, 2026</p>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">1. Acceptance</h2>
            <p>By using ArchetypeConnect, you agree to these terms. If you don&apos;t agree, please don&apos;t use the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">2. The Service</h2>
            <p>ArchetypeConnect provides a personality quiz, archetype-based grouping, and meeting coordination features. The platform is in early access and features may change, be added, or be removed at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">3. Accounts</h2>
            <p>You can use the platform as a guest or sign in with GitHub or Google. You are responsible for maintaining the security of your authentication credentials. Guest accounts have limited functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">4. Quiz Results</h2>
            <p>The archetype quiz is designed to be reflective and useful, not clinically diagnostic. Results should not be used as a substitute for professional psychological assessment. See our <a href="/methodology" className="text-[#D4654A] hover:text-[#C05A42] dark:text-[#E8806A] dark:hover:text-[#D4654A]">Methodology</a> page for more details on limitations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">5. User Conduct</h2>
            <p>When creating meetings or interacting with other users, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Be respectful and constructive</li>
              <li>Not use the platform for spam, harassment, or illegal activity</li>
              <li>Not attempt to circumvent security measures</li>
              <li>Not submit false or misleading information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">6. Content</h2>
            <p>Meeting titles, descriptions, and other content you create on the platform are your responsibility. We reserve the right to remove content that violates these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">7. Availability</h2>
            <p>We aim to keep the platform available but do not guarantee uptime. The platform is provided &ldquo;as is&rdquo; without warranties of any kind.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">8. Limitation of Liability</h2>
            <p>ArchetypeConnect is not liable for any damages arising from your use of the platform, including but not limited to decisions made based on quiz results or interactions with other users.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] dark:text-gray-100 mb-3">9. Changes</h2>
            <p>We may update these terms as the platform evolves. Continued use after changes constitutes acceptance.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
