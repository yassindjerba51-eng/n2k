import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Inserting Articles 2 and 3...");

  // --- Article 2: Ammoniac ---
  const contentFr2 = `
<p>Dès les premières semaines d'élevage, une odeur piquante vous prend à la gorge en entrant dans le bâtiment. Vous augmentez la ventilation, ce qui coûte cher en énergie, mais l'odeur d'ammoniac revient rapidement. Les animaux commencent à tousser et la litière devient humide.</p>
<h2>Ce que pensent la plupart des éleveurs</h2>
<p>L'idée reçue est que l'ammoniac est uniquement dû à une mauvaise ventilation ou à une surdensité. La solution classique consiste à augmenter le renouvellement d'air et à rajouter de la litière neuve. \"On ventile plus, l'odeur partira\".</p>
<h2>Ce qui se passe réellement à l'échelle chimique</h2>
<p>L'ammoniac (NH3) n'apparaît pas par magie. Il est le résultat d'une réaction chimique : la dégradation de l'acide urique contenu dans les fientes des volailles par des bactéries uréolytiques présentes dans la litière. Plus la litière est riche en azote et en humidité, plus ces bactéries prolifèrent et produisent de l'ammoniac. C'est un problème d'équilibre microbien et enzymatique, pas seulement de renouvellement d'air.</p>
<h2>Ce qu'on observe sur le terrain</h2>
<p>Sur le terrain, une ventilation forcée règle le problème temporairement mais refroidit le bâtiment, entraînant une surconsommation de chauffage. Pire, l'ammoniac irrite les muqueuses respiratoires des volailles, créant une porte d'entrée royale pour des pathogènes comme E. coli ou les virus respiratoires. Les animaux sont moins actifs, l'indice de consommation se dégrade, et les saisies à l'abattoir (brûlures de bréchet) augmentent.</p>
<h2>Pourquoi la sur-ventilation échoue-t-elle ?</h2>
<p>Ventiler pour éliminer l'ammoniac revient à écoper l'eau d'un bateau percé sans boucher le trou. L'usine à gaz (les fientes et les bactéries) continue de fonctionner à plein régime. Tant que la dégradation bactérienne n'est pas stoppée ou orientée différemment, l'ammoniac continuera d'être produit.</p>
<h2>Les erreurs les plus courantes</h2>
<ul>
<li>Sur-ventiler en plein hiver, entraînant un stress thermique pour les animaux et une facture énergétique exorbitante.</li>
<li>Négliger les fuites d'eau des nipponnes qui créent des zones humides favorisant la fermentation.</li>
<li>Croire qu'un simple traitement d'air parfumé masque le danger pour les animaux.</li>
<li>Attendre que l'odeur soit insupportable pour l'homme (à 20 ppm, c'est déjà néfaste pour le poulet).</li>
</ul>
<h2>Solutions pratiques et curatives</h2>
<ul>
<li><strong>Contrôle de l'humidité :</strong> Réparez les fuites d'abreuvoirs immédiatement. Retirez les zones de litière \"croûtée\" et humide.</li>
<li><strong>Gestion de la flore :</strong> Utilisez un traitement enzymatique et probiotique de litière pour concurrencer les bactéries uréolytiques.</li>
<li><strong>Traitement de l'air :</strong> Appliquez une solution de nébulisation (comme AIRSAN N2K) qui neutralise les pathogènes aériens en suspension sans humidifier davantage la litière.</li>
<li><strong>Dégradation organique :</strong> Lors du vide sanitaire, utilisez un nettoyant enzymatique (comme BIOACTIVE N2K) pour dégrader en profondeur les résidus organiques qui pourraient initier une fermentation précoce sur la bande suivante.</li>
</ul>
<h2>L'approche d'un expert en hygiène</h2>
<p>Chez N2K, nous abordons l'ammoniac comme un indicateur d'un déséquilibre biologique, pas comme un simple gaz à évacuer. L'approche professionnelle consiste à combiner le contrôle de l'humidité, la neutralisation de l'air ambiant par nébulisation fine, et la préparation enzymatique du bâtiment en vide sanitaire. Cette stratégie s'attaque à la source du problème.</p>
<h2>Conclusion</h2>
<p>L'ammoniac persistant est le symptôme d'une litière malade. Ne combattez pas seulement l'odeur, combattez le processus de fermentation. Un contrôle de l'ambiance rigoureux réduit les pathologies respiratoires de 15% et optimise vos coûts de chauffage.</p>
`.trim();

  const contentEn2 = `
<p>From the first weeks of the flock, a pungent smell hits your throat as you enter the house. You increase the ventilation, which is expensive in energy, but the ammonia smell quickly returns. The animals start coughing, and the litter becomes damp.</p>
<h2>What most farmers believe</h2>
<p>The common belief is that ammonia is solely due to poor ventilation or overstocking. The classic solution is to increase air exchange and add new litter. \"Ventilate more, the smell will go away\".</p>
<h2>What really happens on a chemical scale</h2>
<p>Ammonia (NH3) doesn't appear by magic. It is the result of a chemical reaction: the breakdown of uric acid contained in poultry droppings by ureolytic bacteria present in the litter. The richer the litter is in nitrogen and moisture, the more these bacteria proliferate and produce ammonia. It is a microbial and enzymatic balance problem, not just an air exchange issue.</p>
<h2>What we observe in the field</h2>
<p>In the field, forced ventilation solves the problem temporarily but cools the building, leading to overconsumption of heating. Worse, ammonia irritates the poultry's respiratory mucous membranes, creating a prime entry point for pathogens like E. coli or respiratory viruses. Animals are less active, the feed conversion ratio deteriorates, and slaughterhouse condemnations (breast blisters) increase.</p>
<h2>Why does over-ventilation fail?</h2>
<p>Ventilating to remove ammonia is like bailing water from a leaky boat without plugging the hole. The gas factory (droppings and bacteria) continues to operate at full capacity. As long as bacterial degradation is not stopped or redirected, ammonia will continue to be produced.</p>
<h2>The most common mistakes</h2>
<ul>
<li>Over-ventilating in the middle of winter, leading to thermal stress for the animals and an exorbitant energy bill.</li>
<li>Neglecting drinker leaks that create wet spots promoting fermentation.</li>
<li>Believing that a simple scented air treatment masks the danger to the animals.</li>
<li>Waiting until the smell is unbearable for humans (at 20 ppm, it is already harmful to the chicken).</li>
</ul>
<h2>Practical and curative solutions</h2>
<ul>
<li><strong>Moisture control:</strong> Repair drinker leaks immediately. Remove areas of \"crusted\" and wet litter.</li>
<li><strong>Flora management:</strong> Use an enzymatic and probiotic litter treatment to compete with ureolytic bacteria.</li>
<li><strong>Air treatment:</strong> Apply a fogging solution (like AIRSAN N2K) that neutralizes suspended airborne pathogens without further moistening the litter.</li>
<li><strong>Organic degradation:</strong> During turnaround, use an enzymatic cleaner (like BIOACTIVE N2K) to deeply degrade organic residues that could initiate early fermentation in the next flock.</li>
</ul>
<h2>The approach of a hygiene expert</h2>
<p>At N2K, we approach ammonia as an indicator of biological imbalance, not just a gas to be vented. The professional approach is to combine moisture control, ambient air neutralization through fine fogging, and enzymatic preparation of the building during turnaround. This strategy tackles the source of the problem.</p>
<h2>Conclusion</h2>
<p>Persistent ammonia is the symptom of sick litter. Don't just fight the smell, fight the fermentation process. Rigorous ambient control reduces respiratory pathologies by 15% and optimizes your heating costs.</p>
`.trim();

  const contentAr2 = `
<p>منذ الأسابيع الأولى من الدورة، تضربك رائحة نفاذة في الحلق عند دخول المبنى. تزيد من التهوية، مما يكلف طاقة غالية، لكن رائحة الأمونيا تعود بسرعة. تبدأ الحيوانات في السعال، ويصبح الفرش رطبًا.</p>
<h2>ما يعتقده معظم المربين</h2>
<p>الاعتقاد السائد هو أن الأمونيا ناتجة فقط عن سوء التهوية أو الاكتظاظ. الحل الكلاسيكي هو زيادة تجديد الهواء وإضافة فرش جديد. "قم بزيادة التهوية، ستختفي الرائحة".</p>
<h2>ما يحدث فعليًا على المستوى الكيميائي</h2>
<p>الأمونيا (NH3) لا تظهر بسحر ساحر. إنها نتيجة تفاعل كيميائي: تحلل حمض اليوريك الموجود في زرق الدواجن بواسطة بكتيريا محللة لليوريا موجودة في الفرش. كلما كان الفرش غنيًا بالنيتروجين والرطوبة، تكاثرت هذه البكتيريا وأنتجت الأمونيا. إنها مشكلة توازن ميكروبي وإنزيمي، وليست مجرد مشكلة تجديد هواء.</p>
<h2>ما نلاحظه في الميدان</h2>
<p>في الميدان، تحل التهوية القسرية المشكلة مؤقتًا لكنها تبرد المبنى، مما يؤدي إلى استهلاك مفرط للتدفئة. الأسوأ من ذلك، الأمونيا تهيج الأغشية المخاطية التنفسية للدواجن، مما يخلق بوابة دخول رئيسية لمسببات الأمراض مثل الإشريكية القولونية أو فيروسات الجهاز التنفسي. تكون الحيوانات أقل نشاطًا، ويتدهور معامل التحويل الغذائي، وتزداد المصادرات في المسلخ (حروق الصدر).</p>
<h2>لماذا تفشل التهوية المفرطة؟</h2>
<p>التهوية لإزالة الأمونيا تشبه تفريغ الماء من قارب مثقوب دون سد الثقب. مصنع الغاز (الزرق والبكتيريا) يستمر في العمل بكامل طاقته. طالما لم يتم إيقاف التحلل البكتيري أو توجيهه بشكل مختلف، سيستمر إنتاج الأمونيا.</p>
<h2>الأخطاء الأكثر شيوعًا</h2>
<ul>
<li>التهوية المفرطة في منتصف الشتاء، مما يؤدي إلى إجهاد حراري للحيوانات وفاتورة طاقة باهظة.</li>
<li>إهمال تسربات الحلمات التي تخلق مناطق رطبة تعزز التخمر.</li>
<li>الاعتقاد بأن معالجة الهواء المعطرة البسيطة تخفي الخطر على الحيوانات.</li>
<li>الانتظار حتى تصبح الرائحة لا تطاق للبشر (عند 20 جزء في المليون، تكون ضارة بالفعل للدجاج).</li>
</ul>
<h2>حلول عملية وعلاجية</h2>
<ul>
<li><strong>التحكم في الرطوبة:</strong> إصلاح تسربات المشارب على الفور. إزالة مناطق الفرش "المتصلبة" والرطبة.</li>
<li><strong>إدارة الفلورا:</strong> استخدم علاجًا إنزيميًا وبروبيوتيك للفرش للتنافس مع البكتيريا المحللة لليوريا.</li>
<li><strong>معالجة الهواء:</strong> تطبيق محلول رذاذ (مثل AIRSAN N2K) يحيد مسببات الأمراض المحمولة جواً والمعلقة دون زيادة ترطيب الفرش.</li>
<li><strong>التحلل العضوي:</strong> أثناء فترة الراحة الصحية، استخدم منظفًا إنزيميًا (مثل BIOACTIVE N2K) لتحليل البقايا العضوية بعمق والتي يمكن أن تبدأ في تخمر مبكر في الدفعة التالية.</li>
</ul>
<h2>نهج خبير النظافة</h2>
<p>في N2K، نتعامل مع الأمونيا كمؤشر على عدم توازن بيولوجي، وليس مجرد غاز يجب التخلص منه. النهج المهني هو الجمع بين التحكم في الرطوبة، وتحييد الهواء المحيط من خلال التغشية الدقيقة، والإعداد الإنزيمي للمبنى أثناء فترة الراحة الصحية. هذه الاستراتيجية تعالج مصدر المشكلة.</p>
<h2>خاتمة</h2>
<p>الأمونيا المستمرة هي عرض لفرش مريض. لا تحارب الرائحة فقط، حارب عملية التخمر. يقلل التحكم الصارم في البيئة المحيطة من أمراض الجهاز التنفسي بنسبة 15٪ ويحسن تكاليف التدفئة.</p>
`.trim();


  // --- Article 3: Biofilm ---
  const contentFr3 = `
<p>Vos protocoles de désinfection étaient efficaces il y a quelques années. Mais aujourd'hui, malgré l'utilisation des mêmes produits puissants, les analyses de surface reviennent positives et les problèmes sanitaires persistent. Vous pensez que la bactérie est devenue résistante au produit.</p>
<h2>Ce que pensent la plupart des éleveurs</h2>
<p>Face à un échec de désinfection, la réaction classique est de changer de produit ou d'augmenter la concentration. \"Le virus s'est habitué, il faut taper plus fort\". On pense que le problème vient de l'efficacité chimique du bidon.</p>
<h2>Ce qui se passe réellement : la forteresse microbienne</h2>
<p>Le problème n'est pas la résistance chimique de la bactérie isolée, mais sa stratégie de survie collective : le <strong>biofilm</strong>. Dès que de l'eau et des nutriments (protéines, graisses) sont présents, les bactéries s'attachent à la surface et sécrètent une matrice de polymères (EPS). Cette matrice forme une armure gluante impénétrable. Le désinfectant, même le plus fort, glisse sur ce bouclier sans jamais atteindre les bactéries enfouies à l'intérieur.</p>
<h2>Ce qu'on observe sur le terrain</h2>
<p>En élevage avicole, on observe l'impact du biofilm particulièrement sur les lignes d'abreuvement et les sols rugueux. Vous sentez un dépôt glissant (souvent de couleur rosâtre ou brunâtre) à l'intérieur des tuyaux démontés. Dans le bâtiment, les problèmes sanitaires sont chroniques : colibacillose, salmonelles qui survivent d'une bande à l'autre. Le désinfectant sent fort, mais il n'est efficace qu'à 10% de sa capacité réelle.</p>
<h2>Pourquoi le désinfectant ne fonctionne plus ?</h2>
<p>Un désinfectant est conçu pour tuer des microorganismes, pas pour détruire de la matière organique complexe. Si le biofilm n'est pas cassé avant l'application du désinfectant, la molécule active s'épuise à essayer de traverser l'armure EPS. C'est comme essayer de nettoyer une tache de graisse avec de l'alcool pur : ça étale la saleté, mais ça ne la dissout pas.</p>
<h2>Les erreurs les plus courantes face au biofilm</h2>
<ul>
<li>Utiliser uniquement de l'eau sous pression : le jet décape une partie, mais étale le reste des bactéries sur d'autres surfaces.</li>
<li>Croire qu'un désinfectant suffit pour tout faire (nettoyer ET désinfecter).</li>
<li>Appliquer le traitement uniquement en curatif, sans démarche préventive.</li>
<li>Ignorer les tuyaux d'eau, lieu de prolifération parfait pour le biofilm.</li>
</ul>
<h2>Solutions pratiques contre le biofilm</h2>
<ul>
<li><strong>Phase 1 : Le décapage enzymatique ou alcalin.</strong> Pour détruire un biofilm, il faut le dissoudre. Utilisez un détergent technique alcalin chloré (comme CLORAGRO) pour le bâtiment, ou un nettoyant enzymatique pour les lignes d'eau (comme BIONET).</li>
<li><strong>Phase 2 : L'action mécanique.</strong> Laissez agir le produit (20-30 minutes) pour que la chimie ramollisse l'armure, puis utilisez la haute pression pour l'expulser physiquement.</li>
<li><strong>Phase 3 : La désinfection sur surface nue.</strong> Une fois le biofilm éliminé et la surface rincée, le désinfectant retrouve 100% de son efficacité sur les bactéries désormais vulnérables.</li>
</ul>
<h2>L'approche d'un expert en hygiène</h2>
<p>L'expertise N2K considère le biofilm comme l'ennemi numéro 1. Notre protocole séquentiel sépare strictement le nettoyage technique (destruction de la matrice) et la désinfection (élimination du pathogène). Nous n'intervenons jamais avec un désinfectant sur une structure non préparée, car c'est une perte d'argent pour l'éleveur et une garantie d'échec.</p>
<h2>Conclusion</h2>
<p>Le biofilm rend vos désinfectants inutiles. Tant que cette forteresse n'est pas démantelée par un nettoyage technique approprié, vous continuerez de lutter contre des bactéries protégées. Le succès commence par un décapage en profondeur.</p>
`.trim();

  const contentEn3 = `
<p>Your disinfection protocols were effective a few years ago. But today, despite using the same powerful products, surface swab results come back positive and health problems persist. You think the bacteria have become resistant to the product.</p>
<h2>What most farmers believe</h2>
<p>Faced with a disinfection failure, the classic reaction is to change products or increase the concentration. \"The virus got used to it, we need to hit it harder\". They think the problem lies in the chemical efficacy of the jug.</p>
<h2>What really happens: the microbial fortress</h2>
<p>The problem is not the chemical resistance of the isolated bacterium, but its collective survival strategy: the <strong>biofilm</strong>. As soon as water and nutrients (proteins, fats) are present, bacteria attach to the surface and secrete a polymer matrix (EPS). This matrix forms an impenetrable slimy armor. The disinfectant, even the strongest one, slides over this shield without ever reaching the bacteria buried inside.</p>
<h2>What we observe in the field</h2>
<p>In poultry farming, the impact of biofilm is seen particularly in drinking lines and rough floors. You feel a slippery deposit (often pinkish or brownish in color) inside dismantled pipes. Inside the house, health problems are chronic: colibacillosis, salmonella surviving from one flock to the next. The disinfectant smells strong, but it is only effective at 10% of its true capacity.</p>
<h2>Why doesn't the disinfectant work anymore?</h2>
<p>A disinfectant is designed to kill microorganisms, not to destroy complex organic matter. If the biofilm is not broken before the disinfectant is applied, the active molecule exhausts itself trying to penetrate the EPS armor. It's like trying to clean a grease stain with pure alcohol: it spreads the dirt, but doesn't dissolve it.</p>
<h2>The most common mistakes when dealing with biofilm</h2>
<ul>
<li>Using only pressurized water: the jet strips off a part but spreads the rest of the bacteria to other surfaces.</li>
<li>Believing that a disinfectant is enough to do everything (clean AND disinfect).</li>
<li>Applying treatment only curatively, without a preventive approach.</li>
<li>Ignoring water pipes, the perfect proliferation site for biofilm.</li>
</ul>
<h2>Practical solutions against biofilm</h2>
<ul>
<li><strong>Phase 1: Enzymatic or alkaline stripping.</strong> To destroy a biofilm, it must be dissolved. Use a chlorinated alkaline technical detergent (like CLORAGRO) for the building, or an enzymatic cleaner for the water lines (like BIONET).</li>
<li><strong>Phase 2: Mechanical action.</strong> Let the product act (20-30 minutes) so the chemistry softens the armor, then use high pressure to physically expel it.</li>
<li><strong>Phase 3: Disinfection on a bare surface.</strong> Once the biofilm is removed and the surface rinsed, the disinfectant regains 100% of its effectiveness on the now vulnerable bacteria.</li>
</ul>
<h2>The approach of a hygiene expert</h2>
<p>N2K expertise considers biofilm to be enemy number 1. Our sequential protocol strictly separates technical cleaning (destruction of the matrix) and disinfection (elimination of the pathogen). We never intervene with a disinfectant on an unprepared structure, because it is a waste of money for the farmer and a guarantee of failure.</p>
<h2>Conclusion</h2>
<p>Biofilm makes your disinfectants useless. Until this fortress is dismantled by proper technical cleaning, you will continue to fight protected bacteria. Success begins with deep stripping.</p>
`.trim();

  const contentAr3 = `
<p>كانت بروتوكولات التطهير الخاصة بك فعالة قبل بضع سنوات. لكن اليوم، على الرغم من استخدام نفس المنتجات القوية، تعود نتائج المسحات السطحية إيجابية وتستمر المشاكل الصحية. تعتقد أن البكتيريا أصبحت مقاومة للمنتج.</p>
<h2>ما يعتقده معظم المربين</h2>
<p>في مواجهة فشل التطهير، يكون رد الفعل الكلاسيكي هو تغيير المنتج أو زيادة التركيز. "لقد اعتاد الفيروس عليه، يجب أن نضرب بقوة أكبر". يعتقدون أن المشكلة تكمن في الفعالية الكيميائية للعبوة.</p>
<h2>ما يحدث فعليًا: الحصن الميكروبي</h2>
<p>المشكلة ليست المقاومة الكيميائية للبكتيريا المعزولة، ولكن استراتيجية البقاء الجماعي الخاصة بها: <strong>الغشاء الحيوي (biofilm)</strong>. بمجرد وجود الماء والعناصر الغذائية (البروتينات والدهون)، تلتصق البكتيريا بالسطح وتفرز مصفوفة بوليمر (EPS). تشكل هذه المصفوفة درعًا لزجًا لا يمكن اختراقه. المطهر، حتى أقوى مطهر، ينزلق فوق هذا الدرع دون أن يصل أبدًا إلى البكتيريا المدفونة بالداخل.</p>
<h2>ما نلاحظه في الميدان</h2>
<p>في تربية الدواجن، يُلاحظ تأثير الغشاء الحيوي بشكل خاص في خطوط الشرب والأرضيات الخشنة. تشعر بوجود ترسبات زلقة (غالبًا ما تكون وردية أو بنية اللون) داخل الأنابيب المفككة. داخل المبنى، تكون المشاكل الصحية مزمنة: داء العصيات القولونية، السالمونيلا التي تعيش من دورة إلى أخرى. رائحة المطهر قوية، لكنه فعال بنسبة 10٪ فقط من قدرته الحقيقية.</p>
<h2>لماذا لم يعد المطهر يعمل؟</h2>
<p>تم تصميم المطهر لقتل الكائنات الحية الدقيقة، وليس لتدمير المواد العضوية المعقدة. إذا لم يتم كسر الغشاء الحيوي قبل تطبيق المطهر، فإن الجزيء النشط يستنفد نفسه في محاولة اختراق درع EPS. الأمر يشبه محاولة تنظيف بقعة شحوم بالكحول النقي: إنه ينشر الأوساخ، لكنه لا يذيبها.</p>
<h2>الأخطاء الأكثر شيوعًا عند التعامل مع الغشاء الحيوي</h2>
<ul>
<li>استخدام الماء المضغوط فقط: يزيل التيار جزءًا ولكنه ينشر بقية البكتيريا على الأسطح الأخرى.</li>
<li>الاعتقاد بأن المطهر يكفي للقيام بكل شيء (التنظيف والتطهير).</li>
<li>تطبيق العلاج بشكل علاجي فقط، دون نهج وقائي.</li>
<li>تجاهل أنابيب المياه، وهي موقع التكاثر المثالي للغشاء الحيوي.</li>
</ul>
<h2>حلول عملية ضد الغشاء الحيوي</h2>
<ul>
<li><strong>المرحلة 1: التجريد الإنزيمي أو القلوي.</strong> لتدمير غشاء حيوي، يجب حله. استخدم منظفًا فنيًا قلويًا مكلورًا (مثل CLORAGRO) للمبنى، أو منظفًا إنزيميًا لخطوط المياه (مثل BIONET).</li>
<li><strong>المرحلة 2: الإجراء الميكانيكي.</strong> اترك المنتج يعمل (20-30 دقيقة) حتى تخفف الكيمياء الدرع، ثم استخدم الضغط العالي لطرده فعليًا.</li>
<li><strong>المرحلة 3: التطهير على سطح مكشوف.</strong> بمجرد إزالة الغشاء الحيوي وشطف السطح، يستعيد المطهر فعاليته بنسبة 100٪ على البكتيريا التي أصبحت الآن ضعيفة.</li>
</ul>
<h2>نهج خبير النظافة</h2>
<p>تعتبر خبرة N2K الغشاء الحيوي العدو الأول. يفصل بروتوكولنا المتسلسل بصرامة بين التنظيف الفني (تدمير المصفوفة) والتطهير (القضاء على مسببات الأمراض). نحن لا نتدخل أبدًا بمطهر على هيكل غير مجهز، لأنها مضيعة لأموال المربي وضمان للفشل.</p>
<h2>خاتمة</h2>
<p>يجعل الغشاء الحيوي مطهراتك عديمة الفائدة. حتى يتم تفكيك هذا الحصن عن طريق التنظيف الفني المناسب، ستستمر في محاربة البكتيريا المحمية. يبدأ النجاح بالتجريد العميق.</p>
`.trim();

  await prisma.blogPost.upsert({
    where: { slug: "ammoniac-persistant-batiment-elevage-avicole" },
    update: {
      titleFr: "Ammoniac persistant en bâtiment avicole : causes cachées et solutions pratiques",
      titleEn: "Persistent Ammonia in Poultry Houses: Hidden Causes and Practical Solutions",
      titleAr: "الأمونيا المستمرة في مباني الدواجن: الأسباب الخفية والحلول العملية",
      contentFr: contentFr2,
      contentEn: contentEn2,
      contentAr: contentAr2,
      tags: "ammoniac, qualité de l'air, élevage avicole, problèmes respiratoires, traitement litière",
      coverImage: "https://images.unsplash.com/photo-1548848221-0c2e497ed557?q=80&w=1200",
      publishedAt: new Date("2024-10-25"),
    },
    create: {
      titleFr: "Ammoniac persistant en bâtiment avicole : causes cachées et solutions pratiques",
      titleEn: "Persistent Ammonia in Poultry Houses: Hidden Causes and Practical Solutions",
      titleAr: "الأمونيا المستمرة في مباني الدواجن: الأسباب الخفية والحلول العملية",
      slug: "ammoniac-persistant-batiment-elevage-avicole",
      contentFr: contentFr2,
      contentEn: contentEn2,
      contentAr: contentAr2,
      tags: "ammoniac, qualité de l'air, élevage avicole, problèmes respiratoires, traitement litière",
      coverImage: "https://images.unsplash.com/photo-1548848221-0c2e497ed557?q=80&w=1200",
      publishedAt: new Date("2024-10-25"),
    }
  });
  console.log("✅ Article 2 inserted successfully.");

  await prisma.blogPost.upsert({
    where: { slug: "biofilm-environnement-avicole-desinfectant-inefficace" },
    update: {
      titleFr: "Biofilm en environnement avicole : pourquoi votre désinfectant ne fonctionne plus",
      titleEn: "Biofilm in Poultry Environments: Why Your Disinfectant Stops Working",
      titleAr: "الغشاء الحيوي في بيئة الدواجن: لماذا يتوقف مطهرك عن العمل",
      contentFr: contentFr3,
      contentEn: contentEn3,
      contentAr: contentAr3,
      tags: "biofilm, résistance bactérienne, désinfection, élevage avicole, CLORAGRO",
      coverImage: "https://images.unsplash.com/photo-1620853744645-31a890a886b6?q=80&w=1200",
      publishedAt: new Date("2024-10-30"),
    },
    create: {
      titleFr: "Biofilm en environnement avicole : pourquoi votre désinfectant ne fonctionne plus",
      titleEn: "Biofilm in Poultry Environments: Why Your Disinfectant Stops Working",
      titleAr: "الغشاء الحيوي في بيئة الدواجن: لماذا يتوقف مطهرك عن العمل",
      slug: "biofilm-environnement-avicole-desinfectant-inefficace",
      contentFr: contentFr3,
      contentEn: contentEn3,
      contentAr: contentAr3,
      tags: "biofilm, résistance bactérienne, désinfection, élevage avicole, CLORAGRO",
      coverImage: "https://images.unsplash.com/photo-1620853744645-31a890a886b6?q=80&w=1200",
      publishedAt: new Date("2024-10-30"),
    }
  });
  console.log("✅ Article 3 inserted successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
