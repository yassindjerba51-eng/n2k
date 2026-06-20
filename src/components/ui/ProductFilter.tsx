"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedProducts, getLocalizedZones } from "@/data/products";
import { isHomologatedSlug } from "@/data/homologations";
import HomologationBadges from "@/components/ui/HomologationBadges";
import {
  Building2,
  Droplets,
  Wind,
  ArrowRight,
  FlaskConical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const zoneIcons: Record<string, React.ElementType> = {
  "01": Building2,
  "02": Droplets,
  "03": Wind,
};

export default function ProductFilter({ locale }: { locale: string }) {
  const [activeZone, setActiveZone] = useState("all");
  const t = useTranslations("products");

  const products = getLocalizedProducts(locale);
  const zones = getLocalizedZones(locale);

  const filteredProducts =
    activeZone === "all"
      ? products
      : products.filter((p) => p.zone === activeZone || (p.additionalZones && p.additionalZones.includes(activeZone as "01" | "02" | "03")));

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {zones.map((zone) => {
          const isActive = activeZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold font-heading tracking-tight transition-all border ${
                isActive
                  ? "bg-n2k-primary text-white border-n2k-primary shadow-lg scale-[1.02]"
                  : "bg-white text-n2k-on-surface-variant border-border/50 hover:border-n2k-primary/30 hover:bg-n2k-primary/5"
              }`}
            >
              {zone.id === "all" ? t("filterAll") : zone.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const ZoneIcon = zoneIcons[product.zone] || FlaskConical;
          return (
            <Link
              key={product.slug}
              href={`/produits/${product.slug}` as any}
              className="group relative bg-white rounded-2xl border border-border/30 overflow-hidden shadow-ambient hover:shadow-ambient-lg transition-all duration-500 hover:-translate-y-1"
            >
              {/* Top accent bar */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: product.color }}
              />

              <div className="p-6 md:p-8">
                {/* Zone Badge */}
                <div className="flex items-center justify-between mb-6">
                  <Badge
                    variant="outline"
                    className={`${product.accentBg} ${product.accentText} border-0 font-black text-[10px] tracking-[0.15em] uppercase px-3 py-1`}
                  >
                    {product.zoneLabel}
                  </Badge>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${product.color}15` }}
                  >
                    <ZoneIcon
                      className="w-5 h-5"
                      style={{ color: product.color }}
                    />
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-2xl font-black font-heading text-n2k-primary tracking-tight mb-3">
                  {product.name}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-n2k-on-surface-variant font-body leading-relaxed mb-6 line-clamp-3">
                  {product.subtitle}
                </p>

                {/* Regulatory approval badges */}
                {isHomologatedSlug(product.slug) && (
                  <HomologationBadges variant="compact" className="mb-6" />
                )}

                {/* Zone Name */}
                <div className="flex items-center gap-2 mb-6 text-xs font-bold font-heading tracking-wider uppercase text-n2k-on-surface-variant/60">
                  <ZoneIcon className="w-3.5 h-3.5" />
                  {product.zoneName}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-bold font-heading text-n2k-secondary group-hover:gap-3 transition-all">
                  {t("viewProduct")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
