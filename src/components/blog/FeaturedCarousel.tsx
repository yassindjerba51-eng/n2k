"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface FeaturedPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  categoryName: string;
  categorySlug: string;
  publishedAt: string;
}

interface FeaturedCarouselProps {
  posts: FeaturedPost[];
  locale: string;
  translations: {
    readStudy: string;
    popularTitle: string;
    popularBadge: string;
  };
}

export default function FeaturedCarousel({ posts, locale, translations }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // How many cards visible per breakpoint
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, posts.length - visibleCount);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (isHovered || posts.length <= visibleCount) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isHovered, goNext, posts.length, visibleCount]);

  if (posts.length === 0) return null;

  return (
    <section className="bg-n2k-primary py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <span className="inline-block px-3 py-1 bg-n2k-secondary text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 font-heading">
              {translations.popularBadge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {translations.popularTitle}
            </h2>
          </div>

          {/* Navigation Arrows — desktop */}
          {posts.length > visibleCount && (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Track */}
        <div
          className="overflow-hidden -mx-2 md:-mx-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="group shrink-0 px-2 md:px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="bg-n2k-surface-lowest rounded-xl overflow-hidden shadow-ambient-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                  {/* Image */}
                  <div className="h-52 md:h-56 overflow-hidden relative">
                    <Image
                      src={post.coverImage || "/images/placeholder-blog.jpg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {post.categoryName && (
                      <span className="absolute top-4 left-4 bg-n2k-secondary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider font-heading rounded">
                        {post.categoryName}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex-grow flex flex-col">
                    <h3 className="font-heading text-lg font-bold text-n2k-primary mb-3 leading-snug group-hover:text-n2k-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-n2k-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto text-n2k-secondary-light font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                      {translations.readStudy}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        {posts.length > visibleCount && (
          <div className="flex items-center justify-center gap-2 mt-8 md:mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-8 bg-n2k-secondary-light"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile arrows */}
        {posts.length > visibleCount && (
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
