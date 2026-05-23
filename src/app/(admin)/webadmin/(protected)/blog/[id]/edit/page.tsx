"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";
import { Loader2 } from "lucide-react";

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Article introuvable");
          return;
        }
        setData(json.post);
      } catch {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20 text-red-500">
        {error || "Article introuvable"}
      </div>
    );
  }

  return (
    <ArticleForm
      mode="edit"
      initialData={{
        id: data.id,
        slug: data.slug,
        slugFr: data.slugFr || data.slug || "",
        slugEn: data.slugEn || "",
        slugAr: data.slugAr || "",
        coverImage: data.coverImage || "",
        featured: data.featured || false,
        titleFr: data.titleFr || "",
        titleEn: data.titleEn || "",
        titleAr: data.titleAr || "",
        metaTitleFr: data.metaTitleFr || "",
        metaTitleEn: data.metaTitleEn || "",
        metaTitleAr: data.metaTitleAr || "",
        metaDescFr: data.metaDescFr || "",
        metaDescEn: data.metaDescEn || "",
        metaDescAr: data.metaDescAr || "",
        contentFr: data.contentFr || "",
        contentEn: data.contentEn || "",
        contentAr: data.contentAr || "",
        publishedAt: data.publishedAt
          ? new Date(data.publishedAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        categoryIds: data.categories?.map((c: any) => c.id) || [],
        tags: Array.isArray(data.tags) ? data.tags : [],
      }}
    />
  );
}
