"use client";

import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Upload,
  X,
  ImageIcon,
  Globe,
  Star,
  CalendarIcon,
  FolderOpen,
  Search,
} from "lucide-react";
import Image from "next/image";

const TipTapEditor = lazy(() => import("@/components/admin/TipTapEditor"));

type BlogCategory = {
  id: number;
  nameFr: string;
  nameEn: string;
  nameAr: string;
};

type ArticleFormData = {
  slug: string;
  slugFr: string;
  slugEn: string;
  slugAr: string;
  coverImage: string;
  featured: boolean;
  titleFr: string;
  titleEn: string;
  titleAr: string;
  metaTitleFr: string;
  metaTitleEn: string;
  metaTitleAr: string;
  metaDescFr: string;
  metaDescEn: string;
  metaDescAr: string;
  contentFr: string;
  contentEn: string;
  contentAr: string;
  publishedAt: string;
  categoryIds: number[];
};

const EMPTY_FORM: ArticleFormData = {
  slug: "",
  slugFr: "",
  slugEn: "",
  slugAr: "",
  coverImage: "",
  featured: false,
  titleFr: "",
  titleEn: "",
  titleAr: "",
  metaTitleFr: "",
  metaTitleEn: "",
  metaTitleAr: "",
  metaDescFr: "",
  metaDescEn: "",
  metaDescAr: "",
  contentFr: "",
  contentEn: "",
  contentAr: "",
  publishedAt: new Date().toISOString().split("T")[0],
  categoryIds: [],
};

type Props = {
  initialData?: ArticleFormData & { id?: number };
  mode: "create" | "edit";
};

