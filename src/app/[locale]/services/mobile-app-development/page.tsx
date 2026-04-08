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
import ServiceEstimateCTA from "@/components/sections/service-page/ServiceEstimateCTA";
import CTABand from "@/components/sections/CTABand";
import { getServicePageData } from "@/data/service-pages";
import { generateMetadata as genMeta, BASE_URL, KEYWORD_SETS } from "~/lib/seo";

const data = getServicePageData("mobile-app-development")!;

export const metadata: Metadata = genMeta({
	title: data.eyebrow,
	description: data.heroSubtitle,
	keywords: [...KEYWORD_SETS.core, ...KEYWORD_SETS.services],
	canonical: `${BASE_URL}/services/mobile-app-development`,
});

export default function ServicePage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<ServiceHero eyebrow={data.eyebrow} line1={data.heroLine1} line2={data.heroLine2} subtitle={data.heroSubtitle} />
			<ServicePainPoints heading={data.painPointsHeading} painPoints={data.painPoints} />
			<ServiceOfferings heading={data.servicesHeading} services={data.servicesOffered} />
			<ServiceReasons />
			<ServiceProcess heading={data.processHeading} subtitle={data.processSubtitle} steps={data.processSteps} />
			<ServiceTechStack categories={data.techStack} />
			<ServiceFAQ faqs={data.faqOverrides} />
			<ServiceEstimateCTA />
			<CTABand />
			<Footer />
		</div>
	);
}
