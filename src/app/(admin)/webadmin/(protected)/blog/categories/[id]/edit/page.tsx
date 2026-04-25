"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { Loader2 } from "lucide-react";

export default function EditCategoryPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/blog/categories/${id}`);
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Catégorie introuvable");
          return;
        }
        setData(json.category);
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
        {error || "Catégorie introuvable"}
      </div>
    );
  }

  return (
    <CategoryForm
      mode="edit"
      initialData={{
        id: data.id,
        slugFr: data.slugFr,
        slugEn: data.slugEn,
        slugAr: data.slugAr,
        nameFr: data.nameFr,
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        titleFr: data.titleFr,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        subtitleFr: data.subtitleFr || "",
        subtitleEn: data.subtitleEn || "",
        subtitleAr: data.subtitleAr || "",
        headerImage: data.headerImage || "",
      }}
    />
  );
}
