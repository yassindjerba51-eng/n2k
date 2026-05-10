const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const articles = require('./seed-articles-data');

const prisma = new PrismaClient();

async function main() {
  const contentDir = path.join(__dirname, 'content');
  const baseDate = new Date('2025-03-10T08:00:00Z');

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    const num = String(i + 1).padStart(2, '0');
    const contentFile = path.join(contentDir, `article-${num}.html`);

    if (!fs.existsSync(contentFile)) {
      console.log(`⚠ Skipping article ${num}: content file not found`);
      continue;
    }

    const contentFr = fs.readFileSync(contentFile, 'utf-8');
    const publishDate = new Date(baseDate.getTime() + a.publishOffset * 86400000);

    // Check if already exists
    const existing = await prisma.blogPost.findUnique({ where: { slugFr: a.slug } });
    if (existing) {
      console.log(`⏭ Article ${num} already exists: ${a.slug}`);
      continue;
    }

    try {
      await prisma.blogPost.create({
        data: {
          slug: a.slug,
          slugFr: a.slug,
          slugEn: a.slug + '-en',
          slugAr: a.slug + '-ar',
          coverImage: a.coverImage,
          featured: a.featured,
          titleFr: a.title,
          titleEn: a.title,
          titleAr: a.title,
          metaTitleFr: a.metaTitle,
          metaTitleEn: a.metaTitle,
          metaTitleAr: a.metaTitle,
          metaDescFr: a.metaDesc,
          metaDescEn: a.metaDesc,
          metaDescAr: a.metaDesc,
          contentFr: contentFr,
          contentEn: contentFr,
          contentAr: contentFr,
          publishedAt: publishDate,
          categories: {
            connect: a.categoryIds.map(id => ({ id }))
          }
        }
      });
      console.log(`✅ Article ${num}: ${a.title}`);
    } catch (err) {
      console.error(`❌ Article ${num} failed:`, err.message);
    }
  }
}

main()
  .then(() => { console.log('\n🎉 Seed complete!'); prisma.$disconnect(); })
  .catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });
