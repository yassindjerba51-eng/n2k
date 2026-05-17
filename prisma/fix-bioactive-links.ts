import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Fixing BIOACTIVE N2K links...\n");

  // 1. Update product slug in the database
  try {
    const updatedProduct = await prisma.$executeRawUnsafe(
      "UPDATE products SET slug = 'bioactive' WHERE slug = 'bioactive-n2k'"
    );
    console.log(`✅ Product slug updated in database: ${updatedProduct} rows affected.`);
  } catch (error) {
    console.error("Error updating product slug:", (error as Error).message);
  }

  // 2. Update blog posts content in the database
  try {
    const updatedPosts = await prisma.$executeRawUnsafe(
      "UPDATE blog_posts SET " +
      "content_fr = REPLACE(content_fr, 'produits/bioactive-n2k', 'produits/bioactive'), " +
      "content_en = REPLACE(content_en, 'produits/bioactive-n2k', 'produits/bioactive'), " +
      "content_ar = REPLACE(content_ar, 'produits/bioactive-n2k', 'produits/bioactive') " +
      "WHERE content_fr LIKE '%produits/bioactive-n2k%' OR content_en LIKE '%produits/bioactive-n2k%' OR content_ar LIKE '%produits/bioactive-n2k%'"
    );
    console.log(`✅ Blog posts updated in database: ${updatedPosts} rows affected.`);
  } catch (error) {
    console.error("Error updating blog posts:", (error as Error).message);
  }

  // 3. Update prisma/seed.ts
  const seedFile = path.join(__dirname, "seed.ts");
  if (fs.existsSync(seedFile)) {
    let seedContent = fs.readFileSync(seedFile, "utf-8");
    if (seedContent.includes('slug: "bioactive-n2k"')) {
      seedContent = seedContent.replace('slug: "bioactive-n2k"', 'slug: "bioactive"');
      fs.writeFileSync(seedFile, seedContent);
      console.log("✅ seed.ts updated.");
    }
  }

  // 4. Update HTML files in prisma/content
  const contentDir = path.join(__dirname, "content");
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir);
    let filesUpdated = 0;
    for (const file of files) {
      if (file.endsWith(".html")) {
        const filePath = path.join(contentDir, file);
        let htmlContent = fs.readFileSync(filePath, "utf-8");
        if (htmlContent.includes("produits/bioactive-n2k")) {
          htmlContent = htmlContent.replace(/produits\/bioactive-n2k/g, "produits/bioactive");
          fs.writeFileSync(filePath, htmlContent);
          filesUpdated++;
        }
      }
    }
    console.log(`✅ HTML content files updated: ${filesUpdated} files modified.`);
  }

  // 5. Update insert-article-*.ts files just in case they have it
  const filesInPrisma = fs.readdirSync(__dirname);
  let tsFilesUpdated = 0;
  for (const file of filesInPrisma) {
    if (file.startsWith("insert-article-") && file.endsWith(".ts")) {
      const filePath = path.join(__dirname, file);
      let tsContent = fs.readFileSync(filePath, "utf-8");
      if (tsContent.includes("produits/bioactive-n2k")) {
        tsContent = tsContent.replace(/produits\/bioactive-n2k/g, "produits/bioactive");
        fs.writeFileSync(filePath, tsContent);
        tsFilesUpdated++;
      }
    }
  }
  console.log(`✅ TS seed scripts updated: ${tsFilesUpdated} files modified.`);

  console.log("\n✅ All BIOACTIVE links fixed!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
