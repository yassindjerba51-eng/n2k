import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Link as LinkIcon, MapPin, Phone, Clock, Mail, ArrowRight } from "lucide-react";
import GeneralContactForm from "@/components/ui/GeneralContactForm";

export default function ContactPage() {
  const t = useTranslations("contactPage");

  return (
    <main className="bg-n2k-bg text-n2k-text min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-n2k-primary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-n2k-secondary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-28 lg:py-36 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column: Content */}
            <div className="w-full lg:w-2/3 max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-px bg-n2k-secondary-light shrink-0"></span>
                <span className="text-xs font-black tracking-[0.2em] text-n2k-secondary-light uppercase">
                  {t("hero.badge")}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] tracking-tighter mb-8">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-white/60 font-body leading-relaxed mb-10 text-justify">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link
                  href="/diagnostic"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-n2k-secondary-light hover:bg-n2k-secondary text-white px-8 py-4 rounded-xl text-sm font-black tracking-tight shadow-lg shadow-n2k-secondary/20 transition-all"
                >
                  Demander un diagnostic sanitaire
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/problemes-solutions"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-tight transition-all border border-white/15"
                >
                  Découvrir nos solutions
                </Link>
              </div>
            </div>
            {/* Right Column: Image */}
            <div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px] md:h-[450px] w-full bg-n2k-surface-high">
                <Image
                  src="/images/hero_contact.png"
                  alt={t("hero.badge")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              {/* Decorative glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-n2k-secondary/20 blur-3xl -z-10 rounded-full mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Steps */}
      <section className="py-12 md:py-16 bg-n2k-surface-low">
        <div className="container mx-auto px-6 md:px-8 max-w-[1400px]">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-n2k-primary text-center mb-10">
            {t("diagnostic.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: "01", title: t("diagnostic.step1Title"), desc: t("diagnostic.step1Desc") },
              { num: "02", title: t("diagnostic.step2Title"), desc: t("diagnostic.step2Desc") },
              { num: "03", title: t("diagnostic.step3Title"), desc: t("diagnostic.step3Desc") },
            ].map((step) => (
              <div key={step.num} className="relative bg-white rounded-xl p-6 md:p-8 border border-slate-100 shadow-sm">
                <span className="text-5xl font-black font-heading text-n2k-secondary/10 absolute top-4 right-4 rtl:left-4 rtl:right-auto leading-none">
                  {step.num}
                </span>
                <h3 className="font-heading font-bold text-n2k-primary text-lg mb-3">{step.title}</h3>
                <p className="text-n2k-on-surface-variant text-sm leading-relaxed font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 container mx-auto px-6 md:px-8 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Form & Leadership */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Form Card */}
            <div className="bg-white p-8 md:p-10 rounded-xl relative overflow-hidden shadow-ambient-lg border border-slate-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-n2k-primary/5 rounded-full -mr-16 -mt-16 rtl:left-0 rtl:right-auto rtl:-ml-16" />
              <h2 className="text-3xl font-heading font-bold text-n2k-primary mb-2">
                {t("form.title")}
              </h2>
              <p className="text-slate-500 mb-10">
                {t("form.description")}
              </p>
              
              <GeneralContactForm />
            </div>

            {/* Leadership Section */}
            <div className="flex items-center gap-6 p-8 border-l-4 border-n2k-primary rtl:border-l-0 rtl:border-r-4 bg-white rounded-r-xl rtl:rounded-r-none rtl:rounded-l-xl shadow-sm">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src="/images/mahmoud-portrait.jpg"
                  alt="Dr. Mahmoud Naffati"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-n2k-primary">
                  {t("leadership.name")}
                </h3>
                <p className="text-slate-500 text-sm mb-3 italic">
                  {t("leadership.role")}
                </p>
                <Link
                  href={t("leadership.linkedin")}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-n2k-primary hover:text-n2k-secondary transition-colors font-bold text-xs uppercase tracking-widest"
                >
                  <LinkIcon className="w-4 h-4" />
                  {t("leadership.linkedinText")}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Info Cards & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
              
              {/* Headquarters */}
              <div className="group bg-slate-100 p-8 rounded-xl transition-all hover:bg-slate-200 border-b-4 border-transparent hover:border-n2k-primary cursor-default">
                <div className="flex items-start gap-4">
                  <div className="bg-n2k-primary text-white p-3 rounded shadow-lg shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-widest uppercase text-n2k-primary mb-2">
                      {t("info.hq.title")}
                    </h4>
                    <p className="text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                      {t("info.hq.address")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-slate-50 p-8 rounded-xl border-b-4 border-transparent hover:border-n2k-secondary transition-all cursor-default shadow-sm border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="bg-n2k-secondary text-white p-3 rounded shadow-lg shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-widest uppercase text-n2k-secondary mb-2">
                      {t("info.support.title")}
                    </h4>
                    <div className="flex items-center gap-2 text-slate-800 font-medium mb-1">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <a href={`mailto:${t("info.support.email")}`} className="hover:text-n2k-secondary transition-colors">
                        {t("info.support.email")}
                      </a>
                    </div>
                    <div className="text-n2k-primary font-bold text-xl mt-2">
                      <a href={`tel:${t("info.support.phone")}`} className="hover:text-n2k-secondary transition-colors">
                        {t("info.support.phone")}
                      </a>
                    </div>
                    <div className="text-n2k-primary font-bold text-lg mt-1">
                      <a href="tel:+21628717998" className="hover:text-n2k-secondary transition-colors">
                        (+216) 28 717 998
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-slate-50 p-8 rounded-xl border-b-4 border-transparent hover:border-n2k-orange transition-all cursor-default shadow-sm border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="bg-n2k-orange text-white p-3 rounded shadow-lg shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-widest uppercase text-n2k-orange mb-2">
                      {t("info.hours.title")}
                    </h4>
                    <p className="text-slate-800 font-medium">{t("info.hours.regular")}</p>
                    <p className="text-slate-500 text-sm mt-1">{t("info.hours.urgent")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative w-full h-[400px] bg-slate-200 overflow-hidden rounded-xl group shadow-inner">
              <div className="absolute inset-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                <Image
                  src="/images/map-bg.jpg"
                  alt="Location Map"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-n2k-primary/10" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-n2k-primary p-4 rounded-full shadow-2xl animate-pulse">
                  <MapPin className="text-white w-10 h-10" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-lg flex justify-between items-center shadow-lg">
                <div>
                  <p className="text-[10px] font-bold text-n2k-primary tracking-widest uppercase">
                    {t("info.map.label")}
                  </p>
                  <p className="font-heading font-bold text-n2k-primary">
                    Borj Cédria Technopark
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Pôle+Technologique+de+Borj+Cédria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-n2k-primary hover:bg-n2k-primary/90 text-white text-xs font-bold px-4 py-2 rounded transition-colors"
                >
                  {t("info.map.openBtn")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
