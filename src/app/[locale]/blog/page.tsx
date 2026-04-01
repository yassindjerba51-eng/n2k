import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Calendar, User } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("blogTitle")} | ${t("homeTitle")}`,
    description: t("blogDescription"),
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("blog");

  // Fetch published blog posts directly from Prisma
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)] pb-32">
      {/* Header */}
      <section className="bg-surface-low text-primary py-24 relative overflow-hidden border-b border-border/50">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tight mb-8">
             {t("pageTitle")}
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed font-body max-w-3xl mx-auto">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-20 relative z-20">
        {posts.length === 0 ? (
          <div className="text-center text-on-surface-variant font-body py-20 bg-surface-lowest rounded-3xl ghost-border">
            {t("noArticles")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              // Dynamic locale selection logic
              const title = locale === "ar" ? post.titleAr : locale === "en" ? post.titleEn : post.titleFr;
              const excerpt = locale === "ar" ? post.contentAr.substring(0, 150) : locale === "en" ? post.contentEn.substring(0, 150) : post.contentFr.substring(0, 150);

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-surface-lowest rounded-3xl overflow-hidden shadow-ambient hover:-translate-y-2 transition-transform duration-300 ghost-border flex flex-col group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDKsx2Rlc4yFz407q19RlBlyWgJugENsJ1pwTWzcckhnuckDWRnFkxzLn4NPQ2b8IRCtnmSmSy2IZkKLXPjW9LLqOpPENRw1ldLOazcAwYTYjMwgc-lXdHbUoD2ADfDCV40rdSI68-FbrNyJAtqgn7T5T5r8-0RJNgCvZq2qoBjJJwdIC79eT0ukjaoGFSJ4hBdRZrQbOGlA0Ftht_TqiQzopgVoTF17EYhhftloNtRura3f4GsaMHc5CYlaqGy5U31aKXnJtgLWLA"}
                      alt={title || "Blog post cover"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-bold font-heading text-secondary uppercase tracking-widest mb-4">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString(locale)}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-black font-heading text-primary leading-tight mb-4 group-hover:text-secondary transition-colors">
                      {title}
                    </h2>
                    <p className="text-on-surface-variant font-body mb-8 line-clamp-3">
                      {excerpt}...
                    </p>
                    <div className="mt-auto border-t border-border pt-6 flex items-center justify-between font-heading font-bold text-sm">
                       <span className="text-primary group-hover:text-secondary transition-colors flex items-center gap-2">
                        {t("readMore")}
                       </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
