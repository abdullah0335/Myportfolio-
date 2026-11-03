"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getShots } from "@/lib/shots";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CATEGORIES,
  COUNTRIES,
  PROFILE,
  PROJECTS,
  type Category,
} from "@/lib/content";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", ...CATEGORIES];

const countFor = (f: Filter) =>
  f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length;

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  // Heading reveal (once)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-heading]", {
        scrollTrigger: { trigger: "[data-heading]", start: "top 90%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Row reveal — re-runs when the filter changes so the new list animates in
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-row]", { opacity: 0, y: 40 });
      ScrollTrigger.batch("[data-row]", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
          }),
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [filter]);

  return (
    <section
      ref={root}
      id="work"
      className="relative z-10 border-t border-line px-5 py-20 sm:px-8 sm:py-28"
    >
      {/* Section heading */}
      <div data-heading className="mb-10 border-b border-line pb-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display text-[11vw] leading-none text-paper sm:text-[7vw]">
            Selected Work
          </h2>
          <span className="mono-label whitespace-nowrap text-acid">
            ({PROJECTS.length.toString().padStart(2, "0")})
          </span>
        </div>
        <p className="mono-label mt-5 text-muted">
          {PROJECTS.length} featured of 250+ shipped · {COUNTRIES} countries · {CATEGORIES.length} industries
        </p>
      </div>

      {/* Filters */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-8 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const on = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`mono-label rounded-full border px-4 py-2 transition-colors ${
                on
                  ? "border-acid bg-acid text-ink"
                  : "border-line text-paper-dim hover:border-paper-dim hover:text-paper"
              }`}
            >
              {f} <span className={on ? "text-ink/60" : "text-muted"}>{countFor(f)}</span>
            </button>
          );
        })}
      </div>

      {/* Numbered rows */}
      <ul className="border-t border-line">
        {visible.map((p) => {
          const offline = p.status === "offline";
          const { thumb: small, hero } = getShots(p.slug);
          const thumb = small ?? hero;
          return (
            <li
              key={p.index}
              data-row
              data-cursor
              // Offline rows have no link inside, so the row itself takes focus
              tabIndex={offline ? 0 : undefined}
              className="group border-b border-line outline-none"
            >
              <div className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 py-5 sm:grid-cols-[3rem_1fr_14rem_2rem] sm:gap-6 sm:py-7">
                <span className="mono-label text-muted transition-colors group-hover:text-acid group-focus-within:text-acid">
                  {p.index}
                </span>
                <h3 className="display text-[8.5vw] leading-none text-paper transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-acid group-focus-within:text-acid sm:text-[4.2vw]">
                  {offline ? (
                    p.name
                  ) : (
                    <Link href={`/work/${p.slug}`} className="outline-none">
                      {p.name}
                    </Link>
                  )}
                </h3>
                <span className="mono-label hidden text-muted sm:block">
                  {p.category}
                </span>
                <span
                  aria-hidden
                  className="mono-label text-right text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid"
                >
                  {offline ? "—" : "↗"}
                </span>
              </div>

              {/* Expanding detail */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="grid gap-5 pb-7 sm:grid-cols-[3rem_15rem_1.2fr_1fr] sm:gap-6">
                    <span aria-hidden className="hidden sm:block" />
                    {thumb && !offline ? (
                      <Link
                        href={`/work/${p.slug}`}
                        tabIndex={-1}
                        aria-hidden
                        className="block overflow-hidden rounded-md border border-line"
                      >
                        <Image
                          src={thumb.src}
                          width={thumb.width}
                          height={thumb.height}
                          alt=""
                          sizes="(min-width: 640px) 240px, 90vw"
                          className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </Link>
                    ) : (
                      <span aria-hidden className="hidden sm:block" />
                    )}
                    <div>
                      <span className="mono-label mb-2 block text-muted">
                        {p.domain}
                        {p.region ? ` · ${p.region}` : ""}
                      </span>
                      <p className="max-w-xl font-body text-sm leading-relaxed text-paper-dim sm:text-base">
                        {p.summary}
                      </p>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-4 sm:items-end">
                      <ul className="flex flex-wrap gap-2 sm:justify-end">
                        <li className="mono-label rounded-full border border-line px-3 py-1 text-paper-dim sm:hidden">
                          {p.category}
                        </li>
                        {p.platform?.map((s) => (
                          <li
                            key={s}
                            className="mono-label rounded-full border border-line px-3 py-1 text-paper-dim"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                      {offline ? (
                        <span className="mono-label text-muted">Currently offline</span>
                      ) : (
                        <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
                          <Link
                            href={`/work/${p.slug}`}
                            className="mono-label link-sweep text-acid"
                          >
                            Read case study →
                          </Link>
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono-label link-sweep text-paper-dim"
                          >
                            Visit site ↗
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer note */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="mono-label text-muted">Have a project in mind?</p>
        <a href={`mailto:${PROFILE.email}`} className="mono-label link-sweep text-paper">
          Start a conversation ↗
        </a>
      </div>
    </section>
  );
}
