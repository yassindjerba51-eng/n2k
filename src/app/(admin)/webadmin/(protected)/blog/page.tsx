"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  Pencil,
  Plus,
  Trash2,
  Star,
  Loader2,
  FolderOpen,
  ExternalLink,
  FileText,
} from "lucide-react";
import Image from "next/image";

type BlogCategory = {
  id: number;
  nameFr: string;
};

type BlogPost = {
  id: number;
  slug: string;
  coverImage: string | null;
  featured: boolean;
  titleFr: string;
  titleEn: string;
  titleAr: string;
  publishedAt: string;
  categories: BlogCategory[];
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch {
      setError("Erreur lors du chargement des articles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/blog/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteTarget(null);
        fetchPosts();
      }
    } catch {
      setError("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Blog</h1>
          <p className="text-sm text-slate-500 mt-1">
            {posts.length} articles publiés
          </p>
        </div>
        <Link
          href="/webadmin/blog/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0A2540] hover:bg-[#0A2540]/90 text-white text-sm font-medium whitespace-nowrap h-8 px-3 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvel article
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16 text-slate-400">
            <FolderOpen className="w-10 h-10 mb-3 text-slate-300" />
            <p className="text-sm font-medium">Aucun article</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border-slate-200/80 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Cover Image */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.titleFr}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-slate-300" />
                  </div>
                )}
                {/* Date badge */}
                <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                {/* Featured star */}
                {post.featured && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    <Star className="w-3.5 h-3.5 fill-white" />
                  </div>
                )}
              </div>

              <CardContent className="pt-4 space-y-3">
                {/* Title */}
                <h3 className="font-semibold text-slate-900 leading-snug line-clamp-2 text-[15px]">
                  {post.titleFr}
                </h3>

                {/* Categories */}
                {post.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.categories.map((cat) => (
                      <Badge
                        key={cat.id}
                        variant="outline"
                        className="text-[10px] bg-teal-50 text-teal-700 border-teal-200"
                      >
                        {cat.nameFr}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Language indicators */}
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-slate-400">LANGUES :</span>
                  {post.titleFr && (
                    <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-semibold">
                      FR
                    </span>
                  )}
                  {post.titleEn && (
                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">
                      EN
                    </span>
                  )}
                  {post.titleAr && (
                    <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-semibold">
                      AR
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <Link
                    href={`/webadmin/blog/${post.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Modifier
                  </Link>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/fr/blog/${post.slug}`}
                      target="_blank"
                      className="inline-flex items-center justify-center w-7 h-7 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(post)}
                      className="inline-flex items-center justify-center w-7 h-7 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription>
              L&apos;article <strong>{deleteTarget?.titleFr}</strong> sera
              définitivement supprimé. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
