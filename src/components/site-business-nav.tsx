"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const divisions = [
  { href: "/businesses/manufacturing", label: "Manufacturing & Industrial", n: "01" },
  { href: "/businesses/trading", label: "Trading & Distribution", n: "02" },
  { href: "/businesses/construction", label: "Construction & Infrastructure", n: "03" },
  { href: "/businesses/agribusiness", label: "Export & Agribusiness", n: "04" },
  { href: "/businesses/minerals", label: "Minerals & Resources", n: "05" },
] as const;

const accents = {
  manufacturing: "#f0a10b",
  trading: "#eea510",
  construction: "#f09a1a",
  agribusiness: "#f1aa16",
  minerals: "#e0a25d",
} as const;

export type BusinessNavAccent = keyof typeof accents;

export default function SiteBusinessNav({ accent }: { accent: BusinessNavAccent }) {
  const pathname = usePathname();
  const [bizOpen, setBizOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bizOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setBizOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBizOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [bizOpen]);

  useEffect(() => {
    setBizOpen(false);
  }, [pathname]);

  return (
    <header className="bizNav" style={{ ["--biz-accent" as string]: accents[accent] }}>
      <div className="bizNavBar">
        <Link href="/" className="bizNavBrand" aria-label="Global Plus home">
          <Image src="/global-plus-logo-dark.png" alt="Global Plus Business Group" width={210} height={140} />
        </Link>

        <div className={`bizNavDropdown ${bizOpen ? "open" : ""}`} ref={menuRef}>
          <button
            type="button"
            className="bizNavDropdownTrigger"
            aria-expanded={bizOpen}
            aria-haspopup="true"
            onClick={() => setBizOpen((value) => !value)}
          >
            Businesses <span className="navCaret" aria-hidden="true" />
          </button>
          <div className="bizNavDropdownMenu" role="menu">
            <Link href="/#businesses" role="menuitem" onClick={() => setBizOpen(false)}>
              All businesses
            </Link>
            {divisions.map((division) => {
              const active = pathname === division.href;
              return (
                <Link
                  key={division.href}
                  href={division.href}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  className={active ? "isActive" : undefined}
                  onClick={() => setBizOpen(false)}
                >
                  <b>{division.n}</b>
                  <span>{division.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
