"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Crown, Calendar, Calculator } from "lucide-react";
import { CAL_LINKS } from "~/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const pricingPlans = [
	{
		id: "starter",
		name: "Starter Landing Page",
		price: "$350",
		icon: <Zap className="size-6" />,
		description: "Perfect for startups and small businesses",
		features: [
			"Single landing page",
			"Responsive design",
			"Basic SEO optimization",
			"Contact form integration",
			"2 rounds of revisions",
			"7-10 day delivery",
			"Mobile optimized",
		],
		popular: false,
	},
	{
		id: "multi-page",
		name: "Multi-Page Website",
		price: "$850",
		icon: <Star className="size-6" />,
		description: "1-5 pages for growing businesses",
		features: [
			"Up to 5 custom pages",
			"Advanced responsive design",
			"SEO optimization",
			"CMS integration (optional)",
			"Contact & lead forms",
			"3 rounds of revisions",
			"14-21 day delivery",
			"Analytics integration",
			"Social media integration",
		],
		popular: true,
	},
	{
		id: "premium",
		name: "Premium Web Experience",
		price: "$1,500+",
		icon: <Crown className="size-6" />,
		description: "Custom solutions for enterprises",
		features: [
			"Unlimited pages",
			"Custom design & animations",
			"Advanced SEO & performance",
			"Full CMS integration",
			"E-commerce capabilities",
			"API integrations",
			"Unlimited revisions",
			"Priority support",
			"Ongoing maintenance (optional)",
			"Custom features & functionality",
		],
		popular: false,
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Pricing() {
	return (
		<section id="pricing" className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-12 flex flex-col items-center gap-6">
					<SectionHeader
						heading={
							<>
								Simple,{" "}
								<span className="text-brand-gold">Transparent Pricing</span>
							</>
						}
						subtitle="Static website packages designed for speed and quality."
					/>
					<Button to="/pricing" variant="outline">
						<Calculator className="size-4" />
						Try Our Pricing Calculator
					</Button>
				</div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8"
				>
					{pricingPlans.map((plan) => (
						<motion.div
							key={plan.id}
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							className={`relative p-8 rounded-2xl flex flex-col transition-all duration-300 ${
								plan.popular
									? "bg-brand-gold/10 border-2 border-brand-gold/50"
									: "bg-surface border border-border hover:border-border-gold"
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<span className="bg-brand-gold text-black px-4 py-1 rounded-full text-sm font-semibold font-body">
										Most Popular
									</span>
								</div>
							)}

							<div
								className={`inline-flex p-3 rounded-xl mb-4 w-fit ${
									plan.popular
										? "bg-brand-gold/20 text-brand-gold"
										: "bg-surface text-brand-primary/50"
								}`}
							>
								{plan.icon}
							</div>

							<h3 className="font-heading text-2xl font-bold text-brand-primary mb-2">
								{plan.name}
							</h3>

							<p className="font-body text-brand-primary/50 mb-6">
								{plan.description}
							</p>

							<div className="mb-8">
								<span className="font-heading text-5xl font-bold text-brand-primary">
									{plan.price}
								</span>
							</div>

							<ul className="space-y-4 mb-8 flex-grow">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-start gap-3">
										<Check
											className={`size-5 mt-0.5 shrink-0 ${
												plan.popular ? "text-brand-gold" : "text-brand-primary/40"
											}`}
										/>
										<span className="font-body text-brand-primary/70">{feature}</span>
									</li>
								))}
							</ul>

							{plan.popular ? (
								<Button to="/#contact" variant="gold" className="w-full justify-center mt-auto">
									Get Started
								</Button>
							) : (
								<Button to="/#contact" variant="ghost" className="w-full justify-center mt-auto">
									Get Started
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
								Need a custom MVP or full-stack application?
							</span>
						</p>
						<p className="font-body text-brand-primary/50 mb-4">
							We offer hourly consultancy and fractional CTO services. Book a
							call to discuss your project.
						</p>
						<Button href={CAL_LINKS.eliaz} variant="gold">
							<Calendar className="size-4" />
							Book a Call with an Experienced Fractional CTO
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
