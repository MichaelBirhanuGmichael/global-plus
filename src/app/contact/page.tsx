import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/contact-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { EMAIL } from "@/data/site";

const title = "Contact | Global Plus Business Group";
const description = "Contact Global Plus Business Group in Addis Ababa by phone, WhatsApp, Telegram or email, or send an inquiry about a product, project or partnership.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", images: ["/global-plus-coffee-farm-hero.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/global-plus-coffee-farm-hero.png"] },
};

const channels = [
  { label: "WhatsApp", value: "0976 390 000", href: "https://wa.me/251976390000", external: true },
  { label: "Telegram", value: "0911 278 192", href: "https://t.me/+251911278192", external: true },
  { label: "Call", value: "+251 11 666 2914", href: "tel:+251116662914", external: false },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
];

const offices = [
  {
    name: "Head office",
    lines: ["Milkomy City Complex, 3rd floor, Office 310", "Bole Medhanialem, opposite Golden Tulip Hotel", "Woreda 3, Addis Ababa, Ethiopia"],
    href: "https://maps.app.goo.gl/xNWTC7HZ9ouzjubb6",
  },
  {
    name: "Branch office",
    lines: ["Atsede Tesfa Building, Office 2A", "Addis Ababa, Ethiopia"],
    href: "https://maps.app.goo.gl/nELfBNsFot5TPGBb9",
  },
];

export default function ContactPage() {
  return (
    <main className="ct">
      <SiteHeader />

      <section className="ctHero">
        <div className="ctShell">
          <p className="ctEyebrow">Contact</p>
          <h1>Let&apos;s talk about what you need.</h1>
          <p>Share the product, project, volume, destination or partnership detail and we will follow up.</p>
        </div>
      </section>

      <section className="ctShell ctBody" id="inquiry">
        <div className="ctFormCard">
          <h2>Send an inquiry</h2>
          <Suspense fallback={<p className="ctFallback">Loading the form…</p>}>
            <ContactForm />
          </Suspense>
        </div>

        <aside className="ctSide" aria-label="Other ways to reach us">
          <div className="ctBlock">
            <h2>Reach us directly</h2>
            <ul className="ctChannels">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noreferrer" : undefined}>
                    <span>{c.label}</span>
                    <b>{c.value}</b>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ctBlock">
            <h2>Visit us</h2>
            <ul className="ctOffices">
              {offices.map((o) => (
                <li key={o.name}>
                  <h3>{o.name}</h3>
                  <address>
                    {o.lines.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </address>
                  <a href={o.href} target="_blank" rel="noreferrer">
                    Open in Google Maps
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
