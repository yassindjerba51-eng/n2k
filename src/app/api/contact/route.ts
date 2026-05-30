import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, contacts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ContactMessages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, sector, problemType, installationSize, requestType, message } = body;

    if (!name || !email || !phone || !sector || !problemType || !requestType) {
      return NextResponse.json(
        { error: "Validation failed: Missing required fields" },
        { status: 400 }
      );
    }

    const subject = `[${requestType.toUpperCase()}] Demande - ${sector}`;
    const formattedMessage = `
Téléphone: ${phone}
Secteur: ${sector}
Problématique: ${problemType}
Taille d'installation: ${installationSize || "Non précisé"}
Type de demande: ${requestType}

Message:
${message || "Aucun message supplémentaire."}
    `.trim();

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message: formattedMessage,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, messageId: contactMessage.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating ContactMessage:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
