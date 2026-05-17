import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fixing airsan-n2k links to oxylis-hoci in blog_posts...");

  try {
    const updatedPosts = await prisma.$executeRawUnsafe(
      "UPDATE blog_posts SET " +
      "content_fr = REPLACE(content_fr, 'produits/airsan-n2k', 'produits/oxylis-hoci'), " +
      "content_en = REPLACE(content_en, 'produits/airsan-n2k', 'produits/oxylis-hoci'), " +
      "content_ar = REPLACE(content_ar, 'produits/airsan-n2k', 'produits/oxylis-hoci') " +
      "WHERE content_fr LIKE '%produits/airsan-n2k%' OR content_en LIKE '%produits/airsan-n2k%' OR content_ar LIKE '%produits/airsan-n2k%'"
    );
    console.log(`✅ Blog posts updated in database: ${updatedPosts} rows affected.`);
  } catch (error) {
    console.error("Error updating blog posts:", (error as Error).message);
  }

  console.log("\n✅ All AIRSAN links fixed!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
