"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight animated starfield drawn to a canvas.
 * Warm-tinted, low-density, drifts slowly. Pauses on reduced motion.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; r: number; a: number; tw: number };
    let stars: Star[] = [];

    function build() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.6 + 0.15,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    let raf = 0;
    let t = 0;
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      t += 0.01;
      for (const s of stars) {
        const flick = reduce ? s.a : s.a * (0.6 + 0.4 * Math.sin(s.tw + t * 2));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(236, 232, 220, ${flick})`;
        ctx!.fill();
        if (!reduce) {
          s.y += 0.015 + s.r * 0.02;
          if (s.y > h) s.y = 0;
        }
      }
      raf = requestAnimationFrame(draw);
    }

    build();
    draw();

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      build();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
