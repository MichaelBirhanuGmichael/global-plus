import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteBusinessNav from "@/components/site-business-nav";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {title:"Trading & Distribution | Global Plus Business Group",description:"Import, distribution and trade representation across ICT, electrical goods, stationery, chemicals, plastics, batteries and consumer inputs."};

const categories=[
  ["01","ICT & communication","Computers, communication equipment and related technology products for connected organizations."],
  ["02","Electrical equipment","Electrical machinery, apparatus, utilities and equipment sourced for commercial and industrial demand."],
  ["03","Stationery & paper","Stationery materials, paper and paper products for institutions, businesses and distribution partners."],
  ["04","Industrial chemicals","Basic chemicals and chemical products supporting manufacturing and other productive sectors."],
  ["05","Rubber, plastics & batteries","Import and trade of rubber products, plastics, plastic products and batteries."],
  ["06","Cleaning & cosmetics","Cleaning products, cosmetics and related inputs supplied through dependable market channels."],
];

export default function TradingPage(){return <main className="tradePage">
  <SiteBusinessNav accent="trading" />
  <section className="tradeHero"><Image src="/ethiopia-trade-modjo.jpg" alt="Container logistics at Ethiopia's Modjo Dry Port" fill priority sizes="100vw"/><div className="tradeHeroShade"/><div className="tradeLines"/><div className="tradeHeroCopy"><p><span>02</span> Trading & Distribution</p><h1>Connected supply.<br/><em>Confident</em> markets.</h1><div><span>Strategic sourcing</span><span>Reliable movement</span><span>Market access</span></div></div><a className="tradeScroll" href="#trade-categories">Explore capabilities <span>↓</span></a></section>
  <section className="tradeCategories" id="trade-categories"><div className="tradeCategoriesHead"><p className="tradeEyebrow">Core capabilities</p><h2>Products that keep<br/><em>business moving.</em></h2></div><div className="tradeCategoryGrid">{categories.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href="#trade-contact">Discuss requirements ↗</a></article>)}</div></section>
  {/* <section className="tradeStatement"><p className="tradeEyebrow">Commerce in motion</p><div><h2>Moving essential products<br/>with <em>purpose.</em></h2><p>Global Plus connects international suppliers with Ethiopian buyers through coordinated procurement, import management, distribution and domestic trade representation.</p></div></section> */}
  <section className="tradeNetwork"><div className="tradeNetworkMedia"><Image src="/ethiopia-trade-port.jpg" alt="Container movement at an Ethiopian inland logistics hub" fill sizes="55vw"/><span>Origin · Port · Market</span></div><div className="tradeNetworkCopy"><p className="tradeEyebrow">Integrated trade model</p><h2>One network.<br/>Many markets.</h2><p>We coordinate the path from supplier selection to final delivery—aligning products, documentation, logistics and local market knowledge in one accountable system.</p><div><article><b>01</b><span>Source</span></article><article><b>02</b><span>Import</span></article><article><b>03</b><span>Distribute</span></article><article><b>04</b><span>Represent</span></article></div></div></section>
  <section className="tradeReach"><div className="tradeReachCopy"><p className="tradeEyebrow">Distribution intelligence</p><h2>From shipment<br/>to <em>shelf.</em></h2><p>Successful trade depends on more than transportation. It requires demand insight, dependable relationships and clear coordination at every handoff.</p><ul><li>Supplier identification</li><li>Import coordination</li><li>Documentation support</li><li>Warehousing pathways</li><li>Channel distribution</li><li>Domestic trade agency</li></ul></div><div className="tradeReachImage"><Image src="/ethiopia-trade-logistics.jpg" alt="Freight and container distribution operations in Ethiopia" fill sizes="50vw"/></div></section>
  <section className="tradeBand" aria-label="Trade value pathway">
    <div className="tradeBandInner">
      {[
        ["01", "Global suppliers"],
        ["02", "Global Plus"],
        ["03", "Ethiopian markets"],
      ].map(([num, label], index, list) => (
        <div className="tradeBandStepWrap" key={label}>
          <article className="tradeBandStep" style={{ ["--i" as string]: index }}>
            <b>{num}</b>
            <p>{label}</p>
          </article>
          {index < list.length - 1 ? <span className="tradeBandArrow" aria-hidden="true"><i/></span> : null}
        </div>
      ))}
    </div>
  </section>
  <section className="tradeContact" id="trade-contact"><p className="tradeEyebrow">Open a trade conversation</p><h2>Connect products<br/>with <em>opportunity.</em></h2><p>Tell us what you need to source, import or distribute. Our team will help define the right route to market.</p><Link href="/contact?division=Trading%20%26%20Distribution">Start a conversation <span>↗</span></Link></section>
  <SiteFooter />
</main>}
