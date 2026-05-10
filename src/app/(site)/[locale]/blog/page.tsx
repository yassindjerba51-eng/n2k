import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ArrowRight, ExternalLink, Home, ChevronRight } from "lucide-react";
import FeaturedCarousel from "@/components/blog/FeaturedCarousel";
import BlogGrid from "@/components/blog/BlogGrid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("blogTitle")} | ${t("homeTitle")}`,
    description: t("blogDescription"),
  };
}

// Default hero image for the blog
const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAlGvM2exrRK_S42xzb6FkCgawFnP4bcFEclN-5jYvSvqSiPm2ZVgd6fH9U62GUYcaBYu_qeuRo-AvOimOhRygZ0fcqiZgmCC0W0viuKlBiHjkr32pFYwUfYEq8HLCg52IbGNYYxOXRaGDOWoXf3SIKhR899PfYk4v50zYR1nhKOrBsADlyQLydCktslVpfQCN4Opxce6JENLXH2mXi6Bhs2_Hx8QzjbbBlKOKCXgG6O_zfsB2TjpgOlKAivolzye4AHMhl--rgznc";

// Fallback placeholder images for cards
const CARD_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBrlQjxRe_hKKzmkmtz-eKiJLXSeWDECeSsts5F3UmyCvBDWcfegIaUoWAXhxadSXQDSCBsvIOpAHojmE-ABZ8RUdWWpviZ9MtJn3pSBnRa_zAatC_vBONwYlF13viGXPo8GEY7uqszXh4D0v98KZIL587pNR97UnIJ0ZS0D7c1YjUy-kDO3RBURhNxItcCwxy0DqVpph4UCwRNql8yl_IKUhmggy0uFrrzS3Ukfwv5qvUV80U1an26dNtk4k3vp3fcN95J-2cHJhI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD4Jfd7YKytJawNTtzRrXiRwlueDQpCw2bDdsz--qAmANjLfN0296Hnu6ZKJ9Y8m92VT5OEKVJ0ilUJ__p-AFzHkVIFzWXCqk-HFb-tjYxmi4sF2tGxU1osGyFBVfsglEPwKAnUbaSM5OJRsHVTWaa7ugmSxKRzas9kTOjAUO9fKK_R4ABml6_Z6oTpZT476ARBG-rj0GipgD6Dpol-qJbCgYm7rKi9Q5g6jWKYw7eFrh7f8pxJkIezty2WaC7I9bXoDieKh8D3dE8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBXrBUDLgQRgGCeDjpUpVerHwNQfJ6uBlvot-v2955-Z3G68s8KTIbjtLlMdrwTVTmMiTa1mO3PWvr4rGG-R4sUwjQ-PkzYxxTAR-PnFwAx1Xeud_EWy1U2rupW3gRIO4W7Nfqoua-1xX-blxvdVfNFgVH1H0oW2MYP0oklw-L9Ll-scC1ojJvm5KG-Hfw_A5LVpzVnRHhmvNDTUCcOltzGDojvOLQRGOyxsNL-XSDFwgFoK1hl9Qv8mMH2QQ5ytbR_SGpceeYyJIg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDheGg4j-h1i9huGJBna3oqUo8LBHhCVsahVHoKTrcgMhsKJmSsrtxGSnrBuPIbmUOFtbYACITFNqoCvh-2Rtu5FGF569PDIsiSu-stlf3BJIGea6qaJCSZkT8TFzR0lCS-DtPoCR-acNmq2YNnIRmASPizxf3V02N5cUhO4_tw0vQEV4JoTCkGAWxCd8mzihz1y3hvSypFnVlGlraejUS2CFPjJSCNqlwFMnUkdF75Ci3hpFIIODaL8j_jN-u358iexL02ApI1Atw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAKk2R7m6GbX-_ttwc-ZP_jJKSH_y_-7cQB-frosMilsF7nr8xOzOatn1ndIMguJA4G8bLDikXPm90y05il48Cpr-e2lzGhUZCj1YT7KWHO68Hi-FIh-YJyuv7oyBEoQE-HFSC1eAfkkDBQrSm42HYT7O120k01RRemwZw1EjaTZyYGCUXADjFsFBBC-DRxPoAhDpOl4jzRY-Sy9XcKsrgGXX-aIjKLTknfMOymAIEhx2cfCDiQaz5mcKoWX-Y6hfC--thRYgWkRns",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBmVBel6i7JsuoBJDyavj6BjW5hQU2rU5aQ8dhGhIgBvICgfrfwyYg7240bEvChQun5CKc_w1-O6QRGChBjJo1GfIwI5E82DiASv_6-49Wk7GsAsobCYZX8z0CfnjIHRrQaNV5vBuGfio8JlLBvMTgXRpr3hJ6B9SzbjA4_XQwajtpZORl8CpeK1k5OQBwxBm_YOE6zSVEnoevnKlmpnsUCXo1jeg7iW9KCJX-H8JM7ZqiCeQecCj4iTau_G888Y9y41a8BKSv8QQ0",
];

