import { describe, it, expect } from "vitest";
import {
	calculateStepTotal,
	calculateTotal,
	getSelectedOptionsByStep,
	formatSelectionsSummary,
} from "./utils";
import type { Selections } from "./types";

describe("calculateStepTotal", () => {
	it("should calculate total for single selection in project type step", () => {
		const selections: Selections = { 0: ["landing"] };
		expect(calculateStepTotal(0, selections)).toBe(350);
	});

	it("should calculate total for multi-page website selection", () => {
		const selections: Selections = { 0: ["website"] };
		expect(calculateStepTotal(0, selections)).toBe(800);
	});

	it("should calculate total for web app selection", () => {
		const selections: Selections = { 0: ["webapp"] };
		expect(calculateStepTotal(0, selections)).toBe(2500);
	});

	it("should calculate total for multiple selections in core features step", () => {
		const selections: Selections = { 1: ["auth", "payment"] };
		expect(calculateStepTotal(1, selections)).toBe(500 + 800); // 1300
	});

	it("should calculate total for all core features", () => {
		const selections: Selections = {
			1: ["auth", "payment", "admin", "api", "realtime", "notifications"],
		};
		expect(calculateStepTotal(1, selections)).toBe(
			500 + 800 + 1200 + 600 + 1000 + 400
		); // 4500
	});

	it("should calculate total for multiple integrations", () => {
		const selections: Selections = { 2: ["crm", "analytics", "email"] };
		expect(calculateStepTotal(2, selections)).toBe(600 + 300 + 400); // 1300
	});

	it("should calculate total for premium design option", () => {
		const selections: Selections = { 3: ["premium"] };
		expect(calculateStepTotal(3, selections)).toBe(1500);
	});

	it("should return 0 for basic UI option (free)", () => {
		const selections: Selections = { 3: ["basic"] };
		expect(calculateStepTotal(3, selections)).toBe(0);
	});

	it("should return 0 for timeline options (multipliers, not additions)", () => {
		const selections: Selections = { 4: ["rush"] };
		expect(calculateStepTotal(4, selections)).toBe(0);
	});

	it("should return 0 when no selections for a step", () => {
		const selections: Selections = {};
		expect(calculateStepTotal(0, selections)).toBe(0);
	});

	it("should return 0 when step has empty array", () => {
		const selections: Selections = { 0: [] };
		expect(calculateStepTotal(0, selections)).toBe(0);
	});

	it("should ignore invalid option IDs", () => {
		const selections: Selections = { 0: ["invalid-option"] };
		expect(calculateStepTotal(0, selections)).toBe(0);
	});

	it("should handle mixed valid and invalid option IDs", () => {
		const selections: Selections = { 1: ["auth", "invalid", "payment"] };
		expect(calculateStepTotal(1, selections)).toBe(500 + 800); // 1300, ignoring invalid
	});
});

describe("calculateTotal", () => {
	it("should calculate base price correctly for single selection", () => {
		const selections: Selections = { 0: ["landing"] };
		expect(calculateTotal(selections)).toBe(350);
	});

	it("should calculate base price for multiple steps", () => {
		const selections: Selections = {
			0: ["landing"],
			1: ["auth"],
			3: ["basic"],
		};
		expect(calculateTotal(selections)).toBe(350 + 500 + 0); // 850
	});

	it("should apply rush multiplier (1.3x)", () => {
		const selections: Selections = {
			0: ["landing"],
			4: ["rush"],
		};
		expect(calculateTotal(selections)).toBe(Math.round(350 * 1.3)); // 455
	});

	it("should apply flexible multiplier (0.85x)", () => {
		const selections: Selections = {
			0: ["landing"],
			4: ["flexible"],
		};
		expect(calculateTotal(selections)).toBe(Math.round(350 * 0.85)); // 298
	});

	it("should apply standard multiplier (1x)", () => {
		const selections: Selections = {
			0: ["landing"],
			4: ["standard"],
		};
		expect(calculateTotal(selections)).toBe(350); // No change
	});

	it("should not apply multiplier when no timeline selected", () => {
		const selections: Selections = {
			0: ["webapp"],
			1: ["auth", "payment"],
		};
		expect(calculateTotal(selections)).toBe(2500 + 500 + 800); // 3800
	});

	it("should apply rush multiplier to complex selection", () => {
		const selections: Selections = {
			0: ["webapp"],
			1: ["auth", "payment"],
			2: ["analytics"],
			3: ["custom"],
			4: ["rush"],
		};
		const baseTotal = 2500 + 500 + 800 + 300 + 800; // 4900
		expect(calculateTotal(selections)).toBe(Math.round(baseTotal * 1.3)); // 6370
	});

	it("should apply flexible multiplier to complex selection", () => {
		const selections: Selections = {
			0: ["fullstack"],
			1: ["auth", "payment", "admin"],
			2: ["crm", "analytics"],
			3: ["premium"],
			4: ["flexible"],
		};
		const baseTotal = 5000 + 500 + 800 + 1200 + 600 + 300 + 1500; // 9900
		expect(calculateTotal(selections)).toBe(Math.round(baseTotal * 0.85)); // 8415
	});

	it("should handle empty selections", () => {
		const selections: Selections = {};
		expect(calculateTotal(selections)).toBe(0);
	});

	it("should handle timeline-only selection", () => {
		const selections: Selections = { 4: ["rush"] };
		expect(calculateTotal(selections)).toBe(0);
	});

	it("should ignore invalid option IDs in total calculation", () => {
		const selections: Selections = {
			0: ["landing"],
			1: ["invalid-option"],
		};
		expect(calculateTotal(selections)).toBe(350);
	});

	it("should round to nearest dollar", () => {
		const selections: Selections = {
			0: ["landing"], // 350
			1: ["auth"], // 500
			4: ["flexible"], // 0.85x
		};
		// 850 * 0.85 = 722.5, should round to 723
		expect(calculateTotal(selections)).toBe(723);
	});

	it("should calculate all features with rush multiplier", () => {
		const selections: Selections = {
			0: ["mobile"],
			1: ["auth", "payment", "admin", "api", "realtime", "notifications"],
			2: ["crm", "analytics", "email", "storage", "social"],
			3: ["premium"],
			4: ["rush"],
		};
		// Mobile: 3500, Core Features: 4500, Integrations: 2150, Premium: 1500
		const baseTotal = 3500 + 4500 + 2150 + 1500; // 11650
		expect(calculateTotal(selections)).toBe(Math.round(baseTotal * 1.3)); // 15145
	});
});

