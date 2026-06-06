import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("diagnosticTitle"),
    description: t("diagnosticDescription"),
  };
}

export default async function MerciPage() {
  const t = await getTranslations("merci");

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)] flex items-center justify-center py-20 pb-40">
      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center animate-fade-in-up">
        {/* Success Icon */}
        <div className="flex justify-center mb-8 relative">
          <div className="absolute inset-0 bg-secondary/20 blur-2xl rounded-full scale-110" />
          <CheckCircle2 className="w-24 h-24 text-secondary relative z-10 animate-checkmark" />
        </div>

        {/* Text */}
        <h1 className="text-4xl md:text-5xl font-black font-heading text-primary tracking-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-xl text-on-surface-variant font-body mb-12 max-w-lg mx-auto">
          {t("subtitle")}
        </p>

        {/* Action Card */}
        <div className="bg-surface-lowest rounded-3xl p-8 shadow-ambient ghost-border">
          <h2 className="text-xl font-bold font-heading text-primary mb-6">
            {t("whatNext")}
          </h2>
          <div className="space-y-4 font-body">
            <Link
              href="/problemes"
              className="flex items-center justify-between p-4 rounded-xl border-2 border-border/50 hover:border-secondary hover:bg-secondary/5 transition-colors group"
            >
              <div className="text-left rtl:text-right">
                <p className="text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors">
                  {t("discoverProblems")}
                </p>
                <p className="text-primary font-bold">{t("discoverLink")}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </Link>

            <a
              href="https://wa.me/21628717998"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border-2 border-border/50 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-colors group"
            >
              <div className="text-left rtl:text-right">
                <p className="text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors">{t("urgent")}</p>
                <p className="text-[#25D366] font-bold">{t("whatsapp")}</p>
              </div>
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50">
            <Link
              href="/"
              className="text-primary font-bold hover:text-secondary transition-colors font-heading text-sm"
            >
              {t("backHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
