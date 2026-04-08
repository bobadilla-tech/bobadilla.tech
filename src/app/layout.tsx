import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import {
	generateMetadata as generateSEOMetadata,
	KEYWORD_SETS,
} from "~/lib/seo";

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

export const metadata: Metadata = generateSEOMetadata({
	title: "Bobadilla Tech - Launch Your MVP in Days",
	description:
		"Top LATAM engineering agency specializing in rapid MVP development, enterprise backend systems, and cutting-edge AI solutions. Launch your startup in days or weeks, not months. Expert full-stack development team ready to build your next product.",
	keywords: [
		...KEYWORD_SETS.core,
		...KEYWORD_SETS.mvp,
		"offshore development",
		"nearshore development",
		"agile development",
		"fast turnaround",
	],
	canonical: "https://bobadilla.tech",
	ogImage: "https://bobadilla.tech/og-home.png",
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#0b0505" },
		{ media: "(prefers-color-scheme: light)", color: "#0b0505" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${sora.variable} ${spaceGrotesk.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
