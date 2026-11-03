"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Play the intro once per browser session (not on every return to the homepage)
    try {
      if (sessionStorage.getItem("ma_intro_seen")) {
        onDone();
        return;
      }
      sessionStorage.setItem("ma_intro_seen", "1");
    } catch {
      /* storage unavailable: just play it */
    }
    const obj = { v: 0 };
    const tl = gsap.timeline();
    tl.to(obj, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.v)),
    })
      .to(root.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
        delay: 0.15,
      })
      .call(() => onDone());

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-5 sm:px-8 sm:py-7"
    >
      <div className="mono-label text-paper-dim">Muhammad Abdullah — Portfolio</div>
      <div className="flex items-end justify-between">
        <span className="mono-label text-muted">Loading experience</span>
        <span
          ref={countRef}
          className="display text-paper text-[18vw] leading-none sm:text-[12vw]"
        >
          {count.toString().padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
