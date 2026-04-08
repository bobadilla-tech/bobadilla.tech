import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ServiceHero from "@/components/sections/service-page/ServiceHero";
import ServicePainPoints from "@/components/sections/service-page/ServicePainPoints";
import ServiceOfferings from "@/components/sections/service-page/ServiceOfferings";
import ServiceReasons from "@/components/sections/service-page/ServiceReasons";
import ServiceProcess from "@/components/sections/service-page/ServiceProcess";
import ServiceTechStack from "@/components/sections/service-page/ServiceTechStack";
import ServiceFAQ from "@/components/sections/service-page/ServiceFAQ";
import CTABand from "@/components/sections/CTABand";
import { getServicePageData } from "@/data/service-pages";
import { generateMetadata as genMeta, BASE_URL, KEYWORD_SETS } from "~/lib/seo";
import type { Locale } from "~/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return genMeta({
		title: "CMS Development Services",
		description: "Headless CMS architecture, Sanity, Strapi, Shopify — built for content editors and developers alike. Fast, flexible, enterprise-secure.",
		keywords: [...KEYWORD_SETS.core, ...KEYWORD_SETS.services, "cms development", "headless cms", "sanity", "strapi"],
		canonical: `${BASE_URL}/${locale}/services/cms-development`,
	});
}

export default async function CmsDevelopmentPage({ params }: Props) {
	const { locale } = await params;
	const data = getServicePageData("cms-development", locale as Locale)!;

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

			{/* 2. Project Workflow (4-step diagonal — shorter flow) */}
			<ServiceProcess
				heading={data.processHeading}
				subtitle={data.processSubtitle}
				steps={data.processSteps}
			/>

			{/* 3. Why Us (3 white cards) */}
			<ServicePainPoints heading={data.painPointsHeading} painPoints={data.painPoints} />

			{/* 4. Reasons to Work With Us */}
			<ServiceReasons />

			{/* 5. Services Offered */}
			<ServiceOfferings heading={data.servicesHeading} services={data.servicesOffered} />

			{/* 6. Tech Stack */}
			<ServiceTechStack categories={data.techStack} />

			{/* 7. FAQ */}
			<ServiceFAQ faqs={data.faqOverrides} />

			{/* 8. CTA Band */}
			<CTABand />

			<Footer />
		</div>
	);
}
