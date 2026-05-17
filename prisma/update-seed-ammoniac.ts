import * as fs from "fs";
import * as path from "path";

const contentFr = `
<p>L'ammoniac (NH3) en bâtiment d'élevage avicole est souvent perçu comme une fatalité liée à la densité des animaux. Dès les premières semaines, l'odeur caractéristique irrite les voies respiratoires des volailles et des opérateurs. La réaction classique consiste à augmenter le taux de ventilation, au prix d'une consommation énergétique excessive. Pourtant, cette approche ne traite que le symptôme, pas la cause.</p>
<h2>L'origine biochimique de l'ammoniac</h2>
<p>L'ammoniac résulte de la dégradation enzymatique de l'acide urique (présent dans les fientes) par des bactéries uréolytiques qui prolifèrent dans la litière. Ce phénomène s'accélère lorsque la litière devient humide, offrant un environnement idéal à cette flore indésirable. Augmenter la ventilation permet d'évacuer le gaz, mais l'"usine" bactérienne continue de produire l'ammoniac en continu.</p>
<h2>Les conséquences zootechniques et économiques</h2>
<p>Une exposition prolongée à l'ammoniac, même à des concentrations modérées (20 ppm), entraîne des lésions des muqueuses respiratoires. Cela ouvre la voie à des infections secondaires (colibacillose, mycoplasmes) et dégrade significativement les performances : baisse du Gain Moyen Quotidien (GMQ), dégradation de l'Indice de Consommation (IC), et augmentation des saisies à l'abattoir (pododermatites et brûlures du bréchet).</p>
<h2>Le protocole N2K : Assainir plutôt que ventiler à l'excès</h2>
<p>La clé d'un contrôle durable de l'ammoniac réside dans une approche systémique combinant préparation de surface, gestion de l'eau et assainissement environnemental :</p>
<ul>
<li><strong>Dégradation organique en vide sanitaire :</strong> Le cycle de l'ammoniac commence bien avant l'arrivée du lot. L'application d'un décapant enzymatique comme <a href="/fr/produits/bioactive">BIOACTIVE</a> permet de détruire en profondeur les protéines coagulées et la matière organique incrustée dans les dalles, privant les bactéries de leur substrat originel.</li>
<li><strong>Contrôle continu de l'ambiance :</strong> Pour bloquer la charge bactérienne de l'air et neutraliser chimiquement les molécules odorantes, l'utilisation de <a href="/fr/produits/oxylis-hoci">OXYLIS HOCl</a> par nébulisation ou micro-pulvérisation stabilise l'environnement sans apporter d'humidité néfaste à la litière.</li>
<li><strong>Gestion rigoureuse des lignes d'eau :</strong> Des pipettes fuyardes sont la cause numéro une d'une litière humide. Un entretien adéquat du réseau d'eau est primordial pour maintenir l'intégrité de la litière.</li>
</ul>
<h2>Conclusion</h2>
<p>Traiter l'ammoniac uniquement par la ventilation est une erreur technique et économique. En intégrant les solutions de biochimie fonctionnelle N2K, vous agissez directement à la source : en bloquant la fermentation de la litière et en assainissant l'atmosphère, vous protégez le capital santé de votre élevage tout en optimisant vos coûts de chauffage.</p>
`.trim();

const contentEn = `
<p>Ammonia (NH3) in poultry houses is often seen as an inevitable consequence of high stocking densities. From the very first weeks, the characteristic odor irritates the respiratory tracts of both poultry and operators. The classic reaction is to increase the ventilation rate, at the cost of excessive energy consumption. However, this approach only treats the symptom, not the root cause.</p>
<h2>The Biochemical Origin of Ammonia</h2>
<p>Ammonia results from the enzymatic degradation of uric acid (present in droppings) by ureolytic bacteria that thrive in the litter. This phenomenon accelerates when the litter becomes moist, providing an ideal environment for this undesirable flora. Increasing ventilation removes the gas, but the bacterial "factory" continues to produce ammonia non-stop.</p>
<h2>Zootechnical and Economic Consequences</h2>
<p>Prolonged exposure to ammonia, even at moderate concentrations (20 ppm), damages respiratory mucous membranes. This paves the way for secondary infections (colibacillosis, mycoplasmas) and significantly degrades performance: reduced Average Daily Gain (ADG), poor Feed Conversion Ratio (FCR), and increased slaughterhouse condemnations (pododermatitis and breast blisters).</p>
<h2>The N2K Protocol: Sanitize Rather Than Over-Ventilate</h2>
<p>The key to sustainable ammonia control lies in a systemic approach combining surface preparation, water management, and environmental sanitation:</p>
<ul>
<li><strong>Organic degradation during turnaround:</strong> The ammonia cycle begins well before the flock arrives. The application of an enzymatic stripper like <a href="/en/produits/bioactive">BIOACTIVE</a> deeply destroys coagulated proteins and organic matter embedded in the concrete, depriving bacteria of their initial substrate.</li>
<li><strong>Continuous ambient control:</strong> To block the airborne bacterial load and chemically neutralize odorous molecules, the use of <a href="/en/produits/oxylis-hoci">OXYLIS HOCl</a> through fogging or micro-spraying stabilizes the environment without adding harmful moisture to the litter.</li>
<li><strong>Rigorous water line management:</strong> Leaking nipples are the number one cause of wet litter. Proper maintenance of the water network is essential to maintain litter integrity.</li>
</ul>
<h2>Conclusion</h2>
<p>Treating ammonia solely through ventilation is a technical and economic mistake. By integrating N2K functional biochemistry solutions, you act directly at the source: by blocking litter fermentation and sanitizing the atmosphere, you protect your flock's health capital while optimizing heating costs.</p>
`.trim();

