export interface SectorProtocolStep {
  product: string;
  action: string;
  description: string;
}

export interface SectorData {
  id: string;
  slug: string;
  problems: { title: string; description: string; impact?: string; risk?: string; riskPercent?: string }[];
  economicRisks: { title: string; impact: string }[];
  minimalProtocol: SectorProtocolStep[];
  reinforcedProtocol: SectorProtocolStep[];
  specificCases: { title: string; description: string; protocol: string }[];
  associatedProducts: string[];
  expectedResults: string[];
}
