"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, ArrowRight, PhoneCall, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("problemesSolutions"), path: "/problemes-solutions" },
    { name: t("expertise"), path: "/expertise" },
    { name: t("produits"), path: "/produits" },
    { name: t("references"), path: "/references" },
    { name: t("contactPageLink"), path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300 border-b border-border/50">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/n2k-logo.png"
            alt="Les Laboratoires N2K"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="text-lg font-black tracking-tighter text-primary font-heading hidden sm:inline">
            Les Laboratoires N2K
          </span>
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
            href="/diagnostic"
            className="btn-gradient text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {t("contact")}
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-4">
          <LocaleSwitcher locale={locale} />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="p-2 -mr-2 text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-md">
              <Menu strokeWidth={2.5} />
            </SheetTrigger>
            <SheetContent
              side={locale === "ar" ? "right" : "left"}
              className="w-[300px] sm:w-[400px] bg-[#000f22] border-none p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="px-6 pt-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/n2k-logo.png"
                      alt="Les Laboratoires N2K"
                      width={44}
                      height={44}
                      className="w-11 h-11 object-contain"
                    />
                    <div className="min-w-0">
                      <div className="text-[17px] font-black text-white font-heading tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis">
                        Les Laboratoires N2K
                      </div>
                      <p className="text-white/40 text-xs font-body mt-0.5 tracking-wide">
                        Biosécurité Avicole — Borj Cédria
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col flex-1 px-6 py-8">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          href={link.path as any}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between py-3 px-3 rounded-xl font-heading text-sm sm:text-base font-bold tracking-tight uppercase transition-all ${
                            isActive
                              ? "text-white bg-white/10"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronRight className={`w-4 h-4 ${isActive ? "text-[#2BB673]" : "text-white/20"}`} />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Separator */}
                  <div className="my-6 h-px bg-white/10"></div>

                  {/* Phone Link */}
                  <a
                    href="tel:+21600000000"
                    className="flex items-center gap-3 text-white/50 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <PhoneCall className="w-5 h-5 text-[#2BB673]" />
                    <span className="font-body text-sm">+216 00 000 000</span>
                  </a>
                </div>

                {/* Bottom CTA */}
                <div className="px-6 pb-8 mt-auto">
                  <Link
                    href="/diagnostic"
                    onClick={() => setMobileOpen(false)}
                    className="flex justify-center items-center gap-2 w-full bg-[#2BB673] hover:bg-[#2BB673]/90 text-white px-6 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg shadow-[#2BB673]/20 transition-all uppercase"
                  >
                    {t("contact")}
                    <ArrowRight className="w-4 h-4" />
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
