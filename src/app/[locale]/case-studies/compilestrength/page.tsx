import type { Metadata } from "next";
import { generateSEOMetadata } from "~/lib/seo";
import CompileStrengthPage from "@/features/case-studies/pages/CompileStrengthPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "CompileStrength — Case Study — Bobadilla Tech",
		description:
			"How we built CompileStrength: an AI-powered fitness SaaS with a Mastra agent, Cloudflare Workers edge deployment, Neon PostgreSQL, and LemonSqueezy billing. Full-stack end-to-end.",
		keywordSets: ["core", "technologies"],
		path: "/case-studies/compilestrength",
		locale,
	});
}

export default CompileStrengthPage;
