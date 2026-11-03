"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Stroke = { x: number; y: number }[];

const STORAGE_KEY = "ma_signature_count";

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  if (stroke.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(stroke[0].x, stroke[0].y);
  for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y);
  ctx.stroke();
}

export default function SignatureWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const drawing = useRef(false);
  const current = useRef<Stroke>([]);
  const strokes = useRef<Stroke[]>([]);
  const [count, setCount] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Restore saved count (per viewer)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Read after mount (not in a lazy initializer) so SSR and hydration match.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setCount(parseInt(saved, 10) || 0);
    } catch {
      /* ignore */
    }
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#c7d92e";
    for (const stroke of strokes.current) drawStroke(ctx, stroke);
    drawStroke(ctx, current.current);
  }, []);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = section.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  }, [redraw]);

  useEffect(() => {
    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, [setup]);

  const pos = (e: PointerEvent) => {
    const section = sectionRef.current!;
    const rect = section.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e: React.PointerEvent) => {
    drawing.current = true;
    current.current = [pos(e.nativeEvent)];
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    current.current.push(pos(e.nativeEvent));
    redraw();
  };

  const commit = () => {
    if (!drawing.current) return;
    drawing.current = false;
    if (current.current.length > 1) {
      strokes.current.push(current.current);
      if (!hasDrawn) {
        setHasDrawn(true);
        setCount((c) => {
          const next = c + 1;
          try {
            localStorage.setItem(STORAGE_KEY, String(next));
          } catch {
            /* ignore */
          }
          return next;
        });
      }
    }
    current.current = [];
    redraw();
  };

  const clear = () => {
    strokes.current = [];
    current.current = [];
    redraw();
  };

  return (
    <section
      ref={sectionRef}
      id="sign"
      className="relative z-10 min-h-[80vh] touch-none overflow-hidden border-t border-line select-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={commit}
      onPointerLeave={commit}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Overlay content (click-through so drawing works everywhere) */}
      <div className="pointer-events-none relative z-10 flex min-h-[80vh] flex-col justify-between px-5 pb-5 pt-20 sm:px-8 sm:pb-8 sm:pt-24">
        <div className="flex items-start justify-between">
          <div>
            <p className="mono-label text-muted">
              {count} {count === 1 ? "signature" : "signatures"} on the wall
            </p>
            <span className="display mt-2 block text-[22vw] leading-none text-faint sm:text-[16vw]">
              {count.toString().padStart(3, "0")}
            </span>
          </div>
          <button
            onClick={clear}
            className="mono-label pointer-events-auto border border-line px-3 py-2 text-muted transition-colors hover:border-acid hover:text-acid"
          >
            Clear
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="display text-[13vw] leading-none text-paper sm:text-[9vw]">
            Signatures
          </h2>
          <p className="mono-label text-acid">
            {hasDrawn ? "Thanks for signing ✦" : "Draw anywhere to sign"}
          </p>
        </div>

        <div aria-hidden className="h-6" />
      </div>
    </section>
  );
}