const CTA_BG_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCR1ioPHxQDDJDnCxaIK7JBldTGy85Pv6zmOWXaJzsOVNJ6TcZ7Tl8nq9VvnOrOWitafpWrh_WzIDGFi6KDsWO0HsV1nVzJIWyfA6xbYxAl1JXAUc9BnSQDe1-xqqTYo94vpSW6B_7fm-QEp7xyR1vnAnEZVus2MprSLw7MwjpSbqagzSWpzSJn-yDq52pFyCtT6NDM7q_EnDtLvzJy-41Gh51lbCrybEu8l78kNRplxzaY_FwpQ2kQ9Tw1CVVosGeoFZUO-RVahA4";

function getPostField(post: any, field: string, locale: string): string {
  if (locale === "ar") return post[`${field}Ar`] || post[`${field}Fr`] || "";
  if (locale === "en") return post[`${field}En`] || post[`${field}Fr`] || "";
  return post[`${field}Fr`] || "";
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  // Fetch published blog posts directly from Prisma
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    include: { categories: true },
  });

  // Fetch categories for the filter bar
  const categories = await prisma.blogCategory.findMany({
    orderBy: { nameFr: "asc" },
  });

  // Featured posts first, then rest
  const featuredPosts = posts.filter((p: any) => p.featured);
  const remainingPosts = posts.filter((p: any) => !featuredPosts.includes(p));

  return (
    <div className="bg-n2k-surface min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="relative h-[570px] md:h-[570px] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt={t("heroTitle")}
            fill
            className="object-cover grayscale opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-n2k-primary via-n2k-primary/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 w-full">
          <div className="max-w-7xl">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-5xl font-extrabold text-white leading-tight tracking-tighter mb-8">
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-white leading-relaxed mb-10 max-w-7xl text-justify">
              {t("heroSubtitle")}
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-3 bg-gradient-to-br from-n2k-primary to-n2k-primary-container text-white px-8 py-4 rounded-md font-heading font-bold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("heroCta")}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold mt-10">
              <Link href="/" className="hover:text-n2k-secondary transition-colors flex items-center gap-1.5">
                <Home size={14} />
                {tNav("home")}
              </Link>
              <ChevronRight size={12} className="opacity-50" />
              <span className="text-n2k-secondary-light">{tNav("blog")}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* ===== Les plus populaires — Carousel ===== */}
      {featuredPosts.length > 0 && (
        <FeaturedCarousel
          locale={locale}
          posts={featuredPosts.map((post: any, index: number) => {
            const title = getPostField(post, "title", locale);
            const content = getPostField(post, "content", locale);
            const excerpt = content.replace(/<[^>]*>/g, "").substring(0, 150);
            const cat = post.categories?.[0];
            const catName = cat
              ? (locale === "ar" ? cat.nameAr : locale === "en" ? cat.nameEn : cat.nameFr)
              : "";
            const catSlug = cat
              ? (locale === "ar" ? cat.slugAr : locale === "en" ? cat.slugEn : cat.slugFr)
              : "";
            return {
              id: post.id,
              slug: post.slug,
              title,
              excerpt,
              coverImage: post.coverImage || CARD_IMAGES[index % CARD_IMAGES.length],
              categoryName: catName,
              categorySlug: catSlug,
              publishedAt: post.publishedAt?.toISOString() || "",
            };
          })}
          translations={{
            readStudy: t("readStudy"),
            popularTitle: t("popularTitle"),
            popularBadge: t("popularBadge"),
          }}
        />
      )}

      {/* ===== Bibliothèque Technique — Tabbed Grid ===== */}
      <BlogGrid
        locale={locale}
        posts={remainingPosts.map((post: any, index: number) => {
          const title = getPostField(post, "title", locale);
          const content = getPostField(post, "content", locale);
          const excerpt = content.replace(/<[^>]*>/g, "").substring(0, 150);
          const cats = post.categories || [];
          const catName = cats
            .map((c: any) => locale === "ar" ? c.nameAr : locale === "en" ? c.nameEn : c.nameFr)
            .filter(Boolean)
            .join(" · ");
          return {
            id: post.id,
            slug: post.slug,
            title,
            excerpt,
            coverImage: post.coverImage || CARD_IMAGES[(index + 3) % CARD_IMAGES.length],
            categoryName: catName,
            categoryIds: cats.map((c: any) => c.id),
            publishedAt: post.publishedAt?.toISOString() || "",
          };
        })}
        categories={categories.map((cat: any) => ({
          id: cat.id,
          name: locale === "ar" ? cat.nameAr : locale === "en" ? cat.nameEn : cat.nameFr,
        }))}
        translations={{
          filterAll: t("filterAll"),
          libraryTitle: t("libraryTitle"),
          librarySubtitle: t("librarySubtitle"),
          readArticle: t("readArticle"),
          noArticles: t("noArticlesInCategory"),
        }}
      />

      {/* ===== Empty State ===== */}
      {posts.length === 0 && (
        <section className="py-20 bg-n2k-surface">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="text-center text-n2k-on-surface-variant py-20 bg-n2k-surface-lowest rounded-md ghost-border">
              {t("noArticles")}
            </div>
          </div>
        </section>
      )}

      {/* ===== Mid-page CTA ===== */}
      <section className="py-16 md:py-20 bg-n2k-primary-container text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={CTA_BG_IMAGE}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10 text-center">
          <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            {t("ctaTitle")}
          </h3>
          <p className="text-n2k-on-primary-container text-base md:text-lg mb-10 max-w-2xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <Link
            href="/diagnostic"
            className="inline-block bg-n2k-secondary text-white px-10 py-4 rounded-md font-heading font-bold uppercase tracking-widest hover:brightness-110 transition-all text-sm"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>

      {/* ===== Proof Section ===== */}
      <section className="py-16 md:py-24 bg-n2k-surface-low">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Text block */}
            <div className="lg:col-span-8">
              <div className="bg-n2k-surface-lowest p-8 md:p-12 shadow-ambient">
                <h4 className="font-heading text-xl md:text-2xl font-bold text-n2k-primary mb-6">
                  {locale === "ar"
                    ? "في قلب الابتكار في برج السدرية"
                    : locale === "en"
                    ? "At the Heart of Innovation at Borj Cédria"
                    : "Au Cœur de l'Innovation à Borj Cédria"}
                </h4>
                <p className="text-n2k-on-surface-variant leading-relaxed mb-8">
                  {locale === "ar"
                    ? "مختبرات N2K تستفيد من منظومة بحثية متقدمة في القطب التكنولوجي ببرج السدرية. التزامنا بالسلامة الصناعية يتجسد في استثمارات مستمرة في البحث والتطوير."
                    : locale === "en"
                    ? "Based at the Borj Cédria Technopark, Les Laboratoires N2K benefit from a cutting-edge research ecosystem. Our commitment to industrial safety translates into constant R&D investments."
                    : "Basés au Technopole de Borj Cédria, les Laboratoires N2K bénéficient d'un écosystème de recherche de pointe. Notre engagement pour la sécurité industrielle se traduit par des investissements constants en R&D."}
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-heading font-black text-n2k-secondary-light">ISO</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-n2k-on-surface-variant">
                      {locale === "ar" ? "شهادات" : "Certifications"}
                    </p>
                  </div>
                  <div className="w-px h-10 bg-n2k-outline-variant" />
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-heading font-black text-n2k-secondary-light">15+</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-n2k-on-surface-variant">
                      {locale === "ar" ? "سنوات الخبرة" : locale === "en" ? "Years of Expertise" : "Années d'Expertise"}
                    </p>
                  </div>
                  <div className="w-px h-10 bg-n2k-outline-variant" />
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-heading font-black text-n2k-secondary-light">24/7</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-n2k-on-surface-variant">
                      {locale === "ar" ? "دعم طارئ" : locale === "en" ? "Critical Support" : "Support Critique"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-4">
              <div className="aspect-square relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr08_L32x2H31Gm0GFPphkgdYeVTMg27dlJIUnLQA0pL5dOFXWAZ_kOHS7NCByRX9X14zgFrM_bubxBgozH4h7v1XGRLYGMs5E2S4r2s6Ha6nhc34ClArcnQjfuYI7T1ojqtyDWAqh-efsT0eroeSNHqOKVhx5iHePWoON3lm_7h6EBJL2iXlyW5DaBmEyU_Oe7nSplaVNxkxAxy8OaMQnObipkoJf6_2FHkfGiAoqu-Orjl6N27FP_Qc13B-cj2CkIuE_JHOQwtU"
                  alt="Technopark Borj Cédria"
                  fill
                  className="object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-n2k-secondary w-16 h-16 hidden lg:flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="py-20 md:py-32 bg-n2k-surface text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-n2k-primary mb-8 tracking-tighter">
            {t("finalCtaTitle")}
          </h2>
          <p className="text-lg md:text-xl text-n2k-on-surface-variant mb-12">
            {t("finalCtaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="bg-n2k-primary text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-heading font-bold text-sm tracking-widest uppercase hover:bg-n2k-secondary transition-colors"
            >
              {t("finalCta1")}
            </Link>
            <Link
              href="/produits"
              className="border-2 border-n2k-primary text-n2k-primary px-10 md:px-12 py-4 md:py-5 rounded-full font-heading font-bold text-sm tracking-widest uppercase hover:bg-n2k-surface-low transition-colors"
            >
              {t("finalCta2")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
