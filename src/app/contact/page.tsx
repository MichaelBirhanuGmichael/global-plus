import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/contact-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const title = "Contact | Global Plus Business Group";
const description = "Contact Global Plus Business Group in Addis Ababa by phone, WhatsApp, Telegram or email.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", images: ["/global-plus-coffee-farm-hero.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/global-plus-coffee-farm-hero.png"] },
};

export default function ContactPage() {
  return (
    <main className="contactPage">
      <SiteHeader />

      <section className="contactBody" id="inquiry">
        <div className="contactIntro">
          <p className="contactEyebrow">Begin a partnership</p>
          <h1>
            Let&apos;s build the next <em>opportunity together.</em>
          </h1>
          <p>Share the product, project, volume, destination or partnership detail and we will follow up.</p>
        </div>
        <Suspense fallback={<p className="contactFormFallback">Loading inquiry form…</p>}>
          <ContactForm />
        </Suspense>
      </section>

      <SiteFooter />
    </main>
  );
}
