import { BlogList } from "@/features/blog";
import {
	generateSEOMetadata,
	BASE_URL,
} from "~/lib/seo";

import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Blog - Engineering Insights & Tutorials",
		description:
			"Technical articles about MVP development, AI integration, Next.js, Cloudflare Workers, and modern web development best practices from the Bobadilla Tech team.",
		keywordSets: ["core", "technologies"],
		additionalKeywords: [
			"technical blog",
			"engineering blog",
			"web development tutorials",
			"AI tutorials",
		],
		path: "/blog",
		ogImage: `${BASE_URL}/og-blog.png`,
		locale,
	});
}

interface BlogPageProps {
	searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const { category, tag } = await searchParams;

	return <BlogList searchParams={{ category, tag }} />;
}
