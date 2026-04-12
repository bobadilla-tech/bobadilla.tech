# Feature-Sliced Design Migration

The project currently uses a route-centric layout: business logic lives inside
`app/[locale]/pricing/`, service-page components sit in a flat
`components/sections/service-page/` folder, and data lives in a top-level
`data/` directory. This makes onboarding slow, discourages co-location, and
creates coupling that will block scaling to thousands of SEO pages.

The goal is to migrate to Feature-Sliced Design (FSD): one feature = one
self-contained directory. Every URL, every test, and every existing behavior
must survive unchanged at each step.

---

## Target Structure

```
src/
├── app/                    # routing ONLY — thin wrappers, no business logic
│   ├── [locale]/           # next-intl routes (unchanged)
│   └── api/                # Next.js API route handlers (stay here — required by Next.js)
│
├── features/
│   ├── home/               # Homepage sections
│   ├── blog/               # Sanity-powered blog
│   ├── services/           # Dynamic service pages + data
│   ├── pricing/            # Pricing calculator
│   ├── leads/              # Contact form + lead capture
│   ├── admin/              # Admin dashboard + messages
│   └── tools/              # Tool pages catalog
│
├── shared/
│   ├── ui/                 # Button, SectionHeader, ServiceCard, IndustryCard, FAQItem, BrandIcons, carousel, CodeBlock
│   ├── components/         # Navbar, Footer, CTABand (used on every page)
│   └── utils/              # cn()
│
└── lib/                    # External integrations — unchanged
    ├── sanity/
    ├── server/
    ├── auth.ts / auth-client.ts
    ├── seo.ts
    └── constants.ts
```

### Feature structure (each feature)

```
features/<name>/
├── components/   # UI specific to this feature
├── lib/          # Pure business logic
├── model/        # Types and Zod schemas
├── api/          # Data fetching / server actions (not Next.js route handlers)
└── index.ts      # Public barrel export — the only thing consumers import
```

---

## Core Rules

- `app/` contains only routing and metadata — no business logic, no JSX beyond
  layout composition
- `app/api/*/route.ts` files never move — Next.js requires them under `app/api/`
- `middleware.ts` and `i18n/` never move — i18n routing must stay intact
- If a component is used in multiple features → `shared/`; otherwise it stays in
  its feature
- Each feature exports a single public API via `index.ts`; consumers never
  import sub-paths directly
- `lib/` is for external integrations (Sanity, auth, DB, email) — not for
  feature logic

---

## Migration Phases

Each phase leaves the app fully deployable. The strategy is
**expand-then-contract**: create the new location, leave a re-export stub at the
old path, update the route file, then delete the stub in Phase 6.

---

### Phase 0 — Baseline

1. Verify both `@/*` and `~/*` aliases already resolve to `./src/*` in
   `tsconfig.json` — no changes needed.
2. Create the empty directory skeleton (`src/features/`, `src/shared/`).
3. Run `pnpm vitest run` — all 3 suites must pass before anything moves:
   - `src/app/[locale]/pricing/utils.test.ts`
   - `src/app/api/contact/validation.test.ts`
   - `src/lib/server/api-response.test.ts`

---

### Phase 1 — Shared Layer

Copy each file to its new location, then replace the original with a re-export
stub.

**UI primitives** (`src/components/ui/` → `src/shared/ui/`):

| Original            | Destination                       |
| ------------------- | --------------------------------- |
| `Button.tsx`        | `src/shared/ui/Button.tsx`        |
| `SectionHeader.tsx` | `src/shared/ui/SectionHeader.tsx` |
| `ServiceCard.tsx`   | `src/shared/ui/ServiceCard.tsx`   |
| `IndustryCard.tsx`  | `src/shared/ui/IndustryCard.tsx`  |
| `FAQItem.tsx`       | `src/shared/ui/FAQItem.tsx`       |
| `BrandIcons.tsx`    | `src/shared/ui/BrandIcons.tsx`    |
| `carousel.tsx`      | `src/shared/ui/carousel.tsx`      |
| `CodeBlock.tsx`     | `src/shared/ui/CodeBlock.tsx`     |

**Global chrome** → `src/shared/components/`:

| Original                              | Destination                         |
| ------------------------------------- | ----------------------------------- |
| `src/components/ui/Navbar.tsx`        | `src/shared/components/Navbar.tsx`  |
| `src/components/ui/Footer.tsx`        | `src/shared/components/Footer.tsx`  |
| `src/components/sections/CTABand.tsx` | `src/shared/components/CTABand.tsx` |

**Utilities**:

| Original           | Destination              |
| ------------------ | ------------------------ |
| `src/lib/utils.ts` | `src/shared/utils/cn.ts` |

Stub format (default export example):

```ts
// src/components/ui/Button.tsx
export { default } from "@/shared/ui/Button";
```

Create barrel exports:

- `src/shared/ui/index.ts`
- `src/shared/components/index.ts`
- `src/shared/utils/index.ts`

