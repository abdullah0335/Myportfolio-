"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PROFILE } from "@/lib/content";

export default function Hero({ ready = true }: { ready?: boolean }) {
  const root = useRef<HTMLElement>(null);

  // Play the entrance only once the loader has lifted, so it is actually seen.
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from("[data-stagger]", {
        yPercent: 120,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.09,
        delay: 0.1,
      });
      gsap.from("[data-fade]", {
        opacity: 0,
        y: 18,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.7,
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={root}
      id="top"
      className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 pb-6 pt-24 sm:px-8 sm:pb-10 sm:pt-28"
    >
      {/* Top meta row */}
      <div
        data-fade
        className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5"
      >
        <p className="mono-label max-w-xs text-paper-dim">
          {PROFILE.role} — {PROFILE.location}
        </p>
        <p className="mono-label max-w-xs text-right text-paper-dim sm:text-right">
          {PROFILE.tagline}
        </p>
      </div>

      {/* Giant name */}
      <div className="flex flex-1 flex-col justify-center py-10">
        <h1 className="display text-paper">
          <span className="block overflow-hidden">
            <span data-stagger className="block text-[12.2vw] leading-[0.82]">
              Muhammad
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-stagger
              className="block text-[12.2vw] leading-[0.82] text-acid"
            >
              Abdullah
            </span>
          </span>
        </h1>
        <p
          data-fade
          className="mt-8 max-w-md font-body text-base leading-relaxed text-paper-dim sm:text-lg"
        >
          {PROFILE.blurb}
        </p>
      </div>

      {/* Open to work banner */}
      <a
        href={`mailto:${PROFILE.email}`}
        data-fade
        data-cursor
        className="group flex flex-wrap items-center justify-between gap-3 border border-line bg-ink-soft/60 px-5 py-4 backdrop-blur-sm transition-colors hover:border-acid"
      >
        <span className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-acid" />
          </span>
          <span className="mono-label text-paper">Available</span>
          <span className="mono-label hidden text-muted sm:inline">
            — Remote roles, contracts &amp; projects
          </span>
        </span>
        <span className="mono-label text-paper transition-colors group-hover:text-acid">
          {PROFILE.email} ↗
        </span>
      </a>

      {/* Scroll cue */}
      <div
        data-fade
        className="mono-label mt-5 flex items-center justify-center gap-2 text-muted"
      >
        <span className="blink">▼</span> Scroll
      </div>
    </section>
  );
}
