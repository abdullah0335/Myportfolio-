import { EXPERIENCE, LANGUAGES, SKILL_GROUPS } from "@/lib/content";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative z-10 border-t border-line px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-16">
        {/* Heading column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mono-label text-acid">Full-stack web development</p>
          <h2
            id="skills-title"
            className="display mt-4 text-[17vw] leading-none text-paper sm:text-[11vw] lg:text-[7vw]"
          >
            Skills
          </h2>
          <p className="mt-6 max-w-sm font-body leading-relaxed text-paper-dim">
            From WordPress and Shopify builds to custom React and Node apps — and
            AI-assisted workflows that ship them faster.
          </p>
        </div>

        {/* Skill groups */}
        <div>
          {SKILL_GROUPS.map((g) => (
            <div key={g.group} className="border-t border-line py-6 first:border-t-0 first:pt-0">
              <h3 className="mono-label mb-3 text-muted">{g.group}</h3>
              <ul>
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className="group flex flex-col gap-1 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="font-display text-[7.5vw] font-extrabold uppercase leading-[0.95] tracking-tight text-paper transition-colors group-hover:text-acid sm:text-[4vw] lg:text-[2.6vw]">
                      {s.name}
                    </span>
                    {s.note && (
                      <span className="mono-label max-w-[18rem] text-paper-dim sm:text-right">
                        {s.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Languages + experience */}
          <div className="mt-6 grid gap-10 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <h3 className="mono-label mb-4 text-muted">Languages</h3>
              <dl className="divide-y divide-line border-y border-line">
                {LANGUAGES.map((l) => (
                  <div key={l.name} className="flex items-baseline justify-between py-3">
                    <dt className="font-body text-lg text-paper">{l.name}</dt>
                    <dd className="mono-label text-paper-dim">{l.level ?? ""}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="mono-label mb-4 text-muted">Experience</h3>
              <ol className="border-l border-line">
                {EXPERIENCE.map((e) => (
                  <li key={e.company} className="relative pb-6 pl-5 last:pb-0">
                    <span
                      aria-hidden
                      className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-acid"
                    />
                    <p className="mono-label text-muted">{e.period}</p>
                    <p className="mt-1 font-body text-paper">
                      {e.role} <span className="text-paper-dim">· {e.company}</span>
                    </p>
                    {e.detail && (
                      <p className="mt-1 font-body text-sm leading-relaxed text-paper-dim">
                        {e.detail}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