export default function ArticleForm({ initialData, mode }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ArticleFormData>(initialData ?? EMPTY_FORM);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeContentTab, setActiveContentTab] = useState<"fr" | "en" | "ar">("fr");

  // Fetch categories
  useEffect(() => {
    fetch("/api/blog/categories")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCategories(d.categories);
      })
      .catch(() => {});
  }, []);

  const updateField = useCallback(
    (field: keyof ArticleFormData, value: string | boolean | number[]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleTitleChange = (lang: "Fr" | "En" | "Ar", value: string) => {
    updateField(`title${lang}`, value);
    if (lang !== "Ar") {
      const slugField = `slug${lang}` as keyof ArticleFormData;
      const currentSlug = form[slugField] as string;
      const prevAutoSlug = generateSlug(form[`title${lang}`] as string);
      if (!currentSlug || currentSlug === prevAutoSlug) {
        updateField(slugField, generateSlug(value));
        if (lang === "Fr") updateField("slug", generateSlug(value));
      }
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'upload");
        return;
      }
      updateField("coverImage", data.url);
    } catch {
      setError("Erreur réseau lors de l'upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const toggleCategory = (catId: number) => {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(catId)
        ? prev.categoryIds.filter((c) => c !== catId)
        : [...prev.categoryIds, catId],
    }));
  };

  const handleSave = async () => {
    if (!form.titleFr || !form.slugFr) {
      setError("Le titre (FR) et le slug (FR) sont obligatoires");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const url =
        mode === "edit" && initialData?.id
          ? `/api/blog/${initialData.id}`
          : "/api/blog";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la sauvegarde");
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push("/webadmin/blog"), 800);
    } catch {
      setError("Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  const contentTabs = [
    { key: "fr" as const, label: "🇫🇷 Français", field: "contentFr" as const, dir: "ltr" as const },
    { key: "en" as const, label: "🇬🇧 English", field: "contentEn" as const, dir: "ltr" as const },
    { key: "ar" as const, label: "🇸🇦 العربية", field: "contentAr" as const, dir: "rtl" as const },
  ];

  return (
    <div className="space-y-6 max-w">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/webadmin/blog")}
          className="text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4 me-1" />
          Retour
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {mode === "edit" ? "Modifier l'article" : "Nouvel article"}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {mode === "edit"
              ? `Modification de « ${initialData?.titleFr ?? ""} »`
              : "Renseignez les champs dans les trois langues (FR, EN, AR)"}
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <X className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {mode === "edit" ? "Article mis à jour !" : "Article créé !"}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ═══ Main Column ═══ */}
        <div className="lg:col-span-2 space-y-6">
          {/* Titles */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Titre de l&apos;article (H1)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500 font-medium">
                  🇫🇷 Français <span className="text-red-400">*</span>
                </Label>
                <Input
                  value={form.titleFr}
                  onChange={(e) => handleTitleChange("Fr", e.target.value)}
                  placeholder="Comment réduire la contamination microbienne…"
                  className="bg-white mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">🇬🇧 English</Label>
                <Input
                  value={form.titleEn}
                  onChange={(e) => handleTitleChange("En", e.target.value)}
                  placeholder="How to reduce microbial contamination…"
                  className="bg-white mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">🇸🇦 العربية</Label>
                <Input
                  value={form.titleAr}
                  onChange={(e) => updateField("titleAr", e.target.value)}
                  placeholder="كيفية تقليل التلوث الميكروبي…"
                  className="bg-white mt-1"
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Slugs */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-slate-700">Slugs (URL)</CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                Auto-générés depuis le titre. Modifiables manuellement.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-slate-500 font-medium">
                    🇫🇷 Français <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    value={form.slugFr}
                    onChange={(e) => {
                      const slugified = generateSlug(e.target.value);
                      updateField("slugFr", slugified);
                      updateField("slug", slugified);
                    }}
                    className="bg-slate-50 font-mono text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 font-medium">🇬🇧 English</Label>
                  <Input
                    value={form.slugEn}
                    onChange={(e) => updateField("slugEn", generateSlug(e.target.value))}
                    className="bg-slate-50 font-mono text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 font-medium">🇸🇦 العربية</Label>
                  <Input
                    value={form.slugAr}
                    onChange={(e) => updateField("slugAr", generateSlug(e.target.value))}
                    className="bg-slate-50 font-mono text-sm mt-1"
                    dir="rtl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Meta Title */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                SEO — Meta Title
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500 font-medium">🇫🇷 Français</Label>
                <Input
                  value={form.metaTitleFr}
                  onChange={(e) => updateField("metaTitleFr", e.target.value)}
                  placeholder="Titre SEO français (60 caractères max)"
                  className="bg-white mt-1"
                  maxLength={120}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">🇬🇧 English</Label>
                <Input
                  value={form.metaTitleEn}
                  onChange={(e) => updateField("metaTitleEn", e.target.value)}
                  placeholder="SEO title in English (60 chars max)"
                  className="bg-white mt-1"
                  maxLength={120}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">🇸🇦 العربية</Label>
                <Input
                  value={form.metaTitleAr}
                  onChange={(e) => updateField("metaTitleAr", e.target.value)}
                  placeholder="عنوان SEO بالعربية"
                  className="bg-white mt-1"
                  dir="rtl"
                  maxLength={120}
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Meta Description */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                SEO — Meta Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500 font-medium">🇫🇷 Français</Label>
                <textarea
                  value={form.metaDescFr}
                  onChange={(e) => updateField("metaDescFr", e.target.value)}
                  placeholder="Description SEO française (160 caractères max)"
                  className="w-full bg-white mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none h-16 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  maxLength={300}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">🇬🇧 English</Label>
                <textarea
                  value={form.metaDescEn}
                  onChange={(e) => updateField("metaDescEn", e.target.value)}
                  placeholder="SEO description in English (160 chars max)"
                  className="w-full bg-white mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none h-16 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  maxLength={300}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">🇸🇦 العربية</Label>
                <textarea
                  value={form.metaDescAr}
                  onChange={(e) => updateField("metaDescAr", e.target.value)}
                  placeholder="وصف SEO بالعربية"
                  className="w-full bg-white mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none h-16 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  dir="rtl"
                  maxLength={300}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content — TipTap */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Contenu de l&apos;article
              </CardTitle>
              {/* Language Tabs */}
              <div className="flex gap-1 mt-3">
                {contentTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveContentTab(tab.key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      activeContentTab === tab.key
                        ? "bg-[#0A2540] text-white"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-12 text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin me-2" />
                    Chargement de l&apos;éditeur…
                  </div>
                }
              >
                {contentTabs.map((tab) => (
                  <div
                    key={tab.key}
                    className={activeContentTab === tab.key ? "block" : "hidden"}
                  >
                    <TipTapEditor
                      content={form[tab.field]}
                      onChange={(html) => updateField(tab.field, html)}
                      placeholder={
                        tab.key === "fr"
                          ? "Rédigez le contenu en français…"
                          : tab.key === "en"
                          ? "Write the content in English…"
                          : "اكتب المحتوى بالعربية…"
                      }
                      dir={tab.dir}
                    />
                  </div>
                ))}
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* ═══ Sidebar ═══ */}
        <div className="space-y-6">
          {/* Featured Image */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" />
                Image à la une
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.coverImage ? (
                <div className="relative group">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <Image
                      src={form.coverImage}
                      alt="Aperçu"
                      fill
                      className="object-cover"
                      sizes="(max-width: 400px) 100vw, 400px"
                    />
                  </div>
                  <button
                    onClick={() => updateField("coverImage", "")}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                  <span className="text-xs">Aucune image</span>
                </div>
              )}
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 me-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 me-2" />
                  )}
                  {uploading ? "Upload en cours…" : "Uploader une image"}
                </Button>
                <Separator />
                <div>
                  <Label className="text-xs text-slate-400">Ou entrez une URL</Label>
                  <Input
                    value={form.coverImage}
                    onChange={(e) => updateField("coverImage", e.target.value)}
                    placeholder="https://..."
                    className="bg-white mt-1 text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Toggle */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardContent className="pt-5">
              <button
                type="button"
                onClick={() => updateField("featured", !form.featured)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  form.featured
                    ? "border-amber-300 bg-amber-50 text-amber-800"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Star
                  className={`w-5 h-5 ${
                    form.featured ? "fill-amber-400 text-amber-400" : ""
                  }`}
                />
                <div className="text-start">
                  <p className="text-sm font-medium">Article à la une</p>
                  <p className="text-xs opacity-70">
                    {form.featured ? "Cet article sera mis en avant" : "Non mis en avant"}
                  </p>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Published Date */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-slate-400" />
                Date de publication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="date"
                value={form.publishedAt}
                onChange={(e) => updateField("publishedAt", e.target.value)}
                className="bg-white"
              />
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-slate-400" />
                Catégories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-2">
                  Aucune catégorie disponible
                </p>
              ) : (
                categories.map((cat) => (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      form.categoryIds.includes(cat.id)
                        ? "border-[#0A2540] bg-[#0A2540]/5"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.categoryIds.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="rounded border-slate-300 text-[#0A2540] focus:ring-[#0A2540]"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      {cat.nameFr}
                    </span>
                  </label>
                ))
              )}
            </CardContent>
          </Card>

          {/* Save Actions */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardContent className="pt-6 space-y-3">
              <Button
                className="w-full bg-[#0A2540] hover:bg-[#0A2540]/90"
                onClick={handleSave}
                disabled={saving || success}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 me-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 me-2" />
                )}
                {saving
                  ? "Enregistrement…"
                  : success
                  ? "Enregistré !"
                  : mode === "edit"
                  ? "Enregistrer les modifications"
                  : "Publier l'article"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/webadmin/blog")}
              >
                Annuler
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
