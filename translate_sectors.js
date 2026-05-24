const fs = require('fs');

const fileContent = `import { SectorData } from "./sectors-pages.types";
export type { SectorData };

export const sectorsDataFr: Record<string, SectorData> = {
  "elevage-avicole": {
    id: "elevage",
    slug: "elevage-avicole",
    problems: [
      {
        title: "Biofilm persistant sur surfaces poreuses",
        description: "Les parois en béton, les sols cimentés et les équipements métalliques développent un biofilm bactérien entre chaque cycle d'élevage. Ce film protège les pathogènes contre les désinfectants classiques."
      },
      {
        title: "Contamination des circuits d'eau de boisson",
        description: "Les canalisations accumulent calcaire, dépôts organiques et biofilm, créant un réservoir de coliformes fécaux, E. coli et Salmonella qui contamine chaque fournée d'eau distribuée."
      },
      {
        title: "Pression microbienne aérienne et ammoniac",
        description: "L'ammoniac dégagé par les litières attaque les muqueuses respiratoires des volailles. Au-delà de 25 ppm, les performances chutent et les pathologies respiratoires se multiplient."
      }
    ],
    economicRisks: [
      { title: "Mortalité accrue", impact: "Jusqu'à +8% de mortalité par bande sur des surfaces non traitées en profondeur." },
      { title: "Indice de consommation dégradé", impact: "Un réseau d'eau contaminé augmente le FCR de 10 à 15%, soit des milliers de dinars perdus par cycle." },
      { title: "Performances zootechniques en baisse", impact: "L'ammoniac réduit le GMQ de 12% et augmente les pathologies respiratoires." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "Nettoyage technique", description: "Destruction du biofilm organique sur toutes les surfaces du bâtiment. Application mousse, temps de contact 20 min." },
      { product: "Rinçage HP", action: "Rinçage haute pression", description: "Élimination mécanique des résidus et du détergent. Surface visuellement propre obligatoire." },
      { product: "OPTIMAGRO", action: "Désinfection biocide", description: "Désinfection terminale à spectre complet. Bactéricide, virucide, fongicide. Rémanence 7 jours." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "Nettoyage canalisations", description: "Décapage des dépôts organiques et calcaire dans les circuits d'eau avant mise en place des animaux." },
      { product: "AQUACONTROL", action: "Traitement eau continu", description: "Stabilisation bactériologique de l'eau de boisson tout au long du cycle d'élevage." },
      { product: "AIRSAN", action: "Désinfection ambiance", description: "Nébulisation fine en présence d'animaux pour réduire la charge microbienne aérienne et l'ammoniac." }
    ],
    specificCases: [
      { title: "Nouveau lot après contamination Salmonella", description: "En cas de détection Salmonella sur le lot précédent, le protocole est renforcé.", protocol: "Double passage CLORAGRO + OPTIMAGRO en augmentant les concentrations de 30%. Analyse microbiologique de contrôle avant mise en place." },
      { title: "Élevage en climat chaud (>35°C)", description: "Les températures élevées accélèrent la prolifération bactérienne et la dégradation de l'eau.", protocol: "AQUACONTROL en dosage renforcé + AIRSAN quotidien. Surveillance pH et chlore résiduel." },
      { title: "Audit biosécurité planifié", description: "Préparation aux audits de conformité sanitaire.", protocol: "Protocole complet minimal + prélèvements de surface pré-audit avec analyse en laboratoire N2K." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan", "bioactive"],
    expectedResults: [
      "Réduction de la mortalité de 3 à 5 points par bande",
      "Amélioration du FCR de 5 à 10%",
      "Réduction de l'ammoniac sous le seuil de 20 ppm",
      "Conformité microbiologique des surfaces < 10 UFC/cm²",
      "Eau de boisson conforme aux seuils réglementaires"
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
      { product: "ALCOSEPT PRO", action: "Désinfection rapide", description: "Désinfection intermédiaire sans rinçage des convoyeurs, outils de découpe et balances." },
      { product: "OXYLIS HOCl", action: "Traitement eau de process", description: "Désinfection continue et stabilisation microbiologique de l'eau de process." },
      { product: "OXYLIS HOCl", action: "Désinfection des volumes", description: "Brumisation aérienne en continu des chambres froides contre Salmonella et Listeria." }
    ],
    specificCases: [
      { title: "Détection Listeria en chambre froide", description: "Contamination confirmée par analyse en chambre froide ou zone de stockage.", protocol: "Nettoyage CLORAGRO renforcé + OPTIMAGRO en concentration augmentée. OXYLIS HOCl en brumisation continue. Prélèvements de contrôle à J+3." },
      { title: "Préparation audit IFS/BRC", description: "Mise en conformité avant audit de certification internationale.", protocol: "Protocole complet sur 48h + prélèvements de surface 72h avant audit + rapport microbiologique documenté." }
    ],
    associatedProducts: ["cloragro", "optimagro", "alcosept-pro", "oxylis-hoci"],
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
      { product: "OXYLIS HOCl", action: "Sanitation CIP", description: "Désinfection en circuit fermé (CIP) des lignes de production sans résidus." },
      { product: "OPTIMAGRO", action: "Désinfection terminale", description: "Désinfection de toutes les surfaces après nettoyage. Spectre complet." }
    ],
    reinforcedProtocol: [
      { product: "ALCOSEPT PRO", action: "Désinfection surfaces", description: "Désinfection rapide sans rinçage des convoyeurs et équipements de pesée." },
      { product: "OXYLIS HOCl", action: "Traitement eau de process", description: "Stabilisation microbiologique continue de l'eau utilisée en production." },
      { product: "OXYLIS HOCl", action: "Traitement de l'ambiance", description: "Nébulisation en continu des zones de conditionnement et d'emballage." }
    ],
    specificCases: [
      { title: "Contamination Listeria en zone de conditionnement", description: "Détection Listeria sur surfaces ou dans l'atmosphère de la zone de conditionnement.", protocol: "Arrêt de ligne, nettoyage CLORAGRO intensif, désinfection OPTIMAGRO renforcée, OXYLIS HOCl en brumisation continue. Prélèvements de contrôle avant reprise." },
      { title: "Audit IFS/BRC imminent", description: "Préparation express aux audits de certification.", protocol: "Protocole complet renforcé 72h avant audit. Documentation complète des actions, dosages et résultats. Rapport microbiologique fourni." }
    ],
    associatedProducts: ["cloragro", "optimagro", "alcosept-pro", "oxylis-hoci"],
    expectedResults: [
      "Score IFS/BRC supérieur sur les critères d'hygiène",
      "Réduction de la charge microbienne atmosphérique de 90%",
      "Allongement de la DLC par maîtrise de la contamination",
      "Traçabilité complète des opérations de nettoyage-désinfection"
    ]
  }
};

export const sectorsDataEn: Record<string, SectorData> = {
  "elevage-avicole": {
    id: "elevage",
    slug: "elevage-avicole",
    problems: [
      { title: "Persistent biofilm on porous surfaces", description: "Concrete walls, cemented floors, and metal equipment develop a bacterial biofilm between each rearing cycle. This film protects pathogens against standard disinfectants." },
      { title: "Contamination of drinking water circuits", description: "Pipes accumulate scale, organic deposits, and biofilm, creating a reservoir of fecal coliforms, E. coli, and Salmonella that contaminates every batch of water distributed." },
      { title: "Aerial microbial pressure and ammonia", description: "Ammonia released by litter attacks the respiratory mucous membranes of poultry. Beyond 25 ppm, performance drops and respiratory pathologies multiply." }
    ],
    economicRisks: [
      { title: "Increased mortality", impact: "Up to +8% mortality per batch on surfaces not deeply treated." },
      { title: "Degraded feed conversion ratio", impact: "A contaminated water network increases the FCR by 10 to 15%, meaning thousands of dinars lost per cycle." },
      { title: "Decreased zootechnical performance", impact: "Ammonia reduces the ADG by 12% and increases respiratory pathologies." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "Technical cleaning", description: "Destruction of the organic biofilm on all building surfaces. Foam application, contact time 20 min." },
      { product: "HP Rinsing", action: "High pressure rinsing", description: "Mechanical elimination of residues and detergent. Visually clean surface is mandatory." },
      { product: "OPTIMAGRO", action: "Biocide disinfection", description: "Full spectrum terminal disinfection. Bactericidal, virucidal, fungicidal. Persistence of 7 days." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "Pipe cleaning", description: "Stripping of organic deposits and scale in water circuits before placing the animals." },
      { product: "AQUACONTROL", action: "Continuous water treatment", description: "Bacteriological stabilization of drinking water throughout the rearing cycle." },
      { product: "AIRSAN", action: "Atmosphere disinfection", description: "Fine nebulization in the presence of animals to reduce the aerial microbial charge and ammonia." }
    ],
    specificCases: [
      { title: "New batch after Salmonella contamination", description: "In case of Salmonella detection on the previous batch, the protocol is reinforced.", protocol: "Double passage of CLORAGRO + OPTIMAGRO, increasing concentrations by 30%. Microbiological control analysis before placement." },
      { title: "Rearing in hot climates (>35°C)", description: "High temperatures accelerate bacterial proliferation and water degradation.", protocol: "AQUACONTROL at a reinforced dosage + daily AIRSAN. Monitoring of pH and residual chlorine." },
      { title: "Planned biosecurity audit", description: "Preparation for sanitary compliance audits.", protocol: "Complete minimal protocol + pre-audit surface sampling with analysis in the N2K laboratory." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan", "bioactive"],
    expectedResults: [
      "Reduction of mortality by 3 to 5 points per batch",
      "Improvement of FCR by 5 to 10%",
      "Reduction of ammonia below the 20 ppm threshold",
      "Microbiological compliance of surfaces < 10 CFU/cm²",
      "Drinking water compliant with regulatory thresholds"
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
      { product: "ALCOSEPT PRO", action: "Rapid disinfection", description: "Intermediate disinfection without rinsing of conveyors, cutting tools, and scales." },
      { product: "OXYLIS HOCl", action: "Process water treatment", description: "Continuous disinfection and microbiological stabilization of process water." },
      { product: "OXYLIS HOCl", action: "Volume disinfection", description: "Continuous aerial misting of cold rooms against Salmonella and Listeria." }
    ],
    specificCases: [
      { title: "Listeria detection in cold room", description: "Confirmed contamination by analysis in cold room or storage area.", protocol: "Reinforced CLORAGRO cleaning + OPTIMAGRO at increased concentration. OXYLIS HOCl continuous misting. Control swabs at D+3." },
      { title: "IFS/BRC audit preparation", description: "Compliance preparation before international certification audit.", protocol: "Complete 48h protocol + surface swabs 72h before audit + documented microbiological report." }
    ],
    associatedProducts: ["cloragro", "optimagro", "alcosept-pro", "oxylis-hoci"],
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
      { product: "OXYLIS HOCl", action: "CIP Sanitation", description: "Closed-loop (CIP) disinfection of production lines without residues." },
      { product: "OPTIMAGRO", action: "Terminal disinfection", description: "Disinfection of all surfaces after cleaning. Full spectrum." }
    ],
    reinforcedProtocol: [
      { product: "ALCOSEPT PRO", action: "Surfaces disinfection", description: "Rapid disinfection without rinsing of conveyors and weighing equipment." },
      { product: "OXYLIS HOCl", action: "Process water treatment", description: "Continuous microbiological stabilization of the water used in production." },
      { product: "OXYLIS HOCl", action: "Atmospheric treatment", description: "Continuous misting of packaging and wrapping zones." }
    ],
    specificCases: [
      { title: "Listeria contamination in packaging area", description: "Listeria detection on surfaces or in the atmosphere of the packaging zone.", protocol: "Line stop, intensive CLORAGRO cleaning, reinforced OPTIMAGRO disinfection, OXYLIS HOCl continuous misting. Control swabs before resuming." },
      { title: "Imminent IFS/BRC audit", description: "Express preparation for certification audits.", protocol: "Complete reinforced protocol 72h before audit. Full documentation of actions, dosages, and results. Microbiological report provided." }
    ],
    associatedProducts: ["cloragro", "optimagro", "alcosept-pro", "oxylis-hoci"],
    expectedResults: [
      "Higher IFS/BRC score on hygiene criteria",
      "90% reduction of atmospheric microbial load",
      "Extension of shelf life through contamination mastery",
      "Complete traceability of cleaning-disinfection operations"
    ]
  }
};

export const sectorsDataAr: Record<string, SectorData> = {
  "elevage-avicole": {
    id: "elevage",
    slug: "elevage-avicole",
    problems: [
      { title: "غشاء حيوي مستمر على الأسطح المسامية", description: "تطور الجدران الخرسانية، والأرضيات الإسمنتية، والمعدات المعدنية غشاءً حيوياً بكتيرياً بين كل دورة تربية. هذا الغشاء يحمي مسببات الأمراض من المطهرات التقليدية." },
      { title: "تلوث شبكات مياه الشرب", description: "تتراكم الترسبات الكلسية والرواسب العضوية والغشاء الحيوي في الأنابيب، مما يخلق خزاناً لبكتيريا القولون البرازية والإشريكية القولونية والسالمونيلا التي تلوث كل دفعة من المياه الموزعة." },
      { title: "الضغط الميكروبي الهوائي والأمونيا", description: "الأمونيا المنبعثة من الفرشة تهاجم الأغشية المخاطية التنفسية للدواجن. بعد تجاوز 25 جزء في المليون, ينخفض الأداء وتتضاعف أمراض الجهاز التنفسي." }
    ],
    economicRisks: [
      { title: "زيادة معدل النفوق", impact: "تصل إلى +8% من الوفيات لكل دورة على الأسطح غير المعالجة بعمق." },
      { title: "تدهور مؤشر استهلاك العلف", impact: "شبكة المياه الملوثة تزيد من مؤشر استهلاك العلف بنسبة 10 إلى 15%، أي فقدان آلاف الدنانير في كل دورة." },
      { title: "انخفاض الأداء الحيواني", impact: "الأمونيا تقلل من متوسط النمو اليومي بنسبة 12% وتزيد من أمراض الجهاز التنفسي." }
    ],
    minimalProtocol: [
      { product: "CLORAGRO", action: "التنظيف الفني", description: "تدمير الغشاء الحيوي العضوي على جميع أسطح المبنى. التطبيق بالرغوة، وقت التلامس 20 دقيقة." },
      { product: "شطف عالي الضغط", action: "الشطف بالضغط العالي", description: "الإزالة الميكانيكية للرواسب والمنظفات. السطح النظيف بصرياً إلزامي." },
      { product: "OPTIMAGRO", action: "التطهير البيولوجي", description: "تطهير نهائي كامل الطيف. مضاد للبكتيريا، الفيروسات، والفطريات. بقاء المفعول لمدة 7 أيام." }
    ],
    reinforcedProtocol: [
      { product: "BIONET", action: "تنظيف الأنابيب", description: "تجريد الرواسب العضوية والترسبات الكلسية في شبكات المياه قبل إدخال الحيوانات." },
      { product: "AQUACONTROL", action: "المعالجة المستمرة للمياه", description: "الاستقرار البكتريولوجي لمياه الشرب طوال دورة التربية." },
      { product: "AIRSAN", action: "تطهير الأجواء", description: "تبخير دقيق بوجود الحيوانات لتقليل العبء الميكروبي الجوي والأمونيا." }
    ],
    specificCases: [
      { title: "دورة جديدة بعد تلوث السالمونيلا", description: "En cas de détection Salmonella sur le lot précédent, le protocole est renforcé.", protocol: "Double passage CLORAGRO + OPTIMAGRO en augmentant les concentrations de 30%. Analyse microbiologique de contrôle avant mise en place." },
      { title: "التربية في مناخ حار (>35 درجة مئوية)", description: "درجات الحرارة المرتفعة تسرع التكاثر البكتيري وتدهور المياه.", protocol: "AQUACONTROL بجرعة معززة + AIRSAN يومياً. مراقبة درجة الحموضة والكلور المتبقي." },
      { title: "تدقيق الأمن الحيوي المخطط", description: "التحضير لتدقيقات الامتثال الصحي.", protocol: "البروتوكول الأساسي الكامل + أخذ عينات من الأسطح قبل التدقيق مع التحليل في مختبر N2K." }
    ],
    associatedProducts: ["cloragro", "optimagro", "bionet", "aquacontrol", "airsan", "bioactive"],
    expectedResults: [
      "تقليل معدل النفوق من 3 إلى 5 نقاط لكل دورة",
      "تحسين مؤشر استهلاك العلف بنسبة 5 إلى 10%",
      "تقليل الأمونيا تحت عتبة 20 جزء في المليون",
      "الامتثال الميكروبيولوجي للأسطح < 10 وحدة تشكيل مستعمرة/سم²",
      "مياه الشرب متوافقة مع العتبات التنظيمية"
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
      { product: "ALCOSEPT PRO", action: "التطهير السريع", description: "تطهير وسيط بدون شطف للناقلات وأدوات التقطيع والموازين." },
      { product: "OXYLIS HOCl", action: "معالجة مياه التصنيع", description: "تطهير مستمر وتثبيت ميكروبيولوجي لمياه التصنيع." },
      { product: "OXYLIS HOCl", action: "تطهير الأحجام", description: "تبخير هوائي مستمر للغرف الباردة ضد السالمونيلا والليستيريا." }
    ],
    specificCases: [
      { title: "اكتشاف الليستيريا في الغرفة الباردة", description: "تأكيد التلوث من خلال التحليل في الغرفة الباردة أو منطقة التخزين.", protocol: "تنظيف معزز بـ CLORAGRO + OPTIMAGRO بتركيز زائد. تبخير مستمر باستخدام OXYLIS HOCl. عينات مراقبة في اليوم الثالث." },
      { title: "التحضير لتدقيق IFS/BRC", description: "التحضير للامتثال قبل تدقيق الشهادات الدولية.", protocol: "بروتوكول كامل على مدار 48 ساعة + مسحات سطحية 72 ساعة قبل التدقيق + تقرير ميكروبيولوجي موثق." }
    ],
    associatedProducts: ["cloragro", "optimagro", "alcosept-pro", "oxylis-hoci"],
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
      { product: "OXYLIS HOCl", action: "تطهير CIP", description: "تطهير في دورة مغلقة (CIP) لخطوط الإنتاج بدون مخلفات." },
      { product: "OPTIMAGRO", action: "التطهير النهائي", description: "تطهير جميع الأسطح بعد التنظيف. طيف كامل." }
    ],
    reinforcedProtocol: [
      { product: "ALCOSEPT PRO", action: "تطهير الأسطح", description: "تطهير سريع بدون شطف للناقلات ومعدات الوزن." },
      { product: "OXYLIS HOCl", action: "معالجة مياه التصنيع", description: "التثبيت الميكروبيولوجي المستمر للمياه المستخدمة في الإنتاج." },
      { product: "OXYLIS HOCl", action: "معالجة الجو العام", description: "تبخير مستمر لمناطق التعبئة والتغليف." }
    ],
    specificCases: [
      { title: "تلوث الليستيريا في منطقة التعبئة", description: "اكتشاف الليستيريا على الأسطح أو في هواء منطقة التعبئة.", protocol: "توقف الخط، تنظيف مكثف بـ CLORAGRO، تطهير معزز بـ OPTIMAGRO، تبخير مستمر بـ OXYLIS HOCl. مسحات المراقبة قبل الاستئناف." },
      { title: "تدقيق IFS/BRC وشيك", description: "تحضير سريع لتدقيقات الشهادات.", protocol: "بروتوكول معزز كامل 72 ساعة قبل التدقيق. توثيق كامل للإجراءات والجرعات والنتائج. توفير تقرير ميكروبيولوجي." }
    ],
    associatedProducts: ["cloragro", "optimagro", "alcosept-pro", "oxylis-hoci"],
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
`;

fs.writeFileSync('src/data/sectors-pages.ts', fileContent);
