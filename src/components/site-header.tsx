"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services, technology } from "@/data/technology";

/* The one header for every page: slim, translucent, with Businesses and Products flyouts and a full-screen menu on phones. */

const businesses = [
  { href: "/businesses/manufacturing", label: "Manufacturing & Industrial", text: "Metal works, electrical manufacturing, cement and construction materials" },
  { href: "/businesses/trading", label: "Trading & Distribution", text: "ICT, electronics, electrical equipment, tires and supply networks" },
  { href: "/businesses/construction", label: "Construction & Infrastructure", text: "Buildings, roads, waterworks and project delivery" },
  { href: "/businesses/agribusiness", label: "Export & Agribusiness", text: "Coffee, oilseeds, pulses, spices and certified exports" },
  { href: "/businesses/minerals", label: "Minerals & Resources", text: "Precious and industrial minerals, responsibly sourced" },
  { href: "/businesses/technology", label: "Technology", text: "Fleet software, digital platforms, GPS devices and business systems" },
] as const;

const productGroups = [
  {
    title: "Truck and bus tires",
    href: "/products/tires",
    note: "Exclusive official EFFIPLUS dealer in Ethiopia",
    items: [
      ["On road", "/products/tires"],
      ["Mix road", "/products/tires?road=mix"],
      ["Off road", "/products/tires?road=off"],
    ],
    sub: null,
  },
  {
    title: "Technology",
    href: "/products/technology",
    note: null,
    items: technology.map((t) => [t.title, `/products/technology#${t.slug}`]),
    sub: {
      title: "Software development",
      href: "/products/technology#development",
      items: services.map((t) => [t.title, `/products/technology#${t.slug}`]),
    },
  },
] as const;

const links = [
  { href: "/news", label: "News", match: "/news" },
  { href: "/#about", label: "About", match: "" },
  { href: "/jobs", label: "Careers", match: "/jobs" },
  { href: "/contact", label: "Contact", match: "/contact" },
] as const;

type Fly = "biz" | "prod" | null;

