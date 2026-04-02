"use client";

import { useState } from "react";
import { mockProtocols, mockProducts, type MockProtocol } from "@/lib/admin-mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Building2,
  Droplets,
  Wind,
  ArrowRight,
  Pencil,
  FlaskConical,
  CheckCircle2,
  Package,
} from "lucide-react";

const zoneConfig = {
  BATIMENT: { label: "Bâtiment", icon: Building2, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  EAU: { label: "Eau", icon: Droplets, color: "text-cyan-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-200" },
  AMBIANCE: { label: "Ambiance", icon: Wind, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
};

export default function ProtocolesPage() {
  const [editingProtocol, setEditingProtocol] = useState<MockProtocol | null>(null);
  const [activeTab, setActiveTab] = useState("BATIMENT");
  const [protocols, setProtocols] = useState(mockProtocols);

  const filteredProtocols = protocols.filter((p) => p.zone === activeTab);

  const getProductBySlug = (slug: string) =>
    mockProducts.find((p) => p.slug === slug);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Protocoles
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Éditeur de la logique PROBLÈME → PROTOCOLE → PRODUIT par zone
        </p>
      </div>

      {/* Zone Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-slate-200 shadow-sm">
          {(Object.keys(zoneConfig) as Array<keyof typeof zoneConfig>).map((zone) => {
            const config = zoneConfig[zone];
            const Icon = config.icon;
            return (
              <TabsTrigger
                key={zone}
                value={zone}
                className="gap-2 data-[state=active]:shadow-sm"
              >
                <Icon className={`w-4 h-4 ${activeTab === zone ? config.color : "text-slate-400"}`} />
                {config.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {(Object.keys(zoneConfig) as Array<keyof typeof zoneConfig>).map((zone) => (
          <TabsContent key={zone} value={zone} className="mt-4 space-y-4">
            {protocols
              .filter((p) => p.zone === zone)
              .map((protocol) => {
                const zoneConf = zoneConfig[zone];
                return (
                  <Card
                    key={protocol.id}
                    className={`border-slate-200/80 shadow-sm bg-white overflow-hidden`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${zoneConf.bgColor}`}>
                            <FlaskConical className={`w-5 h-5 ${zoneConf.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-base font-semibold text-slate-900">
                              {protocol.problem.fr}
                            </CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Zone {zoneConf.label} • {protocol.productSlugs.length} produit(s) associé(s)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              protocol.isActive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-slate-100 text-slate-500 border-slate-200"
                            }
                          >
                            {protocol.isActive ? "Actif" : "Inactif"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProtocol(protocol)}
                          >
                            <Pencil className="w-3.5 h-3.5 me-1.5" />
                            Modifier
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Protocol flow visualization */}
                      <div className="flex items-stretch gap-3 mt-2">
                        {/* Step 1 */}
                        <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0A2540] text-white text-xs font-bold">
                              1
                            </span>
                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              Étape 1
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-800">
                            {protocol.step1Label.fr}
                          </p>
                          {protocol.productSlugs[0] && (
                            <div className="flex items-center gap-1.5 mt-2">
                              <Package className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-xs font-medium text-emerald-700">
                                {getProductBySlug(protocol.productSlugs[0])?.name}
                              </span>
                              {getProductBySlug(protocol.productSlugs[0])?.isDisinfectant && (
                                <Badge className="text-[9px] px-1.5 py-0 bg-red-100 text-red-700 border-red-200" variant="outline">
                                  Désinfectant
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center">
                          <ArrowRight className="w-5 h-5 text-slate-300" />
                        </div>

                        {/* Step 2 */}
                        <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold">
                              2
                            </span>
                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              Étape 2
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-800">
                            {protocol.step2Label.fr}
                          </p>
                          {protocol.productSlugs[1] && (
                            <div className="flex items-center gap-1.5 mt-2">
                              <Package className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-xs font-medium text-emerald-700">
                                {getProductBySlug(protocol.productSlugs[1])?.name}
                              </span>
                              {getProductBySlug(protocol.productSlugs[1])?.isDisinfectant && (
                                <Badge className="text-[9px] px-1.5 py-0 bg-red-100 text-red-700 border-red-200" variant="outline">
                                  Désinfectant
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Protocol Dialog */}
      <Dialog open={!!editingProtocol} onOpenChange={() => setEditingProtocol(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {editingProtocol && (
            <div key={editingProtocol.id}>
              <DialogHeader>
                <DialogTitle>Modifier le protocole</DialogTitle>
                <DialogDescription>
                  Zone {zoneConfig[editingProtocol.zone].label} — Édition du contenu multilingue
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Problem description - multilingual */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">🎯</span>
                    Problème identifié
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-slate-500">Français</Label>
                      <Input defaultValue={editingProtocol.problem.fr} className="bg-white" />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">English</Label>
                      <Input defaultValue={editingProtocol.problem.en} className="bg-white" />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">العربية</Label>
                      <Input defaultValue={editingProtocol.problem.ar} className="bg-white" dir="rtl" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 1 */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0A2540] text-white flex items-center justify-center text-xs font-bold">1</span>
                    Étape 1
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-slate-500">Français</Label>
                      <Input defaultValue={editingProtocol.step1Label.fr} className="bg-white" />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">English</Label>
                      <Input defaultValue={editingProtocol.step1Label.en} className="bg-white" />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">العربية</Label>
                      <Input defaultValue={editingProtocol.step1Label.ar} className="bg-white" dir="rtl" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 2 */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                    Étape 2
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-slate-500">Français</Label>
                      <Input defaultValue={editingProtocol.step2Label.fr} className="bg-white" />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">English</Label>
                      <Input defaultValue={editingProtocol.step2Label.en} className="bg-white" />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">العربية</Label>
                      <Input defaultValue={editingProtocol.step2Label.ar} className="bg-white" dir="rtl" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Disinfectant toggle */}
                {editingProtocol.zone === "BATIMENT" && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-700">
                      Règles métier
                    </h4>
                    {editingProtocol.productSlugs.map((slug) => {
                      const product = getProductBySlug(slug);
                      if (!product) return null;
                      const canToggle = slug === "cloragro" || slug === "optimagro";
                      return (
                        <div
                          key={slug}
                          className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Package className="w-4 h-4 text-slate-400" />
                            <div>
                              <p className="text-sm font-medium text-slate-800">{product.name}</p>
                              <p className="text-xs text-slate-500">{product.dosage}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-xs text-slate-500">Désinfectant</Label>
                            <Switch
                              defaultChecked={product.isDisinfectant}
                              disabled={!canToggle}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <p className="text-[11px] text-slate-400 italic">
                      Le statut &quot;Désinfectant&quot; est réservé à CLORAGRO et OPTIMAGRO uniquement.
                    </p>
                  </div>
                )}

                {/* Active toggle */}
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Protocole actif</p>
                    <p className="text-xs text-slate-500">Visible sur le site public</p>
                  </div>
                  <Switch defaultChecked={editingProtocol.isActive} />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setEditingProtocol(null)}>
                    Annuler
                  </Button>
                  <Button className="bg-[#0A2540] hover:bg-[#0A2540]/90" onClick={() => setEditingProtocol(null)}>
                    <CheckCircle2 className="w-4 h-4 me-1.5" />
                    Enregistrer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
