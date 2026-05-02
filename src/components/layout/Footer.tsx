"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Mail, PhoneCall } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-primary text-white w-full pt-16 pb-8 border-t border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-screen-2xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="text-lg font-bold text-secondary-light mb-6 font-heading">{t("brand")}</div>
          <p className="font-body text-sm leading-relaxed text-slate-400">
            {t("tagline")}
          </p>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs font-heading">
            {t("sectors.title")}
          </h5>
          <ul className="space-y-4 font-body text-sm">
            <li>
              <Link href="/secteurs/elevage-avicole" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("sectors.elevage")}
              </Link>
            </li>
            <li>
              <Link href="/secteurs/abattoirs" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("sectors.abattoirs")}
              </Link>
            </li>
            <li>
              <Link href="/secteurs/industrie-agroalimentaire" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("sectors.agroalimentaire")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs font-heading">
            {t("support")}
          </h5>
          <ul className="space-y-4 font-body text-sm">
            <li>
              <Link href="/problemes-solutions" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("supportLinks.problemes")}
              </Link>
            </li>
            <li>
              <Link href="/produits" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("supportLinks.produits")}
              </Link>
            </li>
            <li>
              <Link href="/references" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("supportLinks.references")}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("supportLinks.faq")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("supportLinks.contact")}
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("supportLinks.about")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs font-heading">
            {t("contactTitle")}
          </h5>
          <ul className="space-y-3 font-body text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <MapPin className="text-secondary-light w-4 h-4 mt-0.5 shrink-0" />
              <span>{t("address")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-secondary-light w-4 h-4 shrink-0" />
              <a href="mailto:contact@n2k-tunisie.com" className="hover:text-white transition-colors">
                contact@n2k-tunisie.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="text-secondary-light w-4 h-4 shrink-0" />
              <a href="tel:+21621444765" className="hover:text-white transition-colors">
                (+216) 21 444 765
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="text-secondary-light w-4 h-4 shrink-0" />
              <a href="tel:+21628717998" className="hover:text-white transition-colors">
                (+216) 28 717 998
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-8 mt-16 pt-8 border-t border-slate-900 text-center">
        <p className="font-body text-sm leading-relaxed text-slate-500">
          {t("copyright")}
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-slate-600">
          <Link href="/mentions-legales" className="hover:text-slate-400 transition-colors">{t("legal")}</Link>
          <Link href="/confidentialite" className="hover:text-slate-400 transition-colors">{t("privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
