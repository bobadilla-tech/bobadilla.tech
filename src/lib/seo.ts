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
	keywordSets?: Array<keyof typeof KEYWORD_SETS>;
	additionalKeywords?: string[];
	path?: string;
	canonical?: string;
	ogImage?: string;
	locale?: string;
}

/**
 * SEO configuration for blog articles
 */
export interface ArticleSEOConfig {
	title: string;
	description: string;
	publishedTime: string;
	author: string;
	keywordSets?: Array<keyof typeof KEYWORD_SETS>;
	additionalKeywords?: string[];
	tags?: string[];
	modifiedTime?: string;
	path?: string;
	canonical?: string;
	ogImage?: string;
	locale?: string;
}

/**
 * Default SEO configuration
 */
export const DEFAULT_SEO = {
	ogImage: `${BASE_URL}/og-default.png`,
};

/**
 * Map locale code to OpenGraph locale format
 */
function getOpenGraphLocale(locale: string | undefined): string {
	if (!locale) return "en_US";
	
	const localeMap: Record<string, string> = {
		en: "en_US",
		es: "es_ES",
		pt: "pt_BR",
	};

	return localeMap[locale] || "en_US";
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
		ogImage = DEFAULT_SEO.ogImage,
		locale,
	} = config;

	const fullTitle = title.includes(SITE_NAME)
		? title
		: `${title} | ${SITE_NAME}`;

	const canonicalUrl = canonical || (path ? `${BASE_URL}${locale ? `/${locale}` : ''}${path}` : BASE_URL);

	const ogLocale = getOpenGraphLocale(locale);

	// Expand keyword sets and merge with additional keywords
	const expandedKeywords = [
		...keywordSets.flatMap((set) => KEYWORD_SETS[set]),
		...additionalKeywords,
	];

	const metadata: Metadata = {
		title: fullTitle,
		description,
		keywords: expandedKeywords.length > 0 ? expandedKeywords.join(", ") : undefined,
		authors: [{ name: DEFAULT_AUTHOR }],
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

	return metadata;
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

	const fullTitle = title.includes(SITE_NAME)
		? title
		: `${title} | ${SITE_NAME}`;

	const canonicalUrl = canonical || (path ? `${BASE_URL}${locale ? `/${locale}` : ''}${path}` : BASE_URL);

	const ogLocale = getOpenGraphLocale(locale);

	// Expand keyword sets and merge with additional keywords
	const expandedKeywords = [
		...keywordSets.flatMap((set) => KEYWORD_SETS[set]),
		...additionalKeywords,
	];

	const metadata: Metadata = {
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
			type: "article",
			locale: ogLocale,
			url: canonicalUrl,
			siteName: SITE_NAME,
			title: fullTitle,
			description,
			publishedTime,
			modifiedTime,
			authors: [author],
			tags: tags,
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

	return metadata;
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
