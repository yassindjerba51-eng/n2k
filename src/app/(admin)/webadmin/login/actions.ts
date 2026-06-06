"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  // Verify reCAPTCHA
  const recaptchaToken = formData.get("recaptchaToken") as string | null;
  const recaptchaResult = await verifyRecaptcha(recaptchaToken, "login");

  if (!recaptchaResult.success) {
    console.warn("[Login] reCAPTCHA failed:", recaptchaResult.error);
    return "Vérification de sécurité échouée. Veuillez réessayer.";
  }

  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/webadmin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Identifiants invalides.";
        default:
          return "Erreur lors de la connexion.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
