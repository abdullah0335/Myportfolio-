"use client";

import { PROFILE } from "@/lib/content";

const MARQUEE = [
  "WordPress",
  "Shopify",
  "React.js",
  "Node.js",
  "Django",
  "React Native",
  "AI bots",
  "Custom plugins",
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative z-10 border-t border-line">
      {/* Marquee band */}
      <div className="overflow-hidden border-b border-line py-4">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {MARQUEE.map((m) => (
                <span key={m} className="mono-label flex items-center text-muted">
                  <span className="px-6">{m}</span>
                  <span className="text-acid">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Big CTA */}
      <div className="px-5 py-20 sm:px-8 sm:py-28">
        <p className="mono-label text-muted">Have something in mind?</p>
        <a
          href={`mailto:${PROFILE.email}`}
          data-cursor
          className="group mt-4 block"
        >
          <span className="display block text-[13vw] leading-[0.9] text-paper transition-colors group-hover:text-acid sm:text-[9vw]">
            Let&apos;s talk ↗
          </span>
        </a>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-body text-paper-dim">
          <li>
            <a href={`mailto:${PROFILE.email}`} className="link-sweep hover:text-paper">
              {PROFILE.email}
            </a>
          </li>
          <li>
            <a href={PROFILE.phoneHref} className="link-sweep hover:text-paper">
              {PROFILE.phone}
            </a>
          </li>
          <li>
            <a
              href={PROFILE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep hover:text-paper"
            >
              WhatsApp ↗
            </a>
          </li>
        </ul>
      </div>

      {/* Bottom bar */}
      {/* extra right padding keeps the text clear of the floating contact buttons */}
      <div className="flex flex-col gap-4 border-t border-line px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:pl-8 sm:pr-32">
        <span className="mono-label text-muted">
          © {year} {PROFILE.name}
        </span>
        <div className="flex gap-6">
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label link-sweep text-paper-dim"
          >
            GitHub ↗
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label link-sweep text-paper-dim"
          >
            LinkedIn ↗
          </a>
          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label link-sweep text-paper-dim"
          >
            Résumé ↗
          </a>
        </div>
        <span className="mono-label text-muted">Built with Next.js & GSAP</span>
      </div>
    </footer>
  );
}
