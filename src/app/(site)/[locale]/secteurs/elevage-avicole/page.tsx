import { getSectorData } from "@/data/sectors-pages";
import SectorDetail from "@/components/sectors/SectorDetail";
import { Bird } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Élevage Avicole — Protocoles de Biosécurité | Les Laboratoires N2K",
    description: "Protocoles de maîtrise sanitaire pour l'élevage avicole : nettoyage inter-bandes, traitement de l'eau, contrôle de l'ambiance. Réduisez la mortalité et améliorez vos performances.",
  };
}

export default async function ElevageAvicole({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sector = getSectorData("elevage-avicole", locale);
  const t = await getTranslations("sectors.elevage");

  return (
    <SectorDetail
      sector={sector}
      title={t("title")}
      subtitle={t("desc")}
      icon={<Bird className="w-7 h-7" />}
    />
  );
}
