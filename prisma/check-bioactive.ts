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

  const matches: { slug: string; fileBase: string }[] = [];

  for (const p of posts) {
    for (const f of files) {
      const content = fs.readFileSync(path.join(contentDir, f), "utf-8");
      const fileNum = f.split("-")[1]; // e.g. "01"
      if (content.includes(p.titleFr.substring(0, 20))) {
        matches.push({ slug: p.slug, fileBase: `article-${fileNum}` });
        break;
      }
    }
  }

  console.log(`Matched ${matches.length} articles to file numbers:\n`);
  for (const m of matches) {
    const post = posts.find(p => p.slug === m.slug);
    if (!post) continue;
    const catSlugs = post.categories.map(c => c.slugFr).join(", ");
    const hasBioactive = post.contentFr.toLowerCase().includes("bioactive") ||
                         post.contentEn.toLowerCase().includes("bioactive") ||
                         post.contentAr.toLowerCase().includes("bioactive");
    const isFood = catSlugs.includes("abattoir") || catSlugs.includes("agroalimentaire");
    if (hasBioactive && isFood) {
      console.log(`File: ${m.fileBase}-*.html | Slug: ${m.slug} | Cats: ${catSlugs}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