describe("getSelectedOptionsByStep", () => {
	it("should return breakdown for single step selection", () => {
		const selections: Selections = { 0: ["landing"] };
		const result = getSelectedOptionsByStep(selections);

		expect(result).toHaveLength(1);
		expect(result[0].stepTitle).toBe("Project Type");
		expect(result[0].options).toHaveLength(1);
		expect(result[0].options[0].name).toBe("Landing Page");
		expect(result[0].options[0].price).toBe(350);
		expect(result[0].total).toBe(350);
	});

	it("should return breakdown for multiple steps", () => {
		const selections: Selections = {
			0: ["webapp"],
			1: ["auth", "payment"],
		};
		const result = getSelectedOptionsByStep(selections);

		expect(result).toHaveLength(2);
		expect(result[0].stepTitle).toBe("Project Type");
		expect(result[0].options).toHaveLength(1);
		expect(result[0].total).toBe(2500);

		expect(result[1].stepTitle).toBe("Core Features");
		expect(result[1].options).toHaveLength(2);
		expect(result[1].total).toBe(1300);
	});

	it("should include all option details", () => {
		const selections: Selections = { 1: ["auth"] };
		const result = getSelectedOptionsByStep(selections);

		expect(result[0].options[0]).toEqual({
			name: "User Authentication",
			price: 500,
			description:
				"Secure login/signup system with email verification, password reset, and session management",
		});
	});

	it("should filter out steps with no selections", () => {
		const selections: Selections = { 0: ["landing"] };
		const result = getSelectedOptionsByStep(selections);

		expect(result).toHaveLength(1);
		expect(result.every((step) => step.options.length > 0)).toBe(true);
	});

	it("should handle multiple selections in multi-select steps", () => {
		const selections: Selections = {
			2: ["analytics", "email", "social"],
		};
		const result = getSelectedOptionsByStep(selections);

		expect(result).toHaveLength(1);
		expect(result[0].stepTitle).toBe("Integrations");
		expect(result[0].options).toHaveLength(3);
		expect(result[0].total).toBe(300 + 400 + 350); // 1050
	});

	it("should return empty array for empty selections", () => {
		const selections: Selections = {};
		const result = getSelectedOptionsByStep(selections);

		expect(result).toEqual([]);
	});

	it("should ignore invalid option IDs", () => {
		const selections: Selections = {
			0: ["landing", "invalid-option"],
		};
		const result = getSelectedOptionsByStep(selections);

		expect(result[0].options).toHaveLength(1);
		expect(result[0].options[0].name).toBe("Landing Page");
	});

	it("should handle design options correctly", () => {
		const selections: Selections = { 3: ["basic"] };
		const result = getSelectedOptionsByStep(selections);

		expect(result).toHaveLength(1);
		expect(result[0].stepTitle).toBe("Design & UI");
		expect(result[0].options[0].name).toBe("Basic UI (Template-based)");
		expect(result[0].options[0].price).toBe(0);
		expect(result[0].total).toBe(0);
	});

	it("should handle timeline selections", () => {
		const selections: Selections = { 4: ["rush"] };
		const result = getSelectedOptionsByStep(selections);

		expect(result).toHaveLength(1);
		expect(result[0].stepTitle).toBe("Timeline");
		expect(result[0].options[0].name).toBe("Rush (1-2 weeks) +30%");
	});

	it("should handle all steps with selections", () => {
		const selections: Selections = {
			0: ["landing"],
			1: ["auth"],
			2: ["analytics"],
			3: ["custom"],
			4: ["standard"],
		};
		const result = getSelectedOptionsByStep(selections);

		expect(result).toHaveLength(5);
		expect(result.map((r) => r.stepTitle)).toEqual([
			"Project Type",
			"Core Features",
			"Integrations",
			"Design & UI",
			"Timeline",
		]);
	});
});

