'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Breadcrumbs from '@/app/components/Breadcrumbs';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

interface SitemapSection {
  title: string;
  urls: SitemapUrl[];
}

const breadcrumbs = [
  { label: 'Home', url: '/' },
  { label: 'Sitemap', url: '/sitemap' },
];

function parseSitemapXml(xmlText: string): SitemapUrl[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const urlElements = xmlDoc.getElementsByTagName('url');
  const urls: SitemapUrl[] = [];

  for (let i = 0; i < urlElements.length; i++) {
    const urlElement = urlElements[i];
    const loc = urlElement.getElementsByTagName('loc')[0]?.textContent || '';
    const lastmod = urlElement.getElementsByTagName('lastmod')[0]?.textContent;
    const changefreq = urlElement.getElementsByTagName('changefreq')[0]?.textContent;
    const priority = urlElement.getElementsByTagName('priority')[0]?.textContent;

    // Extract path from full URL
    try {
      const url = new URL(loc);
      const path = url.pathname;

      urls.push({
        loc: path,
        lastmod,
        changefreq,
        priority,
      });
    } catch {
      // If URL parsing fails, use the loc as-is
      urls.push({
        loc: loc.replace(/^https?:\/\/[^/]+/, '') || loc,
        lastmod,
        changefreq,
        priority,
      });
    }
  }

  return urls;
}

function organizeUrls(urls: SitemapUrl[]): SitemapSection[] {
  const sections: SitemapSection[] = [];
  
  // Core pages
  const corePages = urls.filter(url => {
    const path = url.loc;
    return path === '/' || 
           path.startsWith('/product') ||
           path.startsWith('/features') ||
           path.startsWith('/pricing') ||
           path.startsWith('/about') ||
           path.startsWith('/contact') ||
           path.startsWith('/faq') ||
           path.startsWith('/security') ||
           (path.startsWith('/resources') && path === '/resources');
  });
  
  if (corePages.length > 0) {
    sections.push({
      title: 'Main Pages',
      urls: corePages,
    });
  }

  // Legal pages
  const legalPages = urls.filter(url => 
    url.loc.startsWith('/privacy') || url.loc.startsWith('/terms')
  );
  
  if (legalPages.length > 0) {
    sections.push({
      title: 'Legal Pages',
      urls: legalPages,
    });
  }

  // Resource pages - organize by pillar
  const resourcePages = urls.filter(url => 
    url.loc.startsWith('/resources/') && url.loc !== '/resources'
  );

  // Group by pillar (first segment after /resources/)
  const pillarGroups: Record<string, SitemapUrl[]> = {};

  resourcePages.forEach(url => {
    const pathParts = url.loc.split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      const pillar = pathParts[1]; // e.g., 'pillar-slug'
      if (!pillarGroups[pillar]) {
        pillarGroups[pillar] = [];
      }
      pillarGroups[pillar].push(url);
    }
  });

  // Convert pillar groups to sections
  Object.entries(pillarGroups).forEach(([pillar, pillarUrls]) => {
    // Sort: pillar page first, then subtopics, then articles
    pillarUrls.sort((a, b) => {
      const aDepth = a.loc.split('/').filter(Boolean).length;
      const bDepth = b.loc.split('/').filter(Boolean).length;
      if (aDepth !== bDepth) return aDepth - bDepth;
      return a.loc.localeCompare(b.loc);
    });

    const formattedTitle = pillar
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    sections.push({
      title: formattedTitle,
      urls: pillarUrls,
    });
  });

  return sections;
}

function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch {
    return dateString;
  }
}

function getPageTitle(path: string): string {
  if (path === '/') return 'Home';
  
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return 'Home';
  
  // Get the last part and format it
  const lastPart = parts[parts.length - 1];
  return lastPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function SitemapPage() {
  const [sections, setSections] = useState<SitemapSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUrls, setTotalUrls] = useState(0);

  useEffect(() => {
    async function fetchSitemap() {
      try {
        setLoading(true);
        const response = await fetch('/sitemap.xml');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sitemap');
        }

        const xmlText = await response.text();
        const urls = parseSitemapXml(xmlText);
        const organized = organizeUrls(urls);
        
        setSections(organized);
        setTotalUrls(urls.length);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load sitemap');
        console.error('Error fetching sitemap:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSitemap();
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-4">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
              <p className="text-lg text-gray-600 mb-4">
                Browse all pages on RobloxGuard. This sitemap is generated from our XML sitemap used by search engines.
              </p>
              <p className="text-sm text-gray-500">
                XML Sitemap: <Link href="/sitemap.xml" className="text-blue-600 hover:text-blue-700 underline">View Raw XML</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading sitemap...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 font-medium">Error loading sitemap</p>
              <p className="text-red-600 text-sm mt-2">{error}</p>
            </div>
          )}

          {!loading && !error && sections.length > 0 && (
            <>
              <div className="grid gap-8">
                {sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      {section.title}
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Page
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                              Last Modified
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                              Change Frequency
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                              Priority
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {section.urls.map((url, urlIndex) => (
                            <tr
                              key={urlIndex}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3 whitespace-nowrap">
                                <Link
                                  href={url.loc}
                                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium flex items-center gap-2 group"
                                >
                                  <svg
                                    className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                  <span>{getPageTitle(url.loc)}</span>
                                </Link>
                                <div className="text-xs text-gray-500 mt-1 md:hidden">
                                  {url.loc}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                                {formatDate(url.lastmod)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {url.changefreq || 'N/A'}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                                {url.priority || 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Statistics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{totalUrls}</div>
                    <div className="text-gray-600">Total Pages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{sections.length}</div>
                    <div className="text-gray-600">Sections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {sections.filter(s => s.title !== 'Main Pages' && s.title !== 'Legal Pages').length}
                    </div>
                    <div className="text-gray-600">Resource Pillars</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {sections.reduce((acc, s) => acc + s.urls.length, 0)}
                    </div>
                    <div className="text-gray-600">Total URLs</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

