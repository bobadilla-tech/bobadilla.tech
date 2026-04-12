import { BlogPost, getPostBySlug, getAllSlugs } from "@/features/blog";
import { urlFor } from "~/lib/sanity/image";
import { generateArticleMetadata, BASE_URL, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from "~/lib/seo";

import type { Metadata } from "next";

export const dynamic = "force-static";

interface PageProps {
	params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllSlugs();

	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug, locale } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return { title: "Post Not Found" };
	}

	return generateArticleMetadata({
		title: post.title,
		description: post.description,
		additionalKeywords: post.tags,
		publishedTime: post.publishedAt,
		author: post.author.name,
		modifiedTime: post.updatedAt,
		tags: post.tags,
		path: `/blog/${post.slug.current}`,
		ogImage: post.coverImage
			? urlFor(post.coverImage).width(OG_IMAGE_WIDTH).height(OG_IMAGE_HEIGHT).url()
			: `${BASE_URL}/og-blog.png`,
		locale,
	});
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	return <BlogPost slug={slug} />;
}
