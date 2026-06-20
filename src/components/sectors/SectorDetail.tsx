"use client";

import { Link } from "@/i18n/navigation";
import { SectorData } from "@/data/sectors-pages";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Shield,
  ShieldPlus,
  FileText,
  CheckCircle2,
  FlaskConical,
  Home,
  ChevronRight,
} from "lucide-react";
import RelatedArticlesCarousel from "@/components/blog/RelatedArticlesCarousel";
import HomologationBadges from "@/components/ui/HomologationBadges";
import { isHomologatedName } from "@/data/homologations";

interface SectorDetailProps {
  sector: SectorData;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  image?: string;
  tag?: string;
  locale?: string;
}

export default function SectorDetail({ sector, title, subtitle, icon, image, tag, locale }: SectorDetailProps) {
  const t = useTranslations("sectorDetail");
  const tNav = useTranslations("nav");

  return (
    <div className="bg-n2k-surface min-h-[calc(100vh-80px)]">
      {/* ====== HERO ====== */}
      <section className="relative bg-n2k-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-n2k-secondary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 lg:py-36 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column: Content */}
            <div className="w-full lg:w-2/3 max-w ">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-px bg-n2k-secondary-light shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
                  Secteur
                </span>
              </div>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white">
                  {icon}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] tracking-tighter">
                  {title}
                </h1>
              </div>
              <p className="text-lg md:text-xl text-white/60 font-body leading-relaxed mb-10 text-justify">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link
                  href="/diagnostic"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg shadow-n2k-secondary/20 transition-all"
                >
                  Demander un diagnostic sanitaire
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/problemes-solutions"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
                >
                  Découvrir nos solutions
                </Link>
              </div>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold mt-10">
                <Link href="/" className="hover:text-n2k-secondary transition-colors flex items-center gap-1.5">
                  <Home size={14} />
                  {tNav("home")}
                </Link>
                <ChevronRight size={12} className="opacity-50" />
                <Link href="/secteurs" className="hover:text-n2k-secondary transition-colors">
                  {tNav("secteurs")}
                </Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-n2k-secondary-light">{title}</span>
              </nav>
            </div>
            {/* Right Column: Image */}
            {image && (
              <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
                {/* Decorative glow behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-n2k-secondary/20 blur-3xl -z-10 rounded-full mix-blend-screen" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== 1. PROBLÈMES ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-n2k-orange" />
            <span className="text-xs font-black tracking-[0.2em] text-n2k-orange uppercase">
              {t("problemsBadge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-n2k-primary tracking-tight mb-12">
            {t("problemsTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sector.problems.map((problem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-n2k-outline-variant/20 shadow-ambient"
              >
                <div className="w-10 h-10 rounded-lg bg-n2k-orange/10 flex items-center justify-center mb-4">
                  <span className="text-n2k-orange font-black text-lg">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-n2k-primary mb-3">
                  {problem.title}
                </h3>
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 2. RISQUES ÉCONOMIQUES ====== */}
      <section className="bg-n2k-surface-low py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-5 h-5 text-n2k-red" />
            <span className="text-xs font-black tracking-[0.2em] text-n2k-red uppercase">
              {t("risksBadge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-n2k-primary tracking-tight mb-12">
            {t("risksTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sector.economicRisks.map((risk, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border-l-4 border-l-n2k-red border border-n2k-outline-variant/20"
              >
                <h3 className="text-lg font-bold font-heading text-n2k-primary mb-3">
                  {risk.title}
                </h3>
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed">
                  {risk.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 3. PROTOCOLE MINIMAL ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-n2k-secondary" />
            <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
              {t("minimalBadge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-n2k-primary tracking-tight mb-4">
            {t("minimalTitle")}
          </h2>
          <p className="text-n2k-on-surface-variant font-body text-lg mb-12 max-w-3xl">
            {t("minimalSubtitle")}
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-n2k-outline-variant/30" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sector.minimalProtocol.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white rounded-2xl p-8 border border-n2k-outline-variant/20 shadow-ambient">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-n2k-secondary text-white flex items-center justify-center text-sm font-black">
                        {idx + 1}
                      </div>
                      <span className="text-xs font-black tracking-[0.15em] text-n2k-secondary uppercase">
                        {step.action}
                      </span>
                    </div>
                    <h3 className="text-xl font-black font-heading text-n2k-primary mb-3">
                      {step.product}
                    </h3>
                    <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed">
                      {step.description}
                    </p>
                    {isHomologatedName(step.product) && (
                      <HomologationBadges variant="compact" className="mt-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== 4. PROTOCOLE RENFORCÉ ====== */}
      <section className="bg-n2k-primary py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldPlus className="w-5 h-5 text-n2k-secondary-light" />
            <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
              {t("reinforcedBadge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-white tracking-tight mb-4">
            {t("reinforcedTitle")}
          </h2>
          <p className="text-white/60 font-body text-lg mb-12 max-w-3xl">
            {t("reinforcedSubtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sector.reinforcedProtocol.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/15"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black tracking-[0.15em] text-n2k-secondary-light uppercase">
                    + {step.action}
                  </span>
                </div>
                <h3 className="text-xl font-black font-heading text-white mb-3">
                  {step.product}
                </h3>
                <p className="text-white/60 font-body text-sm leading-relaxed">
                  {step.description}
                </p>
                {isHomologatedName(step.product) && (
                  <HomologationBadges variant="compact" tone="light" className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 5. CAS SPÉCIFIQUES ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-n2k-primary" />
            <span className="text-xs font-black tracking-[0.2em] text-n2k-on-surface-variant uppercase">
              {t("casesBadge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-n2k-primary tracking-tight mb-12">
            {t("casesTitle")}
          </h2>

          <div className="space-y-6">
            {sector.specificCases.map((cas, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 md:p-10 border border-n2k-outline-variant/20 shadow-ambient"
              >
                <h3 className="text-xl font-bold font-heading text-n2k-primary mb-2">
                  {cas.title}
                </h3>
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-4">
                  {cas.description}
                </p>
                <div className="bg-n2k-surface-low rounded-xl p-6">
                  <span className="text-xs font-black tracking-[0.15em] text-n2k-secondary uppercase mb-2 block">
                    {t("casesProtocol")}
                  </span>
                  <p className="text-n2k-on-surface font-body text-sm leading-relaxed font-medium">
                    {cas.protocol}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 6. RÉSULTATS ATTENDUS ====== */}
      <section className="bg-n2k-surface-low py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-n2k-secondary" />
            <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
              {t("resultsBadge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-n2k-primary tracking-tight mb-12">
            {t("resultsTitle")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sector.expectedResults.map((result, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-n2k-outline-variant/20 flex items-start gap-4"
              >
                <CheckCircle2 className="w-5 h-5 text-n2k-secondary shrink-0 mt-0.5" />
                <p className="text-n2k-on-surface font-body text-sm font-medium leading-relaxed">
                  {result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== RELATED BLOG POSTS ====== */}
      {tag && locale && (
        <RelatedArticlesCarousel tag={tag} locale={locale} />
      )}

      {/* ====== 7. CTA ====== */}
      <section className="bg-n2k-primary py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <FlaskConical className="w-5 h-5 text-n2k-secondary-light" />
            <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
              {t("ctaBadge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-white/60 font-body text-lg mb-10 max-w-2xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg transition-all"
            >
              {t("ctaButton1")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/produits"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
            >
              {t("ctaButton2")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
