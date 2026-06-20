export type Sector = "elevage" | "abattoir" | "agroalimentaire";

export type SectorProduct = {
  name: string;
  type: string;
  desc: string;
  features: string[];
};

export type SectorZoneContent = {
  product1: SectorProduct;
  product2?: SectorProduct;
  image: string;
};

export type ZoneSectorMap = Record<Sector, SectorZoneContent>;

export const sectors: Sector[] = ["elevage", "abattoir", "agroalimentaire"];

// ─── ZONE 01 — LE BÂTIMENT ──────────────────────────────────────────
export const batimentSectors: ZoneSectorMap = {
  elevage: {
    product1: {
      name: "CLORAGRO",
      type: "Détergent Technique — Phase 01",
      desc: "Alcalin chloré ultra-puissant conçu pour déstructurer la matrice organique du biofilm et éliminer les graisses persistantes dans les poulaillers et bâtiments d'élevage avicole.",
      features: [
        "Déstructuration du biofilm organique sur sols et parois",
        "Élimination des graisses et protéines persistantes en élevage",
        "Préparation de surface optimale avant traitement du poulailler",
      ],
    },
    product2: {
      name: "OPTIMAGRO",
      type: "Traitement — Phase 02",
      desc: "Solution de traitement des surfaces à spectre complet — Glutaraldéhyde + Ammoniums Quaternaires — Phase 02. S'applique obligatoirement après rinçage complet des résidus chlorés.",
      features: [
        "Spectre complet de traitement des surfaces",
        "Rémanence prolongée jusqu'à 7 jours entre bandes",
        "Protection maximale des poussins et nouveaux arrivants",
      ],
    },
    image: "/images/sectors/batiment-elevage.webp",
  },
  abattoir: {
    product1: {
      name: "CLORAGRO",
      type: "Nettoyage — Surfaces Abattoir",
      desc: "Formulation chlorée haute performance pour le décapage et le nettoyage des sols de chaîne d'abattage, tables de découpe et zones de saignée en abattoir de volaille.",
      features: [
        "Élimination des résidus sanguins et graisses animales",
        "Décapage des sols carrelés et surfaces inox",
        "Action rapide adaptée aux cadences de production",
      ],
    },
    product2: {
      name: "OPTIMAGRO",
      type: "Traitement — Post-Nettoyage Abattoir",
      desc: "Solution de traitement des surfaces appliquée après le nettoyage CLORAGRO pour compléter le protocole d'hygiène dans les zones sensibles de l'abattoir.",
      features: [
        "Efficacité prouvée sur les zones critiques d'abattage",
        "Conforme aux normes d'hygiène HACCP",
        "Applicable sur surfaces en contact alimentaire après rinçage",
      ],
    },
    image: "/images/sectors/batiment-abattoir.webp",
  },
  agroalimentaire: {
    product1: {
      name: "CLORAGRO",
      type: "Nettoyage — Industrie Laitière",
      desc: "Détergent chloré alcalin formulé pour le nettoyage des cuves de pasteurisation, lignes de conditionnement et surfaces de production en industrie laitière et agroalimentaire.",
      features: [
        "Dissolution des dépôts protéiques et lipidiques du lait",
        "Nettoyage CIP (Cleaning In Place) des circuits fermés",
        "Compatible avec les surfaces inox et les joints alimentaires",
      ],
    },
    product2: {
      name: "OPTIMAGRO",
      type: "Traitement — Process Agroalimentaire",
      desc: "Solution de traitement certifiée pour les surfaces de production agroalimentaire. Complète le protocole d'hygiène entre lots de production.",
      features: [
        "Certifié pour contact alimentaire indirect",
        "Intégration dans les plans HACCP de production",
        "Efficacité prouvée en milieu laitier et agroalimentaire",
      ],
    },
    image: "/images/sectors/batiment-agroalimentaire.webp",
  },
};

