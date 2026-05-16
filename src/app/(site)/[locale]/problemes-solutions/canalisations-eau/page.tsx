import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Droplets, ShieldCheck, Home } from "lucide-react";
import Image from "next/image";
import ZoneNav from "@/components/zones/ZoneNav";
import ProductStepCard from "@/components/zones/ProductStepCard";
import KpiCards from "@/components/zones/KpiCards";
import FaqAccordion from "@/components/zones/FaqAccordion";

export async function generateMetadata() {
  return {
    title: "Traitement des Canalisations d'Abreuvement — N2K Hygiène Opérationnelle",
    description: "Protocole BIONET + OXYLIS HOCl pour le nettoyage et l'entretien des réseaux d'eau en élevage. Élimination du biofilm et du tartre dans les canalisations.",
  };
}

export default async function CanalisationsEauPage() {
  const t = await getTranslations("zonesDetail");
  const z = await getTranslations("zonesDetail.canalisations");

  const faqItems = [0, 1, 2, 3, 4].map((i) => ({
    question: z(`faq.${i}.q`),
    answer: z(`faq.${i}.a`),
  }));

  const kpiItems = [0, 1, 2].map((i) => ({
    value: z(`kpi.${i}.value`),
    label: z(`kpi.${i}.label`),
    icon: z(`kpi.${i}.icon`) as "reduction" | "shield" | "clock",
  }));

  const tableHeaders: string[] = [0, 1, 2].map((i) => z(`tableHeaders.${i}`));
  const tableRows: string[][] = [0, 1, 2, 3, 4].map((r) =>
    [0, 1, 2].map((c) => z(`tableRows.${r}.${c}`))
  );

  const compatItems: string[] = [0, 1, 2, 3].map((i) => z(`compatibility.items.${i}`));

  return (
    <div className="bg-n2k-surface min-h-[calc(100vh-80px)]">
      {/* ====== HERO ====== */}
      <section className="relative bg-n2k-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-n2k-secondary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 lg:py-36 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column — Content */}
            <div className="w-full lg:w-2/3 max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-px bg-n2k-secondary-light shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">{t("sectorBadges")}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] tracking-tighter mb-8">
                {z("heroTitleStart")}
                <br />
                <span className="text-n2k-secondary-light">
                  {z("heroTitleHighlight")}
                </span>
                {z("heroTitleEnd")}
              </h1>

              <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mb-10 text-justify">
                {z("heroSubtitle")}
              </p>

              <nav className="flex items-center gap-2 text-sm text-white/50 font-body">
                <Home className="w-4 h-4" />
                <Link href="/" className="hover:text-white transition-colors">{t("breadcrumbHome")}</Link>
                <span>/</span>
                <Link href="/problemes-solutions" className="hover:text-white transition-colors">{t("breadcrumbParent")}</Link>
                <span>/</span>
                <span className="text-white/80 font-medium">{z("breadcrumbCurrent")}</span>
              </nav>
            </div>

            {/* Right Column — Hero Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <Image
                  src="/images/zones/canalisations-hero.png"
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
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-6 h-6 text-n2k-secondary-light" />
            <h2 className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase font-heading">{t("problemSectionTitle")}</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-2/3 space-y-6">
              <p className="text-n2k-primary font-body text-base md:text-lg leading-relaxed">{z("problem.p1")}</p>
              <p className="text-n2k-primary font-body text-base md:text-lg leading-relaxed">{z("problem.p2")}</p>
              <p className="text-n2k-primary font-body text-base md:text-lg leading-relaxed">{z("problem.p3")}</p>
              <p className="text-n2k-primary font-body text-base md:text-lg leading-relaxed">{z("problem.p4")}</p>
            </div>
            <div className="w-full lg:w-1/3 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/30 h-[350px] md:h-[480px] w-full">
                <Image
                  src="/images/zones/canalisations-problem.png"
                  alt="Biofilm et tartre dans une canalisation d'eau d'élevage"
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
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-n2k-primary shrink-0"></span>
            <h2 className="text-xs font-black tracking-[0.2em] text-n2k-primary uppercase font-heading">{t("protocolSectionTitle")}</h2>
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
                accentColor="text-n2k-primary"
                accentBg="bg-n2k-primary"
              />

              <div className="flex items-center justify-center py-2">
                <div className="w-10 h-10 rounded-full bg-n2k-surface-low flex items-center justify-center shadow-sm">
                  <ArrowRight className="w-5 h-5 text-n2k-primary rotate-90" />
                </div>
              </div>

              <ProductStepCard
                step={z("step2.badge")}
                name={z("step2.name")}
                type={z("step2.type")}
                description={z("step2.desc")}
                features={[0, 1, 2, 3, 4].map((i) => z(`step2.features.${i}`))}
                accentColor="text-n2k-primary"
                accentBg="bg-n2k-primary"
              />
            </div>

            {/* Right Column — Image */}
            <div className="w-full lg:w-2/5 relative">
              <div className="lg:sticky lg:top-[120px]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/30 h-[350px] md:h-[500px] w-full">
                  <Image
                    src="/images/sectors/eau-elevage.webp"
                    alt="Traitement des canalisations d'eau en élevage"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TABLEAU COMPARATIF ====== */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight mb-10">Comparatif Avant / Après</h2>
          <div className="overflow-x-auto rounded-2xl border border-border/50 shadow-ambient">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-n2k-primary text-white">
                  {tableHeaders.map((h, i) => (
                    <th key={i} className="px-6 py-4 text-left font-bold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-n2k-surface"}>
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-6 py-4 ${ci === 0 ? "font-bold text-n2k-primary" : ci === 1 ? "text-red-600" : "text-emerald-700 font-medium"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== COMPATIBILITÉ ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight mb-8">{z("compatibility.title")}</h2>
            <ul className="space-y-4">
              {compatItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-n2k-on-surface-variant font-body leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ====== KPI ====== */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight mb-10">{t("resultsSectionTitle")}</h2>
          <KpiCards items={kpiItems} accentColor="text-n2k-primary" accentBg="bg-n2k-primary/10" />
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight mb-10">{t("faqSectionTitle")}</h2>
          <FaqAccordion items={faqItems} columns={2} />
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="bg-n2k-primary py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black font-heading text-white tracking-tight mb-10">Prêt à sécuriser votre réseau d&apos;eau ?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnostic" className="inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg transition-all hover:scale-105">
              {t("ctaDiagnostic")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/produits" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15">
              {t("ctaProduits")}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
