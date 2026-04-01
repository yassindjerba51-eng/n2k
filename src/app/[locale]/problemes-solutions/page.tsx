import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Building2, Droplets, Wind, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("solutionsTitle"),
    description: t("solutionsDescription"),
  };
}

export default async function ProblemesSolutionsHub() {
  const t = await getTranslations("hub");

  const zones = [
    {
      id: "batiment",
      icon: Building2,
      color: "bg-secondary",
      accent: "text-secondary",
      path: "/problemes-solutions/batiment",
    },
    {
      id: "water",
      icon: Droplets,
      color: "bg-primary",
      accent: "text-primary",
      path: "/problemes-solutions/water",
    },
    {
      id: "air",
      icon: Wind,
      color: "bg-orange",
      accent: "text-orange",
      path: "/problemes-solutions/air",
    },
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="bg-surface-low py-32 border-b border-border/50 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter text-primary mb-8 animate-fade-in-up">
            {t("title")}
          </h1>
          <p className="text-xl text-on-surface-variant font-body leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Grid Selection */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {zones.map((zone) => (
            <Link
              key={zone.id}
              href={zone.path as any}
              className="group bg-surface-lowest rounded-3xl p-10 border border-border/50 shadow-ambient-lg hover:border-secondary transition-all duration-500 flex flex-col items-start"
            >
              <div className={`p-6 rounded-[2rem] ${zone.color} text-white mb-10 group-hover:scale-110 transition-transform duration-500`}>
                <zone.icon className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl font-black font-heading text-primary mb-6 group-hover:text-secondary transition-colors">
                {t(`zones.${zone.id}.title`)}
              </h2>
              
              <p className="text-on-surface-variant font-body leading-relaxed mb-10">
                {t(`zones.${zone.id}.description`)}
              </p>

              <div className="mt-auto flex items-center gap-3 font-black font-heading text-secondary uppercase tracking-[0.2em] text-xs">
                <span>{t(`zones.${zone.id}.link`)}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
