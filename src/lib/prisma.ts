import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Limit connection pool to avoid exceeding max_user_connections
    // on shared hosting (limit: 5)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
