# Tools Directory - Documentation

## ✅ What's Been Built

### 📁 Structure Created

```
src/
├── app/
│   └── tools/
│       ├── page.tsx                    # Tools listing page
│       └── reddit-post-date/
│           └── page.tsx                # Reddit Post Date Extractor
└── components/
    └── tools/                          # Future tool components
```

---

## 🛠️ Current Tools

### 1. Reddit Post Date Extractor

**URL**: `/tools/reddit-post-date`

**Features:**

- ✅ Extracts exact creation date from Reddit posts
- ✅ Shows both UTC and local timezone
- ✅ Copy to clipboard functionality
- ✅ Client-side processing (privacy-focused)
- ✅ Uses Reddit's JSON API
- ✅ No data storage - all processing in browser

**How it works:**

1. User pastes Reddit URL
2. Tool extracts post ID from URL
3. Fetches post data from Reddit's JSON API
4. Displays creation timestamp in both UTC and local time
5. Provides copy buttons for easy sharing

**Use Cases:**

- Research & journalism
- Fact-checking & verification
- Academic citations
- Digital archiving

---

## 📍 Navigation Updates

### Navbar - Resources Dropdown

- ✅ "Tools" link now points to `/tools` (was `#tools`)
- ✅ Updated in both desktop and mobile menus
- ✅ Maintains dropdown functionality

### Tools Listing Page

**Location**: `/tools`

**Features:**

- Tool categories
- Search-friendly layout
- Tool descriptions with tags
- "More tools coming soon" section
- Benefits section (Free, Privacy-focused, No sign-up)

---

## 🎨 Design Features

### Consistent Styling

- Matches main site design (dark theme, cyan/blue gradients)
- Glassmorphism effects
- Smooth animations on hover
- Responsive layout

### User Experience

- Breadcrumb navigation
- Clear instructions
- Loading states
- Error handling
- Success feedback with copy confirmation

---

## 🔧 Technical Implementation

### Reddit Post Date Extractor

**Utilities Location:**

```
src/app/tools/reddit-post-date/utils.ts
```

Each tool contains its own utils file within the tool directory for better
modularity.

**API Endpoint:**

```
https://www.reddit.com/r/subreddit/comments/post_id/.json
```

**URL Pattern Validation:**

```regex
/reddit\.com\/r\/[^/]+\/comments\/([a-z0-9]+)/i
```

**Data Extraction:**

```typescript
const postData = data[0]?.data?.children[0]?.data;
const timestamp = postData.created_utc * 1000;
```

**Date Formatting:**

- UTC: `date.toUTCString()`
- Local: `date.toLocaleString()` with full options

---

## 🚀 Adding New Tools

### Template Structure:

```tsx
// src/app/tools/[tool-name]/page.tsx
"use client";

import Navbar from "@/components/ui/Navbar";
import Link from "next/link";

export default function ToolName() {
	return (
		<div className="relative min-h-screen bg-slate-950">
			<Navbar />
			<main className="relative z-10 pt-32 pb-24">{/* Tool content */}</main>
		</div>
	);
}
```

### Steps to Add a New Tool:

1. **Create tool directory:**

   ```bash
   mkdir -p src/app/tools/[tool-slug]
   ```

2. **Create page component:**

   ```bash
   touch src/app/tools/[tool-slug]/page.tsx
   ```

3. **Update tools listing:** Edit `src/app/tools/page.tsx` and add to `tools`
   array:

   ```typescript
   {
     id: 'tool-id',
     name: 'Tool Name',
     description: 'Tool description',
     icon: IconComponent,
     slug: 'tool-slug',
     category: 'Category',
     tags: ['tag1', 'tag2']
   }
   ```

4. **Import icon:**
   ```typescript
   import { IconName } from "lucide-react";
   ```

---

## 📊 SEO & Metadata

### Tools Listing Page

```typescript
export const metadata: Metadata = {
	title: "Free Tools - Boba Tech",
	description:
		"Free online tools for developers, researchers, and content creators.",
};
```

### Individual Tool Pages

Add metadata to each tool page for better SEO.

---

## 🔒 Privacy & Security

### Data Handling

- ✅ No server-side storage
- ✅ No tracking or analytics on tool usage
- ✅ All processing happens client-side
- ✅ No user data collected

### API Calls

- Only to public APIs (Reddit JSON)
- No authentication required
- No proxying through our servers

---

## 📱 Responsive Design

### Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Optimizations

- Touch-friendly buttons
- Readable font sizes
- Simplified layouts
- Collapsible sections

---

## 🎯 Future Tools Ideas

### Social Media Tools

- Twitter/X Thread Unroller
- Instagram Post Downloader
- TikTok Video Info Extractor

### Developer Tools

- JSON Formatter & Validator
- Base64 Encoder/Decoder
- UUID Generator
- Hash Generator (MD5, SHA)
- RegEx Tester

### Text Tools

- Word Counter
- Character Counter
- Case Converter
- Markdown Preview

### Image Tools

- Image Compressor
- Format Converter
- EXIF Data Viewer

---

## 🧪 Testing

### Test Reddit URLs:

```
https://www.reddit.com/r/help/comments/115a9aq/how_to_see_exact_date_when_you_made_a_post/
https://www.reddit.com/r/programming/comments/abc123/test_post/
```

### Test Cases:

- ✅ Valid Reddit URL
- ✅ Invalid URL format
- ✅ Non-existent post
- ✅ Private/deleted post
- ✅ Old post (years ago)
- ✅ Recent post (minutes ago)

---

## 📈 Analytics (Future)

Consider adding:

- Tool usage counts (privacy-friendly)
- Popular tools tracking
- Feature requests
- Error tracking

---

## 🔗 Links

- Tools Listing: http://localhost:3001/tools
- Reddit Extractor: http://localhost:3001/tools/reddit-post-date
- Navbar: Updated with `/tools` link

---

**Status**: ✅ Complete and functional **Last Updated**: December 3, 2025
