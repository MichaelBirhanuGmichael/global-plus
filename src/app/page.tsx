"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import SiteFooter from "@/components/site-footer";

const divisions = [
  { n: "01", title: "Manufacturing & Industrial", text: "Metal works, electrical manufacturing, cement, concrete and construction materials.", tone: "blue", href: "/businesses/manufacturing", images: [
    { src: "/ethiopia-manufacturing-welding.jpg", alt: "Industrial welding operations in Ethiopia" },
    { src: "/ethiopia-manufacturing-hawassa.jpg", alt: "Ethiopian technicians at Hawassa Industrial Park" },
    { src: "/ethiopia-manufacturing-workers.jpg", alt: "Ethiopian manufacturing team on an active production floor" },
  ] },
  { n: "02", title: "Trading & Distribution", text: "ICT, electronics, electrical equipment, stationery, paper and office supply networks.", tone: "gold", href: "/businesses/trading", images: [
    { src: "/ethiopia-trade-modjo.jpg", alt: "Modjo Dry Port logistics hub in Ethiopia" },
    { src: "/ethiopia-trade-port.jpg", alt: "Container operations at Ethiopia's Modjo Dry Port" },
    { src: "/ethiopia-trade-logistics.jpg", alt: "Freight and containers at an Ethiopian inland port" },
  ] },
  { n: "03", title: "Construction & Infrastructure", text: "Buildings, roads, waterworks, engineering, fleet operations and project delivery.", tone: "red", href: "/businesses/construction", images: [
    { src: "/ethiopia-construction-rail.jpg", alt: "Ethiopian infrastructure crew pouring a concrete foundation" },
    { src: "/ethiopia-construction-addis.jpg", alt: "Ethiopian construction professionals on a landmark Addis Ababa project" },
    { src: "/ethiopia-construction-water.jpg", alt: "Community water infrastructure construction in Ethiopia" },
  ] },
  { n: "04", title: "Export & Agribusiness", text: "Premium coffee and tea, oilseeds, pulses, cereals, spices, flowers and certified agricultural exports.", tone: "green", href: "/businesses/agribusiness", images: [
    { src: "/ethiopia-coffee-sidama.jpg", alt: "Ethiopian coffee workers processing cherries in Sidama" },
    { src: "/ethiopia-coffee-yirgacheffe.jpg", alt: "Coffee washing at a station in Yirgacheffe, Ethiopia" },
    { src: "/ethiopia-coffee-daye-bensa.png", alt: "Ethiopian coffee team washing and sorting beans at Daye Bensa" },
  ] },
  { n: "05", title: "Minerals & Resources", text: "Precious and semi-precious minerals, metallic and industrial minerals, certification, responsible sourcing and export logistics.", tone: "mineral", href: "/businesses/minerals", images: [
    { src: "/minerals-hero.webp", alt: "Premium copper and malachite mineral specimen" },
    { src: "/minerals-highland.webp", alt: "Ethiopian highland mineral-bearing rocky terrain" },
    { src: "/minerals-open-pit.webp", alt: "Large-scale open-pit mineral mine in Ethiopia" },
  ] },
];

