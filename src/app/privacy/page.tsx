import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ArchetypeConnect privacy policy. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: March 13, 2026</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p><strong>Account Information:</strong> When you sign in with GitHub or Google, we receive your name, email address, and profile picture from the OAuth provider. Guest accounts only store an optional display name.</p>
            <p className="mt-3"><strong>Quiz Data:</strong> Your quiz answers and resulting archetype scores are stored to generate your identity and enable community features.</p>
            <p className="mt-3"><strong>Usage Data:</strong> We collect standard server logs (IP address, browser type, pages visited) for security and performance purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To generate and display your archetype identity and scores</li>
              <li>To place you in your archetype group and show you to other group members</li>
              <li>To enable meeting creation, joining, and management</li>
              <li>To display community statistics (aggregated, not individual)</li>
              <li>To improve the platform and fix bugs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. What We Share</h2>
            <p>We do not sell your personal data. We do not share your data with third-party advertisers.</p>
            <p className="mt-3">Your archetype identity, name, and group membership are visible to other users on the platform. Your email address is never publicly displayed.</p>
            <p className="mt-3">Aggregated, anonymized statistics (like archetype distribution) are displayed publicly on the Community Stats page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Storage &amp; Security</h2>
            <p>Your data is stored securely using encrypted connections. Authentication is handled through industry-standard OAuth providers (GitHub, Google). We do not store passwords.</p>
            <p className="mt-3">All API endpoints validate and sanitize input to prevent injection attacks. Security headers are enforced on all pages.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies</h2>
            <p>We use essential cookies for authentication session management. We do not use third-party tracking cookies or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p>You can request deletion of your account and all associated data by contacting us. Upon deletion, your quiz results, identity, meeting participation, and account information will be permanently removed.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Children</h2>
            <p>ArchetypeConnect is not intended for users under 13 years of age. We do not knowingly collect data from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes</h2>
            <p>We may update this privacy policy as the platform evolves. Significant changes will be communicated through the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
            <p>For privacy-related questions or data deletion requests, reach out via the platform or through our GitHub repository.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
