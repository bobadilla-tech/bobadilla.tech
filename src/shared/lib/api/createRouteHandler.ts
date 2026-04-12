import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb, type DbInstance } from "~/db/client";
import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";

export interface RouteContext<TData = unknown> {
	request: NextRequest;
	data: TData;
	db: DbInstance;
	env: CloudflareEnv;
}

export type Middleware<TData = unknown> = (
	ctx: RouteContext<TData>,
	next: () => Promise<NextResponse>
) => Promise<NextResponse>;

export interface RouteHandlerConfig<
	TSchema extends z.ZodTypeAny = z.ZodTypeAny,
> {
	schema?: TSchema;
	successStatus?: number;
	use?: Middleware<z.infer<TSchema>>[];
	before?: (ctx: RouteContext<z.infer<TSchema>>) => Promise<void>;
	handler: (ctx: RouteContext<z.infer<TSchema>>) => Promise<unknown>;
	after?: (
		ctx: RouteContext<z.infer<TSchema>>,
		result: unknown
	) => Promise<void>;
}

function compose<TData>(
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

export function createRouteHandler<TSchema extends z.ZodTypeAny>(
	config: RouteHandlerConfig<TSchema>
): (request: NextRequest) => Promise<NextResponse> {
	return async (request: NextRequest): Promise<NextResponse> => {
		try {
			const { env } = await getCloudflareContext();
			const db = getDb(env.DB);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let data = undefined as any;
			if (config.schema) {
				const body = await request.json();
				data = config.schema.parse(body);
			}

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
