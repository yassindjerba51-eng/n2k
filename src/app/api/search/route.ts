import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [], posts: [], pages: [] });
  }

  const query = q.toLowerCase();

  try {
    // 1. Search Products
    const products = await prisma.product.findMany({
      where: {
        name: { contains: query },
      },
      take: 5,
    });

    // 2. Search Blog Posts
    const posts = await prisma.blogPost.findMany({
      where: {
        OR: [
          { titleFr: { contains: query } },
          { titleEn: { contains: query } },
          { titleAr: { contains: query } },
          { contentFr: { contains: query } },
          { contentEn: { contains: query } },
          { contentAr: { contains: query } },
        ],
        publishedAt: { lte: new Date() },
      },
      take: 5,
    });

    // 3. Static Pages Search
    const staticPages = [
      {
        title: "Problèmes & Solutions - Bâtiment",
        url: "/problemes-solutions/batiment",
        keywords: ["problème", "solution", "bâtiment", "elevage", "biofilm"],
      },
      {
        title: "Problèmes & Solutions - Canalisations d'eau",
        url: "/problemes-solutions/canalisations-eau",
        keywords: ["eau", "canalisation", "tartre", "biofilm", "solution"],
      },
      {
        title: "Problèmes & Solutions - Ambiance",
        url: "/problemes-solutions/ambiance",
        keywords: ["ambiance", "air", "respiratoire", "solution"],
      },
      {
        title: "Secteurs d'activité",
        url: "/secteurs",
        keywords: ["secteur", "activité", "elevage", "abattoir", "agroalimentaire"],
      },
      {
        title: "À propos",
        url: "/a-propos",
        keywords: ["propos", "about", "laboratoires", "n2k", "histoire", "équipe"],
      },
      {
        title: "Contact",
        url: "/contact",
        keywords: ["contact", "message", "email", "téléphone", "adresse"],
      },
      {
        title: "Diagnostic",
        url: "/diagnostic",
        keywords: ["diagnostic", "demande", "formulaire"],
      },
    ];

    const pages = staticPages.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.keywords.some((k) => k.includes(query))
    );

    return NextResponse.json({
      products: products.map((p) => ({
        title: p.name,
        url: `/produits/${p.slug}`,
      })),
      posts: posts.map((p) => ({
        // Assuming French title as default for results
        title: p.titleFr,
        url: `/blog/${p.slugFr || p.slug}`,
      })),
      pages: pages.map((p) => ({
        title: p.title,
        url: p.url,
      })),
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
