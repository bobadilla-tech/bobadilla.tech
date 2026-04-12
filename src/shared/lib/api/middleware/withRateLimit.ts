import type { Middleware } from "../createRouteHandler";

interface RateLimitOptions {
	// Future: max requests per window, KV namespace key, etc.
	max?: number;
}

// Placeholder — implement with Cloudflare KV via ctx.env when needed
export function withRateLimit(_opts?: RateLimitOptions): Middleware {
	return async (_ctx, next) => {
		return next();
	};
}
