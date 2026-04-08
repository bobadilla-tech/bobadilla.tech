import {
	PRICING_STEPS,
	TIMELINE_STEP_ID,
	RUSH_MULTIPLIER,
	FLEXIBLE_MULTIPLIER,
} from "./constants";
import type { Selections, StepBreakdown, SelectedOption } from "./types";

/**
 * Type guard to check if a value is a valid SelectedOption
 */
function isSelectedOption(
	value: SelectedOption | null
): value is SelectedOption {
	return (
		value !== null &&
		typeof value.name === "string" &&
		typeof value.price === "number" &&
		typeof value.description === "string"
	);
}

/**
 * Calculates the total price for a specific step based on user selections.
 *
 * @param stepIndex - The index of the pricing step (0-based)
 * @param selections - User's selections across all steps
 * @returns The sum of all selected option prices for the given step
 *
 * @example
 * calculateStepTotal(0, { 0: ['landing'] }) // Returns 350
 */
export function calculateStepTotal(
	stepIndex: number,
	selections: Selections
): number {
	const step = PRICING_STEPS[stepIndex];
	const stepSelections = selections[stepIndex] || [];
	let total = 0;

	stepSelections.forEach((selectionId) => {
		const option = step.options.find((opt) => opt.id === selectionId);
		if (option) {
			total += option.basePrice;
		}
	});

	return total;
}

/**
 * Calculates the final total price including all selections and timeline multipliers.
 *
 * Timeline multipliers:
 * - Rush: 1.3x (30% increase)
 * - Standard: 1x (no change)
 * - Flexible: 0.85x (15% discount)
 *
 * @param selections - User's selections across all steps
 * @returns The final calculated price (rounded to nearest dollar)
 *
 * @example
 * calculateTotal({
 *   0: ['landing'],
 *   4: ['rush']
 * }) // Returns Math.round(350 * 1.3) = 455
 */
export function calculateTotal(selections: Selections): number {
	let total = 0;
	let timelineMultiplier = 1;

	PRICING_STEPS.forEach((step, stepIndex) => {
		const stepSelections = selections[stepIndex] || [];

		stepSelections.forEach((selectionId) => {
			const option = step.options.find((opt) => opt.id === selectionId);
			if (option) {
				if (step.id === TIMELINE_STEP_ID) {
					if (selectionId === "rush") timelineMultiplier = RUSH_MULTIPLIER;
					else if (selectionId === "flexible")
						timelineMultiplier = FLEXIBLE_MULTIPLIER;
				} else {
					total += option.basePrice;
				}
			}
		});
	});

	return Math.round(total * timelineMultiplier);
}

/**
 * Transforms user selections into a structured breakdown by step.
 * Only includes steps that have at least one selection.
 *
 * @param selections - User's selections across all steps
 * @returns Array of step breakdowns with titles, options, and totals
 *
 * @example
 * getSelectedOptionsByStep({ 0: ['landing'] })
 * // Returns: [{
 * //   stepTitle: 'Project Type',
 * //   options: [{ name: 'Landing Page', price: 350, description: '...' }],
 * //   total: 350
 * // }]
 */
export function getSelectedOptionsByStep(
	selections: Selections
): StepBreakdown[] {
	return PRICING_STEPS.map((step, stepIndex) => {
		const stepSelections = selections[stepIndex] || [];
		const selectedOptions = stepSelections
			.map((selectionId) => {
				const option = step.options.find((opt) => opt.id === selectionId);
				return option
					? {
							name: option.name,
							price: option.basePrice,
							description: option.description,
						}
					: null;
			})
			.filter(isSelectedOption);

		return {
			stepTitle: step.title,
			options: selectedOptions,
			total: selectedOptions.reduce((sum, opt) => sum + opt.price, 0),
		};
	}).filter((item) => item.options.length > 0);
}

/**
 * Formats user selections into a human-readable summary string.
 * Useful for displaying in emails, confirmations, or summaries.
 *
 * @param selections - User's selections across all steps
 * @returns Formatted string with step titles and selected option names
 *
 * @example
 * formatSelectionsSummary({ 0: ['landing'], 1: ['auth'] })
 * // Returns:
 * // "Project Type:
 * //   - Landing Page
 * //
 * // Core Features:
 * //   - User Authentication"
 */
export function formatSelectionsSummary(selections: Selections): string {
	const breakdown = getSelectedOptionsByStep(selections);
	return breakdown
		.map(
			(section) =>
				`${section.stepTitle}:\n${section.options.map((opt) => `  - ${opt?.name}`).join("\n")}`
		)
		.join("\n\n");
}
