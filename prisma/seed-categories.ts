import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding blog categories...");

  const categories = [
    {
      slugFr: "elevage",
      slugEn: "farming",
      slugAr: "تربية",
      nameFr: "Élevage",
      nameEn: "Farming",
      nameAr: "تربية",
      titleFr: "Élevage Avicole & Biosécurité",
      titleEn: "Poultry Farming & Biosecurity",
      titleAr: "تربية الدواجن والأمن الحيوي",
      subtitleFr: "Protocoles de nettoyage et désinfection adaptés aux bâtiments d'élevage",
      subtitleEn: "Cleaning and disinfection protocols adapted to livestock buildings",
      subtitleAr: "بروتوكولات التنظيف والتطهير المناسبة لمباني التربية",
      headerImage: "/images/sectors/batiment-elevage.webp",
    },
    {
      slugFr: "abattoir",
      slugEn: "slaughterhouse",
      slugAr: "مسلخ",
      nameFr: "Abattoir",
      nameEn: "Slaughterhouse",
      nameAr: "مسلخ",
      titleFr: "Abattoirs & Hygiène Industrielle",
      titleEn: "Slaughterhouses & Industrial Hygiene",
      titleAr: "المسالخ والنظافة الصناعية",
      subtitleFr: "Solutions de décontamination pour les chaînes d'abattage et de transformation",
      subtitleEn: "Decontamination solutions for slaughter and processing lines",
      subtitleAr: "حلول إزالة التلوث لخطوط الذبح والمعالجة",
      headerImage: "/images/sectors/batiment-abattoir.webp",
    },
    {
      slugFr: "agroalimentaire",
      slugEn: "food-industry",
      slugAr: "صناعة-غذائية",
      nameFr: "Agroalimentaire",
      nameEn: "Food Industry",
      nameAr: "صناعة غذائية",
      titleFr: "Industrie Agroalimentaire & Sécurité Sanitaire",
      titleEn: "Food Industry & Food Safety",
      titleAr: "الصناعة الغذائية والسلامة الصحية",
      subtitleFr: "Maîtrise des risques microbiologiques dans les environnements de production alimentaire",
      subtitleEn: "Microbiological risk management in food production environments",
      subtitleAr: "إدارة المخاطر الميكروبيولوجية في بيئات إنتاج الغذاء",
      headerImage: "/images/sectors/batiment-agroalimentaire.webp",
    },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { slugFr: cat.slugFr },
      update: cat,
      create: cat,
    });
    console.log(`  ✅ ${cat.nameFr}`);
  }

  console.log("✅ Blog categories seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
