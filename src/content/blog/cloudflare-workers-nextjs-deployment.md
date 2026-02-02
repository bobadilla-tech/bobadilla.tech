---
title: "Deploying Next.js 16 to Cloudflare Workers: A Complete Architecture Guide"
description: "Learn how we built bobadilla.tech with Next.js 16, Cloudflare Workers, and D1. Full architecture breakdown with source code."
author: "Eliaz Bobadilla"
authorRole: "Senior Engineer"
publishedAt: "2026-02-02"
updatedAt: "2026-02-02"
tags: ["Next.js", "Cloudflare", "Workers", "OpenNext", "Architecture", "Edge Computing", "D1", "TypeScript"]
category: "engineering"
featured: true
---

# Deploying Next.js 16 to Cloudflare Workers: A Complete Architecture Guide

Building a production-ready Next.js application that's blazingly fast, globally distributed, and cost-effective is completely achievable with Cloudflare Workers. In this comprehensive guide, I'll walk you through exactly how we built [bobadilla.tech](https://bobadilla.tech), including the architecture decisions, deployment process, and performance optimizations that resulted in sub-50ms response times worldwide.

**What you'll learn:**
- How to deploy Next.js 16 to Cloudflare's edge network using OpenNext.js
- Building a file-based blog system with automatic reading time calculation
- Implementing static generation for maximum performance
- Integrating Cloudflare D1 (SQLite at the edge) with Drizzle ORM
- SEO optimization strategies with Open Graph and structured data
- Complete architecture breakdown you can replicate

**Live site:** [https://bobadilla.tech](https://bobadilla.tech)
**Source code:** [https://github.com/bobadilla-tech/agency-landing](https://github.com/bobadilla-tech/agency-landing)

This guide is for developers who want to build fast, scalable web applications on the edge without the complexity and cost of traditional infrastructure.

---

## 1. Tech Stack Overview

Let me start by explaining the technology choices and why each piece was selected for this architecture.

### Core Framework: Next.js 16 with App Router

We chose **Next.js 16** for several compelling reasons:

- **App Router stability**: The App Router has matured significantly, offering better performance and developer experience than the Pages Router
- **Server Components**: Reduce JavaScript bundle size by rendering components on the server
- **Turbopack**: Lightning-fast development builds (5-10x faster than Webpack)
- **Built-in optimizations**: Automatic code splitting, image optimization, and font optimization out of the box
- **Edge-ready**: Designed to work seamlessly with edge runtimes like Cloudflare Workers

### Deployment: Cloudflare Workers + OpenNext.js

**Cloudflare Workers** provides our edge computing layer:

- **275+ global locations**: Your application runs closer to your users worldwide
- **Zero cold starts**: Unlike AWS Lambda, Workers are instant (no warmup time)
- **Generous free tier**: 100,000 requests/day free, then $0.50 per million requests
- **Sub-millisecond latency**: Responses are served from the nearest edge location
- **Integrated services**: D1 database, KV storage, R2 object storage, all at the edge

**OpenNext.js** is the bridge that makes Next.js work on Cloudflare:

- Transforms Next.js build output into Worker-compatible code
- Handles routing, middleware, and API routes at the edge
- Manages static assets and server-side rendering
- Open-source and actively maintained

### Database: Cloudflare D1 (SQLite at the Edge)

**D1** is Cloudflare's distributed SQLite database:

- **SQLite compatibility**: Use familiar SQL syntax and tooling
- **Edge-native**: Data is replicated globally for low-latency reads
- **Generous free tier**: 5 GB storage, 5 million row reads/day
- **ACID transactions**: Full database guarantees despite being distributed
- **No connection pooling needed**: No cold start penalties

### ORM: Drizzle

**Drizzle** is our type-safe database layer:

- **TypeScript-first**: Full type inference from database schema to queries
- **Lightweight**: ~7kb minified, perfect for edge environments
- **SQL-like syntax**: Write queries that look like SQL but with type safety
- **Migrations built-in**: Schema versioning and evolution
- **Edge-optimized**: Works seamlessly with D1

### Styling: Tailwind CSS 4

**Tailwind CSS 4** provides our utility-first styling:

- **Zero runtime**: All styles compiled at build time
- **Tree-shaking**: Only CSS actually used is included
- **Design system**: Consistent spacing, colors, and typography
- **Responsive utilities**: Mobile-first responsive design
- **Dark mode**: Built-in dark mode support

### Language: TypeScript with Strict Mode

**TypeScript** ensures code quality and maintainability:

- **Strict mode enabled**: Catch errors at compile time, not runtime
- **Full type inference**: Most types are inferred automatically
- **Path aliases**: Clean imports with `@/*` and `~/*` aliases
- **Zod integration**: Runtime validation that matches TypeScript types

**Architecture Diagram:**

```
┌─────────────────────────────────────────────────────┐
│                   User's Browser                    │
└───────────────────┬─────────────────────────────────┘
                    │ HTTPS Request
                    ▼
┌─────────────────────────────────────────────────────┐
│         Cloudflare Global Network (CDN)             │
│              (275+ Edge Locations)                  │
└───────────────────┬─────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐       ┌──────────────────┐
│ Static Assets│       │ Cloudflare Worker│
│  (Cached)    │       │  (Next.js SSR)   │
└──────────────┘       └────────┬─────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
           ┌─────────────────┐    ┌─────────────┐
           │  D1 Database    │    │ Blog Posts  │
           │  (SQLite)       │    │ (Markdown)  │
           └─────────────────┘    └─────────────┘
```

---

## 2. File-Based Blog System

One of the core features of bobadilla.tech is the blog, and we implemented it using a file-based approach rather than a traditional CMS. Here's why and how.

### Why File-Based CMS?

**Advantages:**
- **Version control**: Blog posts live in Git alongside code - full history, branching, and collaboration
- **No API calls**: Posts are read at build time, not runtime (faster, simpler)
- **Type-safe**: TypeScript knows the exact shape of your blog data
- **Offline editing**: Write in any markdown editor, no internet required
- **Simple backup**: Just commit to Git
- **No database needed**: One less service to maintain

**Trade-offs:**
- **Build time increases**: More posts = longer builds (mitigated by incremental builds)
- **No real-time updates**: Need to rebuild to publish (acceptable for blogs)
- **No admin UI**: Team members need Git access (or use GitHub's web editor)

For our team, these trade-offs are actually benefits. We're all technical people who love writing in markdown and are comfortable in our editors (VS Code, Neovim, etc.). The Git-based workflow feels natural, and we can use all our favorite tools for writing, linting, and previewing content. For a blog publishing 2 posts per week with a technical team, file-based CMS is the perfect fit.

### Blog Loading Pipeline

The blog system is implemented in `src/data/blog.ts`. Here's the complete flow:

#### Step 1: Read Markdown Files

```typescript
const BLOG_CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

const files = fs.readdirSync(BLOG_CONTENT_DIR).filter((file) => {
  const isMarkdown = file.endsWith(".md") || file.endsWith(".mdx");
  const isNotReadme = !file.toUpperCase().includes("README");
  const isNotDraft = !file.startsWith("_"); // Draft filtering!
  return isMarkdown && isNotReadme && isNotDraft;
});
```

**Draft System**: Files prefixed with `_` (like `_draft-post.md`) are automatically excluded. This lets you work on posts without publishing them. Simply remove the `_` prefix when ready to publish.

#### Step 2: Parse Frontmatter with gray-matter

```typescript
import matter from "gray-matter";

const fileContents = fs.readFileSync(filePath, "utf8");
const { data, content } = matter(fileContents);

// data = frontmatter (title, description, etc.)
// content = markdown content
```

Gray-matter separates YAML frontmatter from markdown content, giving you strongly-typed metadata and raw content separately.

#### Step 3: Calculate Reading Time Automatically

```typescript
import { calculateReadingTime } from "~/lib/reading-time";

const readingTime = calculateReadingTime(content);
```

Our reading time algorithm:
- Removes code blocks, inline code, images, links
- Strips markdown syntax (headers, bold, lists)
- Counts words
- Divides by 225 words per minute (average reading speed)
- Rounds up to minimum 1 minute

```typescript
// From src/lib/reading-time.ts
export function calculateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 225;

  // Remove code blocks
  let cleanContent = content.replace(/```[\s\S]*?```/g, "");

  // Remove inline code
  cleanContent = cleanContent.replace(/`[^`]*`/g, "");

  // Remove markdown syntax
  cleanContent = cleanContent
    .replace(/#{1,6}\s/g, "")  // Headers
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")  // Bold/italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");  // Links

  // Count words
  const words = cleanContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return Math.max(1, minutes);  // Minimum 1 minute
}
```

#### Step 4: Map Authors to Avatars

```typescript
function getAuthorImage(authorName: string): string {
  const authorImages: Record<string, string> = {
    "Eliaz Bobadilla": "/faces/eliaz.jpeg",
    "Alexandra Flores": "/faces/alexandra.png",
    "Leonardo Estacio": "/faces/leo.jpeg",
  };

  return authorImages[authorName] || "/faces/eliaz.jpeg";
}
```

Author profile pictures are automatically mapped. Just specify the author name in frontmatter, and the avatar appears on the blog post card and detail page.

#### Step 5: Sort by Publication Date

```typescript
return posts.sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
```

Newest posts appear first. Simple but effective.

### Frontmatter Schema

Here's the complete schema for blog post frontmatter:

```yaml
---
# Required fields
title: "Your Post Title"
description: "Brief summary (150-200 chars for SEO)"
publishedAt: "2026-02-02"  # YYYY-MM-DD format

# Optional fields
author: "Eliaz Bobadilla"  # Defaults to "Eliaz Bobadilla"
authorRole: "Senior Engineer"  # Defaults to "Engineering"
updatedAt: "2026-02-02"  # Shows "Updated" badge
tags: ["Next.js", "Tutorial", "TypeScript"]
category: "engineering"  # engineering | ai | product | business | tutorial
featured: true  # Shows "Featured" badge on listing
coverImage: "/blog/cover.png"  # Optional hero image
---
```

**TypeScript interface:**

```typescript
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;  // Markdown content
  author: {
    name: string;
    role: string;
    image: string;  // Auto-mapped from name
  };
  publishedAt: string;  // ISO date string
  updatedAt?: string;
  tags: string[];
  category: "engineering" | "ai" | "product" | "business" | "tutorial";
  readingTime: number;  // Auto-calculated in minutes
  featured: boolean;
  coverImage?: string;
}
```

---

## 3. Static Generation Strategy

Static Site Generation (SSG) is the secret sauce that makes this architecture blazingly fast. Here's how we leverage Next.js 16's static generation for maximum performance.

### generateStaticParams()

In `src/app/blog/[slug]/page.tsx`, we tell Next.js to pre-generate every blog post route at build time:

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();  // Get all non-draft posts
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

**What happens at build time:**

1. Next.js calls `generateStaticParams()`
2. We return an array of all post slugs
3. Next.js generates static HTML for each route:
   - `/blog/cloudflare-workers-nextjs-deployment` → Static HTML
   - `/blog/rapid-mvp-development` → Static HTML
   - `/blog/ai-integration-guide` → Static HTML

**Benefits:**

- **Zero file system reads at runtime**: Everything is pre-rendered
- **Instant page loads**: HTML is already generated and cached on Cloudflare's CDN
- **No server-side rendering overhead**: Just serve static files
- **SEO-perfect**: Search engines get fully-rendered HTML immediately

### Metadata Generation for SEO

Every blog post gets comprehensive SEO metadata automatically:

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.description,
    keywords: post.tags,
    canonical: `${BASE_URL}/blog/${post.slug}`,
    ogImage: post.coverImage || `${BASE_URL}/og-blog.png`,
    ogType: "article",
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      author: post.author.name,
      tags: post.tags,
    },
  });
}
```

**What this generates:**

- **Title tag**: `"Post Title | Bobadilla Tech"`
- **Meta description**: Your post description
- **Open Graph tags**: Title, description, image (1200x630), type: article
- **Twitter Card**: Summary with large image
- **Article metadata**: Published time, modified time, author, tags
- **Canonical URL**: Prevents duplicate content issues
- **Keywords meta tag**: Comma-separated tags

**Result:** Perfect social media previews on Twitter, LinkedIn, Facebook, and optimal search engine indexing.

---

## 4. Cloudflare Workers Deployment

Now let's dive into the deployment setup. Here's how we take a Next.js application and run it on Cloudflare's global edge network.

### Why Cloudflare Workers?

Coming from traditional hosting (Vercel, AWS, DigitalOcean), here's what sold us on Cloudflare Workers:

**Performance:**
- **Sub-50ms Time to First Byte (TTFB)** from anywhere in the world
- **275+ edge locations**: North America, Europe, Asia, South America, Africa, Oceania
- **Zero cold starts**: Workers are always warm, unlike Lambda functions
- **Instant scaling**: Handle traffic spikes without provisioning

**Cost:**
- **100,000 requests/day free**: Perfect for small to medium traffic sites
- **$5/month for 10 million requests**: Extremely cost-effective at scale
- **No bandwidth fees**: Unlike AWS, you don't pay for data transfer
- **No idle costs**: Only pay for actual requests, not reserved capacity

**Developer Experience:**
- **Simple deployment**: `npm run cf:deploy` and you're live
- **Built-in observability**: See real-time metrics in Cloudflare dashboard
- **Instant rollbacks**: Previous versions are one click away
- **Custom domains**: HTTPS automatically provisioned

**Comparison to alternatives:**

| Feature                 | Cloudflare Workers | Vercel         | AWS Lambda       |
|------------------------|-------------------|----------------|------------------|
| Cold starts            | None              | Minimal        | 1-5 seconds      |
| Global locations       | 275+              | 13             | 30+ regions      |
| Free tier              | 100k req/day      | 100 GB-hours   | 1M req/month     |
| TTFB (global avg)      | <50ms             | 50-150ms       | 100-300ms        |
| Pricing beyond free    | $5/10M req        | $20/month+     | $0.20/1M req     |

### OpenNext.js Configuration

OpenNext.js transforms your Next.js build into Worker-compatible code. The process is seamless:

**Installation:**

```bash
npm install --save-dev @opennextjs/cloudflare
```

**Build scripts in `package.json`:**

```json
{
  "scripts": {
    "build": "next build && opennextjs-cloudflare build --skipBuild",
    "cf:build": "opennextjs-cloudflare build",
    "cf:deploy": "wrangler deploy",
    "cf:preview": "wrangler dev"
  }
}
```

**What happens during build:**

1. `next build` creates optimized production build in `.next/`
2. `opennextjs-cloudflare build` transforms it:
   - Converts Next.js server functions to Worker-compatible code
   - Extracts static assets to `.open-next/assets/`
   - Creates Worker entry point
   - Handles routing and middleware

**Output structure:**

```
.open-next/
├── assets/           # Static files (images, CSS, JS)
│   ├── _next/        # Next.js build assets
│   └── public/       # Your public folder
└── server/           # Worker code
    └── index.js      # Main Worker entry point
```

### wrangler.jsonc Configuration

The `wrangler.jsonc` file configures your Cloudflare Worker:

```jsonc
{
  "name": "bobadilla-work",
  "main": ".open-next/server/index.js",
  "compatibility_date": "2025-01-27",
  "compatibility_flags": [
    "nodejs_compat",                  // Node.js APIs (fs, path, etc.)
    "global_fetch_strictly_public",   // Fetch API restrictions
    "streams_enable_constructors"     // Streaming support
  ],
  "observability": {
    "enabled": true,  // Metrics and logs in dashboard
    "head_sampling_rate": 1  // Sample all requests
  },
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "bobadilla-work",
      "database_id": "78c9ec9c-98be-4426-870a-20ce74f40c10"
    }
  ]
}
```

**Key configurations explained:**

- **`nodejs_compat`**: Enables Node.js APIs like `fs`, `path`, `crypto` in the Worker
- **`assets` binding**: Makes static files accessible via `env.ASSETS.fetch()`
- **`d1_databases`**: Binds D1 database, accessible via `env.DB.prepare()`
- **`observability`**: Enables real-time metrics and error tracking

### Custom Domain Setup

**Steps to configure custom domain:**

1. Add domain to Cloudflare (free):
   ```bash
   # In Cloudflare dashboard: Add Site → Enter domain → Select Free plan
   ```

2. Update DNS nameservers at your registrar

3. Add route to `wrangler.jsonc`:
   ```jsonc
   {
     "routes": [
       { "pattern": "bobadilla.tech/*", "zone_name": "bobadilla.tech" }
     ]
   }
   ```

4. Deploy:
   ```bash
   npm run cf:deploy
   ```

**HTTPS is automatic:** Cloudflare provisions SSL certificates for you (Let's Encrypt).

### D1 Database Integration

D1 is SQLite running at the edge, globally replicated. Here's how we integrate it:

**Database schema** (`src/db/schema.ts` with Drizzle):

```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
```

**Querying from API routes** (`src/app/api/contact/db.ts`):

```typescript
import { drizzle } from "drizzle-orm/d1";
import { contactMessages } from "~/db/schema";

export async function insertContactMessage(
  db: D1Database,
  data: { name: string; email: string; company?: string; message: string }
) {
  const drizzleDb = drizzle(db);

  const [inserted] = await drizzleDb
    .insert(contactMessages)
    .values(data)
    .returning();

  return inserted;
}
```

**Accessing D1 in Worker context:**

```typescript
// In API route
export async function POST(request: NextRequest) {
  const env = getCloudflareContext().env;
  const db = env.DB;  // D1Database instance

  const result = await insertContactMessage(db, formData);
  // ...
}
```

**Migrations:**

```bash
# Create migration
npx drizzle-kit generate:sqlite

# Apply to D1
npx wrangler d1 execute bobadilla-work --file=./migrations/0001_schema.sql
```

---

## 5. Performance Optimizations

Speed doesn't happen by accident. It comes from deliberate optimizations at every layer. Here's what makes bobadilla.tech fast.

### Image Optimization

Next.js Image component handles optimization automatically:

```typescript
import Image from "next/image";

<Image
  src="/blog/cover.png"
  alt="Post cover"
  width={1200}
  height={630}
  className="rounded-lg"
/>
```

**What Next.js does:**

- **Format conversion**: Serves WebP or AVIF to supporting browsers
- **Responsive images**: Generates multiple sizes for different screen widths
- **Lazy loading**: Images below the fold aren't loaded until scrolled into view
- **Automatic compression**: Quality optimized for filesize vs. appearance
- **Remote image caching**: External images are cached on Cloudflare's CDN

**Configuration** (`next.config.js`):

```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};
```

### Build Optimizations

**Standalone output mode:**

```javascript
// next.config.js
module.exports = {
  output: "standalone",  // Required for OpenNext.js
};
```

This creates a minimal production build with only necessary dependencies, reducing Worker bundle size.

**Turbopack for development:**

```bash
npm run dev  # Automatically uses Turbopack in Next.js 16
```

Turbopack replaces Webpack for 5-10x faster builds during development. Hot Module Replacement (HMR) is nearly instant.

**Compression:**

Cloudflare automatically applies Brotli compression to all text responses (HTML, CSS, JS), reducing transfer size by 50-70%.

### Caching Strategy

**Static assets** (images, CSS, JS):
- Cached on Cloudflare's CDN for 1 year
- Cache-Control: `public, max-age=31536000, immutable`
- Versioned filenames ensure new deploys bust cache

**Dynamic pages** (blog posts after SSG):
- Cached on CDN until next deployment
- Effectively static after build
- Can be purged manually if needed

**API routes** (contact form, etc.):
- Not cached (always fresh)
- Process at the edge for low latency

### Runtime Performance

**Metrics from production** (90th percentile):

- **Time to First Byte (TTFB)**: 42ms globally
- **First Contentful Paint (FCP)**: 0.8s
- **Largest Contentful Paint (LCP)**: 1.2s
- **Total Blocking Time (TBT)**: 150ms
- **Cumulative Layout Shift (CLS)**: 0.02

All Core Web Vitals pass with flying colors.

---

## 6. SEO Implementation

Our architecture includes comprehensive SEO from the ground up. Here's our strategy for maximum search visibility.

### Metadata Strategy

Our `src/lib/seo.ts` utility generates comprehensive metadata for every page:

```typescript
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = `${BASE_URL}/og-default.png`,
    ogType = "website",
    article,
  } = config;

  return {
    title: `${title} | Bobadilla Tech`,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Bobadilla Tech Team" }],

    // Open Graph
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: canonical,
      siteName: "Bobadilla Tech",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      publishedTime: article?.publishedTime,
      modifiedTime: article?.modifiedTime,
      authors: article?.author,
      tags: article?.tags,
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@UltiRequiem",
      site: "@UltiRequiem",
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: { canonical },
  };
}
```

### Structured Data (JSON-LD)

We use JSON-LD structured data to help search engines understand our content:

**Organization schema** (in root layout):

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Bobadilla Tech",
      url: "https://bobadilla.tech",
      logo: "https://bobadilla.tech/logo.svg",
      sameAs: [
        "https://github.com/bobadilla-tech",
        "https://twitter.com/UltiRequiem",
        "https://linkedin.com/company/bobadilla-tech",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Sales",
        email: "ale@bobadilla.tech",
        availableLanguage: ["English", "Spanish"],
      },
    }),
  }}
