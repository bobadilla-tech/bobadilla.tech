/**
 * Blog data module
 * Data is generated at build time from markdown files (see scripts/generate-blog-data.ts)
 * This allows the blog to work in Cloudflare Workers without file system access
 */

import { blogPosts as blogPostsData } from "./blog-posts";

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	description: string;
	content: string;
	author: {
		name: string;
		role: string;
		image: string;
	};
	publishedAt: string; // ISO date string
	updatedAt?: string; // ISO date string
	tags: string[];
	category: "engineering" | "ai" | "product" | "business" | "tutorial";
	readingTime: number; // minutes (auto-calculated)
	featured: boolean;
	coverImage?: string;
}

// Import pre-generated blog posts (generated at build time)
const allPosts: BlogPost[] = blogPostsData as BlogPost[];

/**
 * Get all blog posts
 * Posts are already sorted by publish date (newest first)
 */
export function getAllPosts(): BlogPost[] {
	return allPosts;
}

/**
 * Get featured blog posts
 */
export function getFeaturedPosts(): BlogPost[] {
	return allPosts.filter((post) => post.featured);
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
	return allPosts.find((post) => post.slug === slug);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(
	category: BlogPost["category"]
): BlogPost[] {
	return allPosts.filter((post) => post.category === category);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
	return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
	const tags = new Set<string>();
	allPosts.forEach((post) => {
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
