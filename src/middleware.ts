import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
	matcher: [
		// Match all paths except: _next/static, _next/image, favicon, /assets/, /api/, and files with extensions
		"/((?!_next/static|_next/image|favicon\\.svg|assets|api|.*\\.[^/]+$).*)",
		"/",
	],
};
