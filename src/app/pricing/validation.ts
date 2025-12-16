import z, { ZodError } from "zod";

const emailSchema = z.email("Invalid email. Please enter valid email address");

export const validEmail = (email: string) => {
	try {
		emailSchema.parse(email);
		return;
	} catch (err) {
		if (err instanceof ZodError) {
			throw new ZodError(err.issues);
		} else if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
};
