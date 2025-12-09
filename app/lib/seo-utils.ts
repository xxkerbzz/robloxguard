import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxguard.com';
  const fullTitle = title.includes('RobloxGuard') ? title : `${title} | RobloxGuard`;
  
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonical || siteUrl,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || siteUrl,
      siteName: 'RobloxGuard',
      images: ogImage ? [{ url: ogImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

