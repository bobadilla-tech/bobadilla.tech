# Project Architecture Guide

This document outlines the architectural patterns and conventions for this Next.js project.

## 📋 Table of Contents

- [Overview](#overview)
- [Design System](#design-system)
- [UI Component Architecture](#ui-component-architecture)
- [API Endpoints Architecture](#api-endpoints-architecture)
- [Tools Architecture](#tools-architecture)
- [Shared Utilities](#shared-utilities)
- [Directory Structure](#directory-structure)
- [Conventions](#conventions)
- [Examples](#examples)

## 🎨 Design System

The site uses a gold-on-dark brand identity. All design tokens are defined in `src/app/globals.css` via a Tailwind v4 `@theme` block — **do not use a `tailwind.config.ts`**.

### Design Tokens (Tailwind v4 `@theme`)

| CSS Variable               | Tailwind Class                     | Value                                      |
| -------------------------- | ---------------------------------- | ------------------------------------------ |
| `--color-brand-gold`       | `text-brand-gold`, `bg-brand-gold` | `#e6be1a`                                  |
| `--color-brand-gold-light` | `text-brand-gold-light`            | `#ffeea8`                                  |
| `--color-brand-primary`    | `text-brand-primary`               | `#dbdbd7`                                  |
| `--color-brand-bg`         | `bg-brand-bg`                      | `#0b0505`                                  |
| `--color-surface`          | `bg-surface`                       | `rgba(255,255,255,0.04)`                   |
| `--color-surface-hover`    | `bg-surface-hover`                 | `rgba(255,255,255,0.08)`                   |
| `--color-border`           | `border-border`                    | `rgba(255,255,255,0.10)`                   |
| `--color-border-gold`      | `border-border-gold`               | `rgba(230,190,26,0.40)`                    |
| `--font-heading`           | `font-heading`                     | Sora (via `--font-sora`)                   |
| `--font-body`              | `font-body`                        | Space Grotesk (via `--font-space-grotesk`) |

### Fonts

Fonts are loaded in `src/app/layout.tsx` via `next/font/google`:

- `Sora` — weights 300/400/600/700/800 — variable `--font-sora`
- `Space_Grotesk` — weights 300/400/500/600/700 — variable `--font-space-grotesk`

Always use `font-heading` on headings and `font-body` on body text.

### Color Usage Rules

- **Never** use raw Tailwind colors (`text-white`, `text-gray-400`, `bg-slate-950`, `text-cyan-400`) — always use brand tokens
- Cards/panels: `bg-surface border border-border rounded-2xl`
- Gold-highlighted cards: `bg-brand-gold/10 border border-border-gold`
- Body text hierarchy: `text-brand-primary` → `text-brand-primary/70` → `text-brand-primary/50` → `text-brand-primary/30`

---

## 🧩 UI Component Architecture

Shared UI primitives live in `src/components/ui/`. All new pages and sections should use these.

### `Button.tsx`

Universal button/link component. Always use this instead of raw `<a>` or `<Link>` for CTAs.

```tsx
<Button variant="gold" href="https://cal.com/...">Book a Call</Button>  // external link
<Button variant="outline" to="/pricing">View Pricing</Button>            // internal link
<Button variant="ghost" onClick={fn}>Cancel</Button>                     // interactive
```

Props: `variant: "gold" | "outline" | "ghost"`, `size: "sm" | "md" | "lg"`, `href` (external), `to` (internal `<Link>`), `loading`, `disabled`, `type`, `className`, `onClick`.

### `SectionHeader.tsx`

Reusable heading block with built-in Framer Motion scroll animation. Replaces manual heading patterns.

```tsx
<SectionHeader
	overline="OUR SERVICES" // optional small-caps gold label
	heading={
		<>
			Our <span className="text-brand-gold">Services</span>
		</>
	}
	subtitle="Subtitle text here."
	align="center" // "center" | "left"
/>
```

### `StatCard.tsx`

White-background stat card (inverted from dark page). Used in `StatsBar.tsx`.

### `ServiceCard.tsx`

```tsx
<ServiceCard variant="image" image="/img.jpg" title="Web Dev" href="/services/web-dev" description="..." />
<ServiceCard variant="icon" icon={<Globe />} title="Web Dev" href="/services/web-dev" description="..." />
```

- `image` variant: homepage-style dark image with text overlay at bottom
- `icon` variant: services listing page style with icon in gold container

### `IndustryCard.tsx`

Image card with white title bar and gold text. Used in `Industries.tsx`.

### `FAQItem.tsx`

Controlled accordion item. Requires `isOpen` + `onToggle` props (state managed by parent).

### `Footer.tsx`

Standalone footer component. Include at the bottom of every page layout:

```tsx
import Footer from "@/components/ui/Footer";
// ...
<Footer />;
```

---

## 🏗️ Overview

This project follows a modular, self-contained architecture where:

- API endpoints are organized with separated concerns (validation, business logic, database, external services)
- Tools are self-contained features with dedicated client and server logic
- Shared utilities are centralized in `src/lib/` for reusability
- Type safety is enforced throughout with TypeScript and Zod

## 🔌 API Endpoints Architecture

### Standard Structure

Every API endpoint should follow this modular pattern:

```
src/app/api/[endpoint-name]/
├── route.ts              # Main request handler (orchestrator)
├── validation.ts         # Input validation schemas (Zod)
├── db.ts                 # Database operations (if needed)
├── [service].ts          # External service integrations
└── logger.ts             # Logging utilities (if needed)
```

### File Responsibilities

#### `route.ts` - Request Handler

The orchestrator that coordinates all operations. Should be thin and delegate to other modules.

**Responsibilities:**

- Parse request data
- Call validation
- Orchestrate business logic
- Handle errors consistently
- Return standardized responses

**Example:**

```typescript
import type { NextRequest } from "next/server";
import { z } from "zod";
import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
import { insertRecord } from "./db";
import { logAction } from "./logger";
import { mySchema } from "./validation";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = mySchema.parse(body);

		const result = await insertRecord(validatedData);
		logAction(result);

		return successResponse(result, "Success message", 201);
	} catch (error) {
		console.error("Error:", error);

		if (error instanceof z.ZodError) {
			return validationErrorResponse(error);
		}

		return errorResponse("Operation failed");
	}
}
```

#### `validation.ts` - Input Validation

Zod schemas for request validation and data extraction.

**Responsibilities:**

- Define input schemas
- Validation rules
- Data transformation/extraction utilities

**Example:**

```typescript
import { z } from "zod";

export const mySchema = z.object({
	name: z.string().min(1).max(100),
	email: z.string().email(),
	optional: z.string().optional(),
});

export type MySchemaType = z.infer<typeof mySchema>;
```

#### `db.ts` - Database Operations

All database queries for this endpoint.

**Responsibilities:**

- Database CRUD operations
- Query composition
- Data mapping

**Example:**

```typescript
import { db } from "~/db/client";
import { myTable } from "~/db/schema";

interface RecordData {
	name: string;
	email: string;
}

export async function insertRecord(data: RecordData) {
	const [inserted] = await db.insert(myTable).values(data).returning();

	return inserted;
}
```

#### `[service].ts` - External Services

Integration with third-party APIs or services.

**Responsibilities:**

- External API calls
- Response parsing
- Error handling for external services

**Example:**

```typescript
export async function callExternalService(data: SomeData) {
	const response = await fetch("https://api.example.com/endpoint", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("External service failed");
	}

	return response.json();
}
```

#### `logger.ts` - Logging

Structured logging for this endpoint.

**Responsibilities:**

- Console logging
- Log formatting
- Observability

**Example:**

```typescript
interface LogData {
	id: number;
	name: string;
	timestamp: Date;
}

export function logAction(data: LogData): void {
	console.log("📝 Action performed:");
	console.log(`   ID: ${data.id}`);
	console.log(`   Name: ${data.name}`);
	console.log(`   Time: ${data.timestamp.toISOString()}`);
}
```

### Response Format

All API endpoints **MUST** use standardized response utilities from `~/lib/server/api-response.ts`:

#### Success Response

```typescript
successResponse(
  { id: 123, name: "Result" },  // data (optional)
  "Operation successful",        // message (optional)
  201                            // status code (default: 200)
)

// Returns:
{
  success: true,
  message: "Operation successful",
  data: { id: 123, name: "Result" }
}
```

#### Error Response

```typescript
errorResponse(
  "Something went wrong",  // message
  500                      // status code (default: 500)
)

// Returns:
{
  success: false,
  message: "Something went wrong"
}
```

#### Validation Error Response

```typescript
validationErrorResponse(
  zodError,               // Zod error object
  "Invalid input"         // message (default: "Invalid request data")
)

// Returns:
{
  success: false,
  message: "Invalid input",
  errors: { /* Zod formatted errors */ }
}
```

## 🛠️ Tools Architecture

### Standard Structure

Tools are self-contained features with both UI and API logic:

```
src/app/tools/[tool-name]/
├── page.tsx              # Client UI component
├── utils.ts              # Client-side utilities
└── types.ts              # Shared types (optional)

src/app/api/[tool-name]/
├── route.ts              # API handler
├── validation.ts         # Input validation
├── [service].ts          # Business logic
└── ... (other modules as needed)
```

### When to Keep Tools Self-Contained

Tools should remain self-contained (not sharing utilities) when:

- The logic is specific to that tool's domain
- The utility would not be reused by other features
- The tool is a standalone feature with no cross-dependencies

### When to Extract to Shared Libraries

Extract to `src/lib/` when:

- Multiple tools use the same utility
- The utility is generic and reusable (date formatting, URL parsing, etc.)
- The code would benefit from centralized testing

## 📚 Shared Utilities

### `src/lib/server/` - Server-Side Utilities

#### `api-response.ts`

Standardized API response helpers. **All endpoints must use these.**

```typescript
import {
	successResponse,
	errorResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
```

### `src/lib/sanity/` - Sanity CMS (Blog)

All Sanity integration lives here. Blog post data is fetched via GROQ queries — never import from `src/data/blog*` (those files no longer exist).

#### `client.ts`

Singleton `@sanity/client` instance. Project ID `5j8mujwd`, dataset `production`, CDN enabled. No API token needed for public reads.

#### `queries.ts`

Async GROQ query functions — the direct replacement for the old `src/data/blog.ts` helpers:

```typescript
import {
	getAllPosts,
	getPostBySlug,
	getPostsByCategory,
	getPostsByTag,
	getAllSlugs,
	getAllCategories,
} from "~/lib/sanity/queries";
```

All functions are `async` and return typed `SanityPost` objects.

#### `image.ts`

```typescript
import { urlFor } from "~/lib/sanity/image";

// Usage
urlFor(post.author.image).width(64).height(64).url()
urlFor(post.coverImage).width(1200).height(630).url()
```

#### `portable-text.tsx`

Component map for `<PortableText>`. Handles headings, paragraphs, lists, inline code, links, images, and fenced code blocks (rendered via the existing `CodeBlock` component).

#### `types.ts`

`SanityPost` and `SanityAuthor` interfaces. Import these instead of the old `BlogPost` type.

### Future Shared Utilities

As the project grows, add shared utilities here:

- `src/lib/server/auth.ts` - Authentication utilities
- `src/lib/server/middleware.ts` - Request middleware
- `src/lib/server/cache.ts` - Caching utilities

## 📁 Directory Structure

```
bobadilla-work/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── contact/            # Contact form endpoint
│   │   │   │   ├── route.ts
│   │   │   │   ├── validation.ts
│   │   │   │   ├── db.ts
│   │   │   │   ├── email-notification.ts
│   │   │   │   └── logger.ts
│   │   │   └── reddit-post-date/   # Reddit tool endpoint
│   │   │       ├── route.ts
│   │   │       ├── validation.ts
│   │   │       └── reddit-client.ts
│   │   │
│   │   ├── tools/                  # Tool UIs
│   │   │   ├── page.tsx            # Tools catalog
│   │   │   └── reddit-post-date/
│   │   │       ├── page.tsx
│   │   │       └── utils.ts
│   │   │
│   │   └── ... (other app routes)
│   │
│   ├── lib/
│   │   ├── server/                 # Server-only utilities
│   │   │   └── api-response.ts
│   │   ├── sanity/                 # Sanity CMS integration (blog)
│   │   │   ├── client.ts           # @sanity/client singleton
│   │   │   ├── image.ts            # urlFor() image URL builder
│   │   │   ├── queries.ts          # GROQ query functions
│   │   │   ├── types.ts            # TypeScript types for Sanity documents
│   │   │   └── portable-text.tsx   # PortableText component map
│   │   └── ... (other shared code)
│   │
│   ├── data/
│   │   ├── services.ts             # Services data
│   │   └── service-pages.*.ts      # Localized service page content
│   │
│   ├── db/
│   │   ├── client.ts               # Database client
│   │   └── schema.ts               # Database schema
│   │
│   └── env.ts                      # Environment config
│
├── CLAUDE.md                       # This file
└── ... (config files)
```

## 📏 Conventions

### Naming Conventions

- **Directories**: kebab-case (`reddit-post-date`)
- **Files**: kebab-case (`api-response.ts`, `email-notification.ts`)
- **Functions**: camelCase (`insertContactMessage`, `logAction`)
- **Types/Interfaces**: PascalCase (`ContactData`, `RedditApiResponse`)
- **Constants**: UPPER_SNAKE_CASE (rare, use `as const` instead)

### File Organization

1. **Imports** - Group by source:

   ```typescript
   // External packages
   import { z } from "zod";
   import type { NextRequest } from "next/server";

   // Shared utilities
   import { successResponse } from "~/lib/server/api-response";

   // Local modules
   import { insertRecord } from "./db";
   import { mySchema } from "./validation";
   ```

1.1 Type imports go at the end of their sections.

2. **Types/Interfaces** - Define before usage

3. **Functions** - Export functions in order of importance

### Error Handling

All endpoints must handle errors consistently:

```typescript
try {
	// Main logic
} catch (error) {
	console.error("Context-specific error:", error);

	// Handle Zod validation errors
	if (error instanceof z.ZodError) {
		return validationErrorResponse(error);
	}

	// Handle known Error instances
	if (error instanceof Error) {
		return errorResponse(error.message, 400);
	}

	// Fallback for unknown errors
	return errorResponse("Unexpected error occurred");
}
```

### Type Safety

- Use TypeScript `strict` mode
- Prefer interfaces over types for objects
- Use Zod for runtime validation
- Infer types from Zod schemas: `type MyType = z.infer<typeof mySchema>`
- Avoid `any` - use `unknown` and type guards instead

### Database Operations

- All database operations go in `db.ts`
- Use Drizzle ORM for type-safe queries
- Always use `.returning()` for insert operations
- Handle database errors gracefully

### Environment Variables

- Define in `src/env.ts` using T3 Env
- Validate at startup
- Access via `env.VARIABLE_NAME`
- Never commit secrets to `.env.production`

## 📝 Examples

### Example 1: Contact Form Endpoint

Perfect example of modular architecture:

```
src/app/api/contact/
├── route.ts              # Orchestrates the flow
├── validation.ts         # Zod schema for form data
├── db.ts                 # Database insert operation
├── email-notification.ts # External email service
└── logger.ts             # Console logging
```

**Key Features:**

- ✅ Separated concerns
- ✅ Reusable modules
- ✅ Type-safe validation
- ✅ Standardized responses
- ✅ Error handling doesn't block main flow

### Example 2: Reddit Post Date Endpoint

Example of stateless API with external service:

```
src/app/api/reddit-post-date/
├── route.ts              # GET handler
├── validation.ts         # URL validation and extraction
└── reddit-client.ts      # Reddit API integration
```

**Key Features:**

- ✅ No database needed
- ✅ URL validation with Zod
- ✅ External API client module
- ✅ Timestamp validation
- ✅ Standardized responses

## 🚀 Creating a New Endpoint

1. **Create directory structure:**

   ```bash
   mkdir -p src/app/api/my-endpoint
   ```

2. **Create validation schema** (`validation.ts`):

   ```typescript
   import { z } from "zod";

   export const mySchema = z.object({
   	field: z.string().min(1),
   });
   ```

3. **Create route handler** (`route.ts`):

   ```typescript
   import type { NextRequest } from "next/server";
   import { z } from "zod";
   import {
   	successResponse,
   	errorResponse,
   	validationErrorResponse,
   } from "~/lib/server/api-response";
   import { mySchema } from "./validation";

   export async function POST(request: NextRequest) {
   	try {
   		const body = await request.json();
   		const validatedData = mySchema.parse(body);

   		// Your business logic here

   		return successResponse({ result: "data" });
   	} catch (error) {
   		console.error("Error:", error);

   		if (error instanceof z.ZodError) {
   			return validationErrorResponse(error);
   		}

   		return errorResponse("Operation failed");
   	}
   }
   ```

4. **Add additional modules as needed:**
   - `db.ts` - If database operations
   - `[service].ts` - If external API calls
   - `logger.ts` - If complex logging needed

## ✅ Checklist for New Endpoints

- [ ] Created directory under `src/app/api/`
- [ ] Added `validation.ts` with Zod schemas
- [ ] Created `route.ts` with proper error handling
- [ ] Used standardized response utilities
- [ ] Added database module (`db.ts`) if needed
- [ ] Created service module for external APIs if needed
- [ ] Added logging if needed
- [ ] Tested error cases
- [ ] Verified TypeScript types
- [ ] Documented any non-obvious logic


## 🚀 Deployment & Configuration

This project is deployed on Cloudflare Workers using OpenNext.js. Key configuration files:

- `wrangler.jsonc` - Cloudflare Workers configuration (compatibility settings, routes, D1 binding)
- `tsconfig.json` - TypeScript compiler settings (must use `jsx: "preserve"` for Next.js)
- `.gitignore` - Excludes auto-generated files (`cloudflare-env.d.ts`, `.open-next/`, etc.)
- `public/robots.txt` - Search engine crawler instructions
- `src/app/sitemap.ts` - Dynamic sitemap generation

For SEO optimization, the project includes:

- Automated sitemap generation for all pages (including blog posts fetched from Sanity)
- Structured data (JSON-LD) for organization and services
- Canonical URLs and Open Graph metadata via `src/lib/seo.ts`

Blog posts are pre-rendered as static pages at build time (`● Static` in the build output). The blog listing page (`/blog`) is dynamic to support category/tag filtering via `searchParams`.

See `README.md` for deployment commands and database operations.
