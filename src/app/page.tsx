"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const divisions = [
  { n: "01", title: "Manufacturing & Industrial", text: "Metal works, electrical manufacturing, cement, concrete and construction materials.", image: "/stock-manufacturing-v2.jpg", tone: "blue" },
  { n: "02", title: "Trading & Distribution", text: "ICT, electronics, electrical equipment, stationery, paper and office supply networks.", image: "/stock-trade.jpg", tone: "gold" },
  { n: "03", title: "Construction & Infrastructure", text: "Buildings, roads, waterworks, engineering, fleet operations and project delivery.", image: "/stock-construction.jpg", tone: "red" },
  { n: "04", title: "Export & Agribusiness", text: "Premium coffee and tea, minerals, commodity logistics and certified export operations.", image: "/stock-coffee.jpg", tone: "green" },
];

const roadmap = [
  { phase: "Foundation", label: "Now", title: "Integrated operations", text: "Four strategic clusters supported by shared finance, people, technology, legal and quality systems." },
  { phase: "Expansion", label: "Next", title: "Cement export readiness", text: "Developing efficient grinding, certification and logistics capabilities for regional demand." },
  { phase: "Growth", label: "Future", title: "Mining & regional leadership", text: "Expanding exploration, beneficiation and responsible partnerships across strategic minerals." },
];

