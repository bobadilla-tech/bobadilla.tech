# 📝 Adding a New Blog Post

### Quick Start

1. **Create a markdown file** in `src/content/blog/`:

   ```bash
   touch src/content/blog/my-awesome-post.md
   ```

2. **Add frontmatter** (metadata):

   ```markdown
   ---
   title: "Your Post Title"
   description: "Brief description for SEO and previews"
   author: "Eliaz Bobadilla"
   publishedAt: "2026-02-02"
   tags: ["Next.js", "Tutorial"]
   category: "engineering"
   featured: false
   ---

   # Your Content Here

   Write your post content in markdown...
   ```

3. **Build and deploy**:
   ```bash
   npm run build    # Generates static pages
   npm run deploy   # Deploy to Cloudflare
   ```

---

## 📝 Draft Posts

Posts prefixed with `_` are treated as **drafts** and excluded from the build. This allows you to work on blog posts without publishing them.

### How It Works

The blog loader (`src/data/blog.ts`) automatically filters out any files that start with an underscore:

```typescript
const isNotDraft = !file.startsWith("_");
```

**Draft posts:**

- ❌ Are NOT included in blog listing (`/blog`)
- ❌ Are NOT accessible via URL (404 error)
- ❌ Are NOT built during deployment
- ✅ Are only visible in the source code repository

### Creating a Draft

**Option 1: Create new file with underscore prefix**

```bash
touch src/content/blog/_my-draft-post.md
```

**Option 2: Convert existing post to draft**

```bash
mv src/content/blog/my-post.md src/content/blog/_my-post.md
```

### Publishing a Draft

Simply remove the underscore prefix:

```bash
mv src/content/blog/_my-post.md src/content/blog/my-post.md
```

Then commit, build, and deploy as normal.

### Use Cases for Drafts

- **Work in progress**: Write posts over multiple sessions
- **Pending review**: Team members can review before publishing
- **Future content**: Plan upcoming posts without publishing
- **Internal documentation**: Keep notes that aren't meant for public

### Example Workflow

```bash
# 1. Create draft
touch src/content/blog/_nextjs-performance-tips.md

# 2. Write content, commit to Git
git add src/content/blog/_nextjs-performance-tips.md
git commit -m "Draft: Add Next.js performance tips"

# 3. Test locally (won't appear on /blog)
npm run dev

# 4. When ready to publish, rename
mv src/content/blog/_nextjs-performance-tips.md src/content/blog/nextjs-performance-tips.md

# 5. Commit and deploy
git add src/content/blog/nextjs-performance-tips.md
git commit -m "Publish: Next.js performance tips"
npm run build
npm run cf:deploy
```

---

## 👥 Blog Authors

We have **3 authorized blog authors**. Each author has a profile picture that automatically appears on their posts.

### Available Authors:

| Author Name          | Image File      | Example Usage                |
| -------------------- | --------------- | ---------------------------- |
| **Eliaz Bobadilla**  | `eliaz.jpeg`    | `author: "Eliaz Bobadilla"`  |
| **Alexandra Flores** | `alexandra.png` | `author: "Alexandra Flores"` |
| **Leonardo Estacio** | `leo.jpeg`      | `author: "Leonardo Estacio"` |

**Author faces are stored in:** `public/faces/`

### Setting Author in Frontmatter:

```markdown
---
title: "My Post"
author: "Eliaz Bobadilla"
authorRole: "Senior Engineer"
---
```

**Author display includes:**

- Profile picture (circular avatar)
- Name
- Role (optional)

---

## 📋 Frontmatter Fields

### Required Fields:

- **title** - Post title (max 60 chars for SEO)
- **description** - Brief summary (150-200 chars)
- **publishedAt** - Date in `YYYY-MM-DD` format

### Optional Fields:

- **author** - Author name (defaults to "Bobadilla Tech Team")
  - Must be one of: "Eliaz Bobadilla", "Alexandra Flores", "Leonardo Estacio"
- **authorRole** - Author's role (e.g., "Senior Engineer")
- **updatedAt** - Last updated date (`YYYY-MM-DD`)
- **tags** - Array of tags: `["Tag1", "Tag2"]`
- **category** - One of:
  - `"engineering"` (default)
  - `"ai"`
  - `"product"`
  - `"business"`
  - `"tutorial"`
- **featured** - `true` to feature on homepage (default: `false`)
- **coverImage** - Path to cover image (e.g., `/blog/image.png`)

**Note:** Reading time is **auto-calculated** from content!

---

## ✍️ Writing Content

### Supported Markdown:

```markdown
# H1 Heading

## H2 Heading

### H3 Heading

**Bold text**
_Italic text_
~~Strikethrough~~

[Links](https://example.com)
![Images](/path/to/image.png)

- Bullet lists
- Item 2

1. Numbered lists
2. Item 2

`inline code`

\`\`\`typescript
// Code blocks with syntax highlighting
function example() {
return "Hello";
}
\`\`\`

> Blockquotes
> Multi-line quotes

| Tables | Are | Supported |
| ------ | --- | --------- |
| Cell 1 | C2  | C3        |
```

### Writing Tips:

1. **Keep it focused** - One main topic per post
2. **Use headings** - Break content into scannable sections
3. **Add examples** - Code samples and real-world scenarios
4. **Proofread** - Check spelling and grammar
5. **SEO-friendly** - Use keywords naturally in title/description

---

## 🖼️ Adding Images

### Store images in:

```
public/blog/your-image.png
```

### Reference in markdown:

