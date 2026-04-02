"use client";

import { useState } from "react";
import { mockLeads, type MockLead } from "@/lib/admin-mock-data";
import { DataTable } from "@/components/admin/DataTable";
import { leadsColumns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building2,
  FileDown,
} from "lucide-react";

const statusLabels: Record<string, { label: string; className: string }> = {
  NEW: { label: "Nouveau", className: "bg-amber-100 text-amber-700 border-amber-200" },
  CONTACTED: { label: "Contacté", className: "bg-blue-100 text-blue-700 border-blue-200" },
  DONE: { label: "Terminé", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
};

const zoneLabels: Record<string, { label: string; className: string }> = {
  BATIMENT: { label: "Bâtiment", className: "bg-blue-50 text-blue-700 border-blue-200" },
  EAU: { label: "Eau", className: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  AMBIANCE: { label: "Ambiance", className: "bg-orange-50 text-orange-700 border-orange-200" },
};

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<MockLead | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [zoneFilter, setZoneFilter] = useState("ALL");

  const filteredLeads = mockLeads.filter((lead) => {
    if (statusFilter !== "ALL" && lead.status !== statusFilter) return false;
    if (zoneFilter !== "ALL" && lead.problemType !== zoneFilter) return false;
    return true;
  });

  const columnsWithMeta = leadsColumns;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Leads & Diagnostics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des demandes de diagnostic terrain
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            {mockLeads.filter((l) => l.status === "NEW").length} nouveaux
          </Badge>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columnsWithMeta}
        data={filteredLeads}
        searchKey="name"
        searchPlaceholder="Rechercher par exploitation..."
        filterComponent={
          <>
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "ALL")}>
              <SelectTrigger className="w-[150px] h-9 bg-white text-sm">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tous les statuts</SelectItem>
                <SelectItem value="NEW">Nouveau</SelectItem>
                <SelectItem value="CONTACTED">Contacté</SelectItem>
                <SelectItem value="DONE">Terminé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={zoneFilter} onValueChange={(val) => setZoneFilter(val || "ALL")}>
              <SelectTrigger className="w-[150px] h-9 bg-white text-sm">
                <SelectValue placeholder="Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Toutes les zones</SelectItem>
                <SelectItem value="BATIMENT">Bâtiment</SelectItem>
                <SelectItem value="EAU">Eau</SelectItem>
                <SelectItem value="AMBIANCE">Ambiance</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
      />

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg">
          {selectedLead && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <DialogTitle className="text-lg">{selectedLead.name}</DialogTitle>
                  <Badge variant="outline" className={statusLabels[selectedLead.status].className}>
                    {statusLabels[selectedLead.status].label}
                  </Badge>
                </div>
                <DialogDescription>
                  Détail de la demande de diagnostic
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Contact info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {selectedLead.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {selectedLead.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {selectedLead.region}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {new Date(selectedLead.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                </div>

                <Separator />

                {/* Farm details */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-700">Exploitation</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-xs text-slate-500">Type d&apos;élevage</span>
                      <p className="text-slate-800 font-medium">{selectedLead.activityType}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Capacité</span>
                      <p className="text-slate-800 font-medium">{selectedLead.capacity}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Zone critique</span>
                      <Badge variant="outline" className={zoneLabels[selectedLead.problemType].className}>
                        {zoneLabels[selectedLead.problemType].label}
                      </Badge>
                    </div>
                    {selectedLead.cycleInfo && (
                      <div>
                        <span className="text-xs text-slate-500">Cycle</span>
                        <p className="text-slate-800 font-medium">{selectedLead.cycleInfo}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedLead.message && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-slate-700">
                        Message du client
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3 border border-slate-100">
                        {selectedLead.message}
                      </p>
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                  >
                    <FileDown className="w-4 h-4 me-1.5" />
                    Exporter PDF
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#0A2540] hover:bg-[#0A2540]/90"
                  >
                    Marquer comme contacté
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
