import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "~/lib/auth";
import type { NextRequest } from "next/server";

async function handler(req: NextRequest) {
	const { env } = await getCloudflareContext();
	const auth = createAuth(env.DB);
	return auth.handler(req);
}

export const GET = handler;
export const POST = handler;