export default function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [fly, setFly] = useState<Fly>(null);
  const [raised, setRaised] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const [acc, setAcc] = useState<"biz" | "prod" | null>(null); // which group is open in the phone menu

  // close menus when the page changes (state adjusted during render, not in an effect)
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(false);
    setFly(null);
    setAcc(null);
  }

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    if (!fly) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setFly(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFly(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [fly]);

  const onBusiness = pathname.startsWith("/businesses");
  const onProducts = pathname.startsWith("/products");
  const current = (match: string) => (match ? pathname.startsWith(match) : false);
  const toggle = (id: Exclude<Fly, null>) => setFly((v) => (v === id ? null : id));

  return (
    <header className={`gpHeader ${raised ? "isRaised" : ""}`}>
      <div className="gpBar">
        <Link href="/" className="gpBrand" aria-label="Global Plus Business Group, home">
          <Image src="/global-plus-mark.png" alt="" width={56} height={44} priority />
          <span className="gpBrandText">
            <b>
              GLOBAL <i>PLUS</i>
            </b>
            <small>Business Group</small>
          </span>
        </Link>

        <nav className="gpNav" aria-label="Main" ref={navRef}>
          {/* Businesses */}
          <div className={`gpFly ${fly === "biz" ? "isOpen" : ""}`} onMouseEnter={() => setFly("biz")} onMouseLeave={() => setFly(null)}>
            <button type="button" className={onBusiness ? "isCurrent" : undefined} aria-expanded={fly === "biz"} aria-haspopup="true" onClick={() => toggle("biz")}>
              Businesses <span className="gpCaret" aria-hidden="true" />
            </button>
            <div className="gpPanel" role="menu">
              <div className="gpPanelGrid">
                {businesses.map((b) => (
                  <Link key={b.href} href={b.href} role="menuitem" aria-current={pathname === b.href ? "page" : undefined} onClick={() => setFly(null)}>
                    <strong>{b.label}</strong>
                    <span>{b.text}</span>
                  </Link>
                ))}
              </div>
              <Link href="/#businesses" className="gpPanelAll" role="menuitem" onClick={() => setFly(null)}>
                See all businesses
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className={`gpFly ${fly === "prod" ? "isOpen" : ""}`} onMouseEnter={() => setFly("prod")} onMouseLeave={() => setFly(null)}>
            <button type="button" className={onProducts ? "isCurrent" : undefined} aria-expanded={fly === "prod"} aria-haspopup="true" onClick={() => toggle("prod")}>
              Products <span className="gpCaret" aria-hidden="true" />
            </button>
            <div className="gpPanel gpPanelProducts" role="menu">
              <div className="gpPanelCols">
                {productGroups.map((g) => (
                  <div className="gpPanelGroup" key={g.title}>
                    <Link href={g.href} className="gpGroupTitle" role="menuitem" onClick={() => setFly(null)}>
                      {g.title}
                    </Link>
                    <ul>
                      {g.items.map(([label, href]) => (
                        <li key={href}>
                          <Link href={href} role="menuitem" onClick={() => setFly(null)}>
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {g.sub ? (
                      <>
                        <Link href={g.sub.href} className="gpGroupSub" role="menuitem" onClick={() => setFly(null)}>
                          {g.sub.title}
                        </Link>
                        <ul>
                          {g.sub.items.map(([label, href]) => (
                            <li key={href}>
                              <Link href={href} role="menuitem" onClick={() => setFly(null)}>
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                    {g.note ? <p className="gpGroupNote">{g.note}</p> : null}
                  </div>
                ))}
              </div>
              <Link href="/products" className="gpPanelAll" role="menuitem" onClick={() => setFly(null)}>
                View all products
              </Link>
            </div>
          </div>

          {links.map((l) => (
            <Link key={l.label} href={l.href} className={current(l.match) ? "isCurrent" : undefined} aria-current={current(l.match) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="gpCta">
          Get in touch
        </Link>

        <button type="button" className="gpBurger" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
          <span />
          <span />
        </button>
      </div>

      <div className={`gpSheet ${menu ? "isOpen" : ""}`} aria-hidden={!menu}>
        <nav aria-label="Mobile">
          <div className={`gpAcc ${acc === "biz" ? "isOpen" : ""}`}>
            <button type="button" aria-expanded={acc === "biz"} onClick={() => setAcc((v) => (v === "biz" ? null : "biz"))} tabIndex={menu ? 0 : -1}>
              Businesses <span className="gpCaret" aria-hidden="true" />
            </button>
            <div className="gpAccBody">
              {businesses.map((b) => (
                <Link key={b.href} href={b.href} tabIndex={menu && acc === "biz" ? 0 : -1}>
                  {b.label}
                </Link>
              ))}
              <Link href="/#businesses" className="gpAccAll" tabIndex={menu && acc === "biz" ? 0 : -1}>
                See all businesses
              </Link>
            </div>
          </div>

          <div className={`gpAcc ${acc === "prod" ? "isOpen" : ""}`}>
            <button type="button" aria-expanded={acc === "prod"} onClick={() => setAcc((v) => (v === "prod" ? null : "prod"))} tabIndex={menu ? 0 : -1}>
              Products <span className="gpCaret" aria-hidden="true" />
            </button>
            <div className="gpAccBody">
              {productGroups.map((g) => (
                <div key={g.href} className="gpAccGroup">
                  <Link href={g.href} className="gpAccTitle" tabIndex={menu && acc === "prod" ? 0 : -1}>
                    {g.title}
                  </Link>
                  {g.items.map(([label, href]) => (
                    <Link key={href} href={href} tabIndex={menu && acc === "prod" ? 0 : -1}>
                      {label}
                    </Link>
                  ))}
                  {g.sub ? (
                    <>
                      <Link href={g.sub.href} className="gpAccTitle" tabIndex={menu && acc === "prod" ? 0 : -1}>
                        {g.sub.title}
                      </Link>
                      {g.sub.items.map(([label, href]) => (
                        <Link key={href} href={href} tabIndex={menu && acc === "prod" ? 0 : -1}>
                          {label}
                        </Link>
                      ))}
                    </>
                  ) : null}
                </div>
              ))}
              <Link href="/products" className="gpAccAll" tabIndex={menu && acc === "prod" ? 0 : -1}>
                View all products
              </Link>
            </div>
          </div>

          {links.map((l) => (
            <Link key={l.label} href={l.href} className="gpSheetLink" tabIndex={menu ? 0 : -1}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="gpSheetCta" tabIndex={menu ? 0 : -1}>
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
