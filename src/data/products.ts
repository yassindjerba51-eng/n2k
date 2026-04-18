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
};

export const products: Product[] = [
  // ─── ZONE 01 — LE BÂTIMENT ───────────────────────────
  {
    slug: "cloragro",
    name: "CLORAGRO",
    zone: "01",
    zoneName: "Le Bâtiment",
    zoneLabel: "Zone 01",
    subtitle: "Désinfection industrielle haute performance pour surfaces et structures",
    problem:
      "Les bâtiments d'élevage sont exposés à une contamination microbienne persistante. Les méthodes classiques de nettoyage ne parviennent pas à éliminer les biofilms résistants incrustés dans les surfaces poreuses, entraînant des récurrences d'infection et des pertes économiques importantes.",
    solution:
      "CLORAGRO est un désinfectant de surface à base de chlore actif, formulé pour une action bactéricide, virucide et fongicide rapide. Sa formulation pénétrante détruit les biofilms en profondeur, garantissant une désinfection complète des sols, murs et équipements d'élevage.",
    applications: [
      "Bâtiments d'élevage avicole (poulaillers, couvoirs)",
      "Abattoirs et salles de découpe",
      "Surfaces de contact alimentaire",
      "Équipements de manutention et de stockage",
      "Véhicules de transport d'animaux vivants",
    ],
    specs: [
      { label: "Principe actif", value: "Hypochlorite de sodium stabilisé" },
      { label: "Concentration", value: "3,6% de chlore actif" },
      { label: "Spectre d'action", value: "Bactéricide, Virucide, Fongicide" },
      { label: "Temps de contact", value: "15 min à 20°C" },
      { label: "pH d'utilisation", value: "11 – 12,5" },
      { label: "Conditionnement", value: "Bidon 20L / 200L" },
      { label: "Norme", value: "EN 1276, EN 13697" },
      { label: "Durée de conservation", value: "12 mois" },
    ],
    color: "#0D7ED0",
    accentBg: "bg-[#0D7ED0]/10",
    accentText: "text-[#0D7ED0]",
  },
  {
    slug: "optimagro",
    name: "OPTIMAGRO",
    zone: "01",
    zoneName: "Le Bâtiment",
    zoneLabel: "Zone 01",
    subtitle: "Hygiène structurelle et maintenance préventive des bâtiments industriels",
    problem:
      "L'accumulation de matières organiques, de poussières et de résidus calcaires dans les structures réduit l'efficacité des désinfectants appliqués par la suite. Sans un nettoyage mécano-chimique adapté, la désinfection reste superficielle et inefficace.",
    solution:
      "OPTIMAGRO est un détergent alcalin surpuissant conçu pour le décapage et le nettoyage en profondeur des bâtiments d'élevage. Sa formule moussante à haut pouvoir dégraissant élimine les souillures organiques tenaces, préparant les surfaces à une désinfection optimale.",
    applications: [
      "Nettoyage de fond entre bandes d'élevage (vide sanitaire)",
      "Décapage des sols bétonnés et caillebotis",
      "Nettoyage des systèmes de ventilation et extracteurs",
      "Entretien des silos d'alimentation",
      "Préparation des surfaces avant désinfection",
    ],
    specs: [
      { label: "Nature", value: "Détergent alcalin moussant" },
      { label: "pH concentré", value: "13,5" },
      { label: "Dosage recommandé", value: "2 à 5% selon encrassement" },
      { label: "Température d'action", value: "10°C à 60°C" },
      { label: "Temps de contact", value: "20 à 30 min" },
      { label: "Conditionnement", value: "Bidon 20L / 200L" },
      { label: "Compatibilité", value: "Acier, béton, PVC, polyester" },
      { label: "Rinçage", value: "Obligatoire haute pression" },
    ],
    color: "#0D7ED0",
    accentBg: "bg-[#0D7ED0]/10",
    accentText: "text-[#0D7ED0]",
  },

  // ─── ZONE 02 — CANALISATION D'EAU ────────────────────
  {
    slug: "bionet",
    name: "BIONET",
    zone: "02",
    zoneName: "Canalisation d'Eau",
    zoneLabel: "Zone 02",
    subtitle: "Nettoyage technique et détartrage biologique des canalisations",
    problem:
      "Les canalisations d'eau des élevages accumulent des dépôts de biofilm, de tartre et de résidus médicamenteux. Ces formations réduisent le débit, contaminent l'eau de boisson et constituent un réservoir permanent de bactéries pathogènes pour le cheptel.",
    solution:
      "BIONET est un nettoyant enzymatique spécifiquement formulé pour le traitement des circuits d'eau. Ses enzymes ciblées dégradent les biofilms, dissolvent les dépôts organiques et restaurent la propreté intérieure des canalisations sans attaquer les matériaux.",
    applications: [
      "Circuits d'abreuvement avicole (pipettes, nipples)",
      "Canalisations PVC et polyéthylène",
      "Réservoirs et tanks de stockage d'eau",
      "Systèmes de médication en ligne",
      "Refroidisseurs et échangeurs thermiques",
    ],
    specs: [
      { label: "Nature", value: "Nettoyant enzymatique acide" },
      { label: "pH concentré", value: "2,5 – 3,0" },
      { label: "Dosage", value: "0,5 à 2% en circulation" },
      { label: "Température", value: "15°C à 45°C" },
      { label: "Temps de contact", value: "2 à 6 heures en circulation" },
      { label: "Conditionnement", value: "Bidon 5L / 20L" },
      { label: "Compatibilité", value: "PVC, PE, inox, laiton" },
      { label: "Biodégradabilité", value: "> 90% à 28 jours" },
    ],
    color: "#0D9488",
    accentBg: "bg-teal-600/10",
    accentText: "text-teal-600",
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
    subtitle: "Contrôle des odeurs et traitement biologique actif de l'environnement",
    problem:
      "Les émanations d'ammoniac, de sulfure d'hydrogène et d'autres composés organiques volatils créent un environnement nauséabond et toxique. Ces nuisances olfactives impactent les performances animales, le confort des opérateurs et les relations avec le voisinage.",
    solution:
      "BIOACTIVE est un complexe bioactif à base de micro-organismes bénéfiques et d'extraits enzymatiques. Il agit par biocompétition : les bactéries bénéfiques colonisent les surfaces et dégradent les composés responsables des mauvaises odeurs à la source.",
    applications: [
      "Traitement des litières en bâtiment d'élevage",
      "Fosses à lisier et stations de compostage",
      "Contrôle des odeurs dans les abattoirs",
      "Traitement biologique des effluents",
      "Gestion des nuisances olfactives de voisinage",
    ],
    specs: [
      { label: "Nature", value: "Complexe enzymo-bactérien" },
      { label: "Concentration", value: "> 10⁹ UFC/mL" },
      { label: "Dosage litière", value: "50 à 100 mL/m²" },
      { label: "Fréquence", value: "1 application/semaine" },
      { label: "Température d'action", value: "5°C à 50°C" },
      { label: "Conditionnement", value: "Bidon 5L / 20L" },
      { label: "Biodégradabilité", value: "100% naturel" },
      { label: "Certification", value: "Utilisable en agriculture biologique" },
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

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByZone(zone: string): Product[] {
  if (zone === "all") return products;
  return products.filter((p) => p.zone === zone);
}
