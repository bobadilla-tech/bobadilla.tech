interface ContactSubmission {
	name: string;
	email: string;
	company?: string | null;
	message: string;
	id: number;
	createdAt: Date;
}

/**
 * Log contact form submission details
 * @param submission Contact form submission data
 */
export function logContactSubmission(submission: ContactSubmission): void {
	console.log(
		`📧 New contact form submission: ID=${submission.id}, Name="${submission.name}", Email="${submission.email}", Company="${submission.company || "N/A"}", Message="${submission.message.substring(0, 100)}...", Time=${submission.createdAt.toISOString()}`
	);
}
