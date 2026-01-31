import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
	generateMetadata as generateSEOMetadata,
	KEYWORD_SETS,
} from "~/lib/seo";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
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
		{ media: "(prefers-color-scheme: dark)", color: "#0f172a" },
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
