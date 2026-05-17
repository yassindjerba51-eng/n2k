import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating blog articles: AIRSAN → OXYLIS HOCl...\n");

  // Phase 1: Simple product name replacement across all articles
  const result = await prisma.$executeRawUnsafe(
    "UPDATE blog_posts SET " +
    "content_fr = REPLACE(content_fr, 'AIRSAN N2K', 'OXYLIS HOCl N2K'), " +
    "content_en = REPLACE(content_en, 'AIRSAN N2K', 'OXYLIS HOCl N2K'), " +
    "content_ar = REPLACE(content_ar, 'AIRSAN N2K', 'OXYLIS HOCl N2K') " +
    "WHERE content_fr LIKE '%AIRSAN%' OR content_en LIKE '%AIRSAN%' OR content_ar LIKE '%AIRSAN%'"
  );
  console.log("✅ Phase 1: Product name replaced in " + result + " articles.");

  // Phase 2: Contextual rewrites per article

  // Article 2 (Ammoniac)
  await prisma.$executeRawUnsafe(
    "UPDATE blog_posts SET " +
    "content_fr = REPLACE(content_fr, " +
      "'solution de nébulisation (comme OXYLIS HOCl N2K) qui neutralise les pathogènes aériens en suspension sans humidifier davantage la litière', " +
      "'solution d''assainissement environnemental (comme OXYLIS HOCl N2K) pour réduire la pression microbiologique de l''air ambiant sans humidifier davantage la litière'" +
    "), " +
    "content_en = REPLACE(content_en, " +
      "'fogging solution (like OXYLIS HOCl N2K) that neutralizes suspended airborne pathogens without further moistening the litter', " +
      "'environmental sanitation solution (like OXYLIS HOCl N2K) to reduce the microbiological pressure in the ambient air without further moistening the litter'" +
    "), " +
    "content_ar = REPLACE(content_ar, " +
      "'محلول رذاذ (مثل OXYLIS HOCl N2K) يحيد مسببات الأمراض المحمولة جواً والمعلقة دون زيادة ترطيب الفرش', " +
      "'محلول تعقيم بيئي (مثل OXYLIS HOCl N2K) لتقليل الضغط الميكروبيولوجي في الهواء المحيط دون زيادة ترطيب الفرش'" +
    ") " +
    "WHERE slug = 'ammoniac-persistant-batiment-elevage-avicole'"
  );
  console.log("✅ Article 2 (Ammoniac): contextual rewrite applied");

  // Article 6 (Contamination croisée)
  await prisma.$executeRawUnsafe(
    "UPDATE blog_posts SET " +
    "content_fr = REPLACE(content_fr, " +
      "'nébulisation désinfectante (comme OXYLIS HOCl N2K) dans les zones critiques après le nettoyage de fin de journée pour assainir l''air et traiter les surfaces inaccessibles', " +
      "'nébulisation d''assainissement (comme OXYLIS HOCl N2K) dans les zones critiques après le nettoyage de fin de journée, en complément des protocoles de nettoyage et désinfection existants'" +
    "), " +
    "content_en = REPLACE(content_en, " +
      "'disinfectant fogging (like OXYLIS HOCl N2K) in critical areas after end-of-day cleaning to sanitize the air and treat inaccessible surfaces', " +
      "'sanitation fogging (like OXYLIS HOCl N2K) in critical areas after end-of-day cleaning, as a complement to existing cleaning and disinfection protocols'" +
    "), " +
    "content_ar = REPLACE(content_ar, " +
      "'رذاذ مطهر (مثل OXYLIS HOCl N2K) في المناطق الحرجة بعد التنظيف في نهاية اليوم لتعقيم الهواء ومعالجة الأسطح التي يتعذر الوصول إليها', " +
      "'رذاذ تعقيم بيئي (مثل OXYLIS HOCl N2K) في المناطق الحرجة بعد التنظيف في نهاية اليوم، كإجراء مكمّل لبروتوكولات النظافة والتطهير القائمة'" +
    ") " +
    "WHERE slug = 'contamination-croisee-chaines-abattage-nettoyage'"
  );
  console.log("✅ Article 6 (Contamination croisée): contextual rewrite applied");

  // Article 9 (Zones cachées)
  await prisma.$executeRawUnsafe(
    "UPDATE blog_posts SET " +
    "content_fr = REPLACE(content_fr, " +
      "'l''arme absolue pour atteindre les zones inaccessibles. Après le nettoyage classique, utilisez un nébulisateur (avec un produit comme OXYLIS HOCl N2K) pour saturer le volume de la pièce d''un brouillard désinfectant sec qui va se déposer sur les évaporateurs, les plafonds et l''arrière des machines', " +
      "'l''approche complémentaire indispensable pour atteindre les zones inaccessibles. Après le nettoyage classique, utilisez un équipement de nébulisation (avec une solution comme OXYLIS HOCl N2K) pour assainir l''environnement technique de la pièce, en ciblant les évaporateurs, les plafonds et les zones difficiles d''accès'" +
    "), " +
    "content_en = REPLACE(content_en, " +
      "'the ultimate weapon to reach inaccessible areas. After classic cleaning, use a fogger (with a product like OXYLIS HOCl N2K) to saturate the room volume with a dry disinfectant fog that will settle on evaporators, ceilings, and the back of machines', " +
      "'the essential complementary approach to reach inaccessible areas. After classic cleaning, use fogging equipment (with a solution like OXYLIS HOCl N2K) to sanitize the technical environment of the room, targeting evaporators, ceilings, and hard-to-reach areas'" +
    "), " +
    "content_ar = REPLACE(content_ar, " +
      "'السلاح المطلق للوصول إلى المناطق التي يصعب الوصول إليها. بعد التنظيف الكلاسيكي، استخدم جهاز الرذاذ (مع منتج مثل OXYLIS HOCl N2K) لتشبع حجم الغرفة بضباب مطهر جاف سيستقر على المبخرات والأسقف والجزء الخلفي من الآلات', " +
      "'النهج التكميلي الأساسي للوصول إلى المناطق التي يصعب الوصول إليها. بعد التنظيف الكلاسيكي، استخدم معدات الرذاذ (مع محلول مثل OXYLIS HOCl N2K) لتعقيم البيئة التقنية للغرفة، مع استهداف المبخرات والأسقف والمناطق التي يصعب الوصول إليها'" +
    ") " +
    "WHERE slug = 'zones-contamination-cachees-abattoirs-ignorees'"
  );
  console.log("✅ Article 9 (Zones cachées): contextual rewrite applied");

  // Article 15 (Réduction contamination)
  await prisma.$executeRawUnsafe(
    "UPDATE blog_posts SET " +
    "content_fr = REPLACE(content_fr, " +
      "'la solution ultime. Une fois le nettoyage de surface terminé et l''usine vide, utilisez un équipement de nébulisation pour saturer l''air de la pièce avec un brouillard désinfectant sec (ex: OXYLIS HOCl N2K). Ce brouillard va flotter dans l''air, détruire les spores en suspension, et se déposer lentement dans les moindres recoins, désinfectant les évaporateurs, les plafonds et l''intérieur des armoires ouvertes', " +
      "'l''approche complémentaire indispensable. Une fois le nettoyage de surface terminé et l''usine vide, utilisez un équipement de nébulisation pour diffuser un brouillard d''assainissement (ex : OXYLIS HOCl N2K). Ce brouillard contribue à réduire la pression microbiologique environnementale en se diffusant dans l''air et en se déposant progressivement sur les évaporateurs, les plafonds et les zones difficiles d''accès, en complément des protocoles de nettoyage et désinfection existants'" +
    "), " +
    "content_en = REPLACE(content_en, " +
      "'the ultimate solution. Once surface cleaning is complete and the plant is empty, use fogging equipment to saturate the room air with a dry disinfectant mist (e.g., OXYLIS HOCl N2K). This fog will float in the air, destroy suspended spores, and slowly settle into the smallest crevices, disinfecting evaporators, ceilings, and the insides of open cabinets', " +
      "'the essential complementary approach. Once surface cleaning is complete and the plant is empty, use fogging equipment to diffuse a sanitizing mist (e.g., OXYLIS HOCl N2K). This mist helps reduce environmental microbiological pressure by diffusing through the air and gradually settling on evaporators, ceilings, and hard-to-reach areas, complementing existing cleaning and disinfection protocols'" +
    "), " +
    "content_ar = REPLACE(content_ar, " +
      "'الحل النهائي. بمجرد اكتمال تنظيف السطح وإفراغ المصنع، استخدم معدات الرذاذ لتشبع هواء الغرفة بضباب مطهر جاف (مثل OXYLIS HOCl N2K). سوف يطفو هذا الضباب في الهواء، ويدمر الأبواغ المعلقة، ويستقر ببطء في أصغر الشقوق، ويطهر المبخرات والأسقف والدواخل المفتوحة للخزائن', " +
      "'النهج التكميلي الأساسي. بمجرد اكتمال تنظيف السطح وإفراغ المصنع، استخدم معدات الرذاذ لنشر رذاذ تعقيم (مثل OXYLIS HOCl N2K). يساهم هذا الرذاذ في تقليل الضغط الميكروبيولوجي البيئي من خلال الانتشار في الهواء والاستقرار التدريجي على المبخرات والأسقف والمناطق التي يصعب الوصول إليها، كإجراء مكمّل لبروتوكولات النظافة والتطهير القائمة'" +
    ") " +
    "WHERE slug = 'comment-reduire-contamination-microbienne-zones-production-agroalimentaire'"
  );
  console.log("✅ Article 15 (Réduction contamination): contextual rewrite applied");

  // Update DSVA section headings
  await prisma.$executeRawUnsafe(
    "UPDATE blog_posts SET " +
    "content_fr = REPLACE(content_fr, 'Désinfection de l''air et de l''ambiance', 'Assainissement de l''air et de l''ambiance'), " +
    "content_en = REPLACE(content_en, 'Air and ambient disinfection', 'Air and ambient sanitation'), " +
    "content_ar = REPLACE(content_ar, 'تطهير الهواء والبيئة المحيطة', 'تعقيم الهواء والبيئة المحيطة') " +
    "WHERE content_fr LIKE '%Désinfection de l''air et de l''ambiance%'"
  );
  console.log("✅ DSVA section headings updated");

  console.log("\n✅ Migration AIRSAN → OXYLIS HOCl complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
