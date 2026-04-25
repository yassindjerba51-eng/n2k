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
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  Loader2,
  ImageIcon,
  FileText,
} from "lucide-react";
import Image from "next/image";

type BlogCategory = {
  id: number;
  slugFr: string;
  slugEn: string;
  slugAr: string;
  nameFr: string;
  nameEn: string;
  nameAr: string;
  titleFr: string;
  titleEn: string;
  titleAr: string;
  subtitleFr: string | null;
  subtitleEn: string | null;
  subtitleAr: string | null;
  headerImage: string | null;
  createdAt: string;
  _count?: { posts: number };
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogCategory | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/blog/categories");
      const data = await res.json();
      if (data.success) setCategories(data.categories);
    } catch {
      setError("Erreur lors du chargement des catégories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/blog/categories/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteTarget(null);
        fetchCategories();
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Catégories du Blog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gérez les catégories d&apos;articles (Élevage, Abattoir, Agroalimentaire)
          </p>
        </div>
        <Link
          href="/webadmin/blog/categories/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0A2540] hover:bg-[#0A2540]/90 text-white text-sm font-medium whitespace-nowrap h-8 px-3 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvelle catégorie
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Categories Table */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="text-start py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="text-start py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Nom (FR / EN / AR)
                  </th>
                  <th className="text-start py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Slugs
                  </th>
                  <th className="text-start py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Articles
                  </th>
                  <th className="text-end py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Image */}
                    <td className="py-3 px-4">
                      {cat.headerImage ? (
                        <div className="w-16 h-10 relative rounded overflow-hidden bg-slate-100">
                          <Image
                            src={cat.headerImage}
                            alt={cat.nameFr}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-10 rounded bg-slate-100 flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-slate-300" />
                        </div>
                      )}
                    </td>

                    {/* Names */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-slate-900">
                          {cat.nameFr}
                        </p>
                        <p className="text-xs text-slate-500">{cat.nameEn}</p>
                        <p className="text-xs text-slate-400">
                          {cat.nameAr}
                        </p>
                      </div>
                    </td>

                    {/* Slugs */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-blue-50 text-blue-700 border-blue-200"
                        >
                          fr:{cat.slugFr}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-green-50 text-green-700 border-green-200"
                        >
                          en:{cat.slugEn}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-amber-50 text-amber-700 border-amber-200"
                        >
                          ar:{cat.slugAr}
                        </Badge>
                      </div>
                    </td>

                    {/* Post count */}
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-700 border-slate-200"
                      >
                        <FileText className="w-3 h-3 me-1" />
                        {cat._count?.posts ?? 0}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-end">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/webadmin/blog/categories/${cat.id}/edit`}
                          className="inline-flex items-center justify-center rounded-lg text-xs text-slate-500 hover:text-slate-800 hover:bg-muted h-8 px-2.5 whitespace-nowrap transition-colors font-medium"
                        >
                          <Pencil className="w-3.5 h-3.5 me-1" />
                          Modifier
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                          onClick={() => setDeleteTarget(cat)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-400">
                      <FolderOpen className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      Aucune catégorie créée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette catégorie ?</AlertDialogTitle>
            <AlertDialogDescription>
              La catégorie <strong>{deleteTarget?.nameFr}</strong> sera supprimée.
              Les articles associés seront dissociés mais pas supprimés.
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
