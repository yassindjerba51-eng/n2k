"use client";

import { useState, useRef, useEffect } from "react";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, ArrowRight, PhoneCall, ChevronRight, ChevronDown, Building2, Droplets, Wind, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";
import SearchModal from "./SearchModal";

type NavLink = {
  name: string;
  path: string;
  mobileOnly?: boolean;
  subItems?: { name: string; path: string; icon: React.ReactNode }[];
};

export default function Navbar({ locale, logoUrl }: { locale: string; logoUrl?: string | null }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const zoneSubItems = [
    { name: t("zoneBatiment"), path: "/problemes-solutions/batiment", icon: <Building2 className="w-4 h-4" /> },
    { name: t("zoneEau"), path: "/problemes-solutions/canalisations-eau", icon: <Droplets className="w-4 h-4" /> },
    { name: t("zoneAmbiance"), path: "/problemes-solutions/ambiance", icon: <Wind className="w-4 h-4" /> },
  ];

  const navLinks: NavLink[] = [
    { name: t("home"), path: "/", mobileOnly: true },
    { name: t("secteurs"), path: "/secteurs" },
    { name: t("problemesSolutions"), path: "/problemes-solutions", subItems: zoneSubItems },
    { name: t("produits"), path: "/produits" },
    { name: t("blog"), path: "/blog" },
    { name: t("aPropos"), path: "/a-propos" },
    { name: t("contactPageLink"), path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300 border-b border-border/50">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={logoUrl || "/images/n2k-logo.png"}
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
          {navLinks.filter((link) => !link.mobileOnly).map((link) => {
            const isActive = pathname === link.path || (link.subItems && pathname.startsWith(link.path + "/"));

            // Item with dropdown
            if (link.subItems) {
              return (
                <div key={link.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-1 font-heading font-bold tracking-tight uppercase text-sm transition-colors cursor-pointer ${
                      isActive
                        ? "text-secondary border-b-2 border-secondary pb-1"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-xl border border-border/50 py-2 min-w-[260px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Parent link */}
                      <Link
                        href={link.path as any}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold font-heading text-n2k-primary hover:bg-n2k-surface transition-colors"
                      >
                        {link.name}
                      </Link>
                      <div className="mx-3 my-1 h-px bg-border/50" />
                      {/* Sub-items */}
                      {link.subItems.map((sub) => {
                        const isSubActive = pathname === sub.path;
                        return (
                          <Link
                            key={sub.path}
                            href={sub.path as any}
                            onClick={() => setDropdownOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-body transition-colors ${
                              isSubActive
                                ? "text-n2k-primary bg-n2k-surface font-bold"
                                : "text-n2k-on-surface-variant hover:text-n2k-primary hover:bg-n2k-surface"
                            }`}
                          >
                            <span className="text-n2k-primary/60">{sub.icon}</span>
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Regular item
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
          
          <button 
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors text-slate-700 header-search"
            aria-label="Recherche"
          >
            <Search className="w-5 h-5" />
          </button>
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
                      src={logoUrl || "/images/n2k-logo.png"}
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
                <div className="flex flex-col flex-1 px-6 py-8 overflow-y-auto">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.path;

                      // Mobile item with sub-items
                      if (link.subItems) {
                        return (
                          <div key={link.name}>
                            <button
                              onClick={() => setMobileSubOpen(!mobileSubOpen)}
                              className={`flex items-center justify-between w-full py-3 px-3 rounded-xl font-heading text-sm sm:text-base font-bold tracking-tight uppercase transition-all cursor-pointer ${
                                isActive || pathname.startsWith(link.path + "/")
                                  ? "text-white bg-white/10"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              <span>{link.name}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubOpen ? "rotate-180" : ""} ${isActive ? "text-[#2BB673]" : "text-white/20"}`} />
                            </button>
                            {/* Sub-items */}
                            <div className={`overflow-hidden transition-all duration-300 ${mobileSubOpen ? "max-h-60 mt-1" : "max-h-0"}`}>
                              <Link
                                href={link.path as any}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between py-2.5 px-6 rounded-lg font-heading text-xs font-bold tracking-tight uppercase transition-all ${
                                  pathname === link.path ? "text-[#2BB673]" : "text-white/40 hover:text-white/70"
                                }`}
                              >
                                <span>{link.name}</span>
                              </Link>
                              {link.subItems.map((sub) => {
                                const isSubActive = pathname === sub.path;
                                return (
                                  <Link
                                    key={sub.path}
                                    href={sub.path as any}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 py-2.5 px-6 rounded-lg font-body text-sm transition-all ${
                                      isSubActive ? "text-[#2BB673]" : "text-white/40 hover:text-white/70"
                                    }`}
                                  >
                                    <span className="opacity-60">{sub.icon}</span>
                                    <span>{sub.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

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

                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        setSearchOpen(true);
                      }}
                      className="flex items-center justify-between py-3 px-3 rounded-xl font-heading text-sm sm:text-base font-bold tracking-tight uppercase transition-all text-white/60 hover:text-white hover:bg-white/5 mt-2"
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        <span>Recherche</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/20" />
                    </button>
                  </div>

                  {/* Separator */}
                  <div className="my-6 h-px bg-white/10"></div>

                  {/* Phone Link */}
                  <a
                    href="tel:+21621444765"
                    className="flex items-center gap-3 text-white/50 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <PhoneCall className="w-5 h-5 text-[#2BB673]" />
                    <span className="font-body text-sm">(+216) 21 444 765</span>
                  </a>
                  <a
                    href="tel:+21628717998"
                    className="flex items-center gap-3 text-white/50 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <PhoneCall className="w-5 h-5 text-[#2BB673]" />
                    <span className="font-body text-sm">(+216) 28 717 998</span>
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

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}
