import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: {
      OR: [
        { contentFr: { contains: 'aquacontrol' } },
        { contentEn: { contains: 'aquacontrol' } },
        { contentAr: { contains: 'aquacontrol' } },
        { titleFr: { contains: 'aquacontrol' } },
        { titleEn: { contains: 'aquacontrol' } },
        { titleAr: { contains: 'aquacontrol' } }
      ]
    }
  });

  if (posts.length > 0) {
    console.warn(`Found ${posts.length} posts with 'aquacontrol':`);
    posts.forEach(p => console.log(p.slug));
  } else {
    console.log("No posts with 'aquacontrol' found!");
  }
}

main().finally(() => prisma.$disconnect());
