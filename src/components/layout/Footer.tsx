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
            {t("expertise")}
          </h5>
          <ul className="space-y-4 font-body text-sm">
            <li>
              <Link href="/problemes-solutions/batiment" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("expertiseLinks.technical")}
              </Link>
            </li>
            <li>
              <Link href="/problemes-solutions/batiment" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("expertiseLinks.soil")}
              </Link>
            </li>
            <li>
              <Link href="/problemes-solutions/water" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("expertiseLinks.water")}
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
              <Link href="/diagnostic" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("supportLinks.contact")}
              </Link>
            </li>
            <li>
              <Link href="/diagnostic" className="text-slate-400 hover:text-white hover:underline decoration-secondary-light decoration-2 underline-offset-4 transition-colors">
                {t("supportLinks.diagnostic")}
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
          <p className="font-body text-sm text-slate-400 mb-4">{t("address")}</p>
          <div className="flex gap-4">
            <MapPin className="text-secondary-light w-5 h-5" />
            <Mail className="text-slate-400 cursor-pointer hover:text-white transition-colors w-5 h-5" />
            <PhoneCall className="text-slate-400 cursor-pointer hover:text-white transition-colors w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-8 mt-16 pt-8 border-t border-slate-900 text-center">
        <p className="font-body text-sm leading-relaxed text-slate-500">
          {t("copyright")}
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-slate-600">
          <Link href="#" className="hover:text-slate-400 transition-colors">{t("legal")}</Link>
          <Link href="#" className="hover:text-slate-400 transition-colors">{t("privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
