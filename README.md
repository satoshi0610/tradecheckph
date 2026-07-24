# TradeCheckPH — site source

Astro (v5) static site. Content lives as Markdown in `src/content/guides/` — new articles from the content calendar (`01_content_calendar.md`) are added by dropping a new `.md` file there with the same frontmatter shape (see `src/content/config.ts` for the schema).

## Status (2026-07-25)

Live at **https://tradecheckph.norihiro-y-6.workers.dev** (Cloudflare Workers static assets, auto-deploys on push to `main` via Cloudflare Workers Builds). Custom domain `tradecheckph.com` is registered as the target but not yet purchased/connected — see `05_infrastructure_setup.md`.

7 guide articles are published, plus `/tools/broker-checklist/`, `robots.txt`, and a build-time-generated `sitemap.xml`. The code uses the current Astro 5 **Content Layer API** (`glob()` loader, `render()` imported from `astro:content`) rather than the legacy `type: 'content'` / `entry.render()` pattern, which Astro 5 deprecated.

Remaining Phase 2/3 articles are tracked in `01_content_calendar.md`.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build      # outputs to ./dist
npm run preview    # serve the production build locally
```

## Deploying to Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to Git → select the repo.
3. Build settings: **Framework preset: Astro**, build command `npm run build`, output directory `dist`.
4. After the first deploy, go to the project's Custom Domains tab and add `tradecheckph.com` (once the domain is registered via Cloudflare Registrar, this is a same-account connection — no external DNS steps needed).

## Site structure

- `/` — homepage, lists latest guides
- `/guides/` — all guides (regulation, scam-awareness, broker basics)
- `/guides/[slug]/` — individual article, rendered from `src/content/guides/*.md`
- `/tools/broker-checklist/` — rule-based diagnostic tool (client-side JS, no backend)
- `/broker-reviews/`, `/prop-firms/` — placeholder pages until reviews are live-tested (per the no-hallucination content policy: no invented spread/fee numbers)

## Adding a new article

1. Add a new `.md` file to `src/content/guides/` with frontmatter matching the schema in `src/content/config.ts` (`title`, `description`, `category`, `lastVerified`, `sources`, `draft`).
2. It will automatically appear on `/guides/` and get its own page at `/guides/<filename-without-extension>/` — no other code changes needed.
