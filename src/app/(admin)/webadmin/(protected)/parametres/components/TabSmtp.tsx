"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, MailCheck } from "lucide-react";

interface TabSmtpProps {
  settings: any;
  onUpdate: () => void;
}

export default function TabSmtp({ settings, onUpdate }: TabSmtpProps) {
  const [formData, setFormData] = useState({
    smtpFromEmail: "",
    smtpFromName: "",
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        smtpFromEmail: settings.smtpFromEmail || "",
        smtpFromName: settings.smtpFromName || "",
        smtpHost: settings.smtpHost || "",
        smtpPort: settings.smtpPort ? settings.smtpPort.toString() : "",
        smtpUser: settings.smtpUser || "",
        smtpPassword: settings.smtpPassword || "",
      });
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { ...formData, smtpPort: parseInt(formData.smtpPort) || null };
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Configuration SMTP enregistrée avec succès.");
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

  const handleTest = async () => {
    setIsTesting(true);
    try {
      const payload = { ...formData, smtpPort: parseInt(formData.smtpPort) || null };
      const res = await fetch("/api/settings/test-smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success(data.message || "Connexion SMTP réussie ! Un email de test a été envoyé.");
      } else {
        toast.error(data.error || "Erreur de connexion SMTP.", {
          description: data.details || "",
        });
      }
    } catch (err) {
      toast.error("Une erreur est survenue lors du test SMTP.");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration SMTP</CardTitle>
        <CardDescription>
          Paramètres du serveur de messagerie sortant pour l'envoi d'e-mails depuis la plateforme.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="smtpFromName">Nom expéditeur</Label>
            <Input
              id="smtpFromName"
              value={formData.smtpFromName}
              onChange={handleChange}
              placeholder="Ex: N2K Contact"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpFromEmail">E-mail expéditeur</Label>
            <Input
              id="smtpFromEmail"
              type="email"
              value={formData.smtpFromEmail}
              onChange={handleChange}
              placeholder="noreply@n2k.com"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-medium text-sm text-slate-900 mb-4">Informations du serveur SMTP</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">Serveur SMTP (Host)</Label>
              <Input
                id="smtpHost"
                value={formData.smtpHost}
                onChange={handleChange}
                placeholder="smtp.example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">Port SMTP</Label>
              <Input
                id="smtpPort"
                type="number"
                value={formData.smtpPort}
                onChange={handleChange}
                placeholder="Ex: 465 ou 587"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpUser">Login SMTP</Label>
              <Input
                id="smtpUser"
                value={formData.smtpUser}
                onChange={handleChange}
                placeholder="Votre login SMTP"
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">Mot de passe SMTP</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={formData.smtpPassword}
                onChange={handleChange}
                placeholder="Votre mot de passe SMTP"
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-slate-50/50 pt-4">
        <Button variant="secondary" onClick={handleTest} disabled={isTesting || isSaving}>
          {isTesting ? (
            <Loader2 className="w-4 h-4 me-2 animate-spin" />
          ) : (
            <MailCheck className="w-4 h-4 me-2" />
          )}
          Tester la connexion SMTP
        </Button>
        <Button onClick={handleSave} disabled={isSaving || isTesting}>
          {isSaving && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
}
