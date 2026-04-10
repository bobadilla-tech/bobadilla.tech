import { z } from "zod";
import { describe, expect, it } from "vitest";

import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "./api-response";

describe("successResponse", () => {
	it("returns a JSON success response with data and message", async () => {
		const response = successResponse({ id: "msg_123" }, "Created", 201);

		expect(response.status).toBe(201);
		await expect(response.json()).resolves.toEqual({
			success: true,
			message: "Created",
			data: { id: "msg_123" },
		});
	});

	it("omits optional fields when no data or message is provided", async () => {
		const response = successResponse();

		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({
			success: true,
		});
	});
});

describe("errorResponse", () => {
	it("returns a JSON error response with the provided status", async () => {
		const response = errorResponse("Bad request", 400);

		expect(response.status).toBe(400);
		await expect(response.json()).resolves.toEqual({
			success: false,
			message: "Bad request",
		});
	});
});

describe("validationErrorResponse", () => {
	it("formats zod issues as field errors", async () => {
		const schema = z.object({
			email: z.email("Invalid email"),
			profile: z.object({
				name: z.string().min(1, "Name is required"),
			}),
		});

		const result = schema.safeParse({
			email: "invalid",
			profile: {
				name: "",
			},
		});

		expect(result.success).toBe(false);

		const response = validationErrorResponse(result.error, "Invalid form data");

		expect(response.status).toBe(400);
		await expect(response.json()).resolves.toEqual({
			success: false,
			message: "Invalid form data",
			errors: [
				{ field: "email", message: "Invalid email" },
				{ field: "profile.name", message: "Name is required" },
			],
		});
	});
});
