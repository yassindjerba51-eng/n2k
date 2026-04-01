import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import SchemaOrg from "@/components/seo/SchemaOrg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  const t = await getTranslations({ locale, namespace: "common" });
  
  if (!post) {
    return { title: t("notFound") };
  }

  const title = locale === "ar" ? post.titleAr : locale === "en" ? post.titleEn : post.titleFr;
  
  return {
    title: `${title} | ${t("brandName")}`,
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

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  const title = locale === "ar" ? post.titleAr : locale === "en" ? post.titleEn : post.titleFr;
  const content = locale === "ar" ? post.contentAr : locale === "en" ? post.contentEn : post.contentFr;

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
    <div className="bg-surface min-h-screen pb-32">
      <SchemaOrg schema={articleSchema} />
      {/* Article Header */}
      <section className="bg-primary pt-32 pb-48 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-20 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-secondary-container hover:text-secondary-light font-heading font-bold uppercase tracking-widest text-xs mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t("backToBlog")}
          </Link>
          <div className="flex items-center justify-center gap-6 text-on-primary-container font-heading font-bold text-sm tracking-wider uppercase mb-6">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) : ""}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-tight">
            {title}
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-surface to-transparent z-10"></div>
      </section>

      {/* Featured Image */}
      {post.coverImage && (
        <section className="max-w-5xl mx-auto px-4 md:px-8 -mt-32 relative z-30 mb-20 animate-fade-in-up">
          <div className="rounded-3xl overflow-hidden shadow-ambient-lg border-8 border-surface-lowest ghost-border">
            <Image
              src={post.coverImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDKsx2Rlc4yFz407q19RlBlyWgJugENsJ1pwTWzcckhnuckDWRnFkxzLn4NPQ2b8IRCtnmSmSy2IZkKLXPjW9LLqOpPENRw1ldLOazcAwYTYjMwgc-lXdHbUoD2ADfDCV40rdSI68-FbrNyJAtqgn7T5T5r8-0RJNgCvZq2qoBjJJwdIC79eT0ukjaoGFSJ4hBdRZrQbOGlA0Ftht_TqiQzopgVoTF17EYhhftloNtRura3f4GsaMHc5CYlaqGy5U31aKXnJtgLWLA"}
              alt={title || "Blog cover"}
              width={1200}
              height={600}
              className="w-full h-[400px] md:h-[600px] object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 relative z-20">
        <div className="bg-surface-lowest p-8 md:p-14 rounded-3xl shadow-sm ghost-border prose prose-lg prose-slate max-w-none font-body prose-headings:font-heading prose-headings:font-black prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary-light">
          {/* Extremely simple markdown/newline rendering for MVP */}
          {content?.split('\n').map((paragraph: any, index: any) => (
             <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
