import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/admin")) {
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
