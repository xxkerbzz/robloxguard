'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ContentData } from './content';
import { getSiteConfig } from './site-config';

interface PAATemplateProps {
  content: ContentData;
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
  const headingRegex = /^(#{2})\s+(.+)$/gm;
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

export default function PAATemplate({ 
  content,
  siteConfig: customSiteConfig,
  Navigation,
  Footer,
  Breadcrumbs,
  StructuredData,
}: PAATemplateProps) {
  const config = customSiteConfig || getSiteConfig();
  const { frontmatter, content: markdown } = content;
  const [showScrollTop, setShowScrollTop] = useState(false);

  const headings = extractHeadings(markdown);
  const readingTime = calculateReadingTime(markdown);

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbs = [
    { label: 'Home', url: config.homeUrl },
    { label: 'Resources', url: config.resourcesBasePath },
  ];

  // Add grandparent if exists
  if (frontmatter.grandparentUrl && frontmatter.grandparentTitle) {
    breadcrumbs.push({
      label: frontmatter.grandparentTitle,
      url: frontmatter.grandparentUrl,
    });
  }

  // Add parent
  breadcrumbs.push({
    label: frontmatter.parentTitle,
    url: frontmatter.parentUrl,
  });

  // Add current page
  breadcrumbs.push({
    label: frontmatter.title,
    url: `${config.resourcesBasePath}/${content.slug.join('/')}`,
  });

  // Build FAQ schema data
  const faqSchema = frontmatter.faq ? {
    '@type': 'FAQPage',
    mainEntity: frontmatter.faq.map((item: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  // Remove H1 from content since we render it in the hero
  // Split by first ## and keep everything after
  const firstH2Index = markdown.indexOf('## ');
  const contentWithoutH1 = firstH2Index > -1 ? markdown.slice(firstH2Index) : markdown;

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
      {faqSchema && (
        <StructuredDataComponent
          schemaType="FAQPage"
          data={faqSchema}
        />
      )}
      <NavComponent />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <BreadcrumbsComponent items={breadcrumbs} />
            
            <div className="mt-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-6">
                {frontmatter.title}
              </h1>
              
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Navigation - Questions */}
          {headings.length > 3 && (
            <div className="mb-12 p-6 bg-slate-50 rounded-xl">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Questions Answered
              </h2>
              <nav className="space-y-2">
                {headings.slice(0, 6).map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    → {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Article Body */}
          <article className="prose prose-lg prose-slate max-w-none
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
                  // Check if it's a question (ends with ?)
                  const isQuestion = text.trim().endsWith('?');
                  return (
                    <h2 
                      id={id} 
                      className={`scroll-mt-24 text-xl sm:text-2xl font-semibold text-gray-900 mt-12 mb-4 tracking-tight ${
                        isQuestion ? 'pl-4 border-l-4 border-amber-500' : 'pl-4 border-l-4 border-blue-500'
                      }`}
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
                      className="scroll-mt-24 text-lg sm:text-xl font-semibold text-gray-800 mt-8 mb-4 tracking-tight" 
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
          </article>

          {/* CTA Section */}
          <section className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-medium text-white mb-3">
              Have More Questions?
            </h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              {config.contactUrl ? (
                <>Get in touch with {config.brandName} to learn more.</>
              ) : (
                <>Learn more about {config.brandName}.</>
              )}
            </p>
            {config.contactUrl && (
              <Link
                href={config.contactUrl}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                {config.ctaPrimaryText} →
              </Link>
            )}
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
            {frontmatter.grandparentUrl && (
              <Link
                href={frontmatter.grandparentUrl}
                className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors"
              >
                View all {frontmatter.grandparentTitle} articles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
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