const ecosystem = [
  { key: "M", title: "Manufacturing", text: "Industrial capability and product innovation" },
  { key: "T", title: "Trading", text: "Connected procurement and distribution" },
  { key: "E", title: "Exports", text: "Global markets, logistics and certification" },
  { key: "S", title: "Sustainability", text: "Responsible growth and regional impact" },
  { key: "F", title: "Finance", text: "Investment enablement and shared strength" },
  { key: "C", title: "Construction", text: "Infrastructure that advances communities" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <header className={`siteNav ${scrolled ? "isScrolled" : ""}`}>
        <div className="navInner shell">
          <a className="brand" href="#home" aria-label="Global Plus home"><Image src="/global-plus-logo-dark.png" alt="Global Plus Business Group" width={270} height={180} priority /></a>
          <nav className={`navlinks ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#ecosystem" onClick={() => setMenuOpen(false)}>Ecosystem</a><a href="#businesses" onClick={() => setMenuOpen(false)}>Businesses</a><a href="#roadmap" onClick={() => setMenuOpen(false)}>Vision 2031</a><a href="#reach" onClick={() => setMenuOpen(false)}>Global Reach</a>
          </nav>
          <a className="navCta" href="#contact">Start a conversation <span>↗</span></a>
          <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span/><span/></button>
        </div>
      </header>

      <section className="newHero" id="home">
        <Image className="heroImage" src="/stock-trade.jpg" alt="International container port representing Global Plus trade operations" fill sizes="100vw" priority />
        <div className="heroShade"/><div className="heroGrid"/>
        <div className="heroCopy shell">
          <p className="kicker"><span/> Ethiopia rooted · Globally connected</p>
          <h1><span>One group.</span><br/><em>Worlds</em> of possibility.</h1>
          <p>Connecting resources, industries and markets through integrated manufacturing, trade, construction and export expertise.</p>
          <div className="heroActions"><a className="goldButton" href="#businesses">Explore our businesses <span>→</span></a><a className="watchLink" href="#roadmap"><i>▶</i> Discover our vision</a></div>
        </div>
        <div className="heroBottom shell"><span>Scroll to explore</span><div className="scrollLine"/><p><b>04</b> strategic clusters</p><p><b>02</b> growth engines</p></div>
      </section>

      <section className="statement shell" id="about">
        <p className="sectionLabel">Global Plus at a glance</p>
        <div><h2>Built to move<br/>business <em>forward.</em></h2><p className="bigCopy">Our vision is to become the leading ecosystem in East Africa by 2031—integrating a diversified portfolio to create long-term value and regional impact.</p><div className="values"><span>Accountability</span><span>Creativity</span><span>Sustainability</span><span>Excellence</span><span>Cooperation</span><span>Agility</span><span>Customer focus</span></div></div>
      </section>

      <section className="ecosystemSection" id="ecosystem">
        <div className="shell ecosystemHeader"><div><p className="sectionLabel light">The Global Plus ecosystem</p><h2>Six capabilities.<br/><em>One growth engine.</em></h2></div><p>Every part of the group strengthens the next. Capital enables production, infrastructure expands access, trade connects supply, and responsible export creates enduring regional value.</p></div>
        <div className="ecosystemStage shell">
          <div className="ecoOrbit ecoOrbitOne"/><div className="ecoOrbit ecoOrbitTwo"/>
          <div className="ecoCore"><span>GLO+</span><b>Ecosystem</b><p>Integrated for impact</p></div>
          {ecosystem.map((item, index)=><article className={`ecoNode ecoNode${index+1}`} key={item.key} tabIndex={0}><i>{item.key}</i><div><h3>{item.title}</h3><p>{item.text}</p></div><span>{String(index+1).padStart(2,"0")}</span></article>)}
        </div>
        <div className="ecosystemPillars shell"><span>Portfolio expansion</span><span>Ecosystem integration</span><span>Market leadership</span><span>Investment enablement</span><span>Operational excellence</span><span>Regional impact</span></div>
      </section>

      <section className="divisionSection" id="businesses">
        <div className="shell divisionIntro"><p className="sectionLabel light">Our business ecosystem</p><h2>Distinct expertise.<br/><em>One powerful group.</em></h2><p>Our clusters operate with specialist focus and shared strength—unlocking efficiency, scale and integrated delivery.</p></div>
        <div className="divisionStack shell">
          {divisions.map((d) => <article className={`divisionCard ${d.tone}`} key={d.n}><Image src={d.image} alt="" fill sizes="(max-width: 800px) 100vw, 50vw"/><div className="cardShade"/><span className="cardNumber">{d.n}</span><div className="cardContent"><p>Strategic cluster</p><h3>{d.title}</h3><span>{d.text}</span><a href="#contact">Explore division ↗</a></div></article>)}
        </div>
      </section>

      <section className="coffeeFeature">
        <div className="coffeePhoto"><Image src="/stock-coffee.jpg" alt="Ripe coffee cherries representing Ethiopian coffee exports" fill sizes="50vw"/><span>Premium origin · Ethiopia</span></div>
        <div className="coffeeWords"><p className="sectionLabel">Signature expertise</p><h2>Heritage,<br/><em>prepared for<br/>the world.</em></h2><p>From sourcing and processing to quality assurance and export logistics, Global Plus is positioning Ethiopian coffee and tea as premium products in international markets.</p><ol><li><b>01</b> Source</li><li><b>02</b> Process</li><li><b>03</b> Assure</li><li><b>04</b> Export</li></ol><a className="inkButton" href="#contact">Explore agribusiness <span>→</span></a></div>
      </section>

      <section className="roadmapSection" id="roadmap">
        <div className="roadmapBg"><Image src="/stock-manufacturing-v2.jpg" alt="Industrial metalworking representing Global Plus growth strategy" fill sizes="100vw"/></div>
        <div className="roadmapContent shell"><p className="sectionLabel light">Strategic roadmap</p><div className="roadmapHeading"><h2>Building the<br/><em>next chapter.</em></h2><p>The group&apos;s feasibility program translates ambition into a phased path—from stronger integrated operations to export-scale industrial leadership.</p></div><div className="timeline">{roadmap.map((r,i)=><article key={r.phase}><span className="timelineDot">{i+1}</span><p>{r.label} · {r.phase}</p><h3>{r.title}</h3><span>{r.text}</span></article>)}</div></div>
      </section>

      <section className="globalSection" id="reach">
        <div className="orbitScene" aria-hidden="true"><div className="orbit orbitOne"/><div className="orbit orbitTwo"/><div className="globeDisc"><Image src="/global-plus-logo-light.png" alt="" width={580} height={387}/></div><span className="routePoint p1"/><span className="routePoint p2"/><span className="routePoint p3"/></div>
        <div className="globalCopy shell"><p className="sectionLabel light">Regional & global outlook</p><h2>Ethiopia at the center<br/>of <em>opportunity.</em></h2><p>With access through Djibouti and a strategic focus on East Africa and the Middle East, Global Plus is building the partnerships, certification and logistics needed to compete across borders.</p><div className="marketLegend"><span><i className="active"/> Established focus</span><span><i/> Strategic growth market</span></div></div>
      </section>

      <section className="contactSection shell" id="contact"><p className="sectionLabel">Begin a partnership</p><h2>Let&apos;s build the next<br/><em>opportunity together.</em></h2><p>Choose a division, share your objective, and connect with the Global Plus team.</p><a className="goldButton" href="#home">Talk to our team <span>↗</span></a></section>
      <footer className="newFooter"><div className="shell footerGrid"><Image src="/global-plus-logo-dark.png" alt="Global Plus Business Group" width={220} height={147}/><p>Diversified expertise.<br/>One global vision.</p><div><b>Explore</b><a href="#about">About</a><a href="#ecosystem">Ecosystem</a><a href="#businesses">Businesses</a><a href="#roadmap">Vision 2031</a></div><div><b>Connect</b><a href="#contact">Contact</a><a href="#reach">Global reach</a></div><small>© 2026 Global Plus Business Group. All rights reserved.</small></div></footer>
    </main>
  );
}
