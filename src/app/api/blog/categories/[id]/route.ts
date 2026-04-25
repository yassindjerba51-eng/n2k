import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — get single category
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const category = await prisma.blogCategory.findUnique({
      where: { id: parseInt(id) },
      include: { _count: { select: { posts: true } } },
    });
    if (!category) {
      return NextResponse.json({ error: "Catégorie introuvable" }, { status: 404 });
    }
    return NextResponse.json({ success: true, category }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog category:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT — update category
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const category = await prisma.blogCategory.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json({ success: true, category }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating blog category:", error);
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Un slug identique existe déjà" }, { status: 409 });
    }
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Catégorie introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE — delete category
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // The many-to-many join table has ON DELETE CASCADE,
    // so deleting the category automatically removes join rows.
    await prisma.blogCategory.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting blog category:", error);
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Catégorie introuvable" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
