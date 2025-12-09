import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import StructuredData from '../components/StructuredData';
import { generateMetadata as genMeta } from '../lib/seo-utils';

export const metadata: Metadata = genMeta({
  title: 'RobloxGuard Features - Complete Roblox Protection',
  description: 'Discover all RobloxGuard features: real-time monitoring, fraud detection, instant alerts, spending limits, and more. Complete protection for your child\'s Roblox account.',
  canonical: 'https://robloxguard.vercel.app/features',
});

export default function FeaturesPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Features', url: '/features' },
  ];

  return (
    <>
      <Navigation />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl font-bold text-gray-900 mt-4">Complete Protection for Your Child's Roblox Account</h1>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Real-Time Account Monitoring</h2>
            <p className="text-lg text-gray-600 mb-6">
              Continuous 24/7 monitoring of your child's Roblox account activity, including transactions, item trades, friend requests, and in-game conversations. Our system analyzes patterns in real-time to identify potential threats before they become problems.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Transaction Monitoring</h3>
                <p className="text-gray-700">Track every Robux purchase, trade, and transaction in real-time</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Activity Tracking</h3>
                <p className="text-gray-700">Monitor gameplay, games played, and time spent on the platform</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Fraud Detection and Pattern Recognition</h2>
            <p className="text-lg text-gray-600 mb-6">
              Advanced machine learning algorithms analyze account activity to identify suspicious patterns that indicate potential scams or unauthorized access.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong className="text-gray-900">Scam Website Detection:</strong>
                  <span className="text-gray-700 ml-2">Identifies known Robux generator scams and phishing sites</span>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong className="text-gray-900">Anomaly Detection:</strong>
                  <span className="text-gray-700 ml-2">Flags unusual spending patterns or account behavior</span>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong className="text-gray-900">Social Engineering Protection:</strong>
                  <span className="text-gray-700 ml-2">Detects attempts to manipulate your child into sharing account information</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Instant SMS Alerts</h2>
            <p className="text-lg text-gray-600 mb-6">
              Receive immediate text message notifications when suspicious activity is detected. Each alert includes detailed information and one-tap action buttons.
            </p>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Alert Types</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Suspicious Transactions</p>
                  <p className="text-gray-700">Alerts when purchases are attempted from known scam sites</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Unauthorized Trades</p>
                  <p className="text-gray-700">Notifications when expensive items are being traded away</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Spending Limit Warnings</p>
                  <p className="text-gray-700">Alerts when approaching or reaching spending limits</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Account Security</p>
                  <p className="text-gray-700">Notifications about login attempts or account changes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Transaction Blocking and Approval</h2>
            <p className="text-lg text-gray-600 mb-6">
              All suspicious transactions are automatically blocked until you approve them. Review alerts and make decisions with a single tap.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Automatic Blocking</h3>
                <p className="text-gray-600">Suspicious transactions are blocked by default</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Review & Decide</h3>
                <p className="text-gray-600">Review transaction details in the alert</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Approve or Block</h3>
                <p className="text-gray-600">One-tap approval or permanent blocking</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Spending Limits and Budgets</h2>
            <p className="text-lg text-gray-600 mb-6">
              Set flexible spending limits per child account. Choose monthly or weekly budgets, and get automatic notifications when limits are approached or reached.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Flexible Limits</h3>
                <p className="text-gray-700">Set different limits for each child based on your family's needs</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Automatic Enforcement</h3>
                <p className="text-gray-700">Limits are enforced automatically—no manual intervention needed</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Friend Request Approval</h2>
            <p className="text-lg text-gray-600 mb-6">
              Prevent social engineering attacks by requiring your approval for all friend requests. Review each request and see the requester's account information before approving.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Weekly Activity Reports</h2>
            <p className="text-lg text-gray-600 mb-6">
              Receive comprehensive weekly email reports summarizing your child's Roblox activity, spending, security alerts, and social interactions.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Multi-Account Management</h2>
            <p className="text-lg text-gray-600 mb-6">
              Manage protection for multiple children from a single dashboard. Each account has independent settings, limits, and monitoring.
            </p>
          </div>
        </section>

        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Every Feature Designed for Roblox Protection</h2>
            <p className="text-xl mb-8 text-blue-100">
              Unlike generic parental controls, every RobloxGuard feature is purpose-built to prevent Roblox-specific fraud and scams.
            </p>
            <Link
              href="/pricing"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg inline-block"
            >
              See Pricing Plans
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

