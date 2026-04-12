import type { DbInstance } from "~/db/client";
import { contactMessages } from "~/db/schema";

interface ContactMessageData {
	name: string;
	email: string;
	company?: string | null;
	message: string;
}

/**
 * Insert a new contact message into the database
 * @param db Drizzle database instance
 * @param data Contact message data
 * @returns The inserted message with generated fields
 */
export async function insertContactMessage(
	db: DbInstance,
	data: ContactMessageData
) {
	const [insertedMessage] = await db
		.insert(contactMessages)
		.values({
			name: data.name,
			email: data.email,
			company: data.company || null,
			message: data.message,
		})
		.returning();

	return insertedMessage;
}
