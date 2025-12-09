import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getSiteConfig } from './site-config';

/**
 * Get content directory path
 * Works in both development and production (Vercel) environments
 * Calculated at runtime to handle different build environments
 */
function getContentDirectory(): string {
  const config = getSiteConfig();
  
  if (path.isAbsolute(config.contentDirectory)) {
    return config.contentDirectory;
  }
  
  // Find project root by looking for package.json
  let currentPath = process.cwd();
  let projectRoot = currentPath;
  
  // In Vercel, process.cwd() might be /var or a build directory
  // Search upward for package.json to find the actual project root
  for (let i = 0; i < 10; i++) {
    const packageJsonPath = path.join(currentPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      projectRoot = currentPath;
      break;
    }
    const parentPath = path.resolve(currentPath, '..');
    if (parentPath === currentPath) break; // Reached filesystem root
    currentPath = parentPath;
  }
  
  // Try the found project root
  const testPath = path.join(projectRoot, config.contentDirectory);
  if (fs.existsSync(testPath)) {
    return testPath;
  }
  
  // Fallback: try process.cwd() directly
  const fallbackPath = path.join(process.cwd(), config.contentDirectory);
  if (fs.existsSync(fallbackPath)) {
    return fallbackPath;
  }
  
  // Last resort: return the expected path (will log warning if not found)
  return path.join(projectRoot, config.contentDirectory);
}

export interface ContentFrontmatter {
  title: string;
  slug: string;
  template: 'pillar' | 'subtopic' | 'paa';
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  featuredSnippet?: string;
  parentUrl: string;
  parentTitle: string;
  grandparentUrl?: string;
  grandparentTitle?: string;
  greatGrandparentUrl?: string;
  greatGrandparentTitle?: string;
  childUrls?: string[];
  schema: string;
  faq?: { question: string; answer: string }[];
  wordCount?: number;
  lastUpdated?: string;
}

export interface ContentData {
  frontmatter: ContentFrontmatter;
  content: string;
  slug: string[];
}

/**
 * Get content by URL slug array
 * 
 * Supports two folder naming conventions:
 * 1. Standard: "Pillar - {slug}", "Cluster - {subtopic}", "Blog/"
 * 2. Custom: Defined in site-config.ts customFolderPatterns
 */
