import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import ShaderBackground from "@/components/shaders/ShaderBackgroundLazy";
import { allServices, industryServices } from "@/data/services";
import {
	CheckCircle,
	ArrowRight,
	Zap,
	Shield,
	Clock,
	TrendingUp,
} from "lucide-react";
import { CAL_LINKS } from "~/lib/constants";
import {
	generateMetadata as generateSEOMetadata,
	KEYWORD_SETS,
	BASE_URL,
} from "~/lib/seo";

interface ServicePageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateStaticParams() {
	const allServiceSlugs = allServices.map((service) => ({
		slug: service.slug,
	}));

	const industryServiceSlugs = industryServices.flatMap((industry) =>
		industry.services.map((service) => ({
			slug: service.slug,
		}))
	);

	return [...allServiceSlugs, ...industryServiceSlugs];
}

export async function generateMetadata({
	params,
}: ServicePageProps): Promise<Metadata> {
	const { slug } = await params;
	const service =
		allServices.find((s) => s.slug === slug) ||
		industryServices.flatMap((i) => i.services).find((s) => s.slug === slug);

	if (!service) {
		return {
			title: "Service Not Found",
			robots: { index: false, follow: false },
		};
	}

	return generateSEOMetadata({
		title: service.title,
		description: `${service.description} Professional ${service.title.toLowerCase()} services from expert LATAM developers. Fast delivery, enterprise quality, competitive pricing.`,
		keywords: [
			...KEYWORD_SETS.core,
			...KEYWORD_SETS.services,
			...KEYWORD_SETS.technologies,
			service.title.toLowerCase(),
			`${service.title.toLowerCase()} development`,
			`${service.title.toLowerCase()} services`,
			"professional development",
			"expert developers",
		],
		canonical: `${BASE_URL}/services/${slug}`,
		ogImage: `${BASE_URL}/og-service-${slug}.png`,
	});
}

const features = [
	"Custom design and development",
	"Responsive and mobile-optimized",
	"SEO and performance optimization",
	"Integration with third-party services",
	"Comprehensive testing and QA",
	"Documentation and training",
	"Post-launch support",
	"Ongoing maintenance options",
];

export default async function ServicePage({ params }: ServicePageProps) {
	const { slug } = await params;
	const service =
		allServices.find((s) => s.slug === slug) ||
		industryServices.flatMap((i) => i.services).find((s) => s.slug === slug);

	if (!service) {
		notFound();
	}

	// Find related services from the same industry
	const relatedIndustry = industryServices.find((industry) =>
		industry.services.some((s) => s.slug === slug)
	);

	const relatedServices = relatedIndustry
		? relatedIndustry.services.filter((s) => s.slug !== slug).slice(0, 3)
		: allServices.filter((s) => s.slug !== slug).slice(0, 3);

	const benefits = [
		{
			icon: <Zap className="w-6 h-6" />,
			title: "Fast Delivery",
			description: "Launch in days or weeks, not months",
		},
		{
			icon: <Shield className="w-6 h-6" />,
			title: "Enterprise Security",
			description: "Built with security and compliance in mind",
		},
		{
			icon: <Clock className="w-6 h-6" />,
			title: "24/7 Support",
			description: "Ongoing support and maintenance available",
		},
		{
			icon: <TrendingUp className="w-6 h-6" />,
			title: "Scalable Solutions",
			description: "Architecture designed to grow with your business",
		},
	];

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
							<span className="text-white">{service.title}</span>
						</div>
					</div>

					{/* Hero Section */}
					<div className="mb-16">
						<h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
							{service.title}
						</h1>
						<p className="text-xl text-gray-400 max-w-3xl">
							{service.description}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-12">
							{/* Overview */}
							<section className="p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl">
								<h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
								<p className="text-gray-300 leading-relaxed mb-6">
									Our {service.title.toLowerCase()} service combines
									cutting-edge technology with deep engineering expertise to
									deliver solutions that drive business results. We work closely
									with you to understand your unique requirements and create
									custom solutions that scale with your business.
								</p>
								<p className="text-gray-300 leading-relaxed">
									Whether you&apos;re a startup looking to launch your MVP
									quickly or an enterprise seeking robust, scalable solutions,
									our team has the experience and expertise to bring your vision
									to life.
								</p>
							</section>

							{/* Key Features */}
							<section>
								<h2 className="text-3xl font-bold text-white mb-6">
									What&apos;s Included
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{features.map((feature) => (
										<div
											key={feature}
											className="flex items-start space-x-3 p-4 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg"
										>
											<CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
											<span className="text-gray-300">{feature}</span>
										</div>
									))}
								</div>
							</section>

							{/* Benefits */}
							<section>
								<h2 className="text-3xl font-bold text-white mb-6">
									Why Choose Us
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{benefits.map((benefit) => (
										<div
											key={benefit.title}
											className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl"
										>
											<div className="text-cyan-400 mb-4">{benefit.icon}</div>
											<h3 className="text-xl font-semibold text-white mb-2">
												{benefit.title}
											</h3>
											<p className="text-gray-400">{benefit.description}</p>
										</div>
									))}
								</div>
							</section>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* CTA Card */}
							<div className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl sticky top-24">
								<h3 className="text-2xl font-bold text-white mb-4">
									Get Started Today
								</h3>
								<p className="text-gray-300 mb-6">
									Book a free consultation to discuss your project and receive a
									custom quote.
								</p>
								<div className="space-y-3">
									<a
										href={CAL_LINKS.ale}
										target="_blank"
										rel="noopener noreferrer"
										className="block w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold text-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
									>
										Book a Call
									</a>
									<Link
										href="/#contact"
										className="block w-full py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-semibold text-center hover:bg-white/10 transition-all duration-300"
									>
										Contact Us
									</Link>
								</div>
								<div className="mt-6 pt-6 border-t border-white/10">
									<p className="text-sm text-gray-400 mb-2">Starting from</p>
									<p className="text-3xl font-bold text-white">$350</p>
									<p className="text-sm text-gray-400 mt-1">
										for static websites
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Related Services */}
					{relatedServices.length > 0 && (
						<section className="mt-24">
							<h2 className="text-3xl font-bold text-white mb-8">
								Related Services
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{relatedServices.map((relatedService) => (
									<Link
										key={relatedService.id}
										href={`/services/${relatedService.slug}`}
										className="group p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300"
									>
										<h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
											{relatedService.title}
										</h3>
										<p className="text-gray-400 text-sm mb-4 line-clamp-2">
											{relatedService.description}
										</p>
										<div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
											<span className="text-sm">Learn more</span>
											<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
										</div>
									</Link>
								))}
							</div>
						</section>
					)}
				</div>
			</main>
		</div>
	);
}
