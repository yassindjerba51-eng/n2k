import { PrismaClient, Zone } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Reset existing products to avoid conflicts with new schema
  await prisma.product.deleteMany();
  console.log("Cleared existing products.");

  const products = [
    // ZONE: BATIMENT
    {
      name: "CLORAGRO",
      slug: "cloragro",
      category: Zone.BATIMENT,
      isDisinfectant: true,
      step: 1, // Nettoyage technique / Biofilm
      description: {
        fr: "Destruction radicale du biofilm organique. Préparation indispensable avant désinfection.",
        en: "Radical destruction of organic biofilm. Essential preparation before disinfection.",
        ar: "تدمير جذري للغشاء الحيوي العضوي. تحضير أساسي قبل التطهير.",
      },
      dosage: "2%",
    },
    {
      name: "OPTIMAGRO",
      slug: "optimagro",
      category: Zone.BATIMENT,
      isDisinfectant: true,
      step: 2, // Désinfection
      description: {
        fr: "Désinfection à spectre complet (Bactéricide, Virucide, Fongicide). Rémanence maximale.",
        en: "Full spectrum disinfection (Bactericidal, Virucidal, Fungicidal). Maximum persistence.",
        ar: "تطهير كامل الطيف (مبيد للجراثيم ، مبيد للفيروسات ، مبيد للفطريات). بقاء أقصى.",
      },
      dosage: "1% à 2%",
    },
    // ZONE: EAU
    {
      name: "BIONET",
      slug: "bionet",
      category: Zone.EAU,
      isDisinfectant: false,
      step: 1, // Nettoyage technique
      description: {
        fr: "Nettoyage technique des canalisations. Décapage des dépôts organiques et calcaire.",
        en: "Technical cleaning of pipes. Stripping of organic and limescale deposits.",
        ar: "تنظيف تقني للقنوات. قشر الرواسب العضوية والكلسية.",
      },
      dosage: "1% à 3%",
    },
    {
      name: "AQUACONTROL N2K",
      slug: "aquacontrol-n2k",
      category: Zone.EAU,
      isDisinfectant: false,
      step: 2, // Stabilisation
      description: {
        fr: "Stabilisation de la qualité de l'eau. Contrôle constant de la charge microbienne.",
        en: "Water quality stabilization. Constant control of microbial load.",
        ar: "استقرار جودة المياه. مراقبة مستمرة للحمل الميكروبي.",
      },
      dosage: "0.1% en continu",
    },
    // ZONE: AMBIANCE
    {
      name: "AIRSAN N2K",
      slug: "airsan-n2k",
      category: Zone.AMBIANCE,
      isDisinfectant: false,
      step: 1, // Réduction de charge
      description: {
        fr: "Réduction de la charge microbienne aérienne et des gaz nocifs (Ammoniac).",
        en: "Reduction of airborne microbial load and harmful gases (Ammonia).",
        ar: "تقليل الحمل الميكروبي المحمول جواً والغازات الضارة (الأمونيا).",
      },
      dosage: "Nébulisation 1ml/m³",
    },
    {
      name: "BIOACTIVE N2K",
      slug: "bioactive-n2k",
      category: Zone.AMBIANCE,
      isDisinfectant: false,
      step: 2, // Stabilisation microbiologique
      description: {
        fr: "Stabilisation microbiologique de l'environnement par compétition positive.",
        en: "Microbiological stabilization of the environment by positive competition.",
        ar: "الاستقرار الميكروبيولوجي للبيئة من خلال التنافس الإيجابي.",
      },
      dosage: "Pulvérisation hebdomadaire",
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }
  console.log("Seeded products.");

  const blogPosts = [
    {
      titleFr: "Le protocole scientifique N2K : Pourquoi l'ordre compte",
      titleEn: "The N2K scientific protocol: Why the order matters",
      titleAr: "بروتوكول N2K العلمي: لماذا الترتيب مهم",
      slug: "protocole-scientifique-n2k",
      contentFr: "La désinfection échoue souvent car elle est faite sur des surfaces sales...",
      contentEn: "Disinfection often fails because it is performed on dirty surfaces...",
      contentAr: "غالباً ما يفشل التطهير لأنه يتم على أسطح متسخة...",
      tags: "protocole, expertise, N2K",
    },
  ];

  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
  }
  console.log("Seeded blog posts.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
