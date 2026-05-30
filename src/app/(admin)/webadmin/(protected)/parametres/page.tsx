"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Image as ImageIcon, MapPin, Share2, Mail, Key } from "lucide-react";
import TabProfil from "./components/TabProfil";
import TabIdentite from "./components/TabIdentite";
import TabCoordonnees from "./components/TabCoordonnees";
import TabSocialMedia from "./components/TabSocialMedia";
import TabSmtp from "./components/TabSmtp";
import TabApi from "./components/TabApi";
import { toast } from "sonner";

export default function ParametresPage() {
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
      } else {
        toast.error("Erreur lors de la récupération des paramètres.");
      }
    } catch (err) {
      toast.error("Erreur de connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Paramètres</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Gérez les paramètres globaux de la plateforme, votre profil et vos intégrations.
        </p>
      </div>

      <Tabs defaultValue="profil" className="w-full">
        <TabsList className="mb-6 grid grid-cols-6 h-auto bg-slate-100/50 p-1 rounded-xl">
          <TabsTrigger value="profil" className="py-2.5 rounded-lg data-[state=active]:shadow-sm">
            <User className="w-4 h-4 me-2" /> Profil
          </TabsTrigger>
          <TabsTrigger value="identite" className="py-2.5 rounded-lg data-[state=active]:shadow-sm">
            <ImageIcon className="w-4 h-4 me-2" /> Identité
          </TabsTrigger>
          <TabsTrigger value="coordonnees" className="py-2.5 rounded-lg data-[state=active]:shadow-sm">
            <MapPin className="w-4 h-4 me-2" /> Coordonnées
          </TabsTrigger>
          <TabsTrigger value="social" className="py-2.5 rounded-lg data-[state=active]:shadow-sm">
            <Share2 className="w-4 h-4 me-2" /> Social Media
          </TabsTrigger>
          <TabsTrigger value="smtp" className="py-2.5 rounded-lg data-[state=active]:shadow-sm">
            <Mail className="w-4 h-4 me-2" /> SMTP
          </TabsTrigger>
          <TabsTrigger value="api" className="py-2.5 rounded-lg data-[state=active]:shadow-sm">
            <Key className="w-4 h-4 me-2" /> API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profil" className="outline-none">
          <TabProfil />
        </TabsContent>
        <TabsContent value="identite" className="outline-none">
          <TabIdentite settings={settings} onUpdate={fetchSettings} />
        </TabsContent>
        <TabsContent value="coordonnees" className="outline-none">
          <TabCoordonnees settings={settings} onUpdate={fetchSettings} />
        </TabsContent>
        <TabsContent value="social" className="outline-none">
          <TabSocialMedia settings={settings} onUpdate={fetchSettings} />
        </TabsContent>
        <TabsContent value="smtp" className="outline-none">
          <TabSmtp settings={settings} onUpdate={fetchSettings} />
        </TabsContent>
        <TabsContent value="api" className="outline-none">
          <TabApi settings={settings} onUpdate={fetchSettings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
