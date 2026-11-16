import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import localFont from "next/font/local";

// Wix Madefor Display (variable, OFL) — see public/fonts/WixMadeforDisplay-LICENSE.txt
const display = localFont({
  src: "../public/fonts/WixMadeforDisplay-Variable.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Nei Rin Zara Lwin — AI Native Software Engineer",
  description:
    "Portfolio of Nei Rin Zara Lwin — AI Native Software Engineer building mobile and web products across marketplaces, fintech, and hospitality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${display.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
