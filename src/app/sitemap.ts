import { allServices, industryServices } from "~/data/services";

import type { MetadataRoute } from "next";

const BASE_URL = "https://bobadilla.tech";

export default function sitemap(): MetadataRoute.Sitemap {
	const currentDate = new Date();

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${BASE_URL}/pricing`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/services`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/tools`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];

	const allServicePages: MetadataRoute.Sitemap = allServices.map((service) => ({
		url: `${BASE_URL}/services/${service.slug}`,
		lastModified: currentDate,
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	const industryPages: MetadataRoute.Sitemap = industryServices.map(
		(industry) => ({
			url: `${BASE_URL}/services/all/${industry.slug}`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		})
	);

	const industryServicePages: MetadataRoute.Sitemap = industryServices.flatMap(
		(industry) =>
			industry.services.map((service) => ({
				url: `${BASE_URL}/services/${service.slug}`,
				lastModified: currentDate,
				changeFrequency: "monthly",
				priority: 0.7,
			}))
	);

	const toolPages: MetadataRoute.Sitemap = [
		{
			url: `${BASE_URL}/tools/reddit-post-date`,
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];

	const allPages = [
		...staticPages,
		...allServicePages,
		...industryPages,
		...industryServicePages,
		...toolPages,
	];

	const uniquePages = allPages.reduce((acc, page) => {
		if (!acc.some((p) => p.url === page.url)) {
			acc.push(page);
		}
		return acc;
	}, [] as MetadataRoute.Sitemap);

	return uniquePages;
}
