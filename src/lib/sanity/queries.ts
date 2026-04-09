import type { QueryParams } from "@sanity/client";
import { sanityClient } from "./client";
import type { SanityPost } from "./types";

const POST_FIELDS = `
  _id,
  slug,
  title,
  description,
  body,
  author->{name, role, image},
  publishedAt,
  updatedAt,
  tags,
  category,
  readingTime,
  featured,
  coverImage,
  language
`;

export async function getAllPosts(): Promise<SanityPost[]> {
	return sanityClient.fetch<SanityPost[]>(
		`*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`
	);
}

export async function getFeaturedPosts(): Promise<SanityPost[]> {
	return sanityClient.fetch<SanityPost[]>(
		`*[_type == "post" && featured == true] | order(publishedAt desc) { ${POST_FIELDS} }`
	);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
	return sanityClient.fetch<SanityPost | null>(
		`*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
		{ slug } as unknown as QueryParams
	);
}

export async function getPostsByCategory(
	category: string
): Promise<SanityPost[]> {
	return sanityClient.fetch<SanityPost[]>(
		`*[_type == "post" && category == $category] | order(publishedAt desc) { ${POST_FIELDS} }`,
		{ category } as unknown as QueryParams
	);
}

export async function getPostsByTag(tag: string): Promise<SanityPost[]> {
	return sanityClient.fetch<SanityPost[]>(
		`*[_type == "post" && $tag in tags] | order(publishedAt desc) { ${POST_FIELDS} }`,
		{ tag } as unknown as QueryParams
	);
}

export async function getAllSlugs(): Promise<string[]> {
	const results = await sanityClient.fetch<{ slug: { current: string } }[]>(
		`*[_type == "post"]{ slug }`
	);
	return results.map((r: { slug: { current: string } }) => r.slug.current);
}

export async function getAllTags(): Promise<string[]> {
	const results = await sanityClient.fetch<{ tags: string[] }[]>(
		`*[_type == "post"]{ tags }`
	);
	const tagSet = new Set<string>();
	results.forEach((r: { tags: string[] }) => r.tags?.forEach((t: string) => tagSet.add(t)));
	return Array.from(tagSet).sort();
}

export function getAllCategories(): Array<SanityPost["category"]> {
	return ["engineering", "ai", "product", "business", "tutorial"];
}
