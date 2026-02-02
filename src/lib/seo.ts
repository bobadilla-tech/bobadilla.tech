import type { Metadata } from "next";
import { SOCIAL_LINKS } from "./constants";

/**
 * SEO Configuration and Utilities
 * Implements best practices for SEO including Open Graph, Twitter Cards, and structured data
 */

export const BASE_URL = "https://bobadilla.tech";
export const SITE_NAME = "Bobadilla Tech";
export const DEFAULT_AUTHOR = "Bobadilla Tech Team";

export interface SEOConfig {
	title: string;
	description: string;
	keywords?: string[];
	canonical?: string;
	ogImage?: string;
	ogType?: "website" | "article";
	twitterCard?: "summary" | "summary_large_image";
	noindex?: boolean;
	article?: {
		publishedTime?: string;
		modifiedTime?: string;
		author?: string;
		tags?: string[];
	};
}

/**
 * Default SEO configuration
 */
export const DEFAULT_SEO: Omit<SEOConfig, "title" | "description"> = {
	ogType: "website",
	twitterCard: "summary_large_image",
	ogImage: `${BASE_URL}/og-default.png`,
	noindex: false,
};

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
	const {
		title,
		description,
		keywords = [],
		canonical,
		ogImage = DEFAULT_SEO.ogImage,
		ogType = DEFAULT_SEO.ogType,
		twitterCard = DEFAULT_SEO.twitterCard,
		noindex = false,
		article,
	} = config;

	const fullTitle = title.includes(SITE_NAME)
		? title
		: `${title} | ${SITE_NAME}`;
	const canonicalUrl = canonical || BASE_URL;

	const metadata: Metadata = {
		title: fullTitle,
		description,
		keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
		authors: [{ name: DEFAULT_AUTHOR }],
		creator: SITE_NAME,
		publisher: SITE_NAME,
		robots: noindex
			? {
					index: false,
					follow: false,
					googleBot: {
						index: false,
						follow: false,
					},
				}
			: {
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
			type: ogType,
			locale: "en_US",
			url: canonicalUrl,
			siteName: SITE_NAME,
			title: fullTitle,
			description,
			images: ogImage
				? [
						{
							url: ogImage,
							width: 1200,
							height: 630,
							alt: title,
						},
					]
				: undefined,
		},
		twitter: {
			card: twitterCard,
			title: fullTitle,
			description,
			images: ogImage ? [ogImage] : undefined,
			creator: "@UltiRequiem",
			site: "@UltiRequiem",
		},
	};

	// Add article-specific metadata if provided
	if (article && ogType === "article") {
		metadata.openGraph = {
			...metadata.openGraph,
			type: "article",
			publishedTime: article.publishedTime,
			modifiedTime: article.modifiedTime,
			authors: article.author ? [article.author] : undefined,
			tags: article.tags,
		};
	}

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
		logo: `${BASE_URL}/logo.png`,
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
	items: Array<{ name: string; url: string }>
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
	faqs: Array<{ question: string; answer: string }>
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

/**
 * Helper to serialize structured data for injection
 * Usage: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }} />
 */
export function serializeStructuredData(data: Record<string, unknown>): string {
	return JSON.stringify(data);
}
