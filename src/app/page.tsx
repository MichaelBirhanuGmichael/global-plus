import Image from "next/image";

const divisions = [
  ["01", "Agro Export", "Coffee, tea, oilseeds, pulses, cereals, spices, fresh produce and floriculture."],
  ["02", "Minerals & Metals", "Precious, semi-precious, metallic and industrial minerals for global markets."],
  ["03", "Construction", "Waterworks, buildings, roads and general contracting delivered with discipline."],
  ["04", "Manufacturing", "Electrical appliances, machinery, metal products, cement and consumer essentials."],
  ["05", "Import & Distribution", "Technology, stationery, chemicals, batteries, plastics and commercial supplies."],
  ["06", "International Trade", "Integrated sourcing, documentation, logistics and domestic trade agency services."],
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <nav className="nav shell">
          <a className="brand" href="#home" aria-label="Global Plus home">
            <Image src="/global-plus-logo.png" alt="Global Plus Business Group" width={270} height={135} priority />
          </a>
          <div className="navlinks">
            <a href="#about">About</a><a href="#businesses">Businesses</a><a href="#reach">Global Reach</a>
          </div>
          <a className="outlineBtn" href="#contact">Start a conversation <span>↗</span></a>
        </nav>

        <div className="heroGlow" />
        <div className="heroContent shell">
          <p className="eyebrow"><span /> Ethiopia rooted. Globally connected.</p>
          <h1>One group.<br /><em>Worlds</em> of possibility.</h1>
          <p className="lede">From the world&apos;s finest origins to ambitious infrastructure, we connect resources, industries and markets to create enduring value.</p>
          <div className="actions"><a className="primaryBtn" href="#businesses">Explore our businesses <span>→</span></a><a className="textBtn" href="#about">Discover our story</a></div>
        </div>
        <div className="heroStats shell">
          <div><b>06</b><span>Strategic divisions</span></div><div><b>25+</b><span>Business capabilities</span></div><div><b>360°</b><span>Integrated expertise</span></div>
          <p>EXPORT · MANUFACTURE · BUILD · IMPORT</p>
        </div>
      </section>

      <section className="intro shell" id="about">
        <p className="sectionTag">Who we are</p>
        <div><h2>Built to move<br />business <em>forward.</em></h2><p>Global Plus Business Group is a diversified Ethiopian enterprise bringing together agriculture, industry, construction and international trade under one ambitious vision.</p></div>
      </section>

      <section className="businesses" id="businesses">
        <div className="shell sectionHead"><div><p className="sectionTag light">Our ecosystem</p><h2>Expertise across<br /><em>essential industries.</em></h2></div><p>Distinct capabilities. One trusted partner. Explore how our divisions work independently—and together—to unlock opportunity.</p></div>
        <div className="divisionGrid shell">
          {divisions.map(([n,title,copy]) => <article key={n}><span className="num">{n}</span><div className="icon">✦</div><h3>{title}</h3><p>{copy}</p><a href="#contact" aria-label={`Learn about ${title}`}>Explore division <span>↗</span></a></article>)}
        </div>
      </section>

      <section className="coffee shell" id="reach">
        <div className="coffeeVisual"><div className="rings"/><div className="bean">✦</div><p>From origin<br />to opportunity</p></div>
        <div className="coffeeCopy"><p className="sectionTag">Signature expertise</p><h2>Ethiopia&apos;s heritage.<br /><em>Prepared for the world.</em></h2><p>We source, wash, hull, roast and prepare exceptional Ethiopian coffee for export—protecting its character at every stage and connecting origin to discerning markets.</p><div className="process"><span>01 Source</span><span>02 Process</span><span>03 Prepare</span><span>04 Export</span></div><a className="darkBtn" href="#contact">Discover our coffee business →</a></div>
      </section>

      <section className="manifesto"><div className="shell"><p className="sectionTag light">Our advantage</p><h2>Local intelligence.<br />Industrial strength.<br /><em>Global ambition.</em></h2><div className="pillars"><div><b>01</b><h3>Integrated capability</h3><p>One group connecting production, trade, logistics and delivery.</p></div><div><b>02</b><h3>Quality without compromise</h3><p>Standards-led thinking across every product and project.</p></div><div><b>03</b><h3>Partnership that performs</h3><p>Long-term relationships built on clarity and execution.</p></div></div></div></section>

      <section className="contact shell" id="contact"><p className="sectionTag">Begin a partnership</p><h2>Let&apos;s build the next<br /><em>opportunity together.</em></h2><a className="primaryBtn" href="mailto:info@globalplusgroup.com">Talk to our team <span>↗</span></a></section>
      <footer><div className="shell"><Image src="/global-plus-logo.png" alt="Global Plus Business Group" width={220} height={110}/><p>Diversified expertise. One global vision.</p><div><a href="#about">About</a><a href="#businesses">Businesses</a><a href="#contact">Contact</a></div><small>© 2026 Global Plus Business Group</small></div></footer>
    </main>
  );
}
