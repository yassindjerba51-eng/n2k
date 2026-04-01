"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FlaskConical, ShieldAlert, Clock, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProductCardProps {
  name: string;
  category: "Batiment" | "Eau" | "Ambiance";
  description: string;
  isDisinfectant: boolean;
  dosage: string;
  step: number; 
}

export default function ProductCard({
  name,
  category,
  description,
  isDisinfectant,
  dosage,
  step,
}: ProductCardProps) {
  const t = useTranslations("solutions");

  return (
    <div className="bg-surface-lowest rounded-3xl p-8 shadow-ambient border border-border/50 hover:-translate-y-2 transition-transform duration-300 relative flex flex-col h-full">
      {/* Badges */}
      <div className="absolute -top-4 left-6 flex gap-2 rtl:left-auto rtl:right-6 rtl:flex-row-reverse">
        {step === 1 ? (
          <Badge className="bg-secondary hover:bg-secondary text-white border-2 border-surface-lowest shadow-md flex items-center gap-1.5 px-3 py-1 font-heading text-[10px] tracking-wider uppercase">
            <Clock className="w-3.5 h-3.5" />
            Étape 1: Nettoyage
          </Badge>
        ) : (
          <Badge className="bg-primary hover:bg-primary text-white border-2 border-surface-lowest shadow-md flex items-center gap-1.5 px-3 py-1 font-heading text-[10px] tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Étape 2: Désinfection
          </Badge>
        )}
        {isDisinfectant && (
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-primary border-primary/20 text-[10px] uppercase font-black px-2">
            BIO-CLEAN
          </Badge>
        )}
      </div>

      {/* Category Indicator */}
      <div className="mb-6 mt-4">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant font-body block mb-2">
          {t("category")}: {category}
        </span>
        <h3 className="text-2xl font-black font-heading text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent w-max">
          {name}
        </h3>
      </div>

      <p className="text-on-surface-variant leading-relaxed font-body mb-8 flex-1">
        {description}
      </p>

      {/* Dosage Details */}
      <div className="bg-surface-container/50 rounded-2xl p-4 mt-auto">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-primary block mb-1 uppercase tracking-wider font-heading">
              {t("recommendedDosage")}
            </span>
            <p className="text-sm font-body text-on-surface-variant">
              {dosage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
