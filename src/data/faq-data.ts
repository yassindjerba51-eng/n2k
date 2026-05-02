export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  metaTitle: string;
  metaDesc: string;
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  faqBadge: string;
  faqTitle: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  items: FAQItem[];
}

export const faqDataFr: FAQData = {
  metaTitle: "FAQ — Questions Fréquentes | Les Laboratoires N2K",
  metaDesc: "Réponses aux questions les plus fréquentes sur nos protocoles de maîtrise sanitaire, nos produits et notre méthodologie.",
  heroBadge: "FAQ",
  heroTitle: "Questions fréquentes",
  heroDesc: "Les réponses aux questions que nos partenaires nous posent le plus souvent sur les protocoles, les produits et notre méthodologie.",
  faqBadge: "Protocoles & Produits",
  faqTitle: "Ce que vous devez savoir",
  ctaTitle: "Votre question n'est pas ici ?",
  ctaDesc: "Contactez nos experts pour une réponse personnalisée à votre situation terrain.",
  ctaButton: "Contacter un expert",
  items: [
    {
      question: "Pourquoi un simple désinfectant ne suffit-il pas ?",
      answer: "Un désinfectant appliqué directement sur un biofilm ou une surface souillée est neutralisé par la matière organique avant d'atteindre les pathogènes. C'est pourquoi le protocole N2K impose un nettoyage technique préalable (Phase 01 — CLORAGRO) avant toute désinfection (Phase 02 — OPTIMAGRO). L'ordre séquentiel est la clé de l'efficacité."
    },
    {
      question: "Quelle est la différence entre nettoyage et désinfection ?",
      answer: "Le nettoyage (détergence) élimine les souillures visibles : graisses, protéines, biofilm, dépôts organiques. La désinfection détruit les micro-organismes pathogènes sur une surface déjà propre. Sans nettoyage préalable, la désinfection est inefficace car le désinfectant est consommé par la matière organique résiduelle."
    },
    {
      question: "Combien de temps dure un protocole complet ?",
      answer: "Un protocole complet de nettoyage-désinfection prend entre 4 et 8 heures selon la taille de l'installation. Phase 01 (CLORAGRO) : 20 minutes de temps de contact + rinçage. Temps de séchage. Phase 02 (OPTIMAGRO) : 30 minutes de temps de contact minimum. Le protocole est réalisable pendant un vide sanitaire standard de 48h."
    },
    {
      question: "Vos produits sont-ils compatibles avec les animaux en présence ?",
      answer: "AIRSAN est spécifiquement formulé pour être utilisé en présence d'animaux lors de la nébulisation. AQUACONTROL est conçu pour le traitement continu de l'eau de boisson. En revanche, CLORAGRO et OPTIMAGRO sont des produits de vide sanitaire qui doivent être utilisés en absence d'animaux, avec un rinçage obligatoire et un temps de séchage avant mise en place."
    },
    {
      question: "Comment contrôlez-vous l'ammoniac dans les bâtiments ?",
      answer: "L'ammoniac est principalement produit par la dégradation de l'acide urique dans les litières. AIRSAN réduit la charge microbienne responsable de cette dégradation, ce qui diminue mécaniquement la production d'ammoniac. L'objectif est de maintenir le taux sous 20 ppm. Un nettoyage technique régulier avec CLORAGRO entre les cycles complète le dispositif."
    },
    {
      question: "Quelles sont les normes de vos produits biocides ?",
      answer: "Nos produits biocides sont homologués MS/DHMPE en Tunisie. Ils sont testés selon les normes européennes EN 1276 (bactéricidie), EN 13697 (surfaces), EN 1650 (fongicidie) et EN 14476 (virucide). Classification biocide TP2 (désinfection surfaces), TP3 (hygiène vétérinaire), TP4 (surfaces alimentaires). Les fiches de données de sécurité (FDS) sont disponibles sur demande."
    },
    {
      question: "Proposez-vous un accompagnement terrain ?",
      answer: "Oui. L'accompagnement terrain est au cœur de notre démarche. Nos experts se déplacent sur votre exploitation pour : un audit initial (prélèvements, analyse des points critiques), la formation de vos équipes au protocole, le suivi post-application avec analyses de contrôle, et l'ajustement des dosages selon les résultats. Nous ne vendons pas de produits sans accompagnement."
    },
    {
      question: "Quelle est la fréquence recommandée des traitements ?",
      answer: "En élevage avicole : protocole complet (CLORAGRO + OPTIMAGRO) à chaque vide sanitaire. AQUACONTROL en continu sur l'eau de boisson. AIRSAN en nébulisation hebdomadaire en présence d'animaux. En abattoir : nettoyage quotidien CLORAGRO + OPTIMAGRO sur les surfaces de contact. En IAA : fréquence adaptée au plan HACCP de l'établissement."
    }
  ]
};

