export type Product = {
  slug: string;
  name: string;
  zone: "01" | "02" | "03";
  additionalZones?: ("01" | "02" | "03")[];
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
  image?: string;
};

export const products: Product[] = [
  // ─── ZONE 01 — LE BÂTIMENT ───────────────────────────
  {
    slug: "cloragro",
    name: "CLORAGRO",
    zone: "01",
    zoneName: "Le Bâtiment",
    zoneLabel: "Zone 01",
    subtitle: "Détergent alcalin chloré moussant — Nettoyage technique des surfaces — Phase 01 du protocole N2K",
    problem:
      "Les bâtiments d'élevage accumulent des biofilms résistants, des graisses, des dépôts organiques et des résidus incrustés dans les surfaces poreuses. Ces souillures compromettent toute opération d'hygiène ultérieure si elles ne sont pas éliminées en premier lieu.",
    solution:
      "CLORAGRO moussant est le produit de la Phase 01 du protocole séquentiel N2K. Il assure le nettoyage technique des surfaces : déstructuration du biofilm, élimination des graisses et dépôts organiques, préparation des surfaces avant l'étape suivante. Principe actif : Hypochlorite de sodium (CAS 7681-52-9) + agents tensioactifs moussants + hydroxyde de sodium + inhibiteur de corrosion.",
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
    ],
    color: "#0D7ED0",
    accentBg: "bg-[#0D7ED0]/10",
    accentText: "text-[#0D7ED0]",
    warning: "Rinçage à l'eau potable obligatoire après application avant passage à la Phase 02 (OPTIMAGRO).",
    image: "/images/cloragro-produit.webp",
  },
  {
    slug: "optimagro",
    name: "OPTIMAGRO",
    zone: "01",
    zoneName: "Le Bâtiment",
    zoneLabel: "Zone 01",
    subtitle: "Solution technique de traitement des surfaces — Glutaraldéhyde et ammoniums quaternaires — Phase 02 du protocole N2K",
    problem:
      "Après nettoyage et rinçage complet des surfaces, une étape de traitement complémentaire est nécessaire pour compléter le protocole d'hygiène. Cette étape est distincte du nettoyage et ne peut s'effectuer sans rinçage préalable des résidus chlorés de la Phase 01.",
    solution:
      "OPTIMAGRO Super moussant est le produit de la Phase 02 du protocole séquentiel N2K. Il s'applique obligatoirement après rinçage complet à l'eau potable des surfaces traitées au CLORAGRO. Matières actives : Glutaraldéhyde (CAS 111-30-8) + Chlorure d'alkyl diméthyl benzyl ammonium (CAS 68424-85-1) + Chlorure de didécyl diméthyl ammonium (CAS 7173-51-5). INCOMPATIBLE avec les produits chlorés — ne jamais mélanger avec CLORAGRO.",
    applications: [
      "Traitement final après rinçage (bâtiments d'élevage avicole)",
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
    ],
    color: "#0D7ED0",
    accentBg: "bg-[#0D7ED0]/10",
    accentText: "text-[#0D7ED0]",
    warning: "INCOMPATIBLE avec les produits chlorés. Appliquer obligatoirement après rinçage complet à l'eau potable. Ne jamais mélanger avec CLORAGRO.",
    image: "/images/optimagro-produit.webp",
  },
  {
    slug: "alcosept-pro",
    name: "ALCOSEPT PRO",
    zone: "01",
    zoneName: "Le Bâtiment",
    zoneLabel: "Zone 01",
    subtitle: "Solution de nettoyage à évaporation rapide pour surfaces et équipements techniques en environnements agroalimentaires",
    problem:
      "Entre les opérations de production, les surfaces de travail, les équipements et les outils accumulent des résidus organiques. Le nettoyage complet par canon à mousse n'est pas toujours possible entre deux séries de production en raison des contraintes de temps et de cadence industrielle.",
    solution:
      "ALCOSEPT PRO est une solution de nettoyage technique à évaporation rapide, conçue pour un usage entre les opérations de production. Sa formulation permet un nettoyage efficace des surfaces de contact, des équipements inox et plastiques, sans laisser de résidus significatifs et sans nécessiter de rinçage prolongé. Son format d'application est adapté aux contraintes de cadence industrielle.",
    applications: [
      "Nettoyage rapide des surfaces de travail entre opérations",
      "Entretien des équipements inox et plastiques techniques",
      "Nettoyage des outils et petits matériels de production",
      "Zones de préparation et de conditionnement",
      "Abattoirs et environnements agroalimentaires",
    ],
    specs: [
      { label: "Nature", value: "Solution de nettoyage technique à évaporation rapide" },
      { label: "Application", value: "Pulvérisation directe ou application manuelle" },
      { label: "Compatibilité", value: "Inox, plastiques alimentaires, surfaces techniques" },
      { label: "Évaporation", value: "Rapide — peu de résidus" },
      { label: "Utilisation", value: "Entre opérations / nettoyage intermédiaire" },
      { label: "Conditionnement", value: "Flacon spray / Bidon 5L" },
    ],
    color: "#0D7ED0",
    accentBg: "bg-[#0D7ED0]/10",
    accentText: "text-[#0D7ED0]",
    image: "/images/alcosept-pro.webp",
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
      "Les circuits d'abreuvement accumulent des biofilms bactériens, algues, encrassements des pipettes et nipples, et dépôts calcaires organiques. Ces formations réduisent le débit et dégradent la qualité de l'eau de boisson.",
    solution:
      "BIONET est un nettoyant technique spécial aviculture pour les canalisations d'eau. Il élimine les biofilms, les algues et les dépôts calcaires organiques dans les circuits d'abreuvement. Principe actif : Hypochlorite de sodium (CAS 7681-52-9) + inhibiteur de corrosion spécial métaux. Ce produit est un nettoyant technique des canalisations.",
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
    image: "/images/bionet-produit.webp",
  },
  {
    slug: "oxylis-hoci",
    name: "OXYLIS HOCl",
    zone: "02",
    additionalZones: ["01", "03"],
    zoneName: "Bâtiment - Eau - Ambiance",
    zoneLabel: "Zone 01 - Zone 02 - Zone 03",
    subtitle: "Solution technique à base d'acide hypochloreux (HOCl) — Entretien des réseaux d'eau, traitement des environnements et maintien de la qualité sanitaire en élevage et industrie agroalimentaire",
    problem:
      "Les exploitations d'élevage et les unités de production agroalimentaire font face à un double défi : d'une part, les circuits d'eau et réseaux d'abreuvement accumulent biofilms, algues et dépôts organiques qui dégradent la qualité de l'eau distribuée aux animaux ; d'autre part, les environnements de production (ambiances, chambres froides, salles de découpe) nécessitent un entretien continu pour maintenir des conditions sanitaires optimales. Gérer ces deux problématiques avec des produits séparés complexifie les protocoles, multiplie les stocks et augmente les risques d'erreur sur le terrain.",
    solution:
      "OXYLIS HOCl est une solution technique polyvalente à base d'acide hypochloreux (HOCl) qui unifie l'entretien des circuits d'eau et le traitement des environnements de production en un seul produit. Pour les réseaux d'eau, elle assure l'entretien continu des canalisations d'abreuvement, le maintien de la qualité de l'eau distribuée et la prévention de la formation de biofilms dans les circuits. Pour les environnements, elle permet la nébulisation des ambiances de production, l'entretien des chambres froides et des salles de conditionnement, et le maintien d'une pression sanitaire maîtrisée — y compris en présence des animaux. Sa compatibilité avec les systèmes de dosage automatique et les équipements de nébulisation haute performance en fait une solution opérationnelle adaptée aux cadences industrielles.",
    applications: [
      "Entretien continu des circuits d'eau et réseaux d'abreuvement avicole",
      "Maintien de la qualité de l'eau de boisson distribuée aux animaux",
      "Nébulisation des ambiances de production en élevage (compatible en présence des animaux)",
      "Entretien des chambres froides, salles de découpe et zones de conditionnement",
      "Traitement des environnements réfrigérés en abattoir (brumisation fine sans condensation)",
      "Entretien des eaux de process en industrie agroalimentaire (rinçage, refroidissement, production)",
      "Intégration dans les protocoles HACCP et plans d'hygiène opérationnelle",
      "Dosage automatisé pour flux de production continu",
    ],
    specs: [
      { label: "Principe actif", value: "Acide hypochloreux (HOCl)" },
      { label: "Nature", value: "Solution technique polyvalente — eau et environnements" },
      { label: "pH", value: "5,5 – 6,5 (légèrement acide)" },
      { label: "Mode d'application", value: "Dosage en ligne / nébulisation / brumisation / pulvérisation" },
      { label: "Domaines d'action", value: "Circuits d'eau, environnements de production, ambiances" },
      { label: "Compatibilité", value: "Systèmes de dosage automatique, nébuliseurs, canalisations PVC/PEHD, inox" },
      { label: "Utilisation", value: "Continue ou ponctuelle selon protocole — compatible présence animale" },
      { label: "Traçabilité", value: "Mesure analytique en temps réel — conformité audits IFS/BRC" },
      { label: "Conditionnement", value: "Bidon 5L / 20L / 200L / IBC 1000L" },
    ],
    color: "#0D9488",
    accentBg: "bg-teal-600/10",
    accentText: "text-teal-600",
    image: "/images/oxylis-hoci.webp",
  },

  // ─── ZONE 03 — L'AMBIANCE ────────────────────────────
  {
    slug: "bioactive",
    name: "BIOACTIVE",
    zone: "03",
    zoneName: "L'Ambiance",
    zoneLabel: "Zone 03",
    subtitle: "Solution enzymatique d'entretien biologique des surfaces et de l'ambiance pour élevage avicole",
    problem:
      "L'accumulation de poussières organiques, de résidus de litière et de composés ammoniacaux dégrade continuellement l'ambiance et la qualité de l'air des bâtiments d'élevage, créant un inconfort pour les animaux.",
    solution:
      "BIOACTIVE est une solution enzymatique d'entretien biologique spécialement conçue pour l'élevage avicole. Grâce à son complexe enzymatique ciblé, il assure la réduction progressive des accumulations organiques sur les surfaces et l'amélioration de l'ambiance globale du bâtiment. Son action participe à l'établissement d'une stabilité environnementale durable pendant la production.",
    applications: [
      "Entretien biologique environnemental des bâtiments avicoles",
      "Amélioration et stabilisation de l'ambiance des bâtiments d'élevage",
      "Réduction progressive des accumulations organiques (surfaces et structures)",
      "Entretien biologique des surfaces pendant la production avicole",
      "Restauration de la stabilité environnementale en présence des animaux",
    ],
    specs: [
      { label: "Nature", value: "Solution enzymatique d'entretien biologique" },
      { label: "Composition", value: "Complexe d'enzymes spécifiques biodégradables (protéases, amylases, lipases)" },
      { label: "Domaine", value: "Élevage avicole uniquement (ambiance et surfaces)" },
      { label: "Aspect", value: "Liquide soluble" },
      { label: "Application", value: "Pulvérisation de sécurité en ambiance et sur surfaces" },
      { label: "Fréquence", value: "Entretien régulier pendant le cycle de production" },
      { label: "Conditionnement", value: "5 L / 20 L" },
    ],
    color: "#EA580C",
    accentBg: "bg-orange-600/10",
    accentText: "text-orange-600",
    image: "/images/bioactive-produit.webp",
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
    cloragro: "Foaming alkaline chlorinated detergent — Technical cleaning of surfaces — Phase 01 of the N2K protocol",
    optimagro: "Surface treatment solution — Glutaraldehyde + Quaternary Ammonium — Phase 02 of the N2K protocol",
    bionet: "Alkaline Chlorinated Antibiofilm Detergent — Poultry drinking circuit cleaning — Poultry farming only",
    "oxylis-hoci": "HOCl-based technical solution — Water network maintenance, environment treatment and sanitary quality in farming and food industry",
    "alcosept-pro": "Fast-evaporation cleaning solution for surfaces and technical equipment in food processing environments",
    bioactive: "Enzymatic solution for biological maintenance of surfaces and atmosphere — Poultry farming only",
  },
  ar: {
    cloragro: "منظف قلوي كلوري رغوي — تنظيف تقني للأسطح — المرحلة 01 من بروتوكول N2K",
    optimagro: "محلول معالجة الأسطح — غلوتارالدهيد + أمونيوم رباعي — المرحلة 02 من بروتوكول N2K",
    bionet: "منظف قلوي كلوري مضاد للبيوفيلم — تنظيف دوائر الشرب في تربية الدواجن — للدواجن فقط",
    "oxylis-hoci": "محلول تقني قائم على حمض الهيبوكلوروز (HOCl) — صيانة شبكات المياه ومعالجة بيئات الإنتاج والحفاظ على الجودة الصحية في التربية والصناعة الغذائية",
    "alcosept-pro": "محلول تنظيف سريع التبخر للأسطح والمعدات التقنية في البيئات الغذائية",
    bioactive: "محلول إنزيمي للعناية البيولوجية بالأسطح والجو الداخلي — لتربية الدواجن فقط",
  },
  fr: {
    cloragro: "Détergent alcalin chloré moussant — Nettoyage technique des surfaces — Phase 01 du protocole N2K",
    optimagro: "Solution de traitement des surfaces — Glutaraldéhyde + Ammoniums Quaternaires — Phase 02 du protocole N2K",
    bionet: "Détergent Alcalin Chloré Antibiofilm — Nettoyage des circuits d'abreuvement avicole — Élevage uniquement",
    "oxylis-hoci": "Solution technique à base de HOCl — Entretien des réseaux d'eau, traitement des environnements et maintien de la qualité sanitaire — Élevage et industrie agroalimentaire",
    "alcosept-pro": "Solution de nettoyage à évaporation rapide pour surfaces et équipements techniques — Agroalimentaire et abattoirs",
    bioactive: "Solution enzymatique d'entretien biologique des surfaces et de l'ambiance — Élevage avicole uniquement",
  },
};

