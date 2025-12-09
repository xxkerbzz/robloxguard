import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import { generateMetadata as genMeta } from './lib/seo-utils';

export const metadata: Metadata = genMeta({
  title: 'RobloxGuard - Stop Roblox Scams Before They Happen',
  description: 'Protect your child\'s Roblox account from fraud with real-time monitoring and instant alerts. Block suspicious transactions before they happen. Start your free trial today.',
  canonical: 'https://robloxguard.com',
});

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RobloxGuard',
    url: 'https://robloxguard.com',
    logo: 'https://robloxguard.com/logo.png',
    description: 'Parental control platform that monitors Roblox accounts in real-time to prevent scams and unauthorized spending.',
    sameAs: [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RobloxGuard',
    url: 'https://robloxguard.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://robloxguard.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <StructuredData schemaType="Organization" data={organizationSchema} />
      <StructuredData schemaType="WebSite" data={websiteSchema} />
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Stop Roblox Scams Before They Happen
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Your kid's Roblox account just got hacked and $200 disappeared overnight. RobloxGuard monitors your child's account in real-time and blocks suspicious transactions instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pricing"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/product"
                  className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors border-2 border-white"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How RobloxGuard Protects Your Family */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              How RobloxGuard Protects Your Family
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Real-Time Monitoring</h3>
                <p className="text-gray-600">
                  Continuous monitoring of your child's Roblox account and payment methods using advanced pattern detection.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Instant Alerts</h3>
                <p className="text-gray-600">
                  Get immediate SMS notifications when suspicious activity is detected, with options to block or allow transactions.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Spending Controls</h3>
                <p className="text-gray-600">
                  Set spending limits, approve friend requests, and receive weekly reports on account activity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real-Time Monitoring and Instant Alerts */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Real-Time Monitoring and Instant Alerts
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  RobloxGuard connects directly to your child's Roblox account and payment methods, using advanced pattern detection to identify suspicious activity before it becomes a problem.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  When your child attempts to purchase from a known scam site, or when someone tries to trade away expensive items, you receive an immediate text with options to block or allow the transaction.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Pattern detection differentiates legitimate gameplay from fraud</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Instant SMS alerts for suspicious transactions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Block or allow transactions with one tap</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="text-sm text-gray-500">Alert from RobloxGuard</p>
                    <p className="text-gray-900 font-semibold mt-1">Suspicious transaction detected</p>
                    <p className="text-gray-600 text-sm mt-1">Your child attempted to purchase from a known scam site.</p>
                    <div className="flex gap-2 mt-3">
                      <button className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold">Block</button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-semibold">Allow</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted by Thousands of Parents */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Trusted by Thousands of Parents
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "RobloxGuard saved us from a $150 unauthorized purchase. The instant alert let me block it before it went through. Worth every penny!"
                </p>
                <p className="text-sm font-semibold text-gray-900">- Sarah M., Parent</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Finally, a parental control that actually works for Roblox. My son can't disable it, and I get peace of mind knowing I'm protected."
                </p>
                <p className="text-sm font-semibold text-gray-900">- Michael T., Parent</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The weekly reports help me understand what my daughter is doing on Roblox. It's like having a safety net I never knew I needed."
                </p>
                <p className="text-sm font-semibold text-gray-900">- Jennifer L., Parent</p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Today */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Get Started Today</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of parents protecting their children from Roblox fraud. Start your free trial today—no credit card required.
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

