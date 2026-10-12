import type { Metadata } from "next";
import { generateSEOMetadata, SITE_NAME } from "~/shared/lib/seo";
import CaseStudiesPage from "@/features/case-studies/pages/CaseStudiesPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Case Studies",
		description: `Systems built end-to-end by ${SITE_NAME}: CompileStrength (AI fitness SaaS) and Requiems API (multi-language API platform) — both our own products.`,
		keywordSets: ["core"],
		path: "/case-studies",
		locale,
	});
}

export default CaseStudiesPage;
