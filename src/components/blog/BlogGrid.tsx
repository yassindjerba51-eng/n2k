"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  categoryName: string;
  categoryIds: number[];
  publishedAt: string;
}

interface Category {
  id: number;
  name: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  categories: Category[];
  locale: string;
  translations: {
    filterAll: string;
    libraryTitle: string;
    librarySubtitle: string;
    readArticle: string;
    noArticles: string;
  };
}

export default function BlogGrid({ posts, categories, locale, translations }: BlogGridProps) {
  const [activeTab, setActiveTab] = useState<number | null>(null); // null = all

  const filteredPosts = activeTab === null
    ? posts
    : posts.filter((p) => p.categoryIds.includes(activeTab));

  return (
    <section className="py-16 md:py-24 bg-n2k-surface">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-n2k-primary mb-3">
            {translations.libraryTitle}
          </h3>
          <p className="text-n2k-on-surface-variant mb-8 max-w-2xl">
            {translations.librarySubtitle}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 md:gap-2 border-b border-n2k-outline-variant/30">
            <button
              onClick={() => setActiveTab(null)}
              className={`px-5 md:px-6 py-3 text-sm font-bold transition-all relative ${
                activeTab === null
                  ? "text-n2k-primary border-b-2 border-n2k-secondary-light bg-n2k-surface-low"
                  : "text-n2k-on-surface-variant hover:text-n2k-primary hover:bg-n2k-surface-low/50"
              }`}
            >
              {translations.filterAll}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 md:px-6 py-3 text-sm font-bold transition-all relative ${
                  activeTab === cat.id
                    ? "text-n2k-primary border-b-2 border-n2k-secondary-light bg-n2k-surface-low"
                    : "text-n2k-on-surface-variant hover:text-n2k-primary hover:bg-n2k-surface-low/50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <a
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="group"
              >
                <div className="bg-n2k-surface-lowest rounded-xl overflow-hidden shadow-ambient hover:shadow-ambient-lg transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
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
                    {post.publishedAt && (
                      <span className="text-[10px] font-bold text-n2k-on-surface-variant tracking-widest uppercase mb-2">
                        {new Date(post.publishedAt).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    )}
                    <h3 className="font-heading text-lg font-bold text-n2k-primary mb-3 leading-snug group-hover:text-n2k-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-n2k-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto text-n2k-secondary-light font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                      {translations.readArticle}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center text-n2k-on-surface-variant py-20 bg-n2k-surface-lowest rounded-md ghost-border">
            {translations.noArticles}
          </div>
        )}
      </div>
    </section>
  );
}