// ─── ZONE 02 — L'EAU ────────────────────────────────────────────────
export const eauSectors: ZoneSectorMap = {
  elevage: {
    product1: {
      name: "BIONET",
      type: "Nettoyage Technique — Curatif",
      desc: "Nettoyage technique des canalisations d'abreuvement avicole. Décapage des dépôts organiques, biofilm et tartre dans les lignes de pipettes et nipples.",
      features: [
        "Élimination radicale du tartre et des dépôts minéraux",
        "Désincrustation des pipettes et circuits d'abreuvement",
        "Action choc immédiate avant mise en place des poussins",
      ],
    },
    product2: {
      name: "OXYLIS HOCl",
      type: "Entretien — Maintien Quotidien",
      desc: "Entretien opérationnel des circuits d'eau et des environnements techniques en élevage. S'intègre dans les protocoles de maintenance quotidienne des installations.",
      features: [
        "Entretien continu des réseaux d'eau et des équipements",
        "Compatibilité totale avec les systèmes de dosage automatique",
        "Simplification des protocoles opérationnels",
      ],
    },
    image: "/images/sectors/eau-elevage.webp",
  },
  abattoir: {
    product1: {
      name: "BIONET",
      type: "Détartrage — Circuits Process",
      desc: "Nettoyage enzymatique des circuits d'eau utilisés dans la chaîne d'abattage : échaudoirs, refroidisseurs, postes de lavage des carcasses.",
      features: [
        "Décapage des dépôts protéiques dans les échaudoirs",
        "Nettoyage des circuits de refroidissement à air et eau",
        "Élimination des résidus dans les conduites",
      ],
    },
    product2: {
      name: "OXYLIS HOCl",
      type: "Entretien — Eau de Process",
      desc: "Entretien en continu des circuits d'eau utilisés dans les process d'abattage. S'intègre dans la maintenance opérationnelle des réseaux et équipements.",
      features: [
        "Entretien des circuits d'eau de process",
        "Intégration dans les protocoles de maintenance quotidienne",
        "Dosage automatisé pour flux de production continu",
      ],
    },
    image: "/images/sectors/eau-abattoir.webp",
  },
  agroalimentaire: {
    product1: {
      name: "BIONET",
      type: "Nettoyage CIP — Laiterie",
      desc: "Nettoyage enzymatique des circuits CIP (Cleaning In Place) en industrie laitière : tuyauteries, échangeurs thermiques, cuves de pasteurisation.",
      features: [
        "Dissolution des dépôts de pierre de lait (tartre protéique)",
        "Nettoyage des échangeurs thermiques et pasteurisateurs",
        "Préservation des joints et membranes alimentaires",
      ],
    },
    product2: {
      name: "OXYLIS HOCl",
      type: "Entretien — Eau Agroalimentaire",
      desc: "Entretien des circuits d'eau de process agroalimentaire. Maintenance opérationnelle continue des eaux de rinçage, de refroidissement et de production.",
      features: [
        "Entretien continu des circuits d'eau de process",
        "Intégration dans les protocoles de maintenance industrielle",
        "Traçabilité analytique pour audits qualité (IFS/BRC)",
      ],
    },
    image: "/images/sectors/eau-agroalimentaire.webp",
  },
};

