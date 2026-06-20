import "@/app/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Montserrat, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://n2k-laboratoires.tn";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" },
  });
  const logoUrl = settings?.logoUrl || "/images/n2k-logo.png";
  const siteName = settings?.siteName || "Les Laboratoires N2K";
  
  return {
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        ar: "/ar",
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "website",
      siteName: siteName,
      locale: locale === "ar" ? "ar_TN" : locale === "en" ? "en_US" : "fr_FR",
    },
    icons: {
      icon: logoUrl,
      shortcut: logoUrl,
      apple: logoUrl,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" },
  });
  const logoUrl = settings?.logoUrl || "/images/n2k-logo.png";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${montserrat.variable} ${inter.variable} ${ibmPlexArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-title" content="N2K" />
        <link rel="icon" href={logoUrl} />
      </head>
      <body
        className={`min-h-full flex flex-col ${isRTL ? "font-[var(--font-arabic)]" : "font-[var(--font-body)]"}`}
        style={{ fontFamily: isRTL ? "var(--font-arabic), sans-serif" : "var(--font-body), sans-serif" }}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} logoUrl={logoUrl} />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <Toaster position={isRTL ? "bottom-left" : "bottom-right"} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
