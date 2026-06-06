import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { verifyRecaptcha } from "@/lib/recaptcha";

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
    const { name, email, phone, sector, problemType, installationSize, requestType, message, recaptchaToken } = body;

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, "contact");
    if (!recaptchaResult.success) {
      console.warn("[Contact] reCAPTCHA failed:", recaptchaResult.error);
      return NextResponse.json(
        { error: "Vérification de sécurité échouée" },
        { status: 403 }
      );
    }

    if (!name || !email || !phone || !sector || !problemType || !requestType) {
      return NextResponse.json(
        { error: "Validation failed: Missing required fields" },
        { status: 400 }
      );
    }

    const subject = `[${requestType.toUpperCase()}] Demande - ${sector}`;
    const formattedMessage = `
Nouveau message de contact :

Nom: ${name}
Email: ${email}
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

    // Retrieve settings to send email
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    if (
      settings &&
      settings.contactEmail &&
      settings.smtpHost &&
      settings.smtpUser &&
      settings.smtpPassword
    ) {
      try {
        const transporter = nodemailer.createTransport({
          host: settings.smtpHost,
          port: settings.smtpPort || 465,
          secure: settings.smtpPort === 465,
          auth: {
            user: settings.smtpUser,
            pass: settings.smtpPassword,
          },
        });

        await transporter.sendMail({
          from: `"${settings.smtpFromName || "N2K Web"}" <${settings.smtpFromEmail || settings.smtpUser}>`,
          to: settings.contactEmail,
          replyTo: email,
          subject: subject,
          text: formattedMessage,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // We still return success since the message was saved in DB
      }
    }

    return NextResponse.json({ success: true, messageId: contactMessage.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating ContactMessage:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
