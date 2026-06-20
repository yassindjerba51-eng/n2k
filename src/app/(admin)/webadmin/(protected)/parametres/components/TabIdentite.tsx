"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { ImageCropper } from "@/components/ui/ImageCropper";
import Image from "next/image";

interface TabIdentiteProps {
  settings: any;
  onUpdate: () => void;
}

export default function TabIdentite({ settings, onUpdate }: TabIdentiteProps) {
  const [siteName, setSiteName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (settings) {
      setSiteName(settings.siteName || "");
      setLogoUrl(settings.logoUrl || "");
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteName, logoUrl }),
      });

      if (res.ok) {
        toast.success("Paramètres d'identité enregistrés avec succès.");
        onUpdate();
      } else {
        toast.error("Erreur lors de l'enregistrement.");
      }
    } catch (err) {
      toast.error("Une erreur est survenue.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || null);
      });
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setImageSrc(null);
    setIsSaving(true);
    
    try {
      const formData = new FormData();
      formData.append("file", croppedBlob, "logo.png"); // Saving logo as PNG usually better for transparency
      formData.append("folder", "settings");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Erreur lors de l'upload du logo");
      }

      const uploadData = await uploadRes.json();
      setLogoUrl(uploadData.url);
      toast.success("Logo uploadé avec succès. N'oubliez pas d'enregistrer.");
    } catch (error: any) {
      toast.error(error.message || "Erreur de traitement.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Identité du site</CardTitle>
          <CardDescription>Configurez le nom et le logo de votre site public.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="siteName">Nom du site</Label>
            <Input
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Ex: N2K Platform"
            />
          </div>

          <div className="space-y-3">
            <Label>Logo</Label>
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 relative overflow-hidden group">
                {logoUrl ? (
                  <>
                    <Image src={logoUrl} alt="Logo" fill className="object-contain p-4" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="destructive" size="sm" onClick={() => setLogoUrl("")}>
                        <Trash2 className="w-4 h-4 me-2" /> Supprimer
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-slate-400">
                    <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <span className="text-xs">Aucun logo</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isSaving}>
                  {isSaving ? <Loader2 className="w-4 h-4 me-2 animate-spin" /> : <Upload className="w-4 h-4 me-2" />}
                  {logoUrl ? "Remplacer le logo" : "Uploader un logo"}
                </Button>
                <p className="text-xs text-slate-500 max-w-xs">
                  Format recommandé : PNG avec fond transparent ou SVG.
                  Idéalement un format carré (max 5MB).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t bg-slate-50/50 pt-4">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
            Enregistrer
          </Button>
        </CardFooter>
      </Card>

      {imageSrc && (
        <ImageCropper
          imageSrc={imageSrc}
          onCropComplete={handleCropComplete}
          onCancel={() => setImageSrc(null)}
          aspect={1} // Square aspect ratio for logo
        />
      )}
    </div>
  );
}
