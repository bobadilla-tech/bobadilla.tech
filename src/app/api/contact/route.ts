import type { NextRequest } from "next/server";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
	errorResponse,
	successResponse,
	validationErrorResponse,
} from "~/lib/server/api-response";
import { getDb } from "~/db/client";
import { insertContactMessage } from "@/features/leads/api/db";
import { sendEmailNotification } from "@/features/leads/api/email-notification";
import { logContactSubmission } from "@/features/leads/api/logger";
import { contactSchema } from "@/features/leads/model/contactSchema";

export async function POST(request: NextRequest) {
	try {
		const { env } = getCloudflareContext();
		const db = getDb(env.DB);

		const body = await request.json();
		const validatedData = contactSchema.parse(body);

		const insertedMessage = await insertContactMessage(db, validatedData);

		logContactSubmission(insertedMessage);

		try {
			await sendEmailNotification(insertedMessage);
		} catch (emailError) {
			console.error("Email notification failed:", emailError);
		}

		return successResponse(
			{ id: insertedMessage.id },
			"Thank you for contacting us! We'll get back to you soon.",
			201
		);
	} catch (error) {
		console.error("Contact form error:", error);

		if (error instanceof z.ZodError) {
			return validationErrorResponse(error, "Invalid form data");
		}

		return errorResponse(
			"Failed to submit contact form. Please try again later."
		);
	}
}
