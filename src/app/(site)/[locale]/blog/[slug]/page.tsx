import { getTranslations } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Download, Beaker, ChevronRight, Home } from "lucide-react";
import { prisma } from "@/lib/prisma";
import SchemaOrg from "@/components/seo/SchemaOrg";
import CategoryPostsList from "@/components/blog/CategoryPostsList";

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s+/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

async function findPostBySlug(slug: string) {
  // Try main slug first, then trilingual slugs
  let post = await prisma.blogPost.findUnique({ where: { slug }, include: { categories: true } });
  if (!post) post = await prisma.blogPost.findUnique({ where: { slugFr: slug }, include: { categories: true } });
  if (!post) post = await prisma.blogPost.findUnique({ where: { slugEn: slug }, include: { categories: true } });
  if (!post) post = await prisma.blogPost.findUnique({ where: { slugAr: slug }, include: { categories: true } });
  return post;
}

async function findCategoryBySlug(slug: string) {
  let cat = await prisma.blogCategory.findFirst({
    where: {
      OR: [
        { slugFr: slug },
        { slugEn: slug },
        { slugAr: slug }
      ]
    },
    include: {
      posts: {
        orderBy: { publishedAt: 'desc' },
        include: { categories: true }
      }
    }
  });
  return cat;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = await findPostBySlug(slug);
  const t = await getTranslations({ locale, namespace: "common" });
  
  if (!post) {
    const category = await findCategoryBySlug(slug);
    if (category) {
      const title = locale === "ar" ? category.titleAr : locale === "en" ? category.titleEn : category.titleFr;
      return {
        title: `${title} | ${t("brandName")}`,
      };
    }
    return { title: t("notFound") };
  }

  const title = locale === "ar" ? (post.metaTitleAr || post.titleAr) : locale === "en" ? (post.metaTitleEn || post.titleEn) : (post.metaTitleFr || post.titleFr);
  const description = locale === "ar" ? post.metaDescAr : locale === "en" ? post.metaDescEn : post.metaDescFr;
  
  return {
    title: `${title} | ${t("brandName")}`,
    description: description || undefined,
    openGraph: {
      title: title,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  const post = await findPostBySlug(slug);

  if (post) {
    const localizedSlug = locale === "ar" ? post.slugAr : locale === "en" ? post.slugEn : post.slugFr;
    if (slug !== localizedSlug && localizedSlug) {
      redirect({ href: `/blog/${localizedSlug}`, locale: locale as any });
    }
  }

  if (!post) {
    const category = await findCategoryBySlug(slug);
    if (!category) {
      notFound();
    }

    const localizedSlug = locale === "ar" ? category.slugAr : locale === "en" ? category.slugEn : category.slugFr;
    if (slug !== localizedSlug) {
      redirect({ href: `/blog/${localizedSlug}`, locale: locale as any });
    }

    // Render Category Listing
    const catName = locale === "ar" ? category.nameAr : locale === "en" ? category.nameEn : category.nameFr;
    const catTitle = locale === "ar" ? category.titleAr : locale === "en" ? category.titleEn : category.titleFr;
    const catSubtitle = locale === "ar" ? category.subtitleAr : locale === "en" ? category.subtitleEn : category.subtitleFr;
    const posts = category.posts;

    return (
      <main className="bg-n2k-surface min-h-screen">
        {/* Category Hero */}
        <section className="relative h-[450px] flex items-center overflow-hidden bg-n2k-primary">
          {category.headerImage && (
            <div className="absolute inset-0 z-0 opacity-40">
              <Image
                src={category.headerImage}
                alt={catTitle}
                fill
                className="object-cover grayscale"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-n2k-primary via-n2k-primary/80 to-transparent" />
            </div>
          )}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full">
            <div className="max-w-4xl">
              <span className="inline-block py-1 px-3 bg-n2k-secondary text-white font-heading text-[10px] uppercase tracking-widest font-bold mb-6">
                {catName}
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
                {catTitle}
              </h1>
              {catSubtitle && (
                <p className="text-lg md:text-xl text-white/70 max-w-2xl font-body leading-relaxed">
                  {catSubtitle}
                </p>
              )}

              {/* Breadcrumbs */}
              <nav className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold mt-10">
                <Link href="/" className="hover:text-n2k-secondary transition-colors flex items-center gap-1.5">
                  <Home size={14} />
                  {tNav("home")}
                </Link>
                <ChevronRight size={12} className="opacity-50" />
                <Link href="/blog" className="hover:text-n2k-secondary transition-colors">{tNav("blog")}</Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-n2k-secondary-light">{catName}</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Category Posts listing with switcher */}
        <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-10">
          <CategoryPostsList 
            posts={posts as any} 
            locale={locale} 
            translations={{
              readStudy: t("readStudy"),
              noArticlesInCategory: t("noArticlesInCategory"),
              viewMode: t("viewMode")
            }} 
          />
        </section>
      </main>
    );
  }

  // Fetch related posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: { 
      NOT: { id: post.id }
    },
    take: 2,
    orderBy: { publishedAt: 'desc' }
  });

  const title = locale === "ar" ? post.titleAr : locale === "en" ? post.titleEn : post.titleFr;
  const content = locale === "ar" ? post.contentAr : locale === "en" ? post.contentEn : post.contentFr;
  const readingTime = calculateReadingTime(content || "");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": post.coverImage,
    "datePublished": post.publishedAt?.toISOString(),
    "dateModified": post.createdAt?.toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Les Laboratoires N2K"
    }
  };

  return (
    <main className="bg-n2k-surface min-h-screen">
      <SchemaOrg schema={articleSchema} />

      {/* ====== IMMERSIVE HERO ====== */}
      <section className="relative w-full h-[600px] flex items-end overflow-hidden bg-n2k-primary">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <Image
            src={post.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBrsjrv5zkdj5tGLBU9nqCJZve1PVKEir9StbXH9grZi6zZWsMx9uqrFopawSiwDoCzn2hvDCxYP6PspcSSpSBRQfqQUYYp8uylrrlPy-LHE_rBIKZicNuxu3VbVPbI1TNOXZu60lSNCfF6oBheunFeafq7cDYSbkit3AXdJXwGo6uBrsI1oUY4jI062uqS7kdzRbA5roW7shMURpnVImmd_1HpEOX4b5qMcpBA6Xfv5QfBjMoh21BPATL4XZbBSK6dj9XowDwxC4M"}
            alt={title || "Blog cover"}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-n2k-primary via-n2k-primary/40 to-transparent z-10"></div>
        
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-24 grid grid-cols-12 z-20">
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            {post.categories && post.categories.length > 0 ? (
              <Link
                href={`/blog/${locale === "ar" ? post.categories[0].slugAr : locale === "en" ? post.categories[0].slugEn : post.categories[0].slugFr}`}
                className="inline-block py-1 px-3 bg-n2k-secondary text-white font-heading text-[10px] uppercase tracking-widest font-bold mb-6 hover:bg-n2k-secondary/80 transition-colors"
              >
                {locale === "ar" ? post.categories[0].nameAr : locale === "en" ? post.categories[0].nameEn : post.categories[0].nameFr}
              </Link>
            ) : (
              <span className="inline-block py-1 px-3 bg-n2k-secondary text-white font-heading text-[10px] uppercase tracking-widest font-bold mb-6">
                {t("featuredBadge")}
              </span>
            )}
            <h1 className="font-heading text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
              {title}
            </h1>
            <div className="flex items-center space-x-6 rtl:space-x-reverse text-white/70 font-heading text-xs uppercase tracking-wider font-bold">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) : ""}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t("readingTime", { minutes: readingTime })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ARTICLE CONTENT ====== */}
      <article className="max-w-[1400px] mx-auto px-6 md:px-10 mt-24 grid grid-cols-12 gap-12">
        {/* Main Column */}
        <div className="col-span-12 lg:col-span-8 space-y-16">
          <div 
          className="blog-content max-w-none"
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />

          {/* Mid-page CTA */}
          <section className="bg-n2k-secondary p-10 md:p-12 rounded-xl text-white relative overflow-hidden group shadow-ambient">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500 rtl:left-0 rtl:right-auto">
              <Beaker size={140} />
            </div>
            <div className="relative z-10 max-w-xl">
              <h3 className="font-heading text-3xl font-black mb-4 leading-tight">
                {t("midCtaTitle")}
              </h3>
              <p className="text-white/80 text-lg mb-8">
                {t("midCtaSubtitle")}
              </p>
              <Link
                href="/contact"
                className="inline-block bg-n2k-surface-lowest text-n2k-secondary font-bold px-8 py-4 rounded-lg uppercase tracking-widest text-sm hover:shadow-xl transition-all active:scale-95"
              >
                {t("midCtaButton")}
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-12">
          <div className="lg:sticky lg:top-32">
            <h3 className="font-heading text-xs font-black uppercase tracking-[0.2em] text-n2k-on-surface-variant mb-8">
              {t("sidebarTitle")}
            </h3>
            
            <div className="space-y-8">
              {relatedPosts.map((related: any) => {
                const rTitle = locale === 'ar' ? related.titleAr : locale === 'en' ? related.titleEn : related.titleFr;
                return (
                  <Link 
                    key={related.id} 
                    href={`/blog/${related.slug}`}
                    className="group block cursor-pointer"
                  >
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-n2k-surface-low relative">
                      <Image
                        src={related.coverImage || "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800"}
                        alt={rTitle || "Related post"}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[10px] font-heading uppercase tracking-widest text-n2k-secondary font-bold">
                      {t("featuredBadge")}
                    </span>
                    <h4 className="font-heading font-bold text-lg leading-tight mt-2 group-hover:text-n2k-secondary transition-colors">
                      {rTitle}
                    </h4>
                  </Link>
                );
              })}
            </div>

            {/* Whitepaper CTA */}
            <div className="mt-16 pt-12 border-t border-n2k-outline-variant/30">
              <div className="bg-n2k-surface-high p-8 rounded-lg shadow-sm border border-n2k-outline-variant/20">
                <Download className="text-n2k-primary mb-4" />
                <h5 className="font-heading font-bold text-sm uppercase tracking-tight mb-2 text-n2k-primary">
                  {t("downloadWhitepaper")}
                </h5>
                <p className="text-xs text-n2k-on-surface-variant mb-6">
                  Protocole de décontamination N2K-v4.2. (PDF, 4.2 MB)
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-n2k-secondary uppercase tracking-widest group"
                >
                  {t("downloadProtocol")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </article>

      {/* Final CTA Spacer */}
      <div className="pb-24"></div>
    </main>
  );
}
