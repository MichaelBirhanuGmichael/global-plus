import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ContactForm from "@/components/contact-form";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact | Global Plus Business Group",
  description: "Contact Global Plus Business Group in Addis Ababa by phone, WhatsApp, Telegram or email.",
};

export default function ContactPage() {
  return (
    <main className="contactPage">
      <header className="contactNav">
        <Link href="/" aria-label="Global Plus home">
          <Image src="/global-plus-logo-dark.png" alt="Global Plus Business Group" width={210} height={140} />
        </Link>
        <nav>
          <Link href="/#businesses">Businesses</Link>
          <Link href="/">Group home</Link>
        </nav>
      </header>

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
