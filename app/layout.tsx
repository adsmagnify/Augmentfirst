import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Libre_Baskerville, Plus_Jakarta_Sans } from "next/font/google";
import { FloatingCta } from "./components/FloatingCta";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/app/lib/site";
import "./globals.css";

const GTM_ID = "GTM-KQP7TD6R";
const GOOGLE_ADS_ID = "AW-18241571886";

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

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080b12",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | When the board asks for the numbers`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "data foundation",
    "data trust",
    "financial services",
    "data lineage",
    "CDO",
    "risk and compliance",
    "audit",
    "London",
    "AugmentFirst",
  ],
  authors: [{ name: "Vijay Kanojia", url: siteUrl }],
  creator: "Vijay Kanojia",
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | When the board asks for the numbers`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | When the board asks for the numbers`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/augment_first_logo.png", type: "image/png" }],
    apple: [{ url: "/augment_first_logo.png", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: siteUrl,
  description: SITE_DESCRIPTION,
  email: "Vijay.Kanojia@augmentfirst.com",
  areaServed: {
    "@type": "Place",
    name: "United Kingdom",
  },
  founder: {
    "@type": "Person",
    name: "Vijay Kanojia",
    jobTitle: "Founder & Principal Consultant",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${libreBaskerville.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <FloatingCta />
      </body>
    </html>
  );
}
