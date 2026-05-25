"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LayoutGrid, List, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
    paginationShowing: string;
    paginationPrevious: string;
    paginationNext: string;
  } 
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize page from URL parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get("page");
      if (pageParam) {
        const pageNum = parseInt(pageParam, 10);
        if (!isNaN(pageNum) && pageNum > 0) {
          setCurrentPage(pageNum);
        }
      }
    }
  }, []);

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-n2k-on-surface-variant bg-n2k-surface-low rounded-lg border-2 border-dashed border-n2k-outline-variant/20">
        {translations.noArticlesInCategory || "Aucun article dans cette catégorie pour le moment."}
      </div>
    );
  }

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const activePage = currentPage > totalPages ? 1 : currentPage;

  const paginatedPosts = posts.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const startItem = posts.length === 0 ? 0 : (activePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(activePage * itemsPerPage, posts.length);

  const updateQueryParams = (page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (page === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", page.toString());
      }
      window.history.pushState({}, "", url.pathname + url.search);
    }
  };

  const scrollToGrid = () => {
    const anchor = document.getElementById("category-posts-anchor");
    if (anchor) {
      const yOffset = -90; // offset for sticky header
      const y = anchor.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams(page);
    scrollToGrid();
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (activePage > 3) {
        pages.push("...");
      }
      
      const start = Math.max(2, activePage - 1);
      const end = Math.min(totalPages - 1, activePage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
      
      if (activePage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div id="category-posts-anchor" className="space-y-12">
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
          {paginatedPosts.map((p) => {
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
          {paginatedPosts.map((p) => {
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

      {/* Pagination Controls */}
      <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-n2k-outline-variant/30 pt-8">
        <p className="text-sm text-n2k-on-surface-variant font-medium order-2 sm:order-1">
          {translations.paginationShowing
            .replace("[start]", startItem.toString())
            .replace("[end]", endItem.toString())
            .replace("[total]", posts.length.toString())}
        </p>

        {totalPages > 1 && (
          <nav className="flex items-center gap-1 md:gap-2 order-1 sm:order-2" aria-label="Pagination">
            <button
              onClick={() => activePage > 1 && handlePageChange(activePage - 1)}
              disabled={activePage === 1}
              className="flex items-center justify-center p-2 rounded-lg border border-n2k-outline-variant/30 bg-white text-n2k-on-surface-variant transition-all hover:bg-n2k-surface-low hover:text-n2k-primary disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label={translations.paginationPrevious}
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>

            {getPageNumbers().map((page, idx) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-10 h-10 flex items-center justify-center text-n2k-on-surface-variant text-sm font-medium"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = page === activePage;
              return (
                <button
                  key={`page-${page}`}
                  onClick={() => handlePageChange(page as number)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    isCurrent
                      ? "bg-n2k-secondary text-white shadow-sm"
                      : "border border-n2k-outline-variant/30 bg-white text-n2k-on-surface-variant hover:bg-n2k-surface-low hover:text-n2k-primary"
                  }`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => activePage < totalPages && handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              className="flex items-center justify-center p-2 rounded-lg border border-n2k-outline-variant/30 bg-white text-n2k-on-surface-variant transition-all hover:bg-n2k-surface-low hover:text-n2k-primary disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label={translations.paginationNext}
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
