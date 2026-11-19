"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string; caption: string; position?: string };

const INTERVAL = 4500;

/* A horizontal photo carousel: scroll-snap track (swipe or drag), auto-advance every few seconds, buttons and dots.
   It pauses while the pointer is over it, while it has focus, while the tab is hidden, and never auto-plays for people who ask for less motion. */
export default function NewsGallery({ slides, label }: { slides: Slide[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const target = el.children[(i + count) % count] as HTMLElement | undefined;
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft - (el.clientWidth - target.clientWidth) / 2, behavior: "smooth" });
  }, [count]);

  // keep the dots in step with whatever slide is centred
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const child = c as HTMLElement;
        const d = Math.abs(child.offsetLeft - el.offsetLeft + child.clientWidth / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // auto-advance
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      goTo(index + 1);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [count, paused, index, goTo]);

  return (
    <div
      className="gc"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setPaused(false), 4000)}
    >
      <ul className="gcTrack" ref={track}>
        {slides.map((s, i) => (
          <li className="gcSlide" key={s.src} aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
            <figure>
              <div className="gcImg">
                <Image src={s.src} alt={s.alt} fill sizes="(max-width: 700px) 92vw, (max-width: 1200px) 80vw, 960px" priority={i === 0} style={{ objectPosition: s.position }} />
              </div>
              <figcaption>{s.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {count > 1 ? (
        <div className="gcBar">
          <div className="gcDots" role="tablist" aria-label="Choose a photo">
            {slides.map((s, i) => (
              <button key={s.src} type="button" role="tab" aria-selected={i === index} aria-label={`Photo ${i + 1}`} className={i === index ? "isActive" : undefined} onClick={() => goTo(i)} />
            ))}
          </div>
          <div className="gcBtns">
            <button type="button" aria-label="Previous photo" onClick={() => goTo(index - 1)}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 3 5 8l5 5" />
              </svg>
            </button>
            <button type="button" aria-label="Next photo" onClick={() => goTo(index + 1)}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 3 5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
