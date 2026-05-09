"use client";

import { Link } from "@/i18n/navigation";
import { Building2, Droplets, Wind } from "lucide-react";

const zones = [
  {
    key: "batiment",
    href: "/problemes-solutions/batiment",
    Icon: Building2,
    label: "Le Bâtiment",
    color: "bg-[#0D7ED0]",
    activeText: "text-white",
  },
  {
    key: "canalisations-eau",
    href: "/problemes-solutions/canalisations-eau",
    Icon: Droplets,
    label: "L'Eau",
    color: "bg-n2k-primary",
    activeText: "text-white",
  },
  {
    key: "ambiance",
    href: "/problemes-solutions/ambiance",
    Icon: Wind,
    label: "L'Ambiance",
    color: "bg-n2k-orange",
    activeText: "text-white",
  },
];

export default function ZoneNav({ activeZone }: { activeZone: string }) {
  return (
    <nav className="flex flex-wrap gap-2">
      {zones.map((zone) => {
        const isActive = zone.key === activeZone;
        return (
          <Link
            key={zone.key}
            href={zone.href as any}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold font-heading tracking-tight transition-all border ${
              isActive
                ? `${zone.color} ${zone.activeText} border-transparent shadow-lg`
                : "bg-white text-n2k-on-surface-variant border-border/50 hover:border-n2k-primary/30 hover:bg-n2k-primary/5"
            }`}
          >
            <zone.Icon className="w-4 h-4" />
            {zone.label}
          </Link>
        );
      })}
    </nav>
  );
}
