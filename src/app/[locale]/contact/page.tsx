import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, MapPin, Phone, Clock, Mail } from "lucide-react";
import GeneralContactForm from "@/components/ui/GeneralContactForm";

export default function ContactPage() {
  const t = useTranslations("contactPage");

  return (
    <main className="bg-n2k-bg text-n2k-text min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-n2k-primary">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/contact-hero.jpg"
            alt="Laboratory background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-n2k-primary to-transparent rtl:bg-gradient-to-l" />
        
        <div className="relative container mx-auto px-6 md:px-8 max-w-[1400px]">
          <div className="max-w-5xl">
            <span className="inline-block px-4 py-1.5 mb-6 bg-n2k-secondary text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">
              {t("hero.badge")}
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white tracking-tight leading-tight mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              {t("hero.subtitle")}
            </p>
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
                  alt="Dr. Mahmoud Nafeti"
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
                    Location
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

      {/* Accreditation Footer Accent */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-6 md:px-8 max-w-[1400px] flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="font-heading font-black text-xl md:text-2xl tracking-tighter">ISO 17025</span>
            <span className="font-heading font-black text-xl md:text-2xl tracking-tighter">TUNAC</span>
            <span className="font-heading font-black text-xl md:text-2xl tracking-tighter">BUREAU VERITAS</span>
          </div>
          <p className="text-sm font-medium text-slate-500 max-w-sm text-left md:text-right">
            {t("accreditation")}
          </p>
        </div>
      </section>
    </main>
  );
}