const contentAr = `
<p>غالبًا ما يُنظر إلى الأمونيا (NH3) في مباني تربية الدواجن على أنها نتيجة حتمية للكثافة العالية. منذ الأسابيع الأولى، تثير الرائحة المميزة تهيج المسالك التنفسية للدواجن والمشغلين. رد الفعل التقليدي هو زيادة معدل التهوية، على حساب الاستهلاك المفرط للطاقة. ومع ذلك، فإن هذا النهج يعالج الأعراض فقط، وليس السبب الجذري.</p>
<h2>الأصل الكيميائي الحيوي للأمونيا</h2>
<p>تنتج الأمونيا عن التحلل الإنزيمي لحمض اليوريك (الموجود في الزرق) بواسطة البكتيريا المحللة لليوريا التي تتكاثر في الفرش. تتسارع هذه الظاهرة عندما يصبح الفرش رطبًا، مما يوفر بيئة مثالية لهذه الفلورا غير المرغوب فيها. زيادة التهوية تزيل الغاز، لكن "المصنع" البكتيري يستمر في إنتاج الأمونيا بشكل مستمر.</p>
<h2>العواقب الحيوانية والاقتصادية</h2>
<p>التعرض المطول للأمونيا، حتى بتركيزات معتدلة (20 جزء في المليون)، يؤدي إلى تلف الأغشية المخاطية التنفسية. هذا يمهد الطريق للعدوى الثانوية (عصيات القولون، الميكوبلازما) ويقلل بشكل كبير من الأداء: انخفاض متوسط الزيادة اليومية (ADG)، تدهور معامل التحويل الغذائي (FCR)، وزيادة المصادرات في المسلخ (التهاب الجلد التقرحي وحروق الصدر).</p>
<h2>بروتوكول N2K: التعقيم بدلاً من التهوية المفرطة</h2>
<p>يكمن مفتاح السيطرة المستدامة على الأمونيا في نهج نظامي يجمع بين إعداد الأسطح وإدارة المياه والتعقيم البيئي:</p>
<ul>
<li><strong>التحلل العضوي خلال فترة الراحة:</strong> تبدأ دورة الأمونيا قبل وقت طويل من وصول القطيع. يتيح استخدام مقشر إنزيمي مثل <a href="/ar/produits/bioactive">BIOACTIVE</a> التدمير العميق للبروتينات المتخثرة والمواد العضوية المدمجة في الأرضيات الخرسانية، مما يحرم البكتيريا من ركيزتها الأولية.</li>
<li><strong>التحكم المستمر في البيئة المحيطة:</strong> لمنع الحمل البكتيري المحمول جواً وتحييد الجزيئات المسببة للروائح كيميائياً، فإن استخدام <a href="/ar/produits/oxylis-hoci">OXYLIS HOCl</a> من خلال التغشية الدقيقة يثبت البيئة دون إضافة رطوبة ضارة إلى الفرش.</li>
<li><strong>الإدارة الصارمة لخطوط المياه:</strong> الحلمات المتسربة هي السبب الأول للفرش الرطب. الصيانة المناسبة لشبكة المياه ضرورية للحفاظ على سلامة الفرش.</li>
</ul>
<h2>خاتمة</h2>
<p>معالجة الأمونيا من خلال التهوية فقط هو خطأ فني واقتصادي. من خلال دمج حلول الكيمياء الحيوية الوظيفية من N2K، فإنك تتصرف مباشرة عند المصدر: من خلال منع تخمر الفرش وتعقيم الجو، فإنك تحمي الرأسمال الصحي لقطيعك مع تحسين تكاليف التدفئة.</p>
`.trim();

const targetFile = path.join(__dirname, "insert-article-2-3.ts");
let fileContent = fs.readFileSync(targetFile, "utf-8");

// Replace contentFr2
const frRegex = /const contentFr2 = `[\s\S]*?`\.trim\(\);/;
fileContent = fileContent.replace(frRegex, `const contentFr2 = \`\n${contentFr}\n\`.trim();`);

// Replace contentEn2
const enRegex = /const contentEn2 = `[\s\S]*?`\.trim\(\);/;
fileContent = fileContent.replace(enRegex, `const contentEn2 = \`\n${contentEn}\n\`.trim();`);

// Replace contentAr2
const arRegex = /const contentAr2 = `[\s\S]*?`\.trim\(\);/;
fileContent = fileContent.replace(arRegex, `const contentAr2 = \`\n${contentAr}\n\`.trim();`);

// Replace image URLs for article 2
fileContent = fileContent.replace(
  /"https:\/\/images\.unsplash\.com\/photo-1548848221-0c2e497ed557\?q=80&w=1200"/g,
  '"/images/blog/poultry-air-quality.png"'
);

fs.writeFileSync(targetFile, fileContent);
console.log("Successfully updated insert-article-2-3.ts");
