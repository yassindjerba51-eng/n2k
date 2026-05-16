const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Starting product migration...');

  // 1. Create OXYLIS HOCl
  const oxylisExists = await prisma.product.findUnique({ where: { slug: 'oxylis-hoci' } });
  if (!oxylisExists) {
    await prisma.product.create({
      data: {
        name: 'OXYLIS HOCl',
        slug: 'oxylis-hoci',
        isDisinfectant: false,
        category: 'EAU',
        step: 2,
        description: {
          fr: "Solution technique d'entretien des réseaux, équipements et environnements.",
          en: "Technical maintenance solution for networks, equipment and environments.",
          ar: "محلول تقني لصيانة الشبكات والمعدات والبيئات."
        },
        dosage: 'Selon protocole',
      },
    });
    console.log('✅ Created OXYLIS HOCl');
  } else {
    console.log('⏭️  OXYLIS HOCl already exists');
  }

  // 2. Create ALCOSEPT PRO
  const alcoseptExists = await prisma.product.findUnique({ where: { slug: 'alcosept-pro' } });
  if (!alcoseptExists) {
    await prisma.product.create({
      data: {
        name: 'ALCOSEPT PRO',
        slug: 'alcosept-pro',
        isDisinfectant: false,
        category: 'BATIMENT',
        step: 3,
        description: {
          fr: "Solution de nettoyage à évaporation rapide pour surfaces et équipements techniques.",
          en: "Fast-evaporation cleaning solution for surfaces and technical equipment.",
          ar: "محلول تنظيف سريع التبخر للأسطح والمعدات التقنية."
        },
        dosage: 'Prêt à l\'emploi',
      },
    });
    console.log('✅ Created ALCOSEPT PRO');
  } else {
    console.log('⏭️  ALCOSEPT PRO already exists');
  }

  // 3. Delete old AQUACONTROL N2K
  const aquacontrol = await prisma.product.findUnique({ where: { slug: 'aquacontrol-n2k' } });
  if (aquacontrol) {
    await prisma.product.delete({ where: { slug: 'aquacontrol-n2k' } });
    console.log('🗑️  Deleted AQUACONTROL N2K');
  } else {
    console.log('⏭️  AQUACONTROL N2K not found (already deleted)');
  }

  // 4. Delete old AIRSAN N2K
  const airsan = await prisma.product.findUnique({ where: { slug: 'airsan-n2k' } });
  if (airsan) {
    await prisma.product.delete({ where: { slug: 'airsan-n2k' } });
    console.log('🗑️  Deleted AIRSAN N2K');
  } else {
    console.log('⏭️  AIRSAN N2K not found (already deleted)');
  }

  // 5. Verify
  const allProducts = await prisma.product.findMany({ select: { slug: true, name: true } });
  console.log('\n📦 Current products in DB:');
  allProducts.forEach(p => console.log(`   - ${p.name} (${p.slug})`));
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
