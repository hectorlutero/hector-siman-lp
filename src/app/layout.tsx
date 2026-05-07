import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hector Siman — Consultoria em IA & Automação",
  description:
    "Pare de pagar gente cara para fazer trabalho de robô. Consultoria em IA e automação para empresas que querem escalar sem aumentar custo.",
  keywords: [
    "consultoria IA",
    "automação empresarial",
    "inteligência artificial",
    "AI consulting",
    "business automation",
  ],
  authors: [{ name: "Hector Siman" }],
  openGraph: {
    title: "Hector Siman — Consultoria em IA & Automação",
    description:
      "A IA cuida do operacional. Seu time cuida do que dá dinheiro.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
