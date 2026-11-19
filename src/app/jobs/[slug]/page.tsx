import type { Metadata } from "next";
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
  const title = `${job.title} | Jobs | Global Plus Business Group`;
  return { title, description: `${job.title} at Global Plus Business Group. Apply online.`, alternates: { canonical: `/jobs/${slug}` } };
}

export default async function OpeningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getOpening(slug);
  if (!job) notFound();

  const facts = [
    ["Department", job.department],
    ["Job type", job.employment_type],
    ["Location", job.location],
    ["Salary / compensation", job.pay],
    ["Apply by", formatDate(job.closes_on)],
  ].filter(([, value]) => value);

  return (
    <main className="contactPage">
      <SiteHeader />

      <section className="contactBody">
        <div className="contactIntro">
          <p className="contactEyebrow">Jobs</p>
          <h1>{job.title}</h1>
        </div>

        <dl className="jobFacts">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        {job.description ? <div className="jobProse" dangerouslySetInnerHTML={{ __html: job.description }} /> : null}

        <Suspense fallback={<p className="contactFormFallback">Loading the application form…</p>}>
          <ApplyForm slug={slug} title={job.title} />
        </Suspense>
      </section>

      <SiteFooter />
    </main>
  );
}
