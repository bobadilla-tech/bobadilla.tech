import z, { ZodError } from "zod";

export const estimateSchema = z.object({
	email: z.email("Invalid email address"),
	totalPrice: z.number().positive("Total price must be positive"),
	selections: z.record(z.string(), z.array(z.string())),
	breakdown: z.string(),
});

const emailSchema = z.email("Invalid email. Please enter valid email address");

export const validEmail = (email: string) => {
	try {
		emailSchema.parse(email);
		return;
	} catch (err) {
		if (err instanceof ZodError) {
			throw new ZodError(err.issues);
		} else if (err instanceof Error) {
			throw new Error(err.message, { cause: err });
		}
	}
};
