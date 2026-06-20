"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, BadgeCheck } from "lucide-react";

type Props = {
  /** "default" = full labels, "compact" = short labels for cards */
  variant?: "default" | "compact";
  /** "brand" = colored badges for light backgrounds, "light" = translucent for dark backgrounds */
  tone?: "brand" | "light";
  className?: string;
};

export default function HomologationBadges({
  variant = "default",
  tone = "brand",
  className = "",
}: Props) {
  const t = useTranslations("homologation");
  const compact = variant === "compact";

  const sante = compact ? t("badgeSanteShort") : t("badgeSante");
  const agri = compact ? t("badgeAgricultureShort") : t("badgeAgriculture");

  const sizeClasses = compact
    ? "text-[10px] px-2 py-0.5 gap-1"
    : "text-xs px-3 py-1.5 gap-1.5";
  const iconSize = compact ? "w-3 h-3" : "w-4 h-4";

  const santeTone =
    tone === "light"
      ? "bg-white/15 text-white border border-white/20"
      : "bg-n2k-secondary/10 text-n2k-secondary";
  const agriTone =
    tone === "light"
      ? "bg-white/15 text-white border border-white/20"
      : "bg-n2k-primary/10 text-n2k-primary";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span
        className={`inline-flex items-center font-bold font-heading rounded-full ${sizeClasses} ${santeTone}`}
      >
        <ShieldCheck className={`${iconSize} shrink-0`} />
        {sante}
      </span>
      <span
        className={`inline-flex items-center font-bold font-heading rounded-full ${sizeClasses} ${agriTone}`}
      >
        <BadgeCheck className={`${iconSize} shrink-0`} />
        {agri}
      </span>
    </div>
  );
}
