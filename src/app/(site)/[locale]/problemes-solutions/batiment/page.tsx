import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Building2, Home, CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import ZoneNav from "@/components/zones/ZoneNav";
import ProductStepCard from "@/components/zones/ProductStepCard";
import AlertBlock from "@/components/zones/AlertBlock";
import KpiCards from "@/components/zones/KpiCards";
import FaqAccordion from "@/components/zones/FaqAccordion";
import RelatedArticlesCarousel from "@/components/blog/RelatedArticlesCarousel";

export async function generateMetadata() {
  return {
    title: "Hygiène des Surfaces & Sols en Élevage — Protocole Biosécurité N2K",
    description: "Protocole séquentiel CLORAGRO + OPTIMAGRO pour la destruction du biofilm et la désinfection des surfaces en élevage, abattoir et industrie agroalimentaire.",
  };
}

export default async function BatimentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("zonesDetail");
  const z = await getTranslations("zonesDetail.batiment");
  const tNav = await getTranslations("nav");
  const tHero = await getTranslations("hero");

  const faqItems = [0, 1, 2, 3, 4].map((i) => ({
    question: z(`faq.${i}.q`),
    answer: z(`faq.${i}.a`),
  }));

  const kpiItems = [0, 1, 2].map((i) => ({
    value: z(`kpi.${i}.value`),
    label: z(`kpi.${i}.label`),
    icon: z(`kpi.${i}.icon`) as "reduction" | "shield" | "clock",
  }));

  const tableHeaders: string[] = [0, 1, 2, 3].map((i) => z(`tableHeaders.${i}`));
  const tableRows: string[][] = [0, 1, 2, 3, 4].map((r) =>
    [0, 1, 2, 3].map((c) => z(`tableRows.${r}.${c}`))
  );

  return (
    <div className="bg-n2k-surface min-h-[calc(100vh-80px)]">
      {/* ====== HERO ====== */}
      <section className="relative bg-n2k-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0D7ED0] rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 lg:py-36 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column — Content */}
            <div className="w-full lg:w-2/3 max-w">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-px bg-[#4da8e8] shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-[#4da8e8] uppercase">{t("sectorBadges")}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] tracking-tighter mb-8">
                {z("heroTitleStart")}
                <br />
                <span className="text-[#4da8e8]">
                  {z("heroTitleHighlight")}
                </span>
                {z("heroTitleEnd")}
              </h1>

              <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed max-w mb-10 text-justify">
                {z("heroSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link
                  href="/diagnostic"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg shadow-n2k-secondary/20 transition-all"
                >
                  {tHero("cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/secteurs"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
                >
                  {tHero("ctaSectors")}
                </Link>
              </div>

              {/* Breadcrumb — bottom of hero */}
              <nav className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold mt-10">
                <Link href="/" className="hover:text-n2k-secondary transition-colors flex items-center gap-1.5">
                  <Home size={14} />
                  {tNav("home")}
                </Link>
                <ChevronRight size={12} className="opacity-50" />
                <Link href="/problemes-solutions" className="hover:text-n2k-secondary transition-colors">{tNav("problemesSolutions")}</Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-n2k-secondary-light">{z("breadcrumbCurrent")}</span>
              </nav>
            </div>

            {/* Right Column — Hero Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <Image
                  src="/images/zones/batiment-hero.png"
                  alt={z("heroTitleStart")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== LE PROBLÈME ====== */}
      <section className="bg-white py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-[#4da8e8]" />
            <h2 className="text-xs font-black tracking-[0.2em] text-[#4da8e8] uppercase font-heading">{t("problemSectionTitle")}</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-2/3 space-y-6">
              <p className="text-n2k-primary font-body text-base md:text-lg leading-relaxed text-justify">{z("problem.p1")}</p>
              <p className="text-n2k-primary font-body text-base md:text-lg leading-relaxed text-justify">{z("problem.p2")}</p>
              <p className="text-n2k-primary font-body text-base md:text-lg leading-relaxed text-justify">{z("problem.p3")}</p>
              <p className="text-n2k-primary font-body text-base md:text-lg leading-relaxed text-justify">{z("problem.p4")}</p>
            </div>
            <div className="w-full lg:w-1/3 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/30 h-[350px] md:h-[480px] w-full">
                <Image
                  src="/images/zones/batiment-problem.png"
                  alt="Biofilm sur surfaces en béton d'un bâtiment d'élevage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROTOCOLE ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-[#0D7ED0] shrink-0"></span>
            <h2 className="text-xs font-black tracking-[0.2em] text-[#0D7ED0] uppercase font-heading">{t("protocolSectionTitle")}</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column — Protocol Cards */}
            <div className="w-full lg:w-3/5 space-y-6">
              <ProductStepCard
                step={z("step1.badge")}
                name={z("step1.name")}
                type={z("step1.type")}
                description={z("step1.desc")}
                features={[0, 1, 2, 3, 4].map((i) => z(`step1.features.${i}`))}
                accentColor="text-[#0D7ED0]"
                accentBg="bg-[#0D7ED0]"
              />

              <AlertBlock title={z("rinse.title")} description={z("rinse.desc")} variant="warning" />

              <ProductStepCard
                step={z("step2.badge")}
                name={z("step2.name")}
                type={z("step2.type")}
                description={z("step2.desc")}
                features={[0, 1, 2, 3, 4].map((i) => z(`step2.features.${i}`))}
                accentColor="text-[#0D7ED0]"
                accentBg="bg-[#0D7ED0]"
              />
            </div>

            {/* Right Column — Image */}
            <div className="w-full lg:w-2/5 relative">
              <div className="lg:sticky lg:top-[120px]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/30 h-[350px] md:h-[500px] w-full">
                  <Image
                    src="/images/sectors/batiment-elevage.webp"
                    alt="Nettoyage et désinfection des surfaces en bâtiment d'élevage"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div> 
          </div>



{/* ALCOSEPT PRO - New Row */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12 lg:mt-16">
            {/* Left Column — Product Card */}
            <div className="w-full lg:w-3/5">
              <ProductStepCard
                step=""
                name="ALCOSEPT PRO"
                type="Nettoyage Rapide — Inter-Lots"
                description="Solution de nettoyage technique à évaporation rapide, conçue pour un usage entre les opérations de production en environnements agroalimentaires."
                features={[
                  "Nettoyage rapide des surfaces de travail entre opérations",
                  "Entretien des équipements inox et plastiques techniques",
                  "Évaporation rapide sans laisser de résidus"
                ]}
                accentColor="text-[#0D7ED0]"
                accentBg="bg-[#0D7ED0]"
              />
            </div>

            {/* Right Column — Image */}
            <div className="w-full lg:w-2/5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/30 aspect-[533/248] w-full">
                <Image
                  src="/images/alcosept_pro_slaughterhouse.png"
                  alt="ALCOSEPT PRO application en abattoir"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

{/* OXYLIS HOCl - New Row */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12 lg:mt-16">
            {/* Left Column — Product Card */}
            <div className="w-full lg:w-3/5">
              <ProductStepCard
                step=""
                name="OXYLIS HOCl"
                type="Entretien des Réseaux d'Eau & Environnements"
                description="Solution technique polyvalente à base d'acide hypochloreux (HOCl) pour l'entretien continu des circuits d'eau et le traitement des environnements de production en élevage et industrie agroalimentaire."
                features={[
                  "Entretien continu des canalisations d'eau et réseaux d'abreuvement",
                  "Nébulisation des ambiances de production",
                  "Dosage automatisé pour flux de production continu"
                ]}
                accentColor="text-[#0D7ED0]"
                accentBg="bg-[#0D7ED0]"
              />
            </div>

            {/* Right Column — Image */}
            <div className="w-full lg:w-2/5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/30 aspect-[533/248] w-full">
                <Image
                  src="/images/oxylis_hocl_composite.png"
                  alt="OXYLIS HOCl — canalisations d'eau, bâtiment d'élevage, industrie agroalimentaire"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>












        </div>
      </section>

      {/* ====== TABLEAU ====== */}
      <section className="bg-white py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight mb-10">{t("tableSectionTitle")}</h2>
          <div className="overflow-x-auto rounded-2xl border border-border/50 shadow-ambient">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-[#0D7ED0] text-white">
                  {tableHeaders.map((h, i) => (
                    <th key={i} className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-n2k-surface"}>
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-6 py-4 ${ci === 0 ? "font-bold text-n2k-primary" : "text-n2k-on-surface-variant"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== KPI ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight mb-10">{t("resultsSectionTitle")}</h2>
          <KpiCards items={kpiItems} accentColor="text-[#0D7ED0]" accentBg="bg-[#0D7ED0]/10" />
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="bg-white py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight mb-10">{t("faqSectionTitle")}</h2>
          <FaqAccordion items={faqItems} columns={2} />
        </div>
      </section>

      {/* ====== RELATED BLOG POSTS ====== */}
      <RelatedArticlesCarousel tag="Bâtiment" locale={locale} />

      {/* ====== CTA ====== */}
      <section className="bg-[#0D7ED0] py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black font-heading text-white tracking-tight mb-10">Prêt à sécuriser vos surfaces ?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0D7ED0] px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg transition-all hover:scale-105"
            >
              {t("ctaDiagnostic")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/produits"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
            >
              {t("ctaProduits")}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
