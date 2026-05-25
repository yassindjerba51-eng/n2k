"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
    paginationShowing: string;
    paginationPrevious: string;
    paginationNext: string;
  };
}

export default function BlogGrid({ posts, categories, locale, translations }: BlogGridProps) {
  const [activeTab, setActiveTab] = useState<number | null>(null); // null = all
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize state from URL on mount
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
      
      const catParam = params.get("category");
      if (catParam) {
        if (catParam === "all") {
          setActiveTab(null);
        } else {
          const catId = parseInt(catParam, 10);
          if (!isNaN(catId)) {
            setActiveTab(catId);
          }
        }
      }
    }
  }, []);

  const filteredPosts = activeTab === null
    ? posts
    : posts.filter((p) => p.categoryIds.includes(activeTab));

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  
  // Guard current page range
  const activePage = currentPage > totalPages ? 1 : currentPage;
  
  const paginatedPosts = filteredPosts.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const startItem = filteredPosts.length === 0 ? 0 : (activePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(activePage * itemsPerPage, filteredPosts.length);

  const updateQueryParams = (page: number, tabId: number | null) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tabId === null) {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", tabId.toString());
      }
      if (page === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", page.toString());
      }
      window.history.pushState({}, "", url.pathname + url.search);
    }
  };

  const scrollToGrid = () => {
    const gridElement = document.getElementById("blog-grid-anchor");
    if (gridElement) {
      const yOffset = -90; // offset for sticky header
      const y = gridElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleTabChange = (tabId: number | null) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    updateQueryParams(1, tabId);
    scrollToGrid();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams(page, activeTab);
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
    <section id="blog-grid-anchor" className="py-16 md:py-24 bg-n2k-surface">
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
              onClick={() => handleTabChange(null)}
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
                onClick={() => handleTabChange(cat.id)}
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
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {paginatedPosts.map((post) => (
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

            {/* Pagination Controls */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-n2k-outline-variant/30 pt-8">
              <p className="text-sm text-n2k-on-surface-variant font-medium order-2 sm:order-1">
                {translations.paginationShowing
                  .replace("[start]", startItem.toString())
                  .replace("[end]", endItem.toString())
                  .replace("[total]", filteredPosts.length.toString())}
              </p>

              {totalPages > 1 && (
                <nav className="flex items-center gap-1 md:gap-2 order-1 sm:order-2" aria-label="Pagination">
                  <button
                    onClick={() => activePage > 1 && handlePageChange(activePage - 1)}
                    disabled={activePage === 1}
                    className="flex items-center justify-center p-2 rounded-lg border border-n2k-outline-variant/30 bg-n2k-surface-lowest text-n2k-on-surface-variant transition-all hover:bg-n2k-surface-low hover:text-n2k-primary disabled:opacity-40 disabled:cursor-not-allowed"
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
                            : "border border-n2k-outline-variant/30 bg-n2k-surface-lowest text-n2k-on-surface-variant hover:bg-n2k-surface-low hover:text-n2k-primary"
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
                    className="flex items-center justify-center p-2 rounded-lg border border-n2k-outline-variant/30 bg-n2k-surface-lowest text-n2k-on-surface-variant transition-all hover:bg-n2k-surface-low hover:text-n2k-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label={translations.paginationNext}
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                </nav>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-n2k-on-surface-variant py-20 bg-n2k-surface-lowest rounded-md ghost-border">
            {translations.noArticles}
          </div>
        )}
      </div>
    </section>
  );
}
