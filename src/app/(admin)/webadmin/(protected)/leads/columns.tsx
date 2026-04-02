"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MockLead } from "@/lib/admin-mock-data";
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
import { ArrowUpDown, MoreHorizontal, Eye, FileDown, RefreshCw } from "lucide-react";

const statusConfig: Record<string, { label: string; className: string }> = {
  NEW: {
    label: "Nouveau",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  CONTACTED: {
    label: "Contacté",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  DONE: {
    label: "Terminé",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
};

const zoneConfig: Record<string, { label: string; className: string }> = {
  BATIMENT: {
    label: "Bâtiment",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  EAU: {
    label: "Eau",
    className: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  AMBIANCE: {
    label: "Ambiance",
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },
};

export const leadsColumns: ColumnDef<MockLead>[] = [
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
        })}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Exploitation",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-slate-800">{row.original.name}</p>
        <p className="text-xs text-slate-500">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "activityType",
    header: "Type d'élevage",
    cell: ({ row }) => (
      <span className="text-sm text-slate-600">{row.getValue("activityType")}</span>
    ),
  },
  {
    accessorKey: "region",
    header: "Région",
    cell: ({ row }) => (
      <span className="text-sm text-slate-600">{row.getValue("region")}</span>
    ),
  },
  {
    accessorKey: "problemType",
    header: "Zone critique",
    cell: ({ row }) => {
      const zone = row.getValue("problemType") as string;
      const config = zoneConfig[zone];
      return (
        <Badge variant="outline" className={config?.className}>
          {config?.label ?? zone}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value === "ALL" || row.getValue(id) === value;
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const config = statusConfig[status];
      return (
        <Badge variant="outline" className={config?.className}>
          {config?.label ?? status}
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
      const lead = row.original;
      const meta = table.options.meta as { onViewDetail?: (lead: MockLead) => void } | undefined;

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
              <DropdownMenuItem onClick={() => meta?.onViewDetail?.(lead)}>
                <Eye className="w-4 h-4 me-2" />
                Voir le détail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()}>
                <FileDown className="w-4 h-4 me-2" />
                Exporter PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <RefreshCw className="w-4 h-4 me-2" />
                Changer le statut
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
