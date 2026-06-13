import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { pollinationsApiKey } = await request.json();

    // Validate the key against the CURRENT Pollinations host (gen.pollinations.ai).
    // The legacy host (image.pollinations.ai) does NOT honor the new sk_/pk_ keys
    // — it silently treats the call as anonymous and returns HTTP 402
    // "Queue full for IP" (anonymous concurrency limit = 1), which looks like an
    // invalid-key error even when the key is perfectly valid.
    //
    // Server-side requests authenticate via the `Authorization: Bearer` header.
    //
    // We deliberately test with the free `flux` model so a low account balance
    // does NOT make a valid key look broken. Auth is checked independently of
    // balance: a bad key returns 401, a valid key returns 200 on a free model.
    const testUrl =
      "https://gen.pollinations.ai/image/test?width=16&height=16&seed=1&nologo=true&model=flux";

    const res = await fetch(testUrl, {
      method: "GET",
      headers: pollinationsApiKey
        ? { Authorization: `Bearer ${pollinationsApiKey}` }
        : {},
    });

    if (res.ok) {
      return NextResponse.json({
        success: true,
        message: pollinationsApiKey
          ? "Connexion réussie à l'API Pollinations.ai ! La clé est valide et active."
          : "Connexion réussie à l'API Pollinations.ai (mode anonyme, sans clé).",
      });
    }

    const details = await res.text().catch(() => "");
    console.error("Pollinations.ai test error:", res.status, details);

    // Map the real status codes to clear, actionable messages.
    let error: string;
    if (res.status === 401) {
      error = "Clé API Pollinations invalide ou non reconnue.";
    } else if (res.status === 402) {
      // On gen.pollinations.ai with a free model this should not happen for a
      // valid key, but keep a precise message just in case.
      error = /queue full/i.test(details)
        ? "La clé API n'a pas été prise en compte (requête anonyme). Vérifiez qu'elle est correcte et active."
        : "Crédits (pollen) insuffisants sur votre compte Pollinations. Rechargez votre solde sur enter.pollinations.ai.";
    } else if (res.status === 429) {
      error = "Trop de requêtes. Réessayez dans quelques instants.";
    } else {
      error = "Échec du test de la clé API Pollinations.";
    }

    return NextResponse.json(
      {
        success: false,
        error,
        details: `HTTP ${res.status} - ${details.slice(0, 150)}`,
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error testing Pollinations key:", error);
    return NextResponse.json(
      {
        error: "Une erreur interne est survenue lors du test.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
