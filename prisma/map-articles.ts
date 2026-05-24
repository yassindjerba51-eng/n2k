import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    include: {
      categories: true
    }
  });
  const contentDir = path.join(__dirname, "content");
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith("-fr.html"));

  console.log(`Scanning database posts (${posts.length}) and content files (${files.length})...\n`);

  const results: { fileNum: string; slug: string; title: string; categories: string; mentions: { fr: number; en: number; ar: number } }[] = [];

  for (const p of posts) {
    let matchedFile = "";
    // Clean and normalize content for comparison
    const dbContentClean = p.contentFr.replace(/\s+/g, " ").trim();

    for (const f of files) {
      const fileContent = fs.readFileSync(path.join(contentDir, f), "utf-8");
      const fileContentClean = fileContent.replace(/\s+/g, " ").trim();

      if (dbContentClean === fileContentClean || dbContentClean.substring(0, 200) === fileContentClean.substring(0, 200)) {
        matchedFile = f.split("-")[1]; // e.g. "01"
        break;
      }
    }

    const catSlugs = p.categories.map(c => c.slugFr).join(", ");
    const mentionsFr = (p.contentFr.match(/bioactive/gi) || []).length;
    const mentionsEn = (p.contentEn.match(/bioactive/gi) || []).length;
    const mentionsAr = (p.contentAr.match(/bioactive/gi) || []).length;

    if (matchedFile) {
      results.push({
        fileNum: matchedFile,
        slug: p.slug,
        title: p.titleFr,
        categories: catSlugs,
        mentions: { fr: mentionsFr, en: mentionsEn, ar: mentionsAr }
      });
    } else {
      console.log(`❌ Could not map database post: ${p.slug} (${p.titleFr.substring(0, 30)}...)`);
    }
  }

  console.log(`\nSuccessfully mapped ${results.length} / ${posts.length} posts.\n`);
  
  // Print all posts that have BIOACTIVE mentions
  const bioactivePosts = results.filter(r => r.mentions.fr > 0 || r.mentions.en > 0 || r.mentions.ar > 0);
  console.log(`--- POSTS WITH BIOACTIVE MENTIONS (${bioactivePosts.length}) ---`);
  for (const r of bioactivePosts.sort((a,b) => Number(a.fileNum) - Number(b.fileNum))) {
    console.log(`[Article ${r.fileNum}] ${r.slug}`);
    console.log(`  Title: ${r.title}`);
    console.log(`  Categories: ${r.categories}`);
    console.log(`  Mentions: FR: ${r.mentions.fr} | EN: ${r.mentions.en} | AR: ${r.mentions.ar}`);
    console.log(`  Is Food/Abattoir: ${r.categories.includes("abattoir") || r.categories.includes("agroalimentaire") ? "YES" : "NO"}`);
    console.log("");
  }
}

main().finally(() => prisma.$disconnect());
