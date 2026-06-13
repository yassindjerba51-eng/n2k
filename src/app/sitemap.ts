import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { products } from "@/data/products";

// Base URL — mirrors the value used by the public layout's metadataBase.
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://n2k-laboratoires.tn"
).replace(/\/$/, "");

const LOCALES = ["fr", "en", "ar"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "fr";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

// Regenerate at most once per hour so blog posts published from the admin
// appear without a redeploy. (Querying Prisma alone would otherwise make this
// route statically cached at build time.)
export const revalidate = 3600;

/**
 * Build one sitemap entry per locale for a single logical page.
 *
 * Each entry carries the FULL set of hreflang alternates (every locale + an
 * `x-default` pointing at French), which is what Google requires: every URL in
 * a translation set must reference itself and all its alternates.
 */
function localizedEntries(
  paths: Record<Locale, string>,
  opts: { lastModified?: Date; changeFrequency?: ChangeFreq; priority?: number } = {}
): MetadataRoute.Sitemap {
  const urls = {} as Record<Locale, string>;
  for (const locale of LOCALES) {
    const segment = paths[locale];
    urls[locale] = `${BASE_URL}/${locale}${segment ? `/${segment}` : ""}`;
  }

  const languages: Record<string, string> = {
    ...urls,
    "x-default": urls[DEFAULT_LOCALE],
  };

  return LOCALES.map((locale) => ({
    url: urls[locale],
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }));
}

// Encode a single slug segment (no-op for plain ASCII kebab-case slugs).
const enc = (slug: string) => encodeURIComponent(slug);

// ─────────────────────────────────────────────
// Static public pages — same path across all locales (only the prefix differs).
// /merci (post-submission thank-you) is intentionally excluded.
// ─────────────────────────────────────────────
const STATIC_PAGES: { path: string; priority: number; changeFrequency: ChangeFreq }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" }, // home
  { path: "secteurs", priority: 0.9, changeFrequency: "monthly" },
  { path: "secteurs/elevage", priority: 0.8, changeFrequency: "monthly" },
  { path: "secteurs/abattoirs", priority: 0.8, changeFrequency: "monthly" },
  { path: "secteurs/industrie-agroalimentaire", priority: 0.8, changeFrequency: "monthly" },
  { path: "problemes-solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "problemes-solutions/batiment", priority: 0.8, changeFrequency: "monthly" },
  { path: "problemes-solutions/canalisations-eau", priority: 0.8, changeFrequency: "monthly" },
  { path: "problemes-solutions/ambiance", priority: 0.8, changeFrequency: "monthly" },
  { path: "produits", priority: 0.9, changeFrequency: "monthly" },
  { path: "expertise", priority: 0.7, changeFrequency: "monthly" },
  { path: "references", priority: 0.7, changeFrequency: "monthly" },
  { path: "a-propos", priority: 0.7, changeFrequency: "yearly" },
  { path: "contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "diagnostic", priority: 0.8, changeFrequency: "monthly" },
  { path: "blog", priority: 0.9, changeFrequency: "weekly" },
  { path: "faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "mentions-legales", priority: 0.3, changeFrequency: "yearly" },
  { path: "confidentialite", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Static pages
  for (const page of STATIC_PAGES) {
    entries.push(
      ...localizedEntries(
        { fr: page.path, en: page.path, ar: page.path },
        { changeFrequency: page.changeFrequency, priority: page.priority }
      )
    );
  }

  // 2. Products — the detail page reads the static catalog, so use those slugs.
  //    The slug is identical across locales.
  for (const product of products) {
    const path = `produits/${enc(product.slug)}`;
    entries.push(
      ...localizedEntries(
        { fr: path, en: path, ar: path },
        { changeFrequency: "monthly", priority: 0.8 }
      )
    );
  }

  // 3. Dynamic blog content (best-effort — never let a DB hiccup break the file)
  try {
    const [posts, categories] = await Promise.all([
      prisma.blogPost.findMany({
        where: { publishedAt: { lte: new Date() } },
        select: {
          slug: true,
          slugFr: true,
          slugEn: true,
          slugAr: true,
          publishedAt: true,
          createdAt: true,
        },
        orderBy: { publishedAt: "desc" },
      }),
      prisma.blogCategory.findMany({
        select: { slugFr: true, slugEn: true, slugAr: true, createdAt: true },
      }),
    ]);

    // Blog posts — per-locale slugs (fall back to the canonical slug if empty).
    for (const post of posts) {
      const fr = post.slugFr || post.slug;
      const en = post.slugEn || post.slug;
      const ar = post.slugAr || post.slug;
      const lastModified = post.publishedAt ?? post.createdAt ?? undefined;
      entries.push(
        ...localizedEntries(
          { fr: `blog/${enc(fr)}`, en: `blog/${enc(en)}`, ar: `blog/${enc(ar)}` },
          { lastModified, changeFrequency: "monthly", priority: 0.7 }
        )
      );
    }

    // Blog category landing pages (served under /blog/{categorySlug}).
    for (const cat of categories) {
      if (!cat.slugFr || !cat.slugEn || !cat.slugAr) continue;
      entries.push(
        ...localizedEntries(
          {
            fr: `blog/${enc(cat.slugFr)}`,
            en: `blog/${enc(cat.slugEn)}`,
            ar: `blog/${enc(cat.slugAr)}`,
          },
          { lastModified: cat.createdAt ?? undefined, changeFrequency: "weekly", priority: 0.6 }
        )
      );
    }
  } catch (error) {
    console.error("[sitemap] Failed to load blog content:", error);
  }

  return entries;
}
