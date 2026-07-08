"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, Building2, MapPin, Share2 } from "lucide-react";
import { ImageCropper } from "@/components/ui/ImageCropper";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface TabIdentiteProps {
  settings: any;
  onUpdate: () => void;
}

export default function TabIdentite({ settings, onUpdate }: TabIdentiteProps) {
  // Identity fields
  const [siteName, setSiteName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  // Coordonnées fields
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactFax, setContactFax] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [mainWebsiteUrl, setMainWebsiteUrl] = useState("");

  // Social Media fields
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (settings) {
      setSiteName(settings.siteName || "");
      setLogoUrl(settings.logoUrl || "");
      setContactEmail(settings.contactEmail || "");
      setContactPhone(settings.contactPhone || "");
      setContactFax(settings.contactFax || "");
      setPhysicalAddress(settings.physicalAddress || "");
      setMainWebsiteUrl(settings.mainWebsiteUrl || "");
      setFacebookUrl(settings.facebookUrl || "");
      setInstagramUrl(settings.instagramUrl || "");
      setLinkedinUrl(settings.linkedinUrl || "");
      setTwitterUrl(settings.twitterUrl || "");
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          logoUrl,
          contactEmail,
          contactPhone,
          contactFax,
          physicalAddress,
          mainWebsiteUrl,
          facebookUrl,
          instagramUrl,
          linkedinUrl,
          twitterUrl,
        }),
      });

      if (res.ok) {
        toast.success("Paramètres enregistrés avec succès.");
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
      {/* ── Identity Card ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-slate-600" />
            <CardTitle>Identité du site</CardTitle>
          </div>
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
      </Card>

      {/* ── Coordonnées Card ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-slate-600" />
            <CardTitle>Coordonnées</CardTitle>
          </div>
          <CardDescription>
            Informations de contact affichées sur votre site (footer, pages de contact).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">E-mail professionnel</Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="contact@n2k.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainWebsiteUrl">URL du site Web principal</Label>
              <Input
                id="mainWebsiteUrl"
                type="url"
                value={mainWebsiteUrl}
                onChange={(e) => setMainWebsiteUrl(e.target.value)}
                placeholder="https://www.n2k.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Numéro de téléphone</Label>
              <Input
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+216 71 123 456"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactFax">Fax</Label>
              <Input
                id="contactFax"
                value={contactFax}
                onChange={(e) => setContactFax(e.target.value)}
                placeholder="+216 71 123 457"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="physicalAddress">Adresse physique</Label>
            <Textarea
              id="physicalAddress"
              value={physicalAddress}
              onChange={(e) => setPhysicalAddress(e.target.value)}
              placeholder="Votre adresse complète..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Social Media Card ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-slate-600" />
            <CardTitle>Réseaux Sociaux</CardTitle>
          </div>
          <CardDescription>
            Liens vers vos différentes pages sur les réseaux sociaux.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook URL</Label>
              <Input
                id="facebookUrl"
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/votrepage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input
                id="instagramUrl"
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/votrepage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/company/votrepage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitterUrl">X (Twitter) URL</Label>
              <Input
                id="twitterUrl"
                type="url"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="https://x.com/votrepage"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Global Save Button ── */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
          Enregistrer tous les paramètres
        </Button>
      </div>

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
