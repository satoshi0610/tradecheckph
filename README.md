# TradeCheckPH — site source

Astro (v5) static site. Content lives as Markdown in `src/content/guides/` — new articles from the content calendar (`01_content_calendar.md`) are added by dropping a new `.md` file there with the same frontmatter shape (see `src/content/config.ts` for the schema).

## Status

`npm install` and `npm run build` have been run successfully end-to-end (Astro 5, Node build completed with no errors, all 8 pages generated: home, guides index, 3 guide articles, tools/broker-checklist, and the broker-reviews/prop-firms placeholders). The code uses the current Astro 5 **Content Layer API** (`glob()` loader, `render()` imported from `astro:content`) rather than the legacy `type: 'content'` / `entry.render()` pattern, which Astro 5 deprecated.

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
