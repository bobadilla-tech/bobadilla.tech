# Architecture

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
├── app/                            # Routing ONLY — thin wrappers, no business logic
│   ├── [locale]/                   # i18n-prefixed routes (en, es, pt)
│   │   ├── page.tsx                # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing (dynamic — searchParams filtering)
│   │   │   └── [slug]/page.tsx     # Blog post (force-static + generateStaticParams)
│   │   ├── pricing/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/page.tsx     # Rich layout (8 services) + generic fallback
│   │   │   └── all/[industry]/page.tsx
│   │   ├── tools/page.tsx
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── sign-in/page.tsx
│   │   └── (protected)/messages/page.tsx
│   ├── api/
│   │   ├── contact/route.ts        # DB-backed, email notification
│   │   ├── pricing-estimate/route.ts
│   │   └── auth/[...all]/route.ts  # Better Auth handler
│   ├── globals.css                 # Tailwind v4 @theme design tokens
│   ├── layout.tsx
│   └── sitemap.ts
│
├── features/                       # One feature = one self-contained directory
│   ├── home/
│   │   ├── components/             # Hero, StatsBar, Services, Industries, WhyBobatech, FAQ
│   │   └── index.ts
│   ├── blog/
│   │   ├── components/             # BlogList, BlogPost
│   │   ├── api/queries.ts          # Re-exports from ~/lib/sanity/queries
│   │   └── index.ts
│   ├── services/
│   │   ├── components/             # ServiceHero, ServicePainPoints, … (11) + RichServicePage
│   │   ├── model/                  # types.ts, services.ts (allServices, industryServices)
│   │   ├── api/                    # service-pages.en/es/pt.ts, getServicePage.ts
│   │   └── index.ts
│   ├── pricing/
│   │   ├── components/             # PricingCalculator
│   │   ├── model/                  # types.ts, constants.ts, validation.ts
│   │   ├── lib/                    # utils.ts, utils.test.ts
│   │   └── index.ts
│   ├── leads/
│   │   ├── components/             # ContactForm
│   │   ├── model/                  # contactSchema.ts, contactSchema.test.ts
│   │   ├── api/                    # db.ts, email-notification.ts, logger.ts, contact-email.tsx
│   │   └── index.ts
│   ├── admin/
│   │   ├── components/             # SignOutButton, SignInForm, MessagesView
│   │   └── index.ts
│   └── tools/
│       ├── components/             # ToolsCatalog
│       └── index.ts
│
├── shared/                         # Cross-feature primitives, never imports from features/
│   ├── ui/                         # Button, SectionHeader, ServiceCard, IndustryCard,
│   │   │                           # FAQItem, BrandIcons, carousel, CodeBlock
│   │   └── index.ts
│   ├── components/                 # Navbar, Footer, CTABand (global chrome)
│   │   └── index.ts
│   ├── utils/                      # cn()
│   │   └── index.ts
│   └── lib/
│       └── api/                    # createRouteHandler factory + middleware
│           ├── createRouteHandler.ts
│           ├── middleware/         # withLogging, withAuth, withRateLimit
│           └── index.ts
│
├── db/
│   ├── client.ts                   # Cloudflare D1 client (Drizzle)
│   └── schema.ts
├── i18n/
│   ├── routing.ts                  # next-intl locale config
│   └── request.ts
├── lib/                            # External integrations — never import from features/
│   ├── auth.ts / auth-client.ts    # Better Auth server + client
│   ├── constants.ts                # Cal.com links, social URLs, contact info
│   ├── seo.ts                      # generateMetadata(), BASE_URL, SITE_NAME, KEYWORD_SETS
│   ├── utils.ts
│   ├── server/
│   │   └── api-response.ts         # Standardized API response utilities
│   └── sanity/
│       ├── client.ts               # @sanity/client singleton
│       ├── image.ts                # urlFor() image URL builder
│       ├── queries.ts              # GROQ query functions
│       ├── types.ts                # SanityPost, SanityAuthor
│       └── portable-text.tsx       # PortableText component map
├── env.ts                          # T3 Env — validated environment variables
└── middleware.ts                   # next-intl routing middleware
```

---

## API Endpoints

### File layout

Every endpoint lives in `src/app/api/[endpoint]/`. The `route.ts` file is a thin
orchestrator; all logic lives in feature modules:

```
src/app/api/contact/
├── route.ts          # createRouteHandler({schema, handler}) — ~15 lines
└── (no other files) # logic lives in src/features/leads/api/
```

### `createRouteHandler`

All route handlers are built with the factory from `~/shared/lib/api`:

```typescript
import { createRouteHandler } from "~/shared/lib/api";

export const POST = createRouteHandler({
  schema: contactSchema, // optional Zod schema — infers data type
  successStatus: 201, // optional (default: 200)
  use: [withLogging()], // optional middleware chain
  handler: async ({ data, db, env, request }) => {
    // data is typed from schema; db is the D1 Drizzle instance
    return await insertRecord(db, data);
  },
});
```

**What the factory handles automatically:**

- `getCloudflareContext()` → `env`, `db`
- `request.json()` + `schema.parse()` (skipped for GET/no-schema routes)
- Koa-style middleware chain (`use` array)
- `before` / `after` lifecycle hooks
- Error handling: `ZodError` → 400 with field errors, `Error` → 400, unknown →
  500

**Context type available in `handler` and middleware:**

```typescript
interface RouteContext<TData> {
  request: NextRequest;
  data: TData; // typed from schema via z.infer<TSchema>
  db: DbInstance; // ReturnType<typeof getDb>
  env: CloudflareEnv; // globally ambient — no import needed
}
```

**Middleware signature** (Koa-style onion):

```typescript
type Middleware = (
  ctx: RouteContext,
  next: () => Promise<NextResponse>,
) => Promise<NextResponse>;
```

Built-in middleware factories in `~/shared/lib/api`:

| Factory           | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| `withLogging()`   | Logs `[METHOD] /path — Xms STATUS` after each request      |
| `withAuth()`      | Checks Better Auth session cookie — returns 401 if missing |
| `withRateLimit()` | Placeholder — TODO: implement with Cloudflare KV           |

**GET routes** (no body parsing):

```typescript
export const GET = createRouteHandler({
  handler: async ({ request, db }) => {
    const id = new URL(request.url).searchParams.get("id");
    return await getRecord(db, id);
  },
});
```

### Response format

All endpoints use `~/lib/server/api-response.ts`:

```typescript
// { success: true, message: "...", data: { ... } }
return successResponse(data, "Created", 201);

