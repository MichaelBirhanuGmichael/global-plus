import Image from "next/image";
import Link from "next/link";
import HeroSlides, { type HeroSlide } from "@/components/hero-slides";
import PartnershipBand from "@/components/partnership-band";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import TireCard from "@/components/tire-card";
import { TechIcon } from "@/components/tech-icon";
import { technology } from "@/data/technology";
import { DEALER_LINE, getPattern, roads } from "@/data/tires";

const businesses = [
  {
    n: "01",
    title: "Manufacturing & Industrial",
    text: "Metal works, electrical manufacturing, cement, concrete and construction materials.",
    href: "/businesses/manufacturing",
    image: "/ethiopia-manufacturing-welding.jpg",
    alt: "Industrial welding operations in Ethiopia",
  },
  {
    n: "02",
    title: "Trading & Distribution",
    text: "ICT, electronics, electrical equipment, tires, stationery and office supply networks.",
    href: "/businesses/trading",
    image: "/ethiopia-trade-modjo.jpg",
    alt: "Modjo Dry Port logistics hub in Ethiopia",
  },
  {
    n: "03",
    title: "Construction & Infrastructure",
    text: "Buildings, roads, waterworks, engineering and project delivery.",
    href: "/businesses/construction",
    image: "/ethiopia-construction-addis.jpg",
    alt: "Construction on a landmark Addis Ababa project",
  },
  {
    n: "04",
    title: "Export & Agribusiness",
    text: "Premium coffee and tea, oilseeds, pulses, cereals, spices and certified agricultural exports.",
    href: "/businesses/agribusiness",
    image: "/ethiopia-coffee-sidama.jpg",
    alt: "Coffee processing in Sidama, Ethiopia",
  },
  {
    n: "05",
    title: "Minerals & Resources",
    text: "Precious and semi-precious minerals, metallic and industrial minerals, with certification and responsible sourcing.",
    href: "/businesses/minerals",
    image: "/minerals-hero.webp",
    alt: "Copper and malachite mineral specimen",
  },
  {
    n: "06",
    title: "Technology",
    text: "Fleet management, digital platforms, GPS trackers and dash cams, and ERP and business systems.",
    href: "/businesses/technology",
    image: "/stock-trading-logistics.jpg",
    alt: "Container vehicles moving through a port yard",
  },
];

const strengths = [
  ["Manufacturing", "Industrial capability and product innovation."],
  ["Trading", "Connected procurement and distribution."],
  ["Exports", "Global markets, logistics and certification."],
  ["Construction", "Infrastructure that advances communities."],
  ["Finance", "Investment enablement and shared strength."],
  ["Sustainability", "Responsible growth and regional impact."],
];

const roadmap = [
  ["Now", "Integrated operations", "Five business clusters supported by shared finance, people, technology, legal and quality systems."],
  ["Next", "Cement export readiness", "Developing efficient grinding, certification and logistics capabilities for regional demand."],
  ["Future", "Mining and regional leadership", "Expanding exploration, beneficiation and responsible partnerships across strategic minerals."],
];

