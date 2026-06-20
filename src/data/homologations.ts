// ─────────────────────────────────────────────────────────────────────
// Official regulatory authorizations for N2K's two strategic products.
// OPTIMAGRO and CLORAGRO are homologated by the Tunisian Ministry of Health
// and authorized by the Tunisian Ministry of Agriculture.
//
// IMPORTANT: these are official identifiers — do not invent or alter them.
// ─────────────────────────────────────────────────────────────────────

export type Homologation = {
  /** Official homologation number (Ministry of Health). */
  number: string;
};

// Keyed by product slug (see src/data/products.ts).
export const homologations: Record<string, Homologation> = {
  optimagro: { number: "MS/DHMPE/HOM/0001/03/01/2023" },
  cloragro: { number: "MS/DHMPE/HOM/0002/03/01/2023" },
};

/** Product names that carry an official homologation (upper-case, brand form). */
const HOMOLOGATED_NAMES = ["CLORAGRO", "OPTIMAGRO"];

/** Returns the homologation record for a product slug, or undefined. */
export function getHomologation(slug: string): Homologation | undefined {
  return homologations[slug];
}

/** True if the given product slug is officially homologated. */
export function isHomologatedSlug(slug: string): boolean {
  return slug in homologations;
}

/**
 * True if the given product display name (e.g. "CLORAGRO", "OPTIMAGRO")
 * corresponds to a homologated product. Tolerant of casing / extra wording.
 */
export function isHomologatedName(name: string | undefined | null): boolean {
  if (!name) return false;
  const upper = name.toUpperCase();
  return HOMOLOGATED_NAMES.some((n) => upper.includes(n));
}