// { success: false, message: "..." }
return errorResponse("Operation failed");

// { success: false, message: "...", errors: { ... } }
return validationErrorResponse(zodError);
```

---

## Feature-Sliced Design Rules

- `app/` imports from `features/` and `shared/` — never the reverse
- `features/` imports from `shared/` and `lib/` — never from other features
- `shared/` imports from `lib/` only — never from `features/`
- Each feature exposes a public API via its `index.ts` — internal file paths are
  private
- `app/api/*/route.ts` files cannot move — Next.js requires them in `app/api/`

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
category/tag filtering.

### Key files

| File                               | Purpose                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| `src/lib/sanity/client.ts`         | Sanity CDN client (`useCdn: true`)                                                   |
| `src/lib/sanity/queries.ts`        | `getAllPosts`, `getPostBySlug`, `getPostsByCategory`, `getPostsByTag`, `getAllSlugs` |
| `src/lib/sanity/image.ts`          | `urlFor(ref).width(n).url()`                                                         |
| `src/lib/sanity/portable-text.tsx` | `portableTextComponents` for `<PortableText>`                                        |
| `src/lib/sanity/types.ts`          | `SanityPost`, `SanityAuthor`                                                         |
| `src/features/blog/api/queries.ts` | Re-exports all of the above for use inside the feature                               |

### Publishing flow

Write and publish in Studio → trigger a Cloudflare deploy (webhook or manual
`pnpm deploy`) → new build fetches latest posts → static pages regenerated.

---

## Services

The 8 rich service pages (`web-development`, `mobile-app-development`, etc.) are
served dynamically from a single `[slug]/page.tsx` route — no per-service
folders exist. The route checks for rich data first:

```typescript
const richData = getServicePageData(slug, locale);
if (richData) return <RichServicePage data={richData} />;
// else: generic layout for industry-specific slugs
```

`RichServicePage` handles 3 layout variants:

| Variant  | Detection                         | Difference                                      |
| -------- | --------------------------------- | ----------------------------------------------- |
| MVP      | `data.mvpSolutions` present       | Includes Solutions, ForWho, ProcessMVP sections |
| CMS      | `data.slug === "cms-development"` | No EstimateCTA; different section order         |
| Standard | everything else                   | Full layout with optional UrgencyBand           |

Service data lives in `src/features/services/`:

- `model/services.ts` — `allServices`, `industryServices`
- `model/types.ts` — all shared TypeScript types
- `api/service-pages.{en,es,pt}.ts` — localized editorial content
- `api/getServicePage.ts` — `getServicePageData(slug, locale)` lookup

---

## Internationalization (i18n)

**Library:** next-intl · **Locales:** `en` (default), `es`, `pt`

All routes live under `[locale]/`. The middleware in `src/middleware.ts`
redirects un-prefixed URLs to `/en/`.

| Content type                      | Location                                                |
| --------------------------------- | ------------------------------------------------------- |
| UI strings (buttons, labels, nav) | `messages/{en,es,pt}.json`                              |
| Service page editorial content    | `src/features/services/api/service-pages.{en,es,pt}.ts` |
| Blog post content                 | Sanity documents with a `language` field                |

Blog posts currently only exist in `en`. When ES/PT posts are needed, create a
Sanity document with `language: "es"` / `"pt"` and the same `slug.current`, then
update `getPostBySlug` in `src/lib/sanity/queries.ts` to filter by locale.

---

## Design System

Design tokens are defined in `src/app/globals.css` as a Tailwind v4 `@theme`
block. Never use raw Tailwind color utilities (`text-white`, `bg-slate-900`) —
always use brand tokens. See `CLAUDE.md` for the full token table and component
conventions.

---

## Key Files Reference

| File                                       | Purpose                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| `CLAUDE.md`                                | Coding conventions, naming rules, component patterns                     |
| `src/shared/lib/api/createRouteHandler.ts` | Route handler factory — use for all API endpoints                        |
| `src/shared/lib/api/index.ts`              | Barrel: `createRouteHandler`, `withLogging`, `withAuth`, `withRateLimit` |
| `src/lib/server/api-response.ts`           | `successResponse`, `errorResponse`, `validationErrorResponse`            |
| `src/lib/seo.ts`                           | `generateMetadata()`, `BASE_URL`, `SITE_NAME`, `KEYWORD_SETS`            |
| `src/lib/constants.ts`                     | Cal.com links, social URLs, contact info                                 |
| `src/env.ts`                               | T3 Env validated environment variables                                   |
| `src/app/api/contact/route.ts`             | Reference: DB write + email + logging via `createRouteHandler`           |
| `wrangler.jsonc`                           | Cloudflare Workers config (D1 binding, compatibility flags)              |
