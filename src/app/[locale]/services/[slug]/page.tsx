import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Button from "@/components/ui/Button";
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
		<div className="relative min-h-screen">
			<Navbar />

			<main className="pt-32 pb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<div className="mb-8">
						<div className="flex items-center space-x-2 text-sm text-brand-primary/40 font-body">
							<Link href="/" className="hover:text-brand-primary transition-colors">
								Home
							</Link>
							<span>/</span>
							<Link
								href="/services"
								className="hover:text-brand-primary transition-colors"
							>
								Services
							</Link>
							<span>/</span>
							<span className="text-brand-primary">{service.title}</span>
						</div>
					</div>

					{/* Hero Section */}
					<div className="mb-16">
						<h1 className="font-heading text-5xl sm:text-6xl font-bold text-brand-primary mb-6">
							{service.title}
						</h1>
						<p className="font-body text-xl text-brand-primary/60 max-w-3xl">
							{service.description}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-12">
							{/* Overview */}
							<section className="p-8 bg-surface border border-border rounded-2xl">
								<h2 className="font-heading text-3xl font-bold text-brand-primary mb-6">Overview</h2>
								<p className="font-body text-brand-primary/70 leading-relaxed mb-6">
									Our {service.title.toLowerCase()} service combines
									cutting-edge technology with deep engineering expertise to
									deliver solutions that drive business results. We work closely
									with you to understand your unique requirements and create
									custom solutions that scale with your business.
								</p>
								<p className="font-body text-brand-primary/70 leading-relaxed">
									Whether you&apos;re a startup looking to launch your MVP
									quickly or an enterprise seeking robust, scalable solutions,
									our team has the experience and expertise to bring your vision
									to life.
								</p>
							</section>

							{/* Key Features */}
							<section>
								<h2 className="font-heading text-3xl font-bold text-brand-primary mb-6">
									What&apos;s Included
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{features.map((feature) => (
										<div
											key={feature}
											className="flex items-start space-x-3 p-4 bg-surface border border-border rounded-lg"
										>
											<CheckCircle className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
											<span className="font-body text-brand-primary/70">{feature}</span>
										</div>
									))}
								</div>
							</section>

							{/* Benefits */}
							<section>
								<h2 className="font-heading text-3xl font-bold text-brand-primary mb-6">
									Why Choose Us
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{benefits.map((benefit) => (
										<div
											key={benefit.title}
											className="p-6 bg-surface border border-border rounded-xl"
										>
											<div className="text-brand-gold mb-4">{benefit.icon}</div>
											<h3 className="font-heading text-xl font-semibold text-brand-primary mb-2">
												{benefit.title}
											</h3>
											<p className="font-body text-brand-primary/50">{benefit.description}</p>
										</div>
									))}
								</div>
							</section>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* CTA Card */}
							<div className="p-8 bg-brand-gold/10 border border-border-gold rounded-2xl sticky top-24">
								<h3 className="font-heading text-2xl font-bold text-brand-primary mb-4">
									Get Started Today
								</h3>
								<p className="font-body text-brand-primary/60 mb-6">
									Book a free consultation to discuss your project and receive a
									custom quote.
								</p>
								<div className="space-y-3">
									<Button href={CAL_LINKS.ale} variant="gold" className="w-full justify-center">
										Book a Call
									</Button>
									<Button to="/#contact" variant="ghost" className="w-full justify-center">
										Contact Us
									</Button>
								</div>
								<div className="mt-6 pt-6 border-t border-border">
									<p className="font-body text-sm text-brand-primary/40 mb-2">Starting from</p>
									<p className="font-heading text-3xl font-bold text-brand-primary">$350</p>
									<p className="font-body text-sm text-brand-primary/40 mt-1">
										for static websites
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Related Services */}
					{relatedServices.length > 0 && (
						<section className="mt-24">
							<h2 className="font-heading text-3xl font-bold text-brand-primary mb-8">
								Related Services
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{relatedServices.map((relatedService) => (
									<Link
										key={relatedService.id}
										href={`/services/${relatedService.slug}`}
										className="group p-6 bg-surface border border-border rounded-2xl hover:border-border-gold transition-all duration-300"
									>
										<h3 className="font-heading text-xl font-semibold text-brand-primary mb-2 group-hover:text-brand-gold transition-colors duration-300">
											{relatedService.title}
										</h3>
										<p className="font-body text-brand-primary/50 text-sm mb-4 line-clamp-2">
											{relatedService.description}
										</p>
										<div className="flex items-center text-brand-gold group-hover:text-brand-gold-light transition-colors duration-300 font-body">
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

			<Footer />
		</div>
	);
}