const roadmap = [
  { phase: "Foundation", label: "Now", title: "Integrated operations", text: "Five strategic clusters supported by shared finance, people, technology, legal and quality systems." },
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
  const [bizOpen, setBizOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [divisionFrame, setDivisionFrame] = useState(0);
  const [divisionSlidesPaused, setDivisionSlidesPaused] = useState(false);
  const [activeDivision, setActiveDivision] = useState(0);
  const divisionTouchStart = useRef<number | null>(null);
  const bizMenuRef = useRef<HTMLDivElement>(null);

  const moveDivision = (direction: number) => setActiveDivision((current) => (current + direction + divisions.length) % divisions.length);
  const closeMenus = () => { setMenuOpen(false); setBizOpen(false); };

  const setHot = (event: PointerEvent<HTMLElement>, on: boolean) => {
    event.currentTarget.classList.toggle("isHot", on);
  };
  const hotHandlers = {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => setHot(event, true),
    onPointerLeave: (event: PointerEvent<HTMLElement>) => setHot(event, false),
    onPointerDown: (event: PointerEvent<HTMLElement>) => setHot(event, true),
    onPointerUp: (event: PointerEvent<HTMLElement>) => setHot(event, false),
    onPointerCancel: (event: PointerEvent<HTMLElement>) => setHot(event, false),
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && !bizOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, bizOpen]);

  useEffect(() => {
    if (!bizOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (bizMenuRef.current && !bizMenuRef.current.contains(event.target as Node)) setBizOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [bizOpen]);

  useEffect(() => {
    if (!menuOpen) setBizOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("isVisible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (divisionSlidesPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setDivisionFrame((frame) => (frame + 1) % 3), 4600);
    return () => window.clearInterval(timer);
  }, [divisionSlidesPaused]);

  useEffect(() => {
    if (divisionSlidesPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveDivision((current) => (current + 1) % divisions.length), 8200);
    return () => window.clearInterval(timer);
  }, [divisionSlidesPaused]);

  return (
    <main>
      <header className={`siteNav ${scrolled ? "isScrolled" : ""} ${menuOpen ? "isMenuOpen" : ""}`}>
        <div className="navInner shell">
          <a className="brand" href="#home" aria-label="Global Plus home" onClick={closeMenus}><Image src="/global-plus-logo-dark.png" alt="Global Plus Business Group" width={270} height={180} priority /></a>
          <nav className={`navlinks ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            <a href="#about" onClick={closeMenus} {...hotHandlers}>About</a>
            <div className={`navDropdown ${bizOpen ? "open" : ""}`} ref={bizMenuRef}>
              <button
                type="button"
                className="navDropdownTrigger"
                aria-expanded={bizOpen}
                aria-haspopup="true"
                onClick={() => setBizOpen((open) => !open)}
                {...hotHandlers}
              >
                Businesses <span className="navCaret" aria-hidden="true" />
              </button>
              <div className="navDropdownMenu" role="menu">
                <a href="#businesses" role="menuitem" onClick={closeMenus} {...hotHandlers}>All businesses</a>
                {divisions.map((division) => (
                  <Link key={division.n} href={division.href} role="menuitem" onClick={closeMenus} {...hotHandlers}>
                    {division.title}
                  </Link>
                ))}
              </div>
            </div>
            <a href="#ecosystem" onClick={closeMenus} {...hotHandlers}>Ecosystem</a>
            <a href="#roadmap" onClick={closeMenus} {...hotHandlers}>Vision 2031</a>
            <a href="#reach" onClick={closeMenus} {...hotHandlers}>Global Reach</a>
            <a href="#contact" onClick={closeMenus} {...hotHandlers}>Contact</a>
            <Link className="navMobileCta" href="/contact" onClick={closeMenus} {...hotHandlers}>Start a conversation <span>↗</span></Link>
          </nav>
          <Link className="navCta" href="/contact">Start a conversation <span>↗</span></Link>
          <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"}><span/><span/><span/></button>
        </div>
      </header>

      <section className="newHero" id="home">
        <Image className="heroImage" src="/stock-trade.jpg" alt="International container port representing Global Plus trade operations" fill sizes="100vw" priority quality={85} />
        <div className="heroShade"/><div className="heroGrid"/>
        <div className="heroCopy shell">
          <p className="kicker"><span/> Ethiopia rooted · Globally connected</p>
          <h1><span>One group.</span><br/><em>Worlds</em> of possibility.</h1>
          <p>Connecting resources, industries and markets through integrated manufacturing, trade, construction and export expertise.</p>
          <div className="heroActions"><a className="goldButton" href="#businesses">Explore our businesses <span>→</span></a><a className="watchLink" href="#roadmap"><i>▶</i> Discover our vision</a></div>
        </div>
        <div className="heroBottom shell"><span>Scroll to explore</span><div className="scrollLine"/></div>
      </section>

      <section className="statement shell reveal" id="about">
        <p className="sectionLabel">Global Plus at a glance</p>
        <div>
          <h2>Built to move<br/>business <em>forward.</em></h2>
          <p className="bigCopy">Our vision is to become the leading ecosystem in East Africa by 2031—integrating a diversified portfolio to create long-term value and regional impact.</p>
          <div className="values"><span>Accountability</span><span>Creativity</span><span>Sustainability</span><span>Excellence</span><span>Cooperation</span><span>Agility</span><span>Customer focus</span></div>
        </div>
      </section>

      <section className="divisionSection reveal" id="businesses">
        <div className="shell divisionIntro">
          <p className="sectionLabel light">Our business ecosystem</p>
          <h2>Distinct expertise.<br/><em>One powerful group.</em></h2>
          <p>Our clusters operate with specialist focus and shared strength—unlocking efficiency, scale and integrated delivery.</p>
        </div>
        <div
          className="divisionCarousel shell"
          role="region"
          aria-label="Global Plus business divisions"
          tabIndex={0}
          onKeyDown={(event) => { if (event.key === "ArrowLeft") moveDivision(-1); if (event.key === "ArrowRight") moveDivision(1); }}
          onTouchStart={(event) => { divisionTouchStart.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => {
            if (divisionTouchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - divisionTouchStart.current;
            if (Math.abs(distance) > 55) moveDivision(distance > 0 ? -1 : 1);
            divisionTouchStart.current = null;
          }}
        >
          <div className="divisionViewport">
            <div className="divisionTrack" style={{ transform: `translate3d(-${activeDivision * 100}%,0,0)` }}>
              {divisions.map((d, divisionIndex) => (
                <article
                  className={`divisionCard ${d.tone}`}
                  key={d.n}
                  aria-hidden={activeDivision !== divisionIndex}
                  onMouseEnter={() => setDivisionSlidesPaused(true)}
                  onMouseLeave={() => setDivisionSlidesPaused(false)}
                  onFocusCapture={() => setDivisionSlidesPaused(true)}
                  onBlurCapture={() => setDivisionSlidesPaused(false)}
                >
                  <div className="divisionSlides" aria-live="off">
                    {d.images.map((photo, index) => (
                      <Image className={`divisionSlide ${divisionFrame === index ? "active" : ""}`} key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 100vw, 50vw"/>
                    ))}
                  </div>
                  <div className="cardShade"/><span className="cardNumber">{d.n}</span>
                  <div className="divisionProgress" aria-label={`${d.title} image controls`}>
                    {d.images.map((photo, index) => (
                      <button className={divisionFrame === index ? "active" : ""} key={photo.src} onClick={() => setDivisionFrame(index)} aria-label={`Show image ${index + 1} of ${d.images.length}`} aria-pressed={divisionFrame === index}><span/></button>
                    ))}
                  </div>
                  <div className="cardContent">
                    <p>Strategic cluster</p>
                    <h3>{d.title}</h3>
                    <span>{d.text}</span>
                    {d.href ? <Link href={d.href}>Explore division ↗</Link> : <a href="#contact">Explore division ↗</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="divisionSideArrows">
            <button className="divisionPrev" onClick={() => moveDivision(-1)} aria-label="Previous division"><span>‹</span></button>
            <button className="divisionNext" onClick={() => moveDivision(1)} aria-label="Next division"><span>›</span></button>
          </div>
          <div className="divisionNav">
            <div className="divisionCount"><b>{String(activeDivision + 1).padStart(2, "0")}</b><span>/ {String(divisions.length).padStart(2, "0")}</span></div>
            <div className="divisionDots">
              {divisions.map((division, index) => (
                <button key={division.n} className={activeDivision === index ? "active" : ""} onClick={() => setActiveDivision(index)} aria-label={`Show ${division.title}`} aria-current={activeDivision === index ? "true" : undefined}><span/></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ecosystemSection reveal" id="ecosystem">
        <div className="shell ecosystemHeader">
          <div><p className="sectionLabel">The Global Plus ecosystem</p><h2>Six capabilities.<br/><em>One growth engine.</em></h2></div>
          <p>Every part of the group strengthens the next. Capital enables production, infrastructure expands access, trade connects supply, and responsible export creates enduring regional value.</p>
        </div>
        <div className="ecosystemStage shell">
          <div className="ecoOrbit ecoOrbitOne"/><div className="ecoOrbit ecoOrbitTwo"/>
          <div className="ecoCore"><span>GLO+</span><b>Ecosystem</b><p>Integrated for impact</p></div>
          {ecosystem.map((item, index) => (
            <article className={`ecoNode ecoNode${index + 1} reveal delay${(index % 3) + 1}`} key={item.key} tabIndex={0}>
              <i>{item.key}</i>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
        <div className="ecosystemPillars shell"><span>Portfolio expansion</span><span>Ecosystem integration</span><span>Market leadership</span><span>Investment enablement</span><span>Operational excellence</span><span>Regional impact</span></div>
      </section>

      <section className="roadmapSection reveal" id="roadmap">
        <div className="roadmapBg"><Image src="/stock-manufacturing-v2.jpg" alt="Industrial metalworking representing Global Plus growth strategy" fill sizes="100vw"/></div>
        <div className="roadmapContent shell">
          <p className="sectionLabel light">Strategic roadmap</p>
          <div className="roadmapHeading">
            <h2>Building the<br/><em>next chapter.</em></h2>
            <p>The group&apos;s feasibility program translates ambition into a phased path—from stronger integrated operations to export-scale industrial leadership.</p>
          </div>
          <div className="timeline">
            {roadmap.map((r, i) => (
              <article className={`reveal delay${i + 1}`} key={r.phase}>
                <span className="timelineDot">{i + 1}</span>
                <p>{r.label} · {r.phase}</p>
                <h3>{r.title}</h3>
                <span>{r.text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="globalSection reveal" id="reach">
        <div className="orbitScene" aria-hidden="true">
          <div className="orbit orbitOne"/><div className="orbit orbitTwo"/>
          <div className="globeDisc"><Image src="/global-plus-logo-light.png" alt="" width={580} height={387}/></div>
          <span className="routePoint p1"/><span className="routePoint p2"/><span className="routePoint p3"/>
        </div>
        <div className="globalCopy shell">
          <p className="sectionLabel">Regional & global outlook</p>
          <h2>Ethiopia at the center<br/>of <em>opportunity.</em></h2>
          <p>With access through Djibouti and a strategic focus on East Africa and the Middle East, Global Plus is building the partnerships, certification and logistics needed to compete across borders.</p>
          <div className="marketLegend"><span><i className="active"/> Established focus</span><span><i/> Strategic growth market</span></div>
        </div>
      </section>

      <section className="contactSection reveal" id="contact">
        <div className="shell">
          <p className="sectionLabel light">Begin a partnership</p>
          <h2>Let&apos;s build the next<br/><em>opportunity together.</em></h2>
          <p>Choose a division, share your objective, and connect with the Global Plus team.</p>
          <Link className="goldButton" href="/contact">Talk to our team <span>↗</span></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
