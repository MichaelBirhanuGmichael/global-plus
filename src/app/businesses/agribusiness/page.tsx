import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteBusinessNav from "@/components/site-business-nav";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Export & Agribusiness | Global Plus Business Group",
  description: "Ethiopian coffee, tea, oilseeds, pulses, cereals, spices, produce and flowers prepared for international markets by Global Plus Business Group.",
};

const products = [
  ["01", "Coffee & tea", "Origin-led sourcing, washing, grading, roasting, quality assurance and export preparation."],
  ["02", "Oilseeds", "Export-oriented sourcing and handling of sesame and other Ethiopian oilseed products."],
  ["03", "Pulses & cereals", "Commercial aggregation, quality control and international supply of agricultural staples."],
  ["04", "Pepper & spices", "Careful sourcing, preparation and distribution of distinctive Ethiopian spice products."],
  ["05", "Fruits & vegetables", "Fresh produce handling built around quality, timing and dependable market delivery."],
  ["06", "Flowers & plant products", "Export support for cut flowers, plant products and high-value horticultural supply chains."],
];

const process = ["Farm partnerships", "Selective harvest", "Processing", "Grading & quality", "Certification", "Export logistics"];

export default function AgribusinessPage() {
  return <main className="agriPage">
    <SiteBusinessNav accent="agribusiness" />

    <section className="agriHero">
      <Image src="/global-plus-coffee-farm-hero.png" alt="Ripe coffee cherries growing on a highland coffee farm" fill priority sizes="100vw"/>
      <div className="agriHeroShade"/><div className="agriHeroCopy"><p><span>04</span> Export & Agribusiness</p><h1>From Ethiopian<br/><em>origin</em> to the world.</h1><div><span>Responsible sourcing</span><span>Quality preparation</span><span>Global delivery</span></div></div>
      <a className="agriScroll" href="#portfolio">Explore capabilities <span>↓</span></a>
    </section>

    <section className="agriPortfolio" id="portfolio"><div className="agriPortfolioHead"><p className="agriEyebrow">Core capabilities</p><h2>Beyond coffee.<br/><em>A diversified supply.</em></h2></div><div className="agriProductGrid">{products.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><a href="#agri-contact">Discuss supply ↗</a></article>)}</div></section>

    <section className="agriOrigin">
      <div className="agriOriginMedia"><video autoPlay muted loop playsInline poster="/ethiopia-coffee-sidama.jpg"><source src="/global-plus-coffee-origin.mp4" type="video/mp4"/></video><span>Field footage · Ethiopian coffee origin</span></div>
      <div className="agriOriginCopy"><p className="agriEyebrow">Flagship value chain</p><h2>Coffee,<br/>fully connected.</h2><p>Our coffee capability follows the product from landscape and harvest through washing, drying, hulling, grading and export-ready preparation—protecting its identity at every stage.</p><ol>{process.map((step,index)=><li key={step}><b>{String(index+1).padStart(2,"0")}</b><span>{step}</span></li>)}</ol></div>
    </section>

    <section className="agriStatement"><p className="agriEyebrow">Rooted in provenance</p><div><h2>Turning agricultural<br/>potential into <em>global value.</em></h2><p>Global Plus connects Ethiopian producers with international markets through an integrated system of sourcing, processing, quality control, certification and logistics.</p></div></section>

    <section className="agriProof"><div className="agriProofImage"><Image src="/ethiopia-coffee-yirgacheffe.jpg" alt="Coffee washing at a station in Yirgacheffe, Ethiopia" fill sizes="50vw"/></div><div className="agriProofCopy"><p className="agriEyebrow">Market readiness</p><h2>Prepared for the<br/><em>next destination.</em></h2><div className="agriProofList"><span>Quality inspection</span><span>Product grading</span><span>Export documentation</span><span>Certification coordination</span><span>Packaging preparation</span><span>Commodity logistics</span></div><p>Requirements are aligned to the product, destination and buyer specification—creating a clear path from Ethiopia to regional and international customers.</p></div></section>

    <section className="agriMarkets" aria-label="Agribusiness market pathway">
      <div className="agriMarketsInner">
        {[
          ["01", "Ethiopia"],
          ["02", "East Africa"],
          ["03", "Middle East"],
          ["04", "Global markets"],
        ].map(([num, label], index, list) => (
          <div className="agriMarketsStepWrap" key={label}>
            <article className="agriMarketsStep" style={{ ["--i" as string]: index }}>
              <b>{num}</b>
              <p>{label}</p>
            </article>
            {index < list.length - 1 ? <span className="agriMarketsArrow" aria-hidden="true"><i/></span> : null}
          </div>
        ))}
      </div>
    </section>

    <section className="agriContact" id="agri-contact"><p className="agriEyebrow">Build a supply partnership</p><h2>Source with confidence.<br/><em>Grow with Global Plus.</em></h2><p>Tell us the product, volume, destination and quality requirement. Our team will help shape the right sourcing and export pathway.</p><Link href="/contact?division=Export%20%26%20Agribusiness">Start a conversation <span>↗</span></Link></section>

    <SiteFooter />
  </main>;
}
