"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface ReCaptchaContextValue {
  executeRecaptcha: (action: string) => Promise<string | null>;
}

const ReCaptchaContext = createContext<ReCaptchaContextValue>({
  executeRecaptcha: async () => null,
});

/**
 * Hook to access the reCAPTCHA execute function.
 * Returns `executeRecaptcha(action)` which resolves to a token string or null.
 */
export function useReCaptcha() {
  return useContext(ReCaptchaContext);
}

/**
 * Provider component that loads the Google reCAPTCHA v3 script once
 * and provides an `executeRecaptcha` function to children.
 */
export default function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!SITE_KEY || scriptLoaded.current) return;

    // Check if script is already in the DOM
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      scriptLoaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    scriptLoaded.current = true;
  }, []);

  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (!SITE_KEY) {
      console.warn("[reCAPTCHA] No NEXT_PUBLIC_RECAPTCHA_SITE_KEY configured");
      return null;
    }

    try {
      // Wait for grecaptcha to be ready
      const grecaptcha = (window as any).grecaptcha;
      if (!grecaptcha) {
        console.warn("[reCAPTCHA] grecaptcha not loaded yet");
        return null;
      }

      return await new Promise<string>((resolve, reject) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(SITE_KEY, { action })
            .then(resolve)
            .catch(reject);
        });
      });
    } catch (error) {
      console.error("[reCAPTCHA] Execute error:", error);
      return null;
    }
  }, []);

  return (
    <ReCaptchaContext.Provider value={{ executeRecaptcha }}>
      {children}
    </ReCaptchaContext.Provider>
  );
}
