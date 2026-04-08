import Contact from "@/components/sections/Contact";
import CTABand from "@/components/sections/CTABand";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Services from "@/components/sections/Services";
import StatsBar from "@/components/sections/StatsBar";
import WhyBobatech from "@/components/sections/WhyBobatech";
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
					<Contact />
				</main>
				<Footer />
			</div>
		</>
	);
}
