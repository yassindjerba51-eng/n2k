import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Building2, Droplets, Wind, Microscope, ShieldCheck, PhoneCall, Award, MapPin } from "lucide-react";
import RiskCard from "@/components/ui/RiskCard";
import ScientificTimeline from "@/components/ui/ScientificTimeline";
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
      features: t.raw("protocol.phase1.features"),
      badgeLabel: t("protocol.phase1.badgeLabel"),
      badge: t("protocol.phase1.badge"),
      icon: Microscope,
      color: "secondary" as const,
    },
    {
      label: t("protocol.phase2.label"),
      name: t("protocol.phase2.name"),
      type: t("protocol.phase2.type"),
      features: t.raw("protocol.phase2.features"),
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

      {/* Hero Section — The "Clinical Curator" North Star */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-n2k-surface py-24 pt-28">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 editorial-grid w-full relative z-10 gap-8 lg:gap-24">
          <div className="col-span-12 lg:col-span-11 xl:col-span-7 flex flex-col justify-center stagger-children">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="label-md text-n2k-secondary font-black tracking-[0.2em] text-xs md:tracking-[0.3em]">
                {t("hero.badge")}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-heading text-n2k-primary leading-[1.05] tracking-tighter mb-8 break-words">
              {t("hero.title1")} <br />
              {t("hero.title2")} <br />
              <span className="text-n2k-secondary">{t("hero.title3")}</span>
            </h1>
            
            <div className="relative mb-10">
              <p className="font-body text-base md:text-xl text-n2k-on-surface-variant leading-relaxed max-w-2xl ps-4 md:ps-8 border-s-4 border-n2k-secondary-container/50">
                {t("hero.subtitle")}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/contact"
                className="btn-gradient text-white px-6 md:px-10 py-4 md:py-5 rounded-2xl font-black font-heading shadow-ambient-lg transition-all flex items-center gap-3 group text-base md:text-lg w-full sm:w-auto justify-center"
              >
                {t("hero.cta")}
                <ArrowRight className="group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2 rtl:rotate-180 shrink-0" />
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 relative">
            <div className="absolute inset-0 bg-n2k-secondary-container/20 -rotate-6 rounded-[3rem] translate-x-8 translate-y-8"></div>
            <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-ambient-lg ghost-border">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKsx2Rlc4yFz407q19RlBlyWgJugENsJ1pwTWzcckhnuckDWRnFkxzLn4NPQ2b8IRCtnmSmSy2IZkKLXPjW9LLqOpPENRw1ldLOazcAwYTYjMwgc-lXdHbUoD2ADfDCV40rdSI68-FbrNyJAtqgn7T5T5r8-0RJNgCvZq2qoBjJJwdIC79eT0ukjaoGFSJ4hBdRZrQbOGlA0Ftht_TqiQzopgVoTF17EYhhftloNtRura3f4GsaMHc5CYlaqGy5U31aKXnJtgLWLA"
                alt={t("hero.imageAlt")}
                fill
                className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Asymmetrical background architectural element */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-n2k-surface-low -z-0 clip-path-asymmetric opacity-50 rtl:left-0 rtl:right-auto rtl:scale-x-[-1]"></div>
      </section>

      {/* Problem Statement Section — "No-Line" Transition */}
      <section className="py-16 md:py-32 bg-n2k-surface-low relative">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-20">
            <span className="label-md text-n2k-orange inline-block mb-5 px-4 py-1 bg-n2k-orange/10 rounded-full text-xs">
              {t("problems.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-heading text-n2k-primary leading-tight tracking-tight mb-6">
              {t("problems.title")} <br />
              <span className="text-n2k-orange">{t("problems.titleHighlight")}</span>
            </h2>
            <p className="text-n2k-on-surface-variant text-base md:text-xl leading-relaxed font-body max-w-3xl">
              {t("problems.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <RiskCard
              title={t("problems.building.title")}
              description={t("problems.building.description")}
              icon={Building2}
              riskLabel={t("problems.building.risk")}
              riskPercent={parseInt(t("problems.building.riskPercent")) || 85}
            />
            <RiskCard
              title={t("problems.water.title")}
              description={t("problems.water.description")}
              icon={Droplets}
              riskLabel={t("problems.water.risk")}
              riskPercent={parseInt(t("problems.water.riskPercent")) || 92}
            />
            <RiskCard
              title={t("problems.air.title")}
              description={t("problems.air.description")}
              icon={Wind}
              riskLabel={t("problems.air.risk")}
              riskPercent={parseInt(t("problems.air.riskPercent")) || 78}
            />
          </div>
        </div>
      </section>

      {/* Protocol Section — Scientific Timeline */}
      <section className="py-16 md:py-32 bg-n2k-surface relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-24">
            <div className="inline-flex items-center gap-3 bg-n2k-surface-high px-5 py-2 rounded-full ghost-border mb-6">
              <Award className="text-n2k-secondary w-4 h-4" />
              <span className="label-md text-n2k-primary text-xs">
                {t("protocol.badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-n2k-primary mb-6 tracking-tighter leading-tight">
              {t("protocol.title")}
            </h2>
            <p className="text-n2k-on-surface-variant text-base md:text-xl font-body leading-relaxed">
              {t("protocol.subtitle")}
            </p>
          </div>

          <ScientificTimeline phases={protocolPhases} />
        </div>
      </section>

      {/* Authority Section — "The Clinical Curator" Profile */}
      <section className="py-16 md:py-32 bg-n2k-surface-container relative">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-32">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="absolute -inset-2 md:-inset-4 border-2 border-n2k-secondary/20 rounded-[2rem] md:rounded-[3rem] -rotate-3"></div>
              <div className="relative z-10 w-full aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAtBErDyob_wmr6Jsef4YSckr4y3wJGEucFB6MLk3KeiMs_fLiyw39CuzaZenfhep9vjy6AE8vy-J2slC-YHZVP3z5CfF919R5uqMA4SVRs6s-NfBdCwDuCyjRWbvmvZZTgZuWbaAChaHLdzmT1ZnM7mWWlb0nfjosWHN42MWa1o7hs__EMxoCsZaPG0uM8fl4TzzABdw-6WyTLxc8-drs3OVd0_hcGel5xLBE6CqE1xgYiHNeb4-FvgKyuRKkuGcIj68i93-_56s"
                  alt={t("authority.imageAlt")}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2 stagger-children">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-heading text-n2k-primary mb-8 md:mb-12 leading-tight tracking-tight">
                {t("authority.title")} <span className="text-n2k-secondary">{t("authority.titleHighlight")}</span><br/>
                {t("authority.titleEnd")}
              </h2>
              
              <div className="space-y-8 md:space-y-12 mb-10 md:mb-16">
                <div className="flex gap-5 md:gap-8 items-start">
                  <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 bg-white rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-ambient ghost-border text-n2k-primary">
                    <Microscope className="w-7 h-7 md:w-10 md:h-10" />
                  </div>
                  <div>
                    <h4 className="font-black font-heading text-n2k-primary text-lg md:text-2xl mb-2">
                      {t("authority.doctor.name")}
                    </h4>
                    <p className="font-body text-n2k-on-surface-variant text-sm md:text-lg leading-relaxed">
                      {t("authority.doctor.description")}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-5 md:gap-8 items-start">
                  <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 bg-white rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-ambient ghost-border text-n2k-primary">
                    <MapPin className="w-7 h-7 md:w-10 md:h-10" />
                  </div>
                  <div>
                    <h4 className="font-black font-heading text-n2k-primary text-lg md:text-2xl mb-2">
                      {t("authority.techpark.name")}
                    </h4>
                    <p className="font-body text-n2k-on-surface-variant text-sm md:text-lg leading-relaxed">
                      {t("authority.techpark.description")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-10 bg-n2k-surface-lowest rounded-[1.5rem] md:rounded-[2.5rem] border-s-4 md:border-s-8 border-n2k-secondary shadow-ambient-lg relative">
                <div className="absolute top-4 right-6 text-n2k-secondary/20 text-6xl md:text-8xl font-serif leading-none">"</div>
                <p className="text-base md:text-xl lg:text-2xl font-black italic text-n2k-primary font-heading leading-relaxed relative z-10">
                  {t("authority.quote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Band — Pure High-End Aesthetic */}
      <section className="py-16 md:py-32 bg-n2k-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-n2k-primary rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 text-center text-white relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-heading mb-6 md:mb-10 tracking-tighter leading-tight">
            {t("cta.title")}
          </h2>
          <p className="text-base md:text-xl text-n2k-surface-lowest/80 mb-10 md:mb-16 max-w-3xl mx-auto font-body leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
            <Link
              href="/contact"
              className="bg-white text-n2k-secondary px-8 md:px-12 py-4 md:py-6 rounded-2xl font-black text-lg md:text-2xl hover:scale-105 active:scale-95 transition-all shadow-ambient-lg w-full sm:w-auto font-heading group"
            >
              <span className="flex items-center justify-center gap-3">
                {t("cta.button")}
                <ArrowRight className="group-hover:translate-x-2 transition-transform shrink-0" />
              </span>
            </Link>
            <a
              href="tel:+21671000000"
              className="flex items-center gap-3 font-black text-base md:text-xl border-b-2 border-white/20 pb-2 hover:border-white transition-all font-heading"
            >
              <PhoneCall className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              {t("cta.call")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
