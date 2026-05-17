import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Inserting Articles 2 and 3...");

  // --- Article 2: Ammoniac ---
  const contentFr2 = `
<p>Dès la deuxième semaine d'élevage, une odeur d'ammoniac (NH3) commence souvent à saturer l'air du bâtiment. Ce symptôme concret se manifeste par un picotement oculaire immédiat chez l'opérateur et une toux réflexe chez les volailles. Sur le terrain, l'erreur fréquente consiste à augmenter aveuglément le taux de ventilation. Cette réaction d'urgence refroidit le bâtiment, provoquant un stress thermique et une surconsommation de chauffage ruineuse pour l'éleveur. Sur le plan économique, le maintien d'une concentration de seulement 25 ppm d'ammoniac suffit à dégrader l'indice de consommation (IC) de 3 à 5 % et à augmenter le taux de saisie à l'abattoir pour cause de pododermatites et de brûlures du bréchet.</p>
<h2>La dynamique biochimique cachée de la litière</h2>
<p>L'ammoniac n'est pas un gaz émis spontanément, mais le produit final d'une réaction enzymatique. Les fientes de volailles sont riches en acide urique. Sous l'action d'enzymes uréases produites par des bactéries uréolytiques opportunistes, cet acide est dégradé en ammoniac. Une erreur opérateur typique est d'attendre que la litière "croûte" pour intervenir. En réalité, le processus démarre dès qu'un déséquilibre se crée, souvent exacerbé par une simple fuite au niveau des pipettes d'abreuvement. Ce micro-environnement humide favorise l'explosion des bactéries uréolytiques. Ventiler ne fait que chasser l'ammoniac gazeux ; l'usine microbiologique, elle, continue de tourner à plein régime dans la litière.</p>
<h2>Agir à la source : Bloquer le cycle lors du vide sanitaire</h2>
<p>L'intervention la plus stratégique se situe en amont, lors du vide sanitaire. Un cas typique observé sur une installation réelle montre que le lavage haute pression classique ne suffit pas : il lisse les surfaces mais laisse un biofilm résiduel et des protéines coagulées incrustés dans la porosité du béton. Ce substrat organique devient le point de départ de la fermentation au lot suivant. L'application d'une solution de décapage enzymatique performante comme notre gamme <a href="/fr/produits/bioactive">BIOACTIVE</a> permet de déstructurer en profondeur cette matrice organique. En hydrolysant les protéines et les lipides incrustés, on prive la flore uréolytique de son support nutritionnel originel, retardant considérablement le démarrage de la fermentation lors de la mise en place du nouveau lot.</p>
<h2>Neutraliser l'atmosphère en présence d'animaux</h2>
<p>Une fois le lot en place, si l'hygrométrie de la litière dérape, il faut agir sur l'ambiance sans rajouter d'eau. Pulvériser un produit liquide directement sur une litière humide est une erreur technique majeure qui aggrave la prolifération bactérienne. L'approche microbiologique appliquée exige la maîtrise de la flore aérienne. C'est ici que l'assainissement de l'air par nébulisation d'une solution d'hygiène de l'air de la gamme <a href="/fr/produits/oxylis-hoci">OXYLIS HOCl</a> fait la différence. En réduisant la pression bactérienne en suspension de manière sèche, ce procédé neutralise les molécules odorantes et protège le tractus respiratoire des oiseaux, sans dégrader l'hygrométrie du bâtiment. Le confort animal est rétabli, et l'éleveur reprend le contrôle de ses paramètres d'ambiance.</p>
<h2>Recommandations opérationnelles</h2>
<p>Le contrôle de l'ammoniac est une discipline de prévention active, non de réaction :</p>
<ul>
<li>Réparez les fuites de lignes d'eau en temps réel pour supprimer les zones de fermentation.</li>
<li>Respectez scrupuleusement les temps de contact des détergents enzymatiques lors du vide sanitaire pour garantir une hydrolyse complète.</li>
<li>Gérez la ventilation pour l'oxygène et le contrôle de l'humidité, et non comme un simple extracteur d'odeurs.</li>
<li>Surveillez la litière sous les lignes d'abreuvement : l'apparition de plaques croûtées signe le début de la réaction uréolytique.</li>
</ul>
`.trim();

  const contentEn2 = `
<p>From the second week of the flock, an ammonia (NH3) odor often begins to saturate the building's air. This concrete symptom manifests as an immediate eye-stinging sensation for the operator and a reflex cough among the poultry. In the field, a common mistake is to blindly increase the ventilation rate. This emergency reaction cools the building, causing thermal stress and a ruinous overconsumption of heating for the farmer. Economically, maintaining a concentration of just 25 ppm of ammonia is enough to degrade the Feed Conversion Ratio (FCR) by 3 to 5% and increase slaughterhouse condemnations due to pododermatitis and breast blisters.</p>
<h2>The Hidden Biochemical Dynamics of the Litter</h2>
<p>Ammonia is not a spontaneously emitted gas, but the final product of an enzymatic reaction. Poultry droppings are rich in uric acid. Under the action of urease enzymes produced by opportunistic ureolytic bacteria, this acid is broken down into ammonia. A typical operator error is waiting for the litter to "crust" before intervening. In reality, the process starts as soon as an imbalance occurs, often exacerbated by a simple leak at the drinking nipples. This moist micro-environment favors the explosion of ureolytic bacteria. Ventilating only flushes out the gaseous ammonia; the microbiological factory itself continues to run at full capacity within the litter.</p>
<h2>Acting at the Source: Blocking the Cycle During Turnaround</h2>
<p>The most strategic intervention occurs upstream, during the sanitary turnaround. A typical case observed in a real installation shows that standard high-pressure washing is not enough: it smooths the surfaces but leaves a residual biofilm and coagulated proteins embedded in the concrete's porosity. This organic substrate becomes the starting point for fermentation in the next flock. The application of a high-performance enzymatic stripping solution like our <a href="/en/produits/bioactive">BIOACTIVE</a> range deeply restructures this organic matrix. By hydrolyzing embedded proteins and lipids, the ureolytic flora is deprived of its original nutritional support, significantly delaying the start of fermentation when the new flock is introduced.</p>
<h2>Neutralizing the Atmosphere in the Presence of Animals</h2>
<p>Once the flock is in place, if the litter's humidity slips out of control, action must be taken on the ambient environment without adding water. Spraying a liquid product directly onto wet litter is a major technical error that worsens bacterial proliferation. The applied microbiological approach requires controlling the airborne flora. This is where air sanitation through the fogging of an air hygiene solution from the <a href="/en/produits/oxylis-hoci">OXYLIS HOCl</a> range makes the difference. By reducing the suspended bacterial pressure in a dry manner, this process neutralizes odorous molecules and protects the birds' respiratory tracts without degrading the building's humidity. Animal comfort is restored, and the farmer regains control of their environmental parameters.</p>
<h2>Operational Recommendations</h2>
<p>Ammonia control is a discipline of active prevention, not reaction:</p>
<ul>
<li>Repair water line leaks in real-time to eliminate fermentation zones.</li>
<li>Strictly respect the contact times of enzymatic detergents during the turnaround to guarantee complete hydrolysis.</li>
<li>Manage ventilation for oxygen and moisture control, not simply as an odor extractor.</li>
<li>Monitor the litter under the drinking lines: the appearance of crusted patches signals the start of the ureolytic reaction.</li>
</ul>
`.trim();

  const contentAr2 = `
<p>بدءًا من الأسبوع الثاني من دورة التربية، غالبًا ما تبدأ رائحة الأمونيا (NH3) في تشبع هواء المبنى. يتجلى هذا العرض الملموس في إحساس فوري بوخز في العين للمشغل وسعال انعكاسي لدى الدواجن. في الميدان، يتمثل الخطأ الشائع في زيادة معدل التهوية بشكل أعمى. يؤدي رد الفعل الطارئ هذا إلى تبريد المبنى، مما يتسبب في إجهاد حراري واستهلاك مفرط ومكلف للتدفئة بالنسبة للمربي. من الناحية الاقتصادية، يكفي الحفاظ على تركيز 25 جزءًا في المليون فقط من الأمونيا لتدهور معدل التحويل الغذائي (FCR) بنسبة 3 إلى 5٪ وزيادة المصادرات في المسلخ بسبب التهاب الجلد التقرحي وحروق الصدر.</p>
<h2>الديناميكيات الكيميائية الحيوية الخفية للفرش</h2>
<p>الأمونيا ليست غازًا ينبعث تلقائيًا، بل هي المنتج النهائي لتفاعل إنزيمي. زرق الدواجن غني بحمض اليوريك. تحت تأثير إنزيمات اليورياز التي تنتجها البكتيريا الانتهازية المحللة لليوريا، يتحلل هذا الحمض إلى أمونيا. من الأخطاء النمطية للمشغل انتظار "تصلب" الفرش قبل التدخل. في الواقع، تبدأ العملية بمجرد حدوث خلل، وغالبًا ما يتفاقم بسبب تسرب بسيط في حلمات الشرب. تعزز هذه البيئة الدقيقة الرطبة الانفجار البكتيري. التهوية لا تؤدي إلا إلى طرد غاز الأمونيا؛ أما المصنع الميكروبيولوجي نفسه فيستمر في العمل بكامل طاقته داخل الفرش.</p>
<h2>العمل من المصدر: كسر الدورة أثناء فترة الراحة الصحية</h2>
<p>يحدث التدخل الأكثر استراتيجية في مرحلة مبكرة، أثناء فترة الراحة الصحية. تظهر حالة نموذجية لوحظت في منشأة حقيقية أن الغسيل القياسي بالضغط العالي لا يكفي: فهو ينعم الأسطح لكنه يترك غشاءً حيويًا متبقيًا وبروتينات متخثرة مدمجة في مسام الخرسانة. تصبح هذه المادة العضوية نقطة الانطلاق للتخمر في القطيع التالي. يتيح تطبيق محلول تقشير إنزيمي عالي الأداء مثل مجموعة <a href="/ar/produits/bioactive">BIOACTIVE</a> تفكيك هذه المصفوفة العضوية بعمق. من خلال التحلل المائي للبروتينات والدهون المدمجة، تُحرم الفلورا المحللة لليوريا من دعمها الغذائي الأصلي، مما يؤخر بشكل كبير بدء التخمر عند إدخال القطيع الجديد.</p>
<h2>تحييد الأجواء في وجود الحيوانات</h2>
<p>بمجرد وضع القطيع، إذا خرجت رطوبة الفرش عن السيطرة، يجب اتخاذ إجراء بشأن البيئة المحيطة دون إضافة الماء. يعد رش منتج سائل مباشرة على فرش رطب خطأً فنيًا كبيرًا يؤدي إلى تفاقم التكاثر البكتيري. يتطلب النهج الميكروبيولوجي التطبيقي التحكم في الفلورا المحمولة جواً. هنا يُحدث تعقيم الهواء من خلال التغشية الدقيقة لمحلول نظافة الهواء من مجموعة <a href="/ar/produits/oxylis-hoci">OXYLIS HOCl</a> فرقًا. من خلال تقليل الضغط البكتيري المعلق بطريقة جافة، تعمل هذه العملية على تحييد الجزيئات المسببة للرائحة وحماية المسالك التنفسية للطيور دون الإضرار برطوبة المبنى. تتم استعادة راحة الحيوان، ويستعيد المربي السيطرة على معاييره البيئية.</p>
<h2>توصيات تشغيلية</h2>
<p>التحكم في الأمونيا هو تخصص للوقاية النشطة، وليس رد فعل:</p>
<ul>
<li>إصلاح تسربات خطوط المياه في الوقت الفعلي للقضاء على مناطق التخمر.</li>
<li>احترام أوقات تلامس المنظفات الإنزيمية بدقة أثناء فترة الراحة لضمان التحلل المائي الكامل.</li>
<li>إدارة التهوية لتوفير الأكسجين والتحكم في الرطوبة، وليس كمجرد مستخرج للروائح.</li>
<li>مراقبة الفرش تحت خطوط الشرب: ظهور بقع متصلبة يشير إلى بداية تفاعل تحلل اليوريا.</li>
</ul>
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
      coverImage: "/images/blog/poultry-air-quality.png",
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
      coverImage: "/images/blog/poultry-air-quality.png",
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
      coverImage: "https://images.unsplash.com/photo-1620853744645-31a890a886b6?q=80&w=1200",
      publishedAt: new Date("2024-10-30"),
    }
  });
  console.log("✅ Article 3 inserted successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
