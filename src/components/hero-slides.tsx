"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type HeroSlide = { src: string; alt: string; label: string; href: string; position?: string };

const INTERVAL = 6500;

/* The homepage hero photos: they cross-fade every few seconds, one per business. The headline is not part of this component, so it never moves.
   Auto-play pauses on hover and focus and while the tab is hidden, and is off for visitors who ask for less motion. */
export default function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [count, paused, index]);

  const current = slides[index];

  return (
    <>
      <div className="hsLayers" aria-hidden="true">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            fill
            sizes="100vw"
            quality={80}
            priority={i === 0}
            className={`hsImg ${i === index ? "isOn" : ""}`}
            style={{ objectPosition: s.position }}
          />
        ))}
      </div>

      <div
        className="hsCtl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <Link href={current.href} className="hsCaption" key={current.src}>
          <span>{current.label}</span>
        </Link>
        {count > 1 ? (
        <div className="hsDots" role="tablist" aria-label="Hero photos">
          {slides.map((s, i) => (
            <button key={s.src} type="button" role="tab" aria-selected={i === index} aria-label={`Show ${s.label}`} className={i === index ? "isActive" : undefined} onClick={() => setIndex(i)}>
              <i />
            </button>
          ))}
        </div>
        ) : null}
      </div>
      <p className="hsSr" aria-live="polite">
        {current.alt}
      </p>
    </>
  );
}
