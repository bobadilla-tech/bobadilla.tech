import type { Metadata } from "next";
import { generateSEOMetadata } from "~/lib/seo";
import HirePage from "@/features/hire/pages/HirePage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Work With Us — Bobadilla Tech",
		description:
			"Senior engineering team for technical founders. Backend systems, AI integrations, and scalable infrastructure. Start with a small project or book a technical call.",
		keywordSets: ["core", "mvp"],
		path: "/hire",
		locale,
	});
}

export default HirePage;
