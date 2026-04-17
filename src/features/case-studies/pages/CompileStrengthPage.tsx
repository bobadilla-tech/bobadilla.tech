"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/shared/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

export default function CompileStrengthPage() {
	const t = useTranslations("CompileStrengthPage");

	const stackItems = t.raw("stack.items") as Array<{ layer: string; items: string }>;
	const resultItems = t.raw("results.items") as Array<{ stat: string; label: string }>;
	const takeawayItems = t.raw("takeaways.items") as Array<{ heading: string; body: string }>;

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<motion.div {...fadeUp} className="mb-12">
					<div className="flex items-center gap-2 font-body text-sm text-brand-primary/40 mb-8">
						<Link href="/case-studies" className="hover:text-brand-gold transition-colors">
							{t("breadcrumb")}
						</Link>
						<span>/</span>
						<span className="text-brand-primary/60">{t("title")}</span>
					</div>

					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						{t("overline")}
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						{t("title")}
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						{t("intro")}
					</p>
				</motion.div>

				{/* Overview */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("overview.heading")}
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>{t("overview.p1")}</p>
						<p>{t("overview.p2")}</p>
					</div>
				</motion.section>

				{/* Problem */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("problem.heading")}
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>{t("problem.p1")}</p>
						<p>{t("problem.p2")}</p>
					</div>
				</motion.section>

				{/* Solution */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("solution.heading")}
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>{t("solution.p1")}</p>
						<p>{t("solution.p2")}</p>
					</div>
				</motion.section>

				{/* Technical Approach */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("technicalApproach.heading")}
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>{t("technicalApproach.p1")}</p>
						<p>{t("technicalApproach.p2")}</p>
						<p>{t("technicalApproach.p3")}</p>
					</div>
				</motion.section>

				{/* Stack */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						{t("stack.heading")}
					</h2>
					<div className="space-y-3">
						{stackItems.map((item) => (
							<div
								key={item.layer}
								className="bg-surface border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-3"
							>
								<span className="font-body text-brand-gold text-sm font-semibold shrink-0 w-40">
									{item.layer}
								</span>
								<span className="font-body text-brand-primary/70 text-sm leading-relaxed">
									{item.items}
								</span>
							</div>
						))}
					</div>
				</motion.section>

				{/* Results */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("results.heading")}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
						{resultItems.map((item) => (
							<div
								key={item.stat}
								className="bg-brand-gold/10 border border-border-gold rounded-2xl p-6"
							>
								<p className="font-heading text-brand-primary font-bold text-lg mb-2">
									{item.stat}
								</p>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{item.label}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Key Takeaways */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("takeaways.heading")}
					</h2>
					<div className="space-y-6">
						{takeawayItems.map((item) => (
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

				{/* CTA */}
				<motion.div
					{...fadeUp}
					className="bg-brand-gold/10 border border-border-gold rounded-2xl p-10 text-center"
				>
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						{t("cta.heading")}
					</h2>
					<p className="font-body text-brand-primary/60 mb-8 max-w-md mx-auto">
						{t("cta.body")}
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
							{t("cta.bookCall")}
						</Button>
						<Button to="/case-studies" variant="ghost" size="md">
							{t("cta.allCaseStudies")}
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
