import type { NextResponse } from "next/server";
import type { Middleware, RouteContext } from "./types";

export function compose<TData>(
	middlewares: Middleware<TData>[],
	core: (ctx: RouteContext<TData>) => Promise<NextResponse>
): (ctx: RouteContext<TData>) => Promise<NextResponse> {
	return (ctx) => {
		let index = 0;

		const next = (): Promise<NextResponse> => {
			if (index >= middlewares.length) return core(ctx);
			return middlewares[index++](ctx, next);
		};

		return next();
	};
}
