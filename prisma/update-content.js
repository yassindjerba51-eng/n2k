const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const articles = require('./seed-articles-data');

const prisma = new PrismaClient();

async function main() {
  const contentDir = path.join(__dirname, 'content');

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    const num = String(i + 1).padStart(2, '0');
    const contentFile = path.join(contentDir, `article-${num}.html`);

    if (!fs.existsSync(contentFile)) {
      console.log(`Skipping article ${num}: content file not found`);
      continue;
    }

    const contentFr = fs.readFileSync(contentFile, 'utf-8');

    try {
      await prisma.blogPost.update({
        where: { slugFr: a.slug },
        data: {
          contentFr: contentFr,
          contentEn: contentFr,
          contentAr: contentFr,
        }
      });
      console.log(`✅ Updated Article ${num}: ${a.title}`);
    } catch (err) {
      console.error(`❌ Failed to update Article ${num}:`, err.message);
    }
  }
}

main()
  .then(() => { console.log('🎉 Update complete!'); prisma.$disconnect(); })
  .catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });
