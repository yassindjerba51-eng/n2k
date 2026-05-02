"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle,
  Droplets,
  ArrowRight,
  Info,
} from "lucide-react";

type Step = {
  num: string;
  product: string;
  title: string;
  context: string;
  role: string;
  dosage: string;
  constraint: string;
};

type SectorData = {
  key: string;
  label: string;
  accroche: string;
  steps: Step[];
  bioactiveNote: string;
};

interface Props {
  sectors: SectorData[];
  viewTechSheetLabel: string;
  locale: string;
}

const productSlugs: Record<string, string> = {
  CLORAGRO: "cloragro",
  OPTIMAGRO: "optimagro",
  "BIONET + AQUACONTROL": "bionet",
  BIONET: "bionet",
  AQUACONTROL: "aquacontrol",
  AIRSAN: "airsan",
  BIOACTIVE: "bioactive",
};

const isRinseStep = (product: string) =>
  product === "RINÇAGE" || product === "RINSING" || product === "شطف";

export default function ProblemesSolutionsTabs({
  sectors,
  viewTechSheetLabel,
  locale,
}: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const sector = sectors[activeTab];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {sectors.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-3 rounded-xl font-heading font-bold text-sm tracking-tight transition-all ${
              activeTab === idx
                ? "bg-n2k-primary text-white shadow-lg"
                : "bg-white text-n2k-on-surface-variant border border-border/30 hover:border-n2k-secondary/50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Sector Intro */}
      <div className="bg-n2k-surface-low rounded-2xl border border-border/30 p-6 md:p-8 mb-8">
        <p className="text-n2k-on-surface-variant font-body leading-relaxed text-base md:text-lg">
          {sector.accroche}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {sector.steps.map((step) => {
          const isRinse = isRinseStep(step.product);
          const slug = productSlugs[step.product];

          return (
            <div
              key={step.num}
              className={`relative bg-white rounded-2xl border overflow-hidden shadow-sm ${
                isRinse
                  ? "border-amber-200 bg-amber-50/30"
                  : "border-border/30"
              }`}
            >
              {/* Top accent bar */}
              <div
                className={`h-1 ${
                  isRinse
                    ? "bg-gradient-to-r from-amber-400 to-amber-300"
                    : step.product === "OPTIMAGRO"
                    ? "bg-gradient-to-r from-n2k-secondary to-emerald-400"
                    : "bg-gradient-to-r from-n2k-primary to-blue-400"
                }`}
              />

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-heading font-black text-lg ${
                      isRinse
                        ? "bg-amber-100 text-amber-700"
                        : "bg-n2k-primary/10 text-n2k-primary"
                    }`}
                  >
                    {step.num}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl md:text-2xl font-black font-heading text-n2k-primary tracking-tight">
                      {isRinse ? (
                        <span className="flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-amber-600" />
                          {step.product}
                        </span>
                      ) : (
                        step.product
                      )}
                    </h3>
                    <p className="text-n2k-on-surface-variant font-heading font-bold text-sm mt-1">
                      {step.title}
                      {step.context && (
                        <span className="text-n2k-secondary ms-2">
                          — {step.context}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Role */}
                {step.role && (
                  <p className="text-n2k-on-surface-variant font-body text-sm md:text-base leading-relaxed mb-4 whitespace-pre-line">
                    {step.role}
                  </p>
                )}

                {/* Dosage */}
                {step.dosage && (
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-4 h-4 text-n2k-secondary shrink-0" />
                    <span className="text-sm font-heading font-bold text-n2k-primary">
                      {step.dosage}
                    </span>
                  </div>
                )}

                {/* Constraint */}
                {step.constraint && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-800 font-body text-sm leading-relaxed">
                      {step.constraint}
                    </p>
                  </div>
                )}

                {/* Tech sheet link */}
                {slug && !isRinse && (
                  <div className="mt-4">
                    <Link
                      href={`/${locale}/produits/${slug}`}
                      className="inline-flex items-center gap-2 text-sm font-heading font-bold text-n2k-secondary hover:text-n2k-primary transition-colors"
                    >
                      {viewTechSheetLabel}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BIOACTIVE Note */}
      {sector.bioactiveNote && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4">
          <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-blue-800 font-body text-sm md:text-base leading-relaxed">
            {sector.bioactiveNote}
          </p>
        </div>
      )}
    </div>
  );
}
