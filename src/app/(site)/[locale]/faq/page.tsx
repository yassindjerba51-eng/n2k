import FAQ from "@/components/ui/FAQ";
import { Link } from "@/i18n/navigation";
import { ArrowRight, HelpCircle, Home, ChevronRight } from "lucide-react";
import { getFAQData } from "@/data/faq-data";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = getFAQData(locale);
  
  return {
    title: data.metaTitle,
    alternates: {
      canonical: `/${locale}/faq`,
    },
    description: data.metaDescription,
  };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = getFAQData(locale);
  const tNav = await getTranslations("nav");
  const tHero = await getTranslations("hero");

  return (
    <div className="bg-n2k-surface min-h-[calc(100vh-80px)]">
      {/* ====== HERO SECTION ====== */}
      <section className="relative bg-n2k-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-n2k-secondary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 lg:py-36 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column: Content */}
            <div className="w-full lg:w-2/3 max-w">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-px bg-n2k-secondary-light shrink-0"></span>
                <HelpCircle className="w-5 h-5 text-n2k-secondary-light" />
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
                  FAQ
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] tracking-tighter mb-8">
                {data.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/60 font-body leading-relaxed mb-10 text-justify">
                {data.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link
                  href="/diagnostic"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg shadow-n2k-secondary/20 transition-all"
                >
                  {tHero("cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/secteurs"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
                >
                  {tHero("ctaSectors")}
                </Link>
              </div>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold mt-10">
                <Link href="/" className="hover:text-n2k-secondary transition-colors flex items-center gap-1.5">
                  <Home size={14} />
                  {tNav("home")}
                </Link>
                <ChevronRight size={12} className="opacity-50" />
                <span className="text-n2k-secondary-light">FAQ</span>
              </nav>
            </div>
            {/* Right Column: Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <Image
                  src="/images/faq-hero.png"
                  alt="FAQ Help Center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-n2k-secondary/20 blur-3xl -z-10 rounded-full mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-15 md:py-15">
        <div className="max-w-[900px] mx-auto px-4 md:px-8">
          <FAQ
            items={data.items}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-n2k-primary py-15 md:py-15">
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
