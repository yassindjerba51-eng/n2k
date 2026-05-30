"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Key, Eye, EyeOff, CheckCircle2, AlertCircle, ImageIcon, ChevronDown } from "lucide-react";

interface PollinationsModel {
  id: string;
  name: string;
  description: string;
}

interface TabPollinationsProps {
  settings: any;
  onUpdate: () => void;
}

export default function TabPollinations({ settings, onUpdate }: TabPollinationsProps) {
  const [pollinationsApiKey, setPollinationsApiKey] = useState("");
  const [pollinationsModel, setPollinationsModel] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [imageModels, setImageModels] = useState<PollinationsModel[]>([]);

  useEffect(() => {
    if (settings) {
      setPollinationsApiKey(settings.pollinationsApiKey || "");
      setPollinationsModel(settings.pollinationsModel || "");
    }
    fetchModels();
  }, [settings]);

  const fetchModels = async () => {
    setIsLoadingModels(true);
    try {
      const res = await fetch("/api/settings/pollinations-models");
      const data = await res.json();
      if (res.ok && data.success) {
        setImageModels(data.imageModels || []);
      }
    } catch {
      // Fallback in case of fetch failure
      setImageModels([
        { id: "flux", name: "Flux", description: "Default image generator" },
        { id: "sana", name: "Sana", description: "Fast image generator" }
      ]);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollinationsApiKey, pollinationsModel }),
      });

      if (res.ok) {
        toast.success("Configuration Pollinations.ai enregistrée avec succès.");
        onUpdate();
      } else {
        toast.error("Erreur lors de l'enregistrement.");
      }
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/settings/test-pollinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollinationsApiKey }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setTestResult({ success: true, message: data.message });
        toast.success("Test de connexion Pollinations.ai réussi !");
      } else {
        const detail = data.details ? ` (${data.details})` : "";
        setTestResult({
          success: false,
          message: (data.error || "La connexion a échoué.") + detail,
        });
        toast.error("Échec du test de connexion.");
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: "Impossible de se connecter au serveur de test.",
      });
      toast.error("Une erreur réseau est survenue.");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Key className="w-5 h-5 text-indigo-500" />
          Configuration API Pollinations.ai
        </CardTitle>
        <CardDescription>
          Configurez vos identifiants pour utiliser Pollinations.ai pour la génération des images à la une.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Help box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
          <p className="font-semibold flex items-center gap-1.5 mb-1 text-blue-900">
            <AlertCircle className="w-4 h-4" /> Utilisation de l'API Pollinations
          </p>
          <p className="leading-relaxed">
            Pollinations.ai peut fonctionner sans clé API, mais pour des limites d'utilisation plus élevées et des performances optimales, 
            vous pouvez générer une clé API sur{" "}
            <a
              href="https://enter.pollinations.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium hover:text-blue-950 transition-colors"
            >
              enter.pollinations.ai
            </a>.
          </p>
        </div>

        {/* API Key input */}
        <div className="space-y-2">
          <Label htmlFor="pollinationsApiKey" className="text-slate-700 font-medium">
            Clé API Pollinations.ai (Facultatif)
          </Label>
          <div className="relative">
            <Input
              id="pollinationsApiKey"
              type={showKey ? "text" : "password"}
              value={pollinationsApiKey}
              onChange={(e) => setPollinationsApiKey(e.target.value)}
              placeholder="Saisissez votre clé API Pollinations (sk_... ou pk_...)"
              className="pe-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Test result */}
        {testResult && (
          <div
            className={`flex items-start gap-2.5 rounded-xl border p-4 text-sm transition-all duration-300 ${
              testResult.success
                ? "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                : "bg-rose-50/50 border-rose-100 text-rose-800"
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="font-semibold text-slate-900 mb-0.5">
                {testResult.success ? "Connexion réussie" : "Connexion échouée"}
              </p>
              <p className="opacity-90">{testResult.message}</p>
            </div>
          </div>
        )}

        {/* Model Selection */}
        <div className="pt-5 border-t border-slate-100 space-y-4">
          <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-fuchsia-500" />
            Sélection du modèle d'image
          </h4>

          {isLoadingModels ? (
            <div className="flex items-center gap-2 text-sm text-slate-500 py-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Chargement des modèles disponibles…
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="pollinationsModel" className="text-slate-700 font-medium">
                Modèle de génération d'images
              </Label>
              <div className="relative">
                <select
                  id="pollinationsModel"
                  value={pollinationsModel}
                  onChange={(e) => setPollinationsModel(e.target.value)}
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 pe-9 text-sm text-slate-900 shadow-sm focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none appearance-none cursor-pointer transition-colors hover:border-slate-300"
                >
                  <option value="">— Sélectionner un modèle (flux par défaut) —</option>
                  {imageModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {pollinationsModel && (
                <p className="text-xs text-slate-400 font-mono">{pollinationsModel}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-slate-100 bg-slate-50/50 pt-4 rounded-b-xl">
        <Button
          variant="outline"
          onClick={handleTest}
          disabled={isTesting || isSaving}
          className="border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors rounded-lg"
        >
          {isTesting && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
          Tester la clé API
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving || isTesting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors rounded-lg"
        >
          {isSaving && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
}
