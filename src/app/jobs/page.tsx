import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { businesses } from "@/data/businesses";
import { getOpenings } from "@/lib/erp";
import { formatDate } from "@/lib/format";

const title = "Careers | Global Plus Business Group";
const description = "Open positions at Global Plus Business Group in Addis Ababa. See the roles and apply online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/jobs" },
  openGraph: { title, description, url: "/jobs", images: ["/global-plus-coffee-farm-hero.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/global-plus-coffee-farm-hero.png"] },
};

export const dynamic = "force-dynamic"; // the list comes from the company system: a closed position must disappear at once

const values = ["Accountability", "Creativity", "Sustainability", "Excellence", "Cooperation", "Agility", "Customer focus"];

export default async function CareersPage() {
  const openings = await getOpenings();

  return (
    <main className="cr">
      <SiteHeader />

      <section className="crHero">
        <div className="crShell">
          <p className="crEyebrow">Careers</p>
          <h1>Build your career with Global Plus.</h1>
          <p>Join a diversified Ethiopian group connecting Ethiopia to the world. Here are the positions open now.</p>
        </div>
      </section>

      {/* Open positions */}
      <section className="crShell crOpen" id="positions" aria-labelledby="open-title">
        <header className="crOpenHead">
          <h2 id="open-title">Open positions</h2>
          <span>{openings.length === 0 ? "None right now" : `${openings.length} open`}</span>
        </header>

        {openings.length ? (
          <ul className="crList">
            {openings.map((job) => (
              <li key={job.slug}>
                <Link href={`/jobs/${job.slug}`} className="crJob">
                  <div className="crJobMain">
                    <h3>{job.title}</h3>
                    <ul className="crChips">
                      {[job.department, job.employment_type, job.location].filter(Boolean).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="crJobSide">
                    {job.pay ? <span className="crPay">{job.pay}</span> : null}
                    {job.closes_on ? <span className="crBy">Apply by {formatDate(job.closes_on)}</span> : null}
                  </div>
                  <span className="crGo" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                  <span className="crSr">View and apply</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="crEmpty">
            <h3>No open positions right now.</h3>
            <p>New positions are posted here as they open. Meanwhile, write to us and tell us what you do. We keep good people in mind.</p>
            <div className="crEmptyActions">
              <Link className="crBtn" href="/contact">
                Contact us
              </Link>
              <Link className="crBtnGhost" href="/#businesses">
                See our businesses
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Why Global Plus */}
      <section className="crWhy">
        <div className="crShell crWhyGrid">
          <div className="crWhyCopy">
            <p className="crEyebrow crDark">Life at Global Plus</p>
            <h2>One group. Many ways to build a career.</h2>
            <p>We work across six businesses, from manufacturing and trade to construction, agribusiness, minerals and technology. People here grow by working on real projects with a team that shares the same values.</p>
            <ul className="crValues" aria-label="Our values">
              {values.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <ul className="crBiz" aria-label="Our businesses">
            {businesses.map((b) => (
              <li key={b.slug}>
                <Link href={`/businesses/${b.slug}`}>
                  <span>{b.n}</span>
                  <b>{b.name}</b>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing band */}
      <section className="crBand">
        <div className="crShell">
          <h2>Don&apos;t see a role that fits?</h2>
          <p>Tell us about yourself and the kind of work you want to do. We will keep your message in mind when a position opens.</p>
          <Link className="crBtn" href="/contact">
            Get in touch
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
