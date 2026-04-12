import type { Metadata } from "next";
import ServicesPage from "@/features/services/pages/ServicesPage";
import { generateSEOMetadata, BASE_URL } from "~/lib/seo";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Our Services",
		description:
			"Expert software development services including full-stack development, MVP creation, AI integration, and enterprise solutions. Specialized industry expertise in healthcare, fintech, education, and more. Fast delivery with senior engineering talent.",
		keywordSets: ["core", "services", "technologies"],
		additionalKeywords: [
			"custom software development",
			"enterprise software",
			"industry solutions",
		],
		path: "/services",
		ogImage: `${BASE_URL}/og-services.png`,
		locale,
	});
}

export default ServicesPage;