// ─── ZONE 03 — L'AMBIANCE ───────────────────────────────────────────
export const ambianceSectors: ZoneSectorMap = {
  elevage: {
    product1: {
      name: "OXYLIS HOCl",
      type: "Entretien — Environnements Techniques",
      desc: "Solution technique d'entretien des environnements de production en élevage avicole. S'intègre dans les protocoles de maintenance des ambiances de travail sans perturber les litières.",
      features: [
        "Utilisation compatible en présence des animaux (sans stress)",
        "Entretien des environnements de production et ambiances",
        "Nébulisation haute performance pour grands volumes",
      ],
    },
    product2: {
      name: "BIOACTIVE",
      type: "Nettoyant Enzymatique — Surfaces",
      desc: "Nettoyant enzymatique concentré pour l'élimination des matières organiques sur les surfaces et équipements d'élevage. Étape préparatoire avant entretien des ambiances.",
      features: [
        "Dégradation enzymatique des graisses et protéines",
        "Préparation des surfaces avant entretien des environnements",
        "Biodégradable et sans résidu toxique",
      ],
    },
    image: "/images/sectors/ambiance-elevage.webp",
  },
  abattoir: {
    product1: {
      name: "OXYLIS HOCl",
      type: "Entretien — Environnements Réfrigérés",
      desc: "Entretien technique des environnements réfrigérés, salles de découpe et zones de conditionnement en abattoir. Nébulisation fine adaptée aux contraintes du froid.",
      features: [
        "Entretien des chambres froides et environnements réfrigérés",
        "Application sans interruption de la chaîne du froid",
        "Brumisation fine sans condensation sur les carcasses",
      ],
    },
    image: "/images/sectors/ambiance-abattoir.webp",
  },
  agroalimentaire: {
    product1: {
      name: "OXYLIS HOCl",
      type: "Entretien — Zones de Production",
      desc: "Entretien technique des zones de production agroalimentaire : salles blanches, zones de conditionnement, chambres de maturation fromagère.",
      features: [
        "Entretien des environnements de production sensibles",
        "Maintenance des zones de conditionnement et de stockage",
        "Conformité aux exigences IFS/BRC pour la qualité des environnements",
      ],
    },
    image: "/images/sectors/ambiance-agroalimentaire.webp",
  },
};

// ════════════════════════════════════════════════════════════════════
// ARABIC (ar) — translations of the above (FR is the reference source)
// ════════════════════════════════════════════════════════════════════

// ─── ZONE 01 — المبنى ───────────────────────────────────────────────
const batimentSectorsAr: ZoneSectorMap = {
  elevage: {
    product1: {
      name: "CLORAGRO",
      type: "منظف تقني — المرحلة 01",
      desc: "قلوي مكلور فائق القوة مصمم لتفكيك المصفوفة العضوية للغشاء الحيوي وإزالة الدهون المستعصية في عنابر ومباني تربية الدواجن.",
      features: [
        "تفكيك الغشاء الحيوي العضوي على الأرضيات والجدران",
        "إزالة الدهون والبروتينات المستعصية في التربية",
        "تحضير مثالي للأسطح قبل معالجة العنبر",
      ],
    },
    product2: {
      name: "OPTIMAGRO",
      type: "معالجة — المرحلة 02",
      desc: "محلول معالجة الأسطح واسع الطيف — غلوتارالدهيد + أمونيوم رباعي — المرحلة 02. يُطبَّق إلزامياً بعد الشطف الكامل لبقايا الكلور.",
      features: [
        "طيف كامل لمعالجة الأسطح",
        "مفعول ممتد حتى 7 أيام بين الأفواج",
        "حماية قصوى للكتاكيت والوافدين الجدد",
      ],
    },
    image: "/images/sectors/batiment-elevage.webp",
  },
  abattoir: {
    product1: {
      name: "CLORAGRO",
      type: "تنظيف — أسطح المسلخ",
      desc: "تركيبة مكلورة عالية الأداء لتجريد وتنظيف أرضيات خط الذبح وألواح التقطيع ومناطق النزف في مسالخ الدواجن.",
      features: [
        "إزالة بقايا الدم والدهون الحيوانية",
        "تجريد الأرضيات المبلطة والأسطح الفولاذية",
        "مفعول سريع يتناسب مع وتيرة الإنتاج",
      ],
    },
    product2: {
      name: "OPTIMAGRO",
      type: "معالجة — ما بعد التنظيف في المسلخ",
      desc: "محلول معالجة الأسطح يُطبَّق بعد التنظيف بـ CLORAGRO لاستكمال بروتوكول النظافة في المناطق الحساسة بالمسلخ.",
      features: [
        "فعالية مثبتة على مناطق الذبح الحرجة",
        "مطابق لمعايير النظافة HACCP",
        "قابل للتطبيق على الأسطح الملامسة للأغذية بعد الشطف",
      ],
    },
    image: "/images/sectors/batiment-abattoir.webp",
  },
  agroalimentaire: {
    product1: {
      name: "CLORAGRO",
      type: "تنظيف — صناعة الألبان",
      desc: "منظف قلوي مكلور مُركَّب لتنظيف خزانات البسترة وخطوط التعبئة وأسطح الإنتاج في صناعة الألبان والصناعات الغذائية.",
      features: [
        "إذابة الرواسب البروتينية والدهنية من الحليب",
        "تنظيف الدوائر المغلقة (CIP)",
        "متوافق مع الأسطح الفولاذية والحشوات الغذائية",
      ],
    },
    product2: {
      name: "OPTIMAGRO",
      type: "معالجة — العمليات الغذائية",
      desc: "محلول معالجة معتمد لأسطح الإنتاج الغذائي. يستكمل بروتوكول النظافة بين دفعات الإنتاج.",
      features: [
        "معتمد للتلامس غير المباشر مع الأغذية",
        "مدمج في خطط HACCP للإنتاج",
        "فعالية مثبتة في وسط الألبان والصناعات الغذائية",
      ],
    },
    image: "/images/sectors/batiment-agroalimentaire.webp",
  },
};

