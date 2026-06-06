"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, FileText, Package, Layout } from "lucide-react";
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

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse>({ products: [], posts: [], pages: [] });
  const [isLoading, setIsLoading] = useState(false);
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
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isOpen) return null;

  const hasResults =
    results.products.length > 0 || results.posts.length > 0 || results.pages.length > 0;

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
            placeholder="Recherche..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading && <Loader2 className="w-6 h-6 text-primary animate-spin shrink-0 absolute right-16" />}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-muted-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results Area */}
        {query.length >= 2 && (
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 bg-slate-50">
            {!hasResults && !isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Aucun résultat trouvé pour "{query}"</p>
                <p className="text-sm mt-1">Essayez d'autres mots-clés.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Pages Results */}
                {results.pages.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                      Pages
                    </h3>
                    <div className="grid gap-2">
                      {results.pages.map((page) => (
                        <Link
                          key={page.url}
                          href={page.url as any}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-border/50 hover:shadow-sm transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                            <Layout className="w-5 h-5" />
                          </div>
                          <span className="font-heading font-bold text-n2k-primary group-hover:text-emerald-600 transition-colors">
                            {page.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products Results */}
                {results.products.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                      Produits
                    </h3>
                    <div className="grid gap-2">
                      {results.products.map((product) => (
                        <Link
                          key={product.url}
                          href={product.url as any}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-border/50 hover:shadow-sm transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <Package className="w-5 h-5" />
                          </div>
                          <span className="font-heading font-bold text-n2k-primary group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Posts Results */}
                {results.posts.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                      Articles de blog
                    </h3>
                    <div className="grid gap-2">
                      {results.posts.map((post) => (
                        <Link
                          key={post.url}
                          href={post.url as any}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-border/50 hover:shadow-sm transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                            <FileText className="w-5 h-5" />
                          </div>
                          <span className="font-heading font-bold text-n2k-primary group-hover:text-amber-600 transition-colors">
                            {post.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {query.length < 2 && (
          <div className="p-8 text-center bg-slate-50">
            <p className="text-muted-foreground">Saisissez au moins 2 caractères pour rechercher.</p>
          </div>
        )}
      </div>
    </div>
  );
}
