"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from "next-intl";
import { FlaskConical, Beaker, ShieldAlert } from "lucide-react";

export default function InteractiveDosage() {
  const t = useTranslations("solutions");
  const [contaminationLevel, setContaminationLevel] = useState(2); // 1-4 scale

  // Level Logic Map
  const getDosageInfo = (level: number) => {
    switch (level) {
      case 1:
        return {
          label: t("low"),
          color: "text-secondary",
          bg: "bg-secondary-container/20 border-secondary",
          icon: <FlaskConical className="w-10 h-10 text-secondary mb-4" />,
          cloragro: "1% -> Sprayage (200L/1000m²)",
          optimagro: "2% -> Pulvérisation / Thermo",
        };
      case 2:
        return {
          label: t("medium"),
          color: "text-primary",
          bg: "bg-primary-container/10 border-primary",
          icon: <Beaker className="w-10 h-10 text-primary mb-4" />,
          cloragro: "2% -> Canon à mousse (300L/1000m²)",
          optimagro: "2% -> Pulvérisation / Thermo",
        };
      case 3:
        return {
          label: t("high"),
          color: "text-orange",
          bg: "bg-orange-container/20 border-orange",
          icon: <ShieldAlert className="w-10 h-10 text-orange mb-4" />,
          cloragro: "3-4% -> Canon à mousse haute pression",
          optimagro: "2% -> Saturation complète",
        };
      case 4:
        return {
          label: t("critical"),
          color: "text-red-600",
          bg: "bg-red-500/10 border-red-500",
          icon: <ShieldAlert className="w-10 h-10 text-red-600 mb-4" />,
          cloragro: "5% -> Double passage mousse oblig.",
          optimagro: "2% -> Choc Virucide Extrême",
        };
      default:
        return {
          label: t("medium"),
          color: "text-primary",
          bg: "bg-primary-container/10 border-primary",
          icon: <Beaker className="w-10 h-10 text-primary mb-4" />,
          cloragro: "2%",
          optimagro: "1%",
        };
    }
  };

  const { label, color, bg, icon, cloragro, optimagro } = getDosageInfo(contaminationLevel);

  return (
    <div className="bg-surface-lowest rounded-3xl p-8 shadow-ambient ghost-border max-w-3xl mx-auto border-t-4 border-t-primary w-full">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-black font-heading text-primary mb-4">{t("dosageGuide")}</h3>
        <p className="text-on-surface-variant font-body">{t("dosageDesc")}</p>
      </div>

      {/* Slider Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6 px-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant font-heading">
          <span className="cursor-pointer hover:text-secondary transition-colors" onClick={() => setContaminationLevel(1)}>{t("low")}</span>
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setContaminationLevel(2)}>{t("medium")}</span>
          <span className="cursor-pointer hover:text-orange transition-colors" onClick={() => setContaminationLevel(3)}>{t("high")}</span>
          <span className="cursor-pointer hover:text-red-600 transition-colors" onClick={() => setContaminationLevel(4)}>{t("critical")}</span>
        </div>
        <Slider
          defaultValue={[2]}
          max={4}
          min={1}
          step={1}
          value={[contaminationLevel]}
          onValueChange={(val) => {
            const nextVal = Array.isArray(val) ? val[0] : val;
            setContaminationLevel(nextVal);
          }}
          className="w-full"
        />
      </div>

      {/* Results Section */}
      <div className={`rounded-2xl p-8 border ${bg} transition-colors duration-300 md:min-h-[220px] flex gap-8 items-center flex-col md:flex-row rtl:flex-row-reverse`}>
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/20 md:pr-8 md:rtl:pr-0 md:rtl:border-l md:rtl:pl-8 pb-6 md:pb-0 shrink-0">
          {icon}
          <span className={`text-xl font-black font-heading uppercase tracking-widest ${color}`}>
            {label}
          </span>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="bg-white/60 p-4 rounded-xl shadow-sm">
            <h4 className="text-xs uppercase font-bold tracking-widest text-on-surface-variant mb-2">Phase 01: CLORAGRO</h4>
            <p className="font-heading font-black text-primary text-xl">{cloragro}</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl shadow-sm">
            <h4 className="text-xs uppercase font-bold tracking-widest text-on-surface-variant mb-2">Phase 02: OPTIMAGRO</h4>
            <p className="font-heading font-black text-primary text-xl">{optimagro}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
