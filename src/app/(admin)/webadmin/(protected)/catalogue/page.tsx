"use client";

import { useState } from "react";
import { mockProducts, type MockProduct } from "@/lib/admin-mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
  Pencil,
  Package,
  CheckCircle2,
  Beaker,
  Shield,
} from "lucide-react";

const zoneConfig = {
  BATIMENT: { label: "Bâtiment", icon: Building2, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  EAU: { label: "Eau", icon: Droplets, color: "text-cyan-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-200" },
  AMBIANCE: { label: "Ambiance", icon: Wind, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
};

const stepLabels: Record<number, string> = {
  1: "Nettoyage / Réduction",
  2: "Désinfection / Stabilisation",
};

export default function CataloguePage() {
  const [editingProduct, setEditingProduct] = useState<MockProduct | null>(null);

  const groupedProducts = {
    BATIMENT: mockProducts.filter((p) => p.category === "BATIMENT"),
    EAU: mockProducts.filter((p) => p.category === "EAU"),
    AMBIANCE: mockProducts.filter((p) => p.category === "AMBIANCE"),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Catalogue
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des 6 produits techniques N2K
          </p>
        </div>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          {mockProducts.length} produits
        </Badge>
      </div>

      {/* Products by Zone */}
      {(Object.keys(groupedProducts) as Array<keyof typeof groupedProducts>).map((zone) => {
        const zoneConf = zoneConfig[zone];
        const ZoneIcon = zoneConf.icon;
        const products = groupedProducts[zone];

        return (
          <div key={zone} className="space-y-3">
            {/* Zone header */}
            <div className="flex items-center gap-2.5">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${zoneConf.bgColor}`}>
                <ZoneIcon className={`w-4 h-4 ${zoneConf.color}`} />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                Zone {zoneConf.label}
              </h2>
              <Badge variant="outline" className="text-[11px] text-slate-500 border-slate-200">
                {products.length} produit(s)
              </Badge>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="border-slate-200/80 shadow-sm bg-white hover:shadow-md transition-shadow group"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A2540] to-[#0A2540]/80 shadow-sm">
                          <Beaker className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 bg-slate-50 text-slate-600 border-slate-200"
                            >
                              Étape {product.step} — {stepLabels[product.step]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {product.description.fr}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Package className="w-3.5 h-3.5" />
                        Dosage : <span className="font-medium text-slate-700">{product.dosage}</span>
                      </div>
                      {product.isDisinfectant && (
                        <Badge className="bg-red-50 text-red-700 border-red-200 text-[10px]" variant="outline">
                          <Shield className="w-3 h-3 me-1" />
                          Désinfectant
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {editingProduct && (
            <>
              <DialogHeader>
                <DialogTitle>Modifier — {editingProduct.name}</DialogTitle>
                <DialogDescription>
                  Zone {zoneConfig[editingProduct.category].label} • Étape {editingProduct.step}
                </DialogDescription>
              </DialogHeader>

              <div key={editingProduct.id} className="space-y-6 mt-4">
                {/* Product info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-slate-500">Nom du produit</Label>
                    <Input defaultValue={editingProduct.name} className="bg-white font-semibold" />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Dosage</Label>
                    <Input defaultValue={editingProduct.dosage ?? ""} className="bg-white" />
                  </div>
                </div>

                <Separator />

                {/* Description - multilingual */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-700">
                    Description multilingue
                  </h4>
                  <div>
                    <Label className="text-xs text-slate-500">Français</Label>
                    <Textarea
                      defaultValue={editingProduct.description.fr}
                      className="bg-white min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">English</Label>
                    <Textarea
                      defaultValue={editingProduct.description.en}
                      className="bg-white min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">العربية</Label>
                    <Textarea
                      defaultValue={editingProduct.description.ar}
                      className="bg-white min-h-[60px]"
                      dir="rtl"
                    />
                  </div>
                </div>

                <Separator />

                {/* Disinfectant toggle */}
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Statut Désinfectant</p>
                    <p className="text-xs text-slate-500">
                      {editingProduct.slug === "cloragro" || editingProduct.slug === "optimagro"
                        ? "Ce produit peut être marqué comme désinfectant"
                        : "Réservé à CLORAGRO et OPTIMAGRO uniquement"}
                    </p>
                  </div>
                  <Switch
                    defaultChecked={editingProduct.isDisinfectant}
                    disabled={
                      editingProduct.slug !== "cloragro" &&
                      editingProduct.slug !== "optimagro"
                    }
                  />
                </div>

                {/* Image URL */}
                <div>
                  <Label className="text-xs text-slate-500">URL de l&apos;image</Label>
                  <Input
                    defaultValue={editingProduct.imageUrl ?? ""}
                    placeholder="https://..."
                    className="bg-white"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setEditingProduct(null)}>
                    Annuler
                  </Button>
                  <Button
                    className="bg-[#0A2540] hover:bg-[#0A2540]/90"
                    onClick={() => setEditingProduct(null)}
                  >
                    <CheckCircle2 className="w-4 h-4 me-1.5" />
                    Enregistrer
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