```markdown
![Alt text](/blog/your-image.png)
```

### For cover images (frontmatter):

```markdown
---
coverImage: "/blog/cover-image.png"
---
```

---

## 🏷️ Categories & Tags

### Categories:

Use categories to organize posts by main topic:

- **engineering** - Technical posts, architecture, development
- **ai** - AI/ML integration, GPT, automation
- **product** - Product updates, features, roadmaps
- **business** - Business insights, case studies
- **tutorial** - Step-by-step guides

### Tags:

Use tags for specific topics (3-5 tags per post):

```markdown
tags: ["Next.js", "TypeScript", "Cloudflare", "Performance"]
```

**Common tags:**

- Technologies: "Next.js", "React", "TypeScript", "Node.js"
- Topics: "MVP", "Deployment", "Performance", "SEO"
- Concepts: "Best Practices", "Tutorial", "Guide"

---

## 📱 Blog Features

### Blog Listing Page (`/blog`)

- Filter by category
- Filter by tag
- Responsive grid layout
- Featured posts highlighted
- Empty state when no posts match filter

### Individual Post Page (`/blog/[slug]`)

- Full markdown rendering
- Author info with profile picture
- Reading time (auto-calculated)
- Tags (clickable to filter)
- Related posts
- Share buttons
- Back navigation

---

## ⚡ Performance

### Build-Time Generation:

All blog posts are **pre-rendered at build time**:

```
Build Process:
├─ Read all .md files from src/content/blog/
├─ Parse frontmatter and content
├─ Calculate reading time
├─ Generate static HTML for each post
└─ Deploy to Cloudflare CDN

Runtime:
└─ Serve pre-generated HTML (0ms, edge-deployed)
```

### Benefits:

- **Zero runtime file reads** (all done at build)
- **Lightning fast** (served from CDN)
- **SEO-friendly** (fully static HTML)
- **Auto-indexed** (generates sitemap)

---

## 🔍 SEO Features

Each blog post automatically includes:

- **Open Graph** tags (Facebook, LinkedIn)
- **Twitter Card** metadata
- **Canonical URLs**
- **Structured data** (JSON-LD schema)
- **Auto-generated sitemap** entry
- **Meta descriptions**
- **Dynamic reading time**

---

## 🚀 Publishing Workflow

### 1. Write Your Post

Create `.md` file with frontmatter and content

### 2. Preview Locally

```bash
npm run dev
# Visit: http://localhost:3000/blog/your-post-slug
```

### 3. Build

```bash
npm run build
# Verifies all posts compile correctly
```

### 4. Deploy

```bash
npm run deploy
# Pushes to Cloudflare Workers
```

### 5. Verify

Visit: `https://bobadilla.tech/blog/your-post-slug`

---

## 🐛 Troubleshooting

### Post not showing up?

- ✅ Check frontmatter syntax (must have `---` before and after)
- ✅ Verify `publishedAt` is not in the future
- ✅ Ensure filename ends with `.md` or `.mdx`
- ✅ Restart dev server after creating new files
- ✅ Check for syntax errors in frontmatter (YAML format)

### Reading time seems wrong?

Reading time auto-calculates based on ~225 words per minute.

- Includes all text content
- Excludes code blocks and images
- No action needed - it's automatic!

### Author face not showing?

- ✅ Check author name exactly matches one of the 3 available authors
- ✅ Verify image exists in `public/faces/`
- ✅ Author names are case-sensitive

### Build errors?

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

---

## 📂 File Organization

### Naming Convention:

Use kebab-case for filenames:

✅ Good:

- `rapid-mvp-development.md`
- `ai-integration-guide.md`
- `nextjs-performance-tips.md`

❌ Bad:

- `Rapid MVP Development.md`
- `ai_integration_guide.md`
- `NextJsPerformanceTips.md`

### File becomes URL:

```
my-awesome-post.md  →  /blog/my-awesome-post
```

---

## 📊 Example Post Templates

### Tutorial Post:

```markdown
---
title: "Building Your First Next.js App"
description: "A step-by-step guide to creating a modern web app with Next.js 16"
author: "Eliaz Bobadilla"
authorRole: "Senior Engineer"
publishedAt: "2026-02-02"
tags: ["Next.js", "Tutorial", "Beginner"]
category: "tutorial"
featured: true
---

# Building Your First Next.js App

Introduction paragraph...

## Prerequisites

- Node.js 18+
- Basic React knowledge

## Step 1: Setup

\`\`\`bash
npx create-next-app@latest
\`\`\`

...
```

### Case Study Post:

```markdown
---
title: "How We Reduced Load Time by 60%"
description: "A case study on optimizing Next.js performance for a SaaS app"
author: "Alexandra Flores"
authorRole: "Tech Lead"
publishedAt: "2026-02-02"
tags: ["Performance", "Case Study", "Next.js"]
category: "engineering"
featured: true
coverImage: "/blog/performance-study.png"
---

# How We Reduced Load Time by 60%

Introduction...

## The Problem

Our app was slow...

## Our Approach

We implemented...

## Results

- 60% faster load time
- 40% better Core Web Vitals
- 25% increase in conversions
```

---

## 🔗 Related Documentation

- [Tools Documentation](./TOOLS_DOCUMENTATION.md)
- [Architecture Summary](./ARCHITECTURE_SUMMARY.md)
- [Main README](../README.md)

---

**Status**: ✅ Active
**Last Updated**: February 2, 2026
**Maintained By**: Bobadilla Tech Team
