import { notFound } from 'next/navigation';
import { getContentBySlug, getChildPages } from '../../components/templates/content';
import { getSiteConfig } from '../../components/templates/site-config';
import PillarTemplate from '../../components/templates/PillarTemplate';
import SubtopicTemplate from '../../components/templates/SubtopicTemplate';
import PAATemplate from '../../components/templates/PAATemplate';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContentBySlug(slug);
  
  if (!content) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: content.frontmatter.metaTitle,
    description: content.frontmatter.metaDescription,
  };
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContentBySlug(slug);
  const siteConfig = getSiteConfig();

  if (!content) {
    notFound();
  }

  const config = getSiteConfig();
  const currentUrl = `${config.resourcesBasePath}/${slug.join('/')}`;
  const childPages = await getChildPages(currentUrl);

  const templateProps = {
    content,
    childPages,
    siteConfig: config,
  };

  switch (content.frontmatter.template) {
    case 'pillar':
      return <PillarTemplate {...templateProps} />;
    case 'subtopic':
      return <SubtopicTemplate {...templateProps} />;
    case 'paa':
      return <PAATemplate {...templateProps} />;
    default:
      notFound();
  }
}

