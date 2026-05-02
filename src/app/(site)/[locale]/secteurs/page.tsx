import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Factory, Bird, Beef } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: "Secteurs d'activité — Les Laboratoires N2K",
    description: "Élevage avicole, abattoirs, industrie agroalimentaire : découvrez nos protocoles de maîtrise sanitaire adaptés à votre secteur.",
  };
}

const sectors = [
  {
    key: "elevage" as const,
    href: "/secteurs/elevage-avicole",
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

  return (
    <div className="bg-n2k-surface min-h-[calc(100vh-80px)]">
      {/* Hero */}
      <section className="bg-n2k-surface-low py-16 md:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
            <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
              {t("badge")}
            </span>
            <span className="w-8 h-px bg-n2k-secondary shrink-0"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-n2k-primary leading-[0.95] tracking-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-n2k-on-surface-variant font-body leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Sector Cards */}
      <section className="py-16 md:py-24">
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
    </div>
  );
}
