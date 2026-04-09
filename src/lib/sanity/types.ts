import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImageRef {
	_type: "image";
	asset: { _ref: string; _type: "reference" };
	hotspot?: { x: number; y: number; height: number; width: number };
}

export interface SanityAuthor {
	name: string;
	role: string;
	image?: SanityImageRef;
}

export interface SanityPost {
	_id: string;
	slug: { current: string };
	title: string;
	description: string;
	body: PortableTextBlock[];
	author: SanityAuthor;
	publishedAt: string;
	updatedAt?: string;
	tags: string[];
	category: "engineering" | "ai" | "product" | "business" | "tutorial";
	readingTime: number;
	featured: boolean;
	coverImage?: SanityImageRef;
	language: "en" | "es" | "pt";
}
