import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getProject } from "@/lib/content";
import { getShots } from "@/lib/shots";
import { BrowserFrame, PhoneFrame } from "@/components/work/Frames";
import ScrollShowcase from "@/components/work/ScrollShowcase";
import Footer from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const hero = getShots(slug).hero;
  return {
    title: `${p.name} case study`,
    description: p.overview ?? p.summary,
    openGraph: {
      title: `${p.name} — case study by Muhammad Abdullah`,
      description: p.overview ?? p.summary,
      images: hero ? [{ url: hero.src, width: hero.width, height: hero.height }] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const shots = getShots(slug);
  const related = p.related ? getProject(p.related) : undefined;
  const steps = (shots.steps ?? []).map((shot, i) => ({ shot, caption: p.flow?.[i] }));
  const pos = CASE_STUDIES.findIndex((c) => c.slug === slug);
  const prev = CASE_STUDIES[(pos - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];
  const next = CASE_STUDIES[(pos + 1) % CASE_STUDIES.length];

  const meta: { label: string; value: string }[] = [
    { label: "Industry", value: p.category },
    ...(p.region ? [{ label: "Region", value: p.region }] : []),
    ...(p.platform ? [{ label: "Platform", value: p.platform.join(" · ") }] : []),
    ...(p.engagement
      ? [
          {
            label: "Role",
            value: `${p.engagement.role}, ${p.engagement.company}`,
          },
        ]
      : []),
  ];

  return (
    <main className="relative z-10">
      {/* Header */}
      <header className="px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
        <div className="mb-10 flex items-center justify-between border-b border-line pb-5">
          <Link href="/#work" className="mono-label link-sweep text-paper-dim">
            ← All work
          </Link>
          <span className="mono-label text-muted">
            Case study {String(pos + 1).padStart(2, "0")} /{" "}
            {String(CASE_STUDIES.length).padStart(2, "0")}
          </span>
        </div>

        <p className="mono-label text-acid">{p.eyebrow ?? p.domain}</p>
        <h1 className="display mt-3 text-[15vw] text-paper sm:text-[10vw]">{p.name}</h1>
        <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-paper-dim sm:text-xl">
          {p.overview ?? p.summary}
        </p>

        <div className="mt-10 grid gap-8 border-t border-line pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="mono-label text-muted">{m.label}</dt>
                <dd className="mt-1.5 font-body text-paper">{m.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label rounded-full bg-acid px-5 py-3 text-ink transition-opacity hover:opacity-85"
            >
              Visit {p.domain} ↗
            </a>
            {related && (
              <Link
                href={`/work/${related.slug}`}
                className="mono-label rounded-full border border-line px-5 py-3 text-paper transition-colors hover:border-acid hover:text-acid"
              >
                {p.kind === "plugin" ? `Live on ${related.name}` : `Built with the ${related.name}`} →
              </Link>
            )}
            {p.extraLinks?.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label rounded-full border border-line px-5 py-3 text-paper transition-colors hover:border-acid hover:text-acid"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Hero screenshot */}
      {shots.hero && (
        <div className="px-5 sm:px-8">
          <BrowserFrame domain={p.domain}>
            <Image
              src={shots.hero.src}
              width={shots.hero.width}
              height={shots.hero.height}
              alt={`${p.name} homepage`}
              priority
              sizes="(min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
              className="block h-auto w-full"
            />
          </BrowserFrame>
        </div>
      )}

      {/* Brief + build */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        {p.brief && (
          <div className="grid gap-4 border-t border-line pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <h2 className="mono-label text-muted">The brief</h2>
            <p className="font-display text-[7vw] font-extrabold uppercase leading-[0.98] tracking-tight text-paper sm:text-[4.4vw] lg:text-[3vw]">
              {p.brief}
            </p>
          </div>
        )}

        {p.features && (
          <div className="mt-20 grid gap-4 border-t border-line pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <h2 className="mono-label text-muted">What I built</h2>
            <ul>
              {p.features.map((f) => (
                <li
                  key={f.title}
                  className="grid gap-2 border-b border-line py-5 first:pt-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-8"
                >
                  <h3 className="font-body text-lg font-semibold text-paper">{f.title}</h3>
                  <p className="font-body leading-relaxed text-paper-dim">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Step-by-step flow (e.g. the booking wizard), in order */}
      {steps.length > 0 && (
        <section aria-labelledby="flow-title" className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mb-10 grid gap-4 border-t border-line pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <h2 id="flow-title" className="mono-label text-muted">
              Step by step
            </h2>
            <p className="font-body text-lg leading-relaxed text-paper-dim">
              The {steps.length}-step flow as it runs on {p.domain}.
            </p>
          </div>
          <ol className="grid items-start gap-10 md:grid-cols-3 md:gap-6">
            {steps.map(({ shot, caption }, i) => (
              <li key={shot.src}>
                <p className="mono-label text-acid">
                  Step {i + 1} of {steps.length}
                </p>
                {caption && (
                  <>
                    <h3 className="mt-2 font-body text-lg font-semibold text-paper">
                      {caption.title}
                    </h3>
                    <p className="mt-1 min-h-[3.25rem] font-body text-sm leading-relaxed text-paper-dim">
                      {caption.body}
                    </p>
                  </>
                )}
                <div className="mt-4 overflow-hidden rounded-xl border border-line">
                  <Image
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt={`${p.name}, step ${i + 1}${caption ? `: ${caption.title}` : ""}`}
                    sizes="(min-width: 768px) 32vw, 92vw"
                    className="block h-auto w-full"
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Scroll-through of the full homepage */}
      {shots.full && (
        <ScrollShowcase name={p.name} domain={p.domain} full={shots.full} mobile={shots.mobile} />
      )}

      {/* Mobile view: on its own when there is no showcase, else only on small screens */}
      {shots.mobile && (
        <div className={`mx-auto max-w-[280px] px-5 pb-16 ${shots.full ? "lg:hidden" : ""}`}>
          <p className="mono-label mb-4 text-muted">On mobile</p>
          <PhoneFrame shot={shots.mobile} alt={`${p.name} on a phone`} />
        </div>
      )}

      {/* Prev / next */}
      <nav
        aria-label="More case studies"
        className="grid border-t border-line sm:grid-cols-2"
      >
        <Link
          href={`/work/${prev.slug}`}
          className="group border-b border-line px-5 py-10 sm:border-b-0 sm:border-r sm:px-8"
        >
          <span className="mono-label text-muted">← Previous</span>
          <span className="display mt-3 block text-[9vw] text-paper transition-colors group-hover:text-acid sm:text-[4vw]">
            {prev.name}
          </span>
        </Link>
        <Link href={`/work/${next.slug}`} className="group px-5 py-10 text-right sm:px-8">
          <span className="mono-label text-muted">Next →</span>
          <span className="display mt-3 block text-[9vw] text-paper transition-colors group-hover:text-acid sm:text-[4vw]">
            {next.name}
          </span>
        </Link>
      </nav>

      <Footer />
    </main>
  );
}
