import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsGallery from "@/components/news-gallery";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { SITE_URL, formatDate, getPost, posts } from "@/data/news";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "News | Global Plus Business Group" };
  const title = `${p.title} | Global Plus Business Group`;
  return {
    title,
    description: p.excerpt,
    alternates: { canonical: `/news/${p.slug}` },
    openGraph: { title, description: p.excerpt, url: `/news/${p.slug}`, type: "article", publishedTime: p.date, images: [p.image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const url = `${SITE_URL}/news/${p.slug}`;
  const enc = encodeURIComponent;
  const share = [
    ["WhatsApp", `https://wa.me/?text=${enc(`${p.title} ${url}`)}`],
    ["Telegram", `https://t.me/share/url?url=${enc(url)}&text=${enc(p.title)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`],
    ["Email", `mailto:?subject=${enc(p.title)}&body=${enc(url)}`],
  ] as const;

  return (
    <main className="nw">
      <SiteHeader />

      <article>
        {/* Headline and article beside the photo */}
        <div className="nwShell nwPost">
          <div className="nwPostMain">
            <nav className="nwCrumbs" aria-label="Breadcrumb">
              <Link href="/news">News</Link>
            </nav>
            <div className="nwMeta">
              <span className="nwTag">{p.tag}</span>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
            </div>
            <h1>{p.title}</h1>
            <p className="nwDeck">{p.excerpt}</p>

            <ul className="nwShare" aria-label="Share this post">
              <li>Share</li>
              {share.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target={label === "Email" ? undefined : "_blank"} rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="nwBody">
              {p.body.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>

          <aside className="nwAside">
            <figure className="nwPhoto">
              <Image src={p.image} alt={p.imageAlt} width={960} height={1280} priority sizes="(max-width: 1000px) 92vw, 420px" />
              <figcaption>Signing the EFFIPLUS dealership agreement.</figcaption>
            </figure>
          </aside>
        </div>

        {/* Photos: an auto-scrolling carousel */}
        {p.gallery?.length ? (
          <section className="nwGallery" aria-label="Photos">
            <div className="nwShell">
              <h2>From the visit</h2>
            </div>
            <NewsGallery slides={p.gallery} label={`Photos: ${p.title}`} />
          </section>
        ) : null}
      </article>

      {/* Call to action */}
      <section className="nwBand">
        <div className="nwShell">
          <h2>Need EFFIPLUS tires for your fleet?</h2>
          <p>Browse the full range by pattern and size, then tell us what you need. We will come back with availability and a price.</p>
          <div className="nwBandActions">
            <Link className="nwBtn" href={p.cta?.href ?? "/products/tires"}>
              {p.cta?.label ?? "Browse the EFFIPLUS range"}
            </Link>
            <Link className="nwBtnGhost" href="/contact?product=EFFIPLUS%20TBR%20tires">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
