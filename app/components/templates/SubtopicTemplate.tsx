'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ContentData } from './content';
import { getSiteConfig } from './site-config';

interface SubtopicTemplateProps {
  content: ContentData;
  childPages: { title: string; url: string; description?: string }[];
  // Optional: Override site config for this instance
  siteConfig?: ReturnType<typeof getSiteConfig>;
  // Optional: Custom Navigation and Footer components
  Navigation?: React.ComponentType;
  Footer?: React.ComponentType;
  Breadcrumbs?: React.ComponentType<{ items: { label: string; url: string }[] }>;
  StructuredData?: React.ComponentType<{ schemaType: string; data: any }>;
}

// Extract headings from markdown for table of contents
function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ id, text, level });
  }

  return headings;
}

// Calculate reading time
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function SubtopicTemplate({ 
  content, 
  childPages,
  siteConfig: customSiteConfig,
  Navigation,
  Footer,
  Breadcrumbs,
  StructuredData,
}: SubtopicTemplateProps) {
  const config = customSiteConfig || getSiteConfig();
  const { frontmatter, content: markdown } = content;
  const [activeSection, setActiveSection] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const headings = extractHeadings(markdown);
  const readingTime = calculateReadingTime(markdown);

  // Track scroll position for active section and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      // Find active section
      const sections = headings.map(h => document.getElementById(h.id));
      const scrollPos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbs = [
    { label: 'Home', url: config.homeUrl },
    { label: 'Resources', url: config.resourcesBasePath },
    { label: frontmatter.parentTitle, url: frontmatter.parentUrl },
    { label: frontmatter.title, url: `${config.resourcesBasePath}/${content.slug.join('/')}` },
  ];

  // Remove H1 and intro paragraph from content since we render them in the hero
  const contentWithoutH1 = markdown.replace(/^[\s\S]*?(?=##\s)/, '');

  // Default components if not provided
  const NavComponent = Navigation || (() => null);
  const FooterComponent = Footer || (() => null);
  const BreadcrumbsComponent = Breadcrumbs || (({ items }: { items: { label: string; url: string }[] }) => null);
  const StructuredDataComponent = StructuredData || (() => null);

  return (
    <>
      <StructuredDataComponent
        schemaType="Article"
        data={{
          '@type': 'Article',
          headline: frontmatter.title,
          description: frontmatter.metaDescription,
          dateModified: frontmatter.lastUpdated,
          author: {
            '@type': 'Organization',
            name: config.brandName,
          },
          publisher: {
            '@type': 'Organization',
            name: config.brandName,
          },
        }}
      />
      <NavComponent />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <BreadcrumbsComponent items={breadcrumbs} />
            
            <div className="max-w-4xl mt-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6">
                {frontmatter.title}
              </h1>
              
              {/* Featured Snippet / Intro */}
              {frontmatter.featuredSnippet && (
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
                  {frontmatter.featuredSnippet}
                </p>
              )}
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime} min read
                </span>
                {frontmatter.lastUpdated && (
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Updated {new Date(frontmatter.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            
            {/* Table of Contents - Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <nav className="sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  On This Page
                </h2>
                {headings.filter(h => h.level === 2).map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block py-2 px-3 text-sm rounded-md transition-colors ${
                      activeSection === heading.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {heading.text}
                  </a>
                ))}
                
                {/* Quick CTA in sidebar */}
                {config.contactUrl && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link
                      href={config.contactUrl}
                      className="block w-full text-center py-3 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {config.ctaPrimaryText}
                    </Link>
                  </div>
                )}
              </nav>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9">
              {/* Mobile TOC */}
              <details className="lg:hidden mb-8 bg-slate-50 rounded-lg p-4">
                <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                  Table of Contents
                </summary>
                <nav className="mt-4 space-y-2">
                  {headings.filter(h => h.level === 2).map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </details>

              {/* Article Body */}
              <div className="prose prose-lg prose-slate max-w-none
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:text-gray-600 prose-ol:text-gray-600
                prose-li:marker:text-blue-500 prose-li:mb-2
                prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700
                prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
              ">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, ...props }) => {
                      const text = typeof children === 'string' ? children : 
                        Array.isArray(children) ? children.join('') : String(children);
                      const id = text
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');
                      return (
                        <h2 
                          id={id} 
                          className="scroll-mt-24 text-2xl sm:text-3xl font-semibold text-gray-900 mt-16 mb-6 pl-4 border-l-4 border-blue-500 tracking-tight" 
                          {...props}
                        >
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }) => {
                      const text = typeof children === 'string' ? children : 
                        Array.isArray(children) ? children.join('') : String(children);
                      const id = text
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');
                      return (
                        <h3 
                          id={id} 
                          className="scroll-mt-24 text-lg sm:text-xl font-semibold text-gray-800 mt-10 mb-4 tracking-tight" 
                          {...props}
                        >
                          {children}
                        </h3>
                      );
                    },
                    a: ({ href, children, ...props }) => (
                      <a 
                        href={href} 
                        className="text-blue-600 font-medium hover:text-blue-700 hover:underline" 
                        {...props}
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {contentWithoutH1}
                </ReactMarkdown>
              </div>

              {/* Related Questions Section */}
              {childPages.length > 0 && (
                <section className="mt-20 pt-12 border-t border-gray-200">
                  <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-3">
                    Related Questions
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Explore specific questions about {frontmatter.title.toLowerCase().replace(/:.+/, '')}.
                  </p>
                  <div className="space-y-4">
                    {childPages.map((child) => (
                      <Link
                        key={child.url}
                        href={child.url}
                        className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200"
                      >
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                          {child.title}
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </h3>
                        {child.description && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                            {child.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA Section */}
              <section className="mt-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                  See how {config.brandName} can help you achieve your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {config.contactUrl && (
                    <Link
                      href={config.contactUrl}
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                      {config.ctaPrimaryText}
                    </Link>
                  )}
                  {config.pricingUrl && config.ctaSecondaryText && (
                    <Link
                      href={config.pricingUrl}
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                    >
                      {config.ctaSecondaryText}
                    </Link>
                  )}
                </div>
              </section>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between gap-4">
                <Link
                  href={frontmatter.parentUrl}
                  className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to {frontmatter.parentTitle}
                </Link>
                <Link
                  href={config.resourcesBasePath}
                  className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                >
                  View all resources
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 z-50"
            aria-label="Scroll to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </main>
      <FooterComponent />
    </>
  );
}

