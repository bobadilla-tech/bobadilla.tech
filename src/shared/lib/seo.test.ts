import { describe, expect, it } from "vitest";

import {
	BASE_URL,
	DEFAULT_AUTHOR,
	generateArticleMetadata,
	generateBreadcrumbSchema,
	generateFAQSchema,
	generateOrganizationSchema,
	generateSEOMetadata,
	generateServiceSchema,
	SITE_NAME,
} from "./seo";

describe("SEO metadata", () => {
	it("builds localized page metadata from the company brand", () => {
		const metadata = generateSEOMetadata({
			title: "Company",
			description: "About the company",
			path: "/company",
			locale: "es",
			keywordSets: ["core"],
			additionalKeywords: ["Lima software team"],
		});

		expect(BASE_URL).toBe("https://bobadilla.tech");
		expect(SITE_NAME).toBe("Bobadilla Tech");
		expect(DEFAULT_AUTHOR).toBe("Bobadilla Tech Team");
		expect(metadata.title).toBe("Company | Bobadilla Tech");
		expect(metadata.alternates?.canonical).toBe(
			"https://bobadilla.tech/es/company"
		);
		expect(metadata.openGraph?.locale).toBe("es_ES");
		expect(metadata.openGraph?.siteName).toBe("Bobadilla Tech");
		expect(metadata.keywords).toContain("software engineering company");
		expect(metadata.keywords).toContain("Lima software team");
	});

	it("respects explicit canonical URLs and titles that already include the brand", () => {
		const metadata = generateSEOMetadata({
			title: "Bobadilla Tech | Company",
			description: "About the company",
			canonical: "https://example.com/company",
			locale: "fr",
			ogImage: "",
		});

		expect(metadata.title).toBe("Bobadilla Tech | Company");
		expect(metadata.alternates?.canonical).toBe("https://example.com/company");
		expect(metadata.openGraph?.locale).toBe("en_US");
		expect(metadata.openGraph?.images).toBeUndefined();
		expect(metadata.twitter?.images).toBeUndefined();
		expect(metadata.keywords).toBeUndefined();
	});

	it("builds article metadata with article fields and localized URLs", () => {
		const metadata = generateArticleMetadata({
			title: "Engineering notes",
			description: "A product update",
			publishedTime: "2026-10-12",
			modifiedTime: "2026-10-13",
			author: "Eliaz Bobadilla",
			tags: ["engineering", "products"],
			path: "/blog/engineering-notes",
			locale: "pt",
		});

		expect(metadata.openGraph).toMatchObject({
			type: "article",
			publishedTime: "2026-10-12",
			modifiedTime: "2026-10-13",
			authors: ["Eliaz Bobadilla"],
			tags: ["engineering", "products"],
		});
		expect(metadata.alternates?.canonical).toBe(
			"https://bobadilla.tech/pt/blog/engineering-notes"
		);
	});
});

describe("structured data", () => {
	it("describes the company using its canonical identity and contact details", () => {
		const schema = generateOrganizationSchema();

		expect(schema.name).toBe("Bobadilla Tech");
		expect(schema.url).toBe("https://bobadilla.tech");
		expect(schema.logo).toBe("https://bobadilla.tech/assets/logo.png");
		expect(schema.address).toMatchObject({
			addressLocality: "Lima",
			addressCountry: "PE",
		});
		expect(schema.founder).toMatchObject({
			name: "Eliaz Bobadilla",
			url: "https://ultirequiem.xyz",
		});
		expect(schema.contactPoint).toMatchObject({
			email: "ale@bobadilla.tech",
			availableLanguage: ["English", "Spanish"],
		});
	});

	it("includes a price specification only when a service has a price range", () => {
		const priced = generateServiceSchema({
			name: "Software engineering",
			description: "Custom software delivery",
			url: "https://bobadilla.tech/services",
			priceRange: "$5,000+",
		});
		const unpriced = generateServiceSchema({
			name: "Technical discovery",
			description: "A scoped assessment",
			url: "https://bobadilla.tech/system-audit",
		});

		expect(priced.provider).toMatchObject({ name: SITE_NAME, url: BASE_URL });
		expect(
			priced.hasOfferCatalog.itemListElement[0].priceSpecification
		).toEqual({
			"@type": "PriceSpecification",
			priceCurrency: "USD",
			price: "$5,000+",
		});
		expect(
			unpriced.hasOfferCatalog.itemListElement[0].priceSpecification
		).toBeUndefined();
	});

	it("maps breadcrumb and FAQ entries to schema.org list items", () => {
		expect(
			generateBreadcrumbSchema([
				{ name: "Home", url: "https://bobadilla.tech" },
				{ name: "Company", url: "https://bobadilla.tech/company" },
			]).itemListElement
		).toEqual([
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: "https://bobadilla.tech",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Company",
				item: "https://bobadilla.tech/company",
			},
		]);
		expect(
			generateFAQSchema([
				{ question: "Where are you based?", answer: "Lima, Peru." },
			]).mainEntity
		).toEqual([
			{
				"@type": "Question",
				name: "Where are you based?",
				acceptedAnswer: { "@type": "Answer", text: "Lima, Peru." },
			},
		]);
	});
});
