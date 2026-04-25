import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — list all categories
export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { id: "asc" },
      include: { _count: { select: { posts: true } } },
    });
    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST — create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category = await prisma.blogCategory.create({ data: body });
    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog category:", error);
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Un slug identique existe déjà" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
