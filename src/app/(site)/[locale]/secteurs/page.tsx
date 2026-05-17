import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Factory, Bird, Beef, ArrowRight, Home, ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: "Secteurs d'activité — Les Laboratoires N2K",
    description: "Élevage, abattoirs, industrie agroalimentaire : découvrez nos protocoles de maîtrise sanitaire adaptés à votre secteur.",
  };
}

const sectors = [
  {
    key: "elevage" as const,
    href: "/secteurs/elevage",
    Icon: Bird,
    color: "bg-emerald-50 text-emerald-700",
    accent: "border-emerald-200",
  },
  {
    key: "abattoirs" as const,
    href: "/secteurs/abattoirs",
    Icon: Beef,
    color: "bg-red-50 text-red-700",
    accent: "border-red-200",
  },
  {
    key: "agroalimentaire" as const,
    href: "/secteurs/industrie-agroalimentaire",
    Icon: Factory,
    color: "bg-blue-50 text-blue-700",
    accent: "border-blue-200",
  },
];

export default async function SecteursPage() {
  const t = await getTranslations("sectors");
  const aboutT = await getTranslations("about");
  const tNav = await getTranslations("nav");
  const tHero = await getTranslations("hero");

  return (
    <div className="bg-n2k-surface min-h-[calc(100vh-80px)]">
      {/* Hero */}
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
                {t("title")}
              </h1>
              <p className="text-lg md:text-xl text-white/60 font-body leading-relaxed mb-10 text-justify">
                {t("subtitle")}
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
                  href="/problemes-solutions"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
                >
                  {tHero("ctaSecondary")}
                </Link>
              </div>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold mt-10">
                <Link href="/" className="hover:text-n2k-secondary transition-colors flex items-center gap-1.5">
                  <Home size={14} />
                  {tNav("home")}
                </Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-n2k-secondary-light">{tNav("secteurs")}</span>
              </nav>
            </div>
            {/* Right Column: Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <Image
                  src="/images/hero_sectors.png"
                  alt="Vos Secteurs"
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

      {/* Sector Cards */}
      <section className="py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sectors.map((sector) => (
              <Link
                key={sector.key}
                href={sector.href as any}
                className={`group relative bg-white rounded-2xl p-8 md:p-10 border ${sector.accent} shadow-ambient hover:shadow-ambient-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 rounded-xl ${sector.color} flex items-center justify-center mb-6`}>
                  <sector.Icon className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black font-heading text-n2k-primary tracking-tight mb-4">
                  {t(`${sector.key}.title`)}
                </h2>
                <p className="text-n2k-on-surface-variant font-body leading-relaxed mb-6">
                  {t(`${sector.key}.desc`)}
                </p>
                <span className="inline-flex items-center gap-2 text-n2k-secondary font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all">
                  {t(`${sector.key}.link`)}
                  <span className="text-lg">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className="py-15 md:py-15 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="bg-n2k-primary p-10 md:p-16 rounded-2xl text-center relative overflow-hidden shadow-inner">
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8">
                {aboutT("ctaTitle")}
              </h2>
              <p className="text-n2k-on-primary-container text-lg max-w-2xl mx-auto mb-10">
                {aboutT("ctaDesc")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-n2k-secondary text-white px-10 py-5 font-heading font-bold rounded-xl shadow-2xl hover:scale-105 transition-all"
              >
                {aboutT("ctaButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
