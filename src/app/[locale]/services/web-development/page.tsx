import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Button from "@/components/ui/Button";
import ServiceHero from "@/components/sections/service-page/ServiceHero";
import ServicePainPoints from "@/components/sections/service-page/ServicePainPoints";
import ServiceOfferings from "@/components/sections/service-page/ServiceOfferings";
import ServiceReasons from "@/components/sections/service-page/ServiceReasons";
import ServiceProcess from "@/components/sections/service-page/ServiceProcess";
import ServiceTechStack from "@/components/sections/service-page/ServiceTechStack";
import ServiceFAQ from "@/components/sections/service-page/ServiceFAQ";
import ServiceEstimateCTA from "@/components/sections/service-page/ServiceEstimateCTA";
import CTABand from "@/components/sections/CTABand";
import { getServicePageData } from "@/data/service-pages";
import { CAL_LINKS } from "~/lib/constants";
import { generateMetadata as genMeta, BASE_URL, KEYWORD_SETS } from "~/lib/seo";
import type { Locale } from "~/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return genMeta({
		title: "Web Development Services",
		description:
			"We build modern websites and web applications optimized for speed, engagement, and growth. Expert LATAM developers, fast delivery.",
		keywords: [
			...KEYWORD_SETS.core,
			...KEYWORD_SETS.services,
			"web development",
			"web applications",
			"next.js development",
		],
		canonical: `${BASE_URL}/${locale}/services/web-development`,
	});
}

export default async function WebDevelopmentPage({ params }: Props) {
	const { locale } = await params;
	const data = getServicePageData("web-development", locale as Locale)!;

	return (
		<div className="min-h-screen">
			<Navbar />

			{/* 1. Hero */}
			<ServiceHero
				eyebrow={data.eyebrow}
				line1={data.heroLine1}
				line2={data.heroLine2}
				subtitle={data.heroSubtitle}
			/>

			{/* 2. Pain Points */}
			<ServicePainPoints
				heading={data.painPointsHeading}
				painPoints={data.painPoints}
			/>

			{/* 3. Urgency band — unique to web-dev page */}
			{data.urgencyBandText && (
				<section className="py-8 px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<div className="bg-brand-gold/60 rounded-[50px] px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
							<p className="font-body text-white text-2xl text-center sm:text-left">
								{data.urgencyBandText}
							</p>
							<Button href={CAL_LINKS.ale} variant="gold" className="shrink-0">
								{data.urgencyBandCta}
							</Button>
						</div>
					</div>
				</section>
			)}

			{/* 4. Development Services Offered */}
			<ServiceOfferings
				heading={data.servicesHeading}
				services={data.servicesOffered}
			/>

			{/* 5. Reasons to Work With Us */}
			<ServiceReasons />

			{/* 6. Development Process */}
			<ServiceProcess
				heading={data.processHeading}
				subtitle={data.processSubtitle}
				steps={data.processSteps}
			/>

			{/* 7. Tech Stack */}
			<ServiceTechStack categories={data.techStack} />

			{/* 8. FAQ */}
			<ServiceFAQ faqs={data.faqOverrides} />

			{/* 9. Free Estimate CTA */}
			<ServiceEstimateCTA />

			{/* 10. CTA Band */}
			<CTABand />

			<Footer />
		</div>
	);
}
