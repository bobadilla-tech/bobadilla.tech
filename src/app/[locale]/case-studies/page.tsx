import type { Metadata } from "next";
import { generateSEOMetadata } from "~/lib/seo";
import CaseStudiesPage from "@/features/case-studies/pages/CaseStudiesPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Case Studies — Bobadilla Tech",
		description:
			"Real projects built end-to-end by Bobadilla Tech. CompileStrength (AI fitness SaaS) and Requiems API (multi-language API platform).",
		keywordSets: ["core"],
		path: "/case-studies",
		locale,
	});
}

export default CaseStudiesPage;
