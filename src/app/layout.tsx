import type { Metadata } from "next";
import "./globals.css";
import "./logo-overrides.css";
import "./experience.css";
import "./ecosystem.css";
import "./coffee-journey.css";
import "./division-slideshow.css";
import "./location.css";

export const metadata: Metadata = {
  title: "Global Plus Business Group | Ethiopia to the World",
  description: "A diversified Ethiopian business group spanning export, manufacturing, construction, minerals and international trade.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
