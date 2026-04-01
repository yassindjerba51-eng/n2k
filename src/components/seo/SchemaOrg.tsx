'use client';

/**
 * Component to inject JSON-LD structured data into the page.
 */
export default function SchemaOrg({ schema }: { schema: any | any[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
