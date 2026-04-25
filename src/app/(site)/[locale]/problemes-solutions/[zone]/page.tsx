import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Timeline from "@/components/ui/Timeline";
import ProductCard from "@/components/ui/ProductCard";
import { Building2, Droplets, Wind, ShieldAlert, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Zone as DbZone } from "@prisma/client";

interface ZonePageProps {
  params: Promise<{ locale: string; zone: string }>;
}

const zoneConfigMap = {
  batiment: {
    icon: Building2,
    color: "bg-secondary",
    accent: "text-secondary",
    dbCategory: DbZone.BATIMENT,
  },
  water: {
    icon: Droplets,
    color: "bg-primary",
    accent: "text-primary",
    dbCategory: DbZone.EAU,
  },
  air: {
    icon: Wind,
    color: "bg-orange",
    accent: "text-orange",
    dbCategory: DbZone.AMBIANCE,
  },
};

export default async function ZoneDetailPage({ params }: ZonePageProps) {
  const { zone, locale } = await params;

  if (!Object.keys(zoneConfigMap).includes(zone)) {
    notFound();
  }

  const t = await getTranslations("problemesSolutions");
  const currentZone = zone as keyof typeof zoneConfigMap;
  const config = zoneConfigMap[currentZone];

  // Fetch products for this zone directly from Prisma
  const dbProducts = await prisma.product.findMany({
    where: { category: config.dbCategory }
  });

  const timelineItems = [
    {
      step: "01",
      title: t(`${zone}.protocol.step1.name`),
      subtitle: t(`${zone}.protocol.step1.action`),
      description: t(`${zone}.protocol.step1.desc`),
      icon: ShieldAlert,
      color: "bg-secondary",
    },
    {
      step: "02",
      title: t(`${zone}.protocol.step2.name`),
      subtitle: t(`${zone}.protocol.step2.action`),
      description: t(`${zone}.protocol.step2.desc`),
      icon: CheckCircle2,
      color: "bg-primary",
    },
  ];

  const categoryMap: Record<DbZone, "Batiment" | "Eau" | "Ambiance"> = {
    [DbZone.BATIMENT]: "Batiment",
    [DbZone.EAU]: "Eau",
    [DbZone.AMBIANCE]: "Ambiance"
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Header */}
      <section className="bg-surface-low py-24 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
          <div className={`p-4 rounded-2xl ${config.color} text-white mb-8`}>
            <config.icon className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight mb-8 text-primary">
            {t(`${zone}.pageTitle`)}
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant font-body max-w-3xl leading-relaxed">
            {t(`${zone}.pageSubtitle`)}
          </p>
        </div>
      </section>

      {/* Problem & Impact */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/50 border-y border-border/50">
        <div className="bg-surface p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-4xl font-black font-heading text-primary mb-8 tracking-tight">
            {t(`${zone}.problem.title`)}
          </h2>
          <p className="text-xl text-on-surface-variant font-body leading-relaxed mb-10">
            {t(`${zone}.problem.content`)}
          </p>
          <div className="bg-error/5 p-8 rounded-3xl border border-error/10">
            <p className="text-error font-black font-heading text-xl">
              {t(`${zone}.problem.impact`)}
            </p>
          </div>
        </div>
        <div className="bg-surface p-12 md:p-24">
          <h2 className="text-4xl font-black font-heading text-primary mb-12 tracking-tight">
            {t(`${zone}.protocol.title`)}
          </h2>
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* Product Catalog */}
       <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-black font-heading text-primary tracking-tight">
              Catalogue Technique
            </h2>
            <p className="text-on-surface-variant font-body text-xl mt-4">
              {zone === 'batiment' ? 'Sols et surfaces de bâtiments.' : zone === 'water' ? 'Hygiène des réseaux d’eau.' : 'Maîtrise de l’ambiance microbienne.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dbProducts.map((product) => {
             const desc = (product.description as any)[locale] || (product.description as any)["fr"];
             return (
              <ProductCard
                key={product.id}
                name={product.name}
                description={desc}
                category={categoryMap[product.category]}
                isDisinfectant={product.isDisinfectant}
                dosage={product.dosage || "Selon protocole N2K"}
                step={product.step}
              />
            );
          })}
          {dbProducts.length === 0 && (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-border rounded-[3rem]">
              <p className="text-on-surface-variant font-body text-lg italic">
                Aucun produit disponible pour cette zone dans cette langue.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
