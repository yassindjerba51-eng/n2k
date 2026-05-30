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

    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}&pageSize=100`;

    const listResponse = await fetch(listUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!listResponse.ok) {
      const errorData = await listResponse.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: "Impossible de récupérer les modèles.",
          details: errorData?.error?.message || `Erreur HTTP ${listResponse.status}`,
        },
        { status: 400 }
      );
    }

    const listData = await listResponse.json();
    const allModels = (listData.models || []) as Array<{
      name: string;
      displayName: string;
      description?: string;
      supportedGenerationMethods?: string[];
    }>;

    // Content generation models: those supporting generateContent
    const contentModels = allModels
      .filter(
        (m) =>
          m.supportedGenerationMethods?.includes("generateContent") &&
          m.name.includes("gemini")
      )
      .map((m) => ({
        id: m.name.replace("models/", ""),
        name: m.displayName || m.name.replace("models/", ""),
        description: m.description || "",
      }));

    // Image generation models: those with "imagen" in the name or supporting generateImages
    const imageModels = allModels
      .filter(
        (m) =>
          m.name.includes("imagen") ||
          m.supportedGenerationMethods?.includes("generateImages") ||
          (m.name.includes("gemini") && m.description?.toLowerCase().includes("image"))
      )
      .map((m) => ({
        id: m.name.replace("models/", ""),
        name: m.displayName || m.name.replace("models/", ""),
        description: m.description || "",
      }));

    return NextResponse.json({
      success: true,
      contentModels,
      imageModels,
    });
  } catch (error: any) {
    console.error("Error fetching Gemini models:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue.", details: error.message },
      { status: 500 }
    );
  }
}
