/**
 * Site Configuration
 * 
 * Customize these values for your project before using the templates.
 * This file centralizes all brand-specific and site-specific settings.
 */

export interface SiteConfig {
  // Brand Information
  brandName: string;
  brandTagline?: string;
  
  // URL Structure
  resourcesBasePath: string; // e.g., "/resources" or "/blog" or "/guides"
  homeUrl: string; // e.g., "/"
  
  // Navigation Links
  contactUrl: string; // e.g., "/contact"
  pricingUrl?: string; // e.g., "/pricing" (optional)
  
  // CTA Text
  ctaPrimaryText: string; // e.g., "Book a Demo" or "Get Started"
  ctaSecondaryText?: string; // e.g., "View Pricing" (optional)
  
  // Content Directory Path
  // Relative to project root, or absolute path
  // Examples:
  // - "../SEO Strategy/content" (relative to app/)
  // - "content" (if content is in project root)
  // - "/absolute/path/to/content"
  contentDirectory: string;
  
  // Folder Naming Convention
  // Set to true if using "Pillar - {slug}" format, false for custom structure
  useStandardNaming: boolean;
  
  // Custom folder structure (if useStandardNaming is false)
  // Define your own folder patterns here
  customFolderPatterns?: {
    pillar: string; // e.g., "pillars/{slug}" or "{slug}"
    cluster: string; // e.g., "clusters/{slug}" or "{parent}/{slug}"
    blog: string; // e.g., "posts" or "articles"
  };
}

// Default configuration - UPDATE THESE VALUES FOR YOUR PROJECT
export const defaultSiteConfig: SiteConfig = {
  brandName: "RobloxGuard",
  brandTagline: "Stop Roblox Scams Before They Happen",
  resourcesBasePath: "/resources",
  homeUrl: "/",
  contactUrl: "/contact",
  pricingUrl: "/pricing",
  ctaPrimaryText: "Start Free Trial",
  ctaSecondaryText: "View Pricing",
  contentDirectory: "../SEO Strategy/content",
  useStandardNaming: true,
};

/**
 * Get site configuration
 * 
 * You can override this function to load config from environment variables,
 * a config file, or any other source.
 */
export function getSiteConfig(): SiteConfig {
  // Option 1: Use default config
  return defaultSiteConfig;
  
  // Option 2: Load from environment variables
  // return {
  //   brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
  //   resourcesBasePath: process.env.NEXT_PUBLIC_RESOURCES_PATH || "/resources",
  //   // ... etc
  // };
  
  // Option 3: Load from a JSON config file
  // import config from './config.json';
  // return config;
}