export async function getContentBySlug(slugArray: string[]): Promise<ContentData | null> {
  try {
    let filePath: string;
    const siteConfig = getSiteConfig();
    const CONTENT_DIR = getContentDirectory(); // Calculate at runtime
    
    if (slugArray.length === 1) {
      // Pillar page
      if (siteConfig.useStandardNaming) {
        const silo = slugArray[0];
        filePath = path.join(CONTENT_DIR, `Pillar - ${silo}`, `${silo}.md`);
      } else {
        // Custom pattern: replace {slug} with actual slug
        const pattern = siteConfig.customFolderPatterns?.pillar || 'pillars/{slug}';
        const folderPath = pattern.replace('{slug}', slugArray[0]);
        filePath = path.join(CONTENT_DIR, folderPath, `${slugArray[0]}.md`);
      }
    } else if (slugArray.length === 2) {
      // Subtopic/Cluster page
      const [silo, subtopic] = slugArray;
      if (siteConfig.useStandardNaming) {
        filePath = path.join(CONTENT_DIR, `Pillar - ${silo}`, `Cluster - ${subtopic}`, `${subtopic}.md`);
      } else {
        // Custom pattern: replace {parent} and {slug}
        const pattern = siteConfig.customFolderPatterns?.cluster || '{parent}/{slug}';
        const folderPath = pattern.replace('{parent}', silo).replace('{slug}', subtopic);
        filePath = path.join(CONTENT_DIR, folderPath, `${subtopic}.md`);
      }
    } else if (slugArray.length === 3) {
      // PAA/Blog post
      const [silo, subtopic, post] = slugArray;
      if (siteConfig.useStandardNaming) {
        filePath = path.join(CONTENT_DIR, `Pillar - ${silo}`, `Cluster - ${subtopic}`, 'Blog', `${post}.md`);
      } else {
        // Custom pattern: replace {parent}, {subtopic}, and {slug}
        const blogFolder = siteConfig.customFolderPatterns?.blog || 'posts';
        const pattern = siteConfig.customFolderPatterns?.cluster || '{parent}/{subtopic}';
        const folderPath = pattern.replace('{parent}', silo).replace('{subtopic}', subtopic);
        filePath = path.join(CONTENT_DIR, folderPath, blogFolder, `${post}.md`);
      }
    } else {
      return null;
    }

    if (!fs.existsSync(filePath)) {
      console.warn(`Content file not found: ${filePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Get file creation date (birthtime) or modification date as fallback
    const fileStats = fs.statSync(filePath);
    const fileDate = fileStats.birthtime || fileStats.mtime;
    const fileDateString = fileDate.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Override lastUpdated with actual file creation date
    const frontmatter = {
      ...data,
      lastUpdated: fileDateString,
    } as ContentFrontmatter;

    return {
      frontmatter,
      content,
      slug: slugArray,
    };
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
}

/**
 * Get all content slugs for static generation
 * 
 * Scans the content directory and extracts slugs from folder names
 */
export async function getAllContentSlugs(): Promise<string[][]> {
  const slugs: string[][] = [];
  const siteConfig = getSiteConfig();
  const CONTENT_DIR = getContentDirectory(); // Calculate at runtime

  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`Content directory not found: ${CONTENT_DIR}`);
    return slugs;
  }

  if (siteConfig.useStandardNaming) {
    // Standard naming: Pillar - {slug}, Cluster - {subtopic}, Blog/
    const pillarFolders = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('Pillar - '))
      .map(dirent => ({
        folder: dirent.name,
        slug: dirent.name.replace('Pillar - ', '')
      }));

    for (const pillar of pillarFolders) {
      const pillarPath = path.join(CONTENT_DIR, pillar.folder);
      
      // Check for pillar page
      const pillarFile = path.join(pillarPath, `${pillar.slug}.md`);
      if (fs.existsSync(pillarFile)) {
        slugs.push([pillar.slug]);
      }

      // Check for Cluster folders
      const clusterFolders = fs.readdirSync(pillarPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('Cluster - '))
        .map(dirent => ({
          folder: dirent.name,
          slug: dirent.name.replace('Cluster - ', '')
        }));

      for (const cluster of clusterFolders) {
        const clusterPath = path.join(pillarPath, cluster.folder);
        
        // Check for cluster/subtopic page
        const clusterFile = path.join(clusterPath, `${cluster.slug}.md`);
        if (fs.existsSync(clusterFile)) {
          slugs.push([pillar.slug, cluster.slug]);
        }

        // Check for Blog folder and posts inside it
        const blogFolder = path.join(clusterPath, 'Blog');
        if (fs.existsSync(blogFolder) && fs.statSync(blogFolder).isDirectory()) {
          const blogFiles = fs.readdirSync(blogFolder, { withFileTypes: true })
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
            .map(dirent => dirent.name.replace('.md', ''));

          for (const post of blogFiles) {
            slugs.push([pillar.slug, cluster.slug, post]);
          }
        }
      }
    }
  } else {
    // Custom folder structure - implement based on customFolderPatterns
    // This is a simplified version - you may need to customize based on your structure
    console.warn('Custom folder patterns not fully implemented. Using standard naming is recommended.');
    // You can extend this section to support your custom folder structure
  }

  return slugs;
}

/**
 * Get child pages for a given URL
 */
export async function getChildPages(parentUrl: string): Promise<{ title: string; url: string; description?: string }[]> {
  const children: { title: string; url: string; description?: string }[] = [];
  const allSlugs = await getAllContentSlugs();
  const siteConfig = getSiteConfig();

  for (const slug of allSlugs) {
    const content = await getContentBySlug(slug);
    if (content && content.frontmatter.parentUrl === parentUrl) {
      children.push({
        title: content.frontmatter.title,
        url: `${siteConfig.resourcesBasePath}/${slug.join('/')}`,
        description: content.frontmatter.featuredSnippet || content.frontmatter.metaDescription,
      });
    }
  }

  return children;
}

