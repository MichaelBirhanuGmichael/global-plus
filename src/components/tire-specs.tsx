"use client";

import Link from "next/link";
import { useState } from "react";
import type { TireSize } from "@/data/tires";

/* Size picker plus the specifications of the chosen size. The quote button carries the size to the inquiry form. */
export default function TireSpecs({ name, sizes }: { name: string; sizes: TireSize[] }) {
  const [i, setI] = useState(0);
  const s = sizes[i];
  const fmt = (n: number) => n.toLocaleString("en-US");
  const quote = `/contact?product=${encodeURIComponent(`EFFIPLUS ${name} ${s.size} ${s.pr}`)}`;

  const big: [string, string, string?][] = [
    ["Ply rating", s.pr],
    ["Load / speed", s.li],
    ["Tread depth", s.tread, "mm"],
    ["Pressure", s.bar, "bar"],
  ];
  const rows: [string, string][] = [
    ["Construction", s.type === "TL" ? "Tubeless" : "Tube type"],
    ["Load capacity, single", `${fmt(s.single)} kg`],
    ["Load capacity, dual", `${fmt(s.dual)} kg`],
  ];

  return (
    <div className="pdSpecs">
      {sizes.length > 1 ? (
        <div className="pdSizes" role="tablist" aria-label="Choose a size">
          {sizes.map((x, idx) => (
            <button key={`${x.size}-${x.pr}`} type="button" role="tab" aria-selected={idx === i} className={idx === i ? "isActive" : undefined} onClick={() => setI(idx)}>
              {x.size}
              <small>{x.pr}</small>
            </button>
          ))}
        </div>
      ) : null}

      <div className="pdSpecCard">
        <div className="pdSpecHead">
          <div>
            <p>Size</p>
            <h3>{s.size}</h3>
          </div>
          <Link href={quote} className="pdBtn">
            Request a quote for this size
          </Link>
        </div>
        <dl className="pdBig">
          {big.map(([k, v, u]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>
                {v}
                {u ? <small>{u}</small> : null}
              </dd>
            </div>
          ))}
        </dl>
        <dl className="pdRows">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
