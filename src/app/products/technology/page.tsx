import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { TechIcon } from "@/components/tech-icon";
import { services, technology } from "@/data/technology";

const title = "Technology products | Global Plus Business Group";
const description =
  "Fleet management, GPS trackers and dash cams, and ERP and business systems from Global Plus Business Group.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products/technology" },
  openGraph: { title, description, url: "/products/technology" },
  twitter: { card: "summary_large_image", title, description },
};

/* The kinds of device we are preparing for the GPS line. Plain descriptions: no brands, no prices. */
const deviceKinds = [
  { name: "Wired vehicle trackers", use: "Trucks, buses and delivery vans", note: "Engine cut-off, alarms, ignition detection" },
  { name: "Fuel level sensors", use: "Trucks and buses", note: "Track fuel use and spot losses" },
  { name: "Plug-in trackers", use: "Cars and light vehicles", note: "Fit in minutes, no wiring" },
  { name: "Battery and magnetic trackers", use: "Trailers, containers, motorbikes, assets", note: "Long standby, hidden placement" },
  { name: "Dash cams", use: "Buses and trucks", note: "Driver-safety alerts and recording" },
];

const jump = [
  ...technology.map((t) => ({ href: `#${t.slug}`, label: t.title })),
  { href: "#development", label: "Software development" },
];

export default function TechnologyProductsPage() {
  return (
    <main className="tq">
      <SiteHeader />

      {/* Hero */}
      <section className="tqHero">
        <div className="tqShell tqHeroGrid">
          <div className="tqHeroCopy">
            <nav className="tqCrumbs" aria-label="Breadcrumb">
              <Link href="/products">Products</Link>
              <span>/</span>
              <span>Technology</span>
            </nav>
            <p className="tqEyebrow">Technology catalog</p>
            <h1>Software and devices for transport and business.</h1>
            <p className="tqLead">One group building the platform, the devices and the business systems that move goods and run companies in Ethiopia.</p>
            <div className="tqActions">
              <Link className="tqBtn" href="/contact?division=Technology">
                Talk to our team
              </Link>
              <a className="tqBtnGhost" href="#catalog">
                Browse the catalog
              </a>
            </div>
          </div>
        </div>
        <nav className="tqJump tqShell" aria-label="Catalog sections" id="catalog">
          {jump.map((j) => (
            <a key={j.href} href={j.href}>
              {j.label}
            </a>
          ))}
        </nav>
      </section>

      {/* The product lines: one simple card each */}
      <section className="tqLines">
        <div className="tqShell">
          <ul className="tqCards">
            {technology.map((t) => (
              <li key={t.slug} id={t.slug}>
                <article className="tqCard">
                  <div className="tqCardTop">
                    <span className="tqIcon">
                      <TechIcon name={t.icon} />
                    </span>
                  </div>
                  <h2>{t.title}</h2>
                  <p className="tqShort">{t.short}</p>
                  <p className="tqText">{t.text}</p>
                  <ul className="tqChecks">
                    {t.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <Link className="tqLink" href={`/contact?division=Technology&interest=${encodeURIComponent(t.interest)}`}>
                    Ask about this
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Devices */}
      <section className="tqKindsSec" id="devices">
        <div className="tqShell">
          <header className="tqHead">
            <p className="tqEyebrow tqDark">Devices</p>
            <h2>The devices we are preparing.</h2>
            <p>The hardware that feeds the fleet platform, for every kind of vehicle.</p>
          </header>
          <ul className="tqKinds">
            {deviceKinds.map((d) => (
              <li key={d.name}>
                <b>{d.name}</b>
                <span>{d.use}</span>
                <small>{d.note}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Software development */}
      <section className="tqDev" id="development">
        <div className="tqShell">
          <header className="tqDevHead">
            <p className="tqEyebrow">Software development</p>
            <h2>We also build software for you.</h2>
            <p>Web and mobile applications designed and built by our own engineers, for companies that need something made around the way they work.</p>
          </header>
          <ul className="tqDevGrid">
            {services.map((s) => (
              <li key={s.slug} id={s.slug}>
                <article className="tqDevCard">
                  <span className="tqIcon">
                    <TechIcon name={s.icon} />
                  </span>
                  <div className="tqDevBody">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <ul className="tqChecks">
                      {s.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <Link className="tqBtn" href={`/contact?division=Technology&interest=${encodeURIComponent(s.interest)}`}>
                      Start a project
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call to action */}
      <section className="tqCta">
        <div className="tqShell">
          <h2>Let us talk about what you need.</h2>
          <p>Tell us about your fleet, your routes or your business, and we will show you what fits.</p>
          <Link className="tqBtn" href="/contact?division=Technology">
            Talk to our team
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
