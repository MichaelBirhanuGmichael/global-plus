"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const divisions = [
  { n: "01", title: "Manufacturing & Industrial", text: "Metal works, electrical manufacturing, cement, concrete and construction materials.", tone: "blue", images: [
    { src: "/ethiopia-manufacturing-welding.jpg", alt: "Industrial welding operations in Ethiopia" },
    { src: "/ethiopia-manufacturing-hawassa.jpg", alt: "Ethiopian technicians at Hawassa Industrial Park" },
    { src: "/ethiopia-manufacturing-workers.jpg", alt: "Ethiopian manufacturing team on an active production floor" },
  ] },
  { n: "02", title: "Trading & Distribution", text: "ICT, electronics, electrical equipment, stationery, paper and office supply networks.", tone: "gold", images: [
    { src: "/ethiopia-trade-modjo.jpg", alt: "Modjo Dry Port logistics hub in Ethiopia" },
    { src: "/ethiopia-trade-port.jpg", alt: "Container operations at Ethiopia's Modjo Dry Port" },
    { src: "/ethiopia-trade-logistics.jpg", alt: "Freight and containers at an Ethiopian inland port" },
  ] },
  { n: "03", title: "Construction & Infrastructure", text: "Buildings, roads, waterworks, engineering, fleet operations and project delivery.", tone: "red", images: [
    { src: "/ethiopia-construction-rail.jpg", alt: "Ethiopian infrastructure crew pouring a concrete foundation" },
    { src: "/ethiopia-construction-addis.jpg", alt: "Ethiopian construction professionals on a landmark Addis Ababa project" },
    { src: "/ethiopia-construction-water.jpg", alt: "Community water infrastructure construction in Ethiopia" },
  ] },
  { n: "04", title: "Export & Agribusiness", text: "Premium coffee and tea, minerals, commodity logistics and certified export operations.", tone: "green", images: [
    { src: "/ethiopia-coffee-sidama.jpg", alt: "Ethiopian coffee workers processing cherries in Sidama" },
    { src: "/ethiopia-coffee-yirgacheffe.jpg", alt: "Coffee washing at a station in Yirgacheffe, Ethiopia" },
    { src: "/ethiopia-coffee-daye-bensa.png", alt: "Ethiopian coffee team washing and sorting beans at Daye Bensa" },
  ] },
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
  const [divisionFrame, setDivisionFrame] = useState(0);
  const [divisionSlidesPaused, setDivisionSlidesPaused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (divisionSlidesPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setDivisionFrame((frame) => (frame + 1) % 3), 4600);
    return () => window.clearInterval(timer);
  }, [divisionSlidesPaused]);

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
          {divisions.map((d) => <article className={`divisionCard ${d.tone}`} key={d.n} onMouseEnter={() => setDivisionSlidesPaused(true)} onMouseLeave={() => setDivisionSlidesPaused(false)} onFocusCapture={() => setDivisionSlidesPaused(true)} onBlurCapture={() => setDivisionSlidesPaused(false)}>
            <div className="divisionSlides" aria-live="off">{d.images.map((photo, index) => <Image className={`divisionSlide ${divisionFrame === index ? "active" : ""}`} key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 100vw, 50vw"/>)}</div>
            <div className="cardShade"/><span className="cardNumber">{d.n}</span>
            <div className="divisionProgress" aria-label={`${d.title} image controls`}>{d.images.map((photo, index) => <button className={divisionFrame === index ? "active" : ""} key={photo.src} onClick={() => setDivisionFrame(index)} aria-label={`Show image ${index + 1} of ${d.images.length}`} aria-pressed={divisionFrame === index}><span/></button>)}</div>
            <div className="cardContent"><p>Strategic cluster</p><h3>{d.title}</h3><span>{d.text}</span><a href="#contact">Explore division ↗</a></div>
          </article>)}
        </div>
      </section>

      <section className="coffeeJourney" id="coffee">
        <div className="coffeeJourneyIntro shell"><div><p className="sectionLabel">From Ethiopian origin</p><h2>Every bean has<br/><em>a journey.</em></h2></div><p>Global Plus connects the entire coffee value chain—from the farm landscape and careful harvest to export-ready preparation, quality assurance and international logistics.</p></div>
        <div className="originStory shell">
          <div className="originVideo"><video autoPlay muted loop playsInline poster="/stock-coffee.jpg"><source src="/global-plus-coffee-origin.mp4" type="video/mp4"/></video><div className="videoVeil"/><span className="videoBadge"><i/> Field footage · Coffee origin</span><div className="videoCaption"><b>01</b><h3>At origin</h3><p>Understanding the farm, landscape and growing environment where quality begins.</p></div></div>
          <div className="originQuote"><span>Origin to export</span><blockquote>“Protecting quality at every stage of the value chain.”</blockquote><p>The company profile identifies coffee and tea exports, certification, quality assurance and logistics as core agribusiness capabilities.</p></div>
        </div>
        <div className="processRail shell">
          <article><b>02</b><span>Harvest</span><h3>Selective picking</h3><p>Ripe coffee cherries are carefully collected to protect quality and consistency.</p></article>
          <article><b>03</b><span>Processing</span><h3>Washing & pulping</h3><p>Cherries are cleaned and processed using the method best suited to the lot.</p></article>
          <article><b>04</b><span>Preparation</span><h3>Drying</h3><p>Controlled drying stabilizes the beans while preserving their distinctive character.</p></article>
          <article><b>05</b><span>Refinement</span><h3>Hulling & grading</h3><p>Dried coffee is hulled, sorted and graded to remove defects and meet specifications.</p></article>
          <article><b>06</b><span>Value addition</span><h3>Roasting & quality</h3><p>Selected lots can be roasted and prepared with close attention to profile and consistency.</p></article>
          <article><b>07</b><span>Global delivery</span><h3>Pack, certify & export</h3><p>Quality assurance, export documentation and logistics prepare each order for market.</p></article>
        </div>
        <div className="coffeeJourneyEnd shell"><p><span>Farm</span><i>→</i><span>Mill</span><i>→</i><span>Quality</span><i>→</i><span>Port</span><i>→</i><span>World</span></p><a className="inkButton" href="#contact">Explore agribusiness <span>→</span></a></div>
      </section>

      <section className="roadmapSection" id="roadmap">
        <div className="roadmapBg"><Image src="/stock-manufacturing-v2.jpg" alt="Industrial metalworking representing Global Plus growth strategy" fill sizes="100vw"/></div>
        <div className="roadmapContent shell"><p className="sectionLabel light">Strategic roadmap</p><div className="roadmapHeading"><h2>Building the<br/><em>next chapter.</em></h2><p>The group&apos;s feasibility program translates ambition into a phased path—from stronger integrated operations to export-scale industrial leadership.</p></div><div className="timeline">{roadmap.map((r,i)=><article key={r.phase}><span className="timelineDot">{i+1}</span><p>{r.label} · {r.phase}</p><h3>{r.title}</h3><span>{r.text}</span></article>)}</div></div>
      </section>

      <section className="globalSection" id="reach">
        <div className="orbitScene" aria-hidden="true"><div className="orbit orbitOne"/><div className="orbit orbitTwo"/><div className="globeDisc"><Image src="/global-plus-logo-dark.png" alt="" width={580} height={387}/></div><span className="routePoint p1"/><span className="routePoint p2"/><span className="routePoint p3"/></div>
        <div className="globalCopy shell"><p className="sectionLabel light">Regional & global outlook</p><h2>Ethiopia at the center<br/>of <em>opportunity.</em></h2><p>With access through Djibouti and a strategic focus on East Africa and the Middle East, Global Plus is building the partnerships, certification and logistics needed to compete across borders.</p><div className="marketLegend"><span><i className="active"/> Established focus</span><span><i/> Strategic growth market</span></div></div>
      </section>

      <section className="contactSection shell" id="contact"><p className="sectionLabel">Begin a partnership</p><h2>Let&apos;s build the next<br/><em>opportunity together.</em></h2><p>Choose a division, share your objective, and connect with the Global Plus team.</p><a className="goldButton" href="#home">Talk to our team <span>↗</span></a></section>
      <section className="officeSection" id="office">
        <div className="officeDetails"><div><p className="sectionLabel light">Head office · Addis Ababa</p><h2>Come and meet<br/><em>Global Plus.</em></h2></div><div className="officeAddress"><span>Location</span><address>XQVP+W8W, Bole Medhanialem area<br/>Opposite Golden Tulip Hotel<br/>Milkomy City Complex, 3rd floor, Office 310<br/>Woreda 3, Addis Ababa, Ethiopia</address><a href="https://www.google.com/maps/search/?api=1&query=XQVP%2BW8W%2C%20Bole%20Medhanialem%2C%20Addis%20Ababa%2C%20Ethiopia" target="_blank" rel="noreferrer">Open in Google Maps <b>↗</b></a></div></div>
        <div className="officeMap"><iframe title="Global Plus head office in Bole Medhanialem, Addis Ababa" src="https://www.google.com/maps?q=XQVP%2BW8W%2C%20Bole%20Medhanialem%2C%20Addis%20Ababa%2C%20Ethiopia&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="mapCorner"><span>Global Plus</span><b>Head office</b></div></div>
      </section>
      <footer className="newFooter"><div className="shell footerGrid"><Image src="/global-plus-logo-dark.png" alt="Global Plus Business Group" width={220} height={147}/><p>Diversified expertise.<br/>One global vision.</p><div><b>Explore</b><a href="#about">About</a><a href="#ecosystem">Ecosystem</a><a href="#businesses">Businesses</a><a href="#roadmap">Vision 2031</a></div><div><b>Connect</b><a href="#contact">Contact</a><a href="#reach">Global reach</a></div><small>© 2026 Global Plus Business Group. All rights reserved.</small></div></footer>
    </main>
  );
}
