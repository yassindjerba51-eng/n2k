import { getSectorData } from "@/data/sectors-pages";
import SectorDetail from "@/components/sectors/SectorDetail";
import { Factory } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Industrie Agroalimentaire — Hygiène Industrielle | Les Laboratoires N2K",
    description: "Protocoles d'hygiène industrielle pour l'agroalimentaire : nettoyage CIP, désinfection des lignes, traitement de l'air. Normes IFS/BRC, maîtrise Listeria.",
  };
}

export default async function IndustrieAgroalimentaire({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sector = getSectorData("industrie-agroalimentaire", locale);
  const t = await getTranslations("sectors.agroalimentaire");

  return (
    <SectorDetail
      sector={sector}
      title={t("title")}
      subtitle={t("desc")}
      icon={<Factory className="w-7 h-7" />}
      image="/images/hero_industrie_agroalimentaire.png"
      tag="Industrie agroalimentaire"
      locale={locale}
    />
  );
}
