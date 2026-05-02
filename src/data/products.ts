export type Product = {
  slug: string;
  name: string;
  zone: "01" | "02" | "03";
  zoneName: string;
  zoneLabel: string;
  subtitle: string;
  problem: string;
  solution: string;
  applications: string[];
  specs: { label: string; value: string }[];
  color: string;
  accentBg: string;
  accentText: string;
  warning?: string;
};

export const products: Product[] = [
  // ─── ZONE 01 — LE BÂTIMENT ───────────────────────────
  {
    slug: "cloragro",
    name: "CLORAGRO",
    zone: "01",
    zoneName: "Le Bâtiment",
    zoneLabel: "Zone 01",
    subtitle: "Détergent Désinfectant Alcalin Chloré moussant avec inhibiteur de corrosion — Phase 01 du protocole N2K",
    problem:
      "Les bâtiments d'élevage accumulent des biofilms résistants, des graisses, des dépôts organiques et des résidus incrustés dans les surfaces poreuses. Ces souillures compromettent toute désinfection ultérieure si elles ne sont pas éliminées en premier lieu.",
    solution:
      "CLORAGRO moussant est le produit de la Phase 01 du protocole séquentiel N2K. Il assure le nettoyage technique des surfaces : destruction du biofilm, élimination des graisses et dépôts organiques, préparation des surfaces avant désinfection. Homologué MS/DHMPE/HOM/0002/03/01/2023. Principe actif : Hypochlorite de sodium (CAS 7681-52-9) + agents tensioactifs moussants + hydroxyde de sodium + inhibiteur de corrosion. Propriétés biocides certifiées EN 1276, EN 13697, EN 1650 : Bactéricide, Levuricide, Fongicide.",
    applications: [
      "Bâtiments d'élevage avicole (poulaillers, couvoirs)",
      "Abattoirs et salles de découpe",
      "Industries agroalimentaires et stations de conditionnement",
      "Serres et environnements agricoles",
      "Véhicules de transport d'animaux vivants",
    ],
    specs: [
      { label: "Principe actif", value: "Hypochlorite de sodium (CAS 7681-52-9) + inhibiteur de corrosion" },
      { label: "pH", value: "12,5 ± 0,2" },
      { label: "Densité", value: "1,186 ± 0,005" },
      { label: "Viscosité", value: "10 mPa.s à 20°C" },
      { label: "Concentration d'emploi", value: "2 à 4% v/v" },
      { label: "Aspect", value: "Liquide clair, incolore à jaune clair" },
      { label: "Normes", value: "EN 1276, EN 13697, EN 1650" },
      { label: "Application", value: "Appareil à mousse, haute pression, aspersion, manuel" },
      { label: "Rinçage", value: "Obligatoire à l'eau potable avant Phase 02" },
      { label: "Homologation", value: "MS/DHMPE/HOM/0002/03/01/2023" },
    ],
    color: "#0D7ED0",
    accentBg: "bg-[#0D7ED0]/10",
    accentText: "text-[#0D7ED0]",
    warning: "Rinçage à l'eau potable obligatoire après application avant passage à la Phase 02 (OPTIMAGRO).",
  },
  {
    slug: "optimagro",
    name: "OPTIMAGRO",
    zone: "01",
    zoneName: "Le Bâtiment",
    zoneLabel: "Zone 01",
    subtitle: "Désinfectant large spectre à base de Glutaraldéhyde et d'ammoniums quaternaires — Phase 02 du protocole N2K",
    problem:
      "Après nettoyage et rinçage complet des surfaces, une désinfection biocide à spectre complet est nécessaire pour éliminer les pathogènes résiduels. Cette étape est distincte du nettoyage et ne peut s'effectuer sans rinçage préalable des résidus chlorés de la Phase 01.",
    solution:
      "OPTIMAGRO Super moussant est le désinfectant biocide de la Phase 02 du protocole séquentiel N2K. Il s'applique obligatoirement après rinçage complet à l'eau potable des surfaces traitées au CLORAGRO. Matières actives : Glutaraldéhyde (CAS 111-30-8) + Chlorure d'alkyl diméthyl benzyl ammonium (CAS 68424-85-1) + Chlorure de didécyl diméthyl ammonium (CAS 7173-51-5). Classifié Biocide TP2, TP3, TP4. Bactéricide (EN 1276, EN 1656), Levuricide (EN 1657), Virucide (EN 14675), Fongicide. INCOMPATIBLE avec les produits chlorés — ne jamais mélanger avec CLORAGRO.",
    applications: [
      "Désinfection finale après rinçage (bâtiments d'élevage avicole)",
      "Abattoirs et industries agroalimentaires",
      "Pulvérisation, trempage, nébulisation, thermonébulisation",
      "Pédiluves et rotoluves",
      "Traitement choc à 2%",
    ],
    specs: [
      { label: "Matières actives", value: "Glutaraldéhyde + QAC (alkyl diméthyl benzyl + didécyl diméthyl)" },
      { label: "pH", value: "3 – 4" },
      { label: "Densité", value: "1,03 à 20°C" },
      { label: "Aspect", value: "Liquide clair transparent, odeur aldéhyde. Sans chlore." },
      { label: "Concentration agroalimentaire", value: "0,5 à 1,5% v/v" },
      { label: "Concentration élevage", value: "0,5 à 1% v/v" },
      { label: "Traitement choc", value: "2%" },
      { label: "Temps de contact", value: "5 à 30 minutes" },
      { label: "Aération bâtiment", value: "4h minimum avant réintroduction des animaux" },
      { label: "Classification biocide", value: "TP2, TP3, TP4" },
    ],
    color: "#0D7ED0",
    accentBg: "bg-[#0D7ED0]/10",
    accentText: "text-[#0D7ED0]",
    warning: "INCOMPATIBLE avec les produits chlorés. Appliquer obligatoirement après rinçage complet à l'eau potable. Ne jamais mélanger avec CLORAGRO.",
  },

  // ─── ZONE 02 — CANALISATION D'EAU ────────────────────
  {
    slug: "bionet",
    name: "BIONET",
    zone: "02",
    zoneName: "Canalisation d'Eau",
    zoneLabel: "Zone 02",
    subtitle: "Détergent Alcalin Chloré Antibiofilm Spécial Aviculture — Nettoyage des circuits d'abreuvement",
    problem:
      "Les circuits d'abreuvement accumulent des biofilms bactériens, algues, encrassements des pipettes et nipples, et dépôts calcaires organiques. Ces formations réduisent le débit et contaminent l'eau de boisson.",
    solution:
      "BIONET est un nettoyant technique spécial aviculture pour les canalisations d'eau. Il élimine les biofilms bactériens, les algues et les dépôts calcaires organiques dans les circuits d'abreuvement. Principe actif : Hypochlorite de sodium (CAS 7681-52-9) + inhibiteur de corrosion spécial métaux. Ce produit est un nettoyant technique des canalisations, non un désinfectant biocide systémique.",
    applications: [
      "Circuits d'abreuvement avicole (pipettes, nipples)",
      "Canalisations PVC et polyéthylène",
      "Réservoirs et tanks de stockage d'eau",
      "Systèmes de médication en ligne",
      "Traitement des dépôts calcaires et organiques",
    ],
    specs: [
      { label: "Principe actif", value: "Hypochlorite de sodium (CAS 7681-52-9) + inhibiteur de corrosion spécial métaux" },
      { label: "pH", value: "12,5 ± 0,2" },
      { label: "Densité", value: "1,186 ± 0,005" },
      { label: "Viscosité", value: "10 mPa.s à 20°C" },
      { label: "Aspect", value: "Liquide limpide, incolore à jaune pâle" },
      { label: "Dosage léger", value: "2% (encrassement léger)" },
      { label: "Dosage modéré", value: "2,5%" },
      { label: "Dosage sévère", value: "3%" },
      { label: "Temps de contact", value: "4 à 6 heures (biofilms anciens : 12 à 24h)" },
      { label: "Conditionnement", value: "Bidon de 24 kg" },
    ],
    color: "#0D9488",
    accentBg: "bg-teal-600/10",
    accentText: "text-teal-600",
    warning: "Rinçage critique obligatoire jusqu'à pH neutre avant remise en service. Contrôle de pH obligatoire.",
  },
  {
    slug: "aquacontrol",
    name: "AQUACONTROL",
    zone: "02",
    zoneName: "Canalisation d'Eau",
    zoneLabel: "Zone 02",
    subtitle: "Traitement et purification des systèmes d'eau potable",
    problem:
      "La qualité microbiologique de l'eau distribuée dans les élevages se dégrade entre le point de captage et les abreuvoirs. Les bactéries (E. coli, Pseudomonas, Legionella) prolifèrent dans les conduites, rendant l'eau impropre et augmentant la mortalité.",
    solution:
      "AQUACONTROL est une solution de traitement en continu de l'eau potable à base de dioxyde de chlore stabilisé. Il maintient une action résiduelle antimicrobienne tout au long du réseau, garantissant une eau saine du réservoir jusqu'au dernier abreuvoir.",
    applications: [
      "Potabilisation de l'eau d'élevage en continu",
      "Traitement choc des réseaux contaminés",
      "Désinfection des forages et puits",
      "Stations de traitement d'eau industrielles",
      "Contrôle de Legionella dans les circuits chauds",
    ],
    specs: [
      { label: "Principe actif", value: "Dioxyde de chlore stabilisé (ClO₂)" },
      { label: "Concentration", value: "0,75% ClO₂" },
      { label: "Dosage continu", value: "0,2 à 0,5 ppm" },
      { label: "Dosage choc", value: "2 à 5 ppm" },
      { label: "pH d'efficacité", value: "4 – 10 (large spectre)" },
      { label: "Conditionnement", value: "Bidon 5L / 20L / 200L" },
      { label: "Résiduel", value: "Action prolongée 72h" },
      { label: "Norme", value: "EN 901, EN 12671" },
    ],
    color: "#0D9488",
    accentBg: "bg-teal-600/10",
    accentText: "text-teal-600",
  },

  // ─── ZONE 03 — L'AMBIANCE ────────────────────────────
  {
    slug: "airsan",
    name: "AIRSAN",
    zone: "03",
    zoneName: "L'Ambiance",
    zoneLabel: "Zone 03",
    subtitle: "Traitement de l'air et désinfection atmosphérique en présence d'animaux",
    problem:
      "L'air ambiant des bâtiments d'élevage est chargé de poussières, d'ammoniac, de germes aérosolisés et de spores fongiques. Cette pollution atmosphérique provoque des pathologies respiratoires, réduit les performances zootechniques et dégrade le bien-être animal.",
    solution:
      "AIRSAN est un désinfectant atmosphérique utilisable en présence d'animaux. Diffusé par thermo-nébulisation ou brumisation, il neutralise les pathogènes aéroportés, réduit la charge en ammoniac et assainit l'environnement respiratoire du cheptel.",
    applications: [
      "Désinfection aérienne en élevage avicole (en présence d'animaux)",
      "Traitement de l'air dans les couvoirs",
      "Assainissement des chambres froides",
      "Nébulisation dans les salles de tri et d'emballage",
      "Contrôle de l'ammoniac en bâtiment clos",
    ],
    specs: [
      { label: "Nature", value: "Solution désinfectante à large spectre" },
      { label: "Mode d'application", value: "Thermo-nébulisation / brumisation" },
      { label: "Dosage", value: "1 à 3 mL/m³ selon volume" },
      { label: "Temps d'exposition", value: "30 min minimum" },
      { label: "Utilisation en présence", value: "Oui (animaux et opérateurs)" },
      { label: "Conditionnement", value: "Bidon 5L / 20L" },
      { label: "Effet résiduel", value: "Jusqu'à 48h" },
      { label: "Norme", value: "EN 1040, EN 1275" },
    ],
    color: "#EA580C",
    accentBg: "bg-orange-600/10",
    accentText: "text-orange-600",
  },
  {
    slug: "bioactive",
    name: "BIOACTIVE",
    zone: "03",
    zoneName: "L'Ambiance",
    zoneLabel: "Zone 03",
    subtitle: "Nettoyant enzymatique concentré pour l'élimination des matières organiques",
    problem:
      "L'accumulation de matières organiques (graisses, protéines, biofilms) sur les surfaces et équipements crée un terrain favorable à la prolifération bactérienne. Les nettoyants classiques échouent face aux encrassements tenaces, compromettant l'efficacité des désinfections ultérieures.",
    solution:
      "BIOACTIVE est un nettoyant enzymatique concentré à base d'un complexe de protéases, lipases et amylases. Les enzymes dégradent les matières organiques en éléments solubles, facilitant leur élimination par rinçage ou action mécanique. Il prépare les surfaces à une désinfection optimale.",
    applications: [
      "Bâtiments d'élevage (surfaces et équipements)",
      "Zones fortement encrassées (graisses, protéines)",
      "Nettoyage avant désinfection (étape préparatoire)",
      "Surfaces poreuses et difficiles d'accès",
      "Équipements professionnels en milieu agroalimentaire",
    ],
    specs: [
      { label: "Nature", value: "Nettoyant enzymatique concentré" },
      { label: "Composition", value: "Protéases, Lipases, Amylases + Tensioactifs" },
      { label: "Aspect", value: "Liquide" },
      { label: "Solubilité", value: "Totale dans l'eau" },
      { label: "Dosage standard", value: "1 à 3 % — contact 10-15 min" },
      { label: "Dosage fort", value: "5 à 10 % + action mécanique" },
      { label: "Application", value: "Pulvérisation, canon à mousse, trempage" },
      { label: "Conditionnement", value: "5 L / 20 L / 1000 L" },
    ],
    color: "#EA580C",
    accentBg: "bg-orange-600/10",
    accentText: "text-orange-600",
  },
];

