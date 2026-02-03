// Manually maintained blog posts
// Edit content files in ./blog-content/ to update blog posts

import type { BlogPost } from "./blog";
import { content as cloudflareWorkersContent } from "./blog-content/cloudflare-workers-nextjs-deployment";
import { content as cloudflareRedirectContent } from "./blog-content/cloudflare-domain-redirect-guide";

export const blogPosts: BlogPost[] = [
	{
		id: "cloudflare-domain-redirect-guide",
		slug: "cloudflare-domain-redirect-guide",
		title: "Mastering Domain Redirects in Cloudflare: A Complete Guide",
		description:
			"Learn how to properly redirect domains in Cloudflare, troubleshoot common issues like Error 522, and avoid DNS pitfalls. Real-world examples included.",
		content: cloudflareRedirectContent,
		author: {
			name: "Eliaz Bobadilla",
			role: "Senior Engineer",
			image: "/faces/eliaz.jpeg",
		},
		publishedAt: "2026-02-10",
		updatedAt: "2026-02-10",
		tags: [
			"Cloudflare",
			"DNS",
			"Redirect Rules",
			"DevOps",
			"Domain Management",
			"Troubleshooting",
		],
		category: "engineering",
		readingTime: 9,
		featured: true,
	},
	{
		id: "cloudflare-workers-nextjs-deployment",
		slug: "cloudflare-workers-nextjs-deployment",
		title:
			"Deploying Next.js 16 to Cloudflare Workers: A Complete Architecture Guide",
		description:
			"Learn how we built bobadilla.tech with Next.js 16, Cloudflare Workers, and D1. Full architecture breakdown with source code.",
		content: cloudflareWorkersContent,
		author: {
			name: "Eliaz Bobadilla",
			role: "Senior Engineer",
			image: "/faces/eliaz.jpeg",
		},
		publishedAt: "2026-02-02",
		updatedAt: "2026-02-02",
		tags: [
			"Next.js",
			"Cloudflare",
			"Workers",
			"OpenNext",
			"Architecture",
			"Edge Computing",
			"D1",
			"TypeScript",
		],
		category: "engineering",
		readingTime: 6,
		featured: true,
	},
];
