"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Building2, Droplets, Wind, Globe, ArrowRight, ArrowLeft } from "lucide-react";

const diagnosticSchema = z.object({
  region: z.string().min(1, { message: "Required" }),
  activityType: z.enum(["Poultry", "Agri-food"]),
  capacity: z.string().min(1, { message: "Required" }),
  cycleInfo: z.string().optional(),
  problems: z.array(z.string()).min(1, { message: "Select at least one" }),
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(8, { message: "Invalid phone number" }),
  message: z.string().optional(),
});

type DiagnosticFormValues = z.infer<typeof diagnosticSchema>;

export default function DiagnosticForm() {
  const t = useTranslations("diagnostic");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<DiagnosticFormValues>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: {
      region: "",
      activityType: "Poultry",
      problems: [],
    },
    mode: "onChange",
  });

  const regionsList = t.raw("regions") as string[];

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["region", "activityType"];
    if (step === 2) fieldsToValidate = ["capacity", "cycleInfo"];
    if (step === 3) fieldsToValidate = ["problems"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    setStep((s) => s - 1);
  };

  const onSubmit = async (data: DiagnosticFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          problemType: data.problems.join(", "), // Flatten issues into a string for DB
        }),
      });

      if (response.ok) {
        router.push("/merci");
      } else {
        console.error("Failed to submit");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-lowest rounded-3xl p-8 md:p-12 shadow-ambient-lg ghost-border w-full max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-12">
        <div className="flex justify-between mb-4 font-heading text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          <span className={step >= 1 ? "text-primary" : ""}>{t("step1")}</span>
          <span className={step >= 2 ? "text-primary hidden sm:inline" : "hidden sm:inline"}>{t("step2")}</span>
          <span className={step >= 3 ? "text-primary hidden sm:inline" : "hidden sm:inline"}>{t("step3")}</span>
          <span className={step >= 4 ? "text-primary" : ""}>{t("step4")}</span>
        </div>
        <Progress value={(step / 4) * 100} className="h-2 bg-surface-container" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-body">
        {/* Step 1: Activity */}
        <div className={step === 1 ? "block animate-fade-in-up" : "hidden"}>
          <h2 className="text-3xl font-black font-heading text-primary mb-8">{t("step1")}</h2>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading">{t("region")}</Label>
              <Controller
                control={control}
                name="region"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className={`w-full h-14 bg-surface rounded-xl border-border px-4 ${errors.region ? "border-red-500" : ""}`}>
                      <SelectValue placeholder={t("regionPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {regionsList.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading">{t("activityType")}</Label>
              <Controller
                control={control}
                name="activityType"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="Poultry" id="r-poultry" className="peer sr-only" />
                      <Label
                        htmlFor="r-poultry"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-border bg-surface p-6 hover:bg-surface-high hover:text-primary peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/10 peer-data-[state=checked]:text-secondary cursor-pointer transition-all"
                      >
                        <span className="font-heading font-bold text-lg">{t("poultry")}</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="Agri-food" id="r-agrifood" className="peer sr-only" />
                      <Label
                        htmlFor="r-agrifood"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-border bg-surface p-6 hover:bg-surface-high hover:text-primary peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/10 peer-data-[state=checked]:text-secondary cursor-pointer transition-all"
                      >
                        <span className="font-heading font-bold text-lg">{t("agrifood")}</span>
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </div>
        </div>

        {/* Step 2: Farm Details */}
        <div className={step === 2 ? "block animate-fade-in-up" : "hidden"}>
          <h2 className="text-3xl font-black font-heading text-primary mb-8">{t("step2")}</h2>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading">
                {t("capacity")}
              </Label>
              <Input
                {...register("capacity")}
                placeholder={t("capacityPlaceholder")}
                className={`h-14 bg-surface rounded-xl border-border px-4 ${errors.capacity ? "border-red-500" : ""}`}
              />
            </div>
            
            <div className="space-y-3">
              <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading">
                {t("cycleInfo")}
              </Label>
              <Input
                {...register("cycleInfo")}
                placeholder="Ex: 5"
                type="number"
                className="h-14 bg-surface rounded-xl border-border px-4"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Problems */}
        <div className={step === 3 ? "block animate-fade-in-up" : "hidden"}>
          <h2 className="text-3xl font-black font-heading text-primary mb-8">{t("step3")}</h2>
          
          <div className="space-y-3">
            <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading mb-4 block">
              {t("problemType")}
            </Label>
            
            <Controller
              control={control}
              name="problems"
              render={({ field }) => {
                const handleToggle = (val: string) => {
                  const current = field.value || [];
                  const updated = current.includes(val)
                    ? current.filter((item) => item !== val)
                    : [...current, val];
                  field.onChange(updated);
                };

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "Batiment", label: t("building"), icon: <Building2 className="w-5 h-5 mb-2" /> },
                      { id: "Eau", label: t("water"), icon: <Droplets className="w-5 h-5 mb-2" /> },
                      { id: "Ambiance", label: t("air"), icon: <Wind className="w-5 h-5 mb-2" /> },
                      { id: "Multiple", label: t("multiple"), icon: <Globe className="w-5 h-5 mb-2" /> },
                    ].map((opt) => (
                      <div key={opt.id}>
                        <Checkbox
                          id={`chk-${opt.id}`}
                          className="peer sr-only"
                          checked={field.value?.includes(opt.id)}
                          onCheckedChange={() => handleToggle(opt.id)}
                        />
                        <Label
                          htmlFor={`chk-${opt.id}`}
                          className="flex flex-col items-start rounded-xl border-2 border-border bg-surface p-4 hover:bg-surface-high peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/10 peer-data-[state=checked]:text-secondary cursor-pointer transition-all"
                        >
                          {opt.icon}
                          <span className="font-heading font-bold">{opt.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            {errors.problems && <p className="text-red-500 text-sm mt-2">{errors.problems.message}</p>}
          </div>
        </div>

        {/* Step 4: Contact */}
        <div className={step === 4 ? "block animate-fade-in-up" : "hidden"}>
          <h2 className="text-3xl font-black font-heading text-primary mb-8">{t("step4")}</h2>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading">
                {t("name")}
              </Label>
              <Input
                {...register("name")}
                placeholder={t("namePlaceholder")}
                className={`h-14 bg-surface rounded-xl border-border px-4 ${errors.name ? "border-red-500" : ""}`}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading">
                  {t("email")}
                </Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className={`h-14 bg-surface rounded-xl border-border px-4 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              <div className="space-y-3">
                <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading">
                  {t("phone")}
                </Label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  className={`h-14 bg-surface rounded-xl border-border px-4 ${errors.phone ? "border-red-500" : ""}`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="uppercase text-xs tracking-widest text-on-surface-variant font-bold font-heading">
                {t("message")}
              </Label>
              <Textarea
                {...register("message")}
                placeholder={t("messagePlaceholder")}
                className="min-h-[120px] bg-surface rounded-xl border-border px-4 py-4"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
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
          ) : <div />}
          
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all flex items-center gap-3 group"
            >
              {t("next")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary hover:bg-secondary-container hover:text-secondary-foreground text-white px-8 py-4 rounded-xl font-bold font-heading shadow-xl shadow-secondary/20 transition-all flex items-center gap-3 group disabled:opacity-70"
            >
              {isSubmitting ? t("sending") : t("submit")}
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
