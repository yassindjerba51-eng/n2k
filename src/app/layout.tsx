import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Les Laboratoires N2K",
  description: "Solutions scientifiques de biosécurité pour l'élevage tunisien",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
