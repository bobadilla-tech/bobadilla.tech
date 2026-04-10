import { describe, expect, it } from "vitest";

import { contactSchema } from "./validation";

describe("contactSchema", () => {
	it("accepts a valid contact payload", () => {
		const result = contactSchema.safeParse({
			name: "Eliaz Bobadilla",
			email: "eliaz@bobadilla.tech",
			company: "Bobadilla Tech",
			message: "I need help building a multilingual marketing site.",
		});

		expect(result.success).toBe(true);
	});

	it("allows an omitted optional company", () => {
		const result = contactSchema.safeParse({
			name: "Eliaz Bobadilla",
			email: "eliaz@bobadilla.tech",
			message: "I need help building a multilingual marketing site.",
		});

		expect(result.success).toBe(true);
	});

	it("rejects an invalid email", () => {
		const result = contactSchema.safeParse({
			name: "Eliaz Bobadilla",
			email: "not-an-email",
			message: "I need help building a multilingual marketing site.",
		});

		expect(result.success).toBe(false);
		expect(result.error?.issues[0]?.message).toBe("Invalid email address");
	});

	it("rejects messages shorter than the minimum length", () => {
		const result = contactSchema.safeParse({
			name: "Eliaz Bobadilla",
			email: "eliaz@bobadilla.tech",
			message: "Too short",
		});

		expect(result.success).toBe(false);
		expect(result.error?.issues[0]?.message).toBe(
			"Message must be at least 10 characters"
		);
	});

	it("rejects a name longer than 100 characters", () => {
		const result = contactSchema.safeParse({
			name: "a".repeat(101),
			email: "eliaz@bobadilla.tech",
			message: "I need help building a multilingual marketing site.",
		});

		expect(result.success).toBe(false);
		expect(result.error?.issues[0]?.path).toEqual(["name"]);
	});
});
