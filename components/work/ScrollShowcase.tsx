"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Shot } from "@/lib/shots";
import { BrowserFrame, PhoneFrame } from "./Frames";

/**
 * Sticky browser window whose full-page screenshot scrolls as you scroll the
 * case study, so visitors move through the real site. With reduced motion the
 * window becomes a normal scrollable box instead.
 */
export default function ScrollShowcase({
  name,
  domain,
  full,
  mobile,
}: {
  name: string;
  domain: string;
  full: Shot;
  mobile?: Shot;
}) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(img.current, {
        y: () => -Math.max(0, img.current!.offsetHeight - viewport.current!.clientHeight),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      aria-label={`Full-page view of ${domain}`}
      className="relative h-[260vh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-[100svh] items-center px-5 py-20 sm:px-8 motion-reduce:static motion-reduce:h-auto">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <p className="mono-label mb-4 text-muted">
              Keep scrolling — this is the full homepage
            </p>
            <BrowserFrame domain={domain}>
              <div
                ref={viewport}
                className="relative h-[58svh] overflow-hidden motion-reduce:overflow-y-auto"
              >
                <div ref={img} className="will-change-transform">
                  <Image
                    src={full.src}
                    width={full.width}
                    height={full.height}
                    alt={`Full homepage of ${name}`}
                    loading="eager"
                    sizes="(min-width: 1152px) 880px, 92vw"
                    className="block h-auto w-full"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>
            </BrowserFrame>
          </div>
          {mobile && (
            <div className="hidden lg:block">
              <p className="mono-label mb-4 text-muted">On mobile</p>
              <PhoneFrame shot={mobile} alt={`${name} on a phone`} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
