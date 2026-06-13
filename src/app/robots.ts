import type { MetadataRoute } from "next";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://n2k-laboratoires.tn"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep crawlers out of the admin panel, API routes, and the
      // post-submission thank-you page (no SEO value, locale-prefixed).
      disallow: ["/webadmin", "/api/", "/*/merci"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
