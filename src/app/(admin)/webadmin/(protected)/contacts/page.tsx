"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { contactsColumns, ContactMessage, statusConfig } from "./columns";
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
import { Mail, Calendar, User, FileText, CheckCircle, Trash2, MailOpen, AlertCircle, Loader2 } from "lucide-react";

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/contact");
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des messages.");
      }
      const data = await res.json();
      if (data.success && data.contacts) {
        setContacts(data.contacts);
      } else {
        throw new Error(data.error || "Une erreur est survenue.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Impossible de charger les messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Update status of a contact message
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Erreur de modification du statut.");

      const data = await res.json();
      if (data.success) {
        // Update local state
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
        // If the updated contact is the currently selected one, update the dialog content too
        if (selectedContact?.id === id) {
          setSelectedContact((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err: any) {
      alert(err.message || "Erreur lors du changement de statut.");
    }
  };

  // Delete contact message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer définitivement ce message ?")) {
      return;
    }

    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erreur de suppression.");

      const data = await res.json();
      if (data.success) {
        // Update local state
        setContacts((prev) => prev.filter((c) => c.id !== id));
        setSelectedContact(null);
      }
    } catch (err: any) {
      alert(err.message || "Erreur lors de la suppression.");
    }
  };

  // Filter messages
  const filteredContacts = contacts.filter((c) => {
    if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
    return true;
  });

  // Calculate stats
  const countNew = contacts.filter((c) => c.status === "NEW").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Contactez-nous
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des messages de contact soumis par les utilisateurs
          </p>
        </div>
        <div className="flex items-center gap-2">
          {countNew > 0 && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 animate-pulse">
              {countNew} nouveau{countNew > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin text-slate-600 mb-2" />
          <p className="text-sm text-slate-500">Chargement des messages...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-red-50 rounded-xl border border-red-200 p-8 text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mb-2" />
          <h3 className="text-red-800 font-semibold mb-1">Erreur de chargement</h3>
          <p className="text-sm text-red-700 max-w-md">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchContacts} className="mt-4 border-red-200 bg-white hover:bg-red-50 text-red-700">
            Réessayer
          </Button>
        </div>
      ) : (
        <DataTable
          columns={contactsColumns}
          data={filteredContacts}
          searchKey="name"
          searchPlaceholder="Rechercher par expéditeur..."
          filterComponent={
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "ALL")}>
              <SelectTrigger className="w-[180px] h-9 bg-white text-sm">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tous les statuts</SelectItem>
                <SelectItem value="NEW">Nouveau</SelectItem>
                <SelectItem value="READ">Lu</SelectItem>
                <SelectItem value="REPLIED">Répondu</SelectItem>
              </SelectContent>
            </Select>
          }
          // We define custom options meta for our columns cells inside the tanstack table
          {...{
            meta: {
              onViewDetail: (contact: ContactMessage) => {
                setSelectedContact(contact);
                // Auto-mark as READ if it is currently NEW when viewed
                if (contact.status === "NEW") {
                  handleUpdateStatus(contact.id, "READ");
                }
              },
              onUpdateStatus: handleUpdateStatus,
              onDeleteMessage: handleDeleteMessage,
            },
          } as any}
        />
      )}

      {/* Contact Detail Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-lg bg-white rounded-xl shadow-xl">
          {selectedContact && (
            <>
              <DialogHeader className="space-y-1">
                <div className="flex items-center gap-3">
                  <DialogTitle className="text-lg font-bold text-slate-900 leading-tight truncate max-w-[320px]">
                    {selectedContact.subject}
                  </DialogTitle>
                  <Badge
                    variant="outline"
                    className={
                      statusConfig[selectedContact.status]?.className ||
                      "bg-slate-100 text-slate-700"
                    }
                  >
                    {statusConfig[selectedContact.status]?.label || selectedContact.status}
                  </Badge>
                </div>
                <DialogDescription className="text-xs text-slate-500">
                  Détail du message reçu du formulaire de contact
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Meta details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`mailto:${selectedContact.email}`} className="truncate hover:underline text-blue-600">
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 col-span-1 sm:col-span-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      {new Date(selectedContact.createdAt).toLocaleString("fr-FR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Message
                  </span>
                  <div className="text-sm text-slate-700 leading-relaxed bg-white rounded-lg p-4 border border-slate-200 whitespace-pre-wrap max-h-[220px] overflow-y-auto shadow-inner">
                    {selectedContact.message}
                  </div>
                </div>

                <Separator />

                {/* Footer Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteMessage(selectedContact.id)}
                  >
                    <Trash2 className="w-4 h-4 me-1.5" />
                    Supprimer
                  </Button>

                  <div className="flex gap-2">
                    {selectedContact.status !== "NEW" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-200 text-amber-600 hover:bg-amber-50"
                        onClick={() => handleUpdateStatus(selectedContact.id, "NEW")}
                      >
                        Marquer Nouveau
                      </Button>
                    )}
                    {selectedContact.status !== "READ" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => handleUpdateStatus(selectedContact.id, "READ")}
                      >
                        Marquer Lu
                      </Button>
                    )}
                    {selectedContact.status !== "REPLIED" && (
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleUpdateStatus(selectedContact.id, "REPLIED")}
                      >
                        <CheckCircle className="w-4 h-4 me-1.5" />
                        Marquer Répondu
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
