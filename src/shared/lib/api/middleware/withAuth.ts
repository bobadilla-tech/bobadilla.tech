import { getSessionCookie } from "better-auth/cookies";
import { errorResponse } from "~/shared/lib/api/api-response";
import type { Middleware } from "../create-route-handler";

export function withAuth(): Middleware {
	return async (ctx, next) => {
		const cookie = getSessionCookie(ctx.request);
		
		if (!cookie) {
			return errorResponse("Unauthorized", 401);
		}

		return next();
	};
}
