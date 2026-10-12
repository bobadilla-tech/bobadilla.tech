import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPage from "@/features/services/pages/IndustryPage";
import { industryServices } from "@/features/services/model/services";
import { generateSEOMetadata, SITE_NAME } from "~/shared/lib/seo";

interface IndustryPageProps {
	params: Promise<{
		locale: string;
		industry: string;
	}>;
}

export async function generateStaticParams() {
	return industryServices.map((industry) => ({
		industry: industry.slug,
	}));
}

export async function generateMetadata({
	params,
}: IndustryPageProps): Promise<Metadata> {
	const { industry: industrySlug, locale } = await params;
	const industry = industryServices.find((i) => i.slug === industrySlug);

	if (!industry) {
		return {
			title: "Industry Not Found",
			robots: { index: false, follow: false },
		};
	}

	const industryText = industry.industry.toLowerCase();

	return generateSEOMetadata({
		title: `${industry.industry} Software Development Services`,
		description: `${industry.description} ${industry.industry} software planned, built, and maintained by the ${SITE_NAME} engineering team.`,
		keywordSets: ["core", "services", "industries"],
		additionalKeywords: [
			`${industryText} software`,
			`${industryText} development`,
			`${industryText} solutions`,
			`${industryText} technology`,
			"industry-specific development",
			"specialized solutions",
		],
		path: `/services/all/${industrySlug}`,
		locale,
	});
}

export default async function Page({ params }: IndustryPageProps) {
	const { industry: industrySlug } = await params;
	const industry = industryServices.find((i) => i.slug === industrySlug);

	if (!industry) {
		notFound();
	}

	return (
		<div className="relative min-h-screen">
			<IndustryPage industry={industrySlug} />
		</div>
	);
}
