import Image from "next/image";
import type { Shot } from "@/lib/shots";

/** Desktop browser chrome around a screenshot, with the real domain in the bar. */
export function BrowserFrame({
  domain,
  children,
  className = "",
}: {
  domain: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-ink-soft shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-faint" />
          <span className="h-2.5 w-2.5 rounded-full bg-faint" />
          <span className="h-2.5 w-2.5 rounded-full bg-faint" />
        </span>
        <span className="mono-label mx-auto truncate rounded-full bg-ink px-4 py-1 text-[0.62rem] text-paper-dim">
          {domain}
        </span>
        <span aria-hidden className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}

/** Rounded phone outline around a mobile screenshot. */
export function PhoneFrame({ shot, alt }: { shot: Shot; alt: string }) {
  return (
    <div className="rounded-[2.2rem] border border-line bg-ink-soft p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="overflow-hidden rounded-[1.7rem]">
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={alt}
          sizes="(min-width: 1024px) 260px, 60vw"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
