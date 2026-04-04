import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Globe,
  CheckCircle,
  Microscope,
  Phone,
  Shield,
  Clock,
} from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("expertiseTitle"),
    description: t("expertiseDescription"),
  };
}

export default async function ExpertisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("expertise");

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)]">
      {/* ====== HERO SECTION (Merged: Header + Director) ====== */}
      <section className="bg-n2k-surface-low relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left column — Text */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
                  {t("heroBadge")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading text-n2k-primary leading-[0.95] tracking-tight mb-8">
                {t("pageTitle")}
              </h1>

              <p className="text-lg md:text-xl text-n2k-on-surface-variant font-body leading-relaxed max-w-2xl mb-10">
                {t("pageSubtitle")}
              </p>

              {/* Director Card */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-ambient ghost-border max-w-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-n2k-secondary/10 rounded-xl flex items-center justify-center">
                    <Microscope className="w-7 h-7 text-n2k-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-heading text-n2k-primary">
                      {t("directorName")}
                    </h3>
                    <p className="text-n2k-secondary font-bold text-xs uppercase tracking-widest font-heading">
                      {t("directorRole")}
                    </p>
                  </div>
                </div>
                <p className="text-n2k-primary font-bold font-body leading-relaxed mb-4">
                  {t("directorBio")}
                </p>
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  {t("specialistDesc")}
                </p>

                {/* Technopark Badge */}
                <div className="flex items-center gap-4 p-4 bg-n2k-surface-low rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <Globe className="text-n2k-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black font-heading text-n2k-primary">
                      {t("techparkTitle")}
                    </h4>
                    <p className="text-n2k-on-surface-variant font-body text-xs leading-relaxed">
                      {t("techparkDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — Image */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAtBErDyob_wmr6Jsef4YSckr4y3wJGEucFB6MLk3KeiMs_fLiyw39CuzaZenfhep9vjy6AE8vy-J2slC-YHZVP3z5CfF919R5uqMA4SVRs6s-NfBdCwDuCyjRWbvmvZZTgZuWbaAChaHLdzmT1ZnM7mWWlb0nfjosWHN42MWa1o7hs__EMxoCsZaPG0uM8fl4TzzABdw-6WyTLxc8-drs3OVd0_hcGel5xLBE6CqE1xgYiHNeb4-FvgKyuRKkuGcIj68i93-_56s"
                  alt={t("directorName")}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== METHODOLOGY SECTION (#0D7ED0) ====== */}
      <section className="bg-[#0D7ED0] py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] uppercase text-white/70">
                {t("directorTitle")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-6 leading-tight">
              {t("methodTitle")}
            </h2>
            <p className="text-lg text-white font-body leading-relaxed">
              {t("methodSubtitle")}
            </p>
          </div>

          {/* Methodology Cards — 2x2 grid on md, 4-col on lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(t.raw("steps")).map(([key, step]: [string, any], idx: number) => (
              <div
                key={key}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group"
              >
                {/* Step Number */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl font-black font-heading text-n2k-secondary/50 group-hover:text-n2k-secondary transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="text-xl font-black font-heading text-white uppercase tracking-tight mb-3">
                  {step.title}
                </h4>
                <p className="text-white/80 font-body leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== EXCELLENCE SCIENTIFIQUE & NORMES (2-Column) ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column — Accordions */}
            <div className="lg:col-span-7">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-n2k-secondary">
                    {t("directorTitle")}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-4 leading-tight">
                  {t("technicalExcellence.title")}
                </h2>
                <p className="text-n2k-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  {t("technicalExcellence.subtitle")}
                </p>
              </div>

              <Accordion>
                <AccordionItem title={t("technicalExcellence.items.rd.title")}>
                  {t("technicalExcellence.items.rd.content")}
                </AccordionItem>
                <AccordionItem title={t("technicalExcellence.items.compliance.title")}>
                  {t("technicalExcellence.items.compliance.content")}
                </AccordionItem>
                <AccordionItem title={t("technicalExcellence.items.support.title")}>
                  {t("technicalExcellence.items.support.content")}
                </AccordionItem>
              </Accordion>
            </div>

            {/* Right Column — Image */}
            <div className="lg:col-span-5 flex md:hidden lg:flex items-center lg:sticky lg:top-28">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="/images/scientific-excellence.png"
                  alt={t("technicalExcellence.title")}
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION — "Exposez-nous votre problème" ====== */}
      <section className="bg-[#0D7ED0] py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left — CTA Content */}
            <div className="lg:col-span-7 text-center lg:text-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-2">
                {t("ctaSection.title")}
              </h2>
              <p className="text-2xl md:text-3xl font-black font-heading text-n2k-secondary leading-tight mb-8">
                {t("ctaSection.subtitle")}
              </p>
              <p className="text-white/90 font-body text-base md:text-lg leading-relaxed max-w-xl mb-10 mx-auto lg:mx-0">
                {t("ctaSection.desc")}
              </p>

              {/* Feature list */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-10 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-n2k-secondary shrink-0" />
                  <span className="text-white font-heading font-bold text-sm">{t("ctaSection.feature1")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-n2k-secondary shrink-0" />
                  <span className="text-white font-heading font-bold text-sm">{t("ctaSection.feature2")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-n2k-secondary shrink-0" />
                  <span className="text-white font-heading font-bold text-sm">{t("ctaSection.feature3")}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-n2k-secondary text-white px-10 py-5 rounded-xl font-black font-heading text-lg shadow-lg transition-all group hover:opacity-90 hover:scale-[1.02] active:scale-95"
              >
                <Phone className="w-5 h-5 shrink-0" />
                {t("ctaSection.button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
              </Link>
            </div>

            {/* Right — Trust Badges */}
            <div className="lg:col-span-5 hidden lg:flex flex-col gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-n2k-secondary/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-n2k-secondary" />
                  </div>
                  <h4 className="text-xl font-black font-heading text-white">{t("ctaSection.feature1")}</h4>
                </div>
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  {t("ctaSection.desc")}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-n2k-secondary/20 rounded-xl flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-n2k-secondary" />
                  </div>
                  <h4 className="text-xl font-black font-heading text-white">{t("ctaSection.feature2")}</h4>
                </div>
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  {t("technicalExcellence.items.rd.content")}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-n2k-secondary/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-n2k-secondary" />
                  </div>
                  <h4 className="text-xl font-black font-heading text-white">{t("ctaSection.feature3")}</h4>
                </div>
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  {t("technicalExcellence.items.support.content")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
