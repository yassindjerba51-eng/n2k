import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { titleFr, contentFr, categories } = await request.json();

    if (!titleFr) {
      return NextResponse.json({ error: "Le titre de l'article est requis pour la génération." }, { status: 400 });
    }

    // 1. Récupérer les paramètres d'API
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      return NextResponse.json({ 
        error: "Paramètres introuvables. Veuillez initialiser les paramètres de l'application." 
      }, { status: 400 });
    }

    const apiKey = settings.geminiApiKey;
    const contentModel = settings.geminiContentModel || "gemini-1.5-flash";
    const imageModel = settings.geminiImageModel || "imagen-3.0-generate-002";

    // Si on veut générer via Imagen mais que la clé Gemini n'est pas là, c'est bloquant.
    if (!settings.pollinationsModel && !apiKey) {
      return NextResponse.json({ 
        error: "Clé API Gemini non configurée. Renseignez votre clé API dans les Paramètres > API." 
      }, { status: 400 });
    }

    // 2. Étape 1 : Analyse de l'article avec Gemini ou prompt de secours
    let generatedPrompt = "";
    let usingFallbackPrompt = false;

    if (apiKey) {
      try {
        const promptAnalyse = `
You are an expert prompt engineer for AI image generators (like Imagen and Flux).
Analyze the following article context:
- Title: "${titleFr}"
- Content: "${contentFr ? contentFr.substring(0, 3000) : ""}"
- Categories: "${categories && categories.length > 0 ? categories.join(", ") : "N/A"}"

Based on this, automatically determine:
1. The main problem (negative outcome, realistic issue)
2. The main solution (improved result, clean professional outcome)
3. The theme and industry/topic (e.g., poultry farming, industrial piping, water treatment, dairy processing, etc.)

Then, write a highly descriptive English image prompt.
Image prompt rules to enforce:
- Layout: If the article discusses a problem and a solution (which it does), create a clean split composition (split-screen BEFORE vs AFTER comparison).
  * LEFT SIDE: Represents the problem situation, negative outcome, realistic scene (e.g. dirty pipes, bio-contamination, calcium scale build-up, sick animals, or contaminated water depending on the industry).
  * RIGHT SIDE: Represents the solution situation, improved result, clean professional outcome (e.g. pristine piping, sanitized water, healthy glowing animals, or sparkling clean surfaces).
- Visual Style: Photorealistic, professional marketing quality, magazine cover quality, cinematic lighting, highly detailed, sharp focus.
- Avoid: Absolutely NO text, NO watermarks, NO overlays, NO logos.
- Humans: If relevant, show professional workers in clean gears/hygiene outfits, or healthy realistic animals when relevant to the industry.

Output format:
Return ONLY the final English prompt as a single paragraph. Do not include introductory text, code blocks, explanations, or quotes. Just output the prompt text directly.
`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${contentModel}:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptAnalyse }] }],
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          generatedPrompt = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        } else {
          console.warn("Gemini Content API returned non-OK status, falling back to basic prompt.");
          usingFallbackPrompt = true;
        }
      } catch (err) {
        console.error("Error calling Gemini Content API:", err);
        usingFallbackPrompt = true;
      }
    } else {
      console.log("No Gemini API Key available, using fallback prompt.");
      usingFallbackPrompt = true;
    }

    if (usingFallbackPrompt || !generatedPrompt) {
      // Build a robust, descriptive English prompt from the title, category, and content context
      const categoryContext = categories && categories.length > 0 ? `in the context of ${categories.join(" and ")}` : "in industrial hygiene";
      // Strip HTML tags and get a clean summary of the content to guide the image generator
      const cleanContent = contentFr ? contentFr.replace(/<[^>]*>?/gm, '').substring(0, 400).trim() : "";
      
      generatedPrompt = `A professional split-screen comparison image, 16:9 aspect ratio, photorealistic. 
Left side (problem): showing realistic negative outcomes, bio-contamination, scale, or dirty conditions related to: "${titleFr}" ${categoryContext}. Content context: ${cleanContent}. 
Right side (solution): showing an improved, pristine, sanitized clean state with professional results. 
Visual style: Split screen comparison, cinematic lighting, highly detailed, magazine cover quality, marketing style, no text overlay, no watermark, no logo.`;
    }

    console.log("Image Prompt to be used:", generatedPrompt);

    // 3. Étape 2 : Génération d'image (Pollinations.ai ou Google Imagen)
    let imageBuffer: Buffer;

    if (settings.pollinationsModel) {
      console.log("Generating image with Pollinations.ai using model:", settings.pollinationsModel);
      const model = settings.pollinationsModel;
      const keyQuery = settings.pollinationsApiKey ? `&key=${settings.pollinationsApiKey}` : "";
      const seed = Math.floor(Math.random() * 1000000);
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(generatedPrompt)}?width=1200&height=630&model=${model}&nologo=true&seed=${seed}${keyQuery}`;

      const pollinationsRes = await fetch(pollinationsUrl);

      if (!pollinationsRes.ok) {
        const errText = await pollinationsRes.text().catch(() => "");
        return NextResponse.json({ 
          error: `Échec de la génération d'image avec Pollinations.ai (${model}).`, 
          details: errText.slice(0, 100) || `HTTP ${pollinationsRes.status}` 
        }, { status: 400 });
      }

      imageBuffer = Buffer.from(await pollinationsRes.arrayBuffer());
    } else {
      console.log("Generating image with Google Imagen using model:", imageModel);
      const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/${imageModel}:generateImages?key=${apiKey}`;
      const imagenRes = await fetch(imagenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: generatedPrompt,
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: "16:9",
        }),
      });

      if (!imagenRes.ok) {
        const err = await imagenRes.json().catch(() => ({}));
        return NextResponse.json({ 
          error: `Échec de la génération d'image avec le modèle Google ${imageModel}.`, 
          details: err?.error?.message || `HTTP ${imagenRes.status}` 
        }, { status: 400 });
      }

      const imagenData = await imagenRes.json();
      const base64ImageBytes = imagenData?.generatedImages?.[0]?.image?.imageBytes;

      if (!base64ImageBytes) {
        return NextResponse.json({ 
          error: "Aucune image n'a été renvoyée par le modèle.",
          details: JSON.stringify(imagenData)
        }, { status: 400 });
      }

      imageBuffer = Buffer.from(base64ImageBytes, "base64");
    }

    // 4. Étape 3 : Post-traitement d'image avec Sharp (1200x630, jpeg, quality 80)
    const processedBuffer = await sharp(imageBuffer)
      .resize(1200, 630, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    // 5. Étape 4 : Enregistrement dans public/uploads/blog/
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
    await mkdir(uploadDir, { recursive: true });

    const filename = `ia_featured_${Date.now()}.jpg`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, processedBuffer);

    const imageUrl = `/uploads/blog/${filename}`;

    return NextResponse.json({
      success: true,
      imageUrl,
      promptUsed: generatedPrompt,
    });
  } catch (error: any) {
    console.error("Error in generate-image:", error);
    return NextResponse.json({ 
      error: "Une erreur interne est survenue lors de la génération.", 
      details: error.message 
    }, { status: 500 });
  }
}
