import { describe, expect, it } from "vitest";

import { openSourceProjects, products } from "./products";

describe("company products and open source projects", () => {
	it("lists the company's products and their case studies", () => {
		expect(products.map(({ id }) => id)).toEqual([
			"requiemsApi",
			"compileStrength",
			"biasMarket",
		]);
		expect(products[0]).toMatchObject({
			name: "Requiems API",
			url: "https://requiemsapi.com",
			caseStudyHref: "/case-studies/requiems-api",
		});
		expect(products[2].caseStudyHref).toBeUndefined();
	});

	it("links every open source project to the company GitHub organization", () => {
		expect(openSourceProjects).toHaveLength(6);
		expect(
			openSourceProjects.every(({ url }) =>
				url.startsWith("https://github.com/bobadilla-tech/")
			)
		).toBe(true);
		expect(openSourceProjects.map(({ language }) => language)).toEqual([
			"Go",
			"Go",
			"Go",
			"Go",
			"Go",
			"Go",
		]);
	});
});
