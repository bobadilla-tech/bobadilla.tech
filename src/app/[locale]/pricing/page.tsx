import type { Metadata } from "next";
import { PricingCalculator } from "@/features/pricing";
import { generateSEOMetadata } from "~/lib/seo";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Pricing Calculator — Bobadilla Tech",
		description:
			"Get an instant project estimate. Our pricing calculator helps you understand the investment needed to build your product.",
		keywordSets: ["core", "mvp"],
		path: "/pricing",
		locale,
	});
}

export default function PricingPage() {
	return <PricingCalculator />;
}
