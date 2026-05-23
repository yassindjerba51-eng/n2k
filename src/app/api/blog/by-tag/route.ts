import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const tag = request.nextUrl.searchParams.get("tag");

    if (!tag) {
      return NextResponse.json(
        { error: "Missing 'tag' query parameter" },
        { status: 400 }
      );
    }

    // Fetch all blog posts, then filter by tag in JS
    // (MySQL JSON_CONTAINS is not directly supported by Prisma's where clause)
    const allPosts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        titleFr: true,
        titleEn: true,
        titleAr: true,
        coverImage: true,
        contentFr: true,
        contentEn: true,
        contentAr: true,
        publishedAt: true,
        tags: true,
      },
    });

    const filtered = allPosts.filter((post) => {
      const tags = post.tags as string[];
      return Array.isArray(tags) && tags.includes(tag);
    });

    return NextResponse.json({ success: true, posts: filtered }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