export const faqDataEn: FAQData = {
  metaTitle: "FAQ — Frequently Asked Questions | Les Laboratoires N2K",
  metaDesc: "Answers to the most frequently asked questions about our sanitary mastery protocols, products, and methodology.",
  heroBadge: "FAQ",
  heroTitle: "Frequently Asked Questions",
  heroDesc: "Answers to the questions our partners ask most often about protocols, products, and our methodology.",
  faqBadge: "Protocols & Products",
  faqTitle: "What you need to know",
  ctaTitle: "Your question isn't here?",
  ctaDesc: "Contact our experts for a personalized response to your field situation.",
  ctaButton: "Contact an expert",
  items: [
    {
      question: "Why isn't a simple disinfectant enough?",
      answer: "A disinfectant applied directly to a biofilm or a soiled surface is neutralized by organic matter before reaching pathogens. This is why the N2K protocol requires prior technical cleaning (Phase 01 — CLORAGRO) before any disinfection (Phase 02 — OPTIMAGRO). The sequential order is the key to efficiency."
    },
    {
      question: "What is the difference between cleaning and disinfection?",
      answer: "Cleaning (detergency) removes visible soils: fats, proteins, biofilm, organic deposits. Disinfection destroys pathogenic microorganisms on an already clean surface. Without prior cleaning, disinfection is ineffective because the disinfectant is consumed by residual organic matter."
    },
    {
      question: "How long does a complete protocol take?",
      answer: "A complete cleaning-disinfection protocol takes between 4 and 8 hours depending on the size of the facility. Phase 01 (CLORAGRO): 20 minutes of contact time + rinsing. Drying time. Phase 02 (OPTIMAGRO): 30 minutes minimum contact time. The protocol is achievable during a standard 48h sanitary break."
    },
    {
      question: "Are your products compatible with animals present?",
      answer: "AIRSAN is specifically formulated to be used in the presence of animals during nebulization. AQUACONTROL is designed for continuous treatment of drinking water. On the other hand, CLORAGRO and OPTIMAGRO are sanitary break products that must be used in the absence of animals, with mandatory rinsing and drying time before placement."
    },
    {
      question: "How do you control ammonia in buildings?",
      answer: "Ammonia is mainly produced by the degradation of uric acid in litter. AIRSAN reduces the microbial load responsible for this degradation, which mechanically decreases ammonia production. The objective is to keep the rate below 20 ppm. Regular technical cleaning with CLORAGRO between cycles completes the setup."
    },
    {
      question: "What are the standards for your biocidal products?",
      answer: "Our biocidal products are approved by MS/DHMPE in Tunisia. They are tested according to European standards EN 1276 (bactericidal), EN 13697 (surfaces), EN 1650 (fungicidal) and EN 14476 (virucidal). Biocide classification TP2 (surface disinfection), TP3 (veterinary hygiene), TP4 (food surfaces). Safety Data Sheets (SDS) are available on request."
    },
    {
      question: "Do you offer field support?",
      answer: "Yes. Field support is at the heart of our approach. Our experts visit your farm for: an initial audit (sampling, critical point analysis), training your teams in the protocol, post-application follow-up with control analyzes, and dosage adjustment according to the results. We do not sell products without support."
    },
    {
      question: "What is the recommended frequency of treatments?",
      answer: "In poultry farming: complete protocol (CLORAGRO + OPTIMAGRO) at each sanitary break. AQUACONTROL continuously on drinking water. AIRSAN in weekly nebulization in the presence of animals. In slaughterhouses: daily cleaning CLORAGRO + OPTIMAGRO on contact surfaces. In the food industry: frequency adapted to the establishment's HACCP plan."
    }
  ]
};

