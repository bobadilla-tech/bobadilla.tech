/**
 * Blog Post Data
 * Central repository for blog posts
 */

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	description: string;
	content: string;
	author: {
		name: string;
		role: string;
	};
	publishedAt: string; // ISO date string
	updatedAt?: string; // ISO date string
	tags: string[];
	category: "engineering" | "ai" | "product" | "business" | "tutorial";
	readingTime: number; // minutes
	featured: boolean;
	coverImage?: string;
}

export const blogPosts: BlogPost[] = [
	{
		id: "1",
		slug: "rapid-mvp-development-nextjs",
		title: "How We Build MVPs in Days, Not Months",
		description:
			"Learn our battle-tested approach to rapid MVP development using Next.js, TypeScript, and modern development tools.",
		content: `
# How We Build MVPs in Days, Not Months

At Bobadilla Tech, we've perfected the art of rapid MVP development. Here's how we do it.

## Our Stack

We use Next.js 16 with the App Router, TypeScript for type safety, and deploy on Cloudflare Workers for edge performance.

## The Process

1. **Day 1**: Requirements gathering and architecture planning
2. **Days 2-4**: Core feature development
3. **Day 5**: Testing and deployment

## Key Principles

- Start with the core value proposition
- Use proven technologies
- Deploy early and iterate
- Focus on user feedback

This approach has helped us launch over 50 successful MVPs for startups across LATAM.
		`,
		author: {
			name: "Bobadilla Tech Team",
			role: "Engineering",
		},
		publishedAt: "2026-02-01T00:00:00Z",
		tags: ["MVP", "Next.js", "Rapid Development", "Startup"],
		category: "engineering",
		readingTime: 5,
		featured: true,
		coverImage: "/blog/mvp-development.png",
	},
	{
		id: "2",
		slug: "ai-integration-best-practices",
		title: "AI Integration Best Practices for Modern Applications",
		description:
			"Practical guidelines for integrating AI capabilities into your applications without over-engineering.",
		content: `
# AI Integration Best Practices

AI is transforming how we build software. Here are our best practices for successful AI integration.

## Start Simple

Don't over-engineer your AI solution. Start with:
- Clear use cases
- Simple implementations
- Measurable outcomes

## Choose the Right Tools

We recommend:
- OpenAI APIs for general-purpose AI
- Specialized models for domain-specific tasks
- Edge-deployed models for latency-sensitive operations

## Monitor and Iterate

AI systems need continuous monitoring and improvement based on real user feedback.
		`,
		author: {
			name: "Bobadilla Tech Team",
			role: "AI Engineering",
		},
		publishedAt: "2026-01-28T00:00:00Z",
		tags: ["AI", "OpenAI", "Best Practices", "Integration"],
		category: "ai",
		readingTime: 7,
		featured: true,
	},
	{
		id: "3",
		slug: "cloudflare-workers-nextjs-deployment",
		title: "Deploying Next.js to Cloudflare Workers with OpenNext",
		description:
			"A comprehensive guide to deploying Next.js applications on Cloudflare's edge network using OpenNext.",
		content: `
# Deploying Next.js to Cloudflare Workers

Cloudflare Workers offers incredible performance for Next.js applications. Here's how to deploy.

## Why Cloudflare Workers?

- Global edge network
- Low latency
- Cost-effective
- D1 database integration

## Setup Process

1. Install OpenNext for Cloudflare
2. Configure wrangler.jsonc
3. Set up D1 database bindings
4. Deploy with \`npm run deploy\`

## Performance Benefits

We've seen 50-70% reduction in Time to First Byte (TTFB) compared to traditional hosting.
		`,
		author: {
			name: "Bobadilla Tech Team",
			role: "DevOps",
		},
		publishedAt: "2026-01-25T00:00:00Z",
		tags: ["Next.js", "Cloudflare", "Deployment", "Edge Computing"],
		category: "engineering",
		readingTime: 10,
		featured: false,
	},
];

/**
 * Get all blog posts sorted by publish date (newest first)
 */
export function getAllPosts(): BlogPost[] {
	return blogPosts.sort(
		(a, b) =>
			new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	);
}

/**
 * Get featured blog posts
 */
export function getFeaturedPosts(): BlogPost[] {
	return getAllPosts().filter((post) => post.featured);
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
	return blogPosts.find((post) => post.slug === slug);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(
	category: BlogPost["category"]
): BlogPost[] {
	return getAllPosts().filter((post) => post.category === category);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
	return getAllPosts().filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
	const tags = new Set<string>();
	blogPosts.forEach((post) => {
		post.tags.forEach((tag) => tags.add(tag));
	});
	return Array.from(tags).sort();
}

/**
 * Get all categories
 */
export function getAllCategories(): Array<BlogPost["category"]> {
	return ["engineering", "ai", "product", "business", "tutorial"];
}
