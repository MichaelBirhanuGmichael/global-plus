import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { TechIcon } from "@/components/tech-icon";
import { services, technology } from "@/data/technology";

const title = "Technology products | Global Plus Business Group";
const description =
  "Fleet management, a platform connecting truck owners with business owners, digital ticketing, GPS trackers and dash cams, and ERP and business systems from Global Plus Business Group.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products/technology" },
  openGraph: { title, description, url: "/products/technology" },
  twitter: { card: "summary_large_image", title, description },
};

export default function TechnologyProductsPage() {
  return (
    <main className="tk">
      <SiteHeader />

      {/* Hero */}
      <section className="tkHero tkHeroCompact">
        <div className="tkShell">
          <nav className="tkCrumbs" aria-label="Breadcrumb">
            <Link href="/products">Products</Link>
            <span>/</span>
            <span>Technology</span>
          </nav>
          <p className="tkEyebrow">Technology products</p>
          <h1>Software and devices for transport and business.</h1>
          <p className="tkLead">Five lines from Global Plus Technology: some are available today and some are being built. Each shows its status, and we are looking for the first customers to shape them.</p>
          <div className="tkActions">
            <Link className="tkBtn" href="/contact?division=Technology">
              Become a pilot customer
            </Link>
            <Link className="tkBtnGhost" href="/businesses/technology">
              About Global Plus Technology
            </Link>
          </div>
        </div>
      </section>

      {/* The five lines */}
      <section className="tkSection" id="lines">
        <div className="tkShell">
          <ul className="tkGrid">
            {technology.map((t) => (
              <li key={t.slug} id={t.slug}>
                <article className="tkCard">
                  <div className="tkCardTop">
                    <span className="tkIcon">
                      <TechIcon name={t.icon} />
                    </span>
                    <span className={`tkStatus tkStatus-${t.status.replace(" ", "-").toLowerCase()}`}>{t.status}</span>
                  </div>
                  <h2>{t.title}</h2>
                  <p className="tkCardText">{t.text}</p>
                  <ul className="tkPoints">
                    {t.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <Link className="tkCardLink" href={`/contact?division=Technology&interest=${encodeURIComponent(t.interest)}`}>
                    Ask about this
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Software development */}
      <section className="tkSection tkTint" id="development">
        <div className="tkShell">
          <header className="tkHead">
            <p className="tkEyebrowDark">Software development</p>
            <h2>We also build software for you.</h2>
            <p>Web and mobile applications designed and built by our own engineers, for companies that need something made around the way they work.</p>
          </header>
          <ul className="tkGrid tkGrid2">
            {services.map((t) => (
              <li key={t.slug} id={t.slug}>
                <article className="tkCard">
                  <div className="tkCardTop">
                    <span className="tkIcon">
                      <TechIcon name={t.icon} />
                    </span>
                    <span className="tkStatus tkStatus-available">Available</span>
                  </div>
                  <h2>{t.title}</h2>
                  <p className="tkCardText">{t.text}</p>
                  <ul className="tkPoints">
                    {t.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <Link className="tkCardLink" href={`/contact?division=Technology&interest=${encodeURIComponent(t.interest)}`}>
                    Start a project
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call to action */}
      <section className="tkCta">
        <div className="tkShell">
          <h2>Help us build it, and use it first.</h2>
          <p>Tell us about your fleet, your routes or your business. Early customers get a say in what we build and priority access when it launches.</p>
          <Link className="tkBtn" href="/contact?division=Technology">
            Become a pilot customer
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
