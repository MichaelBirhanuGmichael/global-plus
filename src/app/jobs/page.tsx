import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getOpenings } from "@/lib/erp";
import { formatDate } from "@/lib/format";

const title = "Jobs | Global Plus Business Group";
const description = "Open positions at Global Plus Business Group in Addis Ababa. Apply online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/jobs" },
  openGraph: { title, description, url: "/jobs", images: ["/global-plus-coffee-farm-hero.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/global-plus-coffee-farm-hero.png"] },
};

export const dynamic = "force-dynamic"; // the list comes from the company system: a closed position must disappear at once

export default async function CareersPage() {
  const openings = await getOpenings();
  return (
    <main className="contactPage">
      <SiteHeader />

      <section className="contactBody">
        <div className="contactIntro">
          <p className="contactEyebrow">Jobs</p>
          <h1>
            Build your career <em>with Global Plus.</em>
          </h1>
          <p>Join a diversified Ethiopian group connecting Ethiopia to the world. These are the positions open now.</p>
        </div>

        {openings.length ? (
          <ul className="jobList">
            {openings.map((job) => (
              <li key={job.slug}>
                <Link href={`/jobs/${job.slug}`} className="jobCard">
                  <div>
                    <h2>{job.title}</h2>
                    <p className="jobMeta">
                      {[job.department, job.employment_type, job.location].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <div className="jobSide">
                    <span>{job.pay}</span>
                    {job.closes_on ? <span>Apply by {formatDate(job.closes_on)}</span> : null}
                    <span className="jobGo">View and apply ↗</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="jobEmpty">
            <h2>No open positions right now.</h2>
            <p>New positions are posted here as they open. You can also write to us on the contact page.</p>
            <Link href="/contact">Contact us ↗</Link>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
