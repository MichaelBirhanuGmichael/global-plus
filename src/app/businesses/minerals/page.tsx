import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteBusinessNav from "@/components/site-business-nav";
import SiteFooter from "@/components/site-footer";

const title="Minerals & Resources | Global Plus Business Group";
const description="Responsible sourcing, certification and export of precious, semi-precious, metallic and industrial minerals from Ethiopia.";
export const metadata: Metadata={
  title,
  description,
  alternates:{canonical:"/businesses/minerals"},
  openGraph:{title,description,url:"/businesses/minerals",images:["/minerals-hero.webp"]},
  twitter:{card:"summary_large_image",title,description,images:["/minerals-hero.webp"]},
};
const resources=[
  ["01","Precious minerals","Commercial pathways for responsibly sourced precious mineral opportunities and export-ready supply."],
  ["02","Semi-precious minerals","Identification, quality preparation and trade support for Ethiopia's distinctive semi-precious resources."],
  ["03","Metallic minerals","Sourcing and export coordination for metallic mineral products aligned to buyer requirements."],
  ["04","Industrial minerals","Market development for industrial mineral resources serving manufacturing and construction value chains."],
  ["05","Certification support","Certificate-of-competence and documentation pathways coordinated for compliant mineral export activity."],
  ["06","Export logistics","Quality, packaging, documentation and movement planned from source to international destination."],
];
const pathway=["Identify source","Verify material","Prepare & certify","Coordinate export"];

export default function MineralsPage(){return <main className="minPage">
  <SiteBusinessNav accent="minerals" />
  <section className="minHero"><Image src="/minerals-hero.webp" alt="Premium copper and malachite mineral specimen" fill priority sizes="100vw" quality={82}/><div className="minHeroShade"/><div className="minHeroCopy"><p><span>05</span> Minerals & Resources</p><h1>Grounded in value.<br/><em>Connected</em> to markets.</h1><div><span>Responsible sourcing</span><span>Verified quality</span><span>Export readiness</span></div></div><a className="minScroll" href="#min-resources">Explore capabilities <span>↓</span></a></section>
  <section className="minResources" id="min-resources"><div className="minResourcesHead"><p className="minEyebrow">Core capabilities</p><h2>Diverse resources.<br/><em>Focused execution.</em></h2></div><div className="minResourceGrid">{resources.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href="#min-contact">Discuss an opportunity ↗</a></article>)}</div></section>
  <section className="minPath"><div className="minPathMedia"><Image src="/minerals-open-pit.webp" alt="Large-scale open-pit mineral mine in Ethiopia" fill sizes="(max-width: 900px) 100vw, 55vw" quality={70}/><span>Source · Verify · Move</span></div><div className="minPathCopy"><p className="minEyebrow">Resource pathway</p><h2>Clarity at<br/>every stage.</h2><p>Mineral trade depends on verified material, reliable documentation and disciplined coordination. Our approach connects each stage into a transparent commercial pathway.</p><ol>{pathway.map((p,i)=><li key={p}><b>{String(i+1).padStart(2,"0")}</b><span>{p}</span></li>)}</ol></div></section>
  <section className="minStatement"><p className="minEyebrow">Ethiopian resource potential</p><h2>From geological opportunity to <em>global value.</em></h2><p>Global Plus brings sourcing, market knowledge, certification coordination and export logistics together to develop responsible pathways for Ethiopia's mineral resources.</p></section>
  <section className="minResponsible"><div className="minResponsibleCopy"><p className="minEyebrow">Responsible development</p><h2>Value beyond<br/><em>the material.</em></h2><p>Long-term resource development requires care for people, place and commercial integrity. We prioritize traceable sourcing, appropriate documentation and partnerships designed to create durable value.</p><ul><li>Traceable sourcing</li><li>Material verification</li><li>Regulatory alignment</li><li>Documentation control</li><li>Commercial transparency</li><li>Responsible partnerships</li></ul></div><div className="minResponsibleImage"><Image src="/minerals-highland.webp" alt="Ethiopian highland mineral-bearing rocky terrain" fill sizes="(max-width: 900px) 100vw, 50vw" quality={70}/></div></section>
  <section className="minBand" aria-label="Mineral value pathway">
    <div className="minBandInner">
      {[
        ["01", "Source"],
        ["02", "Verify"],
        ["03", "Certify"],
        ["04", "Export"],
      ].map(([num, label], index, list) => (
        <div className="minBandStepWrap" key={label}>
          <article className="minBandStep" style={{ ["--i" as string]: index }}>
            <b>{num}</b>
            <p>{label}</p>
          </article>
          {index < list.length - 1 ? <span className="minBandArrow" aria-hidden="true"><i/></span> : null}
        </div>
      ))}
    </div>
  </section>
  <section className="minContact" id="min-contact"><p className="minEyebrow">Explore a mineral opportunity</p><h2>Unlock potential.<br/><em>Partner responsibly.</em></h2><p>Tell us the mineral, required specification, volume and destination. Our team will help define a responsible commercial pathway.</p><Link href="/contact?division=Minerals%20%26%20Resources">Start a conversation <span>↗</span></Link></section>
  <SiteFooter />
</main>}
