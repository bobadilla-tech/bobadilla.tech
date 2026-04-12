import { getSessionCookie } from "better-auth/cookies";
import { errorResponse } from "~/lib/server/api-response";
import type { Middleware } from "../createRouteHandler";

export function withAuth(): Middleware {
	return async (ctx, next) => {
		const cookie = getSessionCookie(ctx.request);
		if (!cookie) {
			return errorResponse("Unauthorized", 401) as ReturnType<
				typeof errorResponse
			>;
		}
		return next();
	};
}
