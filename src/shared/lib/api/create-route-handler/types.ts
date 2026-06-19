import type { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { z } from "zod";
import type { DbInstance } from "~/db/client";

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
