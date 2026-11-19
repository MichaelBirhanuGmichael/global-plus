import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PartnershipBand from "@/components/partnership-band";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import TireExplorer from "@/components/tire-explorer";
import { patterns } from "@/data/tires";

const title = "EFFIPLUS Truck and Bus Tires in Ethiopia | Global Plus Business Group";
const description =
  "Global Plus is the exclusive official dealer of EFFIPLUS TBR tires in Ethiopia. Browse on-road, mix-road and off-road truck and bus tires by pattern and size, and request a quote.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products/tires" },
  openGraph: { title, description, url: "/products/tires", images: ["/products/tires/hero-on.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/products/tires/hero-on.jpg"] },
};

const facts = [
  ["Official status", "Exclusive dealer, Ethiopia"],
  ["Agreement term", "2027 to 2029"],
  ["Warranty", "Under the EFFIPLUS warranty policy"],
  ["Range", `${patterns.length} patterns · on, mix and off road`],
];

export default function TiresPage() {
  return (
    <main className="prPage tx">
      <SiteHeader />

      <Suspense fallback={<div className="txFallback" aria-hidden="true" />}>
        <TireExplorer patterns={patterns} />
      </Suspense>

      <PartnershipBand />

      <section className="prFacts" aria-label="Dealership">
        <dl className="prShell">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="prShell prSection prHelp">
        <div>
          <h2>Not sure which tire fits?</h2>
          <p>Tell us the vehicle, the tire size on it and the kind of road it works on. We will recommend the pattern and ply rating, and quote it.</p>
        </div>
        <Link className="prButton" href="/contact?product=EFFIPLUS%20TBR%20tires">
          Ask our team
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
