# Architecture

**Last updated:** 2026-04-09

## System Overview

```
Browser → Cloudflare Edge → Cloudflare Worker (OpenNext)
                                    ├── Static HTML (pre-rendered pages)
                                    ├── Cloudflare D1 (contact form, SQLite)
                                    └── Sanity CDN (blog posts, GROQ at build time)
```

**Runtime constraints:** Cloudflare Workers has no Node.js APIs and no
filesystem access. All content is either pre-bundled or fetched over HTTP. Blog
posts are fetched from Sanity at build time and rendered to static HTML — no
runtime CMS calls.

---

## Directory Structure

```
src/
├── app/
│   ├── [locale]/               # i18n-prefixed routes (en, es, pt)
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing (dynamic — searchParams filtering)
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Blog post (force-static + generateStaticParams)
│   │   ├── pricing/
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/
│   │   │   └── all/[industry]/
│   │   ├── tools/
│   │   │   └── page.tsx        # Tools catalog
│   │   └── layout.tsx
│   ├── api/
│   │   ├── contact/            # Contact form — DB-backed
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   ├── db.ts
│   │   │   ├── email-notification.ts
│   │   │   └── logger.ts
│   │   └── pricing-estimate/   # Pricing estimate endpoint
│   ├── globals.css             # Tailwind v4 @theme design tokens
│   ├── layout.tsx
│   └── sitemap.ts
├── components/
│   ├── sections/               # Page-level sections (Hero, FAQ, Contact, etc.)
│   └── ui/                     # Shared primitives (Button, Navbar, Footer, etc.)
├── data/
│   ├── services.ts             # Services catalog data
│   └── service-pages.*.ts      # Localized service page content (en, es, pt)
├── db/
│   ├── client.ts               # Cloudflare D1 client (Drizzle)
│   └── schema.ts               # Database schema
├── i18n/
│   ├── routing.ts              # next-intl locale config
│   └── request.ts
├── lib/
│   ├── constants.ts            # App-wide links and contact info
│   ├── seo.ts                  # generateMetadata() helper, BASE_URL, SITE_NAME
│   ├── utils.ts
│   ├── server/
│   │   └── api-response.ts     # Standardized API response utilities
│   └── sanity/
│       ├── client.ts           # @sanity/client singleton
│       ├── image.ts            # urlFor() image URL builder
│       ├── queries.ts          # GROQ query functions
│       ├── types.ts            # SanityPost, SanityAuthor interfaces
│       └── portable-text.tsx   # PortableText component map
├── env.ts                      # T3 Env — validated environment variables
└── middleware.ts               # next-intl routing middleware
```

---

## API Endpoints

Every endpoint follows a modular, single-responsibility structure:

```
src/app/api/[endpoint]/
├── route.ts          # Thin orchestrator — parse, validate, delegate, respond
├── validation.ts     # Zod schemas and extraction utilities
├── db.ts             # Database operations (only if needed)
├── [service].ts      # External API integration (only if needed)
└── logger.ts         # Structured logging (only if needed)
```

### Response format

All endpoints use `src/lib/server/api-response.ts`:

```typescript
import {
  errorResponse,
  successResponse,
  validationErrorResponse,
} from "~/lib/server/api-response";

// { success: true, message: "...", data: { ... } }
return successResponse(data, "Created", 201);

// { success: false, message: "..." }
return errorResponse("Operation failed");

// { success: false, message: "...", errors: { ... } }
return validationErrorResponse(zodError);
```

### Route handler pattern

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = mySchema.parse(body);
    const result = await insertRecord(data);
    return successResponse(result, "Success", 201);
  } catch (error) {
    if (error instanceof z.ZodError) return validationErrorResponse(error);
    return errorResponse("Operation failed");
  }
}
```

**Reference implementation:** `src/app/api/contact/` — covers DB writes,
external email service, and logging.

---

## Blog / CMS (Sanity)

**Project:** `5j8mujwd` · **Dataset:** `production` · **Public read** (no token
needed)

**Studio:**
[github.com/UltiRequiem/studio-bobadilla-tech-blogs](https://github.com/UltiRequiem/studio-bobadilla-tech-blogs)

### Data flow

```
Sanity Studio (author publishes)
  → Sanity cloud stores document
    → pnpm build fetches via GROQ
      → generateStaticParams() pre-renders one HTML file per post
        → Cloudflare Worker serves static HTML
```

### Blog post pages — static

`src/app/[locale]/blog/[slug]/page.tsx` has
`export const dynamic = "force-static"` and `generateStaticParams` that calls
`getAllSlugs()`. Every published post becomes a pre-rendered static page at
build time.

### Blog listing page — dynamic

`src/app/[locale]/blog/page.tsx` is dynamic because it reads `searchParams` for
category/tag filtering. It fetches from Sanity on each request (served fast from
Cloudflare's cache).

### Key files

| File                               | Purpose                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| `src/lib/sanity/client.ts`         | Sanity CDN client (`useCdn: true`)                                                   |
| `src/lib/sanity/queries.ts`        | `getAllPosts`, `getPostBySlug`, `getPostsByCategory`, `getPostsByTag`, `getAllSlugs` |
| `src/lib/sanity/image.ts`          | `urlFor(sanityImageRef).width(n).url()`                                              |
| `src/lib/sanity/portable-text.tsx` | `portableTextComponents` map for `<PortableText>`                                    |
| `src/lib/sanity/types.ts`          | `SanityPost`, `SanityAuthor`                                                         |

### Publishing flow

Write and publish in Studio → trigger a Cloudflare deploy (webhook or manual
`pnpm deploy`) → new build fetches latest posts → static pages regenerated.

---

## Internationalization (i18n)

**Library:** next-intl · **Locales:** `en` (default), `es`, `pt`

All routes live under `[locale]/`. The middleware in `src/middleware.ts`
redirects un-prefixed URLs to `/en/`.

| Content type                      | Location                                 |
| --------------------------------- | ---------------------------------------- |
| UI strings (buttons, labels, nav) | `messages/{en,es,pt}.json`               |
| Service page editorial content    | `src/data/service-pages.{en,es,pt}.ts`   |
| Blog post content                 | Sanity documents with a `language` field |

Blog posts currently only exist in `en`. When ES/PT posts are needed, create a
Sanity document with the same `slug.current` and `language: "es"` / `"pt"`, then
update `getPostBySlug` in `src/lib/sanity/queries.ts` to also filter by locale.

---

## Design System

Design tokens are defined in `src/app/globals.css` as a Tailwind v4 `@theme`
block. Never use raw Tailwind color utilities (`text-white`, `bg-slate-900`) —
always use brand tokens. See `CLAUDE.md` for the full token table and component
conventions.

---

## Key Files Reference

| File                             | Purpose                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| `CLAUDE.md`                      | Coding conventions, naming rules, component patterns          |
| `src/lib/server/api-response.ts` | Standardized API responses — required for all endpoints       |
| `src/lib/seo.ts`                 | `generateMetadata()`, `BASE_URL`, `SITE_NAME`, `KEYWORD_SETS` |
| `src/lib/constants.ts`           | Cal.com links, social URLs, contact info                      |
| `src/env.ts`                     | T3 Env validated environment variables                        |
| `src/app/api/contact/`           | Reference implementation for DB-backed endpoints              |
| `wrangler.jsonc`                 | Cloudflare Workers config (D1 binding, compatibility flags)   |
