import { getTranslations } from "next-intl/server";
import DiagnosticForm from "@/components/ui/DiagnosticForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("diagnosticTitle"),
    description: t("diagnosticDescription"),
  };
}

export default async function DiagnosticPage() {
  const t = await getTranslations("diagnostic");

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)] pb-32">
      {/* Header */}
      <section className="bg-surface py-20 relative overflow-hidden text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-6 text-primary">
          {t("pageTitle")}
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed font-body">
          {t("pageSubtitle")}
        </p>
      </section>

      {/* Form Container */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-20">
        <DiagnosticForm />
      </section>
    </div>
  );
}
