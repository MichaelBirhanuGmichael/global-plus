import Image from "next/image";
import Link from "next/link";
import { DEALER_LINE } from "@/data/tires";
import { posts } from "@/data/news";

/* "Our partnership": the signing photo beside the dealership facts. Shown on the products pages and the homepage. */
export default function PartnershipBand() {
  const post = posts[0];
  return (
    <section className="pbSection" aria-labelledby="pb-title">
      <div className="pbShell pbGrid">
        <figure className="pbPhoto">
          <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 860px) 90vw, 440px" style={{ objectPosition: post.position }} />
          <figcaption>Signing the EFFIPLUS dealership agreement</figcaption>
        </figure>
        <div className="pbCopy">
          <p className="pbEyebrow">Official partnership</p>
          <h2 id="pb-title">Your exclusive EFFIPLUS dealer in Ethiopia.</h2>
          <p className="pbLead">{DEALER_LINE}. Global Plus signed the agreement with Techking, the maker of EFFIPLUS, so every tire we supply comes with the manufacturer&apos;s warranty.</p>
          <dl className="pbFacts">
            <div>
              <dt>Status</dt>
              <dd>Exclusive dealer</dd>
            </div>
            <div>
              <dt>Agreement</dt>
              <dd>2027 to 2029</dd>
            </div>
            <div>
              <dt>Range</dt>
              <dd>30 patterns</dd>
            </div>
          </dl>
          <div className="pbActions">
            <Link className="pbBtn" href="/contact?product=EFFIPLUS%20TBR%20tires">
              Request a quote
            </Link>
            <Link className="pbLink" href={`/news/${post.slug}`}>
              Read the announcement
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
