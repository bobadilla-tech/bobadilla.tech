import { CTABand } from "@/shared/components/client";
import { ContactForm } from "@/features/leads";
import {
	Hero,
	StatsBar,
	Services,
	Industries,
	FAQ,
	WhatWeDo,
	EngineeringPrinciples,
} from "@/features/home";
import { generateOrganizationSchema } from "~/shared/lib/seo";

export default function Home() {
	const organizationSchema = generateOrganizationSchema();

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
			<Hero />
			<WhatWeDo />
			<Services />
			<StatsBar />
			<EngineeringPrinciples />
			<Industries />
			<FAQ />
			<CTABand />
			<ContactForm />
		</>
	);
}
