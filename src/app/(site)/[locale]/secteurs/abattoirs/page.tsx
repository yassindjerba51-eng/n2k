import { getSectorData } from "@/data/sectors-pages";
import SectorDetail from "@/components/sectors/SectorDetail";
import { Beef } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Abattoirs — Hygiène & Conformité HACCP | Les Laboratoires N2K",
    description: "Protocoles de nettoyage-désinfection pour abattoirs : chaîne d'abattage, chambres froides, eau de process. Conformité HACCP et maîtrise Salmonella/Listeria.",
  };
}

export default async function Abattoirs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sector = getSectorData("abattoirs", locale);
  const t = await getTranslations("sectors.abattoirs");

  return (
    <SectorDetail
      sector={sector}
      title={t("title")}
      subtitle={t("desc")}
      icon={<Beef className="w-7 h-7" />}
      image="/images/hero_abattoirs.png"
    />
  );
}
