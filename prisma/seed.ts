import { PrismaClient, Zone } from "@prisma/client";
import bcrypt from "bcryptjs";

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
      name: "OXYLIS HOCl",
      slug: "oxylis-hoci",
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
      name: "OXYLIS HOCl",
      slug: "oxylis-hoci-ambiance",
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
      slug: "bioactive",
      category: Zone.AMBIANCE,
      isDisinfectant: false,
      step: 2, // Nettoyage enzymatique
      description: {
        fr: "Solution enzymatique d'entretien biologique des surfaces et de l'ambiance pour élevage avicole. Réduction progressive des accumulations organiques et amélioration de l'ambiance.",
        en: "Enzymatic solution for biological maintenance of surfaces and atmosphere in poultry farming. Progressive reduction of organic accumulations and atmosphere improvement.",
        ar: "محلول إنزيمي للعناية البيولوجية بالأسطح والجو الداخلي في مزارع الدواجن. تقليل تدريجي للتراكمات العضوية وتحسين الجو العام.",
      },
      dosage: "Brumisation / Pulvérisation régulière",
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }
  console.log("Seeded products.");

  // Blog posts are now managed via separate insertion scripts (prisma/insert-batch-*.ts)
  // No blog post seeding in seed.ts

  // Seed Admin User
  const adminPassword = await bcrypt.hash("password123", 10);
  await prisma.user.upsert({
    where: { email: "admin@n2k.tn" },
    update: {},
    create: {
      email: "admin@n2k.tn",
      name: "Dr. Naffati (Admin)",
      password: adminPassword,
    },
  });
  console.log("Seeded admin user.");
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
