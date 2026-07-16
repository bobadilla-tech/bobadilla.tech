import type { Metadata } from "next";
import { generateSEOMetadata, BASE_URL } from "~/shared/lib/seo";
import HelpPage from "@/features/help/pages/HelpPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	return generateSEOMetadata({
		title: "Community & Social Causes",
		description:
			"Every month Bobadilla Tech supports a new cause — a rescued pet, a person in need, or a social project — through our work.",
		keywordSets: ["core"],
		path: "/help",
		ogImage: `${BASE_URL}/og-help.png`,
		locale,
	});
}

export default HelpPage;
