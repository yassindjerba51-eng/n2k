import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fixing AQUACONTROL references to OXYLIS HOCl in blog_posts...");

  try {
    // 1. Replace links first to ensure we don't accidentally create bad URLs
    await prisma.$executeRawUnsafe(`
      UPDATE blog_posts SET 
      content_fr = REPLACE(content_fr, 'produits/aquacontrol-n2k', 'produits/oxylis-hoci'),
      content_en = REPLACE(content_en, 'produits/aquacontrol-n2k', 'produits/oxylis-hoci'),
      content_ar = REPLACE(content_ar, 'produits/aquacontrol-n2k', 'produits/oxylis-hoci')
      WHERE content_fr LIKE '%produits/aquacontrol-n2k%' OR content_en LIKE '%produits/aquacontrol-n2k%' OR content_ar LIKE '%produits/aquacontrol-n2k%'
    `);

    await prisma.$executeRawUnsafe(`
      UPDATE blog_posts SET 
      content_fr = REPLACE(content_fr, 'produits/aquacontrol', 'produits/oxylis-hoci'),
      content_en = REPLACE(content_en, 'produits/aquacontrol', 'produits/oxylis-hoci'),
      content_ar = REPLACE(content_ar, 'produits/aquacontrol', 'produits/oxylis-hoci')
      WHERE content_fr LIKE '%produits/aquacontrol%' OR content_en LIKE '%produits/aquacontrol%' OR content_ar LIKE '%produits/aquacontrol%'
    `);

    // 2. Replace text with N2K suffix
    await prisma.$executeRawUnsafe(`
      UPDATE blog_posts SET 
      content_fr = REPLACE(content_fr, 'AQUACONTROL N2K', 'OXYLIS HOCl N2K'),
      content_en = REPLACE(content_en, 'AQUACONTROL N2K', 'OXYLIS HOCl N2K'),
      content_ar = REPLACE(content_ar, 'AQUACONTROL N2K', 'OXYLIS HOCl N2K')
      WHERE content_fr LIKE '%AQUACONTROL N2K%' OR content_en LIKE '%AQUACONTROL N2K%' OR content_ar LIKE '%AQUACONTROL N2K%'
    `);

    // 3. Replace text without suffix
    const finalUpdate = await prisma.$executeRawUnsafe(`
      UPDATE blog_posts SET 
      content_fr = REPLACE(content_fr, 'AQUACONTROL', 'OXYLIS HOCl'),
      content_en = REPLACE(content_en, 'AQUACONTROL', 'OXYLIS HOCl'),
      content_ar = REPLACE(content_ar, 'AQUACONTROL', 'OXYLIS HOCl')
      WHERE content_fr LIKE '%AQUACONTROL%' OR content_en LIKE '%AQUACONTROL%' OR content_ar LIKE '%AQUACONTROL%'
    `);

    console.log(`✅ Text replacements completed. (Final step affected ${finalUpdate} rows)`);

  } catch (error) {
    console.error("Error updating blog posts:", (error as Error).message);
  }

  // Also check if there's any remaining `AQUACONTROL` anywhere
  const posts = await prisma.blogPost.findMany({
    where: {
      OR: [
        { contentFr: { contains: 'AQUACONTROL' } },
        { contentEn: { contains: 'AQUACONTROL' } },
        { contentAr: { contains: 'AQUACONTROL' } },
        { titleFr: { contains: 'AQUACONTROL' } },
        { titleEn: { contains: 'AQUACONTROL' } },
        { titleAr: { contains: 'AQUACONTROL' } }
      ]
    }
  });

  if (posts.length > 0) {
    console.warn(`⚠️ Warning: Found ${posts.length} posts that still contain AQUACONTROL (maybe in lowercase or titles).`);
  } else {
    console.log("✅ All AQUACONTROL references successfully removed from blog_posts!");
  }
}

main().finally(() => prisma.$disconnect());
