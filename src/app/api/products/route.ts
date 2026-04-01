import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Zone } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const isDisinfectant = searchParams.get("isDisinfectant");

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(category && { category: category as Zone }),
        ...(isDisinfectant && { isDisinfectant: isDisinfectant === "true" }),
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
