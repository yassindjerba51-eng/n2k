"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";

export default function StickyDiagnosticCTA() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  // Hide on diagnostic page to prevent redundancy
  if (pathname === "/diagnostic") return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-40 lg:hidden bg-gradient-to-t from-background via-background/90 to-transparent">
      <Link
        href="/diagnostic"
        className="flex justify-center items-center w-full btn-gradient text-white px-6 py-4 rounded-xl text-md font-bold tracking-tight shadow-xl shadow-secondary/30 relative animate-pulse-ring"
      >
        {t("diagnostic")}
      </Link>
    </div>
  );
}
