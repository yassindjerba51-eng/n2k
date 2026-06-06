/**
 * Sector-specific question definitions for the diagnostic form.
 * Each sector has a set of questions that are rendered dynamically
 * after the user selects their sector.
 */

export type QuestionType = "select" | "radio" | "checkbox";

export interface SectorQuestion {
  id: string;
  label: string;
  type: QuestionType;
  options: string[];
  required?: boolean;
}

export interface SectorConfig {
  key: string;
  label: string;
  title: string;
  questions: SectorQuestion[];
}

// ─────────────────────────────────────────────
// Request type options (common to all sectors)
// ─────────────────────────────────────────────
export const REQUEST_TYPES = [
  "Diagnostic terrain",
  "Protocole sur mesure",
  "Devis produits",
  "Conseil technique",
];

// ─────────────────────────────────────────────
// Problem duration options (common to all sectors)
// ─────────────────────────────────────────────
const DURATIONS = [
  "Moins de 1 mois",
  "1 à 6 mois",
  "Plus de 6 mois",
  "Plus d'un an",
];

// ─────────────────────────────────────────────
// ÉLEVAGE
// ─────────────────────────────────────────────
const elevageConfig: SectorConfig = {
  key: "ELEVAGE",
  label: "Élevage",
  title: "Demande de diagnostic élevage",
  questions: [
    {
      id: "typeElevage",
      label: "Type d'élevage",
      type: "select",
      options: ["Poulet de chair", "Pondeuse", "Reproducteur", "Dinde", "Autre"],
      required: true,
    },
    {
      id: "tailleElevage",
      label: "Taille de l'élevage",
      type: "select",
      options: [
        "Moins de 10 000 animaux",
        "10 000 à 30 000",
        "30 000 à 100 000",
        "Plus de 100 000",
      ],
      required: true,
    },
    {
      id: "zoneConcernee",
      label: "Zone concernée",
      type: "select",
      options: ["Eau de boisson", "Bâtiment", "Ambiance", "Litière", "Plusieurs zones"],
      required: true,
    },
    {
      id: "problemePrincipal",
      label: "Problème principal",
      type: "select",
      options: [
        "Biofilm",
        "Odeurs",
        "Humidité",
        "Consommation d'eau",
        "Performances techniques",
        "Pression sanitaire",
        "Autre",
      ],
      required: true,
    },
    {
      id: "ancienneteProbleme",
      label: "Depuis combien de temps le problème existe ?",
      type: "select",
      options: DURATIONS,
    },
  ],
};

// ─────────────────────────────────────────────
// ABATTOIR & DÉCOUPE
// ─────────────────────────────────────────────
const abattoirConfig: SectorConfig = {
  key: "ABATTOIR",
  label: "Abattoir & Découpe",
  title: "Demande de diagnostic abattoir et découpe",
  questions: [
    {
      id: "activite",
      label: "Activité",
      type: "select",
      options: ["Abattoir", "Découpe", "Abattoir et découpe"],
      required: true,
    },
    {
      id: "capaciteProduction",
      label: "Capacité de production",
      type: "select",
      options: [
        "Moins de 5 000 volailles/jour",
        "5 000 à 20 000",
        "20 000 à 50 000",
        "Plus de 50 000",
      ],
      required: true,
    },
    {
      id: "zoneConcernee",
      label: "Zone concernée",
      type: "select",
      options: [
        "Abattage",
        "Refroidissement",
        "Découpe",
        "Conditionnement",
        "Réseau d'eau",
        "Plusieurs zones",
      ],
      required: true,
    },
    {
      id: "problemePrincipal",
      label: "Problème principal",
      type: "select",
      options: [
        "Charge microbiologique",
        "Biofilm",
        "Odeurs",
        "Consommation chimique élevée",
        "Consommation d'eau élevée",
        "Difficulté de nettoyage",
        "Non-conformité analyses",
        "Autre",
      ],
      required: true,
    },
    {
      id: "ancienneteProbleme",
      label: "Depuis combien de temps le problème existe ?",
      type: "select",
      options: DURATIONS,
    },
  ],
};

// ─────────────────────────────────────────────
// INDUSTRIE AGROALIMENTAIRE
// ─────────────────────────────────────────────
const agroalimentaireConfig: SectorConfig = {
  key: "AGROALIMENTAIRE",
  label: "Industrie Agroalimentaire",
  title: "Demande de diagnostic industrie agroalimentaire",
  questions: [
    {
      id: "sousSecteur",
      label: "Secteur d'activité",
      type: "select",
      options: [
        "Industrie laitière",
        "Produits carnés",
        "Boissons",
        "Fruits et légumes",
        "Transformation alimentaire",
        "Autre",
      ],
      required: true,
    },
    {
      id: "tailleInstallation",
      label: "Taille de l'installation",
      type: "select",
      options: ["Petite unité", "Moyenne unité", "Grande unité"],
      required: true,
    },
    {
      id: "zoneConcernee",
      label: "Zone concernée",
      type: "select",
      options: [
        "Réseau d'eau",
        "Cuves et équipements",
        "Ligne de production",
        "Conditionnement",
        "Station de traitement",
        "Plusieurs zones",
      ],
      required: true,
    },
    {
      id: "problemePrincipal",
      label: "Problème principal",
      type: "select",
      options: [
        "Biofilm",
        "Charge microbiologique",
        "Odeurs",
        "Traitement des effluents",
        "Consommation chimique élevée",
        "Difficulté de nettoyage",
        "Non-conformité qualité",
        "Autre",
      ],
      required: true,
    },
    {
      id: "ancienneteProbleme",
      label: "Depuis combien de temps le problème existe ?",
      type: "select",
      options: DURATIONS,
    },
  ],
};

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

export const SECTOR_CONFIGS: Record<string, SectorConfig> = {
  ELEVAGE: elevageConfig,
  ABATTOIR: abattoirConfig,
  AGROALIMENTAIRE: agroalimentaireConfig,
};

export const SECTOR_OPTIONS = [
  { key: "ELEVAGE", label: "Élevage" },
  { key: "ABATTOIR", label: "Abattoir & Découpe" },
  { key: "AGROALIMENTAIRE", label: "Industrie Agroalimentaire" },
];

/**
 * Get the question configuration for a given sector key.
 */
export function getSectorConfig(sectorKey: string): SectorConfig | undefined {
  return SECTOR_CONFIGS[sectorKey];
}

/**
 * Build a structured email section from sector data.
 */
export function formatSectorDataForEmail(
  sectorKey: string,
  sectorData: Record<string, string>
): string {
  const config = SECTOR_CONFIGS[sectorKey];
  if (!config) return "";

  const lines: string[] = [`SECTEUR : ${config.label}`];

  for (const question of config.questions) {
    const value = sectorData[question.id];
    if (value) {
      lines.push(`${question.label.toUpperCase()} : ${value}`);
    }
  }

  return lines.join("\n");
}
