import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getLocalizedProducts } from "@/data/products";

type Locale = "fr" | "en" | "ar";

// ─────────────────────────────────────────────
// Multilingual static page catalog
// Each entry maps a public route to a localized title + keywords
// so search works in fr / en / ar. `url` is locale-agnostic — the
// SearchModal renders it through the i18n <Link>, which prefixes the
// active locale automatically.
// ─────────────────────────────────────────────
const STATIC_PAGES: {
  url: string;
  fr: { title: string; keywords: string[] };
  en: { title: string; keywords: string[] };
  ar: { title: string; keywords: string[] };
}[] = [
  {
    url: "/secteurs",
    fr: { title: "Secteurs d'activité", keywords: ["secteur", "activité", "élevage", "abattoir", "agroalimentaire", "domaine"] },
    en: { title: "Activity Sectors", keywords: ["sector", "activity", "farming", "slaughterhouse", "food", "industry"] },
    ar: { title: "قطاعات النشاط", keywords: ["قطاع", "نشاط", "تربية", "مجزرة", "صناعة", "غذائية", "مزرعة", "دواجن"] },
  },
  {
    url: "/secteurs/elevage",
    fr: { title: "Secteur — Élevage", keywords: ["élevage", "volaille", "poulet", "ferme", "avicole", "animaux", "biosécurité"] },
    en: { title: "Sector — Farming", keywords: ["farming", "poultry", "chicken", "farm", "livestock", "biosecurity", "animals"] },
    ar: { title: "قطاع — التربية", keywords: ["تربية", "دواجن", "دجاج", "مزرعة", "ماشية", "حيوانات", "أمن حيوي"] },
  },
  {
    url: "/secteurs/abattoirs",
    fr: { title: "Secteur — Abattoirs", keywords: ["abattoir", "viande", "découpe", "hygiène", "carcasse"] },
    en: { title: "Sector — Slaughterhouses", keywords: ["slaughterhouse", "meat", "cutting", "hygiene", "carcass"] },
    ar: { title: "قطاع — المجازر", keywords: ["مجزرة", "مذبح", "مسلخ", "لحوم", "نظافة", "ذبيحة"] },
  },
  {
    url: "/secteurs/industrie-agroalimentaire",
    fr: { title: "Secteur — Industrie agroalimentaire", keywords: ["agroalimentaire", "industrie", "aliment", "food", "transformation"] },
    en: { title: "Sector — Food Industry", keywords: ["food", "industry", "processing", "agrifood", "agroalimentaire"] },
    ar: { title: "قطاع — الصناعة الغذائية", keywords: ["صناعة", "غذائية", "أغذية", "تحويل", "طعام"] },
  },
  {
    url: "/problemes-solutions",
    fr: { title: "Problèmes & Solutions", keywords: ["problème", "solution", "biofilm", "tartre", "hygiène"] },
    en: { title: "Problems & Solutions", keywords: ["problem", "solution", "biofilm", "scale", "hygiene"] },
    ar: { title: "المشاكل والحلول", keywords: ["مشكلة", "مشاكل", "حلول", "بيوفيلم", "ترسبات", "نظافة"] },
  },
  {
    url: "/problemes-solutions/batiment",
    fr: { title: "Problèmes & Solutions — Bâtiment", keywords: ["bâtiment", "élevage", "biofilm", "surface", "nettoyage", "sol"] },
    en: { title: "Problems & Solutions — Building", keywords: ["building", "farming", "biofilm", "surface", "cleaning", "floor"] },
    ar: { title: "المشاكل والحلول — المبنى", keywords: ["مبنى", "تربية", "بيوفيلم", "أسطح", "تنظيف", "أرضية"] },
  },
  {
    url: "/problemes-solutions/canalisations-eau",
    fr: { title: "Problèmes & Solutions — Canalisations d'eau", keywords: ["eau", "canalisation", "tartre", "biofilm", "pipette", "abreuvement"] },
    en: { title: "Problems & Solutions — Water Pipelines", keywords: ["water", "pipe", "scale", "biofilm", "drinking", "line"] },
    ar: { title: "المشاكل والحلول — أنابيب المياه", keywords: ["مياه", "ماء", "أنابيب", "ترسبات", "بيوفيلم", "شرب", "حلمات"] },
  },
  {
    url: "/problemes-solutions/ambiance",
    fr: { title: "Problèmes & Solutions — Ambiance", keywords: ["ambiance", "air", "respiratoire", "odeur", "ammoniac"] },
    en: { title: "Problems & Solutions — Atmosphere", keywords: ["atmosphere", "air", "respiratory", "odor", "ammonia"] },
    ar: { title: "المشاكل والحلول — الأجواء", keywords: ["أجواء", "هواء", "تنفسي", "رائحة", "أمونيا"] },
  },
  {
    url: "/produits",
    fr: { title: "Produits", keywords: ["produit", "désinfectant", "détergent", "solution", "protocole"] },
    en: { title: "Products", keywords: ["product", "disinfectant", "detergent", "solution", "protocol"] },
    ar: { title: "المنتجات", keywords: ["منتج", "منتجات", "مطهر", "منظف", "حلول", "بروتوكول"] },
  },
  {
    url: "/expertise",
    fr: { title: "Expertise", keywords: ["expertise", "savoir-faire", "protocole", "laboratoire"] },
    en: { title: "Expertise", keywords: ["expertise", "know-how", "protocol", "laboratory"] },
    ar: { title: "خبرتنا", keywords: ["خبرة", "معرفة", "بروتوكول", "مختبر"] },
  },
  {
    url: "/references",
    fr: { title: "Nos Références", keywords: ["référence", "client", "partenaire", "projet"] },
    en: { title: "Our References", keywords: ["reference", "client", "partner", "project"] },
    ar: { title: "مراجعنا", keywords: ["مراجع", "عملاء", "شركاء", "مشروع"] },
  },
  {
    url: "/a-propos",
    fr: { title: "À propos", keywords: ["propos", "about", "laboratoires", "n2k", "histoire", "équipe"] },
    en: { title: "About", keywords: ["about", "laboratories", "n2k", "history", "team"] },
    ar: { title: "من نحن", keywords: ["من نحن", "مختبرات", "تاريخ", "فريق", "نبذة"] },
  },
  {
    url: "/contact",
    fr: { title: "Contact", keywords: ["contact", "message", "email", "téléphone", "adresse"] },
    en: { title: "Contact", keywords: ["contact", "message", "email", "phone", "address"] },
    ar: { title: "اتصل بنا", keywords: ["اتصال", "اتصل", "رسالة", "بريد", "هاتف", "عنوان"] },
  },
  {
    url: "/diagnostic",
    fr: { title: "Diagnostic Sanitaire", keywords: ["diagnostic", "demande", "formulaire", "sanitaire"] },
    en: { title: "Sanitary Diagnostic", keywords: ["diagnostic", "request", "form", "sanitary"] },
    ar: { title: "تشخيص صحي", keywords: ["تشخيص", "طلب", "استمارة", "صحي"] },
  },
  {
    url: "/blog",
    fr: { title: "Blog", keywords: ["blog", "article", "actualité", "conseil"] },
    en: { title: "Blog", keywords: ["blog", "article", "news", "advice"] },
    ar: { title: "المدونة", keywords: ["مدونة", "مقال", "أخبار", "نصائح"] },
  },
  {
    url: "/faq",
    fr: { title: "FAQ", keywords: ["faq", "question", "réponse", "aide"] },
    en: { title: "FAQ", keywords: ["faq", "question", "answer", "help"] },
    ar: { title: "الأسئلة الشائعة", keywords: ["أسئلة", "سؤال", "جواب", "مساعدة"] },
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const localeParam = searchParams.get("locale");
  const locale: Locale =
    localeParam === "en" || localeParam === "ar" ? localeParam : "fr";

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [], posts: [], pages: [] });
  }

  const query = q.toLowerCase();

  // Pick a localized field with French fallback when a translation is empty.
  const pick = (obj: any, field: string): string => {
    if (locale === "ar") return obj[`${field}Ar`] || obj[`${field}Fr`] || obj[field] || "";
    if (locale === "en") return obj[`${field}En`] || obj[`${field}Fr`] || obj[field] || "";
    return obj[`${field}Fr`] || obj[field] || "";
  };

  try {
    // 1. Products — search the static catalog (this is what the product
    //    detail pages actually render) using localized name + subtitle.
    const localizedProducts = getLocalizedProducts(locale);
    const products = localizedProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.subtitle || "").toLowerCase().includes(query)
      )
      .slice(0, 5)
      .map((p) => ({
        title: p.name,
        url: `/produits/${p.slug}`,
      }));

    // 2. Blog Posts — match across all locale columns, but display the
    //    title + slug for the ACTIVE locale (fallback to French).
    const dbPosts = await prisma.blogPost.findMany({
      where: {
        OR: [
          { titleFr: { contains: query } },
          { titleEn: { contains: query } },
          { titleAr: { contains: query } },
          { contentFr: { contains: query } },
          { contentEn: { contains: query } },
          { contentAr: { contains: query } },
        ],
        publishedAt: { lte: new Date() },
      },
      take: 5,
    });

    const posts = dbPosts.map((p) => {
      const slug = pick(p, "slug") || p.slug;
      return {
        title: pick(p, "title"),
        url: `/blog/${slug}`,
      };
    });

    // 3. Static pages — localized title + keywords.
    const pages = STATIC_PAGES.filter((p) => {
      const loc = p[locale];
      return (
        loc.title.toLowerCase().includes(query) ||
        loc.keywords.some((k) => k.toLowerCase().includes(query))
      );
    }).map((p) => ({
      title: p[locale].title,
      url: p.url,
    }));

    return NextResponse.json({ products, posts, pages });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
