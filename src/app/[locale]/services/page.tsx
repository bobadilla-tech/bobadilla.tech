import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { allServices, industryServices } from "@/data/services";
import {
	Code,
	Globe,
	Smartphone,
	Database,
	Palette,
	Boxes,
	Rocket,
	Layout,
	Heart,
	GraduationCap,
	DollarSign,
	Truck,
	Brain,
} from "lucide-react";
import { CAL_LINKS } from "~/lib/constants";
import {
	generateMetadata as generateSEOMetadata,
	KEYWORD_SETS,
	BASE_URL,
} from "~/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
	title: "Our Services",
	description:
		"Expert software development services including full-stack development, MVP creation, AI integration, and enterprise solutions. Specialized industry expertise in healthcare, fintech, education, and more. Fast delivery with senior engineering talent.",
	keywords: [
		...KEYWORD_SETS.core,
		...KEYWORD_SETS.services,
		...KEYWORD_SETS.technologies,
		"custom software development",
		"enterprise software",
		"industry solutions",
	],
	canonical: `${BASE_URL}/services`,
	ogImage: `${BASE_URL}/og-services.png`,
});

const serviceIconMap: Record<string, React.ReactNode> = {
	"web-dev": <Globe className="size-7" />,
	"cms-dev": <Boxes className="size-7" />,
	"mvp-dev": <Rocket className="size-7" />,
	"web-app-dev": <Layout className="size-7" />,
	"mobile-app-dev": <Smartphone className="size-7" />,
	"backend-dev": <Database className="size-7" />,
	"frontend-dev": <Palette className="size-7" />,
	"web-portal-dev": <Code className="size-7" />,
};

const industryIconMap: Record<string, React.ReactNode> = {
	healthcare: <Heart className="size-8" />,
	education: <GraduationCap className="size-8" />,
	finance: <DollarSign className="size-8" />,
	transportation: <Truck className="size-8" />,
	"ai-ml": <Brain className="size-8" />,
};

export default function ServicesPage() {
	return (
		<div className="relative min-h-screen">
			<Navbar />

			<main className="pt-32 pb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Page Header */}
					<div className="flex flex-col items-center mb-16">
						<SectionHeader
							heading={
								<>
									Our <span className="text-brand-gold">Services</span>
								</>
							}
							subtitle="From rapid MVP development to enterprise solutions, we deliver cutting-edge technology tailored to your needs."
						/>
					</div>

					{/* Core Services */}
					<section className="mb-24">
						<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
							Core Services
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{allServices.map((service) => (
								<ServiceCard
									key={service.id}
									title={service.title}
									href={`/services/${service.slug}`}
									variant="icon"
									icon={serviceIconMap[service.id] ?? <Code className="size-7" />}
									description={service.description}
								/>
							))}
						</div>
					</section>

					{/* Industry Solutions */}
					<section>
						<h2 className="font-heading text-2xl font-bold text-brand-primary mb-2">
							Industry Solutions
						</h2>
						<p className="font-body text-brand-primary/50 mb-8 max-w-3xl">
							Specialized solutions tailored for specific industries with deep domain expertise.
						</p>
						<div className="space-y-6">
							{industryServices.map((industry) => (
								<div
									key={industry.id}
									className="p-8 bg-surface border border-border rounded-2xl hover:border-border-gold transition-all duration-300"
								>
									<div className="flex items-start gap-6 mb-6">
										<div className="text-brand-gold shrink-0">
											{industryIconMap[industry.id]}
										</div>
										<div className="flex-1">
											<h3 className="font-heading text-2xl font-bold text-brand-primary mb-2">
												{industry.industry}
											</h3>
											<p className="font-body text-brand-primary/50">{industry.description}</p>
										</div>
										<Link
											href={`/services/all/${industry.slug}`}
											className="font-body px-5 py-2 bg-brand-gold/10 text-brand-gold rounded-full hover:bg-brand-gold/20 transition-all duration-200 whitespace-nowrap text-sm"
										>
											View All
										</Link>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{industry.services.slice(0, 6).map((service) => (
											<Link
												key={service.id}
												href={`/services/${service.slug}`}
												className="p-4 bg-surface rounded-lg hover:bg-surface-hover border border-border hover:border-border-gold transition-all duration-200"
											>
												<h4 className="font-heading text-brand-primary font-medium mb-1">
													{service.title}
												</h4>
												<p className="font-body text-brand-primary/40 text-sm line-clamp-2">
													{service.description}
												</p>
											</Link>
										))}
									</div>
									{industry.services.length > 6 && (
										<div className="mt-4 text-center">
											<Link
												href={`/services/all/${industry.slug}`}
												className="font-body text-brand-gold hover:text-brand-gold-light text-sm transition-colors duration-200"
											>
												+{industry.services.length - 6} more services
											</Link>
										</div>
									)}
								</div>
							))}
						</div>
					</section>

					{/* CTA Section */}
					<section className="mt-24 text-center">
						<div className="p-12 bg-brand-gold/10 border border-border-gold rounded-2xl">
							<h2 className="font-heading text-3xl font-bold text-brand-primary mb-4">
								Ready to Start Your Project?
							</h2>
							<p className="font-body text-brand-primary/60 mb-8 max-w-2xl mx-auto">
								Book a free consultation to discuss your needs and get a custom quote.
							</p>
							<div className="flex flex-col sm:flex-row justify-center gap-4">
								<Button href={CAL_LINKS.ale} variant="gold">
									Book a Call
								</Button>
								<Button to="/#contact" variant="ghost">
									Contact Us
								</Button>
							</div>
						</div>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}
