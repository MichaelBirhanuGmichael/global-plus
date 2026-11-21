import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ApplyForm from "@/components/apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getOpening } from "@/lib/erp";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getOpening(slug);
  if (!job) return { title: "Position closed | Global Plus Business Group" };
  const title = `${job.title} | Careers | Global Plus Business Group`;
  return { title, description: `${job.title} at Global Plus Business Group. Apply online.`, alternates: { canonical: `/jobs/${slug}` } };
}

export default async function OpeningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getOpening(slug);
  if (!job) notFound();

  const chips = [job.department, job.employment_type, job.location].filter(Boolean);
  const facts = [
    ["Salary", job.pay],
    ["Apply by", job.closes_on ? formatDate(job.closes_on) : ""],
    ["Posted", job.posted_on ? formatDate(job.posted_on) : ""],
  ].filter(([, value]) => value);

  return (
    <main className="cr">
      <SiteHeader />

      <section className="crHero crHeroJob">
        <div className="crShell">
          <nav className="crCrumbs" aria-label="Breadcrumb">
            <Link href="/jobs">Careers</Link>
            <span>/</span>
            <span>{job.title}</span>
          </nav>
          <p className="crEyebrow">Open position</p>
          <h1>{job.title}</h1>
          {chips.length ? (
            <ul className="crHeroChips">
              {chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : null}
          <a className="crBtn" href="#apply">
            Apply now
          </a>
        </div>
      </section>

      <section className="crShell crJobBody">
        <div className="crJobText">
          {facts.length ? (
            <dl className="crFacts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {job.description ? <div className="crProse" dangerouslySetInnerHTML={{ __html: job.description }} /> : <p className="crProseEmpty">The full description will be shared during the hiring process.</p>}

          <div className="crAbout">
            <h2>About Global Plus</h2>
            <p>Global Plus Business Group is a diversified Ethiopian group across manufacturing, trading, construction, agribusiness, minerals and technology, connecting Ethiopia to regional and global markets.</p>
            <Link href="/#businesses">See our businesses</Link>
          </div>
        </div>

        <aside className="crApply" id="apply">
          <Suspense fallback={<p className="crLoading">Loading the application form…</p>}>
            <ApplyForm slug={slug} title={job.title} />
          </Suspense>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
