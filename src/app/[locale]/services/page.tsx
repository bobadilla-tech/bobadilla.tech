import ServicesPage from "@/features/services/pages/ServicesPage";
import { generateSEOMetadata } from "~/shared/lib/seo";

import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Our Services",
		description:
			"Software engineering services: full-stack development, backend engineering and infrastructure, AI integration, and MVP builds — planned, built, and maintained by our engineering team.",
		keywordSets: ["core", "services", "technologies"],
		additionalKeywords: [
			"custom software development",
			"enterprise software",
			"industry solutions",
		],
		path: "/services",
		locale,
	});
}

export default ServicesPage;
