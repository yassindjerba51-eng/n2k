"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LayoutGrid, List, ArrowRight } from "lucide-react";

type Post = {
  id: number;
  slug: string;
  coverImage: string | null;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  contentAr: string;
  contentEn: string;
  contentFr: string;
  publishedAt: Date;
};

export default function CategoryPostsList({ 
  posts, 
  locale, 
  translations 
}: { 
  posts: Post[], 
  locale: string, 
  translations: {
    readStudy: string;
    noArticlesInCategory: string;
    viewMode: string;
  } 
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-n2k-on-surface-variant bg-n2k-surface-low rounded-lg border-2 border-dashed border-n2k-outline-variant/20">
        {translations.noArticlesInCategory || "Aucun article dans cette catégorie pour le moment."}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Switcher - Hidden on mobile */}
      <div className="hidden md:flex items-center justify-end gap-6 border-b border-n2k-outline-variant/10 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-n2k-on-surface-variant">
          {translations.viewMode || "Affichage :"}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-n2k-secondary text-white shadow-md" : "text-n2k-on-surface-variant hover:bg-n2k-surface-high"}`}
            title="Grille"
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-n2k-secondary text-white shadow-md" : "text-n2k-on-surface-variant hover:bg-n2k-surface-high"}`}
            title="Liste"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => {
            const title = locale === 'ar' ? p.titleAr : locale === 'en' ? p.titleEn : p.titleFr;
            const content = locale === 'ar' ? p.contentAr : locale === 'en' ? p.contentEn : p.contentFr;
            const excerpt = content.replace(/<[^>]*>/g, "").substring(0, 150);
            
            return (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="bg-white group overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col h-full shadow-sm border border-n2k-outline-variant/10"
              >
                <div className="h-64 overflow-hidden relative">
                  <Image
                    src={p.coverImage || "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800"}
                    alt={title || "Blog post"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <h3 className="font-heading text-xl font-bold text-n2k-primary mb-4 leading-snug group-hover:text-n2k-secondary transition-colors">
                    {title}
                  </h3>
                  <p className="text-n2k-on-surface-variant text-sm leading-relaxed mb-8 line-clamp-3">
                    {excerpt}
                  </p>
                  <span className="mt-auto text-n2k-secondary-light font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                    {translations.readStudy || "Lire l'étude"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-8">
          {posts.map((p) => {
            const title = locale === 'ar' ? p.titleAr : locale === 'en' ? p.titleEn : p.titleFr;
            const content = locale === 'ar' ? p.contentAr : locale === 'en' ? p.contentEn : p.contentFr;
            const excerpt = content.replace(/<[^>]*>/g, "").substring(0, 250);
            
            return (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="bg-white group flex flex-col md:flex-row gap-8 p-6 md:p-8 shadow-sm border border-n2k-outline-variant/10 hover:shadow-md transition-all rounded-lg"
              >
                <div className="w-full md:w-1/3 aspect-video overflow-hidden relative rounded-lg">
                  <Image
                    src={p.coverImage || "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800"}
                    alt={title || "Blog post"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-heading text-2xl font-bold text-n2k-primary mb-4 leading-tight group-hover:text-n2k-secondary transition-colors">
                    {title}
                  </h3>
                  <p className="text-n2k-on-surface-variant text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                    {excerpt}
                  </p>
                  <span className="mt-auto text-n2k-secondary-light font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">
                    {translations.readStudy || "Lire l'étude"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
