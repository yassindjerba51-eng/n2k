import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Globe } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("expertiseTitle"),
    description: t("expertiseDescription"),
  };
}

export default async function ExpertisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("expertise");

  return (
    <div className="bg-surface min-h-[calc(100vh-80px)] pb-32">
      {/* Editorial Header */}
      <section className="bg-surface-low text-primary py-24 md:py-32 relative overflow-hidden border-b border-border/50">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
          <span className="label-md text-secondary tracking-[0.3em] mb-8 uppercase animate-fade-in">
             Le Standard Scientifique TN
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight mb-10 leading-[0.9] max-w-5xl">
            {t("pageTitle")}
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed font-body max-w-3xl mx-auto">
            {t("pageSubtitle")}
          </p>
        </div>
        {/* Decorative background number */}
        <div className="absolute -bottom-10 -right-10 text-[20rem] font-black text-outline-variant/10 select-none pointer-events-none font-heading">
          00
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-24 editorial-grid gap-16 items-center">
        <div className="col-span-12 lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-primary/5 -translate-x-6 -translate-y-6 rounded-3xl group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAtBErDyob_wmr6Jsef4YSckr4y3wJGEucFB6MLk3KeiMs_fLiyw39CuzaZenfhep9vjy6AE8vy-J2slC-YHZVP3z5CfF919R5uqMA4SVRs6s-NfBdCwDuCyjRWbvmvZZTgZuWbaAChaHLdzmT1ZnM7mWWlb0nfjosWHN42MWa1o7hs__EMxoCsZaPG0uM8fl4TzzABdw-6WyTLxc8-drs3OVd0_hcGel5xLBE6CqE1xgYiHNeb4-FvgKyuRKkuGcIj68i93-_56s"
            alt={t("directorName")}
            width={600}
            height={800}
            className="relative z-10 w-full h-[700px] object-cover rounded-3xl shadow-ambient-lg ghost-border"
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute -bottom-8 -right-8 bg-surface-lowest p-8 rounded-2xl shadow-xl z-20 border border-border/50 max-w-xs animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-primary font-black font-heading text-2xl leading-tight mb-2">
              {t("directorName")}
            </p>
            <p className="text-secondary font-bold text-xs uppercase tracking-widest font-heading">
              {t("directorRole")}
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary mb-6 font-heading">
              {t("directorTitle")}
            </h2>
            <div className="prose prose-2xl prose-slate font-body text-on-surface-variant leading-relaxed mb-10 text-primary font-bold">
              <p>
                {t("directorBio")}
              </p>
            </div>
            <p className="text-on-surface-variant text-lg leading-relaxed font-body mb-8">
              Spécialiste reconnu de l'hygiène industrielle et avicole, il a développé les protocoles N2K pour répondre spécifiquement aux défis climatiques et bactériologiques du Maghreb.
            </p>
          </div>

          <div className="bg-surface-low p-10 rounded-[2rem] border border-border/30">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <Globe className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black font-heading text-primary">
                {t("techparkTitle")}
              </h3>
            </div>
            <p className="text-on-surface-variant font-body leading-relaxed">
              {t("techparkDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-primary text-white py-32 mt-24 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
               <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tight mb-8">
                 {t("methodTitle")}
               </h2>
               <p className="text-xl text-on-primary-container font-body leading-relaxed">
                 L'expertise n'est rien sans rigueur. Nous appliquons un protocole de suivi en 4 étapes pour chaque exploitation.
               </p>
            </div>
            <div className="text-8xl font-black text-white/5 font-heading hidden lg:block tracking-tighter">
              MET-HOD
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {Object.entries(t.raw("steps")).map(([key, step]: [string, any], idx: number) => (
              <div key={key} className="bg-white/5 border border-white/10 p-10 hover:bg-white/10 transition-colors group">
                <div className="text-6xl font-black font-heading text-secondary/30 mb-10 group-hover:text-secondary/60 transition-colors">
                  0{idx + 1}
                </div>
                <h4 className="text-2xl font-black font-heading mb-4 text-white uppercase tracking-tight">
                  {step.title}
                </h4>
                <p className="text-on-primary-container font-body leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Excellence - Accordions */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-24 scroll-mt-20">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-heading text-primary tracking-tight mb-6">
               {t("technicalExcellence.title")}
            </h2>
            <p className="text-on-surface-variant font-body text-lg">
               {t("technicalExcellence.subtitle")}
            </p>
         </div>
         
         <Accordion>
            <AccordionItem title={t("technicalExcellence.items.rd.title")}>
               {t("technicalExcellence.items.rd.content")}
            </AccordionItem>
            <AccordionItem title={t("technicalExcellence.items.rd.title")}>
               {t("technicalExcellence.items.compliance.content")}
            </AccordionItem>
            <AccordionItem title={t("technicalExcellence.items.support.title")}>
               {t("technicalExcellence.items.support.content")}
            </AccordionItem>
         </Accordion>
      </section>

      {/* Call to Action */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-12 tracking-tight">
          Prêt à sécuriser votre rentabilité ?
        </h2>
        <Link
          href="/contact"
          className="inline-flex bg-gradient-to-r from-primary to-primary-container hover:from-primary-container hover:to-primary text-white hover:text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-95 transition-transform shadow-ambient-lg mx-auto w-full md:w-auto min-w-[300px] justify-center font-heading items-center gap-3 group"
        >
          {t("cta")}
          <ArrowRight className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
        </Link>
      </section>
    </div>
  );
}
