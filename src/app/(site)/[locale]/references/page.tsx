import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Building2,
  Award,
  Users,
  Clock,
  Shield,
  Quote,
  Microscope,
  TrendingUp,
  Home,
  ChevronRight,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("referencesTitle"),
    description: t("referencesDescription"),
  };
}

export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("references");
  const tNav = await getTranslations("nav");

  const partners = t.raw("partners") as string[];

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)]">
      {/* ====== HERO SECTION ====== */}
      <section className="relative bg-n2k-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-n2k-secondary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 lg:py-36 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column — Content */}
            <div className="w-full lg:w-2/3 max-w">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-px bg-n2k-secondary-light shrink-0" />
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
                  {t("badge")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] tracking-tighter mb-8">
                {t("heroTitle")}
              </h1>

              <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed max-w mb-10 text-justify">
                {t("heroSubtitle")}
              </p>

              {/* Highlighted tagline */}
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl max-w mb-8">
                <Shield className="w-6 h-6 text-n2k-secondary-light shrink-0" />
                <p className="text-white font-bold font-heading text-sm md:text-base">
                  {t("heroHighlight")}
                </p>
              </div>

              <div className="w-full mb-8">
                <Link
                  href="/diagnostic"
                  className="w-full inline-flex items-center justify-center gap-3 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-5 font-heading font-black rounded-xl shadow-xl shadow-n2k-secondary/20 transition-all text-lg md:text-xl group"
                >
                  {t("ctaButton")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
                </Link>
              </div>
              
              {/* Breadcrumb */}
              <nav className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold mt-10">
                <Link href="/" className="hover:text-n2k-secondary transition-colors flex items-center gap-1.5">
                  <Home size={14} />
                  {tNav("home")}
                </Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-n2k-secondary-light">{t("heroTitle")}</span>
              </nav>
            </div>

            {/* Right Column — Hero Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <Image
                  src="/images/poultry-farm.png"
                  alt={t("heroTitle")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              {/* Decorative glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-n2k-secondary/20 blur-3xl -z-10 rounded-full mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== STATS BANNER ====== */}
      <section className="bg-[#0D7ED0] py-12 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { icon: Users, value: t("stat1Value"), label: t("stat1Label") },
              { icon: Building2, value: t("stat2Value"), label: t("stat2Label") },
              { icon: TrendingUp, value: t("stat3Value"), label: t("stat3Label") },
              { icon: Clock, value: t("stat4Value"), label: t("stat4Label") },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="w-8 h-8 text-n2k-secondary mx-auto mb-3 opacity-80" />
                <div className="text-4xl md:text-5xl font-black font-heading text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/70 font-heading font-bold text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ====== PARTNER NETWORK ====== */}
      <section className="bg-n2k-surface-low py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left — Grid */}
            <div className="lg:col-span-7">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-n2k-secondary">
                    {t("statsTitle")}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight leading-tight mb-4">
                  {t("networkTitle")}
                </h2>
                <p className="text-n2k-on-surface-variant text-base md:text-lg font-body leading-relaxed max-w-2xl">
                  {t("networkSubtitle")}
                </p>
              </div>

              {/* Partner Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {partners.map((partner: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white p-4 rounded-xl border border-border/30 shadow-sm hover:shadow-ambient transition-shadow group"
                  >
                    <div className="w-10 h-10 bg-n2k-secondary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-n2k-secondary/20 transition-colors">
                      <Building2 className="w-5 h-5 text-n2k-secondary" />
                    </div>
                    <span className="text-n2k-primary font-bold font-heading text-sm">
                      {partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image */}
            <div className="lg:col-span-5 flex md:hidden lg:flex items-center lg:sticky lg:top-28">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="/images/biosecurity-field.png"
                  alt={t("networkTitle")}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DIRECTOR QUOTE ====== */}
      <section className="bg-[#0D7ED0] py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="max-w mx-auto text-center">
            <Quote className="w-12 h-12 text-n2k-secondary mx-auto mb-8 opacity-60" />
            <p className="text-2xl md:text-3xl lg:text-4xl font-black font-heading text-white leading-snug tracking-tight mb-6">
              {t("directorQuote")}
            </p>
            <p className="text-n2k-secondary font-bold font-heading text-base mb-2">
              — {t("directorName")}
            </p>
            <p className="text-white/80 font-body text-sm">
              {t("directorRole")}
            </p>
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="bg-n2k-surface py-15 md:py-15">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="relative bg-gradient-to-br from-n2k-primary to-[#0D7ED0] rounded-3xl p-10 md:p-16 overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-n2k-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left */}
              <div className="text-center lg:text-start">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4">
                  {t("ctaTitle")}
                </h2>
                <p className="text-lg md:text-xl text-white/90 font-body leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                  {t("ctaSubtitle")}
                </p>

                <Link
                  href="/diagnostic"
                  className="inline-flex items-center gap-3 bg-n2k-secondary text-white px-10 py-5 rounded-xl font-black font-heading text-lg shadow-lg transition-all group hover:opacity-90 hover:scale-[1.02] active:scale-95"
                >
                  {t("ctaButton")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
                </Link>
              </div>

              {/* Right — Features */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: Microscope, text: t("ctaFeature1") },
                  { icon: CheckCircle, text: t("ctaFeature2") },
                  { icon: Clock, text: t("ctaFeature3") },
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5"
                  >
                    <div className="w-12 h-12 bg-n2k-secondary/20 rounded-xl flex items-center justify-center shrink-0">
                      <feat.icon className="w-6 h-6 text-n2k-secondary" />
                    </div>
                    <span className="text-white font-bold font-heading text-base">
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
