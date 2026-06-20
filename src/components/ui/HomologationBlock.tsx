"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, BadgeCheck, Landmark, CheckCircle2 } from "lucide-react";
import { homologations } from "@/data/homologations";

type Props = {
  /** Product slug to emphasise among the listed approval numbers. */
  highlightSlug?: string;
  className?: string;
};

export default function HomologationBlock({ highlightSlug, className = "" }: Props) {
  const t = useTranslations("homologation");
  const entries = Object.entries(homologations);

  return (
    <section
      className={`bg-n2k-surface-lowest rounded-3xl p-8 md:p-10 shadow-ambient ghost-border ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-n2k-secondary/10 flex items-center justify-center shrink-0">
          <Landmark className="w-6 h-6 text-n2k-secondary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight">
          {t("blockTitle")}
        </h2>
      </div>

      <p className="text-n2k-on-surface-variant font-body leading-relaxed mb-6">
        {t("blockIntro")}
      </p>

      {/* Benefits */}
      <p className="text-xs font-black uppercase tracking-[0.15em] text-n2k-on-surface-variant/60 mb-3">
        {t("benefitsLabel")}
      </p>
      <ul className="space-y-3 mb-6">
        <li className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-n2k-secondary shrink-0 mt-0.5" />
          <span className="text-n2k-on-surface font-body font-medium">{t("benefitSante")}</span>
        </li>
        <li className="flex items-start gap-3">
          <BadgeCheck className="w-5 h-5 text-n2k-primary shrink-0 mt-0.5" />
          <span className="text-n2k-on-surface font-body font-medium">{t("benefitAgriculture")}</span>
        </li>
      </ul>

      <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-8">
        {t("blockConclusion")}
      </p>

      {/* Official approval numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entries.map(([slug, h]) => {
          const highlighted = highlightSlug === slug;
          return (
            <div
              key={slug}
              className={`rounded-2xl p-5 ${
                highlighted
                  ? "bg-n2k-secondary/10 ring-1 ring-n2k-secondary/30"
                  : "bg-n2k-surface-low"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-n2k-secondary shrink-0" />
                <span className="text-sm font-black font-heading text-n2k-primary">
                  {slug.toUpperCase()}
                </span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-n2k-on-surface-variant/60 mb-1">
                {t("numberLabel")}
              </div>
              <div className="font-mono text-sm font-bold text-n2k-on-surface break-all" dir="ltr">
                {h.number}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
