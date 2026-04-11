import { Resend } from "resend";
import { env } from "~/env";

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

	const html = createContactEmailHtml({
		name: data.name,
		email: data.email,
		company: data.company,
		message: data.message,
		receivedAt,
	});
	const text = createContactEmailText({
		name: data.name,
		email: data.email,
		company: data.company,
		message: data.message,
		receivedAt,
	});

	const { error } = await resend.emails.send({
		from: "Bobadilla.tech <notifications@mail.bobadilla.tech>",
		to: OBSERVERS,
		replyTo: data.email,
		subject: `New message from ${data.name}`,
		html,
		text,
	});

	if (error) {
		throw new Error(`Resend error: ${error.message}`);
	}

	console.log(
		`✅ Notification sent to observers for message from "${data.name}" <${data.email}>`
	);
}

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function escapeHtmlWithLineBreaks(value: string): string {
	return escapeHtml(value).replaceAll("\n", "<br />");
}

function createContactEmailHtml(data: {
	name: string;
	email: string;
	company?: string | null;
	message: string;
	receivedAt: string;
}): string {
	const companyRow = data.company
		? `
			<p style="margin:0 0 12px;color:#1f2937;">
				<strong>Company:</strong> ${escapeHtml(data.company)}
			</p>
		`
		: "";

	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>New Contact Form Submission</title>
			</head>
			<body style="margin:0;padding:24px;background-color:#f4f4f4;font-family:Arial,sans-serif;">
				<div style="margin:0 auto;max-width:560px;border-radius:8px;background-color:#ffffff;padding:32px;">
					<h1 style="margin:0 0 8px;font-size:20px;">New Contact Form Submission</h1>
					<p style="margin:0 0 24px;color:#6b7280;">Received at ${escapeHtml(data.receivedAt)}</p>
					<hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 16px;" />
					<p style="margin:0 0 12px;color:#1f2937;">
						<strong>Name:</strong> ${escapeHtml(data.name)}
					</p>
					<p style="margin:0 0 12px;color:#1f2937;">
						<strong>Email:</strong> ${escapeHtml(data.email)}
					</p>
					${companyRow}
					<p style="margin:0 0 8px;color:#1f2937;"><strong>Message:</strong></p>
					<p style="margin:0;color:#1f2937;white-space:normal;">
						${escapeHtmlWithLineBreaks(data.message)}
					</p>
				</div>
			</body>
		</html>
	`;
}

function createContactEmailText(data: {
	name: string;
	email: string;
	company?: string | null;
	message: string;
	receivedAt: string;
}): string {
	const companyLine = data.company ? `Company: ${data.company}\n` : "";

	return [
		"New Contact Form Submission",
		`Received at ${data.receivedAt}`,
		"",
		`Name: ${data.name}`,
		`Email: ${data.email}`,
		companyLine.trimEnd(),
		"",
		"Message:",
		data.message,
	]
		.filter(Boolean)
		.join("\n");
}
