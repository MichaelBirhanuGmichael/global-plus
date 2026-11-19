import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import TireCard from "@/components/tire-card";
import TireSpecs from "@/components/tire-specs";
import { DEALER_LINE, getPattern, patterns, roads, sizeList } from "@/data/tires";

export function generateStaticParams() {
  return patterns.map((p) => ({ pattern: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pattern: string }> }): Promise<Metadata> {
  const { pattern } = await params;
  const p = getPattern(pattern);
  if (!p) return { title: "Tire not found | Global Plus Business Group" };
  const title = `EFFIPLUS ${p.name} truck tire | Global Plus Business Group`;
  const description = `EFFIPLUS ${p.name}, ${roads[p.road].label.toLowerCase()} truck and bus tire. Sizes: ${sizeList(p).join(", ")}. Supplied in Ethiopia by Global Plus, exclusive official dealer.`;
  return {
    title,
    description,
    alternates: { canonical: `/products/tires/${p.slug}` },
    openGraph: { title, description, url: `/products/tires/${p.slug}`, images: p.image ? [p.image] : undefined },
  };
}

export default async function PatternPage({ params }: { params: Promise<{ pattern: string }> }) {
  const { pattern } = await params;
  const p = getPattern(pattern);
  if (!p) notFound();

  const road = roads[p.road];
  const sizes = sizeList(p);
  const plies = Array.from(new Set(p.sizes.map((s) => parseInt(s.pr)))).sort((a, b) => a - b);
  const plyText = plies.length === 1 ? `${plies[0]}PR` : `${plies[0]} to ${plies[plies.length - 1]}PR`;
  const construction = p.sizes.every((s) => s.type === "TL") ? "Tubeless" : p.sizes.every((s) => s.type === "TT") ? "Tube type" : "Tubeless and tube type";
  const related = patterns.filter((x) => x.road === p.road && x.slug !== p.slug).slice(0, 3);
  const quote = `/contact?product=${encodeURIComponent(`EFFIPLUS ${p.name}`)}`;

  return (
    <main className="prPage pd">
      <SiteHeader />

      {/* Hero */}
      <section className="pdHero">
        <div className="pdShell pdHeroGrid">
          <div className="pdHeroCopy">
            <nav className="pdCrumbs" aria-label="Breadcrumb">
              <Link href="/products">Products</Link>
              <span>/</span>
              <Link href="/products/tires">Truck and bus tires</Link>
            </nav>
            <p className="pdEyebrow">
              EFFIPLUS · <span className={`pdRoad pdRoad-${p.road}`}>{road.label}</span>
            </p>
            <h1>{p.name}</h1>
            <p className="pdLead">{road.use}</p>
            <ul className="pdFacts">
              <li>
                <b>{sizes.length}</b>
                <span>{sizes.length === 1 ? "size" : "sizes"}</span>
              </li>
              <li>
                <b>{plyText}</b>
                <span>ply rating</span>
              </li>
              <li>
                <b>{construction}</b>
                <span>construction</span>
              </li>
            </ul>
            <div className="pdActions">
              <Link className="pdBtn" href={quote}>
                Request a quote
              </Link>
              <a className="pdBtnGhost" href="#specifications">
                View specifications
              </a>
            </div>
            <p className="pdDealer">{DEALER_LINE}.</p>
          </div>

          <div className="pdHeroArt">
            {p.image ? (
              <Image src={p.image} alt={`EFFIPLUS ${p.name} truck tire`} width={760} height={760} priority sizes="(max-width: 900px) 80vw, 520px" />
            ) : (
              <aside className="pdGlance" aria-label={`${p.name} at a glance`}>
                <p className="pdGlanceTitle">At a glance</p>
                <dl>
                  <div>
                    <dt>{sizes.length === 1 ? "Size" : "Sizes"}</dt>
                    <dd>{sizes.join(", ")}</dd>
                  </div>
                  <div>
                    <dt>Ply rating</dt>
                    <dd>{plyText}</dd>
                  </div>
                  <div>
                    <dt>Construction</dt>
                    <dd>{construction}</dd>
                  </div>
                  <div>
                    <dt>Load, single fitment</dt>
                    <dd>up to {Math.max(...p.sizes.map((s) => s.single)).toLocaleString("en-US")} kg</dd>
                  </div>
                </dl>
                <p className="pdGlanceNote">Product photo coming soon.</p>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="pdSection" id="specifications">
        <div className="pdShell">
          <header className="pdHead">
            <h2>Specifications</h2>
            <p>{sizes.length > 1 ? "Choose a size to see its specifications." : "Technical data for this tire."}</p>
          </header>
          <TireSpecs name={p.name} sizes={p.sizes} />
          <p className="pdFine">Specifications follow the EFFIPLUS TBR catalogue 2026 and may change. We confirm them on your quotation. Tires are supplied under the EFFIPLUS warranty policy.</p>
        </div>
      </section>

      {/* Features */}
      {p.features?.length ? (
        <section className="pdSection pdTint">
          <div className="pdShell">
            <header className="pdHead">
              <h2>Built to last.</h2>
              <p>What sets the {p.name} apart.</p>
            </header>
            <ul className="pdFeatures">
              {p.features.map((f, i) => (
                <li key={f.title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Quote */}
      <section className="pdCta">
        <div className="pdShell">
          <h2>Get a quote for the {p.name}.</h2>
          <p>Tell us the size, the quantity and where it should be delivered. We will come back with availability and a price.</p>
          <div className="pdActions pdActionsCenter">
            <Link className="pdBtn pdBtnGold" href={quote}>
              Request a quote
            </Link>
            <Link className="pdBtnGhost pdBtnGhostLight" href="/products/tires">
              Browse all tires
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="pdSection">
          <div className="pdShell">
            <header className="pdHead pdHeadRow">
              <h2>More {road.label.toLowerCase()} tires.</h2>
              <Link className="pdLink" href="/products/tires">
                See the full range
              </Link>
            </header>
            <ul className="pdRelated">
              {related.map((r) => (
                <li key={r.slug}>
                  <TireCard pattern={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}
