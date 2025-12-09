import { NextResponse } from 'next/server';
import { generateSitemapUrls } from '../lib/sitemap-utils';

export async function GET() {
  try {
    const urls = await generateSitemapUrls();
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => {
  const lastmod = url.lastmod instanceof Date 
    ? url.lastmod.toISOString() 
    : typeof url.lastmod === 'string' 
      ? url.lastmod 
      : new Date().toISOString();
  return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    // Fallback to core pages only if sitemap generation fails
    console.error('Sitemap generation error:', error);
    
    // Get BASE_URL from sitemap-utils or use fallback
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxguard.vercel.app';
    const corePages = [
      { loc: `${BASE_URL}/`, lastmod: new Date(), changefreq: 'weekly' as const, priority: 1.0 },
      { loc: `${BASE_URL}/product`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.8 },
      { loc: `${BASE_URL}/features`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.8 },
      { loc: `${BASE_URL}/pricing`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.8 },
      { loc: `${BASE_URL}/about`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.8 },
      { loc: `${BASE_URL}/contact`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.8 },
      { loc: `${BASE_URL}/faq`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.8 },
      { loc: `${BASE_URL}/security`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.8 },
      { loc: `${BASE_URL}/privacy`, lastmod: new Date(), changefreq: 'yearly' as const, priority: 0.5 },
      { loc: `${BASE_URL}/terms`, lastmod: new Date(), changefreq: 'yearly' as const, priority: 0.5 },
      { loc: `${BASE_URL}/resources`, lastmod: new Date(), changefreq: 'weekly' as const, priority: 0.9 },
      { loc: `${BASE_URL}/sitemap`, lastmod: new Date(), changefreq: 'monthly' as const, priority: 0.5 },
    ];

    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${corePages.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod.toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}

