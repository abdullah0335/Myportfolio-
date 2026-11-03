import Link from "next/link";
import { PROFILE } from "@/lib/content";

const LINKS = [
  { label: "Work", href: "/#work", internal: true, desktopOnly: true },
  { label: "Skills", href: "/#skills", internal: true, desktopOnly: true },
  { label: "Résumé", href: PROFILE.links.resume, internal: false, desktopOnly: false },
  { label: "GitHub", href: PROFILE.links.github, internal: false, desktopOnly: false },
  { label: "LinkedIn", href: PROFILE.links.linkedin, internal: false, desktopOnly: false },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav
        aria-label="Main"
        className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5"
      >
        <Link href="/" className="mono-label text-paper" data-cursor>
          M·Abdullah
        </Link>
        <ul className="flex items-center gap-4 sm:gap-7">
          {LINKS.map((l) => (
            <li key={l.label} className={l.desktopOnly ? "hidden sm:block" : undefined}>
              {l.internal ? (
                <Link href={l.href} className="mono-label link-sweep text-paper">
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label link-sweep text-paper"
                >
                  {l.label}
                  <span aria-hidden className="ml-0.5 align-super text-[0.6em]">
                    ↗
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
