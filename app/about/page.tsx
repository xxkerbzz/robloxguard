import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import StructuredData from '../components/StructuredData';
import { generateMetadata as genMeta } from '../lib/seo-utils';

export const metadata: Metadata = genMeta({
  title: 'About RobloxGuard - Our Mission to Protect Kids Online',
  description: 'Learn about RobloxGuard\'s mission to protect children from Roblox fraud. Built by parents, for parents. Discover our commitment to child safety.',
  canonical: 'https://robloxguard.vercel.app/about',
});

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
  ];

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RobloxGuard',
    url: 'https://robloxguard.vercel.app',
    description: 'Parental control platform protecting children from Roblox fraud',
  };

  return (
    <>
      <StructuredData schemaType="Organization" data={orgSchema} />
      <Navigation />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl font-bold text-gray-900 mt-4">About RobloxGuard</h1>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              RobloxGuard was founded with a simple mission: to protect children from the growing threat of Roblox fraud and scams. We believe every parent should have peace of mind knowing their child can play safely online without risking financial loss or account compromise.
            </p>
            <p className="text-lg text-gray-600">
              Our goal is to provide proactive protection—stopping fraud before it happens, rather than alerting parents after the damage is done. We're committed to making online gaming safe for children and stress-free for parents.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why We Built RobloxGuard</h2>
            <p className="text-lg text-gray-600 mb-4">
              As parents ourselves, we experienced the frustration of discovering unauthorized Robux purchases on our credit cards. We tried existing parental control solutions, but found they were either too easy for tech-savvy kids to bypass or didn't address the specific fraud patterns we were seeing in Roblox.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We realized that generic parental controls weren't enough. Roblox fraud requires specialized detection—understanding scam websites, recognizing social engineering tactics, and identifying suspicious trading patterns. That's why we built RobloxGuard: a purpose-built solution for Roblox protection.
            </p>
            <p className="text-lg text-gray-600">
              We understand the frustration of discovering unauthorized charges. We've been there. That's why every feature in RobloxGuard is designed to prevent fraud before it happens, giving parents control and children the freedom to play safely.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Commitment to Child Safety</h2>
            <p className="text-lg text-gray-600 mb-6">
              Child safety is at the core of everything we do. We're committed to:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700"><strong>Proactive Protection:</strong> Stopping fraud before it happens, not after</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700"><strong>Privacy First:</strong> We never share your data with third parties</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700"><strong>Continuous Improvement:</strong> We constantly update our fraud detection to stay ahead of new scams</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700"><strong>Transparent Communication:</strong> Clear alerts and reports help you understand what's happening</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Thousands of Protected Families</h2>
            <p className="text-xl mb-8 text-blue-100">
              Parents across the country trust RobloxGuard to protect their children. Join them today and experience the peace of mind that comes with proactive fraud protection.
            </p>
            <Link
              href="/pricing"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg inline-block"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