**Verification**: `pnpm dev`, visit homepage. Run `pnpm vitest run`.

---

### Phase 2 — Feature: `pricing`

Co-locate all pricing logic and fix the duplicate `validation.ts` bug.

**Bug**: `pricing-calculator.tsx:31` imports `validEmail` from
`@/app/pricing/validation` — a legacy root-level file that diverged from the
canonical `src/app/[locale]/pricing/validation.ts`.

**Files to move:**

| Original                                          | Destination                                             |
| ------------------------------------------------- | ------------------------------------------------------- |
| `src/app/[locale]/pricing/types.ts`               | `src/features/pricing/model/types.ts`                   |
| `src/app/[locale]/pricing/constants.ts`           | `src/features/pricing/model/constants.ts`               |
| `src/app/[locale]/pricing/validation.ts`          | `src/features/pricing/model/validation.ts`              |
| `src/app/[locale]/pricing/utils.ts`               | `src/features/pricing/lib/utils.ts`                     |
| `src/app/[locale]/pricing/utils.test.ts`          | `src/features/pricing/lib/utils.test.ts`                |
| `src/app/[locale]/pricing/pricing-calculator.tsx` | `src/features/pricing/components/PricingCalculator.tsx` |

**Delete**: `src/app/pricing/validation.ts` (legacy duplicate).

**Key import fixes in `PricingCalculator.tsx`:**

```ts
import { ANIMATION_CONFIG, PRICING_STEPS } from "@/features/pricing/model/constants";
import type { Selections } from "@/features/pricing/model/types";
import { calculateStepTotal, ... } from "@/features/pricing/lib/utils";
import { validEmail } from "@/features/pricing/model/validation";
```

**`src/features/pricing/index.ts`:**

```ts
export { default as PricingCalculator } from "./components/PricingCalculator";
export type { Selections } from "./model/types";
```

**Update** `src/app/[locale]/pricing/page.tsx`:

```ts
import { PricingCalculator } from "@/features/pricing";
```

Leave stubs at original `constants.ts`, `types.ts`, `utils.ts`, `validation.ts`
paths (delete Phase 6).

**Verification**: `pnpm vitest run` (test now at
`src/features/pricing/lib/utils.test.ts`). Visit `/en/pricing`, submit an
estimate.

---

### Phase 3 — Feature: `leads`

Co-locate the contact form UI and API business logic.

**Files to move:**

| Original                                    | Destination                                      |
| ------------------------------------------- | ------------------------------------------------ |
| `src/components/sections/Contact.tsx`       | `src/features/leads/components/ContactForm.tsx`  |
| `src/app/api/contact/validation.ts`         | `src/features/leads/model/contactSchema.ts`      |
| `src/app/api/contact/validation.test.ts`    | `src/features/leads/model/contactSchema.test.ts` |
| `src/app/api/contact/db.ts`                 | `src/features/leads/api/db.ts`                   |
| `src/app/api/contact/email-notification.ts` | `src/features/leads/api/email-notification.ts`   |
| `src/app/api/contact/logger.ts`             | `src/features/leads/api/logger.ts`               |
| `src/app/api/contact/contact-email.tsx`     | `src/features/leads/api/contact-email.tsx`       |

**`src/app/api/contact/route.ts` stays** — only its imports change:

```ts
import { insertContactMessage } from "@/features/leads/api/db";
import { sendEmailNotification } from "@/features/leads/api/email-notification";
import { logContactSubmission } from "@/features/leads/api/logger";
import { contactSchema } from "@/features/leads/model/contactSchema";
```

**`src/features/leads/index.ts`:**

```ts
export { default as ContactForm } from "./components/ContactForm";
export { contactSchema } from "./model/contactSchema";
```

**Verification**: `pnpm vitest run` (test now at
`src/features/leads/model/contactSchema.test.ts`). Submit the contact form
end-to-end.

---

### Phase 4 — Feature: `services`

Co-locate service data and components; eliminate the 8 hardcoded service page
folders.

#### 4.1 — Data layer

| Original                           | Destination                                                |
| ---------------------------------- | ---------------------------------------------------------- |
| `src/data/services.ts`             | `src/features/services/model/services.ts`                  |
| `src/data/service-pages.shared.ts` | `src/features/services/model/types.ts`                     |
| `src/data/service-pages.en.ts`     | `src/features/services/api/service-pages.en.ts`            |
| `src/data/service-pages.es.ts`     | `src/features/services/api/service-pages.es.ts`            |
| `src/data/service-pages.pt.ts`     | `src/features/services/api/service-pages.pt.ts`            |
| `src/data/service-pages.ts`        | `src/features/services/api/getServicePage.ts` (refactored) |

`getServicePage.ts`:

