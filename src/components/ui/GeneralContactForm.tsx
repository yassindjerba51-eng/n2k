"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Send, Loader2 } from "lucide-react";

// Form Schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message is too short" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function GeneralContactForm() {
  const t = useTranslations("contactPage.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Zone Bâtiment",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        const errorText = await response.text();
        console.error("Failed to submit:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error submitting contact form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
          <Send className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-bold text-2xl">{t("successTitle")}</h3>
        <p className="text-green-700/80">{t("successMessage")}</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-bold text-sm"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            {t("nameLabel")}
          </label>
          <input
            {...register("name")}
            className="w-full bg-white border-none border-b-2 border-slate-200 focus:border-n2k-primary focus:ring-0 px-4 py-3 transition-colors outline-none"
            placeholder={t("namePlaceholder")}
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 text-xs font-semibold">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            {t("emailLabel")}
          </label>
          <input
            {...register("email")}
            className="w-full bg-white border-none border-b-2 border-slate-200 focus:border-n2k-primary focus:ring-0 px-4 py-3 transition-colors outline-none"
            placeholder={t("emailPlaceholder")}
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs font-semibold">{errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          {t("subjectLabel")}
        </label>
        <select
          {...register("subject")}
          className="w-full bg-white border-none border-b-2 border-slate-200 focus:border-n2k-primary focus:ring-0 px-4 py-3 transition-colors outline-none cursor-pointer"
        >
          <option value="Zone Bâtiment">{t("subjects.batiment")}</option>
          <option value="Analyse de l'Eau">{t("subjects.eau")}</option>
          <option value="Ambiance & Environnement">{t("subjects.ambiance")}</option>
          <option value="Autre Expertise">{t("subjects.autre")}</option>
        </select>
        {errors.subject && (
          <p className="text-red-500 text-xs font-semibold">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          {t("messageLabel")}
        </label>
        <textarea
          {...register("message")}
          className="w-full bg-white border-none border-b-2 border-slate-200 focus:border-n2k-primary focus:ring-0 px-4 py-3 transition-colors outline-none resize-y"
          placeholder={t("messagePlaceholder")}
          rows={4}
        />
        {errors.message && (
          <p className="text-red-500 text-xs font-semibold">{errors.message.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full md:w-auto bg-n2k-secondary hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded transition-all flex items-center justify-center gap-3 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            {t("submitting")}
            <Loader2 className="w-5 h-5 animate-spin" />
          </>
        ) : (
          <>
            {t("submitButton")}
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
