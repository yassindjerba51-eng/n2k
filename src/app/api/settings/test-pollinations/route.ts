import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { pollinationsApiKey } = await request.json();

    // Test the key (if provided) by performing a quick light request
    const testUrl = `https://image.pollinations.ai/prompt/test?width=16&height=16&seed=1&nologo=true${
      pollinationsApiKey ? `&key=${pollinationsApiKey}` : ""
    }`;

    const res = await fetch(testUrl, {
      method: "GET",
    });

    if (!res.ok) {
      const details = await res.text().catch(() => "");
      console.error("Pollinations.ai test error:", res.status, details);
      return NextResponse.json({
        success: false,
        error: "Clé API Pollinations invalide ou inactive.",
        details: `HTTP ${res.status} - ${details.slice(0, 100)}`,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Connexion réussie à l'API Pollinations.ai !",
    });
  } catch (error: any) {
    console.error("Error testing Pollinations key:", error);
    return NextResponse.json({ 
      error: "Une erreur interne est survenue lors du test.", 
      details: error.message 
    }, { status: 500 });
  }
}
