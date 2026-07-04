import { getTranslations } from "next-intl/server";
import { FlaskConical, ArrowRight, Home, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import ProductFilter from "@/components/ui/ProductFilter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("produitsTitle"),
    alternates: {
      canonical: `/${locale}/produits`,
    },
    description: t("produitsDescription"),
  };
}

export default async function ProduitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");
  const tHero = await getTranslations("hero");

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)]">
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
                {t("heroTitle")}
              </h1>
              <p className="text-lg md:text-xl text-white/60 font-body leading-relaxed mb-10 text-justify">
                {t("heroSubtitle")}
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
                <span className="text-n2k-secondary-light">{tNav("produits")}</span>
              </nav>
            </div>
            {/* Right Column: Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <Image
                  src="/images/hero_products.png"
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

      {/* ====== PRODUCT CATALOG ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] uppercase text-n2k-secondary">
                {t("catalogBadge")}
              </span>
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-4">
              {t("catalogTitle")}
            </h2>
            <p className="text-n2k-on-surface-variant text-base md:text-lg font-body leading-relaxed max-w-2xl mx-auto">
              {t("catalogSubtitle")}
            </p>
          </div>

          {/* Zone overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-12">
            {[
              {
                zone: "Zone 01",
                name: t("zone01Name"),
                desc: t("zone01Desc"),
                color: "border-[#0D7ED0]",
                accent: "text-[#0D7ED0]",
              },
              {
                zone: "Zone 02",
                name: t("zone02Name"),
                desc: t("zone02Desc"),
                color: "border-[#0D9488]",
                accent: "text-[#0D9488]",
              },
              {
                zone: "Zone 03",
                name: t("zone03Name"),
                desc: t("zone03Desc"),
                color: "border-[#EA580C]",
                accent: "text-[#EA580C]",
              },
            ].map((z, idx) => (
              <div
                key={idx}
                className={`text-center p-6 rounded-2xl bg-white border-t-4 ${z.color} shadow-ambient`}
              >
                <span className={`inline-block text-[10px] font-black tracking-[0.2em] uppercase ${z.accent} mb-2`}>
                  {z.zone}
                </span>
                <h3 className="text-xl md:text-2xl font-black font-heading text-n2k-primary mb-2">
                  {z.name}
                </h3>
                <p className="text-n2k-on-surface-variant text-sm font-body">{z.desc}</p>
              </div>
            ))}
          </div>

          <ProductFilter locale={locale} />
        </div>
      </section>
    </div>
  );
}
