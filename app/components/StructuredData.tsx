interface StructuredDataProps {
  schemaType: string;
  data: Record<string, any>;
}

export default function StructuredData({ schemaType, data }: StructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

