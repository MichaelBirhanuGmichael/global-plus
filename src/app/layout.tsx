import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import LiveChat from "@/components/live-chat";
import "./globals.css";
import "./logo-overrides.css";
import "./experience.css";
import "./ecosystem.css";
import "./coffee-journey.css";
import "./division-slideshow.css";
import "./location.css";
import "./agribusiness.css";
import "./manufacturing.css";
import "./trading.css";
import "./construction.css";
import "./minerals.css";
import "./contact.css";
import "./business-nav.css";
import "./live-chat.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global Plus Business Group | Ethiopia to the World",
  description: "A diversified Ethiopian business group spanning export, manufacturing, construction, minerals and international trade.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <LiveChat />
      </body>
    </html>
  );
}
