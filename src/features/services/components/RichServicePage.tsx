import Button from "@/shared/ui/Button";
import CTABand from "@/shared/components/CTABand";
import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";
import { CAL_LINKS } from "~/lib/constants";
import type { ServicePageData } from "@/features/services/model/types";
import ServiceHero from "./ServiceHero";
import ServicePainPoints from "./ServicePainPoints";
import ServiceOfferings from "./ServiceOfferings";
import ServiceReasons from "./ServiceReasons";
import ServiceProcess from "./ServiceProcess";
import ServiceProcessMVP from "./ServiceProcessMVP";
import ServiceTechStack from "./ServiceTechStack";
import ServiceFAQ from "./ServiceFAQ";
import ServiceEstimateCTA from "./ServiceEstimateCTA";
import ServiceSolutions from "./ServiceSolutions";
import ServiceForWho from "./ServiceForWho";

interface RichServicePageProps {
	data: ServicePageData;
}

export default function RichServicePage({ data }: RichServicePageProps) {
	// MVP variant: has mvpSolutions
	if (data.mvpSolutions) {
		return (
			<div className="min-h-screen">
				<Navbar />
				<ServiceHero
					eyebrow={data.eyebrow}
					line1={data.heroLine1}
					line2={data.heroLine2}
					subtitle={data.heroSubtitle}
					featureBadges={data.featureBadges}
				/>
				<ServicePainPoints
					heading={data.painPointsHeading}
					painPoints={data.painPoints}
				/>
				{data.solutionsHeading && (
					<ServiceSolutions
						heading={data.solutionsHeading}
						solutions={data.mvpSolutions}
					/>
				)}
				{data.forWhoHeading && data.forWho && (
					<ServiceForWho
						heading={data.forWhoHeading}
						forWho={data.forWho}
					/>
				)}
				<ServiceProcessMVP />
				<ServiceReasons />
				<ServiceEstimateCTA />
				<ServiceTechStack categories={data.techStack} />
				<ServiceFAQ faqs={data.faqOverrides} />
				<CTABand />
				<Footer />
			</div>
		);
	}

	// CMS variant: different section order, no EstimateCTA
	if (data.slug === "cms-development") {
		return (
			<div className="min-h-screen">
				<Navbar />
				<ServiceHero
					eyebrow={data.eyebrow}
					line1={data.heroLine1}
					line2={data.heroLine2}
					subtitle={data.heroSubtitle}
				/>
				<ServiceProcess
					heading={data.processHeading}
					subtitle={data.processSubtitle}
					steps={data.processSteps}
				/>
				<ServicePainPoints
					heading={data.painPointsHeading}
					painPoints={data.painPoints}
				/>
				<ServiceReasons />
				<ServiceOfferings
					heading={data.servicesHeading}
					services={data.servicesOffered}
				/>
				<ServiceTechStack categories={data.techStack} />
				<ServiceFAQ faqs={data.faqOverrides} />
				<CTABand />
				<Footer />
			</div>
		);
	}

	// Standard variant (web-dev, web-app, web-portal, frontend, backend, mobile)
	return (
		<div className="min-h-screen">
			<Navbar />
			<ServiceHero
				eyebrow={data.eyebrow}
				line1={data.heroLine1}
				line2={data.heroLine2}
				subtitle={data.heroSubtitle}
			/>
			<ServicePainPoints
				heading={data.painPointsHeading}
				painPoints={data.painPoints}
			/>
			{/* Urgency band — web-development page only */}
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
			<ServiceOfferings
				heading={data.servicesHeading}
				services={data.servicesOffered}
			/>
			<ServiceReasons />
			<ServiceProcess
				heading={data.processHeading}
				subtitle={data.processSubtitle}
				steps={data.processSteps}
			/>
			<ServiceTechStack categories={data.techStack} />
			<ServiceFAQ faqs={data.faqOverrides} />
			<ServiceEstimateCTA />
			<CTABand />
			<Footer />
		</div>
	);
}
