import { describe, expect, it } from "vitest";

import { BRAND } from "~/shared/lib/brand";

import { disciplines, SHOW_EXTENDED_NETWORK, teamMembers } from "./team";

describe("team model", () => {
	it("uses the founder's company identity and website", () => {
		expect(teamMembers).toContainEqual({
			id: "eliaz",
			name: BRAND.founder.name,
			photo: "/faces/eliaz.jpeg",
			links: { website: BRAND.founder.url },
		});
	});

	it("exposes the current disciplines without the extended network", () => {
		expect(disciplines).toEqual(["fullstack", "backend", "backendAi"]);
		expect(SHOW_EXTENDED_NETWORK).toBe(false);
	});
});
