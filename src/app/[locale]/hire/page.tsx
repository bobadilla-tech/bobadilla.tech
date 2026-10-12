import type { Metadata } from "next";
import { generateSEOMetadata } from "~/shared/lib/seo";
import HirePage from "@/features/hire/pages/HirePage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Work With Us",
		description:
			"An engineering team for technical founders. Backend systems, AI integrations, and scalable infrastructure. Start with a small project or book a call.",
		keywordSets: ["core", "mvp"],
		path: "/hire",
		locale,
	});
}

export default HirePage;
