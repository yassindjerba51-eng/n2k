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
