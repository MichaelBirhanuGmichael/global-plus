import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import TireCard from "@/components/tire-card";
import { getPattern, DEALER_LINE } from "@/data/tires";
import { TechIcon } from "@/components/tech-icon";
import { businesses, techServices, techWork, type Business } from "@/data/businesses";

const featuredTires = ["am4s-q689", "am4s-m628", "moby-r802"].map((s) => getPattern(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

/* One template for all five businesses: hero, capabilities, process with photo, feature with photo, call to action. */
export default function BusinessPage({ biz }: { biz: Business }) {
  const contact = `/contact?division=${encodeURIComponent(biz.division)}`;
  const others = businesses.filter((b) => b.slug !== biz.slug);

  return (
    <main className="bz">
      <SiteHeader />

      {/* Hero */}
      <section className="bzHero">
        <Image src={biz.hero.image} alt={biz.hero.alt} fill priority sizes="100vw" quality={biz.hero.quality ?? 80} className="bzHeroImg" />
        <div className="bzHeroShade" />
        <div className="bzShell bzHeroCopy">
          <p className="bzEyebrow">
            {biz.n} · {biz.name}
          </p>
          <h1>{biz.hero.headline}</h1>
          <ul className="bzChips">
            {biz.hero.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="bzActions">
            <Link className="bzBtn" href={contact}>
              Start a conversation
            </Link>
            <a className="bzBtnGhost" href="#capabilities">
              Explore capabilities
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      {biz.intro ? (
        <section className="bzIntro">
          <div className="bzShell">
            <p className="bzEyebrow dark">{biz.intro.eyebrow}</p>
            <h2>{biz.intro.heading}</h2>
            <p>{biz.intro.text}</p>
          </div>
        </section>
      ) : null}

      {/* Capabilities */}
      <section className="bzSection" id="capabilities">
        <div className="bzShell">
          <header className="bzHead">
            <p className="bzEyebrow dark">Core capabilities</p>
            <h2>{biz.capabilitiesHeading}</h2>
          </header>
          <ul className="bzGrid">
            {biz.capabilities.map(([t, d, href], i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <Link href={href ?? contact}>{href ? "See the product" : "Discuss with our team"}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Build with us (technology) */}
      {biz.build ? (
        <section className="bzSection bzTint" id="build">
          <div className="bzShell">
            <header className="bzHead">
              <p className="bzEyebrow dark">{biz.build.eyebrow}</p>
              <h2>{biz.build.heading}</h2>
              <p className="bzHeadText">{biz.build.text}</p>
            </header>
            <ul className="bzServices">
              {techServices.map((t) => (
                <li key={t.slug} id={t.slug}>
                  <span className="bzSvcIcon">
                    <TechIcon name={t.icon} />
                  </span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                  <ul>
                    {t.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <Link className="bzSvcBtn" href={`/contact?division=Technology&interest=${encodeURIComponent(t.interest)}`}>
                    Start a project
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="bzWorkTitle">Built by Global Plus</h3>
            <ul className="bzWork">
              {techWork.map((w) => (
                <li key={w.title}>
                  <span>{w.tag}</span>
                  <h4>{w.title}</h4>
                  <p>{w.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Products (trading) */}
      {biz.products ? (
        <section className="bzSection bzTint">
          <div className="bzShell">
            <header className="bzHead bzHeadRow">
              <div>
                <p className="bzEyebrow dark">Exclusive dealership</p>
                <h2>EFFIPLUS truck and bus tires.</h2>
              </div>
              <Link className="bzLink" href="/products/tires">
                Browse the full range
              </Link>
            </header>
            <p className="bzLeadDark">{DEALER_LINE}. Radial tires for tippers, trucks and buses, in off-road, mix-road and on-road patterns.</p>
            <ul className="bzTires">
              {featuredTires.map((p) => (
                <li key={p.slug}>
                  <TireCard pattern={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Process */}
      <section className="bzSection bzDark">
        <div className="bzShell bzSplit">
          <div className="bzSplitCopy">
            <p className="bzEyebrow">{biz.process.eyebrow}</p>
            <h2>{biz.process.heading}</h2>
            <p>{biz.process.text}</p>
            <ol className="bzSteps">
              {biz.process.steps.map((s, i) => (
                <li key={s}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <figure className="bzSplitMedia">
            {biz.process.video ? (
              <video autoPlay muted loop playsInline poster={biz.process.image}>
                <source src={biz.process.video} type="video/mp4" />
              </video>
            ) : (
              <Image src={biz.process.image} alt={biz.process.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
            )}
            <figcaption>{biz.process.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* Feature */}
      <section className="bzSection">
        <div className="bzShell bzSplit bzSplitReverse">
          <figure className="bzSplitMedia bzLight">
            <Image src={biz.feature.image} alt={biz.feature.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
          </figure>
          <div className="bzSplitCopy">
            <p className="bzEyebrow dark">{biz.feature.eyebrow}</p>
            <h2>{biz.feature.heading}</h2>
            <p>{biz.feature.text}</p>
            <ul className="bzChecks">
              {biz.feature.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bzCta">
        <div className="bzShell">
          <h2>{biz.cta.heading}</h2>
          <p>{biz.cta.text}</p>
          <Link className="bzBtn" href={contact}>
            Start a conversation
          </Link>
        </div>
      </section>

      {/* Other businesses */}
      <section className="bzOthers" aria-label="Other businesses">
        <div className="bzShell">
          <p>More from Global Plus</p>
          <ul>
            {others.map((b) => (
              <li key={b.slug}>
                <Link href={`/businesses/${b.slug}`}>{b.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