export const zones = [
  { id: "all", label: "Tous les produits" },
  { id: "01", label: "Zone 01 — Le Bâtiment", color: "#0D7ED0" },
  { id: "02", label: "Zone 02 — Canalisation d'Eau", color: "#0D9488" },
  { id: "03", label: "Zone 03 — L'Ambiance", color: "#EA580C" },
] as const;

// ─── Multilingual zone labels ─────────────────────────
const zoneLabels: Record<string, { all: string; z01: string; z02: string; z03: string }> = {
  fr: { all: "Tous les produits", z01: "Zone 01 — Le Bâtiment", z02: "Zone 02 — Canalisation d'Eau", z03: "Zone 03 — L'Ambiance" },
  en: { all: "All products", z01: "Zone 01 — The Building", z02: "Zone 02 — Water Piping", z03: "Zone 03 — The Atmosphere" },
  ar: { all: "جميع المنتجات", z01: "المنطقة 01 — المبنى", z02: "المنطقة 02 — شبكة المياه", z03: "المنطقة 03 — الجو العام" },
};

export function getLocalizedZones(locale: string) {
  const labels = zoneLabels[locale] || zoneLabels.fr;
  return [
    { id: "all", label: labels.all },
    { id: "01", label: labels.z01, color: "#0D7ED0" },
    { id: "02", label: labels.z02, color: "#0D9488" },
    { id: "03", label: labels.z03, color: "#EA580C" },
  ];
}

