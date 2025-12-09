import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { generateMetadata as genMeta } from '../lib/seo-utils';

export const metadata: Metadata = genMeta({
  title: 'RobloxGuard Privacy Policy',
  description: 'RobloxGuard Privacy Policy. Learn how we collect, use, and protect your personal information and your child\'s data.',
  canonical: 'https://robloxguard.vercel.app/privacy',
});

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Privacy Policy', url: '/privacy' },
  ];

  return (
    <>
      <Navigation />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl font-bold text-gray-900 mt-4">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Information We Collect</h2>
            <p className="text-lg text-gray-600 mb-4">
              We collect information necessary to provide our service and protect your child's Roblox account:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700"><strong>Account Information:</strong> Roblox username, account ID, and authentication tokens</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700"><strong>Activity Data:</strong> Transaction history, gameplay activity, friend requests, and in-game interactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700"><strong>Contact Information:</strong> Email address and phone number for alerts and support</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700"><strong>Payment Information:</strong> Processed securely through third-party payment providers (we never store credit card details)</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How We Use Your Information</h2>
            <p className="text-lg text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Monitor your child's Roblox account for suspicious activity</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Send you instant alerts when fraud is detected</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Enforce spending limits and transaction controls</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Generate weekly activity reports</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Provide customer support and respond to inquiries</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Improve our fraud detection algorithms</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Information Sharing</h2>
            <p className="text-lg text-gray-600 mb-4">
              We do not sell, rent, or share your personal information with third parties except in the following limited circumstances:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700"><strong>Service Providers:</strong> We may share data with trusted service providers who help us operate our service (e.g., hosting, payment processing)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700"><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700"><strong>Business Transfers:</strong> In the event of a merger or acquisition, data may be transferred to the new entity</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Data Security</h2>
            <p className="text-lg text-gray-600 mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">TLS 1.3 encryption for all data in transit</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">AES-256 encryption for data at rest</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">SOC 2 Type II certified infrastructure</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Regular security audits and penetration testing</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Rights</h2>
            <p className="text-lg text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Access your personal data</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Request correction of inaccurate data</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Request deletion of your data</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Export your data in a portable format</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Opt out of certain data processing activities</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Children's Privacy</h2>
            <p className="text-lg text-gray-600 mb-4">
              RobloxGuard is designed to protect children's online safety. We comply with the Children's Online Privacy Protection Act (COPPA) and do not knowingly collect personal information from children under 13 without parental consent.
            </p>
            <p className="text-lg text-gray-600">
              All accounts must be created and managed by a parent or legal guardian. We only collect the minimum information necessary to provide our fraud protection service.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Changes to This Policy</h2>
            <p className="text-lg text-gray-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
            <p className="text-lg text-gray-600">
              Your continued use of RobloxGuard after any changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <p className="text-lg text-gray-600">
              Email: privacy@robloxguard.com<br />
              Address: RobloxGuard Privacy Team<br />
              <Link href="/contact" className="text-blue-600 hover:underline">Contact Form</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

