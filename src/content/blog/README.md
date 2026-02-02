# Blog Posts

This directory contains all blog posts for the Bobadilla Tech website. Each blog post is a separate markdown file.

## How to Add a New Blog Post

### 1. Create a New Markdown File

Create a new `.md` file in this directory. The filename will become the URL slug.

**Example:** `my-awesome-post.md` → `/blog/my-awesome-post`

**Naming conventions:**
- Use lowercase letters
- Separate words with hyphens
- Keep it short but descriptive
- Make it SEO-friendly

### 2. Add Frontmatter

Every blog post **must** start with frontmatter (metadata between `---` markers):

```markdown
---
title: "Your Post Title"
description: "A brief description of your post (used for SEO and previews)"
author: "Your Name"
authorRole: "Your Role"
publishedAt: "2026-02-01"
tags: ["Tag1", "Tag2", "Tag3"]
category: "engineering"
featured: false
coverImage: "/blog/your-image.png"
---
```

#### Required Fields:
- **title**: The post title (shown on the page and in listings)
- **description**: Brief summary (150-200 characters ideal)
- **publishedAt**: Date in `YYYY-MM-DD` format

#### Optional Fields:
- **author**: Author name (defaults to "Bobadilla Tech Team")
- **authorRole**: Author's role (defaults to "Engineering")
- **updatedAt**: Date when post was last updated
- **tags**: Array of tags for filtering
- **category**: One of: `"engineering"`, `"ai"`, `"product"`, `"business"`, `"tutorial"`
- **featured**: `true` to feature on homepage (defaults to `false`)
- **coverImage**: Path to cover image (optional)

**Note:** Reading time is automatically calculated from your content!

### 3. Write Your Content

After the frontmatter, write your post content in standard Markdown:

```markdown
---
title: "My Post"
description: "Description here"
publishedAt: "2026-02-01"
tags: ["Next.js", "Tutorial"]
category: "engineering"
---

# Main Heading

Your introduction paragraph...

## Section 1

Content here with **bold** and *italic* text.

### Subsection

- Bullet points
- Are supported
- Like this

## Section 2

1. Numbered lists
2. Work too
3. See?

Code blocks:

\`\`\`typescript
function example() {
  return "Hello World";
}
\`\`\`

[Links work too](https://example.com)
```

### 4. Supported Markdown Features

- **Headings**: `#`, `##`, `###` (H1-H3)
- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Lists**: `-` or `*` for bullets, `1.` for numbered
- **Code**: `` `inline` `` or ` ```language ` for blocks
- **Blockquotes**: `> quote`
- **Tables** (via remark-gfm)
- **Strikethrough**: `~~text~~` (via remark-gfm)

### 5. Preview Your Post

Run the dev server and navigate to `/blog/your-post-slug`:

```bash
npm run dev
```

Visit: `http://localhost:3000/blog/your-post-slug`

## Example Post

See any of the existing `.md` files in this directory for complete examples:
- `rapid-mvp-development-nextjs.md`
- `ai-integration-best-practices.md`
- `cloudflare-workers-nextjs-deployment.md`

## Tips

1. **Keep it focused**: One main topic per post
2. **Use headings**: Break content into scannable sections
3. **Add examples**: Code examples and real-world scenarios help
4. **Proofread**: Check spelling and grammar before committing
5. **SEO-friendly**: Use keywords naturally in title and description
6. **Images**: Store in `/public/blog/` and reference as `/blog/image.png`

## Troubleshooting

**Post not showing up?**
- Check frontmatter syntax (must have `---` before and after)
- Verify `publishedAt` is not in the future
- Ensure filename ends with `.md` or `.mdx`
- Restart dev server after creating new files

**Reading time seems wrong?**
- Reading time auto-calculates based on ~225 words per minute
- Includes all text content, excludes code blocks and images
- No action needed - it's automatic!

## Need Help?

Ask the team in Slack or check the main project README for more documentation.
