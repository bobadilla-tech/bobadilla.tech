import { allServices, industryServices } from "../model/services";
import type { Service, IndustryService } from "../model/types";

export function getServiceBySlug(slug: string): Service | null {
	return (
		allServices.find((s) => s.slug === slug) ||
		industryServices.flatMap((i) => i.services).find((s) => s.slug === slug) ||
		null
	);
}

export function getIndustryBySlug(slug: string): IndustryService | null {
	return industryServices.find((i) => i.slug === slug) || null;
}

export function getRelatedServices(slug: string): Service[] {
	const relatedIndustry = industryServices.find((industry) =>
		industry.services.some((s) => s.slug === slug)
	);

	if (relatedIndustry) {
		return relatedIndustry.services.filter((s) => s.slug !== slug).slice(0, 3);
	}

	return allServices.filter((s) => s.slug !== slug).slice(0, 3);
}
