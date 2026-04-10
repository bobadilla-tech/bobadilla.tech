<p align="center">
  <a href="https://bobadilla.tech" target="_blank">
    <img src="public/assets/logo.png" alt="Bobadilla Tech" width="260" />
  </a>
</p>

# Bobadilla Tech

[![Live](https://img.shields.io/badge/Live-bobadilla.tech-gold)](https://bobadilla.tech)
[![Docs](https://img.shields.io/badge/Docs-docs/core-blue)](./docs/core/architecture.md)

## What's bobadilla.tech?

The public website and portfolio for Bobadilla Technologies, a software consultancy. It includes the company landing page, services catalog, pricing, a blog powered by Sanity CMS, and a contact form backed by Cloudflare D1.

The entire site runs at the edge on Cloudflare Workers with zero cold starts and sub-50ms TTFB worldwide.

## Stack

- **Framework** — Next.js 16 App Router (Turbopack)
- **Deployment** — Cloudflare Workers via [OpenNext.js](https://opennext.js.org/)
- **CMS** — [Sanity](https://sanity.io) (blog posts, authors)
- **Database** — Cloudflare D1 (SQLite) + Drizzle ORM
- **Styling** — Tailwind CSS v4 with custom design tokens
- **i18n** — next-intl (en, es, pt)
- **Language** — TypeScript throughout

## Blog (Sanity Studio)

Blog posts are authored in a separate Sanity Studio:
**[github.com/UltiRequiem/studio-bobadilla-tech-blogs](https://github.com/UltiRequiem/studio-bobadilla-tech-blogs)**

Posts are fetched from Sanity at build time and pre-rendered as static HTML. No API key needed — the dataset is public. To publish: write in the Studio, then redeploy this site.

## Docs

- [`docs/core/architecture.md`](./docs/core/architecture.md) — system architecture, API patterns, i18n, Sanity integration
- [`docs/design-plans/`](./docs/design-plans/) — per-feature design records

## Development

```bash
pnpm install
pnpm dev        # Next.js dev server
pnpm build      # Production build (Next.js + OpenNext Cloudflare bundle)
pnpm deploy     # Deploy to Cloudflare Workers
```

See [`CLAUDE.md`](./CLAUDE.md) for conventions, architecture patterns, and contributor guidelines.
