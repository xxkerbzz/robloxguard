import { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { generateMetadata as genMeta } from '../lib/seo-utils';

export const metadata: Metadata = genMeta({
  title: 'RobloxGuard Terms of Service',
  description: 'RobloxGuard Terms of Service. Read our terms and conditions for using our fraud protection platform.',
  canonical: 'https://robloxguard.com/terms',
});

export default function TermsPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Terms of Service', url: '/terms' },
  ];

  return (
    <>
      <Navigation />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl font-bold text-gray-900 mt-4">Terms of Service</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Acceptance of Terms</h2>
            <p className="text-lg text-gray-600 mb-4">
              By accessing and using RobloxGuard, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our service.
            </p>
            <p className="text-lg text-gray-600">
              These terms apply to all users of RobloxGuard, including parents, guardians, and any other individuals who access or use our platform.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Description of Service</h2>
            <p className="text-lg text-gray-600 mb-4">
              RobloxGuard is a parental control platform that monitors Roblox accounts to detect and prevent fraud, unauthorized spending, and account compromise. Our service includes:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Real-time account monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Fraud detection and alerts</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Transaction blocking and approval</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Spending limits and budget controls</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Weekly activity reports</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">User Accounts</h2>
            <p className="text-lg text-gray-600 mb-4">
              To use RobloxGuard, you must:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Be at least 18 years old or have parental consent</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Provide accurate and complete information</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Maintain the security of your account credentials</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Be the parent or legal guardian of the child's account being monitored</span>
              </li>
            </ul>
            <p className="text-lg text-gray-600">
              You are responsible for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Payment Terms</h2>
            <p className="text-lg text-gray-600 mb-4">
              Subscription fees are billed in advance on a monthly or annual basis. By subscribing, you authorize us to charge your payment method for the subscription fee and any applicable taxes.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              All fees are non-refundable except as required by law or as specified in our refund policy. We reserve the right to change our pricing with 30 days' notice.
            </p>
            <p className="text-lg text-gray-600">
              If payment fails, we may suspend or terminate your access to the service until payment is received.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Cancellation and Refunds</h2>
            <p className="text-lg text-gray-600 mb-4">
              You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of your current billing period.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first 30 days, contact us for a full refund.
            </p>
            <p className="text-lg text-gray-600">
              Refunds are processed within 5-10 business days to your original payment method.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Intellectual Property</h2>
            <p className="text-lg text-gray-600 mb-4">
              All content, features, and functionality of RobloxGuard, including but not limited to text, graphics, logos, and software, are the property of RobloxGuard and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-lg text-gray-600">
              You may not copy, modify, distribute, or create derivative works of our service without our express written permission.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Limitation of Liability</h2>
            <p className="text-lg text-gray-600 mb-4">
              RobloxGuard is provided "as is" without warranties of any kind. We do not guarantee that our service will prevent all fraud or unauthorized activity.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              To the maximum extent permitted by law, RobloxGuard shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
            </p>
            <p className="text-lg text-gray-600">
              Our total liability for any claims arising from your use of the service shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Changes to Terms</h2>
            <p className="text-lg text-gray-600 mb-4">
              We reserve the right to modify these Terms of Service at any time. We will notify you of material changes by posting the updated terms on this page and updating the "Last updated" date.
            </p>
            <p className="text-lg text-gray-600">
              Your continued use of RobloxGuard after any changes constitutes acceptance of the updated terms. If you do not agree to the changes, you must stop using the service.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
            <p className="text-lg text-gray-600 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <p className="text-lg text-gray-600">
              Email: legal@robloxguard.com<br />
              Address: RobloxGuard Legal Team<br />
              <a href="/contact" className="text-blue-600 hover:underline">Contact Form</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

