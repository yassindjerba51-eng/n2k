"use client";

import { useState, useRef } from "react";
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
} from "lucide-react";
import Image from "next/image";

type CategoryFormData = {
  slugFr: string;
  slugEn: string;
  slugAr: string;
  nameFr: string;
  nameEn: string;
  nameAr: string;
  titleFr: string;
  titleEn: string;
  titleAr: string;
  subtitleFr: string;
  subtitleEn: string;
  subtitleAr: string;
  headerImage: string;
};

const EMPTY_FORM: CategoryFormData = {
  slugFr: "",
  slugEn: "",
  slugAr: "",
  nameFr: "",
  nameEn: "",
  nameAr: "",
  titleFr: "",
  titleEn: "",
  titleAr: "",
  subtitleFr: "",
  subtitleEn: "",
  subtitleAr: "",
  headerImage: "",
};

type Props = {
  initialData?: CategoryFormData & { id?: number };
  mode: "create" | "edit";
};

export default function CategoryForm({ initialData, mode }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<CategoryFormData>(initialData ?? EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateField = (field: keyof CategoryFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (lang: "Fr" | "En" | "Ar", value: string) => {
    updateField(`name${lang}`, value);
    // Auto-fill slug if slug is empty or was auto-generated
    if (lang !== "Ar") {
      const currentSlug = form[`slug${lang}`];
      const autoSlug = generateSlug(form[`name${lang}`]);
      if (!currentSlug || currentSlug === autoSlug) {
        updateField(`slug${lang}`, generateSlug(value));
      }
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'upload");
        return;
      }
      updateField("headerImage", data.url);
    } catch {
      setError("Erreur réseau lors de l'upload");
    } finally {
      setUploading(false);
      // Reset input so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    // Validation
    if (!form.nameFr || !form.slugFr) {
      setError("Le nom (FR) et le slug (FR) sont obligatoires");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const url =
        mode === "edit" && initialData?.id
          ? `/api/blog/categories/${initialData.id}`
          : "/api/blog/categories";
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
      setTimeout(() => router.push("/webadmin/blog/categories"), 800);
    } catch {
      setError("Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/webadmin/blog/categories")}
          className="text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4 me-1" />
          Retour
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {mode === "edit" ? "Modifier la catégorie" : "Nouvelle catégorie"}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {mode === "edit"
              ? `Modification de « ${initialData?.nameFr ?? ""} »`
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
          {mode === "edit" ? "Catégorie mise à jour !" : "Catégorie créée !"}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form — 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Names */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Nom de la catégorie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-slate-500 font-medium">
                    🇫🇷 Français <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    value={form.nameFr}
                    onChange={(e) => handleNameChange("Fr", e.target.value)}
                    placeholder="Élevage"
                    className="bg-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 font-medium">
                    🇬🇧 English
                  </Label>
                  <Input
                    value={form.nameEn}
                    onChange={(e) => handleNameChange("En", e.target.value)}
                    placeholder="Farming"
                    className="bg-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 font-medium">
                    🇸🇦 العربية
                  </Label>
                  <Input
                    value={form.nameAr}
                    onChange={(e) => updateField("nameAr", e.target.value)}
                    placeholder="تربية"
                    className="bg-white mt-1"
                    dir="rtl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Slugs */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-slate-700">
                Slugs (URL)
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                Auto-générés depuis le nom. Modifiables manuellement.
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
                    onChange={(e) => updateField("slugFr", e.target.value)}
                    placeholder="elevage"
                    className="bg-slate-50 font-mono text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 font-medium">
                    🇬🇧 English
                  </Label>
                  <Input
                    value={form.slugEn}
                    onChange={(e) => updateField("slugEn", e.target.value)}
                    placeholder="farming"
                    className="bg-slate-50 font-mono text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 font-medium">
                    🇸🇦 العربية
                  </Label>
                  <Input
                    value={form.slugAr}
                    onChange={(e) => updateField("slugAr", e.target.value)}
                    placeholder="تربية"
                    className="bg-slate-50 font-mono text-sm mt-1"
                    dir="rtl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Titles */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Titre de la catégorie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500 font-medium">
                  🇫🇷 Français
                </Label>
                <Input
                  value={form.titleFr}
                  onChange={(e) => updateField("titleFr", e.target.value)}
                  placeholder="Élevage Avicole & Biosécurité"
                  className="bg-white mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">
                  🇬🇧 English
                </Label>
                <Input
                  value={form.titleEn}
                  onChange={(e) => updateField("titleEn", e.target.value)}
                  placeholder="Poultry Farming & Biosecurity"
                  className="bg-white mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">
                  🇸🇦 العربية
                </Label>
                <Input
                  value={form.titleAr}
                  onChange={(e) => updateField("titleAr", e.target.value)}
                  placeholder="تربية الدواجن والأمن الحيوي"
                  className="bg-white mt-1"
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Subtitles */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Sous-titre
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500 font-medium">
                  🇫🇷 Français
                </Label>
                <Input
                  value={form.subtitleFr}
                  onChange={(e) => updateField("subtitleFr", e.target.value)}
                  placeholder="Protocoles adaptés aux bâtiments d'élevage"
                  className="bg-white mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">
                  🇬🇧 English
                </Label>
                <Input
                  value={form.subtitleEn}
                  onChange={(e) => updateField("subtitleEn", e.target.value)}
                  placeholder="Protocols adapted to livestock buildings"
                  className="bg-white mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500 font-medium">
                  🇸🇦 العربية
                </Label>
                <Input
                  value={form.subtitleAr}
                  onChange={(e) => updateField("subtitleAr", e.target.value)}
                  placeholder="بروتوكولات مناسبة لمباني التربية"
                  className="bg-white mt-1"
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — Image + Actions */}
        <div className="space-y-6">
          {/* Header Image */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" />
                Image d&apos;en-tête
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview */}
              {form.headerImage ? (
                <div className="relative group">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <Image
                      src={form.headerImage}
                      alt="Aperçu"
                      fill
                      className="object-cover"
                      sizes="(max-width: 400px) 100vw, 400px"
                    />
                  </div>
                  <button
                    onClick={() => updateField("headerImage", "")}
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

              {/* Upload button */}
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

                {/* Or enter URL manually */}
                <div>
                  <Label className="text-xs text-slate-400">
                    Ou entrez une URL
                  </Label>
                  <Input
                    value={form.headerImage}
                    onChange={(e) => updateField("headerImage", e.target.value)}
                    placeholder="https://..."
                    className="bg-white mt-1 text-xs"
                  />
                </div>
              </div>
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
                ) : success ? (
                  <CheckCircle2 className="w-4 h-4 me-2" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 me-2" />
                )}
                {saving
                  ? "Enregistrement…"
                  : success
                  ? "Enregistré !"
                  : mode === "edit"
                  ? "Enregistrer les modifications"
                  : "Créer la catégorie"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/webadmin/blog/categories")}
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