const featured = ["am4s-q689", "am4s-m628", "moby-r802", "folo-r199-plus"]
  .map((slug) => getPattern(slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const heroSlides: HeroSlide[] = [
  { src: "/products/tires/hero-on.jpg", alt: "A truck driving on a highway at sunset", label: "Trading · EFFIPLUS truck and bus tires", href: "/products/tires", position: "62% 72%" },
  { src: "/agri-coffee-roast-hd.png", alt: "Roasted coffee beans in a burlap sack", label: "Export & Agribusiness · Ethiopian coffee", href: "/businesses/agribusiness", position: "40% 45%" },
  { src: "/stock-construction.jpg", alt: "Workers on a construction site laying reinforcement", label: "Construction & Infrastructure", href: "/businesses/construction", position: "50% 50%" },
  { src: "/minerals-hero.webp", alt: "A malachite and copper mineral specimen", label: "Minerals & Resources", href: "/businesses/minerals", position: "50% 45%" },
  { src: "/ethiopia-manufacturing-welding.jpg", alt: "Welders working on steel in a factory", label: "Manufacturing & Industrial", href: "/businesses/manufacturing", position: "50% 40%" },
];

export default function Home() {
  return (
    <main className="hm">
      <SiteHeader />

      {/* 1. Hero */}
      <section className="hmHero">
        <HeroSlides slides={heroSlides} />
        <div className="hmHeroShade" />
        <div className="hmShell hmHeroCopy">
          <p className="hmEyebrow">Global Plus Business Group · Addis Ababa</p>
          <h1>Building, trading and exporting from Ethiopia.</h1>
          <p className="hmLead">One group across manufacturing, trade, construction, agribusiness and minerals, connecting Ethiopia to its regional and global markets.</p>
          <div className="hmActions">
            <Link className="hmBtn" href="#businesses">
              Explore our businesses
            </Link>
            <Link className="hmBtnGhost" href="/products">
              View products
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Facts */}
      <section className="hmFacts" aria-label="Global Plus at a glance">
        <dl className="hmShell">
          <div>
            <dt>5</dt>
            <dd>Business divisions</dd>
          </div>
          <div>
            <dt>Addis Ababa</dt>
            <dd>Head office, Bole</dd>
          </div>
          <div>
            <dt>Djibouti</dt>
            <dd>Sea access for import and export</dd>
          </div>
          <div>
            <dt>EFFIPLUS</dt>
            <dd>Exclusive tire dealer in Ethiopia</dd>
          </div>
        </dl>
      </section>

      {/* 3. Businesses */}
      <section className="hmSection" id="businesses">
        <div className="hmShell">
          <header className="hmHead">
            <p className="hmEyebrow dark">Our businesses</p>
            <h2>Distinct expertise. One group.</h2>
            <p>Each division works with specialist focus and shared strength, which gives our customers efficiency, scale and integrated delivery.</p>
          </header>
          <ul className="hmBiz">
            {businesses.map((b) => (
              <li key={b.n}>
                <Link href={b.href} className="hmBizCard">
                  <div className="hmBizImg">
                    <Image src={b.image} alt={b.alt} fill sizes="(max-width: 800px) 100vw, 33vw" />
                  </div>
                  <div className="hmBizBody">
                    <span>{b.n}</span>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                    <em>Explore</em>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Products */}
      <section className="hmSection hmTint" id="products">
        <div className="hmShell">
          <header className="hmHead hmHeadRow">
            <div>
              <p className="hmEyebrow dark">Products</p>
              <h2>What we supply.</h2>
            </div>
            <Link className="hmLink" href="/products">
              All products
            </Link>
          </header>

          <div className="hmDealer">
            <div className="hmDealerCopy">
              <p className="hmEyebrow">Exclusive dealership</p>
              <h3>EFFIPLUS truck and bus tires</h3>
              <p>{DEALER_LINE}. Radial tires for tippers, trucks and buses, supplied under the manufacturer&apos;s warranty policy.</p>
              <div className="hmActions">
                <Link className="hmBtn" href="/products/tires">
                  Browse the range
                </Link>
                <Link className="hmBtnGhost" href="/contact?product=EFFIPLUS%20TBR%20tires">
                  Request a quote
                </Link>
              </div>
            </div>
            <ul className="hmRoads">
              {(["on", "mix", "off"] as const).map((r) => (
                <li key={r}>
                  <Link href={r === "on" ? "/products/tires" : `/products/tires?road=${r}`}>
                    <strong>{roads[r].label}</strong>
                    <span>{roads[r].short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="hmTires">
            {featured.map((p) => (
              <li key={p.slug}>
                <TireCard pattern={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PartnershipBand />

      {/* Technology teaser */}
      <section className="ttSection" id="technology">
        <div className="hmShell ttGrid">
          <div className="ttCopy">
            <p className="ttEyebrow">Technology</p>
            <h2>Technology for moving and running business.</h2>
            <p>Fleet management, digital ticketing, GPS devices and business systems, built for transport and business in Ethiopia.</p>
            <Link className="hmBtn" href="/businesses/technology">
              Explore technology
            </Link>
          </div>
          <ul className="ttList">
            {technology.map((t) => (
              <li key={t.slug}>
                <Link href={`/products/technology#${t.slug}`}>
                  <span className="tkIcon">
                    <TechIcon name={t.icon} />
                  </span>
                  <div>
                    <b>{t.title}</b>
                    <span>{t.short}</span>
                  </div>
                  <small>{t.status}</small>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/businesses/technology#build">
                <span className="tkIcon">
                  <TechIcon name="web" />
                </span>
                <div>
                  <b>Web and mobile app development</b>
                  <span>Custom software, built by our own engineers.</span>
                </div>
                <small>Available</small>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Shared strength */}
      <section className="hmSection" id="about">
        <div className="hmShell">
          <header className="hmHead">
            <p className="hmEyebrow dark">One group</p>
            <h2>Six capabilities that strengthen each other.</h2>
            <p>Capital enables production, infrastructure expands access, trade connects supply, and responsible export creates lasting regional value.</p>
          </header>
          <ul className="hmStrengths">
            {strengths.map(([t, d], i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Roadmap */}
      <section className="hmSection hmDark" id="roadmap">
        <div className="hmShell">
          <header className="hmHead">
            <p className="hmEyebrow">Strategic roadmap</p>
            <h2>The next chapter.</h2>
            <p>Our feasibility program turns ambition into a phased path, from stronger integrated operations to export-scale industrial leadership.</p>
          </header>
          <ol className="hmSteps">
            {roadmap.map(([when, title, text]) => (
              <li key={title}>
                <span>{when}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Reach */}
      <section className="hmSection" id="reach">
        <div className="hmShell hmSplit">
          <div className="hmSplitCopy">
            <p className="hmEyebrow dark">Regional and global outlook</p>
            <h2>Ethiopia at the center of opportunity.</h2>
            <p>With access through Djibouti and a strategic focus on East Africa and the Middle East, Global Plus is building the partnerships, certification and logistics needed to compete across borders.</p>
            <Link className="hmLink" href="/contact">
              Talk to our team
            </Link>
          </div>
          <div className="hmSplitImg">
            <Image src="/ethiopia-trade-port.jpg" alt="Container operations at Ethiopia's Modjo Dry Port" fill sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* 8. Contact */}
      <section className="hmCta" id="contact">
        <div className="hmShell">
          <h2>Let&apos;s build the next opportunity together.</h2>
          <p>Tell us what you need to source, supply, build or export, and our team will follow up.</p>
          <Link className="hmBtn" href="/contact">
            Get in touch
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
