import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";
import type { Locale } from "~/i18n/routing";
import { generateSEOMetadata } from "~/shared/lib/seo";
import { BRAND } from "~/shared/lib/brand";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import ConsentBanner from "@/shared/ui/ConsentBanner";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Metadata.home" });
	return generateSEOMetadata({
		title: t("title", { brand: BRAND.name }),
		description: t("description", { brand: BRAND.name }),
		keywordSets: ["core", "mvp"],
		additionalKeywords: [
			"software engineering company",
			"SaaS products",
			"AI integration",
		],
		path: "/",
		locale,
	});
}

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
		<NextIntlClientProvider messages={messages}>
			<div className="relative min-h-screen">
				<Navbar />
				<main>{children}</main>
				<Footer />
			</div>
			<ConsentBanner />
		</NextIntlClientProvider>
	);
}
