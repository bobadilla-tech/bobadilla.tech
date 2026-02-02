import { allServices, industryServices } from "~/data/services";
import { getAllPosts } from "~/data/blog";
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
		{
			url: `${BASE_URL}/blog`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.8,
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

	const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
		url: `${BASE_URL}/blog/${post.slug}`,
		lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
		changeFrequency: "monthly",
		priority: post.featured ? 0.8 : 0.7,
	}));

	const allPages = [
		...staticPages,
		...allServicePages,
		...industryPages,
		...industryServicePages,
		...toolPages,
		...blogPosts,
	];

	const uniquePages = allPages.reduce((acc, page) => {
		if (!acc.some((p) => p.url === page.url)) {
			acc.push(page);
		}
		return acc;
	}, [] as MetadataRoute.Sitemap);

	return uniquePages;
}
