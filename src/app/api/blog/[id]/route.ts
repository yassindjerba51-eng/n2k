import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const post = await prisma.blogPost.findUnique({
      where: { id: Number(id) },
      include: { categories: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const {
      slug, slugFr, slugEn, slugAr,
      coverImage, featured,
      titleFr, titleEn, titleAr,
      metaTitleFr, metaTitleEn, metaTitleAr,
      metaDescFr, metaDescEn, metaDescAr,
      contentFr, contentEn, contentAr,
      publishedAt, categoryIds,
    } = body;

    // Disconnect all existing categories, then reconnect selected ones
    const post = await prisma.blogPost.update({
      where: { id: Number(id) },
      data: {
        slug: slug || slugFr || undefined,
        slugFr: slugFr || undefined,
        slugEn: slugEn || undefined,
        slugAr: slugAr || undefined,
        coverImage: coverImage !== undefined ? coverImage : undefined,
        featured: featured !== undefined ? featured : undefined,
        titleFr: titleFr || undefined,
        titleEn: titleEn || undefined,
        titleAr: titleAr || undefined,
        metaTitleFr: metaTitleFr !== undefined ? metaTitleFr : undefined,
        metaTitleEn: metaTitleEn !== undefined ? metaTitleEn : undefined,
        metaTitleAr: metaTitleAr !== undefined ? metaTitleAr : undefined,
        metaDescFr: metaDescFr !== undefined ? metaDescFr : undefined,
        metaDescEn: metaDescEn !== undefined ? metaDescEn : undefined,
        metaDescAr: metaDescAr !== undefined ? metaDescAr : undefined,
        contentFr: contentFr !== undefined ? contentFr : undefined,
        contentEn: contentEn !== undefined ? contentEn : undefined,
        contentAr: contentAr !== undefined ? contentAr : undefined,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        categories: categoryIds !== undefined
          ? { set: categoryIds.map((cid: number) => ({ id: cid })) }
          : undefined,
      },
      include: { categories: true },
    });

    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await prisma.blogPost.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
