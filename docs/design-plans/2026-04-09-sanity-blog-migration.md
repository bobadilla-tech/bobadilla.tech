# Design Plan: Migrate Blog to Sanity CMS

**Date:** 2026-04-09  
**Scope:** Replace static TypeScript blog data (`src/data/blog.ts`, `src/data/blog-posts.ts`, `src/data/blog-content/`) with Sanity-backed content, keeping all existing pages, routing, SEO, and i18n intact.

---

## Table of Contents

1. [Overview & Goals](#overview--goals)
2. [Architecture Decision Records](#architecture-decision-records)
3. [Sanity Studio Setup](#sanity-studio-setup)
4. [Schema Design](#schema-design)
5. [Next.js Integration](#nextjs-integration)
6. [GROQ Query Layer](#groq-query-layer)
7. [Content Migration](#content-migration)
8. [ISR & Revalidation Strategy](#isr--revalidation-strategy)
9. [SEO Preservation](#seo-preservation)
10. [i18n Considerations](#i18n-considerations)
11. [File Changes Map](#file-changes-map)
12. [Implementation Steps](#implementation-steps)
13. [Checklist](#checklist)

---

## Overview & Goals

**Current state:** Blog posts live as TypeScript objects with markdown content strings in `src/data/blog-content/*.ts`. Adding a post requires a code change, a build, and a deploy.

**Target state:** Blog posts are authored in Sanity Studio, fetched at build time via GROQ queries, and optionally refreshed via on-demand revalidation (webhook). No code deploy needed to publish a post.

**Non-goals for this phase:**
- Translating post _content_ into ES/PT (the current posts are English-only; i18n routing is preserved but content language is `en` only for now)
- Real-time preview in Next.js (may be added later)
- Comments or user accounts

---

## Architecture Decision Records

### ADR-1: Portable Text vs. Markdown strings

| Option | Pros | Cons |
|---|---|---|
| Keep Markdown (string field) | Zero change to rendering layer (`ReactMarkdown` stays) | Loses Sanity rich-text editor UX; no image embeds |
| **Portable Text (chosen)** | Native Sanity editor, embeddable images, code blocks via plugin, future-proof | Must replace `ReactMarkdown` with `@portabletext/react` |

**Decision:** Use Portable Text with a custom `code` block type powered by `sanity-plugin-code-input` in the Studio. In Next.js, swap `ReactMarkdown` for `@portabletext/react` with the existing `CodeBlock` component mapped to the code annotation.

### ADR-2: Author documents vs. inline objects

| Option | Pros | Cons |
|---|---|---|
| Inline object on post | Simpler schema | Author data duplicated across posts |
| **Reference document (chosen)** | Single source of truth; easy to update author bio | Slightly more complex GROQ joins |

**Decision:** `author` is a separate Sanity document type. Posts hold a `reference` to it.

### ADR-3: i18n strategy

The site routes are `/[locale]/blog/[slug]`. Current posts have no translated content — the same English text is served for all locales. Sanity has no built-in i18n.

**Decision:** Add a `language` string field (`en | es | pt`) to each post document. Initially all posts are `en`. The Next.js page continues to filter by slug only (locale is ignored for content selection). When translated posts are needed, create separate Sanity documents with the same `slug.current` but different `language` values, and update the GROQ query to filter by both `slug` and `language`.

### ADR-4: Image handling

- **Author images:** Upload existing `/public/faces/*.jpeg|png` assets to Sanity during migration. Use `sanity.image()` URL builder in Next.js.
- **Cover images:** Store as Sanity image assets (optional field). Fall back to `/og-blog.png` if absent (matches current behaviour).

### ADR-5: Cloudflare Workers compatibility

`@sanity/client` uses standard `fetch` — fully compatible with the Cloudflare Workers runtime. No Node.js APIs required. The Sanity project ID and dataset are public read-only values (no secret needed for CDN reads). The API token for Studio writes is only used inside the Studio (separate project).

### ADR-6: `readingTime` calculation

Currently auto-calculated from markdown character count. With Portable Text, calculate it server-side from the plain-text representation of the body blocks when fetching from Sanity (or store it as a computed field that editors can override).

**Decision:** Store `readingTime` as an editable `number` field in Sanity. During migration, populate from existing values. Editors can update it when content changes significantly.

---

## Sanity Studio Setup

**Studio location:** `studio-bobadilla-tech-blogs/` (sibling directory to the Next.js project, separate repo/package)

**Initialization command (already provided):**
```bash
npm create sanity@latest -- --project 5j8mujwd --dataset production --template clean --typescript --output-path studio-bobadilla-tech-blogs
cd studio-bobadilla-tech-blogs
```

**Additional Studio plugins to install:**
```bash
npm install sanity-plugin-code-input @sanity/image-url
```

**Studio file structure:**
```
studio-bobadilla-tech-blogs/
├── sanity.config.ts          # Plugin registration, desk structure
├── schemaTypes/
│   ├── index.ts              # Exports all types
│   ├── post.ts               # Blog post document
│   ├── author.ts             # Author document
│   └── blockContent.ts       # Portable Text definition
└── package.json
```

### `sanity.config.ts`

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "sanity-plugin-code-input";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "bobadilla-tech-blogs",
  title: "Bobadilla Tech Blog",
  projectId: "5j8mujwd",
  dataset: "production",
  plugins: [structureTool(), codeInput()],
  schema: { types: schemaTypes },
});
```

---

## Schema Design

### `schemaTypes/author.ts`

```typescript
import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
```

### `schemaTypes/blockContent.ts`

```typescript
import { defineArrayMember, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL" },
              { name: "blank", type: "boolean", title: "Open in new tab", initialValue: true },
            ],
          },
        ],
      },
    }),
    // Code blocks (powered by sanity-plugin-code-input)
    defineArrayMember({ type: "code" }),
    // Inline images
    defineArrayMember({ type: "image", options: { hotspot: true } }),
  ],
});
```

### `schemaTypes/post.ts`

```typescript
import { defineType, defineField } from "sanity";

const CATEGORIES = [
  { title: "Engineering", value: "engineering" },
  { title: "AI", value: "ai" },
  { title: "Product", value: "product" },
  { title: "Business", value: "business" },
  { title: "Tutorial", value: "tutorial" },
];

const LANGUAGES = [
  { title: "English", value: "en" },
  { title: "Spanish", value: "es" },
  { title: "Portuguese", value: "pt" },
];

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta & SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // ── Content group ──────────────────────────────────────────
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (R) => R.required().max(300),
    }),
    defineField({
      name: "body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (R) => R.required(),
    }),

    // ── Meta group ─────────────────────────────────────────────
    defineField({
      name: "coverImage",
      type: "image",
      group: "meta",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (R) => R.required(),
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      group: "meta",
      options: { layout: "tags" },
    }),
    defineField({
      name: "category",
      type: "string",
      group: "meta",
      options: { list: CATEGORIES, layout: "radio" },
      validation: (R) => R.required(),
    }),

    // ── Settings group ─────────────────────────────────────────
    defineField({
      name: "language",
      type: "string",
      group: "settings",
      options: { list: LANGUAGES, layout: "radio" },
      initialValue: "en",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "readingTime",
      type: "number",
      group: "settings",
      description: "Estimated reading time in minutes",
      validation: (R) => R.min(1).max(60),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      category: "category",
    },
    prepare({ title, author, media, category }) {
      return {
        title,
        subtitle: `${category ?? "—"} · ${author ?? "Unknown author"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
```

### `schemaTypes/index.ts`

```typescript
import { author } from "./author";
import { blockContent } from "./blockContent";
import { post } from "./post";

export const schemaTypes = [author, blockContent, post];
```

---

## Next.js Integration

### Install packages (in the Next.js project)

```bash
cd /Users/eliazbobadilla/Documents/bobadilla.tech
npm install @sanity/client @portabletext/react @sanity/image-url
```

### `src/lib/sanity/client.ts`

```typescript
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "5j8mujwd",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // serve from Sanity CDN for public reads
});
```

### `src/lib/sanity/image.ts`

```typescript
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

### `src/lib/sanity/portable-text.tsx`

Custom component map passed to `<PortableText>`. Preserves the existing `CodeBlock` component.

```typescript
import type { PortableTextComponents } from "@portabletext/react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import Image from "next/image";
import { urlFor } from "./image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    code: ({ value }) => (
      <CodeBlock language={value.language} value={value.code} inline={false} />
    ),
    image: ({ value }) => (
      <div className="my-8 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt ?? ""}
          width={800}
          height={450}
          className="w-full"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl font-bold text-brand-primary mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl font-semibold text-brand-primary mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-lg font-semibold text-brand-primary mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-gold pl-4 italic text-brand-primary/60 my-6">{children}</blockquote>
    ),
    normal: ({ children }) => (
      <p className="font-body text-brand-primary/80 leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-surface border border-border rounded px-1.5 py-0.5 font-mono text-brand-gold text-sm">{children}</code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-brand-gold underline underline-offset-2 hover:text-brand-gold-light transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="font-body text-brand-primary/80 list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="font-body text-brand-primary/80 list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};
```

---

## GROQ Query Layer

### `src/lib/sanity/queries.ts`

Replace all functions in `src/data/blog.ts` with these GROQ-backed async functions.

```typescript
import { sanityClient } from "./client";
import type { SanityBlogPost } from "./types";

// Fragment reused in all queries
const POST_FIELDS = `
  _id,
  "id": _id,
  slug,
  title,
  description,
  body,
  author->{name, role, image},
  publishedAt,
  updatedAt,
  tags,
  category,
  readingTime,
  featured,
  coverImage,
  language
`;

export async function getAllPosts(): Promise<SanityBlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`
  );
}

export async function getFeaturedPosts(): Promise<SanityBlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc) { ${POST_FIELDS} }`
  );
}

export async function getPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { slug }
  );
}