describe("formatSelectionsSummary", () => {
	it("should format single selection", () => {
		const selections: Selections = { 0: ["landing"] };
		const result = formatSelectionsSummary(selections);

		expect(result).toBe("Project Type:\n  - Landing Page");
	});

	it("should format multiple selections in one step", () => {
		const selections: Selections = { 1: ["auth", "payment"] };
		const result = formatSelectionsSummary(selections);

		expect(result).toBe(
			"Core Features:\n  - User Authentication\n  - Payment Integration"
		);
	});

	it("should format multiple steps with separator", () => {
		const selections: Selections = {
			0: ["webapp"],
			1: ["auth"],
		};
		const result = formatSelectionsSummary(selections);

		expect(result).toBe(
			"Project Type:\n  - Web Application\n\nCore Features:\n  - User Authentication"
		);
	});

	it("should format complex selection with all steps", () => {
		const selections: Selections = {
			0: ["landing"],
			1: ["auth", "payment"],
			2: ["analytics"],
			3: ["custom"],
			4: ["rush"],
		};
		const result = formatSelectionsSummary(selections);

		expect(result).toContain("Project Type:\n  - Landing Page");
		expect(result).toContain(
			"Core Features:\n  - User Authentication\n  - Payment Integration"
		);
		expect(result).toContain("Integrations:\n  - Analytics (GA, Mixpanel)");
		expect(result).toContain("Design & UI:\n  - Custom Design");
		expect(result).toContain("Timeline:\n  - Rush (1-2 weeks) +30%");
	});

	it("should return empty string for empty selections", () => {
		const selections: Selections = {};
		const result = formatSelectionsSummary(selections);

		expect(result).toBe("");
	});

	it("should handle only timeline selection", () => {
		const selections: Selections = { 4: ["flexible"] };
		const result = formatSelectionsSummary(selections);

		expect(result).toBe("Timeline:\n  - Flexible (5+ weeks) -15%");
	});

	it("should ignore invalid option IDs", () => {
		const selections: Selections = {
			0: ["landing"],
			1: ["invalid-option"],
		};
		const result = formatSelectionsSummary(selections);

		expect(result).toBe("Project Type:\n  - Landing Page");
	});
});

describe("Edge Cases", () => {
	it("should handle selections with invalid step indices", () => {
		const selections: Selections = {
			99: ["some-option"], // Invalid step index
			0: ["landing"],
		};

		expect(() => calculateTotal(selections)).not.toThrow();
		expect(calculateTotal(selections)).toBe(350);
	});

	it("should return 0 for out-of-bounds step indices", () => {
		const selections: Selections = { 0: ["landing"] };
		// Accessing a step index that doesn't exist
		expect(calculateStepTotal(999, selections)).toBe(0);
	});

	it("should handle undefined and null values gracefully", () => {
		const selections: Selections = { 0: ["landing"] };
		expect(() => calculateStepTotal(999, selections)).not.toThrow();
		expect(calculateStepTotal(999, selections)).toBe(0);
	});

	it("should handle selections with mixed valid and empty steps", () => {
		const selections: Selections = {
			0: ["landing"],
			1: [],
			2: ["analytics"],
		};

		const result = getSelectedOptionsByStep(selections);
		expect(result).toHaveLength(2); // Only steps with selections
	});

	it("should handle duplicate option IDs in selections", () => {
		const selections: Selections = {
			0: ["landing", "landing"], // Duplicate
		};

		expect(calculateStepTotal(0, selections)).toBe(350 + 350); // 700
	});

	it("should handle very large numbers without overflow", () => {
		const selections: Selections = {
			0: ["fullstack"],
			1: ["auth", "payment", "admin", "api", "realtime", "notifications"],
			2: ["crm", "analytics", "email", "storage", "social"],
			3: ["premium"],
			4: ["rush"],
		};

		const result = calculateTotal(selections);
		expect(result).toBeGreaterThan(0);
		expect(Number.isFinite(result)).toBe(true);
	});

	it("should handle empty option arrays in steps", () => {
		const selections: Selections = {
			0: [],
			1: [],
			2: [],
		};

		expect(calculateTotal(selections)).toBe(0);
		expect(getSelectedOptionsByStep(selections)).toEqual([]);
	});
});
