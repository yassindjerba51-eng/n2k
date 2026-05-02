const fs = require('fs');

const translations = {
  fr: {
    cloragro: {
      problem: "Les biofilms résistants, graisses, et protéines incrustés empêchent la désinfection finale d'agir sur les pathogènes.",
      where: "Bâtiments d'élevage avicole (Phase 01), Abattoirs (Quotidien), Industrie agroalimentaire (hors contact direct).",
      how: "Application moussante ou pulvérisation. S'applique en premier. Matériel : canon à mousse, groupe haute pression.",
      why: "Formule alcaline chlorée moussante avec inhibiteur de corrosion. Détruit la matrice protectrice du biofilm.",
      results: "Surfaces nues, décapées, prêtes pour la désinfection biocide finale.",
      contactTime: "15 à 20 minutes minimum",
      rinsing: "Obligatoire et abondant à l'eau potable avant toute étape ultérieure.",
      aeration: "Ventilation pendant l'application recommandée.",
      compliance: "Homologué MS/DHMPE/HOM/0002/03/01/2023. Incompatible avec les acides.",
      whenAlone: "Pour le nettoyage de maintenance où la pression microbienne est faible.",
      whenComplete: "Toujours suivi d'un rinçage puis d'OPTIMAGRO pour une désinfection totale.",
      whenNot: "Ne jamais utiliser en présence d'animaux ou sur des surfaces en contact direct non rincées."
    },
    optimagro: {
      problem: "Pathogènes résiduels (Salmonella, Campylobacter, Listeria, virus) survivant au nettoyage.",
      where: "Bâtiments d'élevage avicole (Phase 02), Abattoirs, Industrie agroalimentaire.",
      how: "Pulvérisation ou nébulisation après rinçage complet des surfaces.",
      why: "Action synergique Glutaraldéhyde + Ammoniums quaternaires. Spectre complet bactéricide, virucide, fongicide.",
      results: "Éradication totale des pathogènes. Rémanence prolongée jusqu'à 7 jours.",
      contactTime: "15 à 30 minutes",
      rinsing: "Obligatoire si les surfaces entrent en contact avec les denrées. Incompatible avec le chlore.",
      aeration: "4h minimum avant réintroduction des animaux. Ventilation obligatoire en agroalimentaire.",
      compliance: "Homologué MS/DHMPE/HOM/0001/03/01/2023. TP2, TP3, TP4.",
      whenAlone: "Uniquement sur des surfaces préalablement nettoyées et parfaitement rincées.",
      whenComplete: "Nécessite impérativement CLORAGRO en Phase 01 pour une action efficace.",
      whenNot: "Ne jamais appliquer sur des résidus chlorés (risque toxique) ou en présence d'animaux/denrées."
    },
    bionet: {
      problem: "Accumulation de tartre, dépôts minéraux et biofilm bactérien dans les lignes d'abreuvement.",
      where: "Circuits d'eau, pipettes, nipples (Élevage avicole uniquement).",
      how: "Traitement choc (1% à 3%) en vide sanitaire. Laisser agir dans les canalisations.",
      why: "Dissout les minéraux et déstructure le biofilm interne. Prévient les fuites de pipettes.",
      results: "Débit d'eau restauré, élimination des nids bactériens internes.",
      contactTime: "12 à 24 heures",
      rinsing: "Rinçage complet et abondant sous pression de chaque ligne obligatoire.",
      aeration: "Non applicable.",
      compliance: "Réservé exclusivement à l'élevage avicole.",
      whenAlone: "Pour le détartrage périodique en vide sanitaire.",
      whenComplete: "À relayer par AQUACONTROL en continu lors de la mise en place des animaux.",
      whenNot: "Ne jamais utiliser en présence des animaux. Ne pas utiliser en abattoir ou IAA."
    },
    aquacontrol: {
      problem: "Contamination continue de l'eau de boisson et multiplication microbienne en bout de ligne.",
      where: "Systèmes d'abreuvement continu (Élevage avicole uniquement).",
      how: "Dosage continu (0,1%) via pompe doseuse pendant la présence des animaux.",
      why: "Stabilisation bactériologique constante sans altérer l'appétence de l'eau.",
      results: "Baisse de la mortalité, eau saine jusqu'à la dernière pipette, amélioration de l'IC.",
      contactTime: "Action continue",
      rinsing: "Non applicable (consommé par les animaux).",
      aeration: "Non applicable.",
      compliance: "Réservé exclusivement à l'élevage avicole.",
      whenAlone: "Pour la maintenance quotidienne d'une ligne saine.",
      whenComplete: "Nécessite un nettoyage préalable des lignes au BIONET pour une pleine efficacité.",
      whenNot: "Ne pas surdoser. Ne pas utiliser en abattoir ou IAA."
    },
    airsan: {
      problem: "Charge ammoniacale élevée et germes aérosolisés causant des troubles respiratoires.",
      where: "Ambiance des bâtiments d'élevage (Élevage avicole uniquement).",
      how: "Nébulisation aérienne ultra-fine (1 ml/m³).",
      why: "Action neutralisante sur l'ammoniac et abattement des poussières porteuses de germes.",
      results: "Air respirable, stress animal réduit, prévention des pathologies respiratoires.",
      contactTime: "Immédiat",
      rinsing: "Non applicable.",
      aeration: "Ventilation normale du bâtiment.",
      compliance: "Sûr pour une utilisation en présence des animaux. Réservé à l'élevage avicole.",
      whenAlone: "Pour améliorer rapidement le confort respiratoire en cas de pic d'ammoniac.",
      whenComplete: "S'intègre dans le suivi global du lot.",
      whenNot: "Ne jamais mouiller directement les animaux ou la litière. Ne pas utiliser en abattoir ou IAA."
    },
    bioactive: {
      problem: "Matière organique tenace (graisses, protéines) incrustée sur les équipements.",
      where: "Surfaces et équipements fortement chargés (Élevage avicole uniquement).",
      how: "Nettoyage enzymatique en complément du vide sanitaire (5% à 10%).",
      why: "Les enzymes digèrent spécifiquement la matière organique complexe.",
      results: "Surfaces parfaitement dégraissées et prêtes pour la désinfection.",
      contactTime: "20 à 30 minutes",
      rinsing: "Rinçage à haute pression obligatoire.",
      aeration: "Non applicable.",
      compliance: "Réservé à l'élevage avicole.",
      whenAlone: "Pour les nettoyages d'équipements très encrassés.",
      whenComplete: "À utiliser avec ou après CLORAGRO pour optimiser la préparation des surfaces.",
      whenNot: "Ne jamais utiliser en nébulisation. Ne pas utiliser en abattoir ou IAA."
    }
  },
  en: {
    cloragro: {
      problem: "Resistant biofilms, fats, and encrusted proteins prevent final disinfection from reaching pathogens.",
      where: "Poultry farming buildings (Phase 01), Slaughterhouses (Daily), Food industry (non-direct contact).",
      how: "Foam application or spraying. Applied first. Equipment: foam cannon, high-pressure washer.",
      why: "Foaming alkaline chlorinated formula with corrosion inhibitor. Destroys the biofilm's protective matrix.",
      results: "Bare, stripped surfaces, ready for final biocidal disinfection.",
      contactTime: "Minimum 15 to 20 minutes",
      rinsing: "Mandatory and abundant with drinking water before any subsequent step.",
      aeration: "Ventilation recommended during application.",
      compliance: "Approved MS/DHMPE/HOM/0002/03/01/2023. Incompatible with acids.",
      whenAlone: "For maintenance cleaning where microbial pressure is low.",
      whenComplete: "Always followed by rinsing then OPTIMAGRO for complete disinfection.",
      whenNot: "Never use in the presence of animals or on unrinsed direct contact surfaces."
    },
    optimagro: {
      problem: "Residual pathogens (Salmonella, Campylobacter, Listeria, viruses) surviving cleaning.",
      where: "Poultry farming buildings (Phase 02), Slaughterhouses, Food industry.",
      how: "Spraying or nebulization after complete rinsing of surfaces.",
      why: "Synergistic action Glutaraldehyde + Quaternary ammoniums. Full-spectrum bactericidal, virucidal, fungicidal.",
      results: "Total eradication of pathogens. Extended residual effect up to 7 days.",
      contactTime: "15 to 30 minutes",
      rinsing: "Mandatory if surfaces come into contact with food. Incompatible with chlorine.",
      aeration: "Minimum 4h before reintroducing animals. Mandatory ventilation in food industry.",
      compliance: "Approved MS/DHMPE/HOM/0001/03/01/2023. TP2, TP3, TP4.",
      whenAlone: "Only on surfaces previously cleaned and perfectly rinsed.",
      whenComplete: "Strictly requires CLORAGRO in Phase 01 for effective action.",
      whenNot: "Never apply on chlorinated residues (toxic risk) or in the presence of animals/food."
    },
    bionet: {
      problem: "Accumulation of scale, mineral deposits, and bacterial biofilm in drinking lines.",
      where: "Water circuits, pipettes, nipples (Poultry farming only).",
      how: "Shock treatment (1% to 3%) during sanitary void. Leave to act in pipes.",
      why: "Dissolves minerals and breaks down internal biofilm. Prevents pipette leaks.",
      results: "Restored water flow, elimination of internal bacterial nests.",
      contactTime: "12 to 24 hours",
      rinsing: "Complete and abundant pressure rinsing of each line is mandatory.",
      aeration: "Not applicable.",
      compliance: "Exclusively reserved for poultry farming.",
      whenAlone: "For periodic descaling during sanitary void.",
      whenComplete: "To be followed by continuous AQUACONTROL when animals are placed.",
      whenNot: "Never use in the presence of animals. Do not use in slaughterhouses or food industry."
    },
    aquacontrol: {
      problem: "Continuous contamination of drinking water and microbial multiplication at the end of the line.",
      where: "Continuous drinking systems (Poultry farming only).",
      how: "Continuous dosing (0.1%) via dosing pump while animals are present.",
      why: "Constant bacteriological stabilization without altering water palatability.",
      results: "Reduced mortality, safe water to the last pipette, improved FCR.",
      contactTime: "Continuous action",
      rinsing: "Not applicable (consumed by animals).",
      aeration: "Not applicable.",
      compliance: "Exclusively reserved for poultry farming.",
      whenAlone: "For daily maintenance of a clean line.",
      whenComplete: "Requires prior cleaning of lines with BIONET for full effectiveness.",
      whenNot: "Do not overdose. Do not use in slaughterhouses or food industry."
    },
    airsan: {
      problem: "High ammonia load and aerosolized germs causing respiratory issues.",
      where: "Atmosphere of livestock buildings (Poultry farming only).",
      how: "Ultra-fine aerial nebulization (1 ml/m³).",
      why: "Neutralizing action on ammonia and reduction of germ-carrying dust.",
      results: "Breathable air, reduced animal stress, prevention of respiratory pathologies.",
      contactTime: "Immediate",
      rinsing: "Not applicable.",
      aeration: "Normal building ventilation.",
      compliance: "Safe for use in the presence of animals. Reserved for poultry farming.",
      whenAlone: "To quickly improve respiratory comfort during an ammonia peak.",
      whenComplete: "Integrates into the overall batch monitoring.",
      whenNot: "Never spray directly on animals or wet the litter. Do not use in slaughterhouses or food industry."
    },
    bioactive: {
      problem: "Stubborn organic matter (fats, proteins) encrusted on equipment.",
      where: "Heavily loaded surfaces and equipment (Poultry farming only).",
      how: "Enzymatic cleaning complementing sanitary void (5% to 10%).",
      why: "Enzymes specifically digest complex organic matter.",
      results: "Perfectly degreased surfaces ready for disinfection.",
      contactTime: "20 to 30 minutes",
      rinsing: "Mandatory high-pressure rinsing.",
      aeration: "Not applicable.",
      compliance: "Reserved for poultry farming.",
      whenAlone: "For cleaning heavily soiled equipment.",
      whenComplete: "To be used with or after CLORAGRO to optimize surface preparation.",
      whenNot: "Never use in nebulization. Do not use in slaughterhouses or food industry."
    }
  },
  ar: {
    cloragro: {
      problem: "البيوفيلم المقاوم، الدهون، والبروتينات المتراكمة تمنع التطهير النهائي من الوصول إلى مسببات الأمراض.",
      where: "مباني تربية الدواجن (المرحلة 01)، المسالخ (يومياً)، الصناعة الغذائية (الأسطح غير الملامسة مباشرة).",
      how: "تطبيق رغوي أو رش. يطبق أولاً. المعدات: مدفع رغوة، مضخة ضغط عالي.",
      why: "تركيبة قلوية كلورية رغوية مع مثبط للتآكل. تدمر المصفوفة الواقية للبيوفيلم.",
      results: "أسطح عارية، مكشوطة، جاهزة للتطهير الحيوي النهائي.",
      contactTime: "15 إلى 20 دقيقة كحد أدنى",
      rinsing: "إلزامي ووفير بالماء الصالح للشرب قبل أي خطوة تالية.",
      aeration: "يوصى بالتهوية أثناء التطبيق.",
      compliance: "معتمد MS/DHMPE/HOM/0002/03/01/2023. غير متوافق مع الأحماض.",
      whenAlone: "لتنظيف الصيانة حيث يكون الضغط الميكروبي منخفضاً.",
      whenComplete: "يتبعه دائماً شطف ثم OPTIMAGRO لتطهير كامل.",
      whenNot: "لا يستخدم أبداً في حضور الحيوانات أو على أسطح ملامسة مباشرة غير مشطوفة."
    },
    optimagro: {
      problem: "مسببات الأمراض المتبقية (السالمونيلا، العطيفة، الليستيريا، الفيروسات) التي تنجو من التنظيف.",
      where: "مباني تربية الدواجن (المرحلة 02)، المسالخ، الصناعة الغذائية.",
      how: "رش أو تضبيب بعد الشطف الكامل للأسطح.",
      why: "عمل تآزري بين الغلوتارالدهيد والأمونيوم الرباعي. واسع الطيف: مبيد للبكتيريا، للفيروسات، للفطريات.",
      results: "القضاء التام على مسببات الأمراض. فعالية ممتدة حتى 7 أيام.",
      contactTime: "15 إلى 30 دقيقة",
      rinsing: "إلزامي إذا لامست الأسطح الأغذية. غير متوافق مع الكلور.",
      aeration: "4 ساعات كحد أدنى قبل إعادة الحيوانات. تهوية إلزامية في الصناعة الغذائية.",
      compliance: "معتمد MS/DHMPE/HOM/0001/03/01/2023. الفئات TP2, TP3, TP4.",
      whenAlone: "فقط على الأسطح المنظفة والمشطوفة تماماً.",
      whenComplete: "يتطلب بشكل صارم CLORAGRO في المرحلة 01 لفعالية تامة.",
      whenNot: "لا يطبق أبداً على بقايا كلورية (خطر سام) أو في حضور الحيوانات/الأغذية."
    },
    bionet: {
      problem: "تراكم الترسبات، الرواسب المعدنية، والبيوفيلم البكتيري في خطوط الشرب.",
      where: "دوائر المياه، الماصات (الحلمات) (للدواجن فقط).",
      how: "معالجة صدمية (1% إلى 3%) خلال الفراغ الصحي. يترك ليتفاعل داخل الأنابيب.",
      why: "يذيب المعادن ويفكك البيوفيلم الداخلي. يمنع تسرب الحلمات.",
      results: "استعادة تدفق المياه، القضاء على الأعشاش البكتيرية الداخلية.",
      contactTime: "12 إلى 24 ساعة",
      rinsing: "شطف كامل ووفير تحت الضغط لكل خط إلزامي.",
      aeration: "غير مطبق.",
      compliance: "مخصص حصرياً لتربية الدواجن.",
      whenAlone: "لإزالة الترسبات الدورية خلال الفراغ الصحي.",
      whenComplete: "يُتبع بـ AQUACONTROL المستمر عند وضع الحيوانات.",
      whenNot: "لا يستخدم أبداً في حضور الحيوانات. لا يستخدم في المسالخ أو الصناعة الغذائية."
    },
    aquacontrol: {
      problem: "التلوث المستمر لمياه الشرب والتكاثر الميكروبي في نهاية الخط.",
      where: "أنظمة الشرب المستمرة (للدواجن فقط).",
      how: "جرعة مستمرة (0.1%) عبر مضخة جرعات أثناء وجود الحيوانات.",
      why: "تثبيت بكتيريولوجي ثابت دون تغيير استساغة الماء.",
      results: "انخفاض النفوق، ماء آمن حتى آخر حلمة، تحسين معدل التحويل.",
      contactTime: "عمل مستمر",
      rinsing: "غير مطبق (تستهلكه الحيوانات).",
      aeration: "غير مطبق.",
      compliance: "مخصص حصرياً لتربية الدواجن.",
      whenAlone: "للصيانة اليومية لخط سليم.",
      whenComplete: "يتطلب تنظيفاً مسبقاً للخطوط بـ BIONET لتحقيق الفعالية الكاملة.",
      whenNot: "لا تتجاوز الجرعة. لا يستخدم في المسالخ أو الصناعة الغذائية."
    },
    airsan: {
      problem: "عبء عالٍ من الأمونياك وجراثيم محمولة جواً تسبب مشاكل تنفسية.",
      where: "جو مباني التربية (للدواجن فقط).",
      how: "تضبيب هوائي دقيق للغاية (1 مل/م³).",
      why: "عمل معادل للأمونياك وتقليل الغبار الحامل للجراثيم.",
      results: "هواء قابل للتنفس، تقليل إجهاد الحيوان، الوقاية من الأمراض التنفسية.",
      contactTime: "فوري",
      rinsing: "غير مطبق.",
      aeration: "التهوية العادية للمبنى.",
      compliance: "آمن للاستخدام في حضور الحيوانات. مخصص لتربية الدواجن.",
      whenAlone: "لتحسين الراحة التنفسية بسرعة في حالة ذروة الأمونياك.",
      whenComplete: "يندمج في المتابعة الشاملة للدورة.",
      whenNot: "لا ترش الحيوانات مباشرة أو تبلل الفرشة أبداً. لا يستخدم في المسالخ أو الصناعة الغذائية."
    },
    bioactive: {
      problem: "مادة عضوية عنيدة (دهون، بروتينات) متراكمة على المعدات.",
      where: "الأسطح والمعدات ذات الحمل العضوي العالي (للدواجن فقط).",
      how: "تنظيف إنزيمي مكمل للفراغ الصحي (5% إلى 10%).",
      why: "تهضم الإنزيمات المادة العضوية المعقدة بشكل خاص.",
      results: "أسطح خالية من الدهون تماماً وجاهزة للتطهير.",
      contactTime: "20 إلى 30 دقيقة",
      rinsing: "شطف إلزامي بضغط عالي.",
      aeration: "غير مطبق.",
      compliance: "مخصص لتربية الدواجن.",
      whenAlone: "لتنظيف المعدات شديدة الاتساخ.",
      whenComplete: "يستخدم مع أو بعد CLORAGRO لتحسين تحضير الأسطح.",
      whenNot: "لا يستخدم أبداً في التضبيب. لا يستخدم في المسالخ أو الصناعة الغذائية."
    }
  }
};

