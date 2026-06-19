import type { Middleware } from "../create-route-handler";

/**
 * Middleware to log incoming requests and their response times
 */
export function withLogging(): Middleware {
	return async (ctx, next) => {
		const start = Date.now();

		const { method, url } = ctx.request;
		
		const response = await next();
		
		console.log(
			`[${method}] ${new URL(url).pathname} — ${Date.now() - start}ms ${response.status}`
		);
		
		return response;
	};
}
