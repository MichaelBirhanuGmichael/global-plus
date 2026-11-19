import type { Metadata } from "next";
import { Suspense } from "react";
import SiteFooter from "@/components/site-footer";
import PartnershipBand from "@/components/partnership-band";
import SiteHeader from "@/components/site-header";
import TireExplorer from "@/components/tire-explorer";
import { patterns } from "@/data/tires";

const title = "Products | Global Plus Business Group";
const description =
  "Products supplied by Global Plus Business Group in Ethiopia, including EFFIPLUS truck and bus radial tires through our exclusive dealership.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: { title, description, url: "/products", images: ["/products/tires/hero-on.jpg"] },
};

/* Every product we supply is listed here. Today that is the tire range; add a section here when a new line is signed. */
export default function ProductsPage() {
  return (
    <main className="prPage tx">
      <SiteHeader />
      <Suspense fallback={<div className="txFallback" aria-hidden="true" />}>
        <TireExplorer patterns={patterns} title="Our Products" showCategories />
      </Suspense>
      <PartnershipBand />
      <SiteFooter />
    </main>
  );
}
