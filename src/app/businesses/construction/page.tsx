import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteBusinessNav from "@/components/site-business-nav";
import SiteFooter from "@/components/site-footer";

const title="Construction & Infrastructure | Global Plus Business Group";
const description="Building, road and waterworks contracting supported by general construction, engineering coordination and project delivery.";
export const metadata: Metadata={
  title,
  description,
  alternates:{canonical:"/businesses/construction"},
  openGraph:{title,description,url:"/businesses/construction",images:["/ethiopia-construction-addis.jpg"]},
  twitter:{card:"summary_large_image",title,description,images:["/ethiopia-construction-addis.jpg"]},
};
const services=[
  ["01","Building works","Commercial, institutional and general building works delivered through coordinated construction teams."],
  ["02","Road works","Road construction and associated civil works supporting safer movement and stronger connectivity."],
  ["03","Waterworks","Water infrastructure contracting for systems that improve access, resilience and community value."],
  ["04","General contracting","Multi-discipline contracting services beyond waterworks, aligned to defined project requirements."],
  ["05","Project coordination","Planning, procurement, engineering coordination and on-site execution managed as one delivery path."],
  ["06","Fleet & site operations","Equipment, logistics and active-site operations organized around safety, quality and progress."],
];
const phases=["Plan & mobilize","Engineer & procure","Build & control","Complete & hand over"];

export default function ConstructionPage(){return <main className="buildPage">
  <SiteBusinessNav accent="construction" />
  <section className="buildHero"><Image src="/ethiopia-construction-addis.jpg" alt="Ethiopian construction professionals working on a major Addis Ababa project" fill priority sizes="100vw"/><div className="buildHeroShade"/><div className="buildBlueprint"/><div className="buildHeroCopy"><p><span>03</span> Construction & Infrastructure</p><h1>Building progress.<br/><em>Delivering</em> confidence.</h1><div><span>Engineering focus</span><span>Site discipline</span><span>Lasting value</span></div></div><a className="buildScroll" href="#build-services">Explore capabilities <span>↓</span></a></section>
  <section className="buildServices" id="build-services"><div className="buildServicesHead"><p className="buildEyebrow">Core capabilities</p><h2>Infrastructure built<br/><em>around purpose.</em></h2></div><div className="buildServiceGrid">{services.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href="#build-contact">Discuss a project ↗</a></article>)}</div></section>
  {/* <section className="buildStatement"><p className="buildEyebrow">Infrastructure for growth</p><div><h2>From essential systems<br/>to <em>city-shaping work.</em></h2><p>Global Plus brings building, road and waterworks capabilities together under a coordinated contracting model designed for accountable delivery and long-term value.</p></div></section> */}
  <section className="buildDelivery"><div className="buildDeliveryCopy"><p className="buildEyebrow">Project delivery</p><h2>One clear path<br/>from plan to handover.</h2><p>Each project moves through a controlled sequence that aligns people, materials, equipment and decisions—helping teams manage quality, safety, schedule and scope.</p><ol>{phases.map((p,i)=><li key={p}><b>{String(i+1).padStart(2,"0")}</b><span>{p}</span></li>)}</ol></div><div className="buildDeliveryMedia"><Image src="/ethiopia-construction-rail.jpg" alt="Ethiopian infrastructure crew working on a concrete foundation" fill sizes="55vw"/><span>Plan · Build · Deliver</span></div></section>
  <section className="buildWater"><div className="buildWaterImage"><Image src="/ethiopia-construction-water.jpg" alt="Water infrastructure construction supporting an Ethiopian community" fill sizes="50vw"/></div><div className="buildWaterCopy"><p className="buildEyebrow">Essential infrastructure</p><h2>Water systems that<br/><em>strengthen communities.</em></h2><p>Waterworks require technical care and local understanding. Our contracting direction connects civil execution with responsible planning and dependable project coordination.</p><ul><li>Waterworks contracting</li><li>Civil construction</li><li>Site coordination</li><li>Quality monitoring</li><li>Resource planning</li><li>Project handover</li></ul></div></section>
  <section className="buildBand" aria-label="Construction delivery pathway">
    <div className="buildBandInner">
      {[
        ["01", "Plan"],
        ["02", "Mobilize"],
        ["03", "Construct"],
        ["04", "Deliver"],
      ].map(([num, label], index, list) => (
        <div className="buildBandStepWrap" key={label}>
          <article className="buildBandStep" style={{ ["--i" as string]: index }}>
            <b>{num}</b>
            <p>{label}</p>
          </article>
          {index < list.length - 1 ? <span className="buildBandArrow" aria-hidden="true"><i/></span> : null}
        </div>
      ))}
    </div>
  </section>
  <section className="buildContact" id="build-contact"><p className="buildEyebrow">Start a project conversation</p><h2>Build what matters.<br/><em>Build with Global Plus.</em></h2><p>Share the project type, location, scope and delivery requirements. Our team will help define the next steps.</p><Link href="/contact?division=Construction%20%26%20Infrastructure">Start a conversation <span>↗</span></Link></section>
  <SiteFooter />
</main>}
