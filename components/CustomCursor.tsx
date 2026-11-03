"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;
    // Touch / coarse pointers keep the native cursor (elements stay hidden via CSS)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("cursor-none");

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let x = rx;
    let y = ry;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate(${x}px, ${y}px)`;
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      r.dataset.active = interactive ? "1" : "0";
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] hidden h-1.5 w-1.5 rounded-full bg-acid pointer-fine:block"
      />
      <div
        ref={ring}
        data-active="0"
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 hidden h-10 w-10 rounded-full pointer-fine:block border border-paper-dim/50 transition-[width,height,margin,border-color] duration-200 data-[active=1]:-ml-8 data-[active=1]:-mt-8 data-[active=1]:h-16 data-[active=1]:w-16 data-[active=1]:border-acid"
      />
    </>
  );
}
