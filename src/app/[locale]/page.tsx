import { CTABand } from "@/shared/components";
import { ContactForm } from "@/features/leads";
import { Hero, StatsBar, Services, WhyBobatech, Industries, FAQ } from "@/features/home";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
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