```ts
import { servicePages as en } from "./service-pages.en";
import { servicePages as es } from "./service-pages.es";
import { servicePages as pt } from "./service-pages.pt";

const byLocale = { en, es, pt } as const;

export function getServicePageData(
  slug: string,
  locale: "en" | "es" | "pt" = "en",
) {
  return byLocale[locale].find((p) => p.slug === slug);
}
```

Leave bridge stubs at all `src/data/*.ts` original paths.

#### 4.2 — Component layer

Move all 11 files from `src/components/sections/service-page/` to
`src/features/services/components/`. Leave bridge re-exports at all original
paths.

#### 4.3 — Eliminate 8 hardcoded service page folders

The 8 folders (`web-development/`, `mobile-app-development/`,
`web-application-development/`, `web-portal-development/`,
`front-end-development/`, `back-end-development/`, `cms-development/`,
`mvp-development/`) each render the rich service layout via
`getServicePageData`. The current `[slug]/page.tsx` uses a completely different
generic layout and does not call `getServicePageData`.

**Strict order:**

1. Upgrade `src/app/[locale]/services/[slug]/page.tsx` — add a rich-data branch:

   ```ts
   const richData = getServicePageData(slug, locale as Locale);
   if (richData) return <RichServicePage data={richData} locale={locale} />;
   // fallback: existing generic layout
   ```

2. Create `src/features/services/components/RichServicePage.tsx` — consolidate
   the shared layout from the 8 hardcoded pages. Handle the MVP variant via
   conditional rendering on `data.mvpSolutions`.

3. Confirm all 8 slugs render correctly via the upgraded `[slug]/page.tsx` in
   the dev server.

4. Delete the 8 hardcoded folders.

**Verification**: All 8 rich service URLs return correct content. `pnpm build`
generates all static params. `/en/sitemap.xml` lists all service paths.

---

### Phase 5 — Features: `home`, `blog`, `admin`, `tools`

**home**: Move `Hero`, `StatsBar`, `Services`, `Industries`, `WhyBobatech`,
`FAQ` → `src/features/home/components/`. Update `app/[locale]/page.tsx` to
import from `@/features/home` and `@/features/leads`.

**blog**: Extract listing JSX → `src/features/blog/components/BlogList.tsx`.
Extract post JSX → `src/features/blog/components/BlogPost.tsx`. Create
`src/features/blog/api/queries.ts` re-exporting from `~/lib/sanity/queries`.
Thin the two blog route files.

**admin**: Move `SignOutButton` → `src/features/admin/components/`. Extract
messages list → `MessagesView.tsx`. Extract sign-in form → `SignInForm.tsx`.
Update route files.

**tools**: Extract tools page body →
`src/features/tools/components/ToolsCatalog.tsx`.

Each feature gets an `index.ts`. Leave stubs at all original component paths.

---

### Phase 6 — Cleanup

Delete all bridge stubs and empty legacy directories.

1. Audit remaining stubs:
   ```
   grep -r "export.*from.*@/features\|export.*from.*@/shared" src/components src/data --include="*.ts" --include="*.tsx"
   ```
2. Update `src/app/sitemap.ts` import → `@/features/services`.
3. Delete stub files, then empty directories: `src/components/`, `src/data/`,
   stubs in `src/app/[locale]/pricing/`.

**Final verification:**

```
pnpm vitest run --coverage
pnpm build
```

Full URL smoke test — every route below must return 200 with correct content:

| URL                                   | What to check                                     |
| ------------------------------------- | ------------------------------------------------- |
| `/en`                                 | Homepage renders all sections                     |
| `/en/pricing`                         | Calculator loads, submit saves estimate           |
| `/en/services`                        | Listing renders                                   |
| `/en/services/web-development`        | Rich layout (pain points, tech stack)             |
| `/en/services/mvp-development`        | MVP variant (ForWho + Solutions sections present) |
| `/en/services/mobile-app-development` | Was hardcoded, now served by `[slug]`             |
| `/en/services/all/healthcare`         | Industry page unaffected                          |
| `/en/blog`                            | Blog listing renders                              |
| `/en/blog/<any-slug>`                 | Post renders with portable text                   |
| `/en/tools`                           | Tools catalog renders                             |
| `/admin/sign-in`                      | Auth form renders                                 |
| `/admin/(protected)/messages`         | Messages list renders (requires session)          |
| `POST /api/contact`                   | Saves to DB + sends email                         |
| `POST /api/pricing-estimate`          | Saves estimate to DB                              |

---

## Safety Rules

| Rule                                                        | Reason                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| Never move `app/api/*/route.ts`                             | Next.js routing requires these under `app/api/`                          |
| Never move `middleware.ts` or `i18n/`                       | i18n routing depends on both                                             |
| Create bridge stubs before deleting originals               | Keeps app deployable across phase boundaries                             |
| Test files move with their subject files                    | Relative imports are preserved by co-location                            |
| Upgrade `[slug]/page.tsx` before deleting hardcoded folders | Phase 4 order is strict — delete only after confirming rich layout works |
