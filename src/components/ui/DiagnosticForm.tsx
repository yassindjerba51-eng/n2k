"use client";

import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Building2, Egg, Factory, CheckCircle2 } from "lucide-react";
import ReCaptchaProvider, { useReCaptcha } from "@/components/ReCaptchaProvider";
import {
  tunisiaRegions,
  getVillesForGouvernorat,
} from "@/data/tunisiaRegions";
import {
  SECTOR_OPTIONS,
  SECTOR_CONFIGS,
  REQUEST_TYPES,
  type SectorQuestion,
} from "@/data/sectorQuestions";

// ─────────────────────────────────────────────
// Zod Schema
// ─────────────────────────────────────────────

const diagnosticSchema = z.object({
  // Step 1 — Common fields
  name: z.string().min(2, { message: "Champ requis" }),
  contactName: z.string().min(2, { message: "Champ requis" }),
  phone: z.string().min(8, { message: "Numéro invalide" }),
  email: z.string().email({ message: "Email invalide" }),
  region: z.string().min(1, { message: "Champ requis" }),
  city: z.string().min(1, { message: "Champ requis" }),
  sector: z.string().min(1, { message: "Champ requis" }),
  requestType: z.string().min(1, { message: "Champ requis" }),
  // Step 2 — Dynamic sector answers stored as JSON
  sectorData: z.record(z.string(), z.string()),
  // Free text
  message: z.string().optional(),
});

type DiagnosticFormValues = z.infer<typeof diagnosticSchema>;

// ─────────────────────────────────────────────
// Sector icon mapping
// ─────────────────────────────────────────────

const SECTOR_ICONS: Record<string, React.ReactNode> = {
  ELEVAGE: <Egg className="w-6 h-6" />,
  ABATTOIR: <Building2 className="w-6 h-6" />,
  AGROALIMENTAIRE: <Factory className="w-6 h-6" />,
};

// ─────────────────────────────────────────────
// Inner Form (wrapped by ReCaptchaProvider)
// ─────────────────────────────────────────────

