export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  items: FAQItem[];
  ctaTitle: string;
  ctaButton: string;
}

const faqData: Record<string, FAQData> = {
  fr: {
    heroTitle: "Questions fréquemment posées",
    heroSubtitle: "Tout ce que vous devez savoir sur nos protocoles de maîtrise sanitaire, nos produits et notre approche terrain.",
    metaTitle: "FAQ — Les Laboratoires N2K",
    metaDescription: "Réponses aux questions fréquentes sur les protocoles de maîtrise sanitaire N2K, les produits CLORAGRO, OPTIMAGRO, BIONET et les bonnes pratiques d'hygiène en élevage avicole.",
    ctaTitle: "Vous avez d'autres questions ?",
    ctaButton: "Demander un diagnostic terrain gratuit",
    items: [
      {
        question: "Pourquoi le rinçage est-il obligatoire entre CLORAGRO et OPTIMAGRO ?",
        answer: "CLORAGRO est un détergent alcalin chloré (Phase 01). OPTIMAGRO est un désinfectant à base de glutaraldéhyde et d'ammoniums quaternaires (Phase 02). Ces deux familles chimiques sont incompatibles : un mélange provoque une neutralisation mutuelle qui annule l'efficacité des deux produits. Le rinçage complet à l'eau potable entre les deux étapes est une exigence chimique et réglementaire — ce n'est pas optionnel."
      },
      {
        question: "Pourquoi un protocole en plusieurs étapes et pas un seul produit ?",
        answer: "Aucun produit unique ne peut à la fois nettoyer (éliminer le biofilm organique) et désinfecter (détruire les pathogènes). Le biofilm protège les bactéries : si vous désinfectez sans nettoyer d'abord, le désinfectant n'atteint pas les micro-organismes. Le protocole séquentiel N2K — Nettoyage (CLORAGRO) → Rinçage → Désinfection (OPTIMAGRO) — est la seule méthode qui garantit un résultat microbiologique mesurable."
      },
      {
        question: "Quand faut-il traiter les circuits d'eau ?",
        answer: "Les circuits d'abreuvement doivent être traités à chaque vide sanitaire avec BIONET (traitement choc à 1-3%) pour éliminer les biofilms accumulés. En parallèle, OXYLIS HOCl est utilisé en continu à 0,1% dans l'eau de boisson pour maintenir la qualité microbiologique au quotidien. Un circuit non traité est une source permanente de recontamination, même si les surfaces du bâtiment sont parfaitement désinfectées."
      },
      {
        question: "Pourquoi l'ammoniac réduit-il les performances de l'élevage ?",
        answer: "L'ammoniac (NH₃) est un gaz irritant produit par la décomposition des déjections. Au-delà de 25 ppm, il provoque des lésions des voies respiratoires supérieures chez les volailles, augmente la sensibilité aux infections (Mycoplasma, E. coli), réduit la consommation alimentaire et dégrade l'indice de conversion. OXYLIS HOCl, utilisé en nébulisation à 1 ml/m³, réduit la charge microbienne aéroportée et contribue à stabiliser l'ambiance sans mouiller les litières."
      },
      {
        question: "Quand un protocole minimal suffit-il ?",
        answer: "Un protocole minimal (CLORAGRO + rinçage + OPTIMAGRO) peut suffire dans les cas suivants : bâtiments récents avec surfaces lisses, historique sanitaire favorable sans pathologies récurrentes, vide sanitaire respecté d'au moins 14 jours. Dès qu'un facteur de risque apparaît (mortalité anormale, contamination de l'eau, audit réglementaire), le protocole doit être renforcé avec les produits complémentaires."
      },
      {
        question: "Quand faut-il renforcer le protocole ?",
        answer: "Le protocole doit être renforcé dans les situations suivantes : mortalité supérieure à 5% sur un cycle, présence confirmée de Salmonella ou E. coli dans les prélèvements, échec d'un audit HACCP ou vétérinaire, bâtiments anciens avec surfaces poreuses ou dégradées, épisode de maladie respiratoire. Le renforcement implique l'ajout de BIONET (canalisations), OXYLIS HOCl (eau de boisson), OXYLIS HOCl (ambiance) et BIOACTIVE (équipements à forte charge organique)."
      },
      {
        question: "Pourquoi ne pas utiliser tous les produits partout ?",
        answer: "Chaque produit N2K a une formulation spécifique pour une zone et une fonction précise. OXYLIS HOCl est formulé pour la nébulisation en présence d'animaux — il ne convient pas au nettoyage des surfaces. BIONET est conçu pour les canalisations — il n'est pas efficace en pulvérisation sur les murs. Utiliser un produit hors de son champ d'application gaspille des ressources et peut compromettre la sécurité. Le protocole N2K attribue chaque produit à sa zone : le bon produit, au bon endroit, au bon moment."
      }
    ]
  },
  en: {
    heroTitle: "Frequently Asked Questions",
    heroSubtitle: "Everything you need to know about our sanitary control protocols, products, and field-based approach.",
    metaTitle: "FAQ — Les Laboratoires N2K",
    metaDescription: "Answers to frequently asked questions about N2K sanitary control protocols, CLORAGRO, OPTIMAGRO, BIONET products and hygiene best practices in poultry farming.",
    ctaTitle: "Have more questions?",
    ctaButton: "Request a free field diagnostic",
    items: [
      {
        question: "Why is rinsing mandatory between CLORAGRO and OPTIMAGRO?",
        answer: "CLORAGRO is an alkaline chlorinated detergent (Phase 01). OPTIMAGRO is a disinfectant based on glutaraldehyde and quaternary ammonium (Phase 02). These two chemical families are incompatible: mixing them causes mutual neutralization that cancels the effectiveness of both products. Complete rinsing with drinking water between the two steps is a chemical and regulatory requirement — it is not optional."
      },
      {
        question: "Why a multi-step protocol instead of a single product?",
        answer: "No single product can both clean (remove organic biofilm) and disinfect (destroy pathogens). Biofilm protects bacteria: if you disinfect without cleaning first, the disinfectant cannot reach the microorganisms. The N2K sequential protocol — Cleaning (CLORAGRO) → Rinsing → Disinfection (OPTIMAGRO) — is the only method that guarantees a measurable microbiological result."
      },
      {
        question: "When should water circuits be treated?",
        answer: "Drinking circuits must be treated at each sanitary void with BIONET (shock treatment at 1-3%) to eliminate accumulated biofilms. In parallel, OXYLIS HOCl is used continuously at 0.1% in drinking water to maintain daily microbiological quality. An untreated circuit is a permanent source of recontamination, even if building surfaces are perfectly disinfected."
      },
      {
        question: "Why does ammonia reduce farming performance?",
        answer: "Ammonia (NH₃) is an irritant gas produced by the decomposition of droppings. Above 25 ppm, it causes lesions in the upper respiratory tract of poultry, increases susceptibility to infections (Mycoplasma, E. coli), reduces feed consumption, and degrades feed conversion ratio. OXYLIS HOCl, used in nebulization at 1 ml/m³, reduces airborne microbial load and helps stabilize the atmosphere without wetting litter."
      },
      {
        question: "When is a minimal protocol sufficient?",
        answer: "A minimal protocol (CLORAGRO + rinsing + OPTIMAGRO) may be sufficient in the following cases: recent buildings with smooth surfaces, favorable health history without recurrent pathologies, respected sanitary void of at least 14 days. As soon as a risk factor appears (abnormal mortality, water contamination, regulatory audit), the protocol must be strengthened with complementary products."
      },
      {
        question: "When should the protocol be strengthened?",
        answer: "The protocol should be strengthened in the following situations: mortality above 5% on a cycle, confirmed presence of Salmonella or E. coli in samples, failed HACCP or veterinary audit, old buildings with porous or degraded surfaces, respiratory disease episode. Strengthening involves adding BIONET (pipes), OXYLIS HOCl (drinking water), OXYLIS HOCl (atmosphere) and BIOACTIVE (equipment with high organic load)."
      },
      {
        question: "Why not use all products everywhere?",
        answer: "Each N2K product has a specific formulation for a specific zone and function. OXYLIS HOCl is formulated for nebulization in the presence of animals — it is not suitable for surface cleaning. BIONET is designed for pipes — it is not effective in spray application on walls. Using a product outside its field of application wastes resources and can compromise safety. The N2K protocol assigns each product to its zone: the right product, in the right place, at the right time."
      }
    ]
  },
  ar: {
    heroTitle: "الأسئلة الشائعة",
    heroSubtitle: "كل ما تحتاج معرفته عن بروتوكولات التحكم الصحي لدينا ومنتجاتنا ومنهجيتنا الميدانية.",
    metaTitle: "الأسئلة الشائعة — مختبرات N2K",
    metaDescription: "إجابات على الأسئلة الشائعة حول بروتوكولات التحكم الصحي N2K ومنتجات CLORAGRO وOPTIMAGRO وBIONET وأفضل ممارسات النظافة في تربية الدواجن.",
    ctaTitle: "هل لديك أسئلة أخرى؟",
    ctaButton: "اطلب تشخيصاً ميدانياً مجانياً",
    items: [
      {
        question: "لماذا يعتبر الشطف إلزامياً بين CLORAGRO وOPTIMAGRO؟",
        answer: "CLORAGRO هو منظف قلوي كلوري (المرحلة 01). OPTIMAGRO هو مطهر يعتمد على الغلوتارالدهيد والأمونيوم الرباعي (المرحلة 02). هاتان العائلتان الكيميائيتان غير متوافقتين: خلطهما يسبب معادلة متبادلة تلغي فعالية المنتجين. الشطف الكامل بالماء الصالح للشرب بين المرحلتين هو شرط كيميائي وتنظيمي — وليس اختيارياً."
      },
      {
        question: "لماذا بروتوكول متعدد المراحل بدلاً من منتج واحد؟",
        answer: "لا يمكن لأي منتج واحد أن ينظف (يزيل البيوفيلم العضوي) ويطهر (يدمر مسببات الأمراض) في نفس الوقت. البيوفيلم يحمي البكتيريا: إذا قمت بالتطهير دون التنظيف أولاً، فإن المطهر لا يصل إلى الكائنات الدقيقة. بروتوكول N2K التسلسلي — التنظيف (CLORAGRO) ← الشطف ← التطهير (OPTIMAGRO) — هو الطريقة الوحيدة التي تضمن نتيجة ميكروبيولوجية قابلة للقياس."
      },
      {
        question: "متى يجب معالجة دوائر المياه؟",
        answer: "يجب معالجة دوائر الشرب في كل فراغ صحي باستخدام BIONET (معالجة صدمية بنسبة 1-3%) للقضاء على البيوفيلم المتراكم. بالتوازي، يستخدم OXYLIS HOCl باستمرار بنسبة 0.1% في مياه الشرب للحفاظ على الجودة الميكروبيولوجية اليومية. الدائرة غير المعالجة هي مصدر دائم لإعادة التلوث، حتى لو كانت أسطح المبنى مطهرة بشكل مثالي."
      },
      {
        question: "لماذا يقلل الأمونياك من أداء التربية؟",
        answer: "الأمونياك (NH₃) هو غاز مهيج ينتج عن تحلل الفضلات. فوق 25 جزء في المليون، يسبب آفات في الجهاز التنفسي العلوي للدواجن، ويزيد من القابلية للعدوى (الميكوبلازما، الإشريكية القولونية)، ويقلل استهلاك العلف، ويضعف معدل تحويل الأعلاف. OXYLIS HOCl، المستخدم في التضبيب بمعدل 1 مل/م³، يقلل الحمل الميكروبي المحمول جواً ويساهم في تثبيت الأجواء دون تبليل الفرشة."
      },
      {
        question: "متى يكفي البروتوكول الأدنى؟",
        answer: "قد يكفي البروتوكول الأدنى (CLORAGRO + شطف + OPTIMAGRO) في الحالات التالية: مباني حديثة بأسطح ملساء، تاريخ صحي إيجابي بدون أمراض متكررة، فراغ صحي محترم لمدة 14 يوماً على الأقل. بمجرد ظهور عامل خطر (وفيات غير طبيعية، تلوث المياه، تدقيق تنظيمي)، يجب تعزيز البروتوكول بالمنتجات التكميلية."
      },
      {
        question: "متى يجب تعزيز البروتوكول؟",
        answer: "يجب تعزيز البروتوكول في الحالات التالية: وفيات تتجاوز 5% في دورة واحدة، وجود مؤكد للسالمونيلا أو الإشريكية القولونية في العينات، فشل في تدقيق HACCP أو بيطري، مباني قديمة بأسطح مسامية أو متدهورة، نوبة مرض تنفسي. التعزيز يتضمن إضافة BIONET (الأنابيب)، OXYLIS HOCl (مياه الشرب)، OXYLIS HOCl (الأجواء) وBIOACTIVE (المعدات ذات الحمل العضوي العالي)."
      },
      {
        question: "لماذا لا نستخدم جميع المنتجات في كل مكان؟",
        answer: "كل منتج من N2K له تركيبة محددة لمنطقة ووظيفة محددة. OXYLIS HOCl مصمم للتضبيب في حضور الحيوانات — وليس مناسباً لتنظيف الأسطح. BIONET مصمم للأنابيب — وليس فعالاً في الرش على الجدران. استخدام منتج خارج مجال تطبيقه يهدر الموارد وقد يضر بالسلامة. بروتوكول N2K يخصص كل منتج لمنطقته: المنتج المناسب، في المكان المناسب، في الوقت المناسب."
      }
    ]
  }
};

export function getFAQData(locale: string): FAQData {
  return faqData[locale] || faqData["fr"];
}
