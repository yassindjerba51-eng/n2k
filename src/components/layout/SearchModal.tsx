"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, Loader2, FileText, Package, Layout, LayoutGrid } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

interface SearchResult {
  title: string;
  url: string;
}

interface SearchResponse {
  products: SearchResult[];
  posts: SearchResult[];
  pages: SearchResult[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabKey = "all" | "pages" | "products" | "posts";

// Per-category visual identity (icon + accent colors), reused by tabs and rows.
const CATEGORY_STYLES: Record<
  Exclude<TabKey, "all">,
  { icon: typeof Layout; iconWrap: string; hoverText: string; activeTab: string; dot: string }
> = {
  pages: {
    icon: Layout,
    iconWrap: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
    hoverText: "group-hover:text-emerald-600",
    activeTab: "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20",
    dot: "bg-emerald-500",
  },
  products: {
    icon: Package,
    iconWrap: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    hoverText: "group-hover:text-blue-600",
    activeTab: "bg-blue-600 text-white shadow-sm shadow-blue-600/20",
    dot: "bg-blue-500",
  },
  posts: {
    icon: FileText,
    iconWrap: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    hoverText: "group-hover:text-amber-600",
    activeTab: "bg-amber-600 text-white shadow-sm shadow-amber-600/20",
    dot: "bg-amber-500",
  },
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const t = useTranslations("search");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse>({ products: [], posts: [], pages: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset state when the modal is reopened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults({ products: [], posts: [], pages: [] });
      setActiveTab("all");
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length < 2) {
        setResults({ products: [], posts: [], pages: [] });
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&locale=${locale}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query, locale]);

  const counts = {
    pages: results.pages.length,
    products: results.products.length,
    posts: results.posts.length,
  };
  const total = counts.pages + counts.products + counts.posts;
  const hasResults = total > 0;

  // Tabs to display: "All" + every category that has at least one result.
  const tabs = useMemo(() => {
    const list: { key: TabKey; label: string; count: number }[] = [
      { key: "all", label: t("all"), count: total },
    ];
    (["pages", "products", "posts"] as const).forEach((key) => {
      if (counts[key] > 0) list.push({ key, label: t(key), count: counts[key] });
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, total]);

  // If the active tab no longer has results (query changed), fall back to "All".
  useEffect(() => {
    if (activeTab !== "all" && counts[activeTab] === 0) {
      setActiveTab("all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  if (!isOpen) return null;

  // A single result row, shared across all categories.
  const ResultRow = ({ item, category }: { item: SearchResult; category: Exclude<TabKey, "all"> }) => {
    const style = CATEGORY_STYLES[category];
    const Icon = style.icon;
    return (
      <Link
        key={item.url}
        href={item.url as any}
        onClick={onClose}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-border/50 hover:shadow-sm transition-all group"
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${style.iconWrap}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`font-heading font-bold text-n2k-primary transition-colors ${style.hoverText}`}>
          {item.title}
        </span>
      </Link>
    );
  };

  // A titled section (used in the "All" tab to group categories).
  const Section = ({ category, items }: { category: Exclude<TabKey, "all">; items: SearchResult[] }) => {
    if (items.length === 0) return null;
    return (
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
          {t(category)}
        </h3>
        <div className="grid gap-2">
          {items.map((item) => (
            <ResultRow key={item.url} item={item} category={category} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 px-4 backdrop-blur-sm bg-black/60 animate-in fade-in duration-200">
      {/* Click overlay to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input Area */}
        <div className="relative flex items-center px-4 border-b border-border/50 bg-white">
          <Search className="w-6 h-6 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-0 h-16 sm:h-20 px-4 text-xl sm:text-2xl outline-none placeholder:text-muted-foreground/60 text-n2k-primary font-heading font-bold"
            placeholder={t("placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading && <Loader2 className="w-6 h-6 text-primary animate-spin shrink-0 absolute end-16" />}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-muted-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab bar — only when there are results to categorize */}
        {query.length >= 2 && hasResults && (
          <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-border/50 bg-white overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              const activeClass =
                tab.key === "all"
                  ? "bg-n2k-primary text-white shadow-sm shadow-n2k-primary/20"
                  : CATEGORY_STYLES[tab.key as Exclude<TabKey, "all">].activeTab;
              const TabIcon =
                tab.key === "all" ? LayoutGrid : CATEGORY_STYLES[tab.key as Exclude<TabKey, "all">].icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold transition-all ${
                    isActive
                      ? activeClass
                      : "bg-slate-100 text-muted-foreground hover:bg-slate-200 hover:text-n2k-primary"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                  <span
                    className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-black ${
                      isActive ? "bg-white/25 text-white" : "bg-white text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results Area */}
        {query.length >= 2 && (
          <div className="max-h-[55vh] overflow-y-auto p-4 sm:p-6 bg-slate-50">
            {!hasResults && !isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg">{t("noResults", { query })}</p>
                <p className="text-sm mt-1">{t("tryOther")}</p>
              </div>
            ) : !hasResults && isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin opacity-40" />
                <p className="text-sm">{t("loading")}</p>
              </div>
            ) : (
              <div className="space-y-8" key={activeTab}>
                {activeTab === "all" ? (
                  <>
                    <Section category="pages" items={results.pages} />
                    <Section category="products" items={results.products} />
                    <Section category="posts" items={results.posts} />
                  </>
                ) : (
                  <div className="grid gap-2 animate-in fade-in duration-200">
                    {results[activeTab].map((item) => (
                      <ResultRow key={item.url} item={item} category={activeTab} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {query.length < 2 && (
          <div className="p-8 text-center bg-slate-50">
            <p className="text-muted-foreground">{t("minChars")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
