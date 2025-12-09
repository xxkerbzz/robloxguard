import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import StructuredData from '../components/StructuredData';
import { generateMetadata as genMeta } from '../lib/seo-utils';

export const metadata: Metadata = genMeta({
  title: 'RobloxGuard Pricing - Protect Your Child for $12/month',
  description: 'Simple, transparent pricing for RobloxGuard. Protect your child\'s Roblox account for $9-15/month. Free trial available, no credit card required.',
  canonical: 'https://robloxguard.vercel.app/pricing',
});

export default function PricingPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Pricing', url: '/pricing' },
  ];

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: 'RobloxGuard Subscription',
    price: '12',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://robloxguard.vercel.app/pricing',
  };

  return (
    <>
      <StructuredData schemaType="Offer" data={offerSchema} />
      <Navigation />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl font-bold text-gray-900 mt-4">Simple, Transparent Pricing</h1>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-2 border-gray-200 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Single Child</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$12</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Real-time account monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Instant SMS alerts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Transaction blocking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Spending limits</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Weekly reports</span>
                  </li>
                </ul>
                <Link
                  href="/pricing"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>

              <div className="border-2 border-blue-600 rounded-lg p-8 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Family Plan</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$20</span>
                  <span className="text-gray-600">/month</span>
                  <p className="text-sm text-gray-600 mt-1">Up to 3 children</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Everything in Single Child</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Multi-account management</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Link
                  href="/pricing"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>

              <div className="border-2 border-gray-200 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Everything in Family Plan</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Unlimited children</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Dedicated support</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full bg-gray-200 text-gray-900 text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">All Plans Include</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Free 14-Day Trial</h3>
                <p className="text-gray-600">Try all features risk-free. No credit card required.</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Cancel Anytime</h3>
                <p className="text-gray-600">No long-term contracts. Cancel your subscription at any time.</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">24/7 Monitoring</h3>
                <p className="text-gray-600">Round-the-clock protection with instant alerts.</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Email Support</h3>
                <p className="text-gray-600">Get help when you need it from our support team.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions About Pricing</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Is there a free trial?</h3>
                <p className="text-gray-600">Yes! All plans include a 14-day free trial. No credit card required to start.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I cancel anytime?</h3>
                <p className="text-gray-600">Absolutely. There are no long-term contracts. Cancel your subscription at any time from your account settings.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards and PayPal. All payments are processed securely.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Do you offer refunds?</h3>
                <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Start Protecting Your Family Today</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of parents who trust RobloxGuard to protect their children from Roblox fraud.
            </p>
            <Link
              href="/pricing"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg inline-block"
            >
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

