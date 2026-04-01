"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("problemesSolutions"), path: "/problemes-solutions" },
    { name: t("expertise"), path: "/expertise" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300 border-b border-border/50">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <Link href="/" className="text-xl font-black tracking-tighter text-primary font-heading">
          Les Laboratoires N2K
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path as any}
                className={`font-heading font-bold tracking-tight uppercase text-sm transition-colors ${
                  isActive
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <LocaleSwitcher locale={locale} />
          <Link
            href="/contact"
            className="btn-gradient text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {t("contact")}
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-4">
          <LocaleSwitcher locale={locale} />
          <Sheet>
            <SheetTrigger className="p-2 -mr-2 text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-md">
              <Menu strokeWidth={2.5} />
            </SheetTrigger>
            <SheetContent side={locale === "ar" ? "right" : "left"} className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full py-6">
                <div className="text-xl font-black text-primary font-heading mb-8">N2K</div>
                <div className="flex flex-col gap-6 flex-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        href={link.path as any}
                        className={`font-heading text-lg font-bold tracking-tight uppercase transition-colors ${
                          isActive ? "text-secondary" : "text-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
                <div>
                  <Link
                    href="/contact"
                    className="flex justify-center w-full btn-gradient text-on-primary px-6 py-4 rounded-xl text-md font-bold tracking-tight shadow-xl shadow-secondary/20"
                  >
                    {t("contact")}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
