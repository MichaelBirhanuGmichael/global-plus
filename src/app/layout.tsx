import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import LiveChat from "@/components/live-chat";
import { EMAIL } from "@/data/site";
import "./globals.css";
import "./logo-overrides.css";
import "./experience.css";
import "./ecosystem.css";
import "./coffee-journey.css";
import "./division-slideshow.css";
import "./location.css";
import "./contact.css";
import "./careers.css";
import "./live-chat.css";
import "./products.css";
import "./header.css";
import "./home.css";
import "./pdetail.css";
import "./business.css";
import "./footer.css";
import "./tires.css";
import "./tile.css";
import "./news.css";
import "./technology.css";
import "./contact-page.css";
import "./careers-page.css";
import "./tech-catalog.css";
import "./mobile.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://globalplus.com.et";
const siteName = "Global Plus Business Group";
const siteDescription =
  "A diversified Ethiopian business group spanning export & agribusiness, manufacturing, construction, minerals and international trade & distribution — connecting Ethiopia to global markets.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Global Plus Business Group | Ethiopia to the World",
    template: "%s",
  },
  description: siteDescription,
  keywords: [
    "Global Plus Business Group",
    "Ethiopia export company",
    "Ethiopian coffee exporter",
    "Ethiopia manufacturing",
    "Ethiopia construction company",
    "Ethiopia minerals export",
    "Ethiopia import and trading",
    "Addis Ababa business group",
  ],
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  alternates: { canonical: "/" },
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Global Plus Business Group | Ethiopia to the World",
    description: siteDescription,
    images: [
      {
        url: "/global-plus-coffee-farm-hero.png",
        width: 780,
        height: 439,
        alt: "Global Plus Business Group — Ethiopia to the world",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Plus Business Group | Ethiopia to the World",
    description: siteDescription,
    images: ["/global-plus-coffee-farm-hero.png"],
  },
  icons: {
    icon: "/global-plus-favicon.png",
    shortcut: "/global-plus-favicon.png",
    apple: "/global-plus-favicon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  alternateName: "Global Plus",
  url: siteUrl,
  logo: `${siteUrl}/global-plus-logo.png`,
  image: `${siteUrl}/global-plus-coffee-farm-hero.png`,
  description: siteDescription,
  email: EMAIL,
  telephone: "+251-11-666-2914",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Milkomy City Complex, 3rd floor, Office 310, Bole Medhanialem, opposite Golden Tulip Hotel, Woreda 3",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+251-11-666-2914",
      email: EMAIL,
      areaServed: "ET",
      availableLanguage: ["en", "am"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+251-97-639-0000",
      contactOption: "WhatsApp",
      areaServed: ["ET", "Worldwide"],
    },
  ],
  department: [
    { "@type": "Organization", name: "Export & Agribusiness", url: `${siteUrl}/businesses/agribusiness` },
    { "@type": "Organization", name: "Manufacturing & Industrial", url: `${siteUrl}/businesses/manufacturing` },
    { "@type": "Organization", name: "Construction & Infrastructure", url: `${siteUrl}/businesses/construction` },
    { "@type": "Organization", name: "Trading & Distribution", url: `${siteUrl}/businesses/trading` },
    { "@type": "Organization", name: "Minerals & Resources", url: `${siteUrl}/businesses/minerals` },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <LiveChat />
      </body>
    </html>
  );
}
