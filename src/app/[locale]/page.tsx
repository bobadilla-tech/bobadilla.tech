import { CTABand } from "@/shared/components/client";
import { ContactForm } from "@/features/leads";
import { Hero, StatsBar, Services, WhyBobatech, Industries, FAQ } from "@/features/home";
import { generateOrganizationSchema } from "~/lib/seo";

export default function Home() {
	const organizationSchema = generateOrganizationSchema();

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
			<Hero />
			<StatsBar />
			<Services />
			<WhyBobatech />
			<Industries />
			<FAQ />
			<CTABand />
			<ContactForm />
		</>
	);
}
