import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";
import type { Locale } from "~/i18n/routing";
import "../globals.css";
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

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as Locale)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<html lang={locale}>
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body className={`${sora.variable} ${spaceGrotesk.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
