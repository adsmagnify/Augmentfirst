import type { Metadata } from "next";
import { Libre_Baskerville, Plus_Jakarta_Sans } from "next/font/google";
import { FloatingCta } from "./components/FloatingCta";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AugmentFirst — When the board asks for the numbers",
  description:
    "For banks, fintechs, and regulated firms whose data foundation was never built to be trusted. Senior-led assessment with Vijay Kanojia — not another dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        {children}
        <FloatingCta />
      </body>
    </html>
  );
}
