import { SOCIAL_LINKS } from "./constants";

import type { Metadata } from "next";


/**
 * SEO Configuration and Utilities
 * Implements best practices for SEO including Open Graph, Twitter Cards, and structured data
 */
export const BASE_URL = "https://bobadilla.tech";
export const SITE_NAME = "Bobadilla Tech";
export const DEFAULT_AUTHOR = "Bobadilla Tech Team";
export const TWITTER_HANDLE = "@UltiRequiem";

/**
 * Image Dimension Constants
 * These values are carefully selected to optimize for different use cases:
 * - OG images use 1200×630 (standard Open Graph dimensions, 1.9:1 aspect ratio)
 *   ensures compatibility with major social platforms (LinkedIn, Twitter, Facebook)
 * - Blog content images use 800×450 for optimal readability within article layouts
 * - Blog avatars: 80×80 for prominent byline display, 64×64 for list/card view
 */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const BLOG_CONTENT_IMAGE_WIDTH = 800;
export const BLOG_CONTENT_IMAGE_HEIGHT = 450;
export const BLOG_AVATAR_LARGE_SIZE = 80;
export const BLOG_AVATAR_SMALL_SIZE = 64;



/**
 * SEO configuration for standard pages
 */
export interface PageSEOConfig {
	title: string;
	description: string;
	keywordSets?: KeywordSet[];
	additionalKeywords?: string[];
	path?: string;
	canonical?: string;
	ogImage?: string;
	locale?: string;
}

/**
 * SEO configuration for blog articles
 */
export interface ArticleSEOConfig extends PageSEOConfig{
	publishedTime: string;
	author: string;
	tags?: string[];
	modifiedTime?: string;
}


/**
 * Map locale code to OpenGraph locale format
 */
const LOCALE_MAP: Record<string, string> = {
	en: "en_US",
	es: "es_ES",
	pt: "pt_BR",
};

function getOpenGraphLocale(locale: string | undefined): string {
	if (!locale) return "en_US";
	return LOCALE_MAP[locale] || "en_US";
}

/**
 * Internal helper to build base metadata structure
 */
function buildBaseMetadata(params: {
	title: string;
	description: string;
	author: string;
	keywordSets: KeywordSet[];
	additionalKeywords: string[];
	canonicalUrl: string;
	ogLocale: string;
	ogImage: string;
}): Metadata {
	const { title, description, author, keywordSets, additionalKeywords, canonicalUrl, ogLocale, ogImage } = params;

	const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

	const expandedKeywords = [
		...keywordSets.flatMap((set) => KEYWORD_SETS[set]),
		...additionalKeywords,
	];

	return {
		title: fullTitle,
		description,
		keywords: expandedKeywords.length > 0 ? expandedKeywords.join(", ") : undefined,
		authors: [{ name: author }],
		creator: SITE_NAME,
		publisher: SITE_NAME,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			type: "website",
			locale: ogLocale,
			url: canonicalUrl,
			siteName: SITE_NAME,
			title: fullTitle,
			description,
			images: ogImage
				? [
						{
							url: ogImage,
							width: OG_IMAGE_WIDTH,
							height: OG_IMAGE_HEIGHT,
							alt: title,
						},
					]
				: undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description,
			images: ogImage ? [ogImage] : undefined,
			creator: TWITTER_HANDLE,
			site: TWITTER_HANDLE,
		},
	};
}

/**
 * Generate comprehensive metadata for a page (simplified interface)
 */
export function generateSEOMetadata(config: PageSEOConfig): Metadata {
	const {
		title,
		description,
		keywordSets = [],
		additionalKeywords = [],
		path,
		canonical,
		ogImage = `${BASE_URL}/og-default.png`,
		locale = "en",
	} = config;

	const canonicalUrl = canonical || (path ? `${BASE_URL}${locale ? `/${locale}` : ''}${path}` : BASE_URL);
	const ogLocale = getOpenGraphLocale(locale);

	return buildBaseMetadata({
		title,
		description,
		author: DEFAULT_AUTHOR,
		keywordSets,
		additionalKeywords,
		canonicalUrl,
		ogLocale,
		ogImage,
	});
}

/**
 * Generate metadata for blog articles (simplified interface)
 */
export function generateArticleMetadata(config: ArticleSEOConfig): Metadata {
	const {
		title,
		description,
		publishedTime,
		author,
		keywordSets = [],
		additionalKeywords = [],
		tags,
		modifiedTime,
		path,
		canonical,
		ogImage = `${BASE_URL}/og-blog.png`,
		locale,
	} = config;

	const canonicalUrl = canonical || (path ? `${BASE_URL}${locale ? `/${locale}` : ''}${path}` : BASE_URL);
	const ogLocale = getOpenGraphLocale(locale);

	const baseMetadata = buildBaseMetadata({
		title,
		description,
		author,
		keywordSets,
		additionalKeywords,
		canonicalUrl,
		ogLocale,
		ogImage,
	});

	return {
		...baseMetadata,
		openGraph: {
			...baseMetadata.openGraph,
			type: "article",
			publishedTime,
			modifiedTime,
			authors: [author],
			tags,
		},
	};
}


/**
 * Common keyword sets for different page types
 */
export const KEYWORD_SETS = {
	core: [
		"web development",
		"software development",
		"LATAM agency",
		"MVP development",
		"full-stack development",
		"startup development",
		"engineering agency",
	],
	services: [
		"custom software development",
		"enterprise solutions",
		"backend development",
		"frontend development",
		"API development",
		"cloud deployment",
	],
	technologies: [
		"Next.js",
		"React",
		"TypeScript",
		"Node.js",
		"PostgreSQL",
		"AI integration",
		"machine learning",
	],
	industries: [
		"healthcare software",
		"fintech solutions",
		"education technology",
		"logistics software",
		"AI solutions",
	],
	mvp: [
		"rapid development",
		"quick launch",
		"prototype development",
		"minimum viable product",
		"startup MVP",
		"fast deployment",
	],
} as const;

export type KeywordSet = keyof typeof KEYWORD_SETS;


/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE_NAME,
		alternateName: "Bobadilla Tech Agency",
		url: BASE_URL,
		logo: `${BASE_URL}/logo.svg`,
		description:
			"Top LATAM engineering agency specializing in rapid MVP development, enterprise solutions, and AI integration",
		address: {
			"@type": "PostalAddress",
			addressCountry: "LATAM",
		},
		sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.twitter, SOCIAL_LINKS.linkedin],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "Sales",
			email: "ale@bobadilla.tech",
			availableLanguage: ["English", "Spanish"],
		},
	};
}

/**
 * Generate JSON-LD structured data for services
 */
export function generateServiceSchema(service: {
	name: string;
	description: string;
	url: string;
	priceRange?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		serviceType: service.name,
		provider: {
			"@type": "Organization",
			name: SITE_NAME,
			url: BASE_URL,
		},
		description: service.description,
		url: service.url,
		areaServed: "Worldwide",
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Software Development Services",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: service.name,
						description: service.description,
					},
					priceSpecification: service.priceRange
						? {
								"@type": "PriceSpecification",
								priceCurrency: "USD",
								price: service.priceRange,
							}
						: undefined,
				},
			],
		},
	};
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(
	items: { name: string; url: string }[]
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQSchema(
	faqs: { question: string; answer: string }[]
) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}
