# Muhammad Abdullah — Portfolio

Personal portfolio of Muhammad Abdullah, Lead Web Developer.
Live at **https://abdullah0335.github.io/Myportfolio-/**

Built with Next.js 16 (static export), Tailwind CSS v4, GSAP and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000/Myportfolio-/ (the site is served under the GitHub Pages
project path, set as `basePath` in `next.config.ts` and `SITE_URL` in `lib/site.ts`).

## Where things live

| What | File |
| --- | --- |
| Profile, projects, case study copy, skills, experience | `lib/content.ts` |
| Case study page template | `app/work/[slug]/page.tsx` |
| Project screenshots | `public/work/<slug>-{hero,full,mobile,thumb}.jpg` |
| Résumé (source → PDF) | `resume/resume.html` → `public/Muhammad_Abdullah_CV.pdf` |

### Update the résumé

Edit `resume/resume.html`, then (Windows, needs Chrome):

```powershell
powershell -File resume/build.ps1
```

### Update screenshots

After replacing images in `public/work/`:

```bash
python scripts/make-thumbs.py
node scripts/build-shots.mjs
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages via
`.github/workflows/deploy.yml`.
