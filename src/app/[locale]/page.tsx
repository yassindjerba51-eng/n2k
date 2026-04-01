import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Building2, Droplets, Wind, Microscope, ShieldCheck, PhoneCall, MapPin, CheckCircle } from "lucide-react";
import StickyDiagnosticCTA from "@/components/ui/StickyDiagnosticCTA";
import SchemaOrg from "@/components/seo/SchemaOrg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: [
        {
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKsx2Rlc4yFz407q19RlBlyWgJugENsJ1pwTWzcckhnuckDWRnFkxzLn4NPQ2b8IRCtnmSmSy2IZkKLXPjW9LLqOpPENRw1ldLOazcAwYTYjMwgc-lXdHbUoD2ADfDCV40rdSI68-FbrNyJAtqgn7T5T5r8-0RJNgCvZq2qoBjJJwdIC79eT0ukjaoGFSJ4hBdRZrQbOGlA0Ftht_TqiQzopgVoTF17EYhhftloNtRura3f4GsaMHc5CYlaqGy5U31aKXnJtgLWLA",
          width: 1200,
          height: 630,
          alt: t("homeTitle"),
        },
      ],
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Les Laboratoires N2K",
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuDKsx2Rlc4yFz407q19RlBlyWgJugENsJ1pwTWzcckhnuckDWRnFkxzLn4NPQ2b8IRCtnmSmSy2IZkKLXPjW9LLqOpPENRw1ldLOazcAwYTYjMwgc-lXdHbUoD2ADfDCV40rdSI68-FbrNyJAtqgn7T5T5r8-0RJNgCvZq2qoBjJJwdIC79eT0ukjaoGFSJ4hBdRZrQbOGlA0Ftht_TqiQzopgVoTF17EYhhftloNtRura3f4GsaMHc5CYlaqGy5U31aKXnJtgLWLA",
    "@id": "https://n2k-laboratoires.tn",
    "url": "https://n2k-laboratoires.tn",
    "telephone": "+21600000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Borj Cédria Technopark",
      "addressLocality": "Hammam Chott",
      "addressRegion": "Ben Arous",
      "postalCode": "2050",
      "addressCountry": "TN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.7139,
      "longitude": 10.4286
    }
  };

  const protocolPhases = [
    {
      label: t("protocol.phase1.label"),
      name: t("protocol.phase1.name"),
      type: t("protocol.phase1.type"),
      features: t.raw("protocol.phase1.features") as string[],
      badgeLabel: t("protocol.phase1.badgeLabel"),
      badge: t("protocol.phase1.badge"),
      icon: Microscope,
      color: "secondary" as const,
    },
    {
      label: t("protocol.phase2.label"),
      name: t("protocol.phase2.name"),
      type: t("protocol.phase2.type"),
      features: t.raw("protocol.phase2.features") as string[],
      badgeLabel: t("protocol.phase2.badgeLabel"),
      badge: t("protocol.phase2.badge"),
      icon: ShieldCheck,
      color: "primary" as const,
    }
  ];

  return (
    <>
      <SchemaOrg schema={businessSchema} />
      <StickyDiagnosticCTA />

      {/* ====== HERO SECTION ====== */}
      <section className="relative bg-n2k-surface overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 stagger-children">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
                <span className="label-md text-n2k-secondary font-black tracking-[0.2em] text-xs">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading text-n2k-primary leading-[1.05] tracking-tighter mb-8 break-words">
                {t("hero.title1")} <br />
                {t("hero.title2")} <br />
                <span className="text-n2k-secondary">{t("hero.title3")}</span>
              </h1>

              <p className="font-body text-base md:text-lg text-n2k-on-surface-variant leading-relaxed max-w-xl mb-10">
                {t("hero.subtitle")}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-n2k-secondary hover:bg-n2k-secondary/90 text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all group text-sm md:text-base"
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
              </Link>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKsx2Rlc4yFz407q19RlBlyWgJugENsJ1pwTWzcckhnuckDWRnFkxzLn4NPQ2b8IRCtnmSmSy2IZkKLXPjW9LLqOpPENRw1ldLOazcAwYTYjMwgc-lXdHbUoD2ADfDCV40rdSI68-FbrNyJAtqgn7T5T5r8-0RJNgCvZq2qoBjJJwdIC79eT0ukjaoGFSJ4hBdRZrQbOGlA0Ftht_TqiQzopgVoTF17EYhhftloNtRura3f4GsaMHc5CYlaqGy5U31aKXnJtgLWLA"
                  alt={t("hero.imageAlt")}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROBLEMS SECTION — Dark Navy ====== */}
      <section className="bg-n2k-primary-container relative py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white leading-tight tracking-tight mb-4">
                {t("problems.title")} <br />
                <span className="text-n2k-orange">{t("problems.titleHighlight")}</span>
              </h2>
              <p className="text-n2k-on-primary-container text-base md:text-lg leading-relaxed max-w-2xl font-body">
                {t("problems.subtitle")}
              </p>
            </div>
            <Link
              href="/problemes-solutions"
              className="inline-flex items-center gap-2 bg-n2k-orange hover:bg-n2k-orange/90 text-white px-6 py-3 rounded-lg font-bold text-sm font-heading transition-all group shrink-0"
            >
              {t("problems.discoverLink")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </Link>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Building */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-n2k-orange/20 flex items-center justify-center mb-5">
                <Building2 className="text-n2k-orange w-6 h-6" />
              </div>
              <h3 className="text-lg font-black font-heading text-white mb-3">
                {t("problems.building.title")}
              </h3>
              <p className="text-n2k-on-primary-container text-sm leading-relaxed font-body mb-6">
                {t("problems.building.description")}
              </p>
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-n2k-orange">
                    {t("problems.building.risk")}
                  </span>
                  <span className="text-xs font-black text-white">
                    {t("problems.building.riskPercent")}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-n2k-orange rounded-full transition-all duration-1000 ease-out" style={{ width: `${parseInt(t("problems.building.riskPercent")) || 85}%` }} />
                </div>
              </div>
            </div>

            {/* Water */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-n2k-orange/20 flex items-center justify-center mb-5">
                <Droplets className="text-n2k-orange w-6 h-6" />
              </div>
              <h3 className="text-lg font-black font-heading text-white mb-3">
                {t("problems.water.title")}
              </h3>
              <p className="text-n2k-on-primary-container text-sm leading-relaxed font-body mb-6">
                {t("problems.water.description")}
              </p>
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-n2k-orange">
                    {t("problems.water.risk")}
                  </span>
                  <span className="text-xs font-black text-white">
                    {t("problems.water.riskPercent")}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-n2k-orange rounded-full transition-all duration-1000 ease-out" style={{ width: `${parseInt(t("problems.water.riskPercent")) || 92}%` }} />
                </div>
              </div>
            </div>

            {/* Air */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-n2k-orange/20 flex items-center justify-center mb-5">
                <Wind className="text-n2k-orange w-6 h-6" />
              </div>
              <h3 className="text-lg font-black font-heading text-white mb-3">
                {t("problems.air.title")}
              </h3>
              <p className="text-n2k-on-primary-container text-sm leading-relaxed font-body mb-6">
                {t("problems.air.description")}
              </p>
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-n2k-orange">
                    {t("problems.air.risk")}
                  </span>
                  <span className="text-xs font-black text-white">
                    {t("problems.air.riskPercent")}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-n2k-orange rounded-full transition-all duration-1000 ease-out" style={{ width: `${parseInt(t("problems.air.riskPercent")) || 78}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROTOCOL SECTION — Side by Side Cards ====== */}
      <section className="py-16 md:py-24 bg-n2k-surface-low relative">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="label-md text-n2k-secondary inline-block mb-4 text-xs tracking-widest">
              {t("protocol.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary mb-4 tracking-tight leading-tight">
              {t("protocol.title")}
            </h2>
            <p className="text-n2k-on-surface-variant text-base md:text-lg font-body leading-relaxed">
              {t("protocol.subtitle")}
            </p>
          </div>

          {/* Protocol Cards — Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {protocolPhases.map((phase, idx) => {
              const colorClass = phase.color === "secondary" ? "text-n2k-secondary" : "text-n2k-primary";
              const bgColorClass = phase.color === "secondary" ? "bg-n2k-secondary" : "bg-n2k-primary";
              const containerBgClass = phase.color === "secondary" ? "bg-n2k-secondary/10" : "bg-n2k-primary/10";

              return (
                <div key={idx} className="bg-n2k-surface-lowest rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-ambient hover:shadow-ambient-lg transition-all duration-500 ghost-border relative overflow-hidden group">
                  {/* Phase Badge */}
                  <div className={`absolute top-0 right-0 ${bgColorClass} text-white px-6 py-1.5 rounded-es-2xl font-black uppercase tracking-widest text-[10px] font-heading`}>
                    {phase.label}
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8 mt-2">
                    <div className={`w-14 h-14 shrink-0 ${containerBgClass} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                      <phase.icon className={`${colorClass} w-7 h-7`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-heading text-n2k-primary">
                        {phase.name}
                      </h3>
                      <p className={`${colorClass} font-bold uppercase tracking-widest text-[11px] font-heading`}>
                        {phase.type}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 font-body text-sm">
                    {phase.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-n2k-on-surface-variant leading-snug">
                        <CheckCircle className={`${colorClass} shrink-0 w-5 h-5 mt-0.5`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Badge */}
                  <div className="p-4 bg-n2k-surface-low rounded-xl flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold text-n2k-primary font-heading uppercase tracking-wider">
                      {phase.badgeLabel}
                    </span>
                    <span className={`${bgColorClass} text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest`}>
                      {phase.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== AUTHORITY SECTION — Image + Content ====== */}
      <section className="py-16 md:py-24 bg-n2k-surface relative">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16">
            {/* Lab Image */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAtBErDyob_wmr6Jsef4YSckr4y3wJGEucFB6MLk3KeiMs_fLiyw39CuzaZenfhep9vjy6AE8vy-J2slC-YHZVP3z5CfF919R5uqMA4SVRs6s-NfBdCwDuCyjRWbvmvZZTgZuWbaAChaHLdzmT1ZnM7mWWlb0nfjosWHN42MWa1o7hs__EMxoCsZaPG0uM8fl4TzzABdw-6WyTLxc8-drs3OVd0_hcGel5xLBE6CqE1xgYiHNeb4-FvgKyuRKkuGcIj68i93-_56s"
                  alt={t("authority.imageAlt")}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary leading-tight tracking-tight mb-10">
                {t("authority.title")} <span className="text-n2k-secondary">{t("authority.titleHighlight")}</span><br />
                {t("authority.titleEnd")}
              </h2>

              <div className="space-y-8 mb-10">
                {/* Dr. Nafeti */}
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 shrink-0 bg-n2k-secondary/10 rounded-xl flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-n2k-secondary" />
                  </div>
                  <div>
                    <h4 className="font-black font-heading text-n2k-primary text-lg mb-1">
                      {t("authority.doctor.name")}
                    </h4>
                    <p className="font-body text-n2k-on-surface-variant text-sm leading-relaxed">
                      {t("authority.doctor.description")}
                    </p>
                  </div>
                </div>

                {/* Techpark */}
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 shrink-0 bg-n2k-secondary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-n2k-secondary" />
                  </div>
                  <div>
                    <h4 className="font-black font-heading text-n2k-primary text-lg mb-1">
                      {t("authority.techpark.name")}
                    </h4>
                    <p className="font-body text-n2k-on-surface-variant text-sm leading-relaxed">
                      {t("authority.techpark.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-6 md:p-8 bg-n2k-surface-lowest rounded-2xl border-s-4 border-n2k-secondary shadow-ambient relative">
                <p className="text-base md:text-lg font-bold italic text-n2k-primary font-heading leading-relaxed">
                  {t("authority.quote")}
                </p>
                <p className="text-sm text-n2k-secondary font-bold mt-2 font-heading">
                  {t("authority.quoteAuthor")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA — Green Band ====== */}
      <section className="py-16 md:py-24 bg-n2k-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-n2k-primary rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center text-white relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-6 tracking-tight leading-tight">
            {t("cta.title")}
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-10 md:mb-14 max-w-2xl mx-auto font-body leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="bg-white text-n2k-secondary px-8 md:px-10 py-4 rounded-xl font-black text-sm md:text-base hover:scale-105 active:scale-95 transition-all shadow-ambient-lg w-full sm:w-auto font-heading group uppercase tracking-wider"
            >
              <span className="flex items-center justify-center gap-3">
                {t("cta.button")}
                <ArrowRight className="group-hover:translate-x-1 transition-transform shrink-0 w-5 h-5 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </span>
            </Link>
            <a
              href="tel:+21600000000"
              className="flex items-center gap-3 font-bold text-sm md:text-base border-b-2 border-white/20 pb-2 hover:border-white transition-all font-heading"
            >
              <PhoneCall className="w-5 h-5 shrink-0" />
              {t("cta.call")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
