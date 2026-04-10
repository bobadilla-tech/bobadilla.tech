import {
	Html,
	Head,
	Body,
	Container,
	Heading,
	Text,
	Hr,
	Section,
} from "@react-email/components";

interface ContactEmailProps {
	name: string;
	email: string;
	company?: string | null;
	message: string;
	receivedAt: string;
}

export function ContactEmail({
	name,
	email,
	company,
	message,
	receivedAt,
}: ContactEmailProps) {
	return (
		<Html>
			<Head />
			<Body
				style={{
					fontFamily: "sans-serif",
					backgroundColor: "#f4f4f4",
					padding: "24px",
				}}
			>
				<Container
					style={{
						backgroundColor: "#fff",
						borderRadius: "8px",
						padding: "32px",
						maxWidth: "560px",
					}}
				>
					<Heading style={{ fontSize: "20px", marginBottom: "8px" }}>
						New Contact Form Submission
					</Heading>
					<Text style={{ color: "#555", marginBottom: "24px" }}>
						Received at {receivedAt}
					</Text>
					<Hr />
					<Section style={{ marginTop: "16px" }}>
						<Text>
							<strong>Name:</strong> {name}
						</Text>
						<Text>
							<strong>Email:</strong> {email}
						</Text>
						{company && (
							<Text>
								<strong>Company:</strong> {company}
							</Text>
						)}
						<Text>
							<strong>Message:</strong>
						</Text>
						<Text style={{ whiteSpace: "pre-wrap", color: "#333" }}>
							{message}
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}
