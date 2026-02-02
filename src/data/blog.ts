import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "~/lib/reading-time";

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
	readingTime: number; // minutes (auto-calculated)
	featured: boolean;
	coverImage?: string;
}

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

/**
 * Get all blog posts from markdown files
 */
export function getAllPosts(): BlogPost[] {
	if (!fs.existsSync(BLOG_CONTENT_DIR)) {
		console.warn(`Blog content directory not found: ${BLOG_CONTENT_DIR}`);
		return [];
	}

	const files = fs.readdirSync(BLOG_CONTENT_DIR).filter((file) => {
		const isMarkdown = file.endsWith(".md") || file.endsWith(".mdx");
		const isNotReadme = !file.toUpperCase().includes("README");
		return isMarkdown && isNotReadme;
	});

	const posts = files.map((filename) => {
		const slug = filename.replace(/\.mdx?$/, "");
		const filePath = path.join(BLOG_CONTENT_DIR, filename);
		const fileContents = fs.readFileSync(filePath, "utf8");

		const { data, content } = matter(fileContents);

		const readingTime = calculateReadingTime(content);

		return {
			id: slug,
			slug,
			title: data.title,
			description: data.description,
			content,
			author: {
				name: data.author || "Bobadilla Tech Team",
				role: data.authorRole || "Engineering",
			},
			publishedAt: data.publishedAt || new Date().toISOString(),
			updatedAt: data.updatedAt,
			tags: data.tags || [],
			category: data.category || "engineering",
			readingTime,
			featured: data.featured || false,
			coverImage: data.coverImage,
		};
	});

	return posts.sort(
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
	return getAllPosts().find((post) => post.slug === slug);
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
	const allPosts = getAllPosts();
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
