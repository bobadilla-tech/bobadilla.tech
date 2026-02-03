import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/**
	 * Server-side environment variables schema
	 */
	server: {
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),

		// Email Worker URL (external worker for sending emails)
		EMAIL_WORKER_URL: z.url().optional(),
		// Email Worker API Key (for authenticating requests to the worker)
		EMAIL_WORKER_API_KEY: z.string().optional(),
	},

	/**
	 * Client-side environment variables schema
	 * These must be prefixed with NEXT_PUBLIC_
	 */
	client: {
		// Add client-side env vars here when needed
		// NEXT_PUBLIC_API_URL: z.string().url(),
	},

	/**
	 * Runtime environment variables
	 * For Next.js >= 13.4.4, you only need to destructure client variables
	 */
	experimental__runtimeEnv: {
		// Client variables only (NEXT_PUBLIC_*)
		// NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},

	/**
	 * Skip validation during build if specified
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,

	/**
	 * Makes it so empty strings are treated as undefined.
	 * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
