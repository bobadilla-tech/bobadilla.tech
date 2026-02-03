import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import ShaderBackground from "@/components/shaders/ShaderBackgroundLazy";
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
	"web-dev": <Globe className="w-8 h-8" />,
	"cms-dev": <Boxes className="w-8 h-8" />,
	"mvp-dev": <Rocket className="w-8 h-8" />,
	"web-app-dev": <Layout className="w-8 h-8" />,
	"mobile-app-dev": <Smartphone className="w-8 h-8" />,
	"backend-dev": <Database className="w-8 h-8" />,
	"frontend-dev": <Palette className="w-8 h-8" />,
	"web-portal-dev": <Code className="w-8 h-8" />,
};

const industryIconMap: Record<string, React.ReactNode> = {
	healthcare: <Heart className="w-10 h-10" />,
	education: <GraduationCap className="w-10 h-10" />,
	finance: <DollarSign className="w-10 h-10" />,
	transportation: <Truck className="w-10 h-10" />,
	"ai-ml": <Brain className="w-10 h-10" />,
};

export default function ServicesPage() {
	return (
		<div className="relative min-h-screen bg-slate-950">
			<ShaderBackground />
			<Navbar />

			<main className="relative z-10 pt-32 pb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Page Header */}
					<div className="text-center mb-16">
						<h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
							Our{" "}
							<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
								Services
							</span>
						</h1>
						<p className="text-xl text-gray-400 max-w-3xl mx-auto">
							From rapid MVP development to enterprise solutions, we deliver
							cutting-edge technology solutions tailored to your needs.
						</p>
					</div>

					{/* Core Services */}
					<section className="mb-24">
						<h2 className="text-3xl font-bold text-white mb-8">
							Core Services
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{allServices.map((service) => (
								<Link
									key={service.id}
									href={`/services/${service.slug}`}
									className="group p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
								>
									<div className="text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors duration-300">
										{serviceIconMap[service.id] || <Code className="w-8 h-8" />}
									</div>
									<h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
										{service.title}
									</h3>
									<p className="text-gray-400 text-sm line-clamp-3">
										{service.description}
									</p>
								</Link>
							))}
						</div>
					</section>

					{/* Industry Solutions */}
					<section>
						<h2 className="text-3xl font-bold text-white mb-4">
							Industry Solutions
						</h2>
						<p className="text-gray-400 mb-8 max-w-3xl">
							Specialized solutions tailored for specific industries with deep
							domain expertise.
						</p>
						<div className="space-y-6">
							{industryServices.map((industry) => (
								<div
									key={industry.id}
									className="p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all duration-300"
								>
									<div className="flex items-start space-x-6 mb-6">
										<div className="text-cyan-400 flex-shrink-0">
											{industryIconMap[industry.id]}
										</div>
										<div className="flex-1">
											<h3 className="text-2xl font-bold text-white mb-2">
												{industry.industry}
											</h3>
											<p className="text-gray-400">{industry.description}</p>
										</div>
										<Link
											href={`/services/all/${industry.slug}`}
											className="px-6 py-2 bg-cyan-500/20 text-cyan-400 rounded-full hover:bg-cyan-500/30 transition-all duration-300 whitespace-nowrap"
										>
											View All
										</Link>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{industry.services.slice(0, 6).map((service) => (
											<Link
												key={service.id}
												href={`/services/${service.slug}`}
												className="p-4 bg-white/5 rounded-lg hover:bg-white/10 border border-white/5 hover:border-cyan-500/50 transition-all duration-300"
											>
												<h4 className="text-white font-medium mb-1">
													{service.title}
												</h4>
												<p className="text-gray-400 text-sm line-clamp-2">
													{service.description}
												</p>
											</Link>
										))}
									</div>
									{industry.services.length > 6 && (
										<div className="mt-4 text-center">
											<Link
												href={`/services/all/${industry.slug}`}
												className="text-cyan-400 hover:text-cyan-300 text-sm"
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
						<div className="p-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl">
							<h2 className="text-3xl font-bold text-white mb-4">
								Ready to Start Your Project?
							</h2>
							<p className="text-gray-300 mb-8 max-w-2xl mx-auto">
								Book a free consultation to discuss your needs and get a custom
								quote.
							</p>
							<div className="flex flex-col sm:flex-row justify-center gap-4">
								<a
									href={CAL_LINKS.ale}
									target="_blank"
									rel="noopener noreferrer"
									className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
								>
									Book a Call
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
				</div>
			</main>
		</div>
	);
}
