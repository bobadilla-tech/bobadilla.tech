import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getSessionCookie } from "better-auth/cookies";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/admin")) {
		// Let the sign-in page through without a session check
		if (pathname === "/admin/sign-in") {
			return NextResponse.next();
		}

		const sessionCookie = getSessionCookie(request);
		if (!sessionCookie) {
			const url = new URL("/admin/sign-in", request.url);
			url.searchParams.set("callbackUrl", pathname);
			return NextResponse.redirect(url);
		}

		// Cookie present — layout performs the real DB-backed validation
		return NextResponse.next();
	}

	return intlMiddleware(request);
}

export const config = {
	matcher: [
		"/admin/:path*",
		// Match all paths except: _next/static, _next/image, favicon, /assets/, /api/, and files with extensions
		"/((?!_next/static|_next/image|favicon\\.svg|assets|api|.*\\.[^/]+$).*)",
		"/",
	],
};
