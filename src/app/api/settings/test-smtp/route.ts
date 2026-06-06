import { NextResponse } from "next/server";
import { auth } from "@/auth";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { smtpHost, smtpPort, smtpUser, smtpPassword, smtpFromEmail, smtpFromName } = body;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !smtpFromEmail) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs SMTP pour tester." }, { status: 400 });
    }

    // Fetch the professional email from site settings
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
      select: { contactEmail: true }
    });

    const toEmail = settings?.contactEmail;
    if (!toEmail) {
      return NextResponse.json({ error: "Veuillez configurer 'E-mail professionnel' dans l'onglet Coordonnées d'abord." }, { status: 400 });
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Send a test email to the professional email
    await transporter.sendMail({
      from: `"${smtpFromName || 'N2K Admin'}" <${smtpFromEmail}>`,
      to: toEmail,
      subject: "Test de connexion SMTP N2K",
      text: "La configuration SMTP de votre plateforme N2K fonctionne correctement.",
      html: "<p>La configuration SMTP de votre plateforme N2K fonctionne correctement.</p>",
    });

    return NextResponse.json({ success: true, message: "Email de test envoyé avec succès !" }, { status: 200 });
  } catch (error: any) {
    console.error("Error testing SMTP:", error);
    return NextResponse.json({ 
      error: "Erreur de connexion SMTP.", 
      details: error.message 
    }, { status: 500 });
  }
}