function DiagnosticFormInner() {
  const t = useTranslations("diagnostic");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useReCaptcha();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DiagnosticFormValues>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: {
      name: "",
      contactName: "",
      phone: "",
      email: "",
      region: "",
      city: "",
      sector: "",
      requestType: "",
      sectorData: {},
      message: "",
    },
    mode: "onChange",
  });

  const selectedRegion = watch("region");
  const selectedSector = watch("sector");
  const sectorData = (watch("sectorData") as Record<string, string>) || {};

  // Villes filtered by the selected gouvernorat
  const availableVilles = useMemo(
    () => (selectedRegion ? getVillesForGouvernorat(selectedRegion) : []),
    [selectedRegion]
  );

  // Sector config for the selected sector
  const sectorConfig = useMemo(
    () => (selectedSector ? SECTOR_CONFIGS[selectedSector] : undefined),
    [selectedSector]
  );

  // Step labels
  const STEP_LABELS = [t("step1Label"), t("step2Label")];
  const TOTAL_STEPS = 2;

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  const handleNext = async () => {
    if (step === 1) {
      const valid = await trigger([
        "name",
        "contactName",
        "phone",
        "email",
        "region",
        "city",
        "sector",
        "requestType",
      ]);
      if (valid) setStep(2);
    }
  };

  const handlePrev = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  // ─────────────────────────────────────────────
  // Submit
  // ─────────────────────────────────────────────

  const onSubmit = async (data: DiagnosticFormValues) => {
    if (step < TOTAL_STEPS) {
      return;
    }
    setIsSubmitting(true);
    try {
      const recaptchaToken = await executeRecaptcha("diagnostic");

      const payload = {
        name: data.name,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        region: data.region,
        city: data.city,
        activityType: data.sector,
        requestType: data.requestType,
        sectorData: data.sectorData,
        message: data.message || "",
        // Legacy fields (kept for backward compatibility)
        capacity: "",
        problemType: "",
        recaptchaToken,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/merci");
      } else {
        const errorText = await response.text();
        console.error("Failed to submit:", response.status, errorText);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────
  // Helper: update a single sector field
  // ─────────────────────────────────────────────

  const setSectorField = (fieldId: string, value: string) => {
    setValue("sectorData", { ...sectorData, [fieldId]: value });
  };

  // ─────────────────────────────────────────────
  // Shared styles
  // ─────────────────────────────────────────────

  const labelClass =
    "uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading";
  const inputClass =
    "h-14 bg-surface rounded-xl border-border px-4 font-body";
  const errorInputClass = "border-red-500";
  const selectTriggerClass =
    "w-full h-14 bg-surface rounded-xl border-border px-4 font-body";

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <div className="bg-surface-lowest rounded-3xl p-6 sm:p-8 md:p-12 shadow-ambient-lg ghost-border w-full max-w mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between mb-4 font-heading text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          {STEP_LABELS.map((label, i) => (
            <span key={i} className={step >= i + 1 ? "text-primary" : ""}>
              {label}
            </span>
          ))}
        </div>
        <Progress
          value={(step / TOTAL_STEPS) * 100}
          className="h-2 bg-surface-container"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-body">
        {/* ─────────────────────────────────────────
            STEP 1: Informations Générales
        ───────────────────────────────────────── */}
        <div className={step === 1 ? "block animate-fade-in-up" : "hidden"}>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-primary mb-8">
            {t("step1Label")}
          </h2>

          <div className="space-y-6">
            {/* Nom entreprise / exploitation */}
            <div className="space-y-2">
              <Label className={labelClass}>{t("companyName")}</Label>
              <Input
                {...register("name")}
                placeholder={t("companyNamePlaceholder")}
                className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
              />
            </div>

            {/* Responsable + Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={labelClass}>{t("contactNameLabel")}</Label>
                <Input
                  {...register("contactName")}
                  placeholder={t("contactNamePlaceholder")}
                  className={`${inputClass} ${errors.contactName ? errorInputClass : ""}`}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelClass}>{t("phone")}</Label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  className={`${inputClass} ${errors.phone ? errorInputClass : ""}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className={labelClass}>{t("email")}</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder={t("emailPlaceholder")}
                className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
              />
            </div>

            {/* Gouvernorat + Ville */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={labelClass}>{t("region")}</Label>
                <Controller
                  control={control}
                  name="region"
                  render={({ field }) => (
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val);
                        // Reset city when gouvernorat changes
                        setValue("city", "");
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={`${selectTriggerClass} ${errors.region ? errorInputClass : ""}`}
                      >
                        <SelectValue placeholder={t("regionPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {tunisiaRegions.map((g) => (
                          <SelectItem key={g.name} value={g.name}>
                            {g.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>{t("city")}</Label>
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedRegion}
                    >
                      <SelectTrigger
                        className={`${selectTriggerClass} ${errors.city ? errorInputClass : ""}`}
                      >
                        <SelectValue
                          placeholder={
                            selectedRegion
                              ? t("cityPlaceholder")
                              : t("citySelectRegionFirst")
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {availableVilles.map((ville) => (
                          <SelectItem key={ville} value={ville}>
                            {ville}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Secteur d'activité — large radio cards */}
            <div className="space-y-3">
              <Label className={labelClass}>{t("activityType")}</Label>
              <Controller
                control={control}
                name="sector"
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SECTOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          field.onChange(opt.key);
                          // Reset sector data when switching sectors
                          setValue("sectorData", {});
                        }}
                        className={`flex flex-col items-center justify-center text-center rounded-xl border-2 p-5 cursor-pointer transition-all ${
                          field.value === opt.key
                            ? "border-secondary bg-secondary/10 text-secondary shadow-md"
                            : "border-border bg-surface hover:bg-surface-high hover:text-primary"
                        }`}
                      >
                        <span className="mb-2">{SECTOR_ICONS[opt.key]}</span>
                        <span className="font-heading font-bold text-sm sm:text-base">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              />
              {errors.sector && (
                <p className="text-red-500 text-sm">{errors.sector.message}</p>
              )}
            </div>

            {/* Type de demande */}
            <div className="space-y-2">
              <Label className={labelClass}>{t("requestTypeLabel")}</Label>
              <Controller
                control={control}
                name="requestType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`${selectTriggerClass} ${errors.requestType ? errorInputClass : ""}`}
                    >
                      <SelectValue placeholder={t("requestTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {REQUEST_TYPES.map((rt) => (
                        <SelectItem key={rt} value={rt}>
                          {rt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            STEP 2: Questions Spécifiques + Description
        ───────────────────────────────────────── */}
        <div className={step === 2 ? "block animate-fade-in-up" : "hidden"}>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-primary mb-2">
            {t("step2Label")}
          </h2>

          {sectorConfig && (
            <p className="text-sm text-on-surface-variant mb-8 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              {sectorConfig.title}
            </p>
          )}

          {sectorConfig ? (
            <div className="space-y-6">
              {/* Dynamic questions */}
              {sectorConfig.questions.map((question: SectorQuestion) => (
                <div key={question.id} className="space-y-2">
                  <Label className={labelClass}>{question.label}</Label>
                  <Select
                    onValueChange={(val) => setSectorField(question.id, val || "")}
                    value={sectorData?.[question.id] || ""}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Sélectionnez..." />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              {/* Free text description */}
              <div className="space-y-2">
                <Label className={labelClass}>{t("message")}</Label>
                <Textarea
                  {...register("message")}
                  placeholder={t("messagePlaceholder")}
                  className="min-h-[120px] bg-surface rounded-xl border-border px-4 py-4 font-body"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-on-surface-variant">
              <p className="text-lg">{t("selectSectorFirst")}</p>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────
            Navigation Buttons
        ───────────────────────────────────────── */}
        <div className="pt-8 flex items-center justify-between border-t border-border mt-12">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="text-on-surface-variant hover:text-primary font-bold font-heading flex items-center gap-2 group transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform rtl:group-hover:translate-x-1 rtl:rotate-180" />
              {t("previous")}
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button
              key="next-btn"
              type="button"
              onClick={handleNext}
              className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all flex items-center gap-3 group"
            >
              {t("next")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </button>
          ) : (
            <button
              key="submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary hover:bg-secondary-container hover:text-secondary-foreground text-white px-8 py-4 rounded-xl font-bold font-heading shadow-xl shadow-secondary/20 transition-all flex items-center gap-3 group disabled:opacity-70"
            >
              {isSubmitting ? t("sending") : t("submit")}
              {!isSubmitting && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function DiagnosticForm() {
  return (
    <ReCaptchaProvider>
      <DiagnosticFormInner />
    </ReCaptchaProvider>
  );
}
