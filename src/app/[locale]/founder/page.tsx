import type { Metadata } from "next";
import { generateSEOMetadata } from "~/lib/seo";
import FounderPage from "@/features/founder/pages/FounderPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Founder — Eliaz Bobadilla",
		description:
			"Eliaz Bobadilla is the founder and lead engineer at Bobadilla Tech. Started coding at 14. Focused on AI systems, backend architecture, and scalable infrastructure.",
		keywordSets: ["core"],
		path: "/founder",
		locale,
	});
}

export default FounderPage;
