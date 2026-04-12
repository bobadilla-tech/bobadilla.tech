import { CTABand } from "@/shared/components/client";
import { ContactForm } from "@/features/leads";
import { Hero, StatsBar, Services, WhyBobatech, Industries, FAQ } from "@/features/home";
import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";
import { generateOrganizationSchema } from "~/lib/seo";

export default function Home() {
	const organizationSchema = generateOrganizationSchema();

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
			<div className="relative min-h-screen">
				<Navbar />
				<main>
					<Hero />
					<StatsBar />
					<Services />
					<WhyBobatech />
					<Industries />
					<FAQ />
					<CTABand />
					<ContactForm />
				</main>
				<Footer />
			</div>
		</>
	);
}
