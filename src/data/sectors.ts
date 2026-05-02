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
      type: "Détergent Désinfectant — Phase 01",
      desc: "Alcalin chloré ultra-puissant conçu pour déstructurer la matrice organique du biofilm et éliminer les graisses persistantes dans les poulaillers et bâtiments d'élevage avicole.",
      features: [
        "Destruction radicale du biofilm organique sur sols et parois",
        "Élimination des graisses et protéines persistantes en élevage",
        "Préparation de surface optimale avant désinfection du poulailler",
      ],
    },
    product2: {
      name: "OPTIMAGRO",
      type: "Désinfectant — Spectre Complet",
      desc: "Désinfectant biocide à spectre complet — Glutaraldéhyde + Ammoniums Quaternaires — Phase 02. S'applique obligatoirement après rinçage complet des résidus chlorés.",
      features: [
        "Spectre complet : Bactéricide, Virucide, Fongicide",
        "Rémanence prolongée jusqu'à 7 jours entre bandes",
        "Protection maximale des poussins et nouveaux arrivants",
      ],
    },
    image: "/images/sectors/batiment-elevage.webp",
  },
  abattoir: {
    product1: {
      name: "CLORAGRO",
      type: "Décontamination — Surfaces Abattoir",
      desc: "Formulation chlorée haute performance pour le décapage et la décontamination des sols de chaîne d'abattage, tables de découpe et zones de saignée en abattoir de volaille.",
      features: [
        "Élimination des résidus sanguins et graisses animales",
        "Décapage des sols carrelés et surfaces inox",
        "Action rapide adaptée aux cadences de production",
      ],
    },
    product2: {
      name: "OPTIMAGRO",
      type: "Désinfection — Post-Nettoyage Abattoir",
      desc: "Désinfectant de surface appliqué après le nettoyage CLORAGRO pour éliminer les pathogènes résiduels (Salmonella, Campylobacter) dans les zones sensibles de l'abattoir.",
      features: [
        "Efficacité prouvée contre Salmonella et Campylobacter",
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
      type: "Désinfection — Process Agroalimentaire",
      desc: "Désinfectant certifié pour les surfaces de production agroalimentaire. Garantit l'élimination des contaminations croisées entre lots de production.",
      features: [
        "Certifié pour contact alimentaire indirect",
        "Intégration dans les plans HACCP de production",
        "Contrôle de Listeria monocytogenes en milieu laitier",
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
      name: "AQUACONTROL",
      type: "Stabilisation — Maintien Quotidien",
      desc: "Stabilisation de la qualité de l'eau de boisson en élevage. Contrôle constant de la charge microbienne du réservoir jusqu'au dernier abreuvoir.",
      features: [
        "Stabilisation bactériologique de l'eau de boisson",
        "Réduction drastique du risque de contamination croisée",
        "Compatibilité totale avec les systèmes de dosage automatique",
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
        "Élimination des résidus médicamenteux dans les conduites",
      ],
    },
    product2: {
      name: "AQUACONTROL",
      type: "Traitement — Eau de Process",
      desc: "Traitement en continu de l'eau utilisée dans les process d'abattage. Garantit une eau conforme aux normes sanitaires pour le lavage des carcasses.",
      features: [
        "Conformité eau potable pour lavage des carcasses",
        "Contrôle de Pseudomonas et coliformes en circuit fermé",
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
      name: "AQUACONTROL",
      type: "Purification — Eau Agroalimentaire",
      desc: "Traitement de l'eau de process agroalimentaire. Contrôle microbiologique continu pour les eaux de rinçage, de refroidissement et de production.",
      features: [
        "Potabilisation continue des eaux de process",
        "Prévention de la Legionella dans les tours de refroidissement",
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
      name: "AIRSAN",
      type: "Nébulisation — Élevage Avicole",
      desc: "Solution fine en suspension pour neutraliser les pathogènes aériens dans les poulaillers sans mouiller les litières, utilisable en présence d'animaux.",
      features: [
        "Utilisation en présence des animaux (sans stress)",
        "Réduction de l'ammoniac et des poussières en suspension",
        "Nébulisation haute performance pour grands volumes",
      ],
    },
    product2: {
      name: "BIOACTIVE",
      type: "Nettoyant Enzymatique — Surfaces",
      desc: "Nettoyant enzymatique concentré pour l'élimination des matières organiques sur les surfaces et équipements d'élevage avant désinfection aérienne.",
      features: [
        "Dégradation enzymatique des graisses et protéines",
        "Préparation des surfaces avant nébulisation AIRSAN",
        "Biodégradable et sans résidu toxique",
      ],
    },
    image: "/images/sectors/ambiance-elevage.webp",
  },
  abattoir: {
    product1: {
      name: "AIRSAN",
      type: "Traitement Aérien — Chambres Froides",
      desc: "Désinfection atmosphérique des chambres froides, salles de découpe et zones de conditionnement en abattoir. Contrôle des moisissures et germes aérosolisés.",
      features: [
        "Contrôle des Listeria et moisissures en chambre froide",
        "Traitement sans interruption de la chaîne du froid",
        "Brumisation fine sans condensation sur les carcasses",
      ],
    },
    image: "/images/sectors/ambiance-abattoir.webp",
  },
  agroalimentaire: {
    product1: {
      name: "AIRSAN",
      type: "Assainissement — Salles Blanches",
      desc: "Désinfection atmosphérique des zones de production agroalimentaire : salles blanches, zones de conditionnement, chambres de maturation fromagère.",
      features: [
        "Contrôle de la charge microbienne en salle blanche",
        "Traitement de l'air dans les caves d'affinage",
        "Conformité aux exigences IFS/BRC pour la qualité de l'air",
      ],
    },
    image: "/images/sectors/ambiance-agroalimentaire.webp",
  },
};
