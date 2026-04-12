import type { Middleware } from "../createRouteHandler";

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