export async function getPostsByCategory(category: string): Promise<SanityBlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && category == $category] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { category }
  );
}

export async function getPostsByTag(tag: string): Promise<SanityBlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && $tag in tags] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { tag }
  );
}

export async function getAllSlugs(): Promise<string[]> {
  const results = await sanityClient.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post"]{ slug }`
  );
  return results.map((r) => r.slug.current);
}

export async function getAllTags(): Promise<string[]> {
  const results = await sanityClient.fetch<{ tags: string[] }[]>(
    `*[_type == "post"]{ tags }`
  );
  const tagSet = new Set<string>();
  results.forEach((r) => r.tags?.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
```

### `src/lib/sanity/types.ts`

```typescript
import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImageRef {
  _type: "image";
  asset: { _ref: string };
}

export interface SanityBlogPost {
  id: string;
  slug: { current: string };
  title: string;
  description: string;
  body: PortableTextBlock[];
  author: {
    name: string;
    role: string;
    image: SanityImageRef;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: "engineering" | "ai" | "product" | "business" | "tutorial";
  readingTime: number;
  featured: boolean;
  coverImage?: SanityImageRef;
  language: "en" | "es" | "pt";
}
```

---

## Content Migration

Two existing posts need to be ingested into Sanity. The recommended approach is a one-time migration script using `@sanity/client`'s `.create()` API.

**Script location:** `studio-bobadilla-tech-blogs/scripts/migrate-posts.ts`

**Process:**
1. Create the two Author documents (Eliaz Bobadilla) — upload author image asset first.
2. Convert each post's markdown content to Portable Text using `@sanity/block-tools` or `sanity-plugin-markdown` if keeping markdown temporarily, OR manually re-enter content through the Studio editor.
3. Create each post document with all fields populated.

**Recommended migration path:**
- For the 2 existing posts, manually paste content into the Studio editor (Portable Text) — this is faster than writing a conversion script for just two posts and ensures clean formatting.
- For future posts, all authoring happens in the Studio.

**Author image upload:**
```bash
# From inside studio-bobadilla-tech-blogs/
sanity dataset import  # Or use sanity CLI asset upload
```
Copy `/public/faces/eliaz.jpeg` → upload via Studio's asset manager or `sanity documents create`.

---

## ISR & Revalidation Strategy

The site deploys to **Cloudflare Workers via OpenNext**. Standard Next.js ISR (`revalidate`) is not supported in Cloudflare Workers (no persistent cache layer between requests in the same way).

**Strategy: Build-time static generation + manual redeploy on publish.**

- `generateStaticParams()` calls `getAllSlugs()` at build time — all post pages are pre-rendered.
- Publishing a new post in Sanity triggers a Cloudflare Pages / Workers deploy via a Sanity webhook → GitHub Action or Cloudflare webhook.

**Webhook flow:**
1. Editor clicks "Publish" in Sanity Studio.
2. Sanity fires a webhook POST to a GitHub Actions dispatch URL (or Cloudflare deploy hook URL).
3. Build kicks off, fetches latest posts from Sanity CDN, generates static pages, deploys.

**Webhook endpoint (Cloudflare deploy hook):** Store the hook URL in the Sanity webhook settings. No additional Next.js API route needed.

> **Note:** If on-demand ISR with `revalidatePath` becomes supported by OpenNext on Cloudflare in the future, the queries are already set up to benefit from it with minimal changes.

---

## SEO Preservation

All SEO logic in `src/lib/seo.ts` stays unchanged. The page files continue to call `generateSEOMetadata()` with the same arguments — only the data source changes.

**Author image URL change:** `post.author.image` will be a Sanity image reference instead of a `/public/faces/` path. The `[slug]/page.tsx` renders the author image via `urlFor(post.author.image).width(64).url()` (Sanity CDN URL) instead of a static path.

**Open Graph image:** `post.coverImage` becomes `urlFor(post.coverImage).width(1200).height(630).url()` when present.

---

## i18n Considerations

The routing structure (`/[locale]/blog/[slug]`) is unchanged. Current behaviour: every locale serves the same English content.

The `language` field on post documents enables future per-locale content:

```groq
// Future: locale-aware query
*[_type == "post" && slug.current == $slug && language == $locale][0]
```

For now, `getPostBySlug` ignores `language` and returns the first match (always `en`). When ES/PT posts are added, update the query to pass `locale` as a parameter.

---

## File Changes Map

### Files to DELETE

| File | Reason |
|---|---|
| `src/data/blog-posts.ts` | Replaced by Sanity |
| `src/data/blog-content/cloudflare-workers-nextjs-deployment.ts` | Content moves to Sanity |
| `src/data/blog-content/cloudflare-domain-redirect-guide.ts` | Content moves to Sanity |
| `src/data/blog.ts` | Replaced by GROQ queries |
| `docs/BLOG_DOCUMENTATION.md` | Replace with updated authoring guide |

### Files to CREATE

| File | Purpose |
|---|---|
| `src/lib/sanity/client.ts` | Sanity client singleton |
| `src/lib/sanity/image.ts` | `urlFor()` image builder |
| `src/lib/sanity/queries.ts` | All GROQ query functions |
| `src/lib/sanity/types.ts` | TypeScript types for Sanity documents |
| `src/lib/sanity/portable-text.tsx` | `PortableText` component map |
| `studio-bobadilla-tech-blogs/` | Full Studio project (separate directory) |

### Files to MODIFY

| File | Change |
|---|---|
| `src/app/[locale]/blog/page.tsx` | Import from `~/lib/sanity/queries` instead of `~/data/blog`; add `async` data fetching |
| `src/app/[locale]/blog/[slug]/page.tsx` | Same import swap; replace `ReactMarkdown` with `<PortableText>`; fix author image to use `urlFor()` |
| `package.json` (Next.js) | Add `@sanity/client`, `@portabletext/react`, `@sanity/image-url` |
| `src/app/[locale]/blog/[slug]/page.tsx` | `generateStaticParams` calls `getAllSlugs()` |

---

## Implementation Steps

1. **Set up Studio**
   - Run the `npm create sanity@latest` command provided
   - Install `sanity-plugin-code-input` and `@sanity/image-url`
   - Add `author.ts`, `blockContent.ts`, `post.ts` schemas
   - Register plugins in `sanity.config.ts`
   - Run `npm run dev` — verify Studio loads at `localhost:3333`

2. **Create Author documents in Studio**
   - Upload `/public/faces/eliaz.jpeg` via Studio asset manager
   - Create Eliaz Bobadilla author document with name, role, image

3. **Migrate existing posts**
   - Create each post document manually in Studio
   - Copy-paste titles, descriptions, tags, categories, dates
   - Re-enter body content using Studio's rich text editor
   - Set `readingTime` from existing values (6 and 9)

4. **Install packages in Next.js project**
   ```bash
   npm install @sanity/client @portabletext/react @sanity/image-url
   ```

5. **Create `src/lib/sanity/` module files**
   - `client.ts`, `image.ts`, `queries.ts`, `types.ts`, `portable-text.tsx`

6. **Update `src/app/[locale]/blog/page.tsx`**
   - Change imports from `~/data/blog` → `~/lib/sanity/queries`
   - Make the component async (it already is)
   - Change `getAllPosts()` / `getPostsByCategory()` / `getPostsByTag()` calls to use `await`
   - Author image: `urlFor(post.author.image).width(32).url()` → pass as `src` to `<Image>`

7. **Update `src/app/[locale]/blog/[slug]/page.tsx`**
   - Swap imports; make data functions async
   - Replace `<ReactMarkdown>` block with `<PortableText value={post.body} components={portableTextComponents} />`
   - Fix author image with `urlFor()`
   - Remove `remark-gfm` import (no longer needed)

8. **Update `generateStaticParams`**
   - Call `await getAllSlugs()` instead of sync `getAllPosts()`

9. **Delete old data files**
   - `src/data/blog.ts`, `src/data/blog-posts.ts`, `src/data/blog-content/`

10. **Set up Cloudflare deploy webhook**
    - Get deploy hook URL from Cloudflare dashboard
    - Add webhook in Sanity project settings → API → Webhooks
    - Trigger: on `post` document publish
    - URL: Cloudflare deploy hook

11. **Smoke test**
    - `npm run build` — verify static pages generate
    - Visit `/blog`, `/blog/cloudflare-workers-nextjs-deployment` locally
    - Verify author images load, code blocks render with syntax highlighting
    - Verify SEO metadata is correct
    - Publish a test post in Studio → verify deploy hook fires

12. **Update authoring docs**
    - Replace `docs/BLOG_DOCUMENTATION.md` with a Sanity Studio guide

---

## Checklist

- [ ] Studio project initialized at `studio-bobadilla-tech-blogs/`
- [ ] `post`, `author`, `blockContent` schemas created
- [ ] `sanity-plugin-code-input` installed and registered
- [ ] Author document created for Eliaz Bobadilla in Sanity
- [ ] Both existing posts migrated to Sanity with body, tags, dates
- [ ] `@sanity/client`, `@portabletext/react`, `@sanity/image-url` installed in Next.js
- [ ] `src/lib/sanity/` module created (client, image, queries, types, portable-text)
- [ ] `blog/page.tsx` updated — no references to `~/data/blog`
- [ ] `blog/[slug]/page.tsx` updated — PortableText renders, author image via `urlFor()`
- [ ] `src/data/blog.ts`, `src/data/blog-posts.ts`, `src/data/blog-content/` deleted
- [ ] `npm run build` succeeds with 0 type errors
- [ ] All blog routes render correctly in browser
- [ ] Cloudflare deploy webhook configured in Sanity
- [ ] Authoring documentation updated
