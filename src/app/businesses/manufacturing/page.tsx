import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manufacturing & Industrial | Global Plus Business Group",
  description: "Manufacturing capability spanning metal products, electrical equipment, domestic appliances, cement, lime, plaster and industrial inputs.",
};

const capabilities = [
  ["01", "Iron, steel & metal products", "Manufacturing and fabrication capability for iron, steel and other metallic mineral products."],
  ["02", "Electrical appliances", "Production pathways for domestic electrical appliances designed around dependable local and regional demand."],
  ["03", "Electrical machinery", "Electrical machinery, apparatus and utility products supported by disciplined industrial systems."],
  ["04", "Cement, lime & plaster", "Planned manufacturing capacity for core construction materials serving infrastructure and building markets."],
  ["05", "Cleaning & cosmetic inputs", "Manufacturing of cleaning and cosmetic products and their essential production inputs."],
  ["06", "Industrial chemicals", "Integrated access to basic chemicals and chemical products used across industrial value chains."],
];

const operatingModel = ["Source inputs", "Engineer production", "Control quality", "Package & distribute"];

export default function ManufacturingPage() {
  return <main className="mfgPage">
    <header className="mfgNav"><Link href="/" aria-label="Global Plus home"><Image src="/global-plus-logo-dark.png" alt="Global Plus Business Group" width={210} height={140}/></Link><nav><Link href="/#businesses">All businesses</Link><Link href="/contact" className="mfgNavCta">Start a conversation <span>↗</span></Link></nav></header>

    <section className="mfgHero">
      <Image src="/ethiopia-manufacturing-welding.jpg" alt="Industrial metalworking and manufacturing operations in Ethiopia" fill priority sizes="100vw"/>
      <div className="mfgHeroShade"/><div className="mfgHeroGrid"/>
      <div className="mfgHeroCopy"><p><span>01</span> Manufacturing & Industrial</p><h1>Built to make.<br/><em>Engineered</em> to grow.</h1><div><span>Industrial discipline</span><span>Local capability</span><span>Regional ambition</span></div></div>
      <a className="mfgScroll" href="#capabilities">Explore capabilities <span>↓</span></a>
    </section>

    <section className="mfgStatement"><p className="mfgEyebrow">Productive capacity</p><div><h2>Turning resources into<br/><em>essential products.</em></h2><p>Global Plus is developing a connected manufacturing platform that combines material knowledge, production discipline and market access—creating dependable products for homes, businesses and infrastructure.</p></div></section>

    <section className="mfgFeature">
      <div className="mfgFeatureCopy"><p className="mfgEyebrow">Industrial platform</p><h2>Strength across<br/>the value chain.</h2><p>From raw-material sourcing and fabrication to quality assurance and distribution, every stage is designed to work as one system. Shared expertise across the group creates stronger procurement, faster execution and scalable routes to market.</p><ol>{operatingModel.map((step,index)=><li key={step}><b>{String(index+1).padStart(2,"0")}</b><span>{step}</span></li>)}</ol></div>
      <div className="mfgFeatureMedia"><Image src="/ethiopia-manufacturing-hawassa.jpg" alt="Ethiopian technicians working at an industrial production facility" fill sizes="55vw"/><span>People · Process · Production</span></div>
    </section>

    <section className="mfgCapabilities" id="capabilities"><div className="mfgCapabilitiesHead"><p className="mfgEyebrow">Core capabilities</p><h2>A diversified<br/><em>industrial portfolio.</em></h2></div><div className="mfgCapabilityGrid">{capabilities.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><a href="#mfg-contact">Discuss capability ↗</a></article>)}</div></section>

    <section className="mfgPeople"><div className="mfgPeopleImage"><Image src="/ethiopia-manufacturing-workers.jpg" alt="Ethiopian manufacturing professionals on a production floor" fill sizes="50vw"/></div><div className="mfgPeopleCopy"><p className="mfgEyebrow">Made through expertise</p><h2>People power<br/><em>production.</em></h2><p>Modern equipment matters, but capable teams create consistent results. Our industrial direction prioritizes technical skills, safe operations, repeatable quality and continuous improvement.</p><div><span>Workforce development</span><span>Quality control</span><span>Operational safety</span><span>Process improvement</span></div></div></section>

    <section className="mfgBand"><p>Materials</p><span>→</span><p>Manufacturing</p><span>→</span><p>Quality</p><span>→</span><p>Market</p></section>

    <section className="mfgContact" id="mfg-contact"><p className="mfgEyebrow">Build industrial opportunity</p><h2>Make more possible.<br/><em>Build with Global Plus.</em></h2><p>Talk to our team about manufacturing partnerships, supply requirements and future industrial projects.</p><Link href="/contact?division=Manufacturing%20%26%20Industrial">Start a conversation <span>↗</span></Link></section>

    <footer className="mfgFooter"><Image src="/global-plus-logo-dark.png" alt="Global Plus Business Group" width={180} height={120}/><p>Manufacturing & Industrial<br/>Capability built for growth.</p><Link href="/">Back to group <span>↑</span></Link><small>© 2026 Global Plus Business Group</small></footer>
  </main>;
}
