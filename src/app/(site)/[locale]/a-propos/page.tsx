import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Leaf,
  Settings,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Phone,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("about");

  const pillars = [
    { icon: ShieldCheck, title: t("pillars.hygiene.title"), desc: t("pillars.hygiene.desc"), border: "border-n2k-primary" },
    { icon: Leaf, title: t("pillars.safety.title"), desc: t("pillars.safety.desc"), border: "border-n2k-secondary" },
    { icon: Settings, title: t("pillars.optimization.title"), desc: t("pillars.optimization.desc"), border: "border-n2k-primary" },
    { icon: TrendingUp, title: t("pillars.performance.title"), desc: t("pillars.performance.desc"), border: "border-n2k-secondary" },
  ];

  const domains = [
    { num: "01", title: t("domains.cleaning.title"), desc: t("domains.cleaning.desc"), features: [t("domains.cleaning.feature1"), t("domains.cleaning.feature2")], gradient: "from-n2k-primary to-n2k-primary-container", accent: "text-n2k-primary" },
    { num: "02", title: t("domains.disinfection.title"), desc: t("domains.disinfection.desc"), features: [t("domains.disinfection.feature1"), t("domains.disinfection.feature2")], gradient: "from-n2k-secondary to-[#007444]", accent: "text-n2k-secondary" },
    { num: "03", title: t("domains.biofilm.title"), desc: t("domains.biofilm.desc"), features: [t("domains.biofilm.feature1"), t("domains.biofilm.feature2")], gradient: "from-n2k-primary to-n2k-primary-container", accent: "text-n2k-primary" },
  ];

  const methodSteps = [
    { num: "01.", title: t("methodology.step1.title"), desc: t("methodology.step1.desc") },
    { num: "02.", title: t("methodology.step2.title"), desc: t("methodology.step2.desc") },
    { num: "03.", title: t("methodology.step3.title"), desc: t("methodology.step3.desc") },
    { num: "04.", title: t("methodology.step4.title"), desc: t("methodology.step4.desc") },
  ];

  const errors = [
    { title: t("errors.underdosing.title"), desc: t("errors.underdosing.desc") },
    { title: t("errors.noDetergence.title"), desc: t("errors.noDetergence.desc") },
    { title: t("errors.contactTime.title"), desc: t("errors.contactTime.desc") },
  ];

  const protocol = [
    { num: 1, title: t("protocol.step1.title"), desc: t("protocol.step1.desc"), color: "bg-n2k-primary", textColor: "text-n2k-primary" },
    { num: 2, title: t("protocol.step2.title"), desc: t("protocol.step2.desc"), color: "bg-n2k-primary", textColor: "text-n2k-primary" },
    { num: 3, title: t("protocol.step3.title"), desc: t("protocol.step3.desc"), color: "bg-n2k-secondary", textColor: "text-n2k-secondary" },
  ];

  return (
    <div className="bg-n2k-surface min-h-screen">

      {/* ====== HERO SECTION ====== */}
      <section className="bg-n2k-surface-low relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column — Content */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-n2k-secondary shrink-0" />
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
                  {t("heroBadge")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-n2k-primary leading-[1.1] tracking-tighter mb-8">
                {t("heroTitle")}
                <br />
                <span className="text-n2k-secondary">
                  {t("heroTitleHighlight")}
                </span>
                {t("heroTitleEnd")}
              </h1>

              <p className="font-body text-base md:text-lg text-n2k-on-surface-variant leading-relaxed max-w-2xl mb-10">
                {t("heroSubtitle")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-n2k-secondary text-white px-8 py-4 font-heading font-bold rounded-lg shadow-xl hover:bg-[#007444] transition-all flex items-center gap-2"
                >
                  {t("heroCta1")}
                  <span className="material-symbols-outlined text-xl">analytics</span>
                </Link>
                <Link
                  href="/produits"
                  className="border border-n2k-outline-variant/30 text-n2k-primary px-8 py-4 font-heading font-bold rounded-lg hover:bg-n2k-surface transition-all"
                >
                  {t("heroCta2")}
                </Link>
              </div>
            </div>

            {/* Right Column — Hero Image */}
            <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-ambient-lg ghost-border">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoZHMeNLkkHSznJxWTYIy3Zw9A4ZR9svU260XQuOHY_lmDpwtwfrKmmN7uIpk2JU6LDzG9loDrBtYTRI2s3Q6UGgxot7cTwf18R24tMd4fw0ubTLVWlSR0xBU65k15B2NCvV91zFNsOMOl-2EKZkQdWyPyH3XWj9cZW-E5XipdgSKay62ZEOY-ht3XVBi8QkPXyVJPf7cGd6syITUZrqK3YFC4ViZ6eUFXiuWsrm2H1Ja56s2MGdCkL4iffwpAyQoO0l2wTUQwxiM"
                  alt={t("heroBadge")}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WHO WE ARE ====== */}
      <section className="py-20 md:py-24 bg-n2k-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Left — Image */}
            <div className="relative">
              <div className="aspect-square bg-n2k-surface-low overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgESiiWikNpeKCv5mWqVb9HOhu5NC9M0DcJEGMGp8YJimJrXogChZ_nu4E3TyoYERyUETKbqS-ibZ5mZWC-JI0vpzGpmXnJr5qHYQ70B1GduH9FAfB65BCGE4_eDsV2lNg08QoguhUN_WrKo2vyCOFSJ5CP2X6TJvQJxWYA3LTlrB0fgXsYtXsaRKwFdjJfq46WM4yIvGP1e5Z7wvgHW1cqdIUMTkYSppcthMJyvJUJl4OGI-IUZn6mEsTO3kzjVBlry-IKOqeYjQ"
                  alt={t("specialistTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Overlay badge */}
              <div className="absolute -bottom-6 md:-bottom-10 -right-2 md:-right-10 bg-n2k-primary text-white p-8 md:p-12 max-w-sm shadow-2xl">
                <div className="font-heading text-3xl md:text-4xl font-black mb-2">{t("specialistBadge")}</div>
                <div className="text-sm opacity-70 uppercase tracking-widest font-bold">{t("specialistBadgeSub")}</div>
              </div>
            </div>

            {/* Right — Content */}
            <div className="pt-8 md:pt-0">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-n2k-primary tracking-tight">
                {t("specialistTitle")}
              </h2>
              <div className="space-y-6 text-n2k-on-surface-variant leading-relaxed text-lg">
                <p>{t("specialistDesc1")}</p>
                <p>{t("specialistDesc2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 4 PILLARS ====== */}
      <section className="py-20 md:py-24 bg-n2k-surface-low">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
            <div>
              <label className="text-n2k-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                {t("pillarsLabel")}
              </label>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-n2k-primary">
                {t("pillarsTitle")}
              </h2>
            </div>
            <div className="h-[2px] flex-grow bg-n2k-outline-variant/20 mx-8 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white p-8 hover:shadow-xl transition-shadow border-t-4 ${pillar.border}`}
                >
                  <Icon className={`w-9 h-9 mb-6 ${idx % 2 === 0 ? 'text-n2k-primary' : 'text-n2k-secondary'}`} strokeWidth={1.5} />
                  <h3 className="font-heading font-bold text-xl mb-4 text-n2k-primary">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-n2k-on-surface-variant">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== EXPERTISE DOMAINS (Bento Grid) ====== */}
      <section className="py-20 md:py-24 bg-n2k-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-n2k-primary mb-14 text-center italic">
            {t("domainsTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domains.map((domain, idx) => (
              <div
                key={idx}
                className={`p-[3px] bg-gradient-to-br ${domain.gradient} group`}
              >
                <div className="bg-white h-full p-8 md:p-10 flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-12 h-12 rounded-xl bg-n2k-surface-low flex items-center justify-center`}>
                      <CheckCircle className={`w-6 h-6 ${domain.accent}`} />
                    </div>
                    <span className="text-slate-300 font-black text-6xl opacity-20 select-none">
                      {domain.num}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 text-n2k-primary">
                    {domain.title}
                  </h3>
                  <p className="text-n2k-on-surface-variant mb-6">
                    {domain.desc}
                  </p>
                  <ul className="mt-auto space-y-2 text-sm font-bold">
                    {domain.features.map((feature, fIdx) => (
                      <li key={fIdx} className={`flex items-center gap-2 ${domain.accent}`}>
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== METHODOLOGY ====== */}
      <section className="py-20 md:py-24 bg-n2k-primary text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR9yy8XW-gGLpXctn4ciLu6PdR2H3r3K25UmrZzUxJKAJLlskOLmc9Dhibrr5B7HR7W5UafxZcyn0-RnINDJgLOK-yOyk44VoxwcO-2HrDQ_8CGYdjSI-IPgnX8xtoYpSke3s5zxJkGi2MRfgPv822AsTgbn529qM88qheqUjDfEEavDpiSVcS2Vh-p7mld2S4ISN6Av21VcxsqTKVrt85Xy38O62LAMrqcuKPs0w6Ma8rv1C7z7LHq383FVu28CCgyqTQ2pDMu6c"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-black mb-14 italic">
            {t("methodologyTitle")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
            {methodSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-8 md:p-10 hover:bg-white/5 transition-colors ${idx < methodSteps.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-white/10' : ''}`}
              >
                <div className="text-n2k-secondary font-black text-xl mb-6">{step.num}</div>
                <h4 className="font-heading font-bold text-xl mb-4">{step.title}</h4>
                <p className="text-sm opacity-60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== RESULTS (Before/After) ====== */}
      <section className="py-20 md:py-24 bg-n2k-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-n2k-primary mb-6">
              {t("resultsTitle")}
            </h2>
            <p className="text-n2k-on-surface-variant">{t("resultsDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before/After images */}
            <div className="bg-n2k-surface-low rounded-xl overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-1/2 relative aspect-video sm:aspect-auto min-h-[200px]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_nxpF6ZAWzcT3geIWX_D-jzhldn_ICvuF5nPPtDs0addW1X7olFat182WdrB9WZGpE0CukSGywxJOIeoO-E_bTrKCVmCg2ZTXyf6MDOFWu2AmhPzyxKPT_m1tRUKniJC8OapVFlMrMqQgPP8hnuodAFhcDEPwp428NDqYWRiVzupS7UeolEJMskMzFSyxgcrO5_rHp7SZpbYh1k8N16Rx53dFSj-4wsY0xzqAmQE787xS9W9ehYMp-jviNnK4k02-ECMZnEMOrPI"
                  alt={t("resultsBefore")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-4 left-4 bg-n2k-red text-white px-3 py-1 text-xs font-bold">
                  {t("resultsBefore")}
                </div>
              </div>
              <div className="sm:w-1/2 relative aspect-video sm:aspect-auto min-h-[200px]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkbEi15kDR7-_09jj7gcSXgayveafVyr9QEXhovlmMGST-dv4fIyXOVN735KjLvfpXHSUZKxQOcd1Ypl4mCnXJlf_o1Skuur8UtLaAlj5LhnGpn1Fr2Tg2DsQmrlvRn8yjgyl8ZfbJA_xTFKPPLz8EjZampP5kDwRhTc9cdf9duEpci18xsKOuh6sJjBkZfQjiOQl-7GXW13_ByI3lqnKgQnyTKf0XXaPc19RG8XFG3j6B4InbN90JCHsWDRkdeNVL-rPH2FS_tmU"
                  alt={t("resultsAfter")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-4 right-4 bg-n2k-secondary text-white px-3 py-1 text-xs font-bold">
                  {t("resultsAfter")}
                </div>
              </div>
            </div>

            {/* Stat card */}
            <div className="bg-n2k-primary-container text-white p-10 md:p-12 flex flex-col justify-center">
              <div className="text-5xl md:text-6xl font-black text-n2k-secondary-container mb-4">-94%</div>
              <h3 className="font-heading text-2xl font-bold mb-4">{t("resultsStatTitle")}</h3>
              <p className="opacity-70">{t("resultsStat")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ERRORS + PROTOCOL ====== */}
      <section className="py-20 md:py-24 bg-n2k-surface-high">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            {/* Left — Errors */}
            <div className="md:col-span-5">
              <h2 className="font-heading text-2xl md:text-3xl font-black text-n2k-primary mb-8">
                {t("errorsTitle")}
              </h2>
              <div className="space-y-4">
                {errors.map((error, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 md:p-6 flex gap-4 items-start border-l-4 border-n2k-red"
                  >
                    <AlertTriangle className="w-5 h-5 text-n2k-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-n2k-primary mb-1">{error.title}</h4>
                      <p className="text-xs text-n2k-on-surface-variant leading-relaxed">{error.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Protocol */}
            <div className="md:col-span-7 bg-white p-8 md:p-12 shadow-2xl">
              <label className="text-n2k-secondary font-bold text-xs uppercase tracking-widest mb-4 block">
                {t("protocolLabel")}
              </label>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-n2k-primary mb-10">
                {t("protocolTitle")}
              </h2>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-n2k-outline-variant/30">
                {protocol.map((p) => (
                  <div key={p.num} className="relative ps-10">
                    <div className={`absolute start-0 top-0 w-6 h-6 rounded-full ${p.color} flex items-center justify-center text-[10px] text-white font-bold`}>
                      {p.num}
                    </div>
                    <h5 className={`font-bold ${p.textColor} uppercase`}>{p.title}</h5>
                    <p className="text-sm text-n2k-on-surface-variant italic">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ====== TEAM SECTION ====== */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-black text-n2k-primary mb-6">
              {t("team.title")}
            </h2>
            <p className="text-n2k-on-surface-variant text-lg max-w-3xl mx-auto">
              {t("team.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Director Card */}
            <div className="bg-n2k-surface-low rounded-3xl p-8 md:p-12 border border-n2k-primary/10 flex flex-col md:flex-row gap-8 items-center shadow-ambient hover:shadow-ambient-lg transition-all">
              <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-xl">
                <Image
                  src="/images/director.png"
                  alt={t("team.directorName")}
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-black text-n2k-primary mb-1">
                  {t("team.directorName")}
                </h3>
                <div className="text-n2k-secondary font-bold text-sm uppercase tracking-widest mb-4">
                  {t("team.directorRole")}
                </div>
                <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed">
                  {t("team.directorDesc")}
                </p>
              </div>
            </div>

            {/* Staff Card */}
            <div className="bg-n2k-primary text-white rounded-3xl p-8 md:p-12 flex flex-col justify-center shadow-ambient hover:shadow-ambient-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-n2k-secondary rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-black mb-4">
                  {t("team.staffTitle")}
                </h3>
                <p className="text-white/80 font-body leading-relaxed">
                  {t("team.staffDesc")}
                </p>
                <div className="mt-8 flex gap-3 flex-wrap">
                  <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">Docteurs Vétérinaires</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">Ingénieurs Agro</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">Auditeurs Sanitaires</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="bg-n2k-primary p-10 md:p-16 rounded-2xl text-center relative overflow-hidden shadow-inner">
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8">
                {t("ctaTitle")}
              </h2>
              <p className="text-n2k-on-primary-container text-lg max-w-2xl mx-auto mb-10">
                {t("ctaDesc")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-n2k-secondary text-white px-10 py-5 font-heading font-bold rounded-xl shadow-2xl hover:scale-105 transition-all"
              >
                {t("ctaButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
