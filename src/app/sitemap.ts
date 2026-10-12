import {
	allServices,
	industryServices,
} from "@/features/services/model/services";
import { getAllPosts } from "~/shared/lib/sanity/queries";

import type { MetadataRoute } from "next";

import { BASE_URL } from "~/shared/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const currentDate = new Date();

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${BASE_URL}/company`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/products`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/team`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/case-studies`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/case-studies/compilestrength`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/case-studies/requiems-api`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/hire`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/start-small`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/system-audit`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
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
			url: `${BASE_URL}/blog`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},

		{
			url: `${BASE_URL}/help`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.6,
		},
		{
			url: `${BASE_URL}/help/nala-2026`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.6,
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

	const blogPosts: MetadataRoute.Sitemap = (await getAllPosts()).map(
		(post) => ({
			url: `${BASE_URL}/blog/${post.slug.current}`,
			lastModified: post.updatedAt
				? new Date(post.updatedAt)
				: new Date(post.publishedAt),
			changeFrequency: "monthly",
			priority: post.featured ? 0.8 : 0.7,
		})
	);

	const allPages = [
		...staticPages,
		...allServicePages,
		...industryPages,
		...industryServicePages,
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
