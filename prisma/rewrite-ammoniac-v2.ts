import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const contentFr = `
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

const contentEn = `
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

const contentAr = `
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

async function updateDb() {
  console.log("Updating article in DB...");
  await prisma.blogPost.update({
    where: { slug: "ammoniac-persistant-batiment-elevage-avicole" },
    data: {
      contentFr: contentFr,
      contentEn: contentEn,
      contentAr: contentAr,
    }
  });
  console.log("DB updated.");
}

function updateSeed() {
  console.log("Updating seed file...");
  const targetFile = path.join(__dirname, "insert-article-2-3.ts");
  let fileContent = fs.readFileSync(targetFile, "utf-8");

  const frRegex = /const contentFr2 = `[\s\S]*?`\.trim\(\);/;
  fileContent = fileContent.replace(frRegex, `const contentFr2 = \`\n${contentFr}\n\`.trim();`);

  const enRegex = /const contentEn2 = `[\s\S]*?`\.trim\(\);/;
  fileContent = fileContent.replace(enRegex, `const contentEn2 = \`\n${contentEn}\n\`.trim();`);

  const arRegex = /const contentAr2 = `[\s\S]*?`\.trim\(\);/;
  fileContent = fileContent.replace(arRegex, `const contentAr2 = \`\n${contentAr}\n\`.trim();`);

  fs.writeFileSync(targetFile, fileContent);
  console.log("Seed file updated.");
}

async function main() {
  await updateDb();
  updateSeed();
}

main().catch(console.error).finally(() => prisma.$disconnect());
