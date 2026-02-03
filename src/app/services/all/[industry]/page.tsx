import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import ShaderBackground from "@/components/shaders/ShaderBackgroundLazy";
import { industryServices } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { CAL_LINKS } from "~/lib/constants";
import {
	generateMetadata as generateSEOMetadata,
	KEYWORD_SETS,
	BASE_URL,
} from "~/lib/seo";

interface IndustryPageProps {
	params: Promise<{
		industry: string;
	}>;
}

export async function generateStaticParams() {
	return industryServices.map((industry) => ({
		industry: industry.slug,
	}));
}

export async function generateMetadata({
	params,
}: IndustryPageProps): Promise<Metadata> {
	const { industry: industrySlug } = await params;
	const industry = industryServices.find((i) => i.slug === industrySlug);

	if (!industry) {
		return {
			title: "Industry Not Found",
			robots: { index: false, follow: false },
		};
	}

	const industryText = industry.industry.toLowerCase();

	return generateSEOMetadata({
		title: `${industry.industry} Software Development Services`,
		description: `${industry.description} Expert ${industryText} software solutions from top LATAM developers. Custom development, fast delivery, enterprise quality.`,
		keywords: [
			...KEYWORD_SETS.core,
			...KEYWORD_SETS.services,
			...KEYWORD_SETS.industries,
			`${industryText} software`,
			`${industryText} development`,
			`${industryText} solutions`,
			`${industryText} technology`,
			"industry-specific development",
			"specialized solutions",
		],
		canonical: `${BASE_URL}/services/all/${industrySlug}`,
		ogImage: `${BASE_URL}/og-industry-${industrySlug}.png`,
	});
}

export default async function IndustryPage({ params }: IndustryPageProps) {
	const { industry: industrySlug } = await params;
	const industry = industryServices.find((i) => i.slug === industrySlug);

	if (!industry) {
		notFound();
	}

	return (
		<div className="relative min-h-screen bg-slate-950">
			<ShaderBackground />
			<Navbar />

			<main className="relative z-10 pt-32 pb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<div className="mb-8">
						<div className="flex items-center space-x-2 text-sm text-gray-400">
							<Link href="/" className="hover:text-white transition-colors">
								Home
							</Link>
							<span>/</span>
							<Link
								href="/services"
								className="hover:text-white transition-colors"
							>
								Services
							</Link>
							<span>/</span>
							<span className="text-white">{industry.industry}</span>
						</div>
					</div>

					{/* Hero Section */}
					<div className="mb-16 text-center">
						<h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
							{industry.industry}{" "}
							<span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
								Solutions
							</span>
						</h1>
						<p className="text-xl text-gray-400 max-w-3xl mx-auto">
							{industry.description}
						</p>
					</div>

					{/* Services Grid */}
					<section className="mb-16">
						<h2 className="text-3xl font-bold text-white mb-8">
							All {industry.industry} Services
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{industry.services.map((service) => (
								<Link
									key={service.id}
									href={`/services/${service.slug}`}
									className="group p-6 bg-linear-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
								>
									<h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
										{service.title}
									</h3>
									<p className="text-gray-400 text-sm mb-4 line-clamp-3">
										{service.description}
									</p>
									<div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
										<span className="text-sm font-medium">Learn more</span>
										<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
									</div>
								</Link>
							))}
						</div>
					</section>

					{/* Why Choose Us Section */}
					<section className="mb-16">
						<div className="p-12 bg-linear-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl">
							<h2 className="text-3xl font-bold text-white mb-6">
								Why Choose Bobadilla Tech for {industry.industry}?
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
								<div>
									<h3 className="text-xl font-semibold text-white mb-3">
										Deep Industry Expertise
									</h3>
									<p>
										Our team has extensive experience building solutions for the{" "}
										{industry.industry.toLowerCase()} sector, understanding both
										technical requirements and industry-specific regulations.
									</p>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-white mb-3">
										Proven Track Record
									</h3>
									<p>
										We&apos;ve successfully delivered projects for clients
										ranging from startups to enterprises, consistently meeting
										deadlines and exceeding expectations.
									</p>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-white mb-3">
										Senior Engineering Team
									</h3>
									<p>
										Led by senior engineers with backgrounds in enterprise
										backend systems and cutting-edge AI solutions, not just
										another agency.
									</p>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-white mb-3">
										Fast Delivery
									</h3>
									<p>
										Launch your MVP in days or weeks, not months. We focus on
										rapid iteration and getting your product to market quickly.
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* CTA Section */}
					<section className="text-center">
						<div className="p-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl">
							<h2 className="text-3xl font-bold text-white mb-4">
								Ready to Transform Your {industry.industry} Business?
							</h2>
							<p className="text-gray-300 mb-8 max-w-2xl mx-auto">
								Book a free consultation to discuss your project and receive a
								custom proposal tailored to your needs.
							</p>
							<div className="flex flex-col sm:flex-row justify-center gap-4">
								<a
									href={CAL_LINKS.ale}
									target="_blank"
									rel="noopener noreferrer"
									className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
								>
									Book a Free Call
								</a>
								<Link
									href="/#contact"
									className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
								>
									Contact Us
								</Link>
							</div>
						</div>
					</section>

					{/* Other Industries */}
					<section className="mt-24">
						<h2 className="text-3xl font-bold text-white mb-8">
							Other Industries We Serve
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{industryServices
								.filter((i) => i.slug !== industrySlug)
								.map((otherIndustry) => (
									<Link
										key={otherIndustry.id}
										href={`/services/all/${otherIndustry.slug}`}
										className="group p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300"
									>
										<h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
											{otherIndustry.industry}
										</h3>
										<p className="text-gray-400 text-sm mb-3 line-clamp-2">
											{otherIndustry.description}
										</p>
										<div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
											<span className="text-sm">Explore</span>
											<ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
										</div>
									</Link>
								))}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
