import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "rwque — Web Developer & Automation",
  description: "Portfolio de rwque — desenvolvedor web e especialista em automações. Sites modernos, scraping e automações que funcionam.",
  openGraph: {
    title: "rwque",
    description: "Web Developer & Automation Specialist · Based in Brazil",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable} ${mono.variable}`}>
      <body>
        <Navbar />
        <div style={{ paddingTop: "var(--nav-height)" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
