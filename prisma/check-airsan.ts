import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: {
      OR: [
        { contentFr: { contains: 'airsan' } },
        { contentEn: { contains: 'airsan' } },
        { contentAr: { contains: 'airsan' } },
      ]
    }
  });
  console.log(`Found ${posts.length} posts with 'airsan'`);
  posts.forEach(p => console.log(p.slug));
}

main().finally(() => prisma.$disconnect());
