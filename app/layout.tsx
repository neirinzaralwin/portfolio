import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import localFont from "next/font/local";

// Load the local font
const sfPro = localFont({
  src: "../public/fonts/SFPRODISPLAYREGULAR.otf",
  weight: "normal",
  style: "normal",
  display: "swap",
  variable: "--font-sfpro",
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
    <html lang="en" className={`dark ${sfPro.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
