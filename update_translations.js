const fs = require('fs');

function updateTranslation(file, updates) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (!data.about.team) {
    data.about.team = {};
  }
  
  Object.assign(data.about.team, updates);
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

updateTranslation('messages/fr.json', {
  issamName: "Mr. Issam Khalsi",
  issamRole: "Gérant",
  issamDesc: "Assure la gestion générale de la société, le développement commercial ainsi que la coordination stratégique des activités, avec une forte orientation terrain et performance.",
  mouradName: "Mr. Mourad Ben Amour",
  mouradRole: "Ingénieur agricole spécialisé en production animale",
  mouradDesc: "Intervient comme expert technique dans les domaines de l'élevage, de la biosécurité, de la nutrition animale et de l'optimisation des performances zootechniques."
});

updateTranslation('messages/en.json', {
  issamName: "Mr. Issam Khalsi",
  issamRole: "Manager",
  issamDesc: "Ensures the general management of the company, commercial development, and strategic coordination of activities, with a strong focus on field and performance.",
  mouradName: "Mr. Mourad Ben Amour",
  mouradRole: "Agricultural engineer specializing in animal production",
  mouradDesc: "Acts as a technical expert in the fields of breeding, biosecurity, animal nutrition, and optimization of zootechnical performance."
});

updateTranslation('messages/ar.json', {
  issamName: "السيد عصام الخلصي",
  issamRole: "المدير العام",
  issamDesc: "يضمن الإدارة العامة للشركة، التطوير التجاري، والتنسيق الاستراتيجي للأنشطة، مع توجه قوي نحو الميدان والأداء.",
  mouradName: "السيد مراد بن عمور",
  mouradRole: "مهندس فلاحي متخصص في الإنتاج الحيواني",
  mouradDesc: "يتدخل كخبير فني في مجالات التربية، الأمن الحيوي، تغذية الحيوان، وتحسين الأداء الحيواني."
});

console.log('Translations updated successfully.');
