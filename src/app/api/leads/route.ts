import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, region, activityType, capacity, cycleInfo, problemType, message } = body;

    if (!name || !email || !phone || !region || !activityType || !capacity || !problemType) {
      return NextResponse.json(
        { error: "Validation failed: Missing required fields" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        region,
        activityType,
        capacity,
        cycleInfo: cycleInfo?.toString(),
        problemType,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating Lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
