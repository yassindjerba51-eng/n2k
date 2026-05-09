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

export const sectorsDataFr: Record<string, SectorData> = {
  "elevage": {
    id: "elevage",
    slug: "elevage",
    problems: [
      {
        title: "Biofilm persistant sur surfaces d'élevage",
        description: "Les parois, les sols et les équipements métalliques des bâtiments d'élevage développent un biofilm bactérien entre chaque cycle. Ce film protège les pathogènes contre les désinfectants classiques."
      },
      {
        title: "Contamination des circuits d'eau d'abreuvement",
        description: "Les canalisations accumulent calcaire, dépôts organiques et biofilm, créant un réservoir de coliformes fécaux et pathogènes (E. coli, Salmonella) qui contamine l'eau distribuée au bétail."
      },
      {
        title: "Pression microbienne et qualité de l'air",
        description: "Les gaz et l'humidité dégagés par les litières attaquent les muqueuses respiratoires des animaux. Un seuil critique d'ammoniac dégrade les performances et multiplie les pathologies."
      }
    ],
    economicRisks: [
      { title: "Mortalité et morbidité", impact: "Les exploitations à faible niveau de biosécurité enregistrent des taux de perte jusqu'à 2,7 fois supérieurs aux élevages maîtrisés. (Source : étude comparative multi-sites, 2024)" },
      { title: "Indice de consommation (FCR) dégradé", impact: "Une mauvaise maîtrise sanitaire dégrade l'efficacité alimentaire de près de 15% en moyenne, augmentant drastiquement les coûts de production." },
      { title: "Performances zootechniques en baisse", impact: "Une ambiance dégradée (ammoniac, humidité) entraîne une baisse du GMQ et une immunodépression. Seuil critique validé par de multiples études scientifiques (PubMed, ScienceDirect)." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "Nettoyage technique", description: "Destruction du biofilm organique sur toutes les surfaces du bâtiment. Application mousse, temps de contact 20 min." },
      { product: "Rinçage HP", action: "Rinçage haute pression", description: "Élimination mécanique des résidus et du détergent. Surface visuellement propre obligatoire." },
      { product: "OPTIMAGRO", action: "Désinfection biocide", description: "Désinfection terminale à spectre complet. Bactéricide, virucide, fongicide. Rémanence assurée." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "Nettoyage canalisations", description: "Décapage des dépôts organiques et calcaire dans les circuits d'eau avant mise en place des animaux." },
      { product: "AQUACONTROL", action: "Traitement eau continu", description: "Stabilisation bactériologique de l'eau de boisson tout au long du cycle de production." },
      { product: "AIRSAN", action: "Désinfection ambiance", description: "Nébulisation fine en présence d'animaux pour réduire la charge microbienne aérienne et l'ammoniac." },
      { product: "BIOACTIVE", action: "Dégradation enzymatique", description: "Nettoyage des équipements à forte charge organique avant désinfection." }
    ],
    specificCases: [
      { title: "Décontamination après épisode infectieux", description: "En cas de détection de pathogènes majeurs sur le lot précédent, le protocole est renforcé.", protocol: "Double passage CLORAGRO + OPTIMAGRO en augmentant les concentrations. Analyse microbiologique de contrôle obligatoire." },
      { title: "Élevage en conditions extrêmes", description: "Les températures élevées ou l'humidité excessive accélèrent la prolifération bactérienne.", protocol: "AQUACONTROL en dosage renforcé + AIRSAN fréquent. Surveillance accrue des paramètres sanitaires." },
      { title: "Audit de biosécurité", description: "Préparation aux audits de conformité ou certifications.", protocol: "Protocole complet minimal + prélèvements de surface avec analyse en laboratoire N2K." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan", "bioactive"],
    expectedResults: [
      "Réduction significative du taux de mortalité et de morbidité",
      "Amélioration mesurable de l'indice de consommation (FCR)",
      "Maîtrise de la qualité de l'air et des gaz d'ambiance",
      "Conformité microbiologique des surfaces documentée",
      "Eau d'abreuvement stabilisée sur l'ensemble du cycle"
    ]
  },
  "abattoirs": {
    id: "abattoirs",
    slug: "abattoirs",
    problems: [
      {
        title: "Contamination croisée sur chaîne d'abattage",
        description: "Les surfaces de contact (convoyeurs, plans de découpe, crochets) accumulent des résidus organiques riches en pathogènes. Sans nettoyage technique, le biofilm s'installe en quelques heures."
      },
      {
        title: "Non-conformité HACCP récurrente",
        description: "Les audits révèlent régulièrement des niveaux de contamination inacceptables sur les surfaces de travail, les chambres froides et les circuits d'eau de process."
      },
      {
        title: "Salmonella et Listeria en zones réfrigérées",
        description: "Les chambres froides et les zones de stockage sont des environnements propices à la prolifération de Listeria monocytogenes, résistante aux températures basses."
      }
    ],
    economicRisks: [
      { title: "Rappels produits", impact: "Un seul rappel peut coûter des dizaines de milliers de dinars et détruire la réputation commerciale." },
      { title: "Fermeture administrative", impact: "Non-conformité HACCP répétée = risque de suspension d'activité par les autorités sanitaires." },
      { title: "Pertes de marché export", impact: "Les acheteurs internationaux exigent des certifications sanitaires strictes. Un écart = perte du contrat." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "Nettoyage technique quotidien", description: "Nettoyage alcalin chloré de toutes les surfaces de contact alimentaire. Dégraissage intensif." },
      { product: "Rinçage", action: "Rinçage eau potable", description: "Élimination totale des résidus détergents avant désinfection." },
      { product: "OPTIMAGRO", action: "Désinfection terminale", description: "Désinfection de contact sur surfaces propres. Spectre Salmonella, Listeria, E. coli." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "Nettoyage circuits eau", description: "Décapage des circuits d'eau de process et de refroidissement." },
      { product: "AIRSAN", action: "Traitement chambres froides", description: "Nébulisation des chambres froides pour réduire la charge Listeria." }
    ],
    specificCases: [
      { title: "Détection Listeria en chambre froide", description: "Contamination confirmée par analyse en chambre froide ou zone de stockage.", protocol: "Nettoyage CLORAGRO renforcé + OPTIMAGRO en concentration augmentée. AIRSAN en nébulisation froide. Prélèvements de contrôle à J+3." },
      { title: "Préparation audit IFS/BRC", description: "Mise en conformité avant audit de certification internationale.", protocol: "Protocole complet sur 48h + prélèvements de surface 72h avant audit + rapport microbiologique documenté." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "airsan"],
    expectedResults: [
      "Conformité HACCP sur 100% des points de contrôle",
      "Réduction Salmonella sous seuil de détection",
      "Maîtrise Listeria en chambres froides < 10 UFC/cm²",
      "Certificat de conformité microbiologique exploitable pour les audits"
    ]
  },
  "industrie-agroalimentaire": {
    id: "agroalimentaire",
    slug: "industrie-agroalimentaire",
    problems: [
      {
        title: "Encrassement des lignes de production CIP",
        description: "Les lignes de production fermées (CIP) accumulent des dépôts organiques (graisses, protéines) qui réduisent l'efficacité du nettoyage et créent des niches bactériennes."
      },
      {
        title: "Contamination atmosphérique en zones sensibles",
        description: "Les zones de conditionnement et de stockage sont exposées à une pression microbienne aérienne qui compromet la durée de conservation des produits finis."
      },
      {
        title: "Non-conformité aux normes IFS/BRC",
        description: "Les audits de certification exigent un niveau de maîtrise sanitaire documenté et traçable sur l'ensemble de la chaîne de production."
      }
    ],
    economicRisks: [
      { title: "Perte de certifications", impact: "Sans IFS/BRC, l'accès aux marchés de la grande distribution est impossible." },
      { title: "DLC raccourcie", impact: "Une charge microbienne élevée en atmosphère réduit la durée de vie des produits conditionnés." },
      { title: "Coûts de non-qualité", impact: "Rebuts, retours clients, pénalités contractuelles : les coûts de non-qualité peuvent atteindre 5% du CA." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "Nettoyage des surfaces ouvertes", description: "Dégraissage et décapage des surfaces de travail, plans de découpe, convoyeurs." },
      { product: "OPTIMAGRO", action: "Désinfection terminale", description: "Désinfection de toutes les surfaces après nettoyage. Spectre complet." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "Détartrage circuits", description: "Traitement acide des circuits d'eau et de vapeur pour éliminer tartre et biofilm minéral." },
      { product: "AQUACONTROL", action: "Traitement eau process", description: "Stabilisation microbiologique de l'eau utilisée en production." },
      { product: "AIRSAN", action: "Traitement atmosphérique", description: "Nébulisation des zones de conditionnement pour maîtriser la pression microbienne aérienne." }
    ],
    specificCases: [
      { title: "Contamination Listeria en zone de conditionnement", description: "Détection Listeria sur surfaces ou dans l'atmosphère de la zone de conditionnement.", protocol: "Arrêt de ligne, nettoyage CLORAGRO intensif, désinfection OPTIMAGRO renforcée, AIRSAN en nébulisation. Prélèvements de contrôle avant reprise." },
      { title: "Audit IFS/BRC imminent", description: "Préparation express aux audits de certification.", protocol: "Protocole complet renforcé 72h avant audit. Documentation complète des actions, dosages et résultats. Rapport microbiologique fourni." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan"],
    expectedResults: [
      "Score IFS/BRC supérieur sur les critères d'hygiène",
      "Réduction de la charge microbienne atmosphérique de 90%",
      "Allongement de la DLC par maîtrise de la contamination",
      "Traçabilité complète des opérations de nettoyage-désinfection"
    ]
  }
};

export const sectorsDataEn: Record<string, SectorData> = {
  "elevage": {
    id: "elevage",
    slug: "elevage",
    problems: [
      { title: "Persistent biofilm on breeding surfaces", description: "Walls, floors, and metal equipment in livestock buildings develop a bacterial biofilm between each cycle. This film protects pathogens against standard disinfectants." },
      { title: "Contamination of drinking water circuits", description: "Pipes accumulate scale, organic deposits, and biofilm, creating a reservoir of fecal coliforms and pathogens (E. coli, Salmonella) that contaminates the water distributed to livestock." },
      { title: "Microbial pressure and air quality", description: "Gases and humidity released by litter attack the respiratory mucous membranes of animals. A critical ammonia threshold degrades performance and increases pathologies." }
    ],
    economicRisks: [
      { title: "Mortality and morbidity", impact: "Farms with low biosecurity levels record loss rates up to 2.7 times higher than managed livestock farms. (Source: comparative multi-site study, 2024)" },
      { title: "Degraded Feed Conversion Ratio (FCR)", impact: "Poor sanitary management degrades feed efficiency by nearly 15% on average, drastically increasing production costs." },
      { title: "Decreased zootechnical performance", impact: "A degraded environment (ammonia, humidity) leads to a drop in ADG and immunosuppression. Critical threshold validated by multiple scientific studies (PubMed, ScienceDirect)." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "Technical cleaning", description: "Destruction of organic biofilm on all building surfaces. Foam application, contact time 20 min." },
      { product: "HP Rinsing", action: "High-pressure rinsing", description: "Mechanical removal of residues and detergent. Visually clean surface mandatory." },
      { product: "OPTIMAGRO", action: "Biocide disinfection", description: "Full-spectrum terminal disinfection. Bactericidal, virucidal, fungicidal. Guaranteed persistence." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "Pipe cleaning", description: "Stripping of organic deposits and scale in water circuits before placing animals." },
      { product: "AQUACONTROL", action: "Continuous water treatment", description: "Bacteriological stabilization of drinking water throughout the production cycle." },
      { product: "AIRSAN", action: "Atmosphere disinfection", description: "Fine nebulization in the presence of animals to reduce aerial microbial load and ammonia." },
      { product: "BIOACTIVE", action: "Enzymatic degradation", description: "Cleaning of equipment with high organic load before disinfection." }
    ],
    specificCases: [
      { title: "Decontamination after infectious episode", description: "In case of detection of major pathogens on the previous batch, the protocol is reinforced.", protocol: "Double passage of CLORAGRO + OPTIMAGRO by increasing concentrations. Mandatory microbiological control analysis." },
      { title: "Breeding in extreme conditions", description: "High temperatures or excessive humidity accelerate bacterial proliferation.", protocol: "AQUACONTROL at reinforced dosage + frequent AIRSAN. Increased monitoring of sanitary parameters." },
      { title: "Biosecurity audit", description: "Preparation for compliance audits or certifications.", protocol: "Complete minimal protocol + surface sampling with analysis in N2K laboratory." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan", "bioactive"],
    expectedResults: [
      "Significant reduction in mortality and morbidity rates",
      "Measurable improvement in Feed Conversion Ratio (FCR)",
      "Control of air quality and ambient gases",
      "Documented microbiological compliance of surfaces",
      "Stabilized drinking water throughout the cycle"
    ]
  },
  "abattoirs": {
    id: "abattoirs",
    slug: "abattoirs",
    problems: [
      { title: "Cross-contamination on slaughter line", description: "Contact surfaces (conveyors, cutting boards, hooks) accumulate organic residues rich in pathogens. Without technical cleaning, biofilm settles in hours." },
      { title: "Recurring HACCP non-compliance", description: "Audits regularly reveal unacceptable contamination levels on work surfaces, cold rooms, and process water circuits." },
      { title: "Salmonella and Listeria in refrigerated areas", description: "Cold rooms and storage areas are favorable environments for the proliferation of Listeria monocytogenes, which is resistant to low temperatures." }
    ],
    economicRisks: [
      { title: "Product recalls", impact: "A single recall can cost tens of thousands of dinars and destroy commercial reputation." },
      { title: "Administrative closure", impact: "Repeated HACCP non-compliance = risk of business suspension by health authorities." },
      { title: "Loss of export markets", impact: "International buyers require strict health certifications. One discrepancy = loss of contract." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "Daily technical cleaning", description: "Chlorinated alkaline cleaning of all food contact surfaces. Intensive degreasing." },
      { product: "Rinsing", action: "Potable water rinsing", description: "Total elimination of detergent residues before disinfection." },
      { product: "OPTIMAGRO", action: "Terminal disinfection", description: "Contact disinfection on clean surfaces. Salmonella, Listeria, E. coli spectrum." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "Water circuit cleaning", description: "Stripping of process and cooling water circuits." },
      { product: "AIRSAN", action: "Cold room treatment", description: "Nebulization of cold rooms to reduce the Listeria load." }
    ],
    specificCases: [
      { title: "Listeria detection in cold room", description: "Confirmed contamination by analysis in cold room or storage area.", protocol: "Reinforced CLORAGRO cleaning + OPTIMAGRO at increased concentration. AIRSAN cold nebulization. Control swabs at D+3." },
      { title: "IFS/BRC audit preparation", description: "Compliance preparation before international certification audit.", protocol: "Complete 48h protocol + surface swabs 72h before audit + documented microbiological report." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "airsan"],
    expectedResults: [
      "HACCP compliance on 100% of control points",
      "Salmonella reduction below detection threshold",
      "Listeria mastery in cold rooms < 10 CFU/cm²",
      "Exploitable microbiological compliance certificate for audits"
    ]
  },
  "industrie-agroalimentaire": {
    id: "agroalimentaire",
    slug: "industrie-agroalimentaire",
    problems: [
      { title: "Fouling of CIP production lines", description: "Closed production lines (CIP) accumulate organic deposits (fats, proteins) that reduce cleaning efficiency and create bacterial niches." },
      { title: "Atmospheric contamination in sensitive areas", description: "Packaging and storage areas are exposed to aerial microbial pressure that compromises the shelf life of finished products." },
      { title: "Non-compliance with IFS/BRC standards", description: "Certification audits require a documented and traceable level of sanitary mastery across the entire production chain." }
    ],
    economicRisks: [
      { title: "Loss of certifications", impact: "Without IFS/BRC, access to mass retail markets is impossible." },
      { title: "Shortened shelf life (DLC)", impact: "A high microbial load in the atmosphere reduces the lifespan of packaged products." },
      { title: "Costs of non-quality", impact: "Scrap, customer returns, contractual penalties: non-quality costs can reach 5% of turnover." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "Cleaning open surfaces", description: "Degreasing and stripping of work surfaces, cutting boards, conveyors." },
      { product: "OPTIMAGRO", action: "Terminal disinfection", description: "Disinfection of all surfaces after cleaning. Full spectrum." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "Circuit descaling", description: "Acid treatment of water and steam circuits to remove scale and mineral biofilm." },
      { product: "AQUACONTROL", action: "Process water treatment", description: "Microbiological stabilization of the water used in production." },
      { product: "AIRSAN", action: "Atmospheric treatment", description: "Nebulization of packaging areas to master aerial microbial pressure." }
    ],
    specificCases: [
      { title: "Listeria contamination in packaging area", description: "Listeria detection on surfaces or in the atmosphere of the packaging zone.", protocol: "Line stop, intensive CLORAGRO cleaning, reinforced OPTIMAGRO disinfection, AIRSAN nebulization. Control swabs before resuming." },
      { title: "Imminent IFS/BRC audit", description: "Express preparation for certification audits.", protocol: "Complete reinforced protocol 72h before audit. Full documentation of actions, dosages, and results. Microbiological report provided." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan"],
    expectedResults: [
      "Higher IFS/BRC score on hygiene criteria",
      "90% reduction of atmospheric microbial load",
      "Extension of shelf life through contamination mastery",
      "Complete traceability of cleaning-disinfection operations"
    ]
  }
};

export const sectorsDataAr: Record<string, SectorData> = {
  "elevage": {
    id: "elevage",
    slug: "elevage",
    problems: [
      { title: "غشاء حيوي مستمر على أسطح التربية", description: "تطور الجدران، والأرضيات، والمعدات المعدنية في مباني التربية غشاءً حيوياً بكتيرياً بين كل دورة. هذا الغشاء يحمي مسببات الأمراض من المطهرات التقليدية." },
      { title: "تلوث شبكات مياه الشرب", description: "تتراكم الترسبات الكلسية والرواسب العضوية والغشاء الحيوي في الأنابيب، مما يخلق خزاناً لمسببات الأمراض (الإشريكية القولونية، السالمونيلا) التي تلوث المياه الموزعة للمواشي." },
      { title: "الضغط الميكروبي وجودة الهواء", description: "الغازات والرطوبة المنبعثة من الفرشة تهاجم الأغشية المخاطية التنفسية للحيوانات. العتبة الحرجة للأمونيا تدهور الأداء وتضاعف الأمراض." }
    ],
    economicRisks: [
      { title: "النفوق والمرض", impact: "تسجل المنشآت ذات مستوى الأمن الحيوي المنخفض معدلات فقد تصل إلى 2.7 مرة أعلى من المزارع المنضبطة. (المصدر: دراسة مقارنة متعددة المواقع، 2024)" },
      { title: "تدهور مؤشر استهلاك العلف (FCR)", impact: "الإدارة الصحية السيئة تدهور كفاءة التغذية بنسبة 15% تقريباً في المتوسط، مما يزيد بشكل حاد من تكاليف الإنتاج." },
      { title: "انخفاض الأداء الحيواني", impact: "البيئة المتدهورة (أمونيا، رطوبة) تؤدي إلى انخفاض متوسط النمو اليومي وكبت المناعة. عتبة حرجة مؤكدة بدراسات علمية متعددة (PubMed، ScienceDirect)." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "التنظيف الفني", description: "تدمير الغشاء الحيوي العضوي على جميع أسطح المبنى. التطبيق بالرغوة، وقت التلامس 20 دقيقة." },
      { product: "شطف عالي الضغط", action: "الشطف بالضغط العالي", description: "الإزالة الميكانيكية للرواسب والمنظفات. السطح النظيف بصرياً إلزامي." },
      { product: "OPTIMAGRO", action: "التطهير البيولوجي", description: "تطهير نهائي كامل الطيف. مضاد للبكتيريا، الفيروسات، والفطريات. ضمان بقاء المفعول." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "تنظيف الأنابيب", description: "تجريد الرواسب العضوية والترسبات الكلسية في شبكات المياه قبل إدخال الحيوانات." },
      { product: "AQUACONTROL", action: "المعالجة المستمرة للمياه", description: "الاستقرار البكتريولوجي لمياه الشرب طوال دورة الإنتاج." },
      { product: "AIRSAN", action: "تطهير الأجواء", description: "تبخير دقيق بوجود الحيوانات لتقليل العبء الميكروبي الجوي والأمونيا." },
      { product: "BIOACTIVE", action: "تحليل إنزيمي", description: "تنظيف المعدات ذات الحمل العضوي العالي قبل التطهير." }
    ],
    specificCases: [
      { title: "التطهير بعد نوبة وبائية", description: "في حالة اكتشاف مسببات أمراض كبرى في الدفعة السابقة، يتم تعزيز البروتوكول.", protocol: "تمرير مزدوج لـ CLORAGRO + OPTIMAGRO بزيادة التركيزات. تحليل ميكروبيولوجي للمراقبة إلزامي." },
      { title: "التربية في ظروف قصوى", description: "درجات الحرارة المرتفعة أو الرطوبة الزائدة تسرع التكاثر البكتيري.", protocol: "AQUACONTROL بجرعة معززة + AIRSAN متكرر. مراقبة متزايدة للمعايير الصحية." },
      { title: "تدقيق الأمن الحيوي", description: "التحضير لتدقيقات الامتثال أو الشهادات.", protocol: "البروتوكول الأساسي الكامل + أخذ عينات من الأسطح مع التحليل في مختبر N2K." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan", "bioactive"],
    expectedResults: [
      "تقليل ملموس لمعدل النفوق لكل دورة",
      "تحسن قابل للقياس في مؤشر استهلاك العلف منذ الدورة الأولى",
      "الحفاظ على مستوى الأمونيا تحت العتبة الحرجة 25 جزء في المليون",
      "الامتثال الميكروبيولوجي الموثق للأسطح",
      "مياه الشرب مستقرة على طول الدورة"
    ]
  },
  "abattoirs": {
    id: "abattoirs",
    slug: "abattoirs",
    problems: [
      { title: "التلوث المتبادل على خط الذبح", description: "أسطح التلامس (الناقلات، ألواح التقطيع، الخطافات) تتراكم عليها رواسب عضوية غنية بمسببات الأمراض. بدون تنظيف فني، يتشكل الغشاء الحيوي في غضون ساعات." },
      { title: "عدم الامتثال المتكرر لنظام الهاسب (HACCP)", description: "تكشف عمليات التدقيق بانتظام عن مستويات تلوث غير مقبولة على أسطح العمل والغرف الباردة وشبكات مياه التصنيع." },
      { title: "السالمونيلا والليستيريا في المناطق المبردة", description: "تعد الغرف الباردة ومناطق التخزين بيئات مواتية لتكاثر الليستيريا المستوحدة، التي تقاوم درجات الحرارة المنخفضة." }
    ],
    economicRisks: [
      { title: "سحب المنتجات", impact: "يمكن أن تكلف عملية سحب واحدة عشرات الآلاف من الدنانير وتدمر السمعة التجارية." },
      { title: "الإغلاق الإداري", impact: "عدم الامتثال المتكرر لنظام הهاسب = خطر تعليق النشاط من قبل السلطات الصحية." },
      { title: "خسارة أسواق التصدير", impact: "يشترط المشترون الدوليون شهادات صحية صارمة. أي اختلاف = خسارة العقد." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "التنظيف الفني اليومي", description: "تنظيف قلوي مكلور لجميع الأسطح الملامسة للأغذية. إزالة الشحوم المكثفة." },
      { product: "الشطف", action: "الشطف بماء الشرب", description: "إزالة كلية لرواسب المنظفات قبل التطهير." },
      { product: "OPTIMAGRO", action: "التطهير النهائي", description: "تطهير بالتماس للأسطح النظيفة. طيف واسع يشمل السالمونيلا والليستيريا والإشريكية القولونية." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "تنظيف شبكات المياه", description: "تجريد شبكات مياه التصنيع والتبريد." },
      { product: "AIRSAN", action: "معالجة الغرف الباردة", description: "تبخير الغرف الباردة لتقليل عبء الليستيريا." }
    ],
    specificCases: [
      { title: "اكتشاف الليستيريا في الغرفة الباردة", description: "تأكيد التلوث من خلال التحليل في الغرفة الباردة أو منطقة التخزين.", protocol: "تنظيف معزز بـ CLORAGRO + OPTIMAGRO بتركيز زائد. التبخير البارد باستخدام AIRSAN. عينات مراقبة في اليوم الثالث." },
      { title: "التحضير لتدقيق IFS/BRC", description: "التحضير للامتثال قبل تدقيق الشهادات الدولية.", protocol: "بروتوكول كامل على مدار 48 ساعة + مسحات سطحية 72 ساعة قبل التدقيق + تقرير ميكروبيولوجي موثق." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "airsan"],
    expectedResults: [
      "امتثال الهاسب بنسبة 100% في نقاط المراقبة",
      "خفض السالمونيلا إلى ما دون عتبة الكشف",
      "التحكم في الليستيريا في الغرف الباردة < 10 وحدة تشكيل مستعمرة/سم²",
      "شهادة امتثال ميكروبيولوجي قابلة للاستخدام في التدقيقات"
    ]
  },
  "industrie-agroalimentaire": {
    id: "agroalimentaire",
    slug: "industrie-agroalimentaire",
    problems: [
      { title: "انسداد خطوط الإنتاج المغلقة (CIP)", description: "تتراكم الرواسب العضوية (الدهون، البروتينات) في خطوط الإنتاج المغلقة مما يقلل من كفاءة التنظيف ويخلق بيئات بكتيرية." },
      { title: "التلوث الجوي في المناطق الحساسة", description: "تتعرض مناطق التعبئة والتخزين لضغط ميكروبي هوائي يهدد مدة صلاحية المنتجات النهائية." },
      { title: "عدم الامتثال لمعايير IFS/BRC", description: "تتطلب تدقيقات الشهادات مستوى موثق وقابل للتتبع من التحكم الصحي على طول سلسلة الإنتاج بأكملها." }
    ],
    economicRisks: [
      { title: "فقدان الشهادات", impact: "بدون شهادات IFS/BRC، يستحيل الوصول إلى أسواق التوزيع الكبرى." },
      { title: "قصر مدة الصلاحية", impact: "العبء الميكروبي العالي في الهواء يقلل من العمر الافتراضي للمنتجات المعبأة." },
      { title: "تكاليف عدم الجودة", impact: "الهدر، إرجاع العملاء، العقوبات التعاقدية: يمكن أن تصل تكاليف الجودة الرديئة إلى 5% من رقم المعاملات." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "تنظيف الأسطح المفتوحة", description: "إزالة الشحوم وتجريد أسطح العمل، ألواح التقطيع، والناقلات." },
      { product: "OPTIMAGRO", action: "التطهير النهائي", description: "تطهير جميع الأسطح بعد التنظيف. طيف كامل." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "إزالة الترسبات من الشبكات", description: "معالجة حمضية لدوائر المياه والبخار لإزالة الترسبات والغشاء الحيوي المعدني." },
      { product: "AQUACONTROL", action: "معالجة مياه التصنيع", description: "التثبيت الميكروبيولوجي للمياه المستخدمة في الإنتاج." },
      { product: "AIRSAN", action: "معالجة الأجواء", description: "تبخير مناطق التعبئة للسيطرة على الضغط الميكروبي الهوائي." }
    ],
    specificCases: [
      { title: "تلوث الليستيريا في منطقة التعبئة", description: "اكتشاف الليستيريا على الأسطح أو في هواء منطقة التعبئة.", protocol: "توقف الخط، تنظيف مكثف بـ CLORAGRO، تطهير معزز بـ OPTIMAGRO، التبخير بـ AIRSAN. مسحات المراقبة قبل الاستئناف." },
      { title: "تدقيق IFS/BRC وشيك", description: "تحضير سريع لتدقيقات الشهادات.", protocol: "بروتوكول معزز كامل 72 ساعة قبل التدقيق. توثيق كامل للإجراءات والجرعات والنتائج. توفير تقرير ميكروبيولوجي." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan"],
    expectedResults: [
      "تسجيل درجة أعلى في معايير IFS/BRC على معايير النظافة",
      "خفض العبء الميكروبي الجوي بنسبة 90%",
      "إطالة مدة الصلاحية من خلال السيطرة على التلوث",
      "تتبع كامل لعمليات التنظيف والتطهير"
    ]
  }
};

export const getSectorData = (slug: string, locale: string): SectorData => {
  if (locale === "en") return sectorsDataEn[slug];
  if (locale === "ar") return sectorsDataAr[slug];
  return sectorsDataFr[slug];
};
