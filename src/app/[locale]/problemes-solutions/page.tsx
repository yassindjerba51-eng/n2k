import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  Building2,
  Droplets,
  Wind,
  ArrowRight,
  CheckCircle,
  Microscope,
  FlaskConical,
  Beaker,
  Quote,
} from "lucide-react";

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

/* ─── Product Card ──────────────────────────────────────────────────── */

function ProductCard({
  step,
  stepLabel,
  name,
  type,
  desc,
  features,
  colorClass,
  bgClass,
  containerBgClass,
  icon: Icon,
}: {
  step: number;
  stepLabel: string;
  name: string;
  type: string;
  desc: string;
  features?: string[];
  colorClass: string;
  bgClass: string;
  containerBgClass: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-n2k-surface-lowest rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-ambient hover:shadow-ambient-lg transition-all duration-500 ghost-border relative overflow-hidden group flex-1">
      {/* Step Badge */}
      <div
        className={`absolute top-0 end-0 ${bgClass} text-white px-5 py-1.5 rounded-es-2xl font-black uppercase tracking-widest text-[10px] font-heading`}
      >
        {stepLabel} {String(step).padStart(2, "0")}
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 mt-2">
        <div
          className={`w-14 h-14 shrink-0 ${containerBgClass} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}
        >
          <Icon className={`${colorClass} w-7 h-7`} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-black font-heading text-n2k-primary">
            {name}
          </h3>
          <p
            className={`${colorClass} font-bold uppercase tracking-widest text-[10px] md:text-[11px] font-heading`}
          >
            {type}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed mb-6">
        {desc}
      </p>

      {/* Features */}
      {features && features.length > 0 && (
        <ul className="space-y-3 font-body text-sm">
          {features.map((feature, fIdx) => (
            <li
              key={fIdx}
              className="flex items-start gap-3 text-n2k-on-surface-variant leading-snug"
            >
              <CheckCircle
                className={`${colorClass} shrink-0 w-5 h-5 mt-0.5`}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Step Arrow (between cards) ────────────────────────────────────── */

function StepArrow({ colorClass }: { colorClass: string }) {
  return (
    <div className="flex items-center justify-center py-4 md:py-0 md:px-2 shrink-0">
      <div
        className={`w-12 h-12 rounded-full bg-n2k-surface-low flex items-center justify-center shadow-sm`}
      >
        <ArrowRight
          className={`w-6 h-6 ${colorClass} rtl:rotate-180 md:rotate-0 rotate-90`}
        />
      </div>
    </div>
  );
}

/* ─── Zone Section ──────────────────────────────────────────────────── */

function ZoneSection({
  badge,
  title,
  subtitle,
  product1,
  product2,
  stepLabel,
  product1Icon,
  product2Icon,
  colorClass,
  bgClass,
  containerBgClass,
  dark,
  children,
  learnMoreLabel,
  learnMorePath,
}: {
  badge: string;
  title: string;
  subtitle: string;
  product1: { name: string; type: string; desc: string; features?: string[] };
  product2: { name: string; type: string; desc: string; features?: string[] };
  stepLabel: string;
  product1Icon: React.ElementType;
  product2Icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  containerBgClass: string;
  dark?: boolean;
  children?: React.ReactNode;
  learnMoreLabel: string;
  learnMorePath: string;
}) {
  const textColor = dark ? "text-white" : "text-n2k-primary";
  const subtitleColor = dark ? "text-n2k-on-primary-container" : "text-n2k-on-surface-variant";

  return (
    <section className={dark ? "bg-n2k-primary-container py-16 md:py-24" : "py-16 md:py-24"}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
            <span
              className={`text-xs font-black tracking-[0.2em] uppercase ${
                dark ? "text-n2k-secondary-container" : "text-n2k-secondary"
              }`}
            >
              {badge}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-black font-heading ${textColor} leading-tight tracking-tight mb-4`}
          >
            {title}
          </h2>
          <p
            className={`${subtitleColor} text-base md:text-lg font-body leading-relaxed max-w-3xl`}
          >
            {subtitle}
          </p>
        </div>

        {/* Product Cards with Arrow */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-0 md:gap-0 mb-10">
          <ProductCard
            step={1}
            stepLabel={stepLabel}
            name={product1.name}
            type={product1.type}
            desc={product1.desc}
            features={product1.features}
            colorClass={colorClass}
            bgClass={bgClass}
            containerBgClass={containerBgClass}
            icon={product1Icon}
          />
          <StepArrow colorClass={colorClass} />
          <ProductCard
            step={2}
            stepLabel={stepLabel}
            name={product2.name}
            type={product2.type}
            desc={product2.desc}
            features={product2.features}
            colorClass={colorClass}
            bgClass={bgClass}
            containerBgClass={containerBgClass}
            icon={product2Icon}
          />
        </div>

        {/* Extra content (field reports, science notes) */}
        {children}

        {/* Learn More Link */}
        <div className="flex justify-center mt-10">
          <Link
            href={learnMorePath as any}
            className={`inline-flex items-center gap-3 ${bgClass} text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all group text-sm md:text-base hover:opacity-90`}
          >
            {learnMoreLabel}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */

export default async function ProblemesSolutionsHub() {
  const t = await getTranslations("solutionsPage");
  const tCta = await getTranslations("cta");

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="bg-n2k-surface-low relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
                  {t("badge")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-n2k-primary leading-[1.1] tracking-tighter mb-8">
                {t("heroTitle")}
                <br />
                <span className="text-n2k-secondary">
                  {t("heroTitleHighlight")}
                </span>
              </h1>

              <p className="font-body text-base md:text-lg text-n2k-on-surface-variant leading-relaxed max-w-2xl">
                {t("heroSubtitle")}
              </p>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="/images/lab-scientist.png"
                  alt={t("badge")}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ZONE 01: BÂTIMENT (Dark — Custom 2-Column) ====== */}
      <section className="bg-[#0D7ED0] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column — Content */}
            <div className="lg:col-span-7">
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
                <p className="text-white text-base md:text-lg font-body leading-relaxed max-w-2xl">
                  {t("batiment.subtitle")}
                </p>
              </div>

              {/* Product Cards — Vertical Stack */}
              <div className="flex flex-col gap-0 mb-8">
                <ProductCard
                  step={1}
                  stepLabel={t("step")}
                  name={t("batiment.product1.name")}
                  type={t("batiment.product1.type")}
                  desc={t("batiment.product1.desc")}
                  features={t.raw("batiment.product1.features") as string[]}
                  colorClass="text-n2k-secondary"
                  bgClass="bg-n2k-secondary"
                  containerBgClass="bg-n2k-secondary/10"
                  icon={Microscope}
                />
                <StepArrow colorClass="text-n2k-secondary" />
                <ProductCard
                  step={2}
                  stepLabel={t("step")}
                  name={t("batiment.product2.name")}
                  type={t("batiment.product2.type")}
                  desc={t("batiment.product2.desc")}
                  features={t.raw("batiment.product2.features") as string[]}
                  colorClass="text-n2k-secondary"
                  bgClass="bg-n2k-secondary"
                  containerBgClass="bg-n2k-secondary/10"
                  icon={Building2}
                />
              </div>

              {/* Field Report */}
              <div className="p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 mb-8">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-n2k-secondary shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-bold font-heading text-base md:text-lg leading-relaxed italic">
                      {t("batiment.fieldReport")}
                    </p>
                    <p className="text-white text-sm mt-3 font-heading font-bold">
                      {t("batiment.fieldReportSource")}
                    </p>
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

            {/* Right Column — Protocol Infographic */}
            <div className="lg:col-span-5 hidden lg:flex items-center sticky top-28">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="/images/batiment-protocol.png"
                  alt={t("batiment.title")}
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ZONE 02: EAU (Light — Custom 2-Column) ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column — Content */}
            <div className="lg:col-span-7">
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
                <p className="text-n2k-on-surface-variant text-base md:text-lg font-body leading-relaxed max-w-2xl">
                  {t("eau.subtitle")}
                </p>
              </div>

              {/* Product Cards — Vertical Stack */}
              <div className="flex flex-col gap-0 mb-8">
                <ProductCard
                  step={1}
                  stepLabel={t("step")}
                  name={t("eau.product1.name")}
                  type={t("eau.product1.type")}
                  desc={t("eau.product1.desc")}
                  features={t.raw("eau.product1.features") as string[]}
                  colorClass="text-n2k-primary"
                  bgClass="bg-n2k-primary"
                  containerBgClass="bg-n2k-primary/10"
                  icon={Droplets}
                />
                <StepArrow colorClass="text-n2k-primary" />
                <ProductCard
                  step={2}
                  stepLabel={t("step")}
                  name={t("eau.product2.name")}
                  type={t("eau.product2.type")}
                  desc={t("eau.product2.desc")}
                  features={t.raw("eau.product2.features") as string[]}
                  colorClass="text-n2k-primary"
                  bgClass="bg-n2k-primary"
                  containerBgClass="bg-n2k-primary/10"
                  icon={Beaker}
                />
              </div>

              {/* Learn More CTA */}
              <div className="flex justify-center lg:justify-start">
                <Link
                  href={"/problemes-solutions/water" as any}
                  className="inline-flex items-center gap-3 bg-n2k-primary text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all group text-sm md:text-base hover:opacity-90"
                >
                  {t("learnMore")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Right Column — Water Protocol Infographic */}
            <div className="lg:col-span-5 hidden lg:flex items-center sticky top-28">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="/images/eau-protocol.png"
                  alt={t("eau.title")}
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ZONE 03: AMBIANCE (Light alternate — Custom 2-Column) ====== */}
      <section className="bg-n2k-surface-low py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column — Content */}
            <div className="lg:col-span-7">
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
                <p className="text-n2k-on-surface-variant text-base md:text-lg font-body leading-relaxed max-w-2xl">
                  {t("ambiance.subtitle")}
                </p>
              </div>

              {/* Product Cards — Vertical Stack */}
              <div className="flex flex-col gap-0 mb-8">
                <ProductCard
                  step={1}
                  stepLabel={t("step")}
                  name={t("ambiance.product1.name")}
                  type={t("ambiance.product1.type")}
                  desc={t("ambiance.product1.desc")}
                  colorClass="text-n2k-orange"
                  bgClass="bg-n2k-orange"
                  containerBgClass="bg-n2k-orange/10"
                  icon={Wind}
                />
                <StepArrow colorClass="text-n2k-orange" />
                <ProductCard
                  step={2}
                  stepLabel={t("step")}
                  name={t("ambiance.product2.name")}
                  type={t("ambiance.product2.type")}
                  desc={t("ambiance.product2.desc")}
                  colorClass="text-n2k-orange"
                  bgClass="bg-n2k-orange"
                  containerBgClass="bg-n2k-orange/10"
                  icon={FlaskConical}
                />
              </div>

              {/* Science Note */}
              <div className="p-6 md:p-8 bg-n2k-surface-lowest rounded-2xl shadow-ambient ghost-border mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-n2k-orange/10 rounded-xl flex items-center justify-center">
                    <Microscope className="w-5 h-5 text-n2k-orange" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.15em] text-n2k-orange font-heading mb-2 block">
                      {t("ambiance.scienceNoteLabel")}
                    </span>
                    <p className="text-n2k-on-surface font-body text-sm md:text-base leading-relaxed font-medium">
                      {t("ambiance.scienceNote")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Learn More CTA */}
              <div className="flex justify-center lg:justify-start">
                <Link
                  href={"/problemes-solutions/air" as any}
                  className="inline-flex items-center gap-3 bg-n2k-orange text-white px-8 py-4 rounded-xl font-bold font-heading shadow-lg transition-all group text-sm md:text-base hover:opacity-90"
                >
                  {t("learnMore")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Right Column — Ambiance Protocol Infographic */}
            <div className="lg:col-span-5 hidden lg:flex items-center sticky top-28">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="/images/ambiance-protocol.png"
                  alt={t("ambiance.title")}
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
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
