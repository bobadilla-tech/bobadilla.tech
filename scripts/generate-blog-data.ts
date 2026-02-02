#!/usr/bin/env tsx

/**
 * Build-time script to process markdown blog posts into JSON
 * This enables the blog to work in Cloudflare Workers (no fs access)
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "../src/lib/reading-time";

interface BlogPost {
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
	publishedAt: string;
	updatedAt?: string;
	tags: string[];
	category: "engineering" | "ai" | "product" | "business" | "tutorial";
	readingTime: number;
	featured: boolean;
	coverImage?: string;
}

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src/content/blog");
const OUTPUT_FILE = path.join(process.cwd(), "src/data/blog-posts.json");

/**
 * Map author names to their profile images
 */
function getAuthorImage(authorName: string): string {
	const authorImages: Record<string, string> = {
		"Eliaz Bobadilla": "/faces/eliaz.jpeg",
		"Alexandra Flores": "/faces/alexandra.png",
		"Leonardo Estacio": "/faces/leo.jpeg",
	};

	return authorImages[authorName] || "/faces/eliaz.jpeg";
}

/**
 * Process all markdown files and generate JSON
 */
function generateBlogData(): void {
	console.log("📝 Generating blog data from markdown files...");
	console.log(`   Source: ${BLOG_CONTENT_DIR}`);
	console.log(`   Output: ${OUTPUT_FILE}`);

	if (!fs.existsSync(BLOG_CONTENT_DIR)) {
		console.error(`❌ Blog content directory not found: ${BLOG_CONTENT_DIR}`);
		process.exit(1);
	}

	const files = fs.readdirSync(BLOG_CONTENT_DIR).filter((file) => {
		const isMarkdown = file.endsWith(".md") || file.endsWith(".mdx");
		const isNotReadme = !file.toUpperCase().includes("README");
		const isNotDraft = !file.startsWith("_");
		return isMarkdown && isNotReadme && isNotDraft;
	});

	console.log(`   Found ${files.length} blog post(s)`);

	const posts: BlogPost[] = files.map((filename) => {
		const slug = filename.replace(/\.mdx?$/, "");
		const filePath = path.join(BLOG_CONTENT_DIR, filename);
		const fileContents = fs.readFileSync(filePath, "utf8");

		const { data, content } = matter(fileContents);

		const readingTime = calculateReadingTime(content);
		const authorName = data.author || "Eliaz Bobadilla";

		console.log(`   • ${slug} (${readingTime} min read)`);

		return {
			id: slug,
			slug,
			title: data.title,
			description: data.description,
			content,
			author: {
				name: authorName,
				role: data.authorRole || "Engineering",
				image: getAuthorImage(authorName),
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

	// Sort by publish date (newest first)
	const sortedPosts = posts.sort(
		(a, b) =>
			new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	);

	// Write to JSON file
	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sortedPosts, null, 2));

	console.log(`✅ Generated ${sortedPosts.length} blog post(s) → ${OUTPUT_FILE}`);
}

// Run the script
generateBlogData();
