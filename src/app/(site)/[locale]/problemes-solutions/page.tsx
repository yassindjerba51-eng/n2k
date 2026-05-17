import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Quote,
  Microscope,
  CheckCircle,
  Home,
  ChevronRight,
} from "lucide-react";
import SectorTabs from "@/components/ui/SectorTabs";
import {
  batimentSectors,
  eauSectors,
  ambianceSectors,
} from "@/data/sectors";
import type { Sector } from "@/data/sectors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("solutionsTitle"),
    description: t("solutionsDescription"),
  };
}

/* ─── Main Page ─────────────────────────────────────────────────────── */

export default async function ProblemesSolutionsHub() {
  const t = await getTranslations("solutionsPage");
  const tCta = await getTranslations("cta");
  const tNav = await getTranslations("nav");

  const sectorLabels: Record<Sector, string> = {
    elevage: t("sectorTabs.elevage"),
    abattoir: t("sectorTabs.abattoir"),
    agroalimentaire: t("sectorTabs.agroalimentaire"),
  };

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="relative bg-n2k-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-n2k-secondary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 lg:py-36 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column: Content */}
            <div className="w-full lg:w-2/3 max-w">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-px bg-n2k-secondary-light shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
                  {t("badge")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] tracking-tighter mb-8">
                {t("heroTitle")}{" "}
                <span className="text-n2k-secondary-light">{t("heroTitleHighlight")}</span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 font-body leading-relaxed mb-10 text-justify max-w">
                {t("heroSubtitle")}
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
                  href="/secteurs"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
                >
                  Découvrir nos secteurs
                </Link>
              </div>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold mt-10">
                <Link href="/" className="hover:text-n2k-secondary transition-colors flex items-center gap-1.5">
                  <Home size={14} />
                  {tNav("home")}
                </Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-n2k-secondary-light">{tNav("problemesSolutions")}</span>
              </nav>
            </div>

            {/* Right Column: Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <Image
                  src="/images/lab-scientist.png"
                  alt={t("badge")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-n2k-secondary/20 blur-3xl -z-10 rounded-full mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== ZONE 01: BÂTIMENT (Dark Blue) ====== */}
      <section className="bg-[#0D7ED0] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] uppercase text-n2k-secondary-container">
                {t("batiment.badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white leading-tight tracking-tight mb-4">
              {t("batiment.title")}
            </h2>
            <p className="text-white text-base md:text-lg font-body leading-relaxed max-w-3xl">
              {t("batiment.subtitle")}
            </p>
          </div>

          {/* Sector Tabs */}
          <SectorTabs
            zoneData={batimentSectors}
            stepLabel={t("step")}
            colorClass="text-n2k-secondary"
            bgClass="bg-n2k-secondary"
            containerBgClass="bg-n2k-secondary/10"
            sectorLabels={sectorLabels}
            dark
          />

          {/* Rinçage obligatoire — étape intermédiaire du protocole */}
          <div className="p-6 md:p-8 bg-blue-900/30 backdrop-blur-sm rounded-2xl border border-blue-300/20 mt-8 mb-8">
            <div className="flex items-start gap-4">
              <Microscope className="w-8 h-8 text-blue-200 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-black uppercase tracking-[0.15em] text-blue-200 font-heading mb-2 block">
                  Rinçage obligatoire — Étape intermédiaire
                </span>
                <p className="text-white font-body text-sm md:text-base leading-relaxed">
                  Après application de CLORAGRO, un rinçage complet à l&apos;eau potable de toutes les surfaces est obligatoire avant l&apos;application d&apos;OPTIMAGRO (Phase 02). Cette exigence est chimique et réglementaire — elle n&apos;est pas optionnelle.
                </p>
              </div>
            </div>
          </div>

          {/* ALCOSEPT PRO Card & Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-8 mt-8">
            {/* Left: Product Card */}
            <div className="lg:col-span-7">
              <div className="bg-n2k-surface-lowest rounded-2xl p-5 md:p-6 shadow-ambient ghost-border relative overflow-hidden group h-full">
                {/* Header */}
                <div className="mb-4 mt-1">
                  <h3 className="text-lg md:text-xl font-black font-heading text-n2k-primary">
                    ALCOSEPT PRO
                  </h3>
                  <p className="text-n2k-secondary font-bold uppercase tracking-widest text-[10px] font-heading">
                    Nettoyage Rapide — Inter-Lots
                  </p>
                </div>

                {/* Description */}
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-4">
                  Solution de nettoyage technique à évaporation rapide, conçue pour un usage entre les opérations de production en environnements agroalimentaires.
                </p>

                {/* Features */}
                <ul className="space-y-2 font-body text-sm">
                  <li className="flex items-start gap-2 text-n2k-on-surface-variant leading-snug">
                    <CheckCircle className="text-n2k-secondary shrink-0 w-4 h-4 mt-0.5" />
                    <span className="text-xs md:text-sm">Nettoyage rapide des surfaces de travail entre opérations</span>
                  </li>
                  <li className="flex items-start gap-2 text-n2k-on-surface-variant leading-snug">
                    <CheckCircle className="text-n2k-secondary shrink-0 w-4 h-4 mt-0.5" />
                    <span className="text-xs md:text-sm">Entretien des équipements inox et plastiques techniques</span>
                  </li>
                  <li className="flex items-start gap-2 text-n2k-on-surface-variant leading-snug">
                    <CheckCircle className="text-n2k-secondary shrink-0 w-4 h-4 mt-0.5" />
                    <span className="text-xs md:text-sm">Évaporation rapide sans laisser de résidus</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-5 flex items-center">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-ambient-lg ghost-border aspect-[533/248]">
                <Image
                  src="/images/alcosept_pro_slaughterhouse.png"
                  alt="ALCOSEPT PRO application en abattoir"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* OXYLIS HOCl Card & Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-8 mt-8">
            {/* Left: Product Card */}
            <div className="lg:col-span-7">
              <div className="bg-n2k-surface-lowest rounded-2xl p-5 md:p-6 shadow-ambient ghost-border relative overflow-hidden group h-full">
                {/* Header */}
                <div className="mb-4 mt-1">
                  <h3 className="text-lg md:text-xl font-black font-heading text-n2k-primary">
                    OXYLIS HOCl
                  </h3>
                  <p className="text-n2k-secondary font-bold uppercase tracking-widest text-[10px] font-heading">
                    Entretien des Réseaux d&apos;Eau & Environnements
                  </p>
                </div>

                {/* Description */}
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-4">
                  Solution technique polyvalente à base d&apos;acide hypochloreux (HOCl) pour l&apos;entretien continu des circuits d&apos;eau et le traitement des environnements de production en élevage et industrie agroalimentaire.
                </p>

                {/* Features */}
                <ul className="space-y-2 font-body text-sm">
                  <li className="flex items-start gap-2 text-n2k-on-surface-variant leading-snug">
                    <CheckCircle className="text-n2k-secondary shrink-0 w-4 h-4 mt-0.5" />
                    <span className="text-xs md:text-sm">Entretien continu des canalisations d&apos;eau et réseaux d&apos;abreuvement</span>
                  </li>
                  <li className="flex items-start gap-2 text-n2k-on-surface-variant leading-snug">
                    <CheckCircle className="text-n2k-secondary shrink-0 w-4 h-4 mt-0.5" />
                    <span className="text-xs md:text-sm">Nébulisation des ambiances de production</span>
                  </li>
                  <li className="flex items-start gap-2 text-n2k-on-surface-variant leading-snug">
                    <CheckCircle className="text-n2k-secondary shrink-0 w-4 h-4 mt-0.5" />
                    <span className="text-xs md:text-sm">Dosage automatisé pour flux de production continu</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-5 flex items-center">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-ambient-lg ghost-border aspect-[533/248]">
                <Image
                  src="/images/oxylis_hocl_composite.png"
                  alt="OXYLIS HOCl — canalisations d'eau, bâtiment d'élevage, industrie agroalimentaire"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Learn More CTA */}
          <div className="flex justify-center lg:justify-start">
            <Link
              href={"/problemes-solutions/batiment" as any}
              className="inline-flex items-center gap-3 bg-n2k-secondary text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all group text-sm md:text-base hover:opacity-90"
            >
              {t("learnMore")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== ZONE 02: EAU (Light) ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] uppercase text-n2k-secondary">
                {t("eau.badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary leading-tight tracking-tight mb-4">
              {t("eau.title")}
            </h2>
            <p className="text-n2k-on-surface-variant text-base md:text-lg font-body leading-relaxed max-w-3xl">
              {t("eau.subtitle")}
            </p>
          </div>

          {/* Sector Tabs */}
          <SectorTabs
            zoneData={eauSectors}
            stepLabel={t("step")}
            colorClass="text-n2k-primary"
            bgClass="bg-n2k-primary"
            containerBgClass="bg-n2k-primary/10"
            sectorLabels={sectorLabels}
          />

          {/* Learn More CTA */}
          <div className="flex justify-center lg:justify-start mt-8">
            <Link
              href={"/problemes-solutions/canalisations-eau" as any}
              className="inline-flex items-center gap-3 bg-n2k-primary text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all group text-sm md:text-base hover:opacity-90"
            >
              {t("learnMore")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== ZONE 03: AMBIANCE (Light alternate) ====== */}
      <section className="bg-n2k-surface-low py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] uppercase text-n2k-orange">
                {t("ambiance.badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary leading-tight tracking-tight mb-4">
              {t("ambiance.title")}
            </h2>
            <p className="text-n2k-on-surface-variant text-base md:text-lg font-body leading-relaxed max-w-3xl">
              {t("ambiance.subtitle")}
            </p>
          </div>

          {/* Sector Tabs */}
          <SectorTabs
            zoneData={ambianceSectors}
            stepLabel={t("step")}
            colorClass="text-n2k-orange"
            bgClass="bg-n2k-orange"
            containerBgClass="bg-n2k-orange/10"
            sectorLabels={sectorLabels}
          />

{/* Learn More CTA */}
          <div className="flex justify-center lg:justify-start">
            <Link
              href={"/problemes-solutions/ambiance" as any}
              className="inline-flex items-center gap-3 bg-n2k-orange text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all group text-sm md:text-base hover:opacity-90"
            >
              {t("learnMore")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== AUTHORITY QUOTE ====== */}
      <section className="bg-[#0D7ED0] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-12 h-12 text-n2k-secondary mx-auto mb-8 opacity-60" />
            <p className="text-2xl md:text-3xl lg:text-4xl font-black font-heading text-white leading-snug tracking-tight mb-6">
              {t("authorityQuote")}
            </p>
            <p className="text-n2k-secondary-container font-bold font-heading text-base mb-3">
              {t("authorityQuoteAuthor")}
            </p>
            <p className="text-white font-body text-sm leading-relaxed max-w-xl mx-auto">
              {t("authorityDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className="py-16 md:py-24 bg-n2k-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-n2k-primary rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center text-white relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-6 tracking-tight leading-tight">
            {tCta("title")}
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-10 md:mb-14 max-w-2xl mx-auto font-body leading-relaxed">
            {tCta("subtitle")}
          </p>
          <Link
            href="/diagnostic"
            className="inline-flex items-center justify-center gap-3 bg-white text-n2k-secondary px-8 md:px-10 py-4 rounded-xl font-black text-sm md:text-base hover:scale-105 active:scale-95 transition-all shadow-ambient-lg w-full sm:w-auto font-heading group uppercase tracking-wider"
          >
            {tCta("button")}
            <ArrowRight className="group-hover:translate-x-1 transition-transform shrink-0 w-5 h-5 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </>
  );
}
