import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/features/services/pages/ServicePage";
import RichServicePage from "@/features/services/components/RichServicePage";
import {
	allServices,
	industryServices,
} from "@/features/services/model/services";
import { getServicePageData } from "@/features/services/api/getServicePage";
import { generateSEOMetadata, SITE_NAME } from "~/shared/lib/seo";
import type { Locale } from "~/i18n/routing";

interface ServicePageProps {
	params: Promise<{
		locale: string;
		slug: string;
	}>;
}

export async function generateStaticParams() {
	const allServiceSlugs = allServices.map((service) => ({
		slug: service.slug,
	}));

	const industryServiceSlugs = industryServices.flatMap((industry) =>
		industry.services.map((service) => ({
			slug: service.slug,
		}))
	);

	return [...allServiceSlugs, ...industryServiceSlugs];
}

export async function generateMetadata({
	params,
}: ServicePageProps): Promise<Metadata> {
	const { slug, locale } = await params;

	const richData = getServicePageData(slug, locale as Locale);

	if (richData) {
		return generateSEOMetadata({
			title: richData.eyebrow,
			description: richData.heroSubtitle,
			keywordSets: ["core", "services"],
			path: `/services/${slug}`,
			locale,
		});
	}

	const service =
		allServices.find((s) => s.slug === slug) ||
		industryServices.flatMap((i) => i.services).find((s) => s.slug === slug);

	if (!service) {
		return {
			title: "Service Not Found",
			robots: { index: false, follow: false },
		};
	}

	return generateSEOMetadata({
		title: service.title,
		description: `${service.description} Planned, built, and maintained by the ${SITE_NAME} engineering team.`,
		keywordSets: ["core", "services", "technologies"],
		additionalKeywords: [
			service.title.toLowerCase(),
			`${service.title.toLowerCase()} development`,
			`${service.title.toLowerCase()} services`,
			"professional development",
			"software engineering",
		],
		path: `/services/${slug}`,
		locale,
	});
}

export default async function Page({ params }: ServicePageProps) {
	const { slug, locale } = await params;

	const richData = getServicePageData(slug, locale as Locale);

	if (richData) {
		return <RichServicePage data={richData} />;
	}

	const service =
		allServices.find((s) => s.slug === slug) ||
		industryServices.flatMap((i) => i.services).find((s) => s.slug === slug);

	if (!service) {
		notFound();
	}

	return <ServicePage slug={slug} />;
}
