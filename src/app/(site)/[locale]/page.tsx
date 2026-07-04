import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowRight, Building2, Droplets, Wind, Bird, Beef, Factory,
  Shield, ShieldPlus, Wrench, CheckCircle, Award, Users, FileCheck,
  Microscope, FlaskConical, BookOpen, Settings,
} from "lucide-react";
import StickyDiagnosticCTA from "@/components/ui/StickyDiagnosticCTA";
import { HeroSlideshow } from "@/components/ui/HeroSlideshow";
import SchemaOrg from "@/components/seo/SchemaOrg";
import { products } from "@/data/products";
import HomologationBadges from "@/components/ui/HomologationBadges";
import { isHomologatedSlug } from "@/data/homologations";
import { Landmark } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    alternates: {
      canonical: `/${locale}`,
    },
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKsx2Rlc4yFz407q19RlBlyWgJugENsJ1pwTWzcckhnuckDWRnFkxzLn4NPQ2b8IRCtnmSmSy2IZkKLXPjW9LLqOpPENRw1ldLOazcAwYTYjMwgc-lXdHbUoD2ADfDCV40rdSI68-FbrNyJAtqgn7T5T5r8-0RJNgCvZq2qoBjJJwdIC79eT0ukjaoGFSJ4hBdRZrQbOGlA0Ftht_TqiQzopgVoTF17EYhhftloNtRura3f4GsaMHc5CYlaqGy5U31aKXnJtgLWLA", width: 1200, height: 630, alt: t("homeTitle") }],
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  const businessSchema = {
    "@context": "https://schema.org", "@type": "LocalBusiness",
    "name": "Les Laboratoires N2K",
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDKsx2Rlc4yFz407q19RlBlyWgJugENsJ1pwTWzcckhnuckDWRnFkxzLn4NPQ2b8IRCtnmSmSy2IZkKLXPjW9LLqOpPENRw1ldLOazcAwYTYjMwgc-lXdHbUoD2ADfDCV40rdSI68-FbrNyJAtqgn7T5T5r8-0RJNgCvZq2qoBjJJwdIC79eT0ukjaoGFSJ4hBdRZrQbOGlA0Ftht_TqiQzopgVoTF17EYhhftloNtRura3f4GsaMHc5CYlaqGy5U31aKXnJtgLWLA",
    "@id": "https://n2k-laboratoires.tn", "url": "https://n2k-laboratoires.tn",
    "telephone": "+21621444765",
    "address": { "@type": "PostalAddress", "streetAddress": "Borj Cédria Technopark", "addressLocality": "Hammam Chott", "addressRegion": "Ben Arous", "postalCode": "2050", "addressCountry": "TN" },
    "geo": { "@type": "GeoCoordinates", "latitude": 36.7120, "longitude": 10.4247 },
    "sameAs": ["https://www.linkedin.com/company/laboratoires-n2k/"],
  };

  const sectorCards = [
    { key: "elevage", href: "/secteurs/elevage", Icon: Bird, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { key: "abattoirs", href: "/secteurs/abattoirs", Icon: Beef, color: "bg-red-50 text-red-700 border-red-200" },
    { key: "agroalimentaire", href: "/secteurs/industrie-agroalimentaire", Icon: Factory, color: "bg-blue-50 text-blue-700 border-blue-200" },
  ];

  const problemCards = [
    { key: "building", Icon: Building2, color: "text-n2k-orange" },
    { key: "water", Icon: Droplets, color: "text-blue-600" },
    { key: "air", Icon: Wind, color: "text-purple-600" },
  ];

  const protocolSteps = [
    { key: "step1", Icon: Wrench, number: "01", color: "bg-n2k-secondary" },
    { key: "step2", Icon: Shield, number: "02", color: "bg-n2k-primary" },
    { key: "step3", Icon: ShieldPlus, number: "03", color: "bg-n2k-orange" },
  ];

  const credibilityItems = [
    { key: "expertise", Icon: Users },
    { key: "protocols", Icon: FileCheck },
    { key: "compliance", Icon: Award },
    { key: "support", Icon: Microscope },
    { key: "mastery", Icon: FlaskConical },
    { key: "serious", Icon: Shield },
  ];

  const productRoles: Record<string, string> = {
    cloragro: t("homeProducts.cloragro"),
    optimagro: t("homeProducts.optimagro"),
    bionet: t("homeProducts.bionet"),
    "oxylis-hoci": t("homeProducts.oxylis-hoci"),
    "alcosept-pro": t("homeProducts.alcosept-pro"),
    bioactive: t("homeProducts.bioactive"),
  };

  return (
    <div className="bg-n2k-surface">
      <SchemaOrg schema={businessSchema} />
      <StickyDiagnosticCTA />

      {/* ====== BLOC 1 — HERO ====== */}
      <section className="relative bg-n2k-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-n2k-secondary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 lg:py-36 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column: Content */}
            <div className="w-full lg:w-2/3 max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-px bg-n2k-secondary-light shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
                  {t("hero.badge")}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] tracking-tighter mb-8">
                {t("hero.title1")}{" "}
                <span className="text-n2k-secondary-light">{t("hero.title2")}</span>{" "}
                <span className="text-white/60">{t("hero.title3")}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 font-body leading-relaxed mb-10 text-justify">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link
                  href="/diagnostic"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg shadow-n2k-secondary/20 transition-all"
                >
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/problemes-solutions"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>
            {/* Right Column: Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <HeroSlideshow altText={t("hero.imageAlt")} />
              </div>
              {/* Decorative glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-n2k-secondary/20 blur-3xl -z-10 rounded-full mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== BLOC 1b — EXPERTISE INSTITUTIONNELLE ====== */}
      <section className="bg-white py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-n2k-primary shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-n2k-primary uppercase">{t("homeExpertise.badge")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-6">
                {t("homeExpertise.title")}{" "}
                <span className="text-n2k-secondary">{t("homeExpertise.titleHighlight")}</span>
              </h2>
              <div className="space-y-4 text-n2k-on-surface-variant font-body text-lg leading-relaxed text-justify">
                <p>{t("homeExpertise.desc1")}</p>
                <p>{t("homeExpertise.desc2")}</p>
                <p>{t("homeExpertise.desc3")}</p>
              </div>
            </div>

            {/* Right — 4 pillars grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["dev", "fab", "terrain", "qualite"] as const).map((key) => {
                const icons = {
                  dev: FlaskConical,
                  fab: Settings,
                  terrain: Users,
                  qualite: CheckCircle,
                };
                const IconComp = icons[key];
                return (
                  <div key={key} className="bg-n2k-surface-low rounded-xl p-6 border border-n2k-outline-variant/10">
                    <IconComp className="w-6 h-6 text-n2k-secondary mb-3" />
                    <h3 className="text-sm font-bold font-heading text-n2k-primary mb-1">{t(`homeExpertise.pillars.${key}.title`)}</h3>
                    <p className="text-xs text-n2k-on-surface-variant font-body leading-relaxed">{t(`homeExpertise.pillars.${key}.desc`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====== BLOC 2 — SECTEURS ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">{t("sectors.badge")}</span>
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-4">{t("sectors.title")}</h2>
            <p className="text-n2k-on-surface-variant font-body text-lg max-w-2xl mx-auto">{t("sectors.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sectorCards.map((s) => (
              <Link key={s.key} href={s.href as any} className="group bg-white rounded-2xl p-8 md:p-10 border border-n2k-outline-variant/20 shadow-ambient hover:shadow-ambient-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl ${s.color} flex items-center justify-center mb-6 border`}>
                  <s.Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black font-heading text-n2k-primary tracking-tight mb-3">{t(`sectors.${s.key}.title`)}</h3>
                <p className="text-n2k-on-surface-variant font-body leading-relaxed mb-6 text-sm">{t(`sectors.${s.key}.desc`)}</p>
                <span className="inline-flex items-center gap-2 text-n2k-secondary font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all">
                  {t(`sectors.${s.key}.link`)} <span className="text-lg">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== BLOC 3 — PROBLÈMES ====== */}
      <section className="bg-n2k-surface-low py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-n2k-orange shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] text-n2k-orange uppercase">{t("problems.badge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-4">
              {t("problems.title")} <span className="text-n2k-orange">{t("problems.titleHighlight")}</span>
            </h2>
            <p className="text-n2k-on-surface-variant font-body text-lg leading-relaxed">{t("problems.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemCards.map((p) => (
              <div key={p.key} className="bg-white rounded-2xl p-8 border border-n2k-outline-variant/20 shadow-ambient">
                <p.Icon className={`w-8 h-8 ${p.color} mb-5`} />
                <h3 className="text-xl font-bold font-heading text-n2k-primary mb-3">{t(`problems.${p.key}.title`)}</h3>
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-4">{t(`problems.${p.key}.description`)}</p>
                <div className="bg-n2k-surface-low rounded-lg p-4">
                  <p className="text-n2k-red font-body text-xs font-bold">{t(`problems.${p.key}.impact`)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/problemes-solutions" className="inline-flex items-center gap-2 text-n2k-secondary font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all">
              {t("problems.discoverLink")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== BLOC 3b — SOLUTIONS STRUCTURÉES ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">{t("solutionsIntro.badge")}</span>
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-4">
              {t("solutionsIntro.title")} <span className="text-n2k-secondary">{t("solutionsIntro.titleHighlight")}</span>
            </h2>
            <p className="text-n2k-on-surface-variant font-body text-lg max-w-2xl mx-auto">{t("solutionsIntro.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {(["clean", "disinfect", "maintain"] as const).map((key, idx) => {
              const colors = ["bg-n2k-secondary", "bg-n2k-primary", "bg-n2k-orange"];
              const numbers = ["01", "02", "03"];
              return (
                <div key={key} className="bg-white rounded-2xl p-8 border border-n2k-outline-variant/20 shadow-ambient">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg ${colors[idx]} flex items-center justify-center`}>
                      <span className="text-white text-sm font-black">{numbers[idx]}</span>
                    </div>
                    <span className="text-xs font-black tracking-[0.15em] text-n2k-on-surface-variant/40 uppercase">{t(`solutionsIntro.${key}.step`)}</span>
                  </div>
                  <h3 className="text-2xl font-black font-heading text-n2k-primary mb-3">{t(`solutionsIntro.${key}.title`)}</h3>
                  <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-4">{t(`solutionsIntro.${key}.desc`)}</p>
                  <div className="bg-n2k-surface-low rounded-lg px-4 py-2">
                    <span className="text-n2k-secondary-light text-xs font-bold">{t(`solutionsIntro.${key}.products`)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== BLOC 5 — CRÉDIBILITÉ ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">{t("credibility.badge")}</span>
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-4">
              {t("credibility.title")} <span className="text-n2k-secondary">{t("credibility.titleHighlight")}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credibilityItems.map((item) => (
              <div key={item.key} className="bg-white rounded-2xl p-8 border border-n2k-outline-variant/20 shadow-ambient">
                <item.Icon className="w-7 h-7 text-n2k-secondary mb-4" />
                <h3 className="text-lg font-bold font-heading text-n2k-primary mb-2">{t(`credibility.items.${item.key}.title`)}</h3>
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed">{t(`credibility.items.${item.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== BLOC 6 — PRODUITS ====== */}
      <section className="bg-n2k-surface-low py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">{t("homeProducts.badge")}</span>
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-4">{t("homeProducts.title")}</h2>
            <p className="text-n2k-on-surface-variant font-body text-lg max-w-2xl mx-auto">{t("homeProducts.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.slice(0, 6).map((product) => (
              <Link key={product.slug} href={`/produits/${product.slug}` as any} className="group bg-white rounded-2xl p-6 md:p-8 border border-n2k-outline-variant/20 shadow-ambient hover:shadow-ambient-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-black font-heading text-n2k-primary tracking-tight">{product.name}</h3>
                  <ArrowRight className="w-4 h-4 text-n2k-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed">
                  {productRoles[product.slug] || product.subtitle}
                </p>
                {isHomologatedSlug(product.slug) && (
                  <HomologationBadges variant="compact" className="mt-4" />
                )}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/produits" className="inline-flex items-center gap-2 text-n2k-secondary font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all">
              {t("homeProducts.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== BLOC 6b — RÉASSURANCE RÉGLEMENTAIRE ====== */}
      <section className="bg-white py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="bg-n2k-primary rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-n2k-secondary rounded-full blur-[200px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Landmark className="w-8 h-8 text-n2k-secondary-light" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-n2k-secondary-light shrink-0"></span>
                  <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
                    {t("homologation.homeBadge")}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-white tracking-tight mb-4">
                  {t("homologation.homeTitle")}
                </h2>
                <p className="text-white/60 font-body text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
                  {t("homologation.homeText")}
                </p>
                <HomologationBadges tone="light" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BLOC 7 — BLOG PREVIEW ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-n2k-secondary" />
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">{t("homeBlog.badge")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-n2k-primary tracking-tight">{t("homeBlog.title")}</h2>
              <p className="text-n2k-on-surface-variant font-body text-lg mt-2">{t("homeBlog.subtitle")}</p>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-n2k-secondary font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all shrink-0">
              {t("homeBlog.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-n2k-surface-low rounded-2xl p-8 md:p-12 border border-n2k-outline-variant/20 text-center">
            <BookOpen className="w-10 h-10 text-n2k-outline mx-auto mb-4" />
            <p className="text-n2k-on-surface-variant font-body">
              {t.rich("homeBlog.libraryText", {
                link: (chunks) => (
                  <Link href="/blog" className="text-n2k-secondary font-bold hover:underline">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </div>
      </section>

      {/* ====== BLOC 8 — CTA FINAL ====== */}
      <section className="bg-n2k-primary py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-6">{t("cta.title")}</h2>
          <p className="text-white/60 font-body text-lg mb-10 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/problemes-solutions" className="inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg transition-all">
              {t("cta.button")} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15">
              {t("cta.button2")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
