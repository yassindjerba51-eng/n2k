import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getProductBySlug, getLocalizedProduct, getProductsByZone } from "@/data/products";
import {
  ArrowRight,
  ArrowLeft,
  Download,
  AlertTriangle,
  Beaker,
  Building2,
  Droplets,
  Wind,
  FlaskConical,
  FileText,
  CheckCircle,
  XCircle,
  Info,
  Clock,
  ShieldAlert,
  Headset
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
  const { slug, locale } = await params;
  const product = getLocalizedProduct(slug, locale);
  if (!product) notFound();

  const t = await getTranslations("products");
  const tCTA = await getTranslations("ctas");
  const pt = await getTranslations(`productDetailBlocks.${product.slug}`);
  const ph = await getTranslations("productDetailHeadings");

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

      {/* ====== 13-POINT TECHNICAL STRUCTURE ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-8 space-y-12">
              
              {/* DIAGNOSTIC ET USAGE */}
              <div className="space-y-6">
                <h2 className="text-3xl font-black font-heading text-n2k-primary flex items-center gap-3 border-b border-border/30 pb-4">
                  <Beaker className="w-8 h-8 text-n2k-secondary" />
                  Diagnostic et Application
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 1. Problème */}
                  <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                    <h3 className="font-heading font-bold text-n2k-primary text-sm uppercase tracking-wider mb-2 text-red-600 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {ph("titles.problem")}
                    </h3>
                    <p className="text-n2k-on-surface-variant font-body">{pt("problem")}</p>
                  </div>
                  
                  {/* 4. Pourquoi */}
                  <div className="bg-white p-6 rounded-2xl border border-n2k-secondary/20 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-n2k-secondary" />
                    <h3 className="font-heading font-bold text-n2k-primary text-sm uppercase tracking-wider mb-2 text-n2k-secondary flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> {ph("titles.why")}
                    </h3>
                    <p className="text-n2k-on-surface-variant font-body">{pt("why")}</p>
                  </div>
                </div>

                {/* 2 & 3. Où et Comment */}
                <div className="bg-white p-6 rounded-2xl border border-border/30 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-heading font-bold text-n2k-primary text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" /> {ph("titles.where")}
                      </h3>
                      <p className="text-n2k-on-surface-variant font-body">{pt("where")}</p>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-n2k-primary text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4 text-slate-400" /> {ph("titles.how")}
                      </h3>
                      <p className="text-n2k-on-surface-variant font-body">{pt("how")}</p>
                    </div>
                  </div>
                </div>
                
                {/* 5. Résultats */}
                <div className="bg-n2k-secondary/5 p-6 rounded-2xl border border-n2k-secondary/20 shadow-sm">
                  <h3 className="font-heading font-bold text-n2k-secondary text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {ph("titles.results")}
                  </h3>
                  <p className="text-n2k-primary font-body font-medium">{pt("results")}</p>
                </div>
              </div>

              {/* PROTOCOLE ET SECURITE */}
              <div className="space-y-6">
                <h2 className="text-3xl font-black font-heading text-n2k-primary flex items-center gap-3 border-b border-border/30 pb-4">
                  <ShieldAlert className="w-8 h-8 text-n2k-secondary" />
                  Protocole et Sécurité
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 6. Temps de contact */}
                  <div className="bg-white p-5 rounded-xl border border-border/30 flex items-start gap-4">
                    <Clock className="w-6 h-6 text-n2k-secondary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-n2k-primary text-xs uppercase tracking-wider mb-1">{ph("titles.contactTime")}</h3>
                      <p className="text-n2k-on-surface-variant font-body">{pt("contactTime")}</p>
                    </div>
                  </div>
                  
                  {/* 7. Rinçage */}
                  <div className="bg-white p-5 rounded-xl border border-border/30 flex items-start gap-4">
                    <Droplets className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-n2k-primary text-xs uppercase tracking-wider mb-1">{ph("titles.rinsing")}</h3>
                      <p className="text-n2k-on-surface-variant font-body">{pt("rinsing")}</p>
                    </div>
                  </div>
                  
                  {/* 8. Aération */}
                  <div className="bg-white p-5 rounded-xl border border-border/30 flex items-start gap-4">
                    <Wind className="w-6 h-6 text-sky-500 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-n2k-primary text-xs uppercase tracking-wider mb-1">{ph("titles.aeration")}</h3>
                      <p className="text-n2k-on-surface-variant font-body">{pt("aeration")}</p>
                    </div>
                  </div>
                  
                  {/* 9. Conformité */}
                  <div className="bg-white p-5 rounded-xl border border-border/30 flex items-start gap-4">
                    <FileText className="w-6 h-6 text-slate-500 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-n2k-primary text-xs uppercase tracking-wider mb-1">{ph("titles.compliance")}</h3>
                      <p className="text-n2k-on-surface-variant font-body text-sm">{pt("compliance")}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SIDEBAR : POSITIONNEMENT & CTA */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* POSITIONNEMENT */}
              <div className="bg-white rounded-3xl border border-border/30 shadow-ambient p-6 space-y-6">
                <h3 className="font-heading font-black text-xl text-n2k-primary border-b border-border/30 pb-3">Positionnement Protocole</h3>
                
                {/* 10. Quand seul suffit */}
                <div>
                  <h4 className="font-heading font-bold text-n2k-primary text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {ph("titles.whenAlone")}
                  </h4>
                  <p className="text-n2k-on-surface-variant text-sm font-body">{pt("whenAlone")}</p>
                </div>
                
                {/* 11. Quand compléter */}
                <div>
                  <h4 className="font-heading font-bold text-n2k-primary text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-500" /> {ph("titles.whenComplete")}
                  </h4>
                  <p className="text-n2k-on-surface-variant text-sm font-body">{pt("whenComplete")}</p>
                </div>
                
                {/* 12. Quand ne pas le proposer */}
                <div>
                  <h4 className="font-heading font-bold text-n2k-primary text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" /> {ph("titles.whenNot")}
                  </h4>
                  <p className="text-n2k-on-surface-variant text-sm font-body">{pt("whenNot")}</p>
                </div>
              </div>

              {/* DOCUMENTATION & CTA (13) */}
              <div className="space-y-4">
                <a href="/documents/fiche-technique.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full bg-white hover:bg-slate-50 text-n2k-primary border border-border/30 px-6 py-4 rounded-xl font-bold font-heading text-sm shadow-sm transition-all">
                  <Download className="w-5 h-5 text-n2k-secondary" />
                  {ph("actions.downloadTechSheet")}
                </a>
                
                <a href="/documents/fds.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full bg-white hover:bg-slate-50 text-n2k-primary border border-border/30 px-6 py-4 rounded-xl font-bold font-heading text-sm shadow-sm transition-all">
                  <ShieldAlert className="w-5 h-5 text-n2k-secondary" />
                  {ph("actions.downloadSDS")}
                </a>

                <Link href="/contact" className="flex items-center justify-center gap-3 w-full bg-n2k-primary hover:bg-n2k-primary-light text-white px-6 py-5 rounded-xl font-black font-heading text-sm shadow-lg transition-all mt-4 group">
                  <Headset className="w-5 h-5" />
                  {tCTA("produit")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ====== RELATED PRODUCTS ====== */}
      {relatedProducts.length > 0 && (
        <section className="bg-n2k-surface-low py-16 md:py-24 border-t border-border/30">
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