// ─── Multilingual subtitle overrides ──────────────────
const subtitleOverrides: Record<string, Record<string, string>> = {
  en: {
    cloragro: "Foaming Alkaline Chlorinated Detergent Disinfectant with corrosion inhibitor — Phase 01 of the N2K protocol",
    optimagro: "Broad-spectrum biocidal disinfectant — Glutaraldehyde + Quaternary Ammonium — Phase 02 of the N2K protocol — Dosage 2%",
    bionet: "Alkaline Chlorinated Antibiofilm Detergent — Poultry drinking circuit cleaning",
    aquacontrol: "Bacteriological stabilizer for drinking water — Daily maintenance of microbiological quality",
    airsan: "Nebulization solution for airborne treatment — Safe for use in the presence of animals",
    bioactive: "Concentrated enzymatic cleaner — Degradation of organic matter on surfaces and equipment during sanitary void",
  },
  ar: {
    cloragro: "منظف مطهر قلوي كلوري رغوي مع مثبط للتآكل — المرحلة 01 من بروتوكول N2K",
    optimagro: "مطهر حيوي واسع الطيف — غلوتارالدهيد + أمونيوم رباعي — المرحلة 02 من بروتوكول N2K — الجرعة 2%",
    bionet: "منظف قلوي كلوري مضاد للبيوفيلم — تنظيف دوائر الشرب في تربية الدواجن",
    aquacontrol: "مثبت بكتيري لمياه الشرب — الحفاظ اليومي على الجودة الميكروبيولوجية",
    airsan: "محلول ضبابي لمعالجة الهواء — آمن للاستخدام في حضور الحيوانات",
    bioactive: "منظف إنزيمي مركز — تحليل المواد العضوية على الأسطح والمعدات خلال فترة الفراغ الصحي",
  },
  fr: {
    cloragro: "Détergent Désinfectant Alcalin Chloré moussant avec inhibiteur de corrosion — Phase 01 du protocole N2K",
    optimagro: "Désinfectant biocide large spectre — Glutaraldéhyde + Ammoniums Quaternaires — Phase 02 du protocole N2K — Dosage 2%",
    bionet: "Détergent Alcalin Chloré Antibiofilm — Nettoyage des circuits d'abreuvement avicole",
    aquacontrol: "Stabilisateur bactériologique de l'eau de boisson — Maintien quotidien de la qualité microbiologique",
    airsan: "Solution de nébulisation pour traitement aéroporté — Utilisable en présence des animaux",
    bioactive: "Nettoyant enzymatique concentré — Dégradation des matières organiques sur surfaces et équipements en vide sanitaire",
  },
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getLocalizedProduct(slug: string, locale: string): Product | undefined {
  const product = getProductBySlug(slug);
  if (!product) return undefined;
  const overrides = subtitleOverrides[locale];
  if (overrides && overrides[slug]) {
    return { ...product, subtitle: overrides[slug] };
  }
  return product;
}

export function getProductsByZone(zone: string): Product[] {
  if (zone === "all") return products;
  return products.filter((p) => p.zone === zone);
}

export function getLocalizedProducts(locale: string): Product[] {
  return products.map((p) => {
    const overrides = subtitleOverrides[locale];
    if (overrides && overrides[p.slug]) {
      return { ...p, subtitle: overrides[p.slug] };
    }
    return p;
  });
}
