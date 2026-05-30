"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface TabCoordonneesProps {
  settings: any;
  onUpdate: () => void;
}

export default function TabCoordonnees({ settings, onUpdate }: TabCoordonneesProps) {
  const [formData, setFormData] = useState({
    contactEmail: "",
    contactPhone: "",
    contactFax: "",
    physicalAddress: "",
    mainWebsiteUrl: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        contactEmail: settings.contactEmail || "",
        contactPhone: settings.contactPhone || "",
        contactFax: settings.contactFax || "",
        physicalAddress: settings.physicalAddress || "",
        mainWebsiteUrl: settings.mainWebsiteUrl || "",
      });
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Coordonnées enregistrées avec succès.");
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coordonnées</CardTitle>
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
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="contact@n2k.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mainWebsiteUrl">URL du site Web principal</Label>
            <Input
              id="mainWebsiteUrl"
              type="url"
              value={formData.mainWebsiteUrl}
              onChange={handleChange}
              placeholder="https://www.n2k.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Numéro de téléphone</Label>
            <Input
              id="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="+216 71 123 456"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactFax">Fax</Label>
            <Input
              id="contactFax"
              value={formData.contactFax}
              onChange={handleChange}
              placeholder="+216 71 123 457"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="physicalAddress">Adresse physique</Label>
          <Textarea
            id="physicalAddress"
            value={formData.physicalAddress}
            onChange={handleChange}
            placeholder="Votre adresse complète..."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-slate-50/50 pt-4">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
}
