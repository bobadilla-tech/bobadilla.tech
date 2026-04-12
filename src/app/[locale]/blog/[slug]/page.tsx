import { BlogPost, getPostBySlug, getAllSlugs } from "@/features/blog";
import { urlFor } from "~/lib/sanity/image";
import { generateSEOMetadata, BASE_URL, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from "~/lib/seo";

import type { Metadata } from "next";

export const dynamic = "force-static";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllSlugs();

	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return { title: "Post Not Found" };
	}

	return generateSEOMetadata({
		title: post.title,
		description: post.description,
		keywords: post.tags,
		canonical: `${BASE_URL}/blog/${post.slug.current}`,
		ogImage: post.coverImage
			? urlFor(post.coverImage).width(OG_IMAGE_WIDTH).height(OG_IMAGE_HEIGHT).url()
			: `${BASE_URL}/og-blog.png`,
		ogType: "article",
		article: {
			publishedTime: post.publishedAt,
			modifiedTime: post.updatedAt,
			author: post.author.name,
			tags: post.tags,
		},
	});
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	return <BlogPost slug={slug} />;
}
