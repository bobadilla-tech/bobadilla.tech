"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import BookCallCTA from "@/shared/ui/BookCallCTA";
import { fadeUp } from "@/shared/ui/animations";

export default function StartSmallPage() {
	const t = useTranslations("StartSmallPage");
	const whyItems = t.raw("why.items") as Array<{ heading: string; body: string }>;
	const projectItems = t.raw("projects.items") as Array<{ title: string; description: string; price: string }>;
	const steps = t.raw("how.steps") as Array<{ number: string; title: string; body: string }>;

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero */}
				<motion.div {...fadeUp} className="mb-20">
					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						{t("overline")}
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						{t("heading")}{" "}
						<span className="text-brand-gold">{t("headingGold")}</span>
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						{t("intro")}
					</p>
				</motion.div>

				{/* Why start small */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("why.heading")}
					</h2>
					<div className="space-y-6">
						{whyItems.map((item) => (
							<div
								key={item.heading}
								className="border-l-2 border-brand-gold/40 pl-6"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{item.heading}
								</h3>
								<p className="font-body text-brand-primary/60 leading-relaxed text-sm">
									{item.body}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Example projects */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						{t("projects.heading")}
					</h2>
					<p className="font-body text-brand-primary/50 mb-8 leading-relaxed">
						{t("projects.note")}
					</p>
					<div className="space-y-4">
						{projectItems.map((project) => (
							<div
								key={project.title}
								className="bg-surface border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-6"
							>
								<div className="flex-1">
									<h3 className="font-heading text-brand-primary font-semibold text-lg mb-2">
										{project.title}
									</h3>
									<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
										{project.description}
									</p>
								</div>
								<div className="shrink-0">
									<span className="font-body text-brand-gold font-semibold text-sm bg-brand-gold/10 border border-border-gold rounded-full px-4 py-2 whitespace-nowrap">
										{project.price}
									</span>
								</div>
							</div>
						))}
					</div>
				</motion.section>

				{/* How it works */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("how.heading")}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
						{steps.map((step) => (
							<div key={step.number} className="bg-surface border border-border rounded-2xl p-6">
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
				</motion.section>

				{/* CTA */}
				<BookCallCTA
					heading={t("cta.heading")}
					body={t("cta.body")}
					subtext={t("cta.note")}
					buttonLabel={t("cta.button")}
				/>
			</div>
		</div>
	);
}