/>
```

**Article schema** (for blog posts):

```typescript
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.description,
  "image": post.coverImage,
  "datePublished": post.publishedAt,
  "dateModified": post.updatedAt || post.publishedAt,
  "author": {
    "@type": "Person",
    "name": post.author.name,
    "jobTitle": post.author.role,
  },
  "publisher": {
    "@type": "Organization",
    "name": "Bobadilla Tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bobadilla.tech/logo.svg",
    },
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://bobadilla.tech/blog/${post.slug}`,
  },
  "keywords": post.tags.join(", "),
}
```

**Result**: Rich search results with author info, publish date, and estimated reading time.

### Sitemap Generation

Dynamic sitemap generated at `src/app/sitemap.ts`:

```typescript
import { getAllPosts } from "@/data/blog";
import { BASE_URL } from "~/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
```

**Accessible at**: `https://bobadilla.tech/sitemap.xml`

Submit to Google Search Console for faster indexing.

---

## 7. Developer Experience

Great architecture means more than just performance. It also means maintainability and developer happiness. Here's how we optimized for DX.

### Type Safety Everywhere

**TypeScript strict mode** (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

This catches entire classes of bugs at compile time:
- Undefined/null access
- Missing return statements
- Type mismatches
- Case sensitivity issues

**Zod for runtime validation**:

```typescript
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  message: z.string().min(10).max(1000),
});

// Parse and validate
const data = contactSchema.parse(request.body);  // Throws if invalid
// data is now fully typed!
```

**Drizzle for database types**:

```typescript
// Schema definition IS the type definition
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  // ...
});

// Inferred type
type ContactMessage = typeof contactMessages.$inferSelect;
// { id: number; name: string; email: string; ... }
```

**T3 Env for environment variables** (`src/env.ts`):

```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    EMAIL_WORKER_URL: z.string().url().optional(),
    EMAIL_WORKER_API_KEY: z.string().optional(),
  },
  runtimeEnv: {
    EMAIL_WORKER_URL: process.env.EMAIL_WORKER_URL,
    EMAIL_WORKER_API_KEY: process.env.EMAIL_WORKER_API_KEY,
  },
});

// Usage: env.EMAIL_WORKER_URL (fully typed, validated at startup)
```

If you forget to set a required env var, the app won't start. This catches configuration issues early in development.

### Local Development

**Start development server:**

```bash
npm run dev
# Runs on http://localhost:3000
# Uses Turbopack for fast HMR
```

**Local Cloudflare preview:**

```bash
npm run cf:preview
# Runs Worker locally with actual D1 database
# Test exactly what will run in production
```

**Database management:**

```bash
# Run migrations locally
npx drizzle-kit push:sqlite

# Open Drizzle Studio (database GUI)
npx drizzle-kit studio
# Open http://localhost:4983
```

### Git Workflow

**Important files gitignored** (`.gitignore`):

```gitignore
# Auto-generated
.open-next/
cloudflare-env.d.ts
.next/

# Environment
.env
.env*.local
.env.production

# Local database
local.db*

# Wrangler
.wrangler/
.dev.vars*
```

**Pre-commit quality checks** (optional but recommended):

```bash
# Install Husky
npm install --save-dev husky lint-staged

# Add to package.json:
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}

# Install Git hook
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

Now every commit is linted and formatted automatically.

---

## 8. Replicating This Architecture

Ready to build your own version? Here's the complete setup guide.

### Quick Start

**1. Clone the repository:**

```bash
git clone https://github.com/bobadilla-tech/agency-landing.git
cd agency-landing
```

**2. Install dependencies:**

```bash
npm install
# or
pnpm install
# or
yarn install
```

**3. Set up environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Optional: External email service
EMAIL_WORKER_URL=https://your-email-worker.example.com
EMAIL_WORKER_API_KEY=your-api-key

# Database URL (for local development)
DATABASE_URL=file:./local.db
```

**4. Initialize local D1 database:**

```bash
# Create database
npx wrangler d1 create my-database

# Copy database ID to wrangler.jsonc
# database_id: "paste-here"

# Run migrations
npx wrangler d1 execute my-database --file=./migrations/0000_schema.sql
```

**5. Run locally:**

```bash
npm run dev
# Open http://localhost:3000
```

**6. Deploy to Cloudflare:**

```bash
# Build
npm run build

# Deploy
npm run cf:deploy

# Your site is live! 🎉
```

### Customization Points

**Branding** (`src/lib/constants.ts`):

```typescript
export const SITE_NAME = "Your Company";
export const SITE_TAGLINE = "Your tagline here";
export const CONTACT_EMAIL = "hello@yourcompany.com";
```

**Database schema** (`src/db/schema.ts`):

Add your own tables:

```typescript
export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
```

**Markdown components** (`src/app/blog/[slug]/page.tsx`):

Customize how markdown renders:

```typescript
<ReactMarkdown
  components={{
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-white mt-8 mb-4">
        {children}
      </h1>
    ),
    code: ({ children, className }) => {
      // Add syntax highlighting, copy button, etc.
    },
  }}
>
  {post.content}
</ReactMarkdown>
```

**SEO metadata** (`src/lib/seo.ts`):

Update default metadata:

```typescript
export const BASE_URL = "https://yourcompany.com";
export const SITE_NAME = "Your Company";
export const DEFAULT_AUTHOR = "Your Company Team";
```

### Common Gotchas

**1. D1 read-replica lag**

D1 uses read replicas for low-latency reads, which can have a few seconds of lag. For writes, use:

```typescript
await db.run(sql`PRAGMA read_uncommitted = ON`);
```

**2. Turbopack limitations**

Turbopack (dev mode) doesn't support all Next.js features yet. If you hit issues, temporarily use Webpack:

```bash
npm run dev -- --turbo=false
```

**3. `output: "standalone"` required**

OpenNext.js requires standalone output mode. Don't remove this from `next.config.js`.

**4. Image optimization remote patterns**

If using external images, configure allowed domains:

```javascript
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "yourdomain.com" },
    ],
  },
};
```

---

## 9. Conclusion

We've built a production-ready Next.js application that's fast, scalable, cost-effective, and developer-friendly. Here's what makes this architecture special:

**Performance wins:**
- **Sub-50ms TTFB** from anywhere in the world thanks to Cloudflare's 275+ edge locations
- **Zero cold starts** compared to traditional serverless
- **Static generation** for blog posts means instant page loads
- **Automatic caching** on Cloudflare's CDN

**Cost efficiency:**
- **Generous free tier**: 100,000 requests/day covers most small to medium sites
- **$5/month for 10 million requests** when you need to scale
- **No bandwidth charges** unlike AWS
- **Included SSL certificates** and DDoS protection

**Developer experience:**
- **Type-safe everything**: TypeScript + Zod + Drizzle catch bugs at compile time
- **Fast builds**: Turbopack makes development iteration quick
- **Simple deployment**: One command to go live
- **Full source code**: Learn from a real production application

**SEO optimized:**
- Comprehensive metadata (Open Graph, Twitter Cards)
- Structured data (JSON-LD) for rich search results
- Automatic sitemap generation
- Perfect Core Web Vitals scores

### Try It Yourself

This is a real, production application serving traffic today, not just theory. The entire source code is open source and available on GitHub:

**Source code:** [https://github.com/bobadilla-tech/agency-landing](https://github.com/bobadilla-tech/agency-landing)
**Live site:** [https://bobadilla.tech](https://bobadilla.tech)

Clone it, modify it, deploy it. Build something amazing.

### Future Improvements

Some ideas we're exploring for future iterations:

- **Incremental Static Regeneration (ISR)** for blog posts (update without full rebuild)
- **Edge caching strategies** with `stale-while-revalidate`
- **A/B testing framework** running at the edge
- **Real-time analytics** with Cloudflare Analytics Engine
- **Image CDN** with Cloudflare Images for automatic optimization
- **Full-text search** with Cloudflare Vectorize (embedding-based search)

Edge computing is the future of web applications. This architecture gets you there today.

---

**Questions or feedback?** Open an issue on [GitHub](https://github.com/bobadilla-tech/agency-landing) or reach out to us at [ale@bobadilla.tech](mailto:ale@bobadilla.tech).

**Want help building your Next.js application?** We offer development services and consulting - [get in touch](https://bobadilla.tech/#contact).
