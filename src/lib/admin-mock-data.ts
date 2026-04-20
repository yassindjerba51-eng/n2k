// Mock data for the N2K admin dashboard
// Based on the Prisma schema: Lead, Product, BlogPost, Zone

export type LeadStatus = "NEW" | "CONTACTED" | "DONE";
export type Zone = "BATIMENT" | "EAU" | "AMBIANCE";

export interface MockLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  activityType: string;
  capacity: string;
  cycleInfo: string | null;
  problemType: string;
  message: string | null;
  status: LeadStatus;
  createdAt: string;
}

export interface MockProduct {
  id: string;
  slug: string;
  name: string;
  isDisinfectant: boolean;
  category: Zone;
  step: number;
  description: { fr: string; en: string; ar: string };
  dosage: string | null;
  imageUrl: string | null;
}

export interface MockBlogPost {
  id: number;
  slug: string;
  coverImage: string | null;
  tags: string;
  titleFr: string;
  titleEn: string;
  titleAr: string;
  contentFr: string;
  contentEn: string;
  contentAr: string;
  publishedAt: string;
}

export interface MockProtocol {
  id: string;
  zone: Zone;
  problem: { fr: string; en: string; ar: string };
  step1Label: { fr: string; en: string; ar: string };
  step2Label: { fr: string; en: string; ar: string };
  productSlugs: string[];
  isActive: boolean;
}

// ─── LEADS ────────────────────────────────────────────────────────────────────

const regions = ["Tunis", "Sfax", "Sousse", "Bizerte", "Nabeul", "Kairouan", "Monastir", "Gabès", "Médenine", "Béja"];
const activityTypes = ["Poulet de chair", "Poule pondeuse", "Dinde", "Bovin laitier", "Ovin", "Caprin"];
const capacities = ["< 5 000", "5 000 - 10 000", "10 000 - 50 000", "> 50 000"];
const problems = [
  "Mortalité élevée en début de cycle",
  "Biofilm persistant dans les canalisations",
  "Problèmes respiratoires récurrents",
  "Qualité de l'eau dégradée",
  "Ammoniac élevé dans le bâtiment",
  "Taux de conversion alimentaire faible",
  "Contamination croisée entre bandes",
  "Diarrhée néonatale fréquente",
];

