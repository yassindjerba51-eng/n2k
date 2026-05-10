/**
 * Server component to inject JSON-LD structured data into the page.
 * Removed 'use client' to avoid hydration mismatches with <script> tags.
 */
export default function SchemaOrg({ schema }: { schema: any | any[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
