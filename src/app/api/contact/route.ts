import { createRouteHandler } from "~/shared/lib/api";
import { contactSchema } from "@/features/leads/model/contactSchema";
import { insertContactMessage } from "@/features/leads/api/db";
import { sendEmailNotification } from "@/features/leads/api/email-notification";
import { logContactSubmission } from "@/features/leads/api/logger";

export const POST = createRouteHandler({
	schema: contactSchema,
	successStatus: 201,
	handler: async ({ data, db }) => {
		const message = await insertContactMessage(db, data);

		logContactSubmission(message);

		try {
			await sendEmailNotification(message);
		} catch (emailError) {
			console.error("Email notification failed:", emailError);
		}

		return { id: message.id };
	},
});
