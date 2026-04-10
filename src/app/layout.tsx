import type { ReactNode } from "react";
import { Sora, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sora = Sora({
	variable: "--font-sora",
	subsets: ["latin"],
	weight: ["300", "400", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({ children }: { children: ReactNode }) {
	// next-intl middleware sets this header; falls back to "en" for admin routes
	const heads = await headers();
	const locale = heads.get("x-next-intl-locale") ?? "en";

	return (
		<html
			lang={locale}
			className={`${sora.variable} ${spaceGrotesk.variable}`}
		>
			<head>
				<link rel="icon" href="/assets/logo.png" type="image/png" />
			</head>
			<body className="antialiased bg-brand-bg text-brand-primary font-body">
				{children}
			</body>
		</html>
	);
}
