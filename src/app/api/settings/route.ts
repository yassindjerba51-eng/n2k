import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    return NextResponse.json({ success: true, settings: settings || {} }, { status: 200 });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();

    // Since we only want one row, we use upsert
    const updatedSettings = await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: body,
      create: {
        id: "global",
        siteName: "N2K", // Default required field
        ...body,
      },
    });

    return NextResponse.json({ success: true, settings: updatedSettings }, { status: 200 });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
