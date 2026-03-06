interface PricingEstimate {
	id: number;
	email: string;
	totalPrice: number;
}

/**
 * Log pricing estimate submission details
 * @param estimate Pricing estimate submission data
 */
export function logPricingEstimate(estimate: PricingEstimate): void {
	console.log(
		`📊 Pricing estimate saved: ID=${estimate.id}, Email="${estimate.email}", Total=$${estimate.totalPrice}`
	);
}
