import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"~": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		environment: "node",
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		exclude: [
			"node_modules",
			".next",
			"dist",
			"coverage",
			"drizzle",
			"public",
		],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "lcov"],
			exclude: [
				"node_modules/",
				".next/",
				"coverage/",
				"drizzle/",
				"public/",
				"src/**/*.d.ts",
				"src/**/*.test.{ts,tsx}",
				"src/**/*.spec.{ts,tsx}",
				"src/**/page.tsx",
				"src/**/layout.tsx",
				"src/**/route.ts",
				"src/middleware.ts",
				"src/env.ts",
				"**/*.config.{js,ts,mjs}",
			],
		},
		reporters: "default",
		globals: true,
	},
});
