import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { formatDate, posts } from "@/data/news";

const title = "News | Global Plus Business Group";
const description = "News and announcements from Global Plus Business Group in Addis Ababa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/news" },
  openGraph: { title, description, url: "/news", images: [posts[0].image] },
};

export default function NewsPage() {
  const [latest, ...older] = posts;

  return (
    <main className="nw">
      <SiteHeader />

      <section className="nwHead">
        <div className="nwShell">
          <p className="nwEyebrow">Newsroom</p>
          <h1>News and announcements.</h1>
          <p>Partnerships, products and updates from Global Plus Business Group.</p>
        </div>
      </section>

      <section className="nwShell nwList" aria-label="Latest news">
        {/* Latest */}
        <Link href={`/news/${latest.slug}`} className="nwFeature">
          <div className="nwFeatureImg">
            <Image src={latest.image} alt={latest.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 46vw" style={{ objectPosition: latest.position }} />
          </div>
          <div className="nwFeatureBody">
            <div className="nwMeta">
              <span className="nwTag">{latest.tag}</span>
              <time dateTime={latest.date}>{formatDate(latest.date)}</time>
            </div>
            <h2>{latest.title}</h2>
            <p>{latest.excerpt}</p>
            <span className="nwMore">Read the announcement</span>
          </div>
        </Link>

        {/* Earlier posts */}
        {older.length > 0 ? (
          <>
            <h2 className="nwSub">Earlier</h2>
            <ul className="nwGrid">
              {older.map((p) => (
                <li key={p.slug}>
                  <Link href={`/news/${p.slug}`} className="nwCard">
                    <div className="nwCardImg">
                      <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectPosition: p.position }} />
                    </div>
                    <div className="nwCardBody">
                      <div className="nwMeta">
                        <span className="nwTag">{p.tag}</span>
                        <time dateTime={p.date}>{formatDate(p.date)}</time>
                      </div>
                      <h3>{p.title}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>

      <SiteFooter />
    </main>
  );
}
