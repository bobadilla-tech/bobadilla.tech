import { z } from "zod";

export const estimateSchema = z.object({
	email: z.string().email("Invalid email address"),
	totalPrice: z.number().positive("Total price must be positive"),
	selections: z.record(z.string(), z.array(z.string())),
	breakdown: z.string(),
});

export type EstimateData = z.infer<typeof estimateSchema>;