export const mockLeads: MockLead[] = [
  {
    id: "lead_001",
    name: "Ferme Bouzid",
    email: "bouzid@ferme.tn",
    phone: "+216 71 234 567",
    region: "Sfax",
    activityType: "Poulet de chair",
    capacity: "10 000 - 50 000",
    cycleInfo: "Cycle 3 - Jour 18",
    problemType: "BATIMENT",
    message: "Nous constatons une mortalité de 8% depuis le début du cycle. Le vide sanitaire a été réalisé sans protocole de désinfection structuré. Besoin d'un diagnostic terrain urgent.",
    status: "NEW",
    createdAt: "2026-04-01T14:30:00Z",
  },
  {
    id: "lead_002",
    name: "Élevage El Amri",
    email: "elamri@elevage.tn",
    phone: "+216 73 456 789",
    region: "Sousse",
    activityType: "Poule pondeuse",
    capacity: "> 50 000",
    cycleInfo: null,
    problemType: "EAU",
    message: "Contamination bactérienne récurrente dans l'eau d'abreuvement. Les analyses montrent un taux de coliformes au-dessus des normes.",
    status: "CONTACTED",
    createdAt: "2026-03-30T09:15:00Z",
  },
  {
    id: "lead_003",
    name: "SARL Agri-Sud",
    email: "contact@agrisud.tn",
    phone: "+216 75 678 901",
    region: "Gabès",
    activityType: "Dinde",
    capacity: "5 000 - 10 000",
    cycleInfo: "Vide sanitaire",
    problemType: "AMBIANCE",
    message: "Taux d'ammoniac excessif malgré une ventilation mécanique. Les oiseaux présentent des lésions oculaires.",
    status: "DONE",
    createdAt: "2026-03-28T16:45:00Z",
  },
  {
    id: "lead_004",
    name: "Ferme Jebali",
    email: "jebali.ferme@gmail.com",
    phone: "+216 72 111 222",
    region: "Nabeul",
    activityType: "Poulet de chair",
    capacity: "5 000 - 10 000",
    cycleInfo: "Cycle 1 - Jour 5",
    problemType: "BATIMENT",
    message: "Premier cycle dans un nouveau bâtiment. Nous voulons mettre en place un protocole de biosécurité complet dès le départ.",
    status: "NEW",
    createdAt: "2026-04-01T08:00:00Z",
  },
  {
    id: "lead_005",
    name: "Complexe Avicole Mejri",
    email: "mejri@complex-avicole.tn",
    phone: "+216 74 333 444",
    region: "Kairouan",
    activityType: "Poulet de chair",
    capacity: "> 50 000",
    cycleInfo: "Cycle 7 - Jour 32",
    problemType: "EAU",
    message: "Dépôts de biofilm visibles dans les pipettes. Chute de consommation d'eau de 15%.",
    status: "CONTACTED",
    createdAt: "2026-03-29T11:20:00Z",
  },
  {
    id: "lead_006",
    name: "GDA El Ksour",
    email: "gda.ksour@outlook.com",
    phone: "+216 78 555 666",
    region: "Béja",
    activityType: "Bovin laitier",
    capacity: "< 5 000",
    cycleInfo: null,
    problemType: "BATIMENT",
    message: "Problème de mouches et nuisibles dans l'étable. Cherchons une solution de désinfection compatible avec la production laitière.",
    status: "NEW",
    createdAt: "2026-03-31T15:10:00Z",
  },
  {
    id: "lead_007",
    name: "Ferme Trabelsi",
    email: "trabelsi.agri@gmail.com",
    phone: "+216 71 777 888",
    region: "Tunis",
    activityType: "Poule pondeuse",
    capacity: "10 000 - 50 000",
    cycleInfo: "Production",
    problemType: "AMBIANCE",
    message: "Baisse de ponte de 12% corrélée à des pics d'ammoniac supérieurs à 25 ppm.",
    status: "DONE",
    createdAt: "2026-03-25T10:00:00Z",
  },
  {
    id: "lead_008",
    name: "Société Dhaouadi",
    email: "dhaouadi@societe.tn",
    phone: "+216 73 999 000",
    region: "Monastir",
    activityType: "Dinde",
    capacity: "10 000 - 50 000",
    cycleInfo: "Cycle 2 - Jour 45",
    problemType: "BATIMENT",
    message: "Persistance de Salmonella malgré les protocoles de nettoyage classiques. Besoin d'une approche scientifique.",
    status: "NEW",
    createdAt: "2026-04-02T07:30:00Z",
  },
  {
    id: "lead_009",
    name: "Coopérative Sahel Vert",
    email: "sahelvert@coop.tn",
    phone: "+216 73 222 333",
    region: "Sousse",
    activityType: "Poulet de chair",
    capacity: "5 000 - 10 000",
    cycleInfo: "Vide sanitaire",
    problemType: "EAU",
    message: "Eau du forage avec un pH de 8.5 et conductivité élevée. Cherchons un traitement adapté.",
    status: "CONTACTED",
    createdAt: "2026-03-27T13:00:00Z",
  },
  {
    id: "lead_010",
    name: "Élevage Ben Salah",
    email: "bensalah@elevage.tn",
    phone: "+216 76 444 555",
    region: "Bizerte",
    activityType: "Ovin",
    capacity: "< 5 000",
    cycleInfo: null,
    problemType: "AMBIANCE",
    message: "Odeurs persistantes dans la bergerie malgré un curage régulier. Impact sur le bien-être animal.",
    status: "DONE",
    createdAt: "2026-03-22T09:45:00Z",
  },
  {
    id: "lead_011",
    name: "Agritech Bizerte",
    email: "info@agritech-biz.tn",
    phone: "+216 72 666 777",
    region: "Bizerte",
    activityType: "Poulet de chair",
    capacity: "> 50 000",
    cycleInfo: "Cycle 12 - Jour 3",
    problemType: "BATIMENT",
    message: "Mise en place d'un protocole de biosécurité pour 4 bâtiments de 15 000 sujets chacun.",
    status: "NEW",
    createdAt: "2026-04-01T17:00:00Z",
  },
  {
    id: "lead_012",
    name: "Ferme Mhamdi",
    email: "mhamdi@ferme.tn",
    phone: "+216 77 888 999",
    region: "Médenine",
    activityType: "Caprin",
    capacity: "< 5 000",
    cycleInfo: null,
    problemType: "EAU",
    message: "Qualité microbiologique de l'eau de boisson non conforme. Les chèvres refusent de boire.",
    status: "NEW",
    createdAt: "2026-03-31T11:30:00Z",
  },
  {
    id: "lead_013",
    name: "Avipro Tunisie",
    email: "commercial@avipro.tn",
    phone: "+216 71 101 202",
    region: "Tunis",
    activityType: "Poulet de chair",
    capacity: "> 50 000",
    cycleInfo: "Multi-sites",
    problemType: "BATIMENT",
    message: "Recherchons un partenariat pour le déploiement d'un programme de biosécurité sur 12 sites.",
    status: "CONTACTED",
    createdAt: "2026-03-26T14:00:00Z",
  },
  {
    id: "lead_014",
    name: "Société Guerfala",
    email: "guerfala@agri.tn",
    phone: "+216 74 303 404",
    region: "Sfax",
    activityType: "Poule pondeuse",
    capacity: "10 000 - 50 000",
    cycleInfo: "Production",
    problemType: "AMBIANCE",
    message: "Condensation excessive dans le bâtiment. Suspicion de charge fongique élevée.",
    status: "NEW",
    createdAt: "2026-04-02T06:00:00Z",
  },
  {
    id: "lead_015",
    name: "Ferme Kallel",
    email: "kallel.farm@gmail.com",
    phone: "+216 73 505 606",
    region: "Sousse",
    activityType: "Dinde",
    capacity: "5 000 - 10 000",
    cycleInfo: "Cycle 4 - Jour 60",
    problemType: "EAU",
    message: "Mortalité inexpliquée en fin de cycle. Suspicion de contamination hydrique.",
    status: "DONE",
    createdAt: "2026-03-20T08:30:00Z",
  },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export const mockProducts: MockProduct[] = [
  {
    id: "prod_001",
    slug: "cloragro",
    name: "CLORAGRO",
    isDisinfectant: true,
    category: "BATIMENT",
    step: 1,
    description: {
      fr: "Destruction radicale du biofilm organique. Préparation indispensable avant désinfection.",
      en: "Radical destruction of organic biofilm. Essential preparation before disinfection.",
      ar: "تدمير جذري للغشاء الحيوي العضوي. تحضير أساسي قبل التطهير.",
    },
    dosage: "2%",
    imageUrl: null,
  },
  {
    id: "prod_002",
    slug: "optimagro",
    name: "OPTIMAGRO",
    isDisinfectant: true,
    category: "BATIMENT",
    step: 2,
    description: {
      fr: "Désinfection à spectre complet (Bactéricide, Virucide, Fongicide). Rémanence maximale.",
      en: "Full spectrum disinfection (Bactericidal, Virucidal, Fungicidal). Maximum persistence.",
      ar: "تطهير كامل الطيف (مبيد للجراثيم ، مبيد للفيروسات ، مبيد للفطريات). بقاء أقصى.",
    },
    dosage: "1% à 2%",
    imageUrl: null,
  },
  {
    id: "prod_003",
    slug: "bionet",
    name: "BIONET",
    isDisinfectant: false,
    category: "EAU",
    step: 1,
    description: {
      fr: "Nettoyage technique des canalisations. Décapage des dépôts organiques et calcaire.",
      en: "Technical cleaning of pipes. Stripping of organic and limescale deposits.",
      ar: "تنظيف تقني للقنوات. قشر الرواسب العضوية والكلسية.",
    },
    dosage: "1% à 3%",
    imageUrl: null,
  },
  {
    id: "prod_004",
    slug: "aquacontrol-n2k",
    name: "AQUACONTROL N2K",
    isDisinfectant: false,
    category: "EAU",
    step: 2,
    description: {
      fr: "Stabilisation de la qualité de l'eau. Contrôle constant de la charge microbienne.",
      en: "Water quality stabilization. Constant control of microbial load.",
      ar: "استقرار جودة المياه. مراقبة مستمرة للحمل الميكروبي.",
    },
    dosage: "0.1% en continu",
    imageUrl: null,
  },
  {
    id: "prod_005",
    slug: "airsan-n2k",
    name: "AIRSAN N2K",
    isDisinfectant: false,
    category: "AMBIANCE",
    step: 1,
    description: {
      fr: "Réduction de la charge microbienne aérienne et des gaz nocifs (Ammoniac).",
      en: "Reduction of airborne microbial load and harmful gases (Ammonia).",
      ar: "تقليل الحمل الميكروبي المحمول جواً والغازات الضارة (الأمونيا).",
    },
    dosage: "Nébulisation 1ml/m³",
    imageUrl: null,
  },
  {
    id: "prod_006",
    slug: "bioactive-n2k",
    name: "BIOACTIVE N2K",
    isDisinfectant: false,
    category: "AMBIANCE",
    step: 2,
    description: {
      fr: "Nettoyant enzymatique concentré. Dégradation des matières organiques (graisses, protéines, biofilms) avant désinfection.",
      en: "Concentrated enzymatic cleaner. Degradation of organic matter (grease, proteins, biofilms) before disinfection.",
      ar: "منظف إنزيمي مركز. تحلل المواد العضوية (الدهون، البروتينات، الأغشية الحيوية) قبل التطهير.",
    },
    dosage: "1 à 3 % (standard) / 5 à 10 % (fort)",
    imageUrl: null,
  },
];

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────

export const mockBlogPosts: MockBlogPost[] = [
  {
    id: 1,
    slug: "protocole-scientifique-n2k",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
    tags: "protocole, expertise, N2K",
    titleFr: "Le protocole scientifique N2K : Pourquoi l'ordre compte",
    titleEn: "The N2K scientific protocol: Why the order matters",
    titleAr: "بروتوكول N2K العلمي: لماذا الترتيب مهم",
    contentFr: "La désinfection échoue souvent car elle est faite sur des surfaces sales. Le protocole N2K impose un ordre strict : Nettoyage technique → Rinçage → Désinfection → Vide sanitaire contrôlé.",
    contentEn: "Disinfection often fails because it is performed on dirty surfaces. The N2K protocol imposes a strict order: Technical cleaning → Rinsing → Disinfection → Controlled downtime.",
    contentAr: "غالباً ما يفشل التطهير لأنه يتم على أسطح متسخة. يفرض بروتوكول N2K ترتيبًا صارمًا: التنظيف التقني ← الشطف ← التطهير ← فترة الراحة المُسيطر عليها.",
    publishedAt: "2026-03-15T10:00:00Z",
  },
  {
    id: 2,
    slug: "biofilm-ennemi-invisible",
    coverImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800",
    tags: "biofilm, bâtiment, CLORAGRO",
    titleFr: "Le biofilm : l'ennemi invisible de vos élevages",
    titleEn: "Biofilm: The invisible enemy of your farms",
    titleAr: "الغشاء الحيوي: العدو الخفي لمزارعكم",
    contentFr: "Le biofilm est une matrice protectrice formée par les bactéries sur les surfaces. Il résiste aux désinfectants classiques et nécessite un traitement spécifique avec CLORAGRO.",
    contentEn: "Biofilm is a protective matrix formed by bacteria on surfaces. It resists conventional disinfectants and requires specific treatment with CLORAGRO.",
    contentAr: "الغشاء الحيوي هو مصفوفة واقية تشكلها البكتيريا على الأسطح. يقاوم المطهرات التقليدية ويتطلب علاجًا خاصًا بـ CLORAGRO.",
    publishedAt: "2026-03-01T10:00:00Z",
  },
  {
    id: 3,
    slug: "qualite-eau-elevage",
    coverImage: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800",
    tags: "eau, qualité, BIONET, AQUACONTROL",
    titleFr: "Qualité de l'eau en élevage : un facteur critique sous-estimé",
    titleEn: "Water quality in farming: an underestimated critical factor",
    titleAr: "جودة المياه في التربية: عامل حاسم يتم الاستهانة به",
    contentFr: "80% des pathologies en élevage avicole sont liées à la qualité de l'eau. Un programme de traitement en 2 étapes (BIONET + AQUACONTROL) garantit une eau conforme.",
    contentEn: "80% of pathologies in poultry farming are linked to water quality. A 2-step treatment program (BIONET + AQUACONTROL) guarantees compliant water.",
    contentAr: "80% من الأمراض في تربية الدواجن مرتبطة بجودة المياه. برنامج علاج من خطوتين (BIONET + AQUACONTROL) يضمن مياهًا مطابقة.",
    publishedAt: "2026-02-20T10:00:00Z",
  },
  {
    id: 4,
    slug: "ammoniac-solutions",
    coverImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    tags: "ambiance, ammoniac, AIRSAN",
    titleFr: "Ammoniac en élevage : comprendre et agir avec AIRSAN N2K",
    titleEn: "Ammonia in farming: understanding and acting with AIRSAN N2K",
    titleAr: "الأمونيا في التربية: الفهم والتصرف مع AIRSAN N2K",
    contentFr: "L'ammoniac au-delà de 20 ppm provoque des lésions respiratoires et oculaires. AIRSAN N2K réduit la charge ammoniacale de 70% en 48h par nébulisation.",
    contentEn: "Ammonia above 20 ppm causes respiratory and ocular lesions. AIRSAN N2K reduces ammonia load by 70% in 48h through nebulization.",
    contentAr: "الأمونيا فوق 20 جزء في المليون تسبب آفات تنفسية وبصرية. AIRSAN N2K يقلل حمولة الأمونيا بنسبة 70% خلال 48 ساعة من خلال الرذاذ.",
    publishedAt: "2026-02-10T10:00:00Z",
  },
];

// ─── PROTOCOLS ────────────────────────────────────────────────────────────────

export const mockProtocols: MockProtocol[] = [
  {
    id: "proto_001",
    zone: "BATIMENT",
    problem: {
      fr: "Biofilm persistant & contamination résiduelle",
      en: "Persistent biofilm & residual contamination",
      ar: "الغشاء الحيوي المستمر والتلوث المتبقي",
    },
    step1Label: {
      fr: "Nettoyage technique — Destruction du biofilm",
      en: "Technical cleaning — Biofilm destruction",
      ar: "التنظيف التقني — تدمير الغشاء الحيوي",
    },
    step2Label: {
      fr: "Désinfection complète — Spectre large",
      en: "Complete disinfection — Broad spectrum",
      ar: "تطهير كامل — طيف واسع",
    },
    productSlugs: ["cloragro", "optimagro"],
    isActive: true,
  },
  {
    id: "proto_002",
    zone: "EAU",
    problem: {
      fr: "Contamination microbienne de l'eau de boisson",
      en: "Microbial contamination of drinking water",
      ar: "التلوث الميكروبي لمياه الشرب",
    },
    step1Label: {
      fr: "Décapage des canalisations",
      en: "Pipeline stripping",
      ar: "تقشير القنوات",
    },
    step2Label: {
      fr: "Stabilisation microbiologique continue",
      en: "Continuous microbiological stabilization",
      ar: "الاستقرار الميكروبيولوجي المستمر",
    },
    productSlugs: ["bionet", "aquacontrol-n2k"],
    isActive: true,
  },
  {
    id: "proto_003",
    zone: "AMBIANCE",
    problem: {
      fr: "Charge microbienne aérienne & ammoniac",
      en: "Airborne microbial load & ammonia",
      ar: "الحمل الميكروبي المحمول جواً والأمونيا",
    },
    step1Label: {
      fr: "Réduction de la charge aérienne",
      en: "Airborne load reduction",
      ar: "تقليل الحمل المحمول جواً",
    },
    step2Label: {
      fr: "Nettoyage enzymatique des matières organiques",
      en: "Enzymatic cleaning of organic matter",
      ar: "التنظيف الإنزيمي للمواد العضوية",
    },
    productSlugs: ["airsan-n2k", "bioactive-n2k"],
    isActive: true,
  },
];

// ─── DASHBOARD STATS ──────────────────────────────────────────────────────────

export const dashboardStats = {
  totalLeads: 247,
  leadsGrowth: 12,
  conversionRate: 8.3,
  conversionGrowth: 2.1,
  activeProducts: 6,
  totalProducts: 6,
  publishedArticles: 12,
  newArticlesThisMonth: 2,
};

// Leads growth over the last 30 days
export const leadsOverTime = [
  { date: "03 Mar", leads: 3 },
  { date: "04 Mar", leads: 5 },
  { date: "05 Mar", leads: 2 },
  { date: "06 Mar", leads: 7 },
  { date: "07 Mar", leads: 4 },
  { date: "08 Mar", leads: 6 },
  { date: "09 Mar", leads: 8 },
  { date: "10 Mar", leads: 5 },
  { date: "11 Mar", leads: 9 },
  { date: "12 Mar", leads: 7 },
  { date: "13 Mar", leads: 11 },
  { date: "14 Mar", leads: 6 },
  { date: "15 Mar", leads: 8 },
  { date: "16 Mar", leads: 10 },
  { date: "17 Mar", leads: 12 },
  { date: "18 Mar", leads: 7 },
  { date: "19 Mar", leads: 9 },
  { date: "20 Mar", leads: 14 },
  { date: "21 Mar", leads: 8 },
  { date: "22 Mar", leads: 11 },
  { date: "23 Mar", leads: 13 },
  { date: "24 Mar", leads: 9 },
  { date: "25 Mar", leads: 10 },
  { date: "26 Mar", leads: 15 },
  { date: "27 Mar", leads: 12 },
  { date: "28 Mar", leads: 8 },
  { date: "29 Mar", leads: 11 },
  { date: "30 Mar", leads: 14 },
  { date: "31 Mar", leads: 10 },
  { date: "01 Avr", leads: 16 },
];

// Problems by zone
export const problemsByZone = [
  { zone: "Bâtiment", count: 98, fill: "var(--chart-1)" },
  { zone: "Eau", count: 87, fill: "var(--chart-2)" },
  { zone: "Ambiance", count: 62, fill: "var(--chart-3)" },
];
