"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle,
  ArrowRight,
  Factory,
  Warehouse,
  UtensilsCrossed,
} from "lucide-react";
import type { Sector, ZoneSectorMap } from "@/data/sectors";
import { isHomologatedName } from "@/data/homologations";
import HomologationBadges from "@/components/ui/HomologationBadges";

const sectorIcons: Record<Sector, React.ElementType> = {
  elevage: Warehouse,
  abattoir: UtensilsCrossed,
  agroalimentaire: Factory,
};

/* ─── Product Card (local) ───────────────────────────────────────── */

function SectorProductCard({
  step,
  stepLabel,
  name,
  type,
  desc,
  features,
  colorClass,
  bgClass,
  containerBgClass,
}: {
  step: number;
  stepLabel: string;
  name: string;
  type: string;
  desc: string;
  features: string[];
  colorClass: string;
  bgClass: string;
  containerBgClass: string;
}) {
  return (
    <div className="bg-n2k-surface-lowest rounded-2xl p-5 md:p-6 shadow-ambient ghost-border relative overflow-hidden group">
      {/* Step Badge */}
      <div
        className={`absolute top-0 end-0 ${bgClass} text-white px-4 py-1 rounded-es-xl font-black uppercase tracking-widest text-[10px] font-heading`}
      >
        {stepLabel} {String(step).padStart(2, "0")}
      </div>

      {/* Header */}
      <div className="mb-4 mt-1">
        <h3 className="text-lg md:text-xl font-black font-heading text-n2k-primary">
          {name}
        </h3>
        <p
          className={`${colorClass} font-bold uppercase tracking-widest text-[10px] font-heading`}
        >
          {type}
        </p>
      </div>

      {/* Description */}
      <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-4">
        {desc}
      </p>

      {/* Features */}
      <ul className="space-y-2 font-body text-sm">
        {features.map((feature, fIdx) => (
          <li
            key={fIdx}
            className="flex items-start gap-2 text-n2k-on-surface-variant leading-snug"
          >
            <CheckCircle
              className={`${colorClass} shrink-0 w-4 h-4 mt-0.5`}
            />
            <span className="text-xs md:text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Regulatory approval badges (homologated products only) */}
      {isHomologatedName(name) && (
        <HomologationBadges variant="compact" className="mt-4" />
      )}
    </div>
  );
}

/* ─── Sector Tabs Component ──────────────────────────────────────── */

export default function SectorTabs({
  zoneData,
  stepLabel,
  colorClass,
  bgClass,
  containerBgClass,
  sectorLabels,
  dark,
}: {
  zoneData: ZoneSectorMap;
  stepLabel: string;
  colorClass: string;
  bgClass: string;
  containerBgClass: string;
  sectorLabels: Record<Sector, string>;
  dark?: boolean;
}) {
  const [activeSector, setActiveSector] = useState<Sector>("elevage");
  const data = zoneData[activeSector];

  return (
    <div>
      {/* ── Tab Buttons ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(Object.keys(sectorLabels) as Sector[]).map((sector) => {
          const isActive = activeSector === sector;
          const Icon = sectorIcons[sector];
          return (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold font-heading tracking-tight transition-all border cursor-pointer ${
                isActive
                  ? dark
                    ? "bg-white text-n2k-primary border-white shadow-lg scale-[1.02]"
                    : `${bgClass} text-white border-transparent shadow-lg scale-[1.02]`
                  : dark
                    ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    : "bg-white text-n2k-on-surface-variant border-border/50 hover:border-n2k-primary/30 hover:bg-n2k-primary/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {sectorLabels[sector]}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content: 2 Columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Left column — Product cards */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <SectorProductCard
            step={1}
            stepLabel={stepLabel}
            name={data.product1.name}
            type={data.product1.type}
            desc={data.product1.desc}
            features={data.product1.features}
            colorClass={colorClass}
            bgClass={bgClass}
            containerBgClass={containerBgClass}
          />

          {/* Optional Arrow and Product 2 */}
          {data.product2 && (
            <>
              {/* Arrow */}
              <div className="flex items-center justify-center py-1">
                <div className="w-10 h-10 rounded-full bg-n2k-surface-low flex items-center justify-center shadow-sm">
                  <ArrowRight
                    className={`w-5 h-5 ${colorClass} rotate-90`}
                  />
                </div>
              </div>

              <SectorProductCard
                step={2}
                stepLabel={stepLabel}
                name={data.product2.name}
                type={data.product2.type}
                desc={data.product2.desc}
                features={data.product2.features}
                colorClass={colorClass}
                bgClass={bgClass}
                containerBgClass={containerBgClass}
              />
            </>
          )}
        </div>

        {/* Right column — Sector image */}
        <div className="lg:col-span-5 hidden lg:flex items-center">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
            <Image
              src={data.image}
              alt={`${data.product1.name} — ${sectorLabels[activeSector]}`}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 0px, 40vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
