import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllContentSlugs, getContentBySlug } from '../components/templates/content';
import { getSiteConfig } from '../components/templates/site-config';
import { generateMetadata as genMeta } from '../lib/seo-utils';

export const metadata: Metadata = genMeta({
  title: 'RobloxGuard Resources - Guides and Articles',
  description: 'Browse our comprehensive guides and articles about Roblox parental controls, account security, fraud prevention, and online safety.',
  canonical: 'https://robloxguard.vercel.app/resources',
});

export default async function ResourcesPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Resources', url: '/resources' },
  ];

  const config = getSiteConfig();
  const allSlugs = await getAllContentSlugs();
  
  // Get all pillar pages (slug length === 1)
  const pillarSlugs = allSlugs.filter(slug => slug.length === 1);
  const pillars = await Promise.all(
    pillarSlugs.map(async (slug) => {
      const content = await getContentBySlug(slug);
      return content ? {
        title: content.frontmatter.title,
        description: content.frontmatter.metaDescription,
        url: `${config.resourcesBasePath}/${slug.join('/')}`,
      } : null;
    })
  );

  const validPillars = pillars.filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <>
      <Navigation />
      <main>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl font-bold text-gray-900 mt-4">Resources</h1>
            <p className="text-xl text-gray-600 mt-4">
              Comprehensive guides and articles to help you protect your child's Roblox account
            </p>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {validPillars.map((pillar) => (
                <Link
                  key={pillar.url}
                  href={pillar.url}
                  className="group block bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {pillar.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {pillar.description}
                  </p>
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                    Explore guide
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

