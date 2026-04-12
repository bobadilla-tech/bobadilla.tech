import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { BlogList } from "@/features/blog";
import {
	generateMetadata as generateSEOMetadata,
	KEYWORD_SETS,
	BASE_URL,
} from "~/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
	title: "Blog - Engineering Insights & Tutorials",
	description:
		"Technical articles about MVP development, AI integration, Next.js, Cloudflare Workers, and modern web development best practices from the Bobadilla Tech team.",
	keywords: [
		...KEYWORD_SETS.core,
		...KEYWORD_SETS.technologies,
		"technical blog",
		"engineering blog",
		"web development tutorials",
		"AI tutorials",
	],
	canonical: `${BASE_URL}/blog`,
	ogImage: `${BASE_URL}/og-blog.png`,
});

interface BlogPageProps {
	searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const { category, tag } = await searchParams;
	return (
		<div className="relative min-h-screen">
			<Navbar />
			<BlogList searchParams={{ category, tag }} />
			<Footer />
		</div>
	);
}
