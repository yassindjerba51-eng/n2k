"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";

type RelatedPost = {
  id: number;
  slug: string;
  titleFr: string;
  titleEn: string;
  titleAr: string;
  coverImage: string | null;
  contentFr: string;
  contentEn: string;
  contentAr: string;
  publishedAt: string;
};

interface RelatedArticlesCarouselProps {
  tag: string;
  locale: string;
}

function getPostField(post: RelatedPost, field: string, locale: string): string {
  if (locale === "ar") return (post as any)[`${field}Ar`] || (post as any)[`${field}Fr`] || "";
  if (locale === "en") return (post as any)[`${field}En`] || (post as any)[`${field}Fr`] || "";
  return (post as any)[`${field}Fr`] || "";
}

const FALLBACK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBrlQjxRe_hKKzmkmtz-eKiJLXSeWDECeSsts5F3UmyCvBDWcfegIaUoWAXhxadSXQDSCBsvIOpAHojmE-ABZ8RUdWWpviZ9MtJn3pSBnRa_zAatC_vBONwYlF13viGXPo8GEY7uqszXh4D0v98KZIL587pNR97UnIJ0ZS0D7c1YjUy-kDO3RBURhNxItcCwxy0DqVpph4UCwRNql8yl_IKUhmggy0uFrrzS3Ukfwv5qvUV80U1an26dNtk4k3vp3fcN95J-2cHJhI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD4Jfd7YKytJawNTtzRrXiRwlueDQpCw2bDdsz--qAmANjLfN0296Hnu6ZKJ9Y8m92VT5OEKVJ0ilUJ__p-AFzHkVIFzWXCqk-HFb-tjYxmi4sF2tGxU1osGyFBVfsglEPwKAnUbaSM5OJRsHVTWaa7ugmSxKRzas9kTOjAUO9fKK_R4ABml6_Z6oTpZT476ARBG-rj0GipgD6Dpol-qJbCgYm7rKi9Q5g6jWKYw7eFrh7f8pxJkIezty2WaC7I9bXoDieKh8D3dE8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBXrBUDLgQRgGCeDjpUpVerHwNQfJ6uBlvot-v2955-Z3G68s8KTIbjtLlMdrwTVTmMiTa1mO3PWvr4rGG-R4sUwjQ-PkzYxxTAR-PnFwAx1Xeud_EWy1U2rupW3gRIO4W7Nfqoua-1xX-blxvdVfNFgVH1H0oW2MYP0oklw-L9Ll-scC1ojJvm5KG-Hfw_A5LVpzVnRHhmvNDTUCcOltzGDojvOLQRGOyxsNL-XSDFwgFoK1hl9Qv8mMH2QQ5ytbR_SGpceeYyJIg",
];

export default function RelatedArticlesCarousel({ tag, locale }: RelatedArticlesCarouselProps) {
  const t = useTranslations("relatedArticles");
  const [posts, setPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/blog/by-tag?tag=${encodeURIComponent(tag)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.posts?.length) {
          setPosts(data.posts);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tag]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("article")?.offsetWidth || 400;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Don't render anything while loading or if no posts match
  if (loading || posts.length === 0) return null;

  return (
    <section className="bg-n2k-surface-low py-16 md:py-20 border-t border-border/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Newspaper className="w-5 h-5 text-n2k-secondary" />
              <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
                Blog
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-n2k-primary tracking-tight">
              {t("sectionTitle")}
            </h2>
          </div>

          {/* Nav arrows — desktop */}
          {posts.length > 3 && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-n2k-on-surface-variant hover:bg-n2k-surface hover:border-n2k-secondary hover:text-n2k-secondary transition-all"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-n2k-on-surface-variant hover:bg-n2k-surface hover:border-n2k-secondary hover:text-n2k-secondary transition-all"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post, idx) => {
            const title = getPostField(post, "title", locale);
            const content = getPostField(post, "content", locale);
            const excerpt = content.replace(/<[^>]*>/g, "").substring(0, 130);
            const image = post.coverImage || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];

            return (
              <article
                key={post.id}
                className="min-w-[300px] w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-start"
              >
                <Link
                  href={`/blog/${post.slug}` as any}
                  className="group block bg-white rounded-2xl border border-border/30 shadow-ambient hover:shadow-ambient-lg transition-all hover:-translate-y-1 overflow-hidden h-full"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold font-heading text-n2k-primary mb-2 line-clamp-2 group-hover:text-n2k-secondary transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-n2k-on-surface-variant font-body line-clamp-2 mb-4">
                      {excerpt}…
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold font-heading text-n2k-secondary">
                      {t("readArticle")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
