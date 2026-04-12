import Link from "next/link";
import Button from "@/shared/ui/Button";
import { getServiceBySlug, getRelatedServices } from "../api/queries";
import { benefitIcons } from "../constants";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CAL_LINKS } from "~/lib/constants";

interface ServicePageProps {
	slug: string;
}

export default async function ServicePage({ slug }: ServicePageProps) {
	const t = await getTranslations("ServicePage");

	const service = getServiceBySlug(slug);

	if (!service) {
		return null;
	}

	const relatedServices = getRelatedServices(slug);

	const features = t.raw("features") as string[];
	const benefits = t.raw("benefits") as {
		title: string;
		description: string;
	}[];

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<div className="mb-8">
					<div className="flex items-center space-x-2 text-sm text-brand-primary/40 font-body">
						<Link
							href="/"
							className="hover:text-brand-primary transition-colors"
						>
							{t("home")}
						</Link>
						<span>/</span>
						<Link
							href="/services"
							className="hover:text-brand-primary transition-colors"
						>
							{t("services")}
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
							<h2 className="font-heading text-3xl font-bold text-brand-primary mb-6">
								{t("overview")}
							</h2>
							<p className="font-body text-brand-primary/70 leading-relaxed mb-6">
								{t("overviewBody1", { service: service.title.toLowerCase() })}
							</p>
							<p className="font-body text-brand-primary/70 leading-relaxed">
								{t("overviewBody2")}
							</p>
						</section>

						{/* Key Features */}
						<section>
							<h2 className="font-heading text-3xl font-bold text-brand-primary mb-6">
								{t("whatsIncluded")}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{features.map((feature) => (
									<div
										key={feature}
										className="flex items-start space-x-3 p-4 bg-surface border border-border rounded-lg"
									>
										<CheckCircle className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
										<span className="font-body text-brand-primary/70">
											{feature}
										</span>
									</div>
								))}
							</div>
						</section>

						{/* Benefits */}
						<section>
							<h2 className="font-heading text-3xl font-bold text-brand-primary mb-6">
								{t("whyChooseUs")}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{benefits.map((benefit, i) => (
									<div
										key={benefit.title}
										className="p-6 bg-surface border border-border rounded-xl"
									>
										<div className="text-brand-gold mb-4">
											{benefitIcons[i]}
										</div>
										<h3 className="font-heading text-xl font-semibold text-brand-primary mb-2">
											{benefit.title}
										</h3>
										<p className="font-body text-brand-primary/50">
											{benefit.description}
										</p>
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
								{t("getStarted")}
							</h3>
							<p className="font-body text-brand-primary/60 mb-6">
								{t("getStartedBody")}
							</p>
							<div className="space-y-3">
								<Button
									href={CAL_LINKS.ale}
									variant="gold"
									className="w-full justify-center"
								>
									{t("bookCall")}
								</Button>
								<Button
									to="/#contact"
									variant="ghost"
									className="w-full justify-center"
								>
									{t("contactUs")}
								</Button>
							</div>
							<div className="mt-6 pt-6 border-t border-border">
								<p className="font-body text-sm text-brand-primary/40 mb-2">
									{t("startingFrom")}
								</p>
								<p className="font-heading text-3xl font-bold text-brand-primary">
									$350
								</p>
								<p className="font-body text-sm text-brand-primary/40 mt-1">
									{t("forStaticWebsites")}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Related Services */}
				{relatedServices.length > 0 && (
					<section className="mt-24">
						<h2 className="font-heading text-3xl font-bold text-brand-primary mb-8">
							{t("relatedServices")}
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
										<span className="text-sm">{t("learnMore")}</span>
										<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
									</div>
								</Link>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
