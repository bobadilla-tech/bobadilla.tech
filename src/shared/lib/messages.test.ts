import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import es from "../../../messages/es.json";
import pt from "../../../messages/pt.json";
import { BRAND } from "./brand";

function flatten(obj: unknown, prefix = "", out = new Map<string, string>()) {
	if (typeof obj === "string") out.set(prefix, obj);
	else if (obj && typeof obj === "object") {
		for (const [key, value] of Object.entries(obj)) {
			flatten(value, prefix ? `${prefix}.${key}` : key, out);
		}
	}
	return out;
}

const locales = { en: flatten(en), es: flatten(es), pt: flatten(pt) };

const BRAND_PATHS = [
	"CompanyPage.intro",
	"CompanyPage.origin.p1",
	"Footer.copyright",
	"FounderPage.intro",
	"FounderPage.story.p2",
	"IndustryPage.whyChooseHeading",
	"Metadata.company.description",
	"Metadata.founder.description",
	"Metadata.home.description",
	"Metadata.home.title",
	"Metadata.team.description",
];

describe("messages", () => {
	it("has the same keys in every locale", () => {
		const keys = [...locales.en.keys()].sort();
		expect([...locales.es.keys()].sort()).toEqual(keys);
		expect([...locales.pt.keys()].sort()).toEqual(keys);
	});

	it("contains no brand literals", () => {
		for (const map of Object.values(locales)) {
			for (const [path, value] of map) {
				expect(value, path).not.toContain(BRAND.name);
				expect(value, path).not.toContain(BRAND.shortName);
			}
		}
	});

	it("uses {brand} only where a caller passes it", () => {
		for (const map of Object.values(locales)) {
			expect(
				[...map]
					.filter(([, value]) => value.includes("{brand}"))
					.map(([path]) => path)
					.sort()
			).toEqual(BRAND_PATHS);
		}
	});
});