export const faqDataAr: FAQData = {
  metaTitle: "الأسئلة الشائعة | مختبرات N2K",
  metaDesc: "إجابات على الأسئلة الأكثر شيوعًا حول بروتوكولاتنا الخاصة بالتحكم الصحي، منتجاتنا ومنهجيتنا.",
  heroBadge: "الأسئلة الشائعة",
  heroTitle: "الأسئلة المتداولة",
  heroDesc: "إجابات على الأسئلة التي يطرحها شركاؤنا في أغلب الأحيان حول البروتوكولات، المنتجات، ومنهجيتنا.",
  faqBadge: "البروتوكولات والمنتجات",
  faqTitle: "ما يجب أن تعرفه",
  ctaTitle: "سؤالك ليس هنا؟",
  ctaDesc: "اتصل بخبرائنا للحصول على إجابة مخصصة لظروفك الميدانية.",
  ctaButton: "اتصل بخبير",
  items: [
    {
      question: "لماذا لا يكفي المطهر البسيط؟",
      answer: "المطهر الذي يتم تطبيقه مباشرة على غشاء حيوي أو سطح متسخ يتم تحييده بواسطة المادة العضوية قبل الوصول إلى مسببات الأمراض. ولهذا السبب يفرض بروتوكول N2K تنظيفًا فنيًا مسبقًا (المرحلة 01 - CLORAGRO) قبل أي تطهير (المرحلة 02 - OPTIMAGRO). الترتيب التسلسلي هو مفتاح الفعالية."
    },
    {
      question: "ما الفرق بين التنظيف والتطهير؟",
      answer: "التنظيف يزيل الأوساخ المرئية: الدهون، البروتينات، الغشاء الحيوي، الرواسب العضوية. التطهير يدمر الكائنات الحية الدقيقة المسببة للأمراض على سطح نظيف بالفعل. بدون تنظيف مسبق، يكون التطهير غير فعال لأن المادة العضوية المتبقية تستهلك المطهر."
    },
    {
      question: "كم يستغرق البروتوكول الكامل؟",
      answer: "يستغرق بروتوكول التنظيف والتطهير الكامل بين 4 و 8 ساعات حسب حجم المنشأة. المرحلة 01 (CLORAGRO): 20 دقيقة من وقت التلامس + الشطف. وقت التجفيف. المرحلة 02 (OPTIMAGRO): 30 دقيقة وقت تلامس كحد أدنى. يمكن تنفيذ البروتوكول خلال فترة راحة صحية قياسية تبلغ 48 ساعة."
    },
    {
      question: "هل منتجاتكم متوافقة مع وجود الحيوانات؟",
      answer: "تمت صياغة AIRSAN خصيصًا للاستخدام في وجود الحيوانات أثناء التبخير. تم تصميم AQUACONTROL للمعالجة المستمرة لمياه الشرب. من ناحية أخرى، تعتبر CLORAGRO و OPTIMAGRO منتجات فترة الراحة الصحية والتي يجب استخدامها في غياب الحيوانات، مع إلزامية الشطف ووقت التجفيف قبل الإدخال."
    },
    {
      question: "كيف تتحكمون في الأمونيا داخل المباني؟",
      answer: "يتم إنتاج الأمونيا بشكل أساسي عن طريق تحلل حمض اليوريك في الفرشة. يقلل AIRSAN من العبء الميكروبي المسؤول عن هذا التحلل، مما يقلل ميكانيكيًا من إنتاج الأمونيا. الهدف هو إبقاء المعدل أقل من 20 جزء في المليون. يكتمل النظام بتنظيف فني منتظم باستخدام CLORAGRO بين الدورات."
    },
    {
      question: "ما هي معايير منتجاتكم المبيدة للجراثيم؟",
      answer: "منتجاتنا المبيدة للجراثيم معتمدة من MS/DHMPE في تونس. تم اختبارها وفقًا للمعايير الأوروبية EN 1276 (مبيد للجراثيم) ، EN 13697 (أسطح) ، EN 1650 (مبيد للفطريات) و EN 14476 (مبيد للفيروسات). تصنيف المبيدات الحيوية TP2 (تطهير الأسطح) ، TP3 (النظافة البيطرية) ، TP4 (الأسطح الغذائية). صحائف بيانات السلامة (FDS) متاحة عند الطلب."
    },
    {
      question: "هل تقدمون دعمًا ميدانيًا؟",
      answer: "نعم. الدعم الميداني هو في صميم نهجنا. يزور خبراؤنا مزرعتك من أجل: التدقيق الأولي (أخذ العينات، تحليل النقاط الحرجة)، تدريب فرقك على البروتوكول، المتابعة بعد التطبيق مع تحليلات المراقبة، وتعديل الجرعات وفقًا للنتائج. نحن لا نبيع المنتجات دون دعم."
    },
    {
      question: "ما هو التكرار الموصى به للعلاجات؟",
      answer: "في تربية الدواجن: بروتوكول كامل (CLORAGRO + OPTIMAGRO) في كل فترة راحة صحية. AQUACONTROL بشكل مستمر على مياه الشرب. AIRSAN في التبخير الأسبوعي بوجود الحيوانات. في المسالخ: تنظيف يومي CLORAGRO + OPTIMAGRO على أسطح التلامس. في الصناعات الغذائية: تكرار يتكيف مع خطة الهاسب (HACCP) للمؤسسة."
    }
  ]
};

export const getFaqData = (locale: string): FAQData => {
  if (locale === "en") return faqDataEn;
  if (locale === "ar") return faqDataAr;
  return faqDataFr;
};
