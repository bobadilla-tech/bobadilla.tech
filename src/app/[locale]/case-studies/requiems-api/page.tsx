import type { Metadata } from "next";
import { generateSEOMetadata } from "~/lib/seo";
import RequiemsApiPage from "@/features/case-studies/pages/RequiemsApiPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Requiems API — Case Study — Bobadilla Tech",
		description:
			"How we built Requiems API: a multi-language API platform with a Go backend, Rails 8 dashboard, and Cloudflare Workers edge layer. Email, location, finance, and utility APIs under one key.",
		keywordSets: ["core", "technologies"],
		path: "/case-studies/requiems-api",
		locale,
	});
}

export default RequiemsApiPage;
