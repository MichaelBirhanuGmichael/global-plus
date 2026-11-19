"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import TireCard from "@/components/tire-card";
import { DEALER_LINE, roads, type Road, type TirePattern } from "@/data/tires";

type Filter = Road | "all";

/* The hero photo follows the chosen application (on road is the default); the tabs and the search filter the grid below. */
const heroes: Record<Road, { src: string; alt: string; position: string }> = {
  on: { src: "/products/tires/hero-on.jpg", alt: "A truck driving on a highway at sunset", position: "60% 72%" },
  mix: { src: "/products/tires/hero-mix.jpg", alt: "A tipper truck and trailer at a quarry yard", position: "82% 50%" },
  off: { src: "/products/tires/hero-off.jpg", alt: "A dump truck loaded by an excavator in an open pit", position: "78% 50%" },
};

const order: Filter[] = ["on", "mix", "off", "all"];
const isRoad = (v: string | null): v is Road => v === "on" || v === "mix" || v === "off";

export default function TireExplorer({ patterns, title = "Truck & Bus Tires", showCategories = false }: { patterns: TirePattern[]; title?: string; showCategories?: boolean }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const start = params.get("road");
  const [road, setRoad] = useState<Filter>(isRoad(start) ? start : start === "all" ? "all" : "on");
  const [query, setQuery] = useState("");

  const heroKey: Road = road === "all" ? "on" : road;
  const q = query.trim().toLowerCase().replace(/\s+/g, "");

  const counts = useMemo(
    () => ({
      on: patterns.filter((p) => p.road === "on").length,
      mix: patterns.filter((p) => p.road === "mix").length,
      off: patterns.filter((p) => p.road === "off").length,
      all: patterns.length,
    }),
    [patterns],
  );

  const shown = useMemo(
    () =>
      patterns.filter((p) => {
        if (road !== "all" && p.road !== road) return false;
        if (!q) return true;
        return p.name.toLowerCase().includes(q) || p.sizes.some((s) => s.size.toLowerCase().includes(q));
      }),
    [patterns, road, q],
  );

  const choose = (r: Filter) => {
    setRoad(r);
    window.history.replaceState(null, "", r === "on" ? pathname : `${pathname}?road=${r}`);
  };

  const label = (r: Filter) => (r === "all" ? "All" : roads[r].label);

  return (
    <>
      <section className="txHero">
        {(Object.keys(heroes) as Road[]).map((r) => (
          <Image
            key={r}
            src={heroes[r].src}
            alt={heroes[r].alt}
            fill
            sizes="100vw"
            quality={80}
            priority={r === "on"}
            className={`txHeroImg ${heroKey === r ? "isOn" : ""}`}
            style={{ objectPosition: heroes[r].position }}
          />
        ))}
        <div className="txHeroShade" />
        <div className="txShell txHeroCopy">
          <nav className="txCrumbs" aria-label="Breadcrumb">
            <Link href="/products">Products</Link>
            <span>/</span>
            <span>{showCategories ? "All products" : "Truck and bus tires"}</span>
          </nav>
          <p className="txKicker">EFFIPLUS · {road === "all" ? "Full range" : roads[road].label}</p>
          <h1>{title}</h1>
          <p className="txSub" key={heroKey}>
            {roads[heroKey].use}
          </p>
          <p className="txDealer">{DEALER_LINE}.</p>
        </div>
      </section>

      <div className="txPanelWrap">
        <div className="txShell">
          <div className="txPanel">
            <div className="txTabs" role="tablist" aria-label="Application">
              {order.map((r) => (
                <button key={r} type="button" role="tab" aria-selected={road === r} className={road === r ? "isActive" : undefined} onClick={() => choose(r)}>
                  {label(r)}
                  <small>{counts[r]}</small>
                </button>
              ))}
            </div>
            <label className="txSearch">
              <span className="txSrOnly">Search by size or pattern</span>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a size, e.g. 315/80R22.5" />
            </label>
          </div>
        </div>
      </div>

      {showCategories ? (
        <div className="txShell txCats">
          <span>Categories</span>
          <Link href="/products/tires" className="isCurrent">
            Truck and bus tires
          </Link>
        </div>
      ) : null}

      <section className="txShell txRange" id="range">
        <p className="txCount" aria-live="polite">
          {shown.length} {shown.length === 1 ? "pattern" : "patterns"}
          {road !== "all" ? ` · ${roads[road].short}` : ""}
        </p>
        {shown.length === 0 ? (
          <div className="txEmpty">
            <p>No pattern matches that search.</p>
            <p>
              Tell us the size and the vehicle and we will check what is available: <Link href="/contact?product=EFFIPLUS%20TBR%20tires">send an inquiry</Link>.
            </p>
          </div>
        ) : (
          <ul className="txGrid">
            {shown.map((p) => (
              <li key={p.slug}>
                <TireCard pattern={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
