"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  MailOpen,
  MessageSquare,
  RotateCcw,
  Trash2,
} from "lucide-react";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export const statusConfig: Record<string, { label: string; className: string }> = {
  NEW: {
    label: "Nouveau",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  READ: {
    label: "Lu",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  REPLIED: {
    label: "Répondu",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
};

export const contactsColumns: ColumnDef<ContactMessage>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="px-0 hover:bg-transparent text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ms-1.5 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-slate-600">
        {new Date(row.getValue("createdAt")).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Expéditeur",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-slate-800">{row.original.name}</p>
        <p className="text-xs text-slate-500">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Objet",
    cell: ({ row }) => (
      <span className="text-sm text-slate-700 font-medium block max-w-[240px] truncate">
        {row.getValue("subject")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const config = statusConfig[status] || {
        label: status,
        className: "bg-slate-100 text-slate-700 border-slate-200",
      };
      return (
        <Badge variant="outline" className={config.className}>
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value === "ALL" || row.getValue(id) === value;
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const contact = row.original;
      const meta = table.options.meta as
        | {
            onViewDetail?: (contact: ContactMessage) => void;
            onUpdateStatus?: (id: string, status: string) => void;
            onDeleteMessage?: (id: string) => void;
          }
        | undefined;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          } />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => meta?.onViewDetail?.(contact)}>
                <Eye className="w-4 h-4 me-2" />
                Voir le détail
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              {contact.status !== "NEW" && (
                <DropdownMenuItem onClick={() => meta?.onUpdateStatus?.(contact.id, "NEW")}>
                  <RotateCcw className="w-4 h-4 me-2 text-amber-600" />
                  Marquer Nouveau
                </DropdownMenuItem>
              )}
              {contact.status !== "READ" && (
                <DropdownMenuItem onClick={() => meta?.onUpdateStatus?.(contact.id, "READ")}>
                  <MailOpen className="w-4 h-4 me-2 text-blue-600" />
                  Marquer Lu
                </DropdownMenuItem>
              )}
              {contact.status !== "REPLIED" && (
                <DropdownMenuItem onClick={() => meta?.onUpdateStatus?.(contact.id, "REPLIED")}>
                  <MessageSquare className="w-4 h-4 me-2 text-emerald-600" />
                  Marquer Répondu
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem
                onClick={() => meta?.onDeleteMessage?.(contact.id)}
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <Trash2 className="w-4 h-4 me-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
