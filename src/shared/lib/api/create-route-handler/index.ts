import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "~/db/client";
import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
import type { RouteHandlerConfig, RouteContext } from "./types";
import { compose } from "./compose";

export type { RouteContext, Middleware, RouteHandlerConfig } from "./types";

export function createRouteHandler<TSchema extends z.ZodTypeAny>(
	config: RouteHandlerConfig<TSchema>
): (request: NextRequest) => Promise<NextResponse> {
	return async (request: NextRequest): Promise<NextResponse> => {
		try {
			const { env } = getCloudflareContext();
			const db = getDb(env.DB);

			const data = config.schema
				? (config.schema.parse(await request.json()) as z.infer<TSchema>)
				: (undefined as z.infer<TSchema>);

			const ctx: RouteContext<z.infer<TSchema>> = {
				request,
				data,
				db,
				env,
			};

			if (config.before) {
				await config.before(ctx);
			}

			const core = async (
				ctx: RouteContext<z.infer<TSchema>>
			): Promise<NextResponse> => {
				const result = await config.handler(ctx);
				if (config.after) {
					await config.after(ctx, result);
				}
				return successResponse(
					result,
					undefined,
					config.successStatus ?? 200
				) as NextResponse;
			};

			const chain = compose(config.use ?? [], core);
			
			return await chain(ctx);
		} catch (error) {
			console.error("[createRouteHandler]", error);

			if (error instanceof z.ZodError) {
				return validationErrorResponse(error) as NextResponse;
			}
			if (error instanceof Error) {
				return errorResponse(error.message, 400) as NextResponse;
			}
			return errorResponse("An unexpected error occurred") as NextResponse;
		}
	};
}
