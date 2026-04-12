import { createRouteHandler } from "~/shared/lib/api";
import { pricingEstimates } from "~/db/schema";
import { estimateSchema } from "@/features/pricing/model/validation";

export const POST = createRouteHandler({
	schema: estimateSchema,
	successStatus: 201,
	handler: async ({ data, db }) => {
		const [inserted] = await db
			.insert(pricingEstimates)
			.values({
				email: data.email,
				totalPrice: data.totalPrice,
				selections: data.selections,
				breakdown: data.breakdown,
				createdAt: new Date(),
			})
			.returning();

		console.log("📊 Pricing estimate saved:");
		console.log(`   Email: ${data.email}`);
		console.log(`   Total: $${data.totalPrice}`);
		console.log(`   ID: ${inserted.id}`);

		return { id: inserted.id };
	},
});