const headings = {
  fr: {
    titles: {
      problem: "Le problème que ce produit résout",
      where: "Où il s'utilise",
      how: "Comment il s'utilise",
      why: "Pourquoi ce produit",
      results: "Résultats attendus",
      contactTime: "Temps de contact exact",
      rinsing: "Rinçage obligatoire",
      aeration: "Aération",
      compliance: "Précautions et conformité",
      whenAlone: "Quand ce produit seul suffit",
      whenComplete: "Quand compléter le protocole",
      whenNot: "Quand ne pas le proposer"
    },
    actions: {
      downloadTechSheet: "Télécharger la Fiche Technique",
      downloadSDS: "Télécharger la Fiche de Données de Sécurité (FDS)"
    }
  },
  en: {
    titles: {
      problem: "The problem this product solves",
      where: "Where it is used",
      how: "How it is used",
      why: "Why this product",
      results: "Expected results",
      contactTime: "Exact contact time",
      rinsing: "Mandatory rinsing",
      aeration: "Aeration",
      compliance: "Precautions and compliance",
      whenAlone: "When this product alone is enough",
      whenComplete: "When to complete the protocol",
      whenNot: "When not to propose it"
    },
    actions: {
      downloadTechSheet: "Download Technical Sheet",
      downloadSDS: "Download Safety Data Sheet (SDS)"
    }
  },
  ar: {
    titles: {
      problem: "المشكلة التي يحلها هذا المنتج",
      where: "أين يستخدم",
      how: "كيف يستخدم",
      why: "لماذا هذا المنتج",
      results: "النتائج المتوقعة",
      contactTime: "وقت التلامس الدقيق",
      rinsing: "الشطف الإلزامي",
      aeration: "التهوية",
      compliance: "الاحتياطات والتوافق",
      whenAlone: "متى يكفي هذا المنتج وحده",
      whenComplete: "متى يجب إكمال البروتوكول",
      whenNot: "متى يجب عدم اقتراحه"
    },
    actions: {
      downloadTechSheet: "تحميل البطاقة التقنية",
      downloadSDS: "تحميل بطاقة بيانات السلامة"
    }
  }
};

['fr', 'en', 'ar'].forEach(locale => {
  const file = 'messages/' + locale + '.json';
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.productDetailBlocks = translations[locale];
  data.productDetailHeadings = headings[locale];
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
});
