import fs from 'fs';
import path from 'path';
import { getAllContentSlugs } from './content';
import { getSiteConfig } from '../components/templates/site-config';

export interface SitemapUrl {
  loc: string;
  lastmod: Date;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// BASE_URL should be set from PRD (production domain)
// For localhost development, use: 'http://localhost:3000'
// For production, use the actual domain from PRD
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxguard.vercel.app';
const CURRENT_DATE = new Date(); // Date object for lastModified

/**
 * Core pages configuration
 * Update this list based on core pages from 02. Core Pages.yaml
 */
const corePages: SitemapUrl[] = [
  {
    loc: `${BASE_URL}/`,
    lastmod: CURRENT_DATE,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    loc: `${BASE_URL}/product`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: `${BASE_URL}/features`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: `${BASE_URL}/pricing`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: `${BASE_URL}/about`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: `${BASE_URL}/contact`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: `${BASE_URL}/faq`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: `${BASE_URL}/security`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: `${BASE_URL}/privacy`,
    lastmod: CURRENT_DATE,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    loc: `${BASE_URL}/terms`,
    lastmod: CURRENT_DATE,
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    loc: `${BASE_URL}/resources`,
    lastmod: CURRENT_DATE,
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    loc: `${BASE_URL}/sitemap`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: 0.5,
  },
];

/**
 * Get file modification date for a content file
 */
function getContentFileDate(slug: string[]): Date {
  try {
    const config = getSiteConfig();
    const CONTENT_DIR = path.isAbsolute(config.contentDirectory)
      ? config.contentDirectory
      : path.join(process.cwd(), config.contentDirectory);

    let filePath: string;
    
    if (slug.length === 1) {
      filePath = path.join(CONTENT_DIR, `Pillar - ${slug[0]}`, `${slug[0]}.md`);
    } else if (slug.length === 2) {
      filePath = path.join(CONTENT_DIR, `Pillar - ${slug[0]}`, `Cluster - ${slug[1]}`, `${slug[1]}.md`);
    } else if (slug.length === 3) {
      filePath = path.join(CONTENT_DIR, `Pillar - ${slug[0]}`, `Cluster - ${slug[1]}`, 'Blog', `${slug[2]}.md`);
    } else {
      return CURRENT_DATE;
    }

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return stats.mtime || stats.birthtime || CURRENT_DATE;
    }
  } catch (error) {
    // Fallback to current date if file date can't be determined
  }
  
  return CURRENT_DATE;
}

/**
 * Generate sitemap URLs for all SEO content pages
 */
export async function generateContentSitemapUrls(): Promise<SitemapUrl[]> {
  try {
    const slugs = await getAllContentSlugs();
    const urls: SitemapUrl[] = [];

    for (const slug of slugs) {
      const urlPath = `/resources/${slug.join('/')}`;
      
      // Determine priority and changefreq based on URL depth
      let priority: number;
      let changefreq: SitemapUrl['changefreq'];
      
      if (slug.length === 1) {
        // Pillar page
        priority = 0.9;
        changefreq = 'monthly';
      } else if (slug.length === 2) {
        // Subtopic page
        priority = 0.7;
        changefreq = 'monthly';
      } else {
        // PAA post (3 levels)
        priority = 0.6;
        changefreq = 'monthly';
      }

      // Use actual file modification date for better SEO
      const fileDate = getContentFileDate(slug);

      urls.push({
        loc: `${BASE_URL}${urlPath}`,
        lastmod: fileDate,
        changefreq,
        priority,
      });
    }

    return urls;
  } catch (error) {
    // If content directory is not available during build, return empty array
    // This can happen during Vercel builds if content hasn't been copied yet
    console.warn('Could not generate content sitemap URLs:', error);
    return [];
  }
}

/**
 * Generate complete sitemap with all pages
 */
export async function generateSitemapUrls(): Promise<SitemapUrl[]> {
  const contentUrls = await generateContentSitemapUrls();
  return [...corePages, ...contentUrls];
}

