const fs = require('fs');
const path = require('path');

const files = [
  'src/app/(site)/[locale]/contact/page.tsx',
  'src/app/(site)/[locale]/diagnostic/page.tsx',
  'src/app/(site)/[locale]/blog/page.tsx',
  'src/app/(site)/[locale]/produits/page.tsx',
  'src/app/(site)/[locale]/problemes-solutions/page.tsx',
  'src/app/(site)/[locale]/problemes-solutions/batiment/page.tsx',
  'src/app/(site)/[locale]/problemes-solutions/canalisations-eau/page.tsx',
  'src/app/(site)/[locale]/problemes-solutions/ambiance/page.tsx',
  'src/app/(site)/[locale]/secteurs/page.tsx',
  'src/app/(site)/[locale]/secteurs/elevage/page.tsx',
  'src/app/(site)/[locale]/secteurs/abattoirs/page.tsx',
  'src/app/(site)/[locale]/secteurs/industrie-agroalimentaire/page.tsx',
  'src/app/(site)/[locale]/produits/[slug]/page.tsx',
  'src/app/(site)/[locale]/a-propos/page.tsx',
  'src/app/(site)/[locale]/faq/page.tsx',
  'src/app/(site)/[locale]/references/page.tsx',
  'src/app/(site)/[locale]/page.tsx', // Adding the home page as well just in case
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    console.log('Skipping missing file:', file);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Skip if already has alternates: {
  if (content.includes('alternates: {')) {
    console.log('Already has alternates:', file);
    return;
  }

  // Determine what the path should be
  let canonicalPath = '';
  
  if (file.includes('[slug]')) {
    if (file.includes('/produits/')) {
      canonicalPath = '/${locale}/produits/${slug}';
    } else if (file.includes('/secteurs/')) {
      canonicalPath = '/${locale}/secteurs/${slug}';
    }
  } else {
    // static path
    // Extract everything after /[locale]
    const match = file.match(/\[locale\]\/(.*)\/page\.tsx/);
    if (match && match[1]) {
      canonicalPath = '/${locale}/' + match[1];
    } else if (file === 'src/app/(site)/[locale]/page.tsx') {
      canonicalPath = '/${locale}';
    }
  }

  if (canonicalPath) {
    // Add alternates to the return block of generateMetadata
    // Usually it's `return {\n    title:`
    
    // Check if generateMetadata takes `slug` if it's dynamic
    if (canonicalPath.includes('${slug}') && !content.match(/const\s+\{\s*locale,\s*slug\s*\}\s*=\s*await\s+params/)) {
      // Need to make sure slug is extracted
      // Let's rely on standard parsing
    }

    const replaceRegex = /(return\s*\{[\s\S]*?)(title:\s*[^,\n]+,)/;
    if (replaceRegex.test(content)) {
      content = content.replace(replaceRegex, `$1$2\n    alternates: {\n      canonical: \`${canonicalPath}\`,\n    },`);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('Updated:', file);
    } else {
      console.log('Could not match return block in:', file);
    }
  }
});
