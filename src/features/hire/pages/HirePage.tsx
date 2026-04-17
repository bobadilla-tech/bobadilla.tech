"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/shared/ui/Button";
import { fadeUp } from "@/shared/ui/animations";
import { CAL_LINKS } from "~/lib/constants";

export default function HirePage() {
	const t = useTranslations("HirePage");
	const whoItems = t.raw("who") as string[];
	const services = t.raw("services") as Array<{ title: string; description: string; outcome: string }>;
	const steps = t.raw("steps") as Array<{ number: string; title: string; body: string }>;
	const whyItems = t.raw("why") as string[];

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero */}
				<motion.div {...fadeUp} className="mb-24">
					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						{t("overline")}
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						{t("heading")}{" "}
						<span className="text-brand-gold">{t("headingGold")}</span>
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl mb-10">
						{t("intro")}
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
							{t("cta1")}
						</Button>
						<Button to="/start-small" variant="outline" size="md">
							{t("cta2")}{" "}
							<ArrowRight className="ml-2 size-4 inline" />
						</Button>
					</div>
				</motion.div>

				{/* Who This Is For */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("whoHeading")}
					</h2>
					<div className="space-y-4">
						{whoItems.map((item) => (
							<div key={item} className="flex items-start gap-4">
								<CheckCircle className="size-5 text-brand-gold shrink-0 mt-0.5" />
								<p className="font-body text-brand-primary/70 leading-relaxed">
									{item}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* What We Do */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						{t("servicesHeading")}
					</h2>
					<p className="font-body text-brand-primary/50 mb-8 leading-relaxed">
						{t("servicesSubtitle")}
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{services.map((service) => (
							<div
								key={service.title}
								className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3"
							>
								<h3 className="font-heading text-brand-primary font-semibold text-lg">
									{service.title}
								</h3>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed flex-1">
									{service.description}
								</p>
								<p className="font-body text-brand-gold text-sm font-medium">
									→ {service.outcome}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* How We Work */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("howHeading")}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
						{steps.map((step) => (
							<div
								key={step.number}
								className="bg-surface border border-border rounded-2xl p-6"
							>
								<span className="font-heading text-4xl font-bold text-brand-gold/30 block mb-3">
									{step.number}
								</span>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{step.title}
								</h3>
								<p className="font-body text-brand-primary/50 text-sm leading-relaxed">
									{step.body}
								</p>
							</div>
						))}
					</div>
					<div className="border-l-2 border-brand-gold/40 pl-6">
						<p className="font-body text-brand-primary/70 leading-relaxed">
							{t("howNote")}
						</p>
					</div>
				</motion.section>

				{/* Why Us */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("whyHeading")}
					</h2>
					<div className="space-y-5">
						{whyItems.map((item) => (
							<div key={item} className="border-l-2 border-brand-gold/40 pl-6">
								<p className="font-body text-brand-primary/70 leading-relaxed">
									{item}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Start Small */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						{t("smallHeading")}
					</h2>
					<p className="font-body text-brand-primary/60 leading-relaxed mb-8">
						{t("smallBody")}
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="bg-surface border border-border rounded-2xl p-6">
							<h3 className="font-heading text-brand-primary font-semibold mb-2">
								{t("startSmall.title")}
							</h3>
							<p className="font-body text-brand-primary/60 text-sm leading-relaxed mb-4">
								{t("startSmall.body")}
							</p>
							<span className="font-body text-brand-gold text-sm font-semibold">
								{t("startSmall.price")}
							</span>
							<div className="mt-4">
								<Button to="/start-small" variant="outline" size="sm">
									{t("startSmall.cta")}
								</Button>
							</div>
						</div>
						<div className="bg-surface border border-border rounded-2xl p-6">
							<h3 className="font-heading text-brand-primary font-semibold mb-2">
								{t("audit.title")}
							</h3>
							<p className="font-body text-brand-primary/60 text-sm leading-relaxed mb-4">
								{t("audit.body")}
							</p>
							<span className="font-body text-brand-gold text-sm font-semibold">
								{t("audit.price")}
							</span>
							<div className="mt-4">
								<Button to="/system-audit" variant="outline" size="sm">
									{t("audit.cta")}
								</Button>
							</div>
						</div>
					</div>
				</motion.section>

				{/* Final CTA */}
				<motion.div
					{...fadeUp}
					className="bg-brand-gold/10 border border-border-gold rounded-2xl p-10 text-center"
				>
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						{t("finalHeading")}
					</h2>
					<p className="font-body text-brand-primary/60 mb-2 max-w-md mx-auto">
						{t("finalBody")}
					</p>
					<p className="font-body text-brand-primary/40 text-sm mb-8">
						{t("finalNote")}
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
							{t("bookCall")}
						</Button>
						<Button to="/start-small" variant="outline" size="md">
							{t("startSmallCta")}
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
