"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Crown, Calendar, Calculator } from "lucide-react";
import { useTranslations } from "next-intl";
import { CAL_LINKS } from "~/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const planIcons = [
	<Zap key="zap" className="size-6" />,
	<Star key="star" className="size-6" />,
	<Crown key="crown" className="size-6" />,
];

const planPrices = ["$350", "$850", "$1,500+"];
const planIds = ["starter", "multi-page", "premium"];
const planPopular = [false, true, false];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Pricing() {
	const t = useTranslations("PricingSection");
	const plans = t.raw("plans") as {
		name: string;
		description: string;
		features: string[];
	}[];

	return (
		<section id="pricing" className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-12 flex flex-col items-center gap-6">
					<SectionHeader
						heading={
							<>
								{t("heading1")}{" "}
								<span className="text-brand-gold">{t("heading2")}</span>
							</>
						}
						subtitle={t("subtitle")}
					/>
					<Button to="/pricing" variant="outline">
						<Calculator className="size-4" />
						{t("calculatorButton")}
					</Button>
				</div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8"
				>
					{plans.map((plan, idx) => (
						<motion.div
							key={planIds[idx]}
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							className={`relative p-8 rounded-2xl flex flex-col transition-all duration-300 ${
								planPopular[idx]
									? "bg-brand-gold/10 border-2 border-brand-gold/50"
									: "bg-surface border border-border hover:border-border-gold"
							}`}
						>
							{planPopular[idx] && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<span className="bg-brand-gold text-black px-4 py-1 rounded-full text-sm font-semibold font-body">
										{t("mostPopular")}
									</span>
								</div>
							)}

							<div
								className={`inline-flex p-3 rounded-xl mb-4 w-fit ${
									planPopular[idx]
										? "bg-brand-gold/20 text-brand-gold"
										: "bg-surface text-brand-primary/50"
								}`}
							>
								{planIcons[idx]}
							</div>

							<h3 className="font-heading text-2xl font-bold text-brand-primary mb-2">
								{plan.name}
							</h3>

							<p className="font-body text-brand-primary/50 mb-6">
								{plan.description}
							</p>

							<div className="mb-8">
								<span className="font-heading text-5xl font-bold text-brand-primary">
									{planPrices[idx]}
								</span>
							</div>

							<ul className="space-y-4 mb-8 flex-grow">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-start gap-3">
										<Check
											className={`size-5 mt-0.5 shrink-0 ${
												planPopular[idx] ? "text-brand-gold" : "text-brand-primary/40"
											}`}
										/>
										<span className="font-body text-brand-primary/70">{feature}</span>
									</li>
								))}
							</ul>

							{planPopular[idx] ? (
								<Button to="/#contact" variant="gold" className="w-full justify-center mt-auto">
									{t("getStarted")}
								</Button>
							) : (
								<Button to="/#contact" variant="ghost" className="w-full justify-center mt-auto">
									{t("getStarted")}
								</Button>
							)}
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="mt-16 text-center"
				>
					<div className="inline-block p-6 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl">
						<p className="font-body text-lg text-brand-primary mb-2">
							<span className="font-semibold text-brand-gold">
								{t("ctaHeading")}
							</span>
						</p>
						<p className="font-body text-brand-primary/50 mb-4">
							{t("ctaBody")}
						</p>
						<Button href={CAL_LINKS.eliaz} variant="gold">
							<Calendar className="size-4" />
							{t("ctaButton")}
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
