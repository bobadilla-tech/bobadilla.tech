# Blog Development Guide

## Live Reloading for Blog Posts

The blog system now supports **automatic hot reloading** when you edit markdown
files during development!

### How It Works

When you run `pnpm dev`, two processes start automatically:

1. **Next.js dev server** - Your normal development server
2. **Blog file watcher** - Monitors markdown files and regenerates
   `blog-posts.ts`

### Development Commands

```bash
# Start dev server with blog hot reloading (recommended)
pnpm dev

# Alternative: Run only Next.js dev server (no blog reloading)
pnpm run dev:next

# Alternative: Run only blog watcher (in separate terminal)
pnpm run dev:blog
```

### What Gets Watched

The watcher monitors: `src/content/blog/*.md` and `src/content/blog/*.mdx`

**Auto-regenerates when:**

- ✅ You create a new blog post
- ✅ You edit existing blog posts
- ✅ You delete blog posts
- ✅ You rename blog posts

**Ignores:**

- ❌ `README.md` files
- ❌ Draft posts (files starting with `_`)

### Hot Reload Flow

```
1. Edit markdown file (e.g., cloudflare-workers-nextjs-deployment.md)
   ↓
2. File watcher detects change (300ms debounce)
   ↓
3. Regenerates src/data/blog-posts.ts
   ↓
4. Next.js detects TypeScript file change
   ↓
5. Browser automatically refreshes with updated content ✨
```

### Debouncing

Changes are debounced for 300ms to avoid regenerating on every keystroke. This
means:

- Save your file
- Wait ~300ms
- See the update in your browser

### Troubleshooting

**Changes not showing up?**

1. Check the terminal - you should see:

   ```
   📝 Blog change detected: your-post.md
   🔄 Regenerating blog data...
   ✅ Blog data updated - Next.js will hot reload
   ```

2. Verify the file is being saved (some editors have auto-save delays)

3. Check that your file doesn't start with `_` (draft prefix)

4. Try manually regenerating:
   ```bash
   pnpm run generate-blog-data
   ```

**Watcher not starting?**

If the integrated dev command fails, run processes separately:

```bash
# Terminal 1
pnpm run dev:next

# Terminal 2
pnpm run dev:blog
```

### Writing Blog Posts

1. Create a new markdown file in `src/content/blog/`:

   ```bash
   touch src/content/blog/my-new-post.md
   ```

2. Add frontmatter:

   ```yaml
   ---
   title: "My New Post"
   description: "Brief summary"
   author: "Your Name"
   publishedAt: "2026-02-02"
   tags: ["Next.js", "Tutorial"]
   category: "engineering"
   featured: false
   ---
   ```

3. Write content in markdown

4. Save - the watcher will automatically regenerate blog data

5. View at: `http://localhost:3000/blog/my-new-post`

### Draft System

Prefix files with `_` to work on drafts without publishing:

```bash
# Draft (not published)
src/content/blog/_work-in-progress.md

# Published (remove underscore)
src/content/blog/work-in-progress.md
```

### Production Build

The watcher is **development-only**. Production builds use:

```bash
pnpm run build
# Runs generate-blog-data once, then builds
```

This ensures blog data is always up-to-date in production deployments.
