import { getTranslations } from "next-intl/server";
import { FlaskConical } from "lucide-react";
import ProductFilter from "@/components/ui/ProductFilter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("produitsTitle"),
    description: t("produitsDescription"),
  };
}

export default async function ProduitsPage() {
  const t = await getTranslations("products");

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)]">
      {/* ====== HERO SECTION ====== */}
      <section className="bg-n2k-surface-low relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
              <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
                {t("badge")}
              </span>
              <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading text-n2k-primary leading-[0.95] tracking-tight mb-8">
              {t("heroTitle")}
            </h1>

            <p className="text-lg md:text-xl text-n2k-on-surface-variant font-body leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ====== ZONE OVERVIEW BANNER ====== */}
      <section className="bg-n2k-primary py-10 md:py-14">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {[
              {
                zone: "Zone 01",
                name: t("zone01Name"),
                desc: t("zone01Desc"),
                color: "#0D7ED0",
              },
              {
                zone: "Zone 02",
                name: t("zone02Name"),
                desc: t("zone02Desc"),
                color: "#0D9488",
              },
              {
                zone: "Zone 03",
                name: t("zone03Name"),
                desc: t("zone03Desc"),
                color: "#EA580C",
              },
            ].map((z, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15"
              >
                <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase text-n2k-secondary mb-2">
                  {z.zone}
                </span>
                <h3 className="text-xl md:text-2xl font-black font-heading text-white mb-2">
                  {z.name}
                </h3>
                <p className="text-white/70 text-sm font-body">{z.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRODUCT CATALOG ====== */}
      <section className="bg-n2k-surface py-16 md:py-24">
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

          <ProductFilter />
        </div>
      </section>
    </div>
  );
}
