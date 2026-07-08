"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Key, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles, ImageIcon, ChevronDown } from "lucide-react";

interface GeminiModel {
  id: string;
  name: string;
  description: string;
}

interface PollinationsModel {
  id: string;
  name: string;
  description: string;
}

interface TabApiProps {
  settings: any;
  onUpdate: () => void;
}

export default function TabApi({ settings, onUpdate }: TabApiProps) {
  // ── Google AI Studio state ──
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [geminiContentModel, setGeminiContentModel] = useState("");
  const [geminiImageModel, setGeminiImageModel] = useState("");
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [isSavingGemini, setIsSavingGemini] = useState(false);
  const [isTestingGemini, setIsTestingGemini] = useState(false);
  const [isLoadingGeminiModels, setIsLoadingGeminiModels] = useState(false);
  const [geminiTestResult, setGeminiTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [contentModels, setContentModels] = useState<GeminiModel[]>([]);
  const [imageModels, setImageModels] = useState<GeminiModel[]>([]);

  // ── Pollinations state ──
  const [pollinationsApiKey, setPollinationsApiKey] = useState("");
  const [pollinationsModel, setPollinationsModel] = useState("");
  const [showPollinationsKey, setShowPollinationsKey] = useState(false);
  const [isSavingPollinations, setIsSavingPollinations] = useState(false);
  const [isTestingPollinations, setIsTestingPollinations] = useState(false);
  const [isLoadingPollinationsModels, setIsLoadingPollinationsModels] = useState(false);
  const [pollinationsTestResult, setPollinationsTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [pollinationsImageModels, setPollinationsImageModels] = useState<PollinationsModel[]>([]);

  // ── Effects ──
  useEffect(() => {
    if (settings) {
      // Gemini
      setGeminiApiKey(settings.geminiApiKey || "");
      setGeminiContentModel(settings.geminiContentModel || "");
      setGeminiImageModel(settings.geminiImageModel || "");
      if (settings.geminiApiKey) {
        fetchGeminiModels(settings.geminiApiKey);
      }

      // Pollinations
      setPollinationsApiKey(settings.pollinationsApiKey || "");
      setPollinationsModel(settings.pollinationsModel || "");
    }
    fetchPollinationsModels();
  }, [settings]);

  // ── Google AI Studio handlers ──
  const fetchGeminiModels = async (apiKey: string) => {
    setIsLoadingGeminiModels(true);
    try {
      const res = await fetch("/api/settings/gemini-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geminiApiKey: apiKey }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContentModels(data.contentModels || []);
        setImageModels(data.imageModels || []);
      }
    } catch {
      // Silently fail — models will just be empty
    } finally {
      setIsLoadingGeminiModels(false);
    }
  };

  const handleSaveGemini = async () => {
    setIsSavingGemini(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geminiApiKey, geminiContentModel, geminiImageModel }),
      });
      if (res.ok) {
        toast.success("Configuration API Google AI Studio enregistrée avec succès.");
        onUpdate();
      } else {
        toast.error("Erreur lors de l'enregistrement.");
      }
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setIsSavingGemini(false);
    }
  };

  const handleTestGemini = async () => {
    if (!geminiApiKey.trim()) {
      toast.error("Veuillez saisir une clé API avant de tester.");
      return;
    }
    setIsTestingGemini(true);
    setGeminiTestResult(null);
    try {
      const res = await fetch("/api/settings/test-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geminiApiKey }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGeminiTestResult({ success: true, message: data.message });
        toast.success("Test de la clé API réussi !");
        fetchGeminiModels(geminiApiKey);
      } else {
        const detail = data.details ? ` (${data.details})` : "";
        setGeminiTestResult({
          success: false,
          message: (data.error || "La clé API semble invalide.") + detail,
        });
        toast.error("Échec du test de la clé API.");
        setContentModels([]);
        setImageModels([]);
      }
    } catch (err) {
      setGeminiTestResult({
        success: false,
        message: "Impossible de se connecter au serveur de test.",
      });
      toast.error("Une erreur réseau est survenue.");
    } finally {
      setIsTestingGemini(false);
    }
  };

  // ── Pollinations handlers ──
  const fetchPollinationsModels = async () => {
    setIsLoadingPollinationsModels(true);
    try {
      const res = await fetch("/api/settings/pollinations-models");
      const data = await res.json();
      if (res.ok && data.success) {
        setPollinationsImageModels(data.imageModels || []);
      }
    } catch {
      setPollinationsImageModels([
        { id: "flux", name: "Flux", description: "Default image generator" },
        { id: "sana", name: "Sana", description: "Fast image generator" },
      ]);
    } finally {
      setIsLoadingPollinationsModels(false);
    }
  };

  const handleSavePollinations = async () => {
    setIsSavingPollinations(true);
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
      setIsSavingPollinations(false);
    }
  };

  const handleTestPollinations = async () => {
    setIsTestingPollinations(true);
    setPollinationsTestResult(null);
    try {
      const res = await fetch("/api/settings/test-pollinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollinationsApiKey }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPollinationsTestResult({ success: true, message: data.message });
        toast.success("Test de connexion Pollinations.ai réussi !");
      } else {
        const detail = data.details ? ` (${data.details})` : "";
        setPollinationsTestResult({
          success: false,
          message: (data.error || "La connexion a échoué.") + detail,
        });
        toast.error("Échec du test de connexion.");
      }
    } catch (err) {
      setPollinationsTestResult({
        success: false,
        message: "Impossible de se connecter au serveur de test.",
      });
      toast.error("Une erreur réseau est survenue.");
    } finally {
      setIsTestingPollinations(false);
    }
  };

  const hasGeminiModels = contentModels.length > 0 || imageModels.length > 0;

  return (
    <div className="space-y-6">
      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── Card 1: Google AI Studio ── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Card className="border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Key className="w-5 h-5 text-indigo-500" />
            Configuration API Google AI Studio
          </CardTitle>
          <CardDescription>
            Configurez votre clé d'API Gemini pour activer la génération automatique de contenu et d'images.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Help box */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-semibold flex items-center gap-1.5 mb-1 text-blue-900">
              <AlertCircle className="w-4 h-4" /> Où trouver votre clé API ?
            </p>
            <p className="leading-relaxed">
              Vous pouvez générer une clé API gratuite ou payante sur la console{" "}
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium hover:text-blue-950 transition-colors"
              >
                Google AI Studio
              </a>. Cette clé permet à la plateforme de communiquer avec les modèles d'intelligence artificielle de Google.
            </p>
          </div>

          {/* API Key input */}
          <div className="space-y-2">
            <Label htmlFor="geminiApiKey" className="text-slate-700 font-medium">
              Clé API Gemini (Google AI Studio)
            </Label>
            <div className="relative">
              <Input
                id="geminiApiKey"
                type={showGeminiKey ? "text" : "password"}
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="Saisissez votre clé API AI Studio (AIzaSy...)"
                className="pe-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowGeminiKey(!showGeminiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Test result */}
          {geminiTestResult && (
            <div
              className={`flex items-start gap-2.5 rounded-xl border p-4 text-sm transition-all duration-300 ${
                geminiTestResult.success
                  ? "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                  : "bg-rose-50/50 border-rose-100 text-rose-800"
              }`}
            >
              {geminiTestResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              )}
              <div>
                <p className="font-semibold text-slate-900 mb-0.5">
                  {geminiTestResult.success ? "Clé API valide" : "Clé API invalide"}
                </p>
                <p className="opacity-90">{geminiTestResult.message}</p>
              </div>
            </div>
          )}

          {/* Model Selection — shown when models are loaded */}
          {(hasGeminiModels || isLoadingGeminiModels) && (
            <div className="pt-5 border-t border-slate-100">
              <h4 className="font-semibold text-sm text-slate-900 mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Sélection des modèles
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Choisissez les modèles Gemini à utiliser pour la génération de contenu et d'images.
              </p>

              {isLoadingGeminiModels ? (
                <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Chargement des modèles disponibles…
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Content generation model */}
                  <div className="space-y-2">
                    <Label htmlFor="geminiContentModel" className="text-slate-700 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      Modèle de génération de contenu
                    </Label>
                    <div className="relative">
                      <select
                        id="geminiContentModel"
                        value={geminiContentModel}
                        onChange={(e) => setGeminiContentModel(e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 pe-9 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none appearance-none cursor-pointer transition-colors hover:border-slate-300"
                      >
                        <option value="">— Sélectionner un modèle —</option>
                        {contentModels.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {geminiContentModel && (
                      <p className="text-xs text-slate-400 font-mono">{geminiContentModel}</p>
                    )}
                  </div>

                  {/* Image generation model */}
                  <div className="space-y-2">
                    <Label htmlFor="geminiImageModel" className="text-slate-700 font-medium flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-fuchsia-500" />
                      Modèle de génération d'images
                    </Label>
                    <div className="relative">
                      <select
                        id="geminiImageModel"
                        value={geminiImageModel}
                        onChange={(e) => setGeminiImageModel(e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 pe-9 text-sm text-slate-900 shadow-sm focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none appearance-none cursor-pointer transition-colors hover:border-slate-300"
                      >
                        <option value="">— Sélectionner un modèle —</option>
                        {imageModels.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {geminiImageModel && (
                      <p className="text-xs text-slate-400 font-mono">{geminiImageModel}</p>
                    )}
                    {imageModels.length === 0 && !isLoadingGeminiModels && (
                      <p className="text-xs text-amber-600">
                        Aucun modèle d'image trouvé. L'API Imagen doit être activée dans votre projet Google Cloud.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-100 bg-slate-50/50 pt-4 rounded-b-xl">
          <Button
            variant="outline"
            onClick={handleTestGemini}
            disabled={isTestingGemini || isSavingGemini}
            className="border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors rounded-lg"
          >
            {isTestingGemini && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
            Tester la clé API
          </Button>
          <Button
            onClick={handleSaveGemini}
            disabled={isSavingGemini || isTestingGemini}
            className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors rounded-lg"
          >
            {isSavingGemini && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
            Enregistrer
          </Button>
        </CardFooter>
      </Card>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ── Card 2: Pollinations.ai ── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Card className="border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Sparkles className="w-5 h-5 text-indigo-500" />
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
                type={showPollinationsKey ? "text" : "password"}
                value={pollinationsApiKey}
                onChange={(e) => setPollinationsApiKey(e.target.value)}
                placeholder="Saisissez votre clé API Pollinations (sk_... ou pk_...)"
                className="pe-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPollinationsKey(!showPollinationsKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPollinationsKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Test result */}
          {pollinationsTestResult && (
            <div
              className={`flex items-start gap-2.5 rounded-xl border p-4 text-sm transition-all duration-300 ${
                pollinationsTestResult.success
                  ? "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                  : "bg-rose-50/50 border-rose-100 text-rose-800"
              }`}
            >
              {pollinationsTestResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              )}
              <div>
                <p className="font-semibold text-slate-900 mb-0.5">
                  {pollinationsTestResult.success ? "Connexion réussie" : "Connexion échouée"}
                </p>
                <p className="opacity-90">{pollinationsTestResult.message}</p>
              </div>
            </div>
          )}

          {/* Model Selection */}
          <div className="pt-5 border-t border-slate-100 space-y-4">
            <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-fuchsia-500" />
              Sélection du modèle d'image
            </h4>

            {isLoadingPollinationsModels ? (
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
                    {pollinationsImageModels.map((model) => (
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
            onClick={handleTestPollinations}
            disabled={isTestingPollinations || isSavingPollinations}
            className="border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors rounded-lg"
          >
            {isTestingPollinations && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
            Tester la clé API
          </Button>
          <Button
            onClick={handleSavePollinations}
            disabled={isSavingPollinations || isTestingPollinations}
            className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors rounded-lg"
          >
            {isSavingPollinations && <Loader2 className="w-4 h-4 me-2 animate-spin" />}
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
