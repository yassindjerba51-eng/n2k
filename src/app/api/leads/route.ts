import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRecaptcha } from "@/lib/recaptcha";
import nodemailer from "nodemailer";
import { formatSectorDataForEmail } from "@/data/sectorQuestions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      contactName,
      email,
      phone,
      region,
      city,
      activityType,
      requestType,
      sectorData,
      message,
      recaptchaToken,
    } = body;

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, "diagnostic");
    if (!recaptchaResult.success) {
      console.warn("[Leads] reCAPTCHA failed:", recaptchaResult.error);
      return NextResponse.json(
        { error: "Vérification de sécurité échouée" },
        { status: 403 }
      );
    }

    if (!name || !email || !phone || !region || !city || !activityType || !requestType) {
      return NextResponse.json(
        { error: "Validation failed: Missing required fields" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        contactName,
        email,
        phone,
        region,
        city,
        activityType,
        requestType,
        sectorData: sectorData || {},
        capacity: "",
        problemType: "",
        status: "NEW",
      } as any,
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
        const subject = `[DIAGNOSTIC] Demande de diagnostic - ${name}`;
        const sectorFormatted = formatSectorDataForEmail(activityType, sectorData || {});

        const formattedMessage = `
Nouveau diagnostic soumis :

Nom de l'exploitation / entreprise: ${name}
Responsable de contact: ${contactName || "Non renseigné"}
Email: ${email}
Téléphone: ${phone}
Gouvernorat: ${region}
Ville / Délégation: ${city || "Non renseigné"}
Type de demande: ${requestType || "Non renseigné"}

---
DÉTAILS DU SECTEUR
${sectorFormatted || "Aucune donnée de secteur."}
---

Message / Commentaire:
${message || "Aucun message supplémentaire."}
        `.trim();

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
        console.error("Error sending diagnostic email:", emailError);
        // We still return success since the lead was saved in DB
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating Lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
