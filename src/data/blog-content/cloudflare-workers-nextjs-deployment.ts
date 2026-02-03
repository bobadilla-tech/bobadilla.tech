export const content = `# Deploying Next.js 16 to Cloudflare Workers: A Complete Architecture Guide

Building a production-ready Next.js application that's blazingly fast, globally distributed, and cost-effective is completely achievable with Cloudflare Workers. In this comprehensive guide, I'll walk you through exactly how we built [bobadilla.tech](https://bobadilla.tech), including the architecture decisions, deployment process, and performance optimizations that resulted in sub-50ms response times worldwide.

**What you'll learn:**

- How to deploy Next.js 16 to Cloudflare's edge network using OpenNext.js
- Building a TypeScript-based blog system with inline markdown
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

---

## 2. TypeScript-Based Blog System

Blog posts are implemented as TypeScript modules containing Markdown strings. They’re fully version-controlled, statically bundled into the application, and served with zero runtime I/O.

This setup works well for our current needs: a lightweight internal blog maintained by developers, deployed on Cloudflare Workers (which has no filesystem access). When content volume increases, we’ll transition to a headless CMS like Contentful or Sanity, consistent with the production architectures we build for clients.

### Why TypeScript Modules with Inline Markdown?

**Advantages:**

- **Version control**: Blog posts live in Git alongside code - full history, branching, and collaboration
- **Edge-compatible**: No Node.js file system APIs needed at runtime (works in Cloudflare Workers)
- **Zero latency**: Posts are pre-bundled into JavaScript, no I/O at request time
- **Type-safe**: TypeScript knows the exact shape of your blog data
- **Direct editing**: Edit markdown in your IDE with full syntax highlighting
- **Simple backup**: Just commit to Git
- **No build scripts**: No markdown processing or compilation needed
- **Guaranteed bundling**: TypeScript modules are always bundled correctly

**Trade-offs:**

- **Bundle size impact**: Blog content is included in the JavaScript bundle
- **No WYSIWYG editor**: Team members edit markdown in code editor (we prefer this!)
- **Rebuild to publish**: Need to redeploy to update content (acceptable for blogs)

**Why this works for us:** This approach is perfect for our internal company blog because we're all developers. We love writing in markdown, are comfortable in our code editors (VS Code, Neovim, etc.), and the Git-based workflow feels natural. Since we have client work to focus on, this zero-maintenance solution lets us publish technical content without managing a CMS.

**For production client work:** We typically implement more robust solutions like headless CMS platforms (Contentful, Sanity, Strapi), WordPress with REST/GraphQL APIs, or custom admin panels depending on client needs. Check our [CMS Development services](/services/cms-development) and [Web Development solutions](/services/web-development) to see what we build for clients who need content management at scale.

### Blog Data Structure

Here's how we structure blog posts as TypeScript objects:

\`\`\`typescript
// src/data/blog-posts.ts
import { content as post1Content } from "./blog-content/my-post";

export const blogPosts: BlogPost[] = [
  {
    slug: "my-blog-post",
    title: "My Blog Post Title",
    description: "Short description for SEO",
    content: post1Content,
    author: {
      name: "Eliaz Bobadilla",
      role: "Senior Engineer",
      image: "/faces/eliaz.jpeg",
    },
    publishedAt: "2026-02-03",
    category: "engineering",
    tags: ["nextjs", "cloudflare", "deployment"],
    readingTime: 6,
    featured: true,
  }
];
\`\`\`

### Benefits of This Approach

1. **No Build Scripts**: No markdown processing pipeline needed
2. **Full IDE Support**: Syntax highlighting, autocomplete, type checking
3. **Git Friendly**: Clean diffs, easy reviews
4. **Reliable Bundling**: TypeScript modules are guaranteed to be bundled
5. **Zero Runtime I/O**: Everything is pre-bundled JavaScript

### Rendering with React Markdown

At runtime, we use \`react-markdown\` to render the markdown content. To keep Worker bundle sizes under limits, we moved the syntax highlighter to a client component:

\`\`\`typescript
// src/components/ui/CodeBlock.tsx
"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CodeBlock({ language, children }) {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {children}
    </SyntaxHighlighter>
  );
}
\`\`\`

This prevents the 500KB+ syntax highlighter library from being bundled into the server Worker, keeping it under Cloudflare's resource limits.

---

## 3. Static Generation Strategy

Static Site Generation (SSG) is the secret sauce that makes this architecture blazingly fast.

### generateStaticParams()

In \`src/app/blog/[slug]/page.tsx\`, we tell Next.js to pre-generate every blog post route at build time:

\`\`\`typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
\`\`\`

**What happens at runtime (Cloudflare Workers):**

Unlike traditional static hosting where HTML files are served directly from a CDN, OpenNext on Cloudflare Workers works differently:

1. Request hits the Cloudflare Worker
2. Worker loads the **pre-rendered HTML** from the build
3. Worker serves the HTML through its runtime

**Why this matters:**

- ✅ Pages ARE pre-rendered (no React rendering at runtime)
- ✅ SEO-perfect: Search engines get fully-rendered HTML
- ⚠️ But pages still go through the Worker (not pure static files)
- ⚠️ Worker must stay under resource limits (CPU/memory)

---

## 4. Cloudflare Workers Deployment

Now let's dive into the deployment setup.

### Why Cloudflare Workers?

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

### OpenNext.js Configuration

OpenNext.js transforms your Next.js build into Worker-compatible code.

**Build scripts in \`package.json\`:**

\`\`\`json
{
  "scripts": {
    "build": "next build && opennextjs-cloudflare build",
    "cf:deploy": "wrangler deploy"
  }
}
\`\`\`

**What happens during build:**

1. \`next build\` creates optimized production build
2. \`opennextjs-cloudflare build\` transforms it to Worker-compatible code
3. Static assets extracted to \`.open-next/assets/\`
4. Worker entry point created

---

## 5. Performance Optimizations

### Image Optimization

We disabled Next.js image optimization for Cloudflare Workers compatibility:

\`\`\`javascript
// next.config.js
module.exports = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
};
\`\`\`

### Lazy Loading Heavy Components

We moved THREE.js ShaderBackground to a lazy-loaded client component to reduce Worker CPU usage:

\`\`\`typescript
// src/components/shaders/ShaderBackgroundLazy.tsx
"use client";

import dynamic from "next/dynamic";

const ShaderBackground = dynamic(
  () => import("@/components/shaders/ShaderBackground"),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 -z-10 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />
  }
);

export default ShaderBackground;
\`\`\`

This prevents THREE.js from executing during SSR, keeping Worker CPU usage under limits.

---

## 6. SEO Implementation

### Metadata Strategy

Our \`src/lib/seo.ts\` utility generates comprehensive metadata for every page with Open Graph tags, Twitter Cards, and canonical URLs.

### Sitemap Generation

Dynamic sitemap generated at \`src/app/sitemap.ts\`:

\`\`\`typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    ...posts.map((post) => ({
      url: \`\${BASE_URL}/blog/\${post.slug}\`,
      lastModified: post.updatedAt || post.publishedAt,
      priority: 0.8,
    })),
  ];
}
\`\`\`

---

## 7. Conclusion

We've built a production-ready Next.js application that's fast, scalable, cost-effective, and developer-friendly. Here's what makes this architecture special:

**Performance wins:**

- **Sub-50ms TTFB** from anywhere in the world
- **Zero cold starts** compared to traditional serverless
- **Static generation** for instant page loads
- **Automatic caching** on Cloudflare's CDN

**Cost efficiency:**

- **100,000 requests/day free**
- **$5/month for 10 million requests** at scale
- **No bandwidth charges**
- **Included SSL certificates** and DDoS protection

**Developer experience:**

- **Type-safe everything**: TypeScript + Zod + Drizzle
- **Fast builds**: Turbopack for quick iteration
- **Simple deployment**: One command to go live
- **Full source code** available on GitHub

This architecture demonstrates how modern edge computing can deliver exceptional performance at a fraction of traditional infrastructure costs.

---

**Questions or feedback?** Open an issue on [GitHub](https://github.com/bobadilla-tech/agency-landing) or reach out to us at [ale@bobadilla.tech](mailto:ale@bobadilla.tech).

**Want help building your Next.js application?** We offer development services and consulting - [get in touch](https://bobadilla.tech/#contact).`;
