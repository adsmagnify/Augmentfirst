import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { FloatingCta } from "./components/FloatingCta";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AugmentFirst — Request Your Senior Data Assessment",
  description:
    "A data foundation that was never built to be trusted. AugmentFirst fixes it at the source — senior-led, not another dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        {children}
        <FloatingCta />
      </body>
    </html>
  );
}
