import Link from "next/link";
import { Code } from "lucide-react";
import ServiceCard from "@/shared/ui/ServiceCard";
import Button from "@/shared/ui/Button";
import SectionHeader from "@/shared/ui/SectionHeader";
import { allServices, industryServices } from "../model/services";
import { serviceIconMap, industryIconMap } from "../constants";
import { getTranslations } from "next-intl/server";
import { CAL_LINKS } from "~/lib/constants";

export default async function ServicesPage() {
	const t = await getTranslations("ServicesPage");

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Page Header */}
				<div className="flex flex-col items-center mb-16">
					<SectionHeader
						heading={
							<>
								{t("heading1")}{" "}
								<span className="text-brand-gold">{t("heading2")}</span>
							</>
						}
						subtitle={t("subtitle")}
					/>
				</div>

				{/* Core Services */}
				<section className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("coreServices")}
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
						{t("industrySolutions")}
					</h2>
					<p className="font-body text-brand-primary/50 mb-8 max-w-3xl">
						{t("industrySubtitle")}
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
										<p className="font-body text-brand-primary/50">
											{industry.description}
										</p>
									</div>
									<Link
										href={`/services/all/${industry.slug}`}
										className="font-body px-5 py-2 bg-brand-gold/10 text-brand-gold rounded-full hover:bg-brand-gold/20 transition-all duration-200 whitespace-nowrap text-sm"
									>
										{t("viewAll")}
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
											{t("moreServices", {
												count: industry.services.length - 6,
											})}
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
							{t("ctaHeading")}
						</h2>
						<p className="font-body text-brand-primary/60 mb-8 max-w-2xl mx-auto">
							{t("ctaBody")}
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<Button href={CAL_LINKS.ale} variant="gold">
								{t("bookCall")}
							</Button>
							<Button to="/#contact" variant="ghost">
								{t("contactUs")}
							</Button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
