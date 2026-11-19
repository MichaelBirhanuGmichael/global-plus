"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import TireCard from "@/components/tire-card";
import { roads, type Road, type TirePattern } from "@/data/tires";

type Filter = "all" | Road;
const order: Road[] = ["off", "mix", "on"];

/* Tabs filter one flat grid (All, Off road, Mix road, On road). The category page also offers a search by size or pattern. */
export default function TireBrowser({ patterns, showSearch = false }: { patterns: TirePattern[]; showSearch?: boolean }) {
  const [road, setRoad] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase().replace(/\s+/g, "");
  const shown = useMemo(
    () =>
      patterns.filter((p) => {
        if (road !== "all" && p.road !== road) return false;
        if (!q) return true;
        return p.name.toLowerCase().includes(q) || p.sizes.some((s) => s.size.toLowerCase().includes(q));
      }),
    [patterns, road, q],
  );

  const tabs: { key: Filter; label: string }[] = [{ key: "all", label: "All" }, ...order.map((r) => ({ key: r as Filter, label: roads[r].label }))];

  return (
    <div className="prBrowser">
      <div className="prBrowserBar">
        <div className="prTabs" role="tablist" aria-label="Road type">
          {tabs.map((t) => (
            <button key={t.key} type="button" role="tab" aria-selected={road === t.key} className={road === t.key ? "isActive" : undefined} onClick={() => setRoad(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
        {showSearch ? (
          <label className="prSearch">
            <span className="prSrOnly">Search by size or pattern</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search size or pattern, e.g. 315/80R22.5" />
          </label>
        ) : null}
      </div>

      {shown.length === 0 ? (
        <div className="prEmpty">
          <p>No pattern matches that search.</p>
          <p>
            Tell us the size and the vehicle and we will check what is available: <Link href="/contact?product=EFFIPLUS%20TBR%20tires">send an inquiry</Link>.
          </p>
        </div>
      ) : (
        <ul className="prGrid">
          {shown.map((p) => (
            <li key={p.slug}>
              <TireCard pattern={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
