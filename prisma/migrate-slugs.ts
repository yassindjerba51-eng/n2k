import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function columnExists(table: string, column: string): Promise<boolean> {
  const result: any[] = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*) as cnt FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}' AND COLUMN_NAME = '${column}'`
  );
  return Number(result[0]?.cnt) > 0;
}

async function addColumnIfNotExists(table: string, column: string, definition: string) {
  if (!(await columnExists(table, column))) {
    await prisma.$executeRawUnsafe(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    console.log(`    + Added column ${column}`);
  } else {
    console.log(`    ~ Column ${column} already exists`);
  }
}

async function main() {
  console.log("🔄 Migrating blog post schema...");

  // Step 1: Add new columns
  await addColumnIfNotExists("blog_posts", "slug_fr", "VARCHAR(255) DEFAULT ''");
  await addColumnIfNotExists("blog_posts", "slug_en", "VARCHAR(255) DEFAULT ''");
  await addColumnIfNotExists("blog_posts", "slug_ar", "VARCHAR(255) DEFAULT ''");
  await addColumnIfNotExists("blog_posts", "featured", "TINYINT(1) DEFAULT 0");
  await addColumnIfNotExists("blog_posts", "meta_title_fr", "VARCHAR(500) NULL");
  await addColumnIfNotExists("blog_posts", "meta_title_en", "VARCHAR(500) NULL");
  await addColumnIfNotExists("blog_posts", "meta_title_ar", "VARCHAR(500) NULL");
  await addColumnIfNotExists("blog_posts", "meta_desc_fr", "VARCHAR(1000) NULL");
  await addColumnIfNotExists("blog_posts", "meta_desc_en", "VARCHAR(1000) NULL");
  await addColumnIfNotExists("blog_posts", "meta_desc_ar", "VARCHAR(1000) NULL");
  console.log("  ✅ Columns added");

  // Step 2: Copy slug → slug_fr, slug_en, slug_ar (with unique suffixes)
  const result = await prisma.$executeRawUnsafe(`
    UPDATE blog_posts 
    SET slug_fr = slug, 
        slug_en = CONCAT(slug, '-en'),
        slug_ar = CONCAT(slug, '-ar')
    WHERE slug_fr = '' OR slug_fr IS NULL
  `);
  console.log(`  ✅ ${result} slugs migrated (slug → slug_fr, slug-en, slug-ar)`);

  // Step 3: Drop tags column if it exists
  if (await columnExists("blog_posts", "tags")) {
    await prisma.$executeRawUnsafe(`ALTER TABLE blog_posts DROP COLUMN tags`);
    console.log("  ✅ tags column dropped");
  }

  // Step 4: Drop category_id FK, index, and column
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE blog_posts DROP FOREIGN KEY blog_posts_category_id_fkey`);
  } catch { /* ignore if not exists */ }
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE blog_posts DROP INDEX blog_posts_category_id_idx`);
  } catch { /* ignore */ }
  if (await columnExists("blog_posts", "category_id")) {
    await prisma.$executeRawUnsafe(`ALTER TABLE blog_posts DROP COLUMN category_id`);
    console.log("  ✅ category_id column dropped");
  }

  // Step 5: Add unique constraints
  const indexes: any[] = await prisma.$queryRawUnsafe(
    `SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_NAME = 'blog_posts' AND INDEX_NAME LIKE 'blog_posts_slug_%_key'`
  );
  const existingIndexes = indexes.map((i: any) => i.INDEX_NAME);

  for (const col of ["slug_fr", "slug_en", "slug_ar"]) {
    const idxName = `blog_posts_${col}_key`;
    if (!existingIndexes.includes(idxName)) {
      await prisma.$executeRawUnsafe(`ALTER TABLE blog_posts ADD UNIQUE INDEX ${idxName} (${col})`);
      console.log(`    + Added unique index ${idxName}`);
    } else {
      console.log(`    ~ Index ${idxName} already exists`);
    }
  }
  console.log("  ✅ Unique constraints done");

  // Step 6: Create join table for many-to-many
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS _BlogPostCategories (
      A INT NOT NULL,
      B INT NOT NULL,
      UNIQUE INDEX _BlogPostCategories_AB_unique (A, B),
      INDEX _BlogPostCategories_B_index (B),
      CONSTRAINT _BlogPostCategories_A_fkey FOREIGN KEY (A) REFERENCES blog_posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT _BlogPostCategories_B_fkey FOREIGN KEY (B) REFERENCES blog_categories(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);
  console.log("  ✅ Join table _BlogPostCategories created");

  console.log("\n✅ Migration complete!");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
