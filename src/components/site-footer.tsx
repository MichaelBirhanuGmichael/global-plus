import Image from "next/image";
import Link from "next/link";
import { EMAIL } from "@/data/site";

const contactChannels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/251976390000",
    external: true,
    title: "Message us on WhatsApp · 0976 390 000",
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/+251911278192",
    external: true,
    title: "Reach us on Telegram · 0911 278 192",
  },
  {
    id: "phone",
    label: "Call",
    href: "tel:+251116662914",
    external: false,
    title: "Call head office · +251 11 666 2914",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${EMAIL}`,
    external: false,
    title: `Email · ${EMAIL}`,
  },
];

function ContactIcon({ id }: { id: string }) {
  if (id === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.1A9.9 9.9 0 0 0 3.4 16.7L2 22l5.5-1.4A9.9 9.9 0 1 0 12 2.1Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a8.2 8.2 0 1 1 7 3.8Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1 0-.3-.1-.4s-.5-1.2-.7-1.6-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3a2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3.1 2.9 10.5 10.5 0 0 0 1.9.7 2.4 2.4 0 0 0 1.7-.6 2.8 2.8 0 0 0 .6-1.3c.1-.2 0-.3-.1-.4Z" />
      </svg>
    );
  }
  if (id === "telegram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.8 4.3 18.9 19c-.2.9-.8 1.1-1.6.7l-4.4-3.3-2.1 2.1c-.2.2-.4.4-.9.4l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2l-10.6 6.7-4.6-1.4c-1-.3-1-.9.2-1.4L20.4 3c.8-.3 1.5.2 1.4 1.3Z" />
      </svg>
    );
  }
  if (id === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.6 3.2h2.4c.5 0 .9.3 1 .8l.7 3a1 1 0 0 1-.3 1l-1.5 1.5a12.1 12.1 0 0 0 5.3 5.3l1.5-1.5a1 1 0 0 1 1-.3l3 .7c.5.1.8.5.8 1v2.4c0 .6-.4 1-1 1A15.4 15.4 0 0 1 5.6 4.2c0-.6.4-1 1-1Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.2.4 5.3 3.7a1 1 0 0 0 1.1 0l5.3-3.7H6.2Zm11.6 1.8-4.8 3.3a2.7 2.7 0 0 1-3 0L5.2 8.7V17c0 .3.2.5.5.5h12.6c.3 0 .5-.2.5-.5V8.7Z" />
    </svg>
  );
}

const businessLinks = [
  ["Manufacturing & Industrial", "/businesses/manufacturing"],
  ["Trading & Distribution", "/businesses/trading"],
  ["Construction & Infrastructure", "/businesses/construction"],
  ["Export & Agribusiness", "/businesses/agribusiness"],
  ["Minerals & Resources", "/businesses/minerals"],
  ["Technology", "/businesses/technology"],
] as const;

const productLinks = [
  ["All products", "/products"],
  ["Truck and bus tires", "/products/tires"],
  ["Technology products", "/products/technology"],
  ["Request a quote", "/contact?product=EFFIPLUS%20TBR%20tires"],
] as const;

const companyLinks = [
  ["About", "/#about"],
  ["Roadmap", "/#roadmap"],
  ["Regional reach", "/#reach"],
  ["News", "/news"],
  ["Careers", "/jobs"],
  ["Contact", "/contact"],
] as const;

export default function SiteFooter() {
  return (
    <footer className="gpFoot" id="office">
      <div className="gpFootShell">
        <div className="gpFootTop">
          <div className="gpFootBrand">
            <Link href="/" className="gpFootLogo" aria-label="Global Plus Business Group, home">
              <Image src="/global-plus-mark.png" alt="" width={56} height={44} />
              <span>
                <b>
                  GLOBAL <i>PLUS</i>
                </b>
                <small>Business Group</small>
              </span>
            </Link>
            <p>Diversified expertise. One global vision.</p>
            <ul className="gpFootChannels" aria-label="Contact channels">
              {contactChannels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    title={channel.title}
                    aria-label={channel.title}
                  >
                    <ContactIcon id={channel.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="gpFootCol" aria-label="Businesses">
            <h3>Businesses</h3>
            <ul>
              {businessLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="gpFootCol" aria-label="Products">
            <h3>Products</h3>
            <ul>
              {productLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="gpFootCol" aria-label="Company">
            <h3>Company</h3>
            <ul>
              {companyLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="gpFootOffices">
          <article className="gpFootOffice">
            <div className="gpFootOfficeInfo">
              <h3>Head office</h3>
              <address>
                Milkomy City Complex, 3rd floor, Office 310
                <br />
                Bole Medhanialem, opposite Golden Tulip Hotel
                <br />
                Woreda 3, Addis Ababa, Ethiopia
                <br />
                <span>XQVP+W8W</span>
              </address>
              <a
                className="gpFootMapLink"
                href="https://maps.app.goo.gl/xNWTC7HZ9ouzjubb6"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="gpFootMap">
              <iframe
                title="Global Plus head office in Bole Medhanialem, Addis Ababa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.4817668631977!2d38.7874602!3d8.9956766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b852fb88f982d%3A0x39091497a93dacb3!2sMilkomi%20City%20Complex!5e1!3m2!1sen!2set!4v1788441197272!5m2!1sen!2set"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </article>

          <article className="gpFootOffice">
            <div className="gpFootOfficeInfo">
              <h3>Branch office</h3>
              <address>
                Atsede Tesfa Building, Office 2A
                <br />
                Addis Ababa, Ethiopia
                <br />
                <span>2Q6J+8F9</span>
              </address>
              <a
                className="gpFootMapLink"
                href="https://maps.app.goo.gl/nELfBNsFot5TPGBb9"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="gpFootMap">
              <iframe
                title="Global Plus branch office, Atsede Tesfa Building, Addis Ababa"
                src="https://www.google.com/maps?q=9.0107776,38.7812473&hl=en&z=17&output=embed"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </article>
        </div>

        <div className="gpFootBottom">
          <small>© 2026 Global Plus Business Group One Member PLC. All rights reserved.</small>
          <small>Addis Ababa, Ethiopia</small>
        </div>
      </div>
    </footer>
  );
}
