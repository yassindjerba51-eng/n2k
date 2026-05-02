import FAQ from "@/components/ui/FAQ";
import { Link } from "@/i18n/navigation";
import { ArrowRight, HelpCircle } from "lucide-react";
import { getFAQData } from "@/data/faq-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = getFAQData(locale);
  
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = getFAQData(locale);

  return (
    <div className="bg-n2k-surface min-h-[calc(100vh-80px)]">
      {/* Hero */}
      <section className="bg-n2k-surface-low py-16 md:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <HelpCircle className="w-5 h-5 text-n2k-secondary" />
            <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary uppercase">
              FAQ
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-n2k-primary leading-[0.95] tracking-tight mb-6">
            {data.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-n2k-on-surface-variant font-body leading-relaxed max-w-2xl mx-auto">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-4 md:px-8">
          <FAQ
            items={data.items}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-n2k-primary py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight mb-6">
            {data.ctaTitle}
          </h2>
          <p className="text-white/60 font-body text-lg mb-10 max-w-2xl mx-auto">
            {data.heroSubtitle}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg transition-all"
          >
            {data.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