// ─── ZONE 02 — المياه ───────────────────────────────────────────────
const eauSectorsAr: ZoneSectorMap = {
  elevage: {
    product1: {
      name: "BIONET",
      type: "تنظيف تقني — علاجي",
      desc: "تنظيف تقني لقنوات شرب الدواجن. تجريد الرواسب العضوية والغشاء الحيوي والترسبات الكلسية في خطوط الحلمات والمشارب.",
      features: [
        "إزالة جذرية للترسبات الكلسية والمعدنية",
        "إزالة انسداد الحلمات ودوائر الشرب",
        "مفعول صدمي فوري قبل إسكان الكتاكيت",
      ],
    },
    product2: {
      name: "OXYLIS HOCl",
      type: "صيانة — حفظ يومي",
      desc: "صيانة تشغيلية لدوائر المياه والبيئات التقنية في التربية. يندمج في بروتوكولات الصيانة اليومية للمنشآت.",
      features: [
        "صيانة مستمرة لشبكات المياه والمعدات",
        "توافق تام مع أنظمة الجرعات الآلية",
        "تبسيط البروتوكولات التشغيلية",
      ],
    },
    image: "/images/sectors/eau-elevage.webp",
  },
  abattoir: {
    product1: {
      name: "BIONET",
      type: "إزالة الترسبات — دوائر العمليات",
      desc: "تنظيف إنزيمي لدوائر المياه المستخدمة في خط الذبح: أحواض السمط، المبردات، محطات غسل الذبائح.",
      features: [
        "تجريد الرواسب البروتينية في أحواض السمط",
        "تنظيف دوائر التبريد بالهواء والماء",
        "إزالة الرواسب في الأنابيب",
      ],
    },
    product2: {
      name: "OXYLIS HOCl",
      type: "صيانة — مياه العمليات",
      desc: "صيانة مستمرة لدوائر المياه المستخدمة في عمليات الذبح. يندمج في الصيانة التشغيلية للشبكات والمعدات.",
      features: [
        "صيانة دوائر مياه العمليات",
        "الاندماج في بروتوكولات الصيانة اليومية",
        "جرعات آلية لتدفق إنتاج مستمر",
      ],
    },
    image: "/images/sectors/eau-abattoir.webp",
  },
  agroalimentaire: {
    product1: {
      name: "BIONET",
      type: "تنظيف CIP — مصنع ألبان",
      desc: "تنظيف إنزيمي لدوائر CIP في صناعة الألبان: الأنابيب، المبادلات الحرارية، خزانات البسترة.",
      features: [
        "إذابة رواسب حجر الحليب (الترسبات البروتينية)",
        "تنظيف المبادلات الحرارية وأجهزة البسترة",
        "الحفاظ على الحشوات والأغشية الغذائية",
      ],
    },
    product2: {
      name: "OXYLIS HOCl",
      type: "صيانة — مياه غذائية",
      desc: "صيانة دوائر مياه العمليات الغذائية. صيانة تشغيلية مستمرة لمياه الشطف والتبريد والإنتاج.",
      features: [
        "صيانة مستمرة لدوائر مياه العمليات",
        "الاندماج في بروتوكولات الصيانة الصناعية",
        "تتبع تحليلي لتدقيقات الجودة (IFS/BRC)",
      ],
    },
    image: "/images/sectors/eau-agroalimentaire.webp",
  },
};

