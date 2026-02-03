#!/usr/bin/env tsx

/**
 * Development script that runs Next.js dev server + blog file watcher
 * This enables hot reloading when editing markdown blog posts
 */

import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

console.log("🚀 Starting development environment...\n");

// Generate blog data initially
console.log("📝 Generating initial blog data...");
try {
	execSync("pnpm run generate-blog-data", { stdio: "inherit" });
	console.log("");
} catch (error) {
	console.error("❌ Initial generation failed:", error);
	process.exit(1);
}

// Start Next.js dev server
console.log("▲ Starting Next.js development server...");
const nextDev = spawn("pnpm", ["run", "dev"], {
	stdio: "inherit",
	shell: true,
});

// Start blog watcher
console.log("👀 Starting blog markdown file watcher...");
console.log(`   Watching: ${BLOG_CONTENT_DIR}\n`);

let debounceTimer: NodeJS.Timeout | null = null;

fs.watch(BLOG_CONTENT_DIR, { recursive: false }, (eventType, filename) => {
	if (!filename) return;

	// Only watch markdown files
	if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) return;

	// Ignore README files
	if (filename.toUpperCase().includes("README")) return;

	console.log(`\n📝 Blog change detected: ${filename}`);

	// Debounce: wait 300ms before regenerating
	if (debounceTimer) {
		clearTimeout(debounceTimer);
	}

	debounceTimer = setTimeout(() => {
		console.log("🔄 Regenerating blog data...");
		try {
			execSync("pnpm run generate-blog-data", { stdio: "pipe" });
			console.log("✅ Blog data updated - Next.js will hot reload\n");
		} catch (error) {
			console.error("❌ Generation failed:", error);
		}
	}, 300);
});

// Handle termination
process.on("SIGINT", () => {
	console.log("\n\n👋 Shutting down development environment...");
	nextDev.kill();
	process.exit(0);
});

process.on("SIGTERM", () => {
	nextDev.kill();
	process.exit(0);
});

// Keep process alive
process.stdin.resume();
