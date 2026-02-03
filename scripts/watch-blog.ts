#!/usr/bin/env tsx

/**
 * Development file watcher for blog posts
 * Watches markdown files and regenerates blog-posts.ts on changes
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

console.log("👀 Watching blog markdown files for changes...");
console.log(`   Directory: ${BLOG_CONTENT_DIR}`);
console.log("");

// Initial generation
console.log("🔄 Initial blog data generation...");
try {
	execSync("pnpm run generate-blog-data", { stdio: "inherit" });
} catch (error) {
	console.error("❌ Initial generation failed:", error);
}

// Watch for changes
let debounceTimer: NodeJS.Timeout | null = null;

fs.watch(BLOG_CONTENT_DIR, { recursive: false }, (eventType, filename) => {
	if (!filename) return;

	// Only watch markdown files
	if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) return;

	// Ignore README files
	if (filename.toUpperCase().includes("README")) return;

	console.log(`\n📝 Detected change: ${filename}`);

	// Debounce: wait 300ms before regenerating
	if (debounceTimer) {
		clearTimeout(debounceTimer);
	}

	debounceTimer = setTimeout(() => {
		console.log("🔄 Regenerating blog data...");
		try {
			execSync("pnpm run generate-blog-data", { stdio: "inherit" });
			console.log("✅ Blog data updated - Next.js should hot reload\n");
		} catch (error) {
			console.error("❌ Generation failed:", error);
		}
	}, 300);
});

// Keep process alive
process.stdin.resume();

// Handle termination
process.on("SIGINT", () => {
	console.log("\n\n👋 Stopping blog watcher...");
	process.exit(0);
});
