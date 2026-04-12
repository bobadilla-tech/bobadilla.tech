import { servicePages as en } from "./service-pages.en";
import { servicePages as es } from "./service-pages.es";
import { servicePages as pt } from "./service-pages.pt";

const byLocale = { en, es, pt } as const;

export function getServicePageData(
	slug: string,
	locale: "en" | "es" | "pt" = "en"
) {
	return byLocale[locale].find((p) => p.slug === slug);
}
