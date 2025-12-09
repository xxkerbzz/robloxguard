import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import StructuredData from '../components/StructuredData';
import { generateMetadata as genMeta } from '../lib/seo-utils';

export const metadata: Metadata = genMeta({
  title: 'RobloxGuard FAQ - Frequently Asked Questions',
  description: 'Frequently asked questions about RobloxGuard: setup, features, pricing, security, and more. Get answers to common questions.',
  canonical: 'https://robloxguard.com/faq',
});

export default function FAQPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'FAQ', url: '/faq' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does RobloxGuard work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RobloxGuard connects to your child\'s Roblox account and monitors activity in real-time. When suspicious activity is detected, you receive instant SMS alerts with options to block or allow transactions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All plans include a 14-day free trial with no credit card required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can my child disable RobloxGuard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. RobloxGuard uses external monitoring that your child cannot disable, unlike Roblox\'s built-in parental controls.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData schemaType="FAQPage" data={faqSchema} />
      <Navigation />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl font-bold text-gray-900 mt-4">Frequently Asked Questions</h1>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Getting Started</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">How do I set up RobloxGuard?</h3>
                <p className="text-gray-600">Setting up RobloxGuard takes less than 5 minutes. Sign up for a free trial, connect your child's Roblox account using secure OAuth, and configure your preferences. Our setup wizard guides you through each step.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Do I need my child's Roblox password?</h3>
                <p className="text-gray-600">No. RobloxGuard uses OAuth authentication, which means your child logs in through Roblox's secure system. We never see or store passwords.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Is there a free trial?</h3>
                <p className="text-gray-600">Yes! All plans include a 14-day free trial. No credit card required to start. You can cancel anytime during the trial period.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">How It Works</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">How does RobloxGuard detect fraud?</h3>
                <p className="text-gray-600">Our system uses machine learning algorithms to analyze account activity patterns. It identifies known scam websites, unusual spending patterns, suspicious trades, and social engineering attempts.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Can my child disable RobloxGuard?</h3>
                <p className="text-gray-600">No. RobloxGuard uses external monitoring that your child cannot disable, unlike Roblox's built-in parental controls which are easily bypassed.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">How quickly will I receive alerts?</h3>
                <p className="text-gray-600">Alerts are sent instantly via SMS when suspicious activity is detected. You'll receive the alert within seconds of the activity occurring.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Pricing and Billing</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">How much does RobloxGuard cost?</h3>
                <p className="text-gray-600">Plans start at $12/month for a single child. Family plans are available for $20/month for up to 3 children. Enterprise pricing is available for larger families.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I cancel anytime?</h3>
                <p className="text-gray-600">Yes. There are no long-term contracts. You can cancel your subscription at any time from your account settings.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Do you offer refunds?</h3>
                <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee. If you're not satisfied with RobloxGuard, contact us for a full refund.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Account Management</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I protect multiple children?</h3>
                <p className="text-gray-600">Yes! Our Family Plan supports up to 3 children. Enterprise plans support unlimited children. Each account has independent settings and limits.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">How do I change spending limits?</h3>
                <p className="text-gray-600">You can update spending limits at any time from your dashboard. Changes take effect immediately.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Security and Privacy</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Is my data secure?</h3>
                <p className="text-gray-600">Yes. We use bank-level encryption for all data. We never share your information with third parties, and we comply with all relevant privacy regulations including COPPA.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">What information do you collect?</h3>
                <p className="text-gray-600">We only collect the minimum information necessary to provide our service: account activity data, transaction information, and your contact information for alerts. See our Privacy Policy for full details.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Can't find the answer you're looking for? Contact our support team.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg inline-block"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

