import type { Metadata } from "next";
import { ToolsCatalog } from "@/features/tools";
import { generateSEOMetadata, BASE_URL } from "~/lib/seo";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Free Online Developer Tools",
		description:
			"Free online tools for developers, researchers, and content creators. Privacy-focused utilities with no sign-up required.",
		additionalKeywords: [
			"free developer tools",
			"online tools",
			"developer utilities",
			"free software tools",
			"web tools",
			"no sign-up tools",
			"privacy-focused tools",
		],
		path: "/tools",
		ogImage: `${BASE_URL}/og-tools.png`,
		locale,
	});
}

export default function ToolsPage() {
	return <ToolsCatalog />;
}
