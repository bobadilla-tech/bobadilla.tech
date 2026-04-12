import type { Metadata } from "next";
import { ToolsCatalog } from "@/features/tools";
import { generateSEOMetadata, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
	title: "Free Online Developer Tools",
	description:
		"Free online tools for developers, researchers, and content creators. Privacy-focused utilities with no sign-up required.",
	keywords: [
		"free developer tools",
		"online tools",
		"developer utilities",
		"free software tools",
		"web tools",
		"no sign-up tools",
		"privacy-focused tools",
	],
	canonical: `${BASE_URL}/tools`,
	ogImage: `${BASE_URL}/og-tools.png`,
});

export default function ToolsPage() {
	return <ToolsCatalog />;
}
