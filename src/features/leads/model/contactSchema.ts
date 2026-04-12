import z from "zod";

export const contactSchema = z.object({
	name: z.string().min(1, "Name is required").max(100),
	email: z.email("Invalid email address"),
	company: z.string().max(100).optional(),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(2000),
});
