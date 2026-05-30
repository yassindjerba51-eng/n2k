import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const listUrl = "https://gen.pollinations.ai/models";

    const listResponse = await fetch(listUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!listResponse.ok) {
      return NextResponse.json(
        {
          error: "Impossible de récupérer les modèles Pollinations.",
          details: `Erreur HTTP ${listResponse.status}`,
        },
        { status: 400 }
      );
    }

    const allModels = (await listResponse.json()) as Array<{
      name: string;
      description?: string;
      output_modalities?: string[];
      paid_only?: boolean;
    }>;

    // Filter image generation models
    const imageModels = allModels
      .filter((m) => m.output_modalities?.includes("image"))
      .map((m) => ({
        id: m.name,
        name: m.name.charAt(0).toUpperCase() + m.name.slice(1) + (m.paid_only ? " (Pro)" : ""),
        description: m.description || "",
        paidOnly: !!m.paid_only,
      }));

    // If fetch failed or list is empty, return a static default fallback
    const finalImageModels = imageModels.length > 0 ? imageModels : [
      { id: "flux", name: "Flux", description: "Default image generator" },
      { id: "sana", name: "Sana", description: "Fast image generator" }
    ];

    return NextResponse.json({
      success: true,
      imageModels: finalImageModels,
    });
  } catch (error: any) {
    console.error("Error fetching Pollinations models:", error);
    // Return standard fallback in case of network issue
    return NextResponse.json({
      success: true,
      imageModels: [
        { id: "flux", name: "Flux", description: "Default image generator" },
        { id: "sana", name: "Sana", description: "Fast image generator" }
      ],
    });
  }
}
