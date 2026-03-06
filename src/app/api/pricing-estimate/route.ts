import type { NextRequest } from "next/server";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
import { getDb } from "~/db/client";
import { pricingEstimates } from "~/db/schema";
import { logPricingEstimate } from "./logger";
import { estimateSchema } from "./validation";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = estimateSchema.parse(body);

		// Get Cloudflare D1 database from context
		const { env } = await getCloudflareContext();
		const db = getDb(env.DB);

		const [inserted] = await db
			.insert(pricingEstimates)
			.values({
				email: validatedData.email,
				totalPrice: validatedData.totalPrice,
				selections: validatedData.selections,
				breakdown: validatedData.breakdown,
				createdAt: new Date(),
			})
			.returning();

		logPricingEstimate({
			id: inserted.id,
			email: validatedData.email,
			totalPrice: validatedData.totalPrice,
		});

		return successResponse(
			{ id: inserted.id },
			"Estimate saved successfully",
			201
		);
	} catch (error) {
		console.error("Error saving pricing estimate:", error);

		if (error instanceof z.ZodError) {
			return validationErrorResponse(error);
		}

		return errorResponse("Failed to save estimate");
	}
}
