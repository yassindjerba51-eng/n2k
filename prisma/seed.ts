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
      step: 2, // Nettoyage enzymatique
      description: {
        fr: "Nettoyant enzymatique concentré. Dégradation des matières organiques (graisses, protéines, biofilms) avant désinfection.",
        en: "Concentrated enzymatic cleaner. Degradation of organic matter (grease, proteins, biofilms) before disinfection.",
        ar: "منظف إنزيمي مركز. تحلل المواد العضوية (الدهون، البروتينات، الأغشية الحيوية) قبل التطهير.",
      },
      dosage: "1 à 3 % (standard) / 5 à 10 % (fort)",
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }
  console.log("Seeded products.");

  // Clear existing blog posts to avoid conflicts
  await prisma.blogPost.deleteMany();
  console.log("Cleared existing blog posts.");

  const blogPosts = [
    // Featured Card 1 — "Problématique"
    {
      titleFr: "Biofilms Industriels : La menace invisible pour vos standards de qualité",
      titleEn: "Industrial Biofilms: The Invisible Threat to Your Quality Standards",
      titleAr: "الأغشية الحيوية الصناعية: التهديد الخفي لمعايير الجودة",
      slug: "biofilms-industriels-menace-invisible",
      contentFr: "<h2>L'Impact Invisible</h2><p>Le biofilm n'est pas simplement une couche de saleté. C'est une structure biologique complexe qui protège les pathogènes contre vos protocoles de désinfection classiques.</p><ul><li>Augmentation de 15% de la mortalité précoce</li><li>Surconsommation de traitements antibiotiques</li></ul><h2>Pourquoi les standards échouent</h2><p>La majorité des désinfectants agissent par contact. Cependant, 90% de la biomasse bactérienne réside au sein de la matrice extracellulaire polymérique (EPS).</p>",
      contentEn: "<h2>The Invisible Impact</h2><p>Biofilm is not just a layer of dirt. It is a complex biological structure that protects pathogens against your conventional disinfection protocols.</p><ul><li>15% increase in early mortality</li><li>Overconsumption of antibiotic treatments</li></ul><h2>Why standards fail</h2><p>Most disinfectants act by contact. However, 90% of the bacterial biomass resides within the polymeric extracellular matrix (EPS).</p>",
      contentAr: "<h2>الأثر غير المرئي</h2><p>الغشاء الحيوي ليس مجرد طبقة من الأوساخ. إنه هيكل بيولوجي معقد يحمي مسببات الأمراض.</p><ul><li>زيادة بنسبة 15٪ في الوفيات المبكرة</li><li>الاستهلاك المفرط للمضادات الحيوية</li></ul>",
      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrlQjxRe_hKKzmkmtz-eKiJLXSeWDECeSsts5F3UmyCvBDWcfegIaUoWAXhxadSXQDSCBsvIOpAHojmE-ABZ8RUdWWpviZ9MtJn3pSBnRa_zAatC_vBONwYlF13viGXPo8GEY7uqszXh4D0v98KZIL587pNR97UnIJ0ZS0D7c1YjUy-kDO3RBURhNxItcCwxy0DqVpph4UCwRNql8yl_IKUhmggy0uFrrzS3Ukfwv5qvUV80U1an26dNtk4k3vp3fcN95J-2cHJhI",
      publishedAt: new Date("2024-11-15"),
    },
    // Featured Card 2 — "Erreur Critique"
    {
      titleFr: "Mauvais rinçage et résidus chimiques : Comment éviter les non-conformités",
      titleEn: "Poor Rinsing and Chemical Residues: How to Avoid Non-Compliance",
      titleAr: "الشطف السيئ والمخلفات الكيميائية: كيفية تجنب عدم المطابقة",
      slug: "residus-chimiques-non-conformites",
      contentFr: "<p>Les risques croisés entre hygiène chimique et sécurité alimentaire : protocoles et contrôles. Un rinçage insuffisant après l'application de produits chimiques de nettoyage peut laisser des résidus dangereux sur les surfaces de contact alimentaire.</p><p>Cet article explore les meilleures pratiques pour garantir un rinçage efficace et les méthodes de contrôle pour vérifier l'absence de résidus chimiques, conformément aux normes HACCP et aux réglementations sanitaires en vigueur.</p>",
      contentEn: "<p>Cross-risks between chemical hygiene and food safety: protocols and controls. Insufficient rinsing after applying chemical cleaning products can leave dangerous residues on food contact surfaces.</p><p>This article explores best practices for ensuring effective rinsing and control methods to verify the absence of chemical residues, in compliance with HACCP standards.</p>",
      contentAr: "<p>المخاطر المتقاطعة بين النظافة الكيميائية وسلامة الغذاء: البروتوكولات والضوابط. الشطف غير الكافي بعد تطبيق منتجات التنظيف الكيميائية يمكن أن يترك بقايا خطيرة على أسطح ملامسة الطعام.</p>",
      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4Jfd7YKytJawNTtzRrXiRwlueDQpCw2bDdsz--qAmANjLfN0296Hnu6ZKJ9Y8m92VT5OEKVJ0ilUJ__p-AFzHkVIFzWXCqk-HFb-tjYxmi4sF2tGxU1osGyFBVfsglEPwKAnUbaSM5OJRsHVTWaa7ugmSxKRzas9kTOjAUO9fKK_R4ABml6_Z6oTpZT476ARBG-rj0GipgD6Dpol-qJbCgYm7rKi9Q5g6jWKYw7eFrh7f8pxJkIezty2WaC7I9bXoDieKh8D3dE8",
      publishedAt: new Date("2024-11-01"),
    },
    // Featured Card 3 — "Solution N2K"
    {
      titleFr: "Automatisation de l'hygiène : Intégrer les solutions N2K dans vos NEP",
      titleEn: "Hygiene Automation: Integrating N2K Solutions into Your CIP Systems",
      titleAr: "أتمتة النظافة: دمج حلول N2K في أنظمة التنظيف في المكان",
      slug: "automatisation-hygiene-nep",
      contentFr: "<p>Optimisez vos systèmes Cleaning-in-Place (CIP) avec nos agents de nettoyage intelligents. L'automatisation des protocoles d'hygiène représente un levier majeur de productivité et de conformité dans l'industrie agroalimentaire.</p><p>Nos solutions enzymatiques et détergentes sont spécifiquement formulées pour s'intégrer dans les circuits NEP existants, garantissant une efficacité optimale tout en réduisant la consommation d'eau et d'énergie de 30%.</p>",
      contentEn: "<p>Optimize your Cleaning-in-Place (CIP) systems with our intelligent cleaning agents. Automating hygiene protocols represents a major lever for productivity and compliance in the agri-food industry.</p><p>Our enzymatic and detergent solutions are specifically formulated to integrate into existing CIP circuits, ensuring optimal efficiency while reducing water and energy consumption by 30%.</p>",
      contentAr: "<p>حسّن أنظمة التنظيف في المكان (CIP) الخاصة بك مع عوامل التنظيف الذكية لدينا. تمثل أتمتة بروتوكولات النظافة رافعة رئيسية للإنتاجية والامتثال في الصناعة الغذائية.</p>",
      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXrBUDLgQRgGCeDjpUpVerHwNQfJ6uBlvot-v2955-Z3G68s8KTIbjtLlMdrwTVTmMiTa1mO3PWvr4rGG-R4sUwjQ-PkzYxxTAR-PnFwAx1Xeud_EWy1U2rupW3gRIO4W7Nfqoua-1xX-blxvdVfNFgVH1H0oW2MYP0oklw-L9Ll-scC1ojJvm5KG-Hfw_A5LVpzVnRHhmvNDTUCcOltzGDojvOLQRGOyxsNL-XSDFwgFoK1hl9Qv8mMH2QQ5ytbR_SGpceeYyJIg",
      publishedAt: new Date("2024-10-20"),
    },
    // Library Article 1 — Traçabilité
    {
      titleFr: "La Traçabilité des interventions : Un levier de performance sanitaire",
      titleEn: "Intervention Traceability: A Lever for Sanitary Performance",
      titleAr: "تتبع التدخلات: رافعة للأداء الصحي",
      slug: "tracabilite-interventions-performance",
      contentFr: "<p>Comment digitaliser vos rapports d'hygiène pour assurer une transparence totale lors des audits réglementaires. La traçabilité des opérations de nettoyage et de désinfection est devenue un impératif réglementaire dans l'industrie agroalimentaire.</p><p>Les outils numériques modernes permettent de documenter chaque intervention en temps réel : produit utilisé, dosage, temps de contact, opérateur responsable. Cette approche facilite considérablement les audits et renforce la confiance des partenaires commerciaux.</p>",
      contentEn: "<p>How to digitize your hygiene reports to ensure total transparency during regulatory audits. Traceability of cleaning and disinfection operations has become a regulatory imperative in the food industry.</p>",
      contentAr: "<p>كيفية رقمنة تقارير النظافة الخاصة بك لضمان الشفافية التامة خلال عمليات التدقيق التنظيمية.</p>",
      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDheGg4j-h1i9huGJBna3oqUo8LBHhCVsahVHoKTrcgMhsKJmSsrtxGSnrBuPIbmUOFtbYACITFNqoCvh-2Rtu5FGF569PDIsiSu-stlf3BJIGea6qaJCSZkT8TFzR0lCS-DtPoCR-acNmq2YNnIRmASPizxf3V02N5cUhO4_tw0vQEV4JoTCkGAWxCd8mzihz1y3hvSypFnVlGlraejUS2CFPjJSCNqlwFMnUkdF75Ci3hpFIIODaL8j_jN-u358iexL02ApI1Atw",
      publishedAt: new Date("2024-10-01"),
    },
    // Library Article 2 — Purification de l'Air
    {
      titleFr: "Purification de l'air en zones de conditionnement",
      titleEn: "Air Purification in Packaging Zones",
      titleAr: "تنقية الهواء في مناطق التعبئة",
      slug: "purification-air-conditionnement",
      contentFr: "<p>Réduire la contamination aéroportée pour prolonger la DLC de vos produits sensibles sans conservateurs. La qualité de l'air dans les zones de conditionnement est un facteur critique souvent sous-estimé dans la chaîne de production alimentaire.</p><p>Nos solutions de nébulisation AIRSAN N2K permettent de réduire de 85% la charge microbienne aéroportée, contribuant directement à l'extension de la durée de vie des produits frais sans recourir à des additifs conservateurs.</p>",
      contentEn: "<p>Reduce airborne contamination to extend the shelf life of your sensitive products without preservatives. Air quality in packaging zones is a critical, often underestimated factor in the food production chain.</p>",
      contentAr: "<p>تقليل التلوث المحمول جواً لتمديد فترة صلاحية منتجاتك الحساسة بدون مواد حافظة.</p>",
      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKk2R7m6GbX-_ttwc-ZP_jJKSH_y_-7cQB-frosMilsF7nr8xOzOatn1ndIMguJA4G8bLDikXPm90y05il48Cpr-e2lzGhUZCj1YT7KWHO68Hi-FIh-YJyuv7oyBEoQE-HFSC1eAfkkDBQrSm42HYT7O120k01RRemwZw1EjaTZyYGCUXADjFsFBBC-DRxPoAhDpOl4jzRY-Sy9XcKsrgGXX-aIjKLTknfMOymAIEhx2cfCDiQaz5mcKoWX-Y6hfC--thRYgWkRns",
      publishedAt: new Date("2024-09-15"),
    },
    // Library Article 3 — Désinfection Durable
    {
      titleFr: "Désinfection durable : Réconcilier efficacité et écologie",
      titleEn: "Sustainable Disinfection: Reconciling Efficacy and Ecology",
      titleAr: "التطهير المستدام: التوفيق بين الفعالية والبيئة",
      slug: "desinfection-durable-ecologie",
      contentFr: "<p>L'émergence des molécules biosourcées dans l'industrie agroalimentaire : opportunités et limites techniques. Face à la pression réglementaire croissante et aux attentes des consommateurs, l'industrie agroalimentaire se tourne vers des solutions de désinfection plus respectueuses de l'environnement.</p><p>Cet article analyse les dernières avancées en matière de molécules biosourcées, leur efficacité comparée aux solutions conventionnelles, et les conditions d'application optimales pour garantir un niveau de désinfection conforme aux normes les plus exigeantes.</p>",
      contentEn: "<p>The emergence of bio-sourced molecules in the food industry: opportunities and technical limitations. Facing growing regulatory pressure and consumer expectations, the food industry is turning to more environmentally friendly disinfection solutions.</p>",
      contentAr: "<p>ظهور الجزيئات الحيوية المصدر في الصناعة الغذائية: الفرص والقيود التقنية.</p>",
      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmVBel6i7JsuoBJDyavj6BjW5hQU2rU5aQ8dhGhIgBvICgfrfwyYg7240bEvChQun5CKc_w1-O6QRGChBjJo1GfIwI5E82DiASv_6-49Wk7GsAsobCYZX8z0CfnjIHRrQaNV5vBuGfio8JlLBvMTgXRpr3hJ6B9SzbjA4_XQwajtpZORl8CpeK1k5OQBwxBm_YOE6zSVEnoevnKlmpnsUCXo1jeg7iW9KCJX-H8JM7ZqiCeQecCj4iTau_G888Y9y41a8BKSv8QQ0",
      publishedAt: new Date("2024-08-20"),
    },
  ];

  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log("Seeded blog posts.");

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