// ─── ZONE 03 — الجو العام ───────────────────────────────────────────
const ambianceSectorsAr: ZoneSectorMap = {
  elevage: {
    product1: {
      name: "OXYLIS HOCl",
      type: "صيانة — البيئات التقنية",
      desc: "محلول تقني لصيانة بيئات الإنتاج في تربية الدواجن. يندمج في بروتوكولات صيانة أجواء العمل دون الإخلال بالفرشة.",
      features: [
        "استخدام متوافق بوجود الحيوانات (دون إجهاد)",
        "صيانة بيئات الإنتاج والأجواء",
        "تضبيب عالي الأداء للأحجام الكبيرة",
      ],
    },
    product2: {
      name: "BIOACTIVE",
      type: "منظف إنزيمي — أسطح",
      desc: "منظف إنزيمي مركّز لإزالة المواد العضوية من أسطح ومعدات التربية. خطوة تحضيرية قبل صيانة الأجواء.",
      features: [
        "تحلل إنزيمي للدهون والبروتينات",
        "تحضير الأسطح قبل صيانة البيئات",
        "قابل للتحلل الحيوي ودون رواسب سامة",
      ],
    },
    image: "/images/sectors/ambiance-elevage.webp",
  },
  abattoir: {
    product1: {
      name: "OXYLIS HOCl",
      type: "صيانة — البيئات المبردة",
      desc: "صيانة تقنية للبيئات المبردة وقاعات التقطيع ومناطق التعبئة في المسلخ. تضبيب دقيق يتلاءم مع قيود البرودة.",
      features: [
        "صيانة الغرف الباردة والبيئات المبردة",
        "تطبيق دون قطع سلسلة التبريد",
        "رذاذ دقيق دون تكثّف على الذبائح",
      ],
    },
    image: "/images/sectors/ambiance-abattoir.webp",
  },
  agroalimentaire: {
    product1: {
      name: "OXYLIS HOCl",
      type: "صيانة — مناطق الإنتاج",
      desc: "صيانة تقنية لمناطق الإنتاج الغذائي: الغرف النظيفة، مناطق التعبئة، غرف نضج الأجبان.",
      features: [
        "صيانة بيئات الإنتاج الحساسة",
        "صيانة مناطق التعبئة والتخزين",
        "التوافق مع متطلبات IFS/BRC لجودة البيئات",
      ],
    },
    image: "/images/sectors/ambiance-agroalimentaire.webp",
  },
};

// ─── Locale getter ──────────────────────────────────────────────────
// English falls back to the French (default) dataset.
export function getSectorsData(locale: string): {
  batiment: ZoneSectorMap;
  eau: ZoneSectorMap;
  ambiance: ZoneSectorMap;
} {
  if (locale === "ar") {
    return { batiment: batimentSectorsAr, eau: eauSectorsAr, ambiance: ambianceSectorsAr };
  }
  return { batiment: batimentSectors, eau: eauSectors, ambiance: ambianceSectors };
}
