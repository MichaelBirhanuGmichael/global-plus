import Image from "next/image";
import Link from "next/link";
import { roads, sizeList, type TirePattern } from "@/data/tires";

/* A product tile: the tire on a soft stage, its name and sizes underneath, and one link. Used on the products, home and business pages. */
export default function TireCard({ pattern: p }: { pattern: TirePattern }) {
  const sizes = sizeList(p);
  const shown = sizes.slice(0, 3);
  const rest = sizes.length - shown.length;

  return (
    <Link href={`/products/tires/${p.slug}`} className="tc" aria-label={`${p.name}, ${roads[p.road].label} tire. View specifications`}>
      <div className="tcStage">
        <span className={`tcTag tcTag-${p.road}`}>
          <i aria-hidden="true" />
          {roads[p.road].label}
        </span>
        {p.image ? (
          <Image src={p.image} alt={`EFFIPLUS ${p.name} tire`} fill sizes="(max-width: 560px) 90vw, (max-width: 1020px) 45vw, 22vw" />
        ) : (
          <span className="tcNoPhoto">Photo coming soon</span>
        )}
      </div>
      <div className="tcBody">
        <h3>{p.name}</h3>
        <p className="tcSizes">
          {shown.join("  ·  ")}
          {rest > 0 ? <em>{`  +${rest} more`}</em> : null}
        </p>
        <div className="tcFoot">
          <span>View specifications</span>
          <b aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </b>
        </div>
      </div>
    </Link>
  );
}
