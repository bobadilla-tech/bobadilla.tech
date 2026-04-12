import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/features/services/pages/ServicePage";
import RichServicePage from "@/features/services/components/RichServicePage";
import { allServices, industryServices } from "@/features/services/model/services";
import { getServicePageData } from "@/features/services/api/getServicePage";
import { generateSEOMetadata, BASE_URL } from "~/lib/seo";
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
		description: `${service.description} Professional ${service.title.toLowerCase()} services from expert LATAM developers. Fast delivery, enterprise quality, competitive pricing.`,
		keywordSets: ["core", "services", "technologies"],
		additionalKeywords: [
			service.title.toLowerCase(),
			`${service.title.toLowerCase()} development`,
			`${service.title.toLowerCase()} services`,
			"professional development",
			"expert developers",
		],
		path: `/services/${slug}`,
		ogImage: `${BASE_URL}/og-service-${slug}.png`,
		locale,
	});
}

export default async function Page({ params }: ServicePageProps) {
	const { slug, locale } = await params;

	// Check for rich service page data first
	const richData = getServicePageData(slug, locale as Locale);

	if (richData) {
		return <RichServicePage data={richData} />;
	}

	// Fall through to generic layout for industry/other slugs
	const service =
		allServices.find((s) => s.slug === slug) ||
		industryServices.flatMap((i) => i.services).find((s) => s.slug === slug);

	if (!service) {
		notFound();
	}

	return <ServicePage slug={slug} />;
}