// ─── Multilingual zoneName / zoneLabel overrides ──────
const zoneNameOverrides: Record<string, Record<string, string>> = {
  en: {
    "Le Bâtiment": "The Building",
    "Canalisation d'Eau": "Water Piping",
    "Bâtiment - Eau - Ambiance": "Building - Water - Atmosphere",
    "L'Ambiance": "The Atmosphere",
  },
  ar: {
    "Le Bâtiment": "المبنى",
    "Canalisation d'Eau": "شبكة المياه",
    "Bâtiment - Eau - Ambiance": "المبنى - المياه - الجو العام",
    "L'Ambiance": "الجو العام",
  },
};

const zoneLabelOverrides: Record<string, Record<string, string>> = {
  ar: {
    "Zone 01": "المنطقة 01",
    "Zone 02": "المنطقة 02",
    "Zone 03": "المنطقة 03",
    "Zone 01 - Zone 02 - Zone 03": "المنطقة 01 - المنطقة 02 - المنطقة 03",
  },
};

// Apply all locale overrides (subtitle, zoneName, zoneLabel) to a product.
export function localizeProduct(product: Product, locale: string): Product {
  const p = { ...product };
  const sub = subtitleOverrides[locale];
  if (sub && sub[p.slug]) p.subtitle = sub[p.slug];
  const zn = zoneNameOverrides[locale];
  if (zn && zn[p.zoneName]) p.zoneName = zn[p.zoneName];
  const zl = zoneLabelOverrides[locale];
  if (zl && zl[p.zoneLabel]) p.zoneLabel = zl[p.zoneLabel];
  return p;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getLocalizedProduct(slug: string, locale: string): Product | undefined {
  const product = getProductBySlug(slug);
  if (!product) return undefined;
  return localizeProduct(product, locale);
}

export function getProductsByZone(zone: string): Product[] {
  if (zone === "all") return products;
  return products.filter((p) => p.zone === zone || (p.additionalZones && p.additionalZones.includes(zone as "01" | "02" | "03")));
}

export function getLocalizedProductsByZone(zone: string, locale: string): Product[] {
  return getProductsByZone(zone).map((p) => localizeProduct(p, locale));
}

export function getLocalizedProducts(locale: string): Product[] {
  return products.map((p) => localizeProduct(p, locale));
}
