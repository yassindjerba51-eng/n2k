"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Image as ImageIcon, Mail, Key } from "lucide-react";
import TabProfil from "./components/TabProfil";
import TabIdentite from "./components/TabIdentite";
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
        <TabsList className="mb-6 grid grid-cols-2 sm:grid-cols-4 h-auto bg-slate-100/50 p-1 rounded-xl gap-1">
          <TabsTrigger value="profil" className="py-2.5 rounded-lg data-[state=active]:shadow-sm">
            <User className="w-4 h-4 me-2" /> Profil
          </TabsTrigger>
          <TabsTrigger value="identite" className="py-2.5 rounded-lg data-[state=active]:shadow-sm">
            <ImageIcon className="w-4 h-4 me-2" /> Identité
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

