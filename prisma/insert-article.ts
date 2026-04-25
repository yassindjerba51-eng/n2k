import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Inserting article: contamination-eau-canalisation-elevage-avicole...");

  const contentFr = `
<h2>Ce que pensent la plupart des éleveurs</h2>
<p>L'eau du robinet est propre. Le réseau d'eau potable est traité. Donc mes animaux boivent une eau saine.</p>
<p>C'est la conviction de beaucoup d'éleveurs — et elle est fausse dès que l'eau passe à travers vos tuyaux internes. L'eau qui entre dans votre exploitation est peut-être correcte. Mais entre la source et la nipponne de votre dernier poulet, elle parcourt des mètres de canalisations qui n'ont jamais vu un produit de nettoyage.</p>

<h2>Ce qui se passe réellement dans vos tuyaux</h2>
<p>À l'intérieur de vos canalisations, deux phénomènes agissent en parallèle.</p>
<p><strong>Le tartre.</strong> Dans les régions à eau calcaire, des dépôts minéraux se forment lentement sur les parois internes. Ces dépôts réduisent le diamètre utile du tuyau. Le débit baisse. Les nipponnes mal approvisionnées ne permettent plus aux animaux de boire suffisamment — surtout en période de chaleur.</p>
<p><strong>Le biofilm.</strong> C'est plus grave. Le biofilm est une couche visqueuse que les bactéries construisent sur les surfaces humides. Il protège les bactéries pathogènes — E. coli, Salmonella, Campylobacter — contre les désinfectants ordinaires. Un désinfectant versé dans un circuit encrassé n'atteint pas les bactéries. Il glisse sur le biofilm sans l'affecter.</p>

<h2>Ce qu'on observe sur le terrain</h2>
<p>Sur le terrain, ce type de problème se reconnaît à des signes qui paraissent anodins au premier regard.</p>
<ul>
<li>Les animaux boivent de façon irrégulière — certains ralentissent sans raison évidente</li>
<li>Les fientes sont anormales, trop liquides, sans que les aliments aient changé</li>
<li>Les performances s'effritent sur plusieurs bandes successives : GMQ en retrait, mortalité en fin de bande légèrement haute</li>
<li>Un dépôt brun ou grisâtre visible à l'intérieur des tuyaux démontés</li>
</ul>
<p>Dans la plupart de ces cas, quand on inspecte le circuit d'eau, le réseau est devenu un réservoir de contamination chronique.</p>

<h2>Pourquoi les traitements échouent</h2>
<p>Le problème principal est simple : on traite la conséquence, pas la cause. On soigne les animaux malades avec des médicaments. Mais l'eau qu'ils boivent le lendemain est toujours contaminée. Le cycle recommence.</p>
<p>Croire que verser un désinfectant dans le circuit suffit est une erreur fréquente. Un désinfectant ne peut pas traverser un biofilm épais. Il agit seulement sur les surfaces propres. Si le circuit n'a pas été nettoyé avant, le désinfectant est inefficace.</p>

<h2>Les erreurs les plus courantes</h2>
<ul>
<li>Ne jamais nettoyer le circuit d'eau entre les bandes — seulement vider et rincer</li>
<li>Verser du chlore dans l'eau sans traitement préalable du biofilm</li>
<li>Négliger les nipponnes — elles s'encrassent et contaminent directement l'eau au point de boisson</li>
<li>Confondre eau claire et eau saine — une eau visuellement propre peut être bactériologiquement chargée</li>
<li>Attendre les signes cliniques — à ce stade, la pression microbienne a déjà impacté les performances</li>
</ul>

<h2>Solutions pratiques à mettre en place</h2>
<p><strong>Avant la mise en place :</strong> Vider complètement le circuit. Appliquer un produit de nettoyage enzymatique spécifique pour les canalisations. Laisser agir le temps de contact recommandé. Rincer sous pression pour expulser les dépôts. Contrôler et remplacer les nipponnes encrassées.</p>
<p><strong>Pendant la bande :</strong> Maintenir un traitement quotidien de l'eau de boisson via un système de dosage. Vérifier le pH et le débit de façon hebdomadaire. Ne jamais laisser de l'eau stagner plus de 24h dans les zones à faible consommation.</p>
<p><strong>En fin de bande :</strong> Traiter le circuit dès le départ des animaux, pendant que le bâtiment est encore chaud. Ne pas confondre nettoyage du bâtiment et traitement des tuyaux — ce sont deux actions distinctes.</p>

<h2>Ce que fait un expert en hygiène</h2>
<p>Un technicien formé ne se contente pas de visiter le bâtiment. Il inspecte le réseau d'eau en priorité. Il commence par évaluer la qualité de l'eau à l'entrée du bâtiment et au point de boisson final — les deux résultats ne sont presque jamais identiques. Cette différence mesure ce que vos canalisations ajoutent à l'eau.</p>
<p>Il applique ensuite un protocole en deux phases. La première est curative : un nettoyage enzymatique formulé pour attaquer les dépôts organiques et le tartre, à concentration adaptée selon le degré d'encrassement. La seconde est préventive : un traitement continu de l'eau de boisson pour maintenir une qualité microbiologique stable tout au long de la bande.</p>
<p>L'objectif est de rendre le circuit d'eau contrôlé et fiable. Un réseau propre réduit la pression bactérienne permanente sur les animaux, libère leur système immunitaire pour la croissance, et améliore mécaniquement les résultats de fin de bande.</p>
`.trim();

  const contentEn = `
<h2>What most farmers believe</h2>
<p>Tap water is clean. The drinking water network is treated. So my animals drink safe water.</p>
<p>This is what many poultry farmers believe — and it is wrong as soon as the water passes through your internal pipes. The water entering your farm may be acceptable, but between the source and the last drinker, it travels through meters of pipework that has never seen a cleaning product.</p>

<h2>What really happens inside your pipes</h2>
<p>Inside your water pipes, two phenomena work simultaneously.</p>
<p><strong>Scale.</strong> In hard water areas, mineral deposits build up slowly on internal walls. These deposits reduce the pipe's useful diameter. Flow rate drops. Poorly supplied drinkers can't deliver enough water to animals — especially during hot periods.</p>
<p><strong>Biofilm.</strong> This is more serious. Biofilm is a sticky layer that bacteria build on wet surfaces. It protects pathogens — E. coli, Salmonella, Campylobacter — from ordinary disinfectants. A disinfectant poured into a fouled circuit doesn't reach the bacteria. It slides over the biofilm without affecting it.</p>

<h2>What we observe on site</h2>
<p>On the farm, this type of problem shows signs that appear harmless at first glance.</p>
<ul>
<li>Animals drink irregularly — some slow down without obvious reason</li>
<li>Droppings are abnormal, too liquid, without any feed change</li>
<li>Performance erodes over several consecutive flocks: lower daily weight gain, slightly higher end-of-flock mortality</li>
<li>Brown or grey deposits visible inside dismantled pipes</li>
</ul>

<h2>Why treatments fail</h2>
<p>The main problem is simple: you treat the consequence, not the cause. Animals are treated with medication, but the water they drink the next day is still contaminated. The cycle repeats.</p>
<p>Believing that pouring a disinfectant into the circuit is enough is a common mistake. A disinfectant cannot penetrate a thick biofilm. It only works on clean surfaces. If the circuit hasn't been cleaned first, the disinfectant is ineffective.</p>

<h2>Most common mistakes</h2>
<ul>
<li>Never cleaning the water circuit between flocks — only draining and rinsing</li>
<li>Adding chlorine to water without prior biofilm treatment</li>
<li>Neglecting drinkers — they foul up and contaminate water directly at the drinking point</li>
<li>Confusing clear water with safe water — visually clean water can be bacteriologically loaded</li>
<li>Waiting for clinical signs — by then, microbial pressure has already impacted performance</li>
</ul>

<h2>Practical solutions</h2>
<p><strong>Before placement:</strong> Fully drain the circuit. Apply an enzymatic cleaning product specifically formulated for pipework. Allow the recommended contact time. Rinse under pressure to flush out loosened deposits. Inspect and replace fouled drinkers.</p>
<p><strong>During the flock:</strong> Maintain daily drinking water treatment via a dosing system. Check pH and flow rate weekly. Never allow water to stagnate for more than 24 hours in low-consumption areas.</p>

<h2>What a hygiene expert does</h2>
<p>A trained technician doesn't just inspect the building. They prioritize the water circuit. They evaluate water quality at the building inlet and at the final drinking point — the two results are almost never identical. This difference measures what your pipes are adding to the water.</p>
<p>They then apply a two-phase protocol. The first phase is curative: an enzymatic cleaning of the pipework. The second phase is preventive: continuous drinking water treatment to maintain stable microbiological quality throughout the flock cycle.</p>
`.trim();

  const contentAr = `
<h2>ما يعتقده معظم المربين</h2>
<p>مياه الصنبور نظيفة، وشبكة مياه الشرب معالجة، إذن حيواناتي تشرب ماء صحياً.</p>
<p>هذا ما يعتقده كثير من مربي الدواجن — وهو خطأ فور مرور الماء عبر أنابيبك الداخلية. المياه التي تدخل مزرعتك قد تكون مقبولة، لكنها تجتاز أمتاراً من الأنابيب التي لم ترَ منتج تنظيف قط.</p>

<h2>ما يحدث فعلاً داخل أنابيبك</h2>
<p>داخل أنابيب المياه، ظاهرتان تعملان في آنٍ واحد.</p>
<p><strong>الترسبات الكلسية:</strong> في المناطق ذات المياه الجيرية، تتراكم الرواسب المعدنية ببطء على الجدران الداخلية، مما يقلل قطر الأنبوب ويخفض معدل التدفق.</p>
<p><strong>الغشاء الحيوي:</strong> وهو الأخطر. الغشاء الحيوي طبقة لزجة تبنيها البكتيريا على الأسطح الرطبة، تحمي فيها مسببات الأمراض من المطهرات العادية. المطهر الذي يُسكب في دائرة متسخة لا يصل إلى البكتيريا.</p>

<h2>ما يُلاحظ على أرض الواقع</h2>
<ul>
<li>الحيوانات تشرب بشكل غير منتظم دون سبب واضح</li>
<li>البراز غير طبيعي وسائل دون تغيير العلف</li>
<li>تراجع الأداء على مدى عدة دورات متتالية</li>
<li>رواسب بنية أو رمادية داخل الأنابيب المفككة</li>
</ul>

<h2>الأخطاء الشائعة</h2>
<ul>
<li>عدم تنظيف دائرة المياه بين الدورات — الاكتفاء بالتصريف والشطف</li>
<li>إضافة الكلور للمياه دون معالجة الغشاء الحيوي مسبقاً</li>
<li>إهمال الحلمات — تتلوث وتنقل التلوث مباشرة عند نقطة الشرب</li>
<li>الخلط بين الماء الصافي والماء الصحي — الماء النظيف بصرياً قد يكون ملوثاً بكتيريولوجياً</li>
</ul>

<h2>ما يفعله خبير النظافة</h2>
<p>الفني المدرب لا يكتفي بفحص المبنى، بل يُعطي الأولوية لدائرة المياه. يقيّم جودة المياه عند مدخل المبنى وعند نقطة الشرب الأخيرة — النتيجتان لا تتطابقان تقريباً أبداً.</p>
<p>ثم يُطبق بروتوكولاً من مرحلتين: المرحلة الأولى علاجية عبر تنظيف إنزيمي للأنابيب، والمرحلة الثانية وقائية عبر معالجة مستمرة لمياه الشرب طوال دورة الإنتاج.</p>
`.trim();

  // Check if article already exists
  const existing = await prisma.blogPost.findUnique({
    where: { slug: "contamination-eau-canalisation-elevage-avicole" }
  });

  if (existing) {
    console.log("Article already exists — updating...");
    await prisma.blogPost.update({
      where: { slug: "contamination-eau-canalisation-elevage-avicole" },
      data: {
        titleFr: "Eau de boisson en élevage : pourquoi vos canalisations sabotent vos résultats zootechniques",
        titleEn: "Drinking Water in Poultry Farming: Why Your Pipes Are Sabotaging Your Results",
        titleAr: "مياه الشرب في تربية الدواجن: لماذا تُخرب أنابيبك نتائجك الإنتاجية",
        contentFr,
        contentEn,
        contentAr,
        coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
        publishedAt: new Date("2024-10-14"),
      }
    });
  } else {
    console.log("Inserting new article...");
    await prisma.blogPost.create({
      data: {
        titleFr: "Eau de boisson en élevage : pourquoi vos canalisations sabotent vos résultats zootechniques",
        titleEn: "Drinking Water in Poultry Farming: Why Your Pipes Are Sabotaging Your Results",
        titleAr: "مياه الشرب في تربية الدواجن: لماذا تُخرب أنابيبك نتائجك الإنتاجية",
        slug: "contamination-eau-canalisation-elevage-avicole",
        contentFr,
        contentEn,
        contentAr,
        coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
        publishedAt: new Date("2024-10-14"),
      }
    });
  }

  console.log("✅ Article inserted successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
