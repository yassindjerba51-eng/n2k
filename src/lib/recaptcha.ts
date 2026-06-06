/**
 * Server-side reCAPTCHA v3 verification helper.
 * Validates a token against Google's siteverify API.
 */

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5;

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export interface RecaptchaResult {
  success: boolean;
  score: number;
  error?: string;
}

/**
 * Verify a reCAPTCHA v3 token server-side.
 *
 * @param token - The reCAPTCHA token from the client
 * @param expectedAction - The expected action name (e.g. "login", "contact")
 * @returns RecaptchaResult with success status and score
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
  expectedAction: string
): Promise<RecaptchaResult> {
  // Skip verification if no secret key is configured (development fallback)
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn("[reCAPTCHA] No RECAPTCHA_SECRET_KEY configured — skipping verification");
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, score: 0, error: "Missing reCAPTCHA token" };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data: RecaptchaVerifyResponse = await response.json();

    console.log(`[reCAPTCHA] Action: ${expectedAction} | Success: ${data.success} | Score: ${data.score} | Returned action: ${data.action}`);

    if (!data.success) {
      return {
        success: false,
        score: 0,
        error: `reCAPTCHA verification failed: ${data["error-codes"]?.join(", ") || "unknown"}`,
      };
    }

    // Verify action matches
    if (data.action && data.action !== expectedAction) {
      return {
        success: false,
        score: data.score || 0,
        error: `reCAPTCHA action mismatch: expected "${expectedAction}", got "${data.action}"`,
      };
    }

    // Check score threshold
    const score = data.score || 0;
    if (score < SCORE_THRESHOLD) {
      return {
        success: false,
        score,
        error: `reCAPTCHA score too low: ${score}`,
      };
    }

    return { success: true, score };
  } catch (error) {
    console.error("[reCAPTCHA] Verification error:", error);
    return { success: false, score: 0, error: "reCAPTCHA verification request failed" };
  }
}
