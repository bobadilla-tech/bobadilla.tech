import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import type { D1Database } from "@cloudflare/workers-types";
import { getDb } from "~/db/client";
import * as schema from "~/db/schema";

export function createAuth(d1: D1Database) {
	return betterAuth({
		secret: process.env.BETTER_AUTH_SECRET!,
		baseURL: process.env.BETTER_AUTH_URL!,
		database: drizzleAdapter(getDb(d1), {
			provider: "sqlite",
			schema: {
				user: schema.user,
				session: schema.session,
				account: schema.account,
				verification: schema.verification,
			},
		}),
		emailAndPassword: {
			enabled: true,
		},
		plugins: [
			adminPlugin(),
			nextCookies(), // must be last — handles cookie setting in Server Actions
		],
	});
}

export type Auth = ReturnType<typeof createAuth>;
