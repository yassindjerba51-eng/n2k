import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
      include: { categories: true },
    });

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Blog Posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    if (!slugFr || !titleFr) {
      return NextResponse.json(
        { error: "Le slug (FR) et le titre (FR) sont obligatoires" },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        slug: slug || slugFr,
        slugFr,
        slugEn: slugEn || `${slugFr}-en`,
        slugAr: slugAr || `${slugFr}-ar`,
        coverImage: coverImage || null,
        featured: featured || false,
        titleFr,
        titleEn: titleEn || titleFr,
        titleAr: titleAr || titleFr,
        metaTitleFr: metaTitleFr || null,
        metaTitleEn: metaTitleEn || null,
        metaTitleAr: metaTitleAr || null,
        metaDescFr: metaDescFr || null,
        metaDescEn: metaDescEn || null,
        metaDescAr: metaDescAr || null,
        contentFr: contentFr || "",
        contentEn: contentEn || "",
        contentAr: contentAr || "",
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        categories: categoryIds?.length
          ? { connect: categoryIds.map((id: number) => ({ id })) }
          : undefined,
      },
      include: { categories: true },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
