import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { geminiApiKey } = await request.json();

    if (!geminiApiKey) {
      return NextResponse.json({ error: "La clé API est requise" }, { status: 400 });
    }

    // Étape 1 : Lister les modèles disponibles pour valider la clé
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}`;

    const listResponse = await fetch(listUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!listResponse.ok) {
      const errorData = await listResponse.json().catch(() => ({}));
      console.error("Gemini API key validation error:", listResponse.status, errorData);
      return NextResponse.json(
        {
          success: false,
          error: "Clé API invalide ou inactive.",
          details: errorData?.error?.message || `Erreur HTTP ${listResponse.status}`,
        },
        { status: 400 }
      );
    }

    const listData = await listResponse.json();
    const models = (listData.models || []) as Array<{ name: string; supportedGenerationMethods?: string[] }>;

    // Chercher un modèle compatible generateContent
    const generativeModel = models.find(
      (m) =>
        m.supportedGenerationMethods?.includes("generateContent") &&
        m.name.includes("gemini")
    );

    if (!generativeModel) {
      return NextResponse.json({
        success: true,
        message: `Clé API valide ! ${models.length} modèle(s) disponible(s).`,
        reply: "Aucun modèle génératif trouvé pour un test approfondi.",
      });
    }

    // Étape 2 : Tester un appel generateContent avec le premier modèle trouvé
    const genUrl = `https://generativelanguage.googleapis.com/v1beta/${generativeModel.name}:generateContent?key=${geminiApiKey}`;

    const genResponse = await fetch(genUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: "Réponds uniquement par le mot OK." }],
          },
        ],
      }),
    });

    if (!genResponse.ok) {
      // La clé est valide (listModels a fonctionné) mais le modèle a refusé
      const genErr = await genResponse.json().catch(() => ({}));
      return NextResponse.json({
        success: true,
        message: `Clé API valide ! ${models.length} modèle(s) disponible(s). Le test de génération a échoué : ${genErr?.error?.message || "erreur inconnue"}.`,
        reply: "",
      });
    }

    const genData = await genResponse.json();
    const reply = genData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({
      success: true,
      message: `Connexion réussie à l'API Google AI Studio ! Modèle testé : ${generativeModel.name.replace("models/", "")}.`,
      reply,
    });
  } catch (error: any) {
    console.error("Error testing Gemini key:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue.", details: error.message },
      { status: 500 }
    );
  }
}
