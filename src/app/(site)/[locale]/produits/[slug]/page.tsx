import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getProductsByZone } from "@/data/products";
import {
  ArrowRight,
  ArrowLeft,
  Download,
  CheckCircle,
  AlertTriangle,
  Beaker,
  Building2,
  Droplets,
  Wind,
  FlaskConical,
  Layers,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const zoneIcons: Record<string, React.ElementType> = {
  "01": Building2,
  "02": Droplets,
  "03": Wind,
};



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: `${product.name} — ${t("metaSuffix")}`,
    description: product.subtitle,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("products");
  const ZoneIcon = zoneIcons[product.zone] || FlaskConical;
  const relatedProducts = getProductsByZone(product.zone).filter(
    (p) => p.slug !== product.slug
  );

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)]">
      {/* ====== TECHNICAL HEADER ====== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}dd 50%, ${product.color}bb 100%)`,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 bg-white -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 bg-white translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32 relative z-10">
          {/* Breadcrumb */}
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-heading font-bold tracking-tight mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1" />
            {t("backToCatalog")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              {/* Zone Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <ZoneIcon className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-white/20 text-white border-white/30 font-black text-[10px] tracking-[0.15em] uppercase px-3 py-1">
                  {product.zoneLabel} — {product.zoneName}
                </Badge>
              </div>

              {/* Product Name */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading text-white tracking-tighter leading-[0.9] mb-6">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/90 font-body leading-relaxed max-w-2xl">
                {product.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-xs w-full">
                <div className="text-white/60 text-[10px] font-black tracking-[0.2em] uppercase mb-2">
                  {t("productZone")}
                </div>
                <div className="text-white font-heading font-black text-lg mb-1">
                  {product.zoneName}
                </div>
                <div className="text-white/70 text-sm font-body">
                  {product.zoneLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROBLEM / SOLUTION ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Problem */}
            <div className="relative bg-white rounded-3xl border border-border/30 p-8 md:p-10 shadow-ambient overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-400" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-2xl font-black font-heading text-n2k-primary tracking-tight">
                  {t("problemTitle")}
                </h2>
              </div>
              <p className="text-n2k-on-surface-variant font-body leading-relaxed text-base">
                {product.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="relative bg-white rounded-3xl border border-border/30 p-8 md:p-10 shadow-ambient overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: `linear-gradient(to right, ${product.color}, #2BB673)`,
                }}
              />
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${product.color}15` }}
                >
                  <Shield
                    className="w-6 h-6"
                    style={{ color: product.color }}
                  />
                </div>
                <h2 className="text-2xl font-black font-heading text-n2k-primary tracking-tight">
                  {t("solutionTitle")} {product.name}
                </h2>
              </div>
              <p className="text-n2k-on-surface-variant font-body leading-relaxed text-base">
                {product.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CHAMPS D'APPLICATION ====== */}
      <section className="bg-n2k-surface-low py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-n2k-secondary shrink-0" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-n2k-secondary">
                  {t("applicationsBadge")}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight leading-tight mb-4">
                {t("applicationsTitle")}
              </h2>
              <p className="text-n2k-on-surface-variant text-base md:text-lg font-body leading-relaxed">
                {t("applicationsSubtitle")}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-3">
                {product.applications.map((app, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 bg-white p-5 rounded-xl border border-border/30 shadow-sm hover:shadow-ambient transition-shadow"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <CheckCircle
                        className="w-4 h-4"
                        style={{ color: product.color }}
                      />
                    </div>
                    <span className="text-n2k-primary font-bold font-heading text-sm md:text-base">
                      {app}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TECHNICAL SPECS ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="w-8 h-px bg-n2k-secondary shrink-0" />
              <span className="text-xs font-black tracking-[0.2em] uppercase text-n2k-secondary">
                {t("specsBadge")}
              </span>
              <span className="w-8 h-px bg-n2k-secondary shrink-0" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-n2k-primary tracking-tight mb-4">
              {t("specsTitle")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-border/30 shadow-ambient overflow-hidden">
              {/* Table Header */}
              <div
                className="grid grid-cols-2 px-6 md:px-8 py-4 text-[10px] font-black tracking-[0.2em] uppercase"
                style={{ backgroundColor: `${product.color}10`, color: product.color }}
              >
                <span>{t("specsParameter")}</span>
                <span>{t("specsValue")}</span>
              </div>

              {/* Table Rows */}
              {product.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-2 px-6 md:px-8 py-4 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  } ${
                    idx < product.specs.length - 1
                      ? "border-b border-border/20"
                      : ""
                  }`}
                >
                  <span className="text-n2k-on-surface-variant font-heading font-bold text-sm">
                    {spec.label}
                  </span>
                  <span className="text-n2k-primary font-heading font-black text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA — Download ====== */}
      <section
        className="py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}cc 100%)`,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Beaker className="w-12 h-12 text-white/60 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4">
              {t("ctaTitle")} {product.name}
            </h2>
            <p className="text-lg text-white/80 font-body leading-relaxed mb-10">
              {t("ctaSubtitle")}
            </p>
            <button className="inline-flex items-center gap-3 bg-white text-n2k-primary px-10 py-5 rounded-xl font-black font-heading text-lg shadow-lg transition-all hover:scale-[1.02] active:scale-95 group">
              <Download className="w-6 h-6" />
              {t("ctaButton")}
            </button>
          </div>
        </div>
      </section>

      {/* ====== RELATED PRODUCTS ====== */}
      {relatedProducts.length > 0 && (
        <section className="bg-n2k-surface-low py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-n2k-primary tracking-tight">
                {t("relatedTitle")}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {relatedProducts.map((rp) => {
                const RPIcon = zoneIcons[rp.zone] || FlaskConical;
                return (
                  <Link
                    key={rp.slug}
                    href={`/produits/${rp.slug}` as any}
                    className="group bg-white rounded-2xl border border-border/30 p-6 shadow-ambient hover:shadow-ambient-lg transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${rp.color}15` }}
                      >
                        <RPIcon
                          className="w-5 h-5"
                          style={{ color: rp.color }}
                        />
                      </div>
                      <Badge
                        variant="outline"
                        className={`${rp.accentBg} ${rp.accentText} border-0 font-black text-[10px] tracking-[0.15em] uppercase px-2 py-0.5`}
                      >
                        {rp.zoneLabel}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-black font-heading text-n2k-primary mb-2">
                      {rp.name}
                    </h3>
                    <p className="text-sm text-n2k-on-surface-variant font-body line-clamp-2 mb-4">
                      {rp.subtitle}
                    </p>
                    <span className="flex items-center gap-2 text-sm font-bold font-heading text-n2k-secondary">
                      {t("viewProduct")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
