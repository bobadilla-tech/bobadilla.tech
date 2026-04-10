import { Resend } from "resend";
import { render } from "@react-email/render";
import { env } from "~/env";
import { ContactEmail } from "./contact-email";

const OBSERVERS = ["eliaz@bobadilla.tech", "ale@bobadilla.tech"];

interface ContactData {
	name: string;
	email: string;
	company?: string | null;
	message: string;
	createdAt: string | Date;
}

export async function sendEmailNotification(data: ContactData): Promise<void> {
	const resend = new Resend(env.RESEND_API_KEY);

	const receivedAt = new Date(data.createdAt).toLocaleString("en-US", {
		timeZone: "America/Lima",
		dateStyle: "medium",
		timeStyle: "short",
	});

	const html = await render(
		ContactEmail({
			name: data.name,
			email: data.email,
			company: data.company,
			message: data.message,
			receivedAt,
		})
	);

	const { error } = await resend.emails.send({
		from: "Bobadilla.tech <notifications@bobadilla.tech>",
		to: OBSERVERS,
		replyTo: data.email,
		subject: `New message from ${data.name}`,
		html,
	});

	if (error) {
		throw new Error(`Resend error: ${error.message}`);
	}

	console.log(
		`✅ Notification sent to observers for message from "${data.name}" <${data.email}>`
	);
}
