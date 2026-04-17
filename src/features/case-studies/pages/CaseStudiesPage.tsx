"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeader from "@/shared/ui/SectionHeader";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

const caseStudies = [
	{
		slug: "compilestrength",
		title: "CompileStrength",
		tagline: "AI-powered fitness SaaS",
		description:
			"Full-stack subscription product with an AI agent that generates personalized workout programs. Built on Next.js, Cloudflare Workers, and Neon PostgreSQL. Shipped end-to-end — billing, auth, AI, and edge deployment included.",
		tags: ["Next.js", "Cloudflare Workers", "Mastra / Gemini", "LemonSqueezy"],
	},
	{
		slug: "requiems-api",
		title: "Requiems API",
		tagline: "Multi-language API platform",
		description:
			"A production API platform exposing email validation, location, finance, and utility endpoints under a single key. Built as a multi-language monorepo — Go API, Rails dashboard, two Cloudflare Workers for auth and key management.",
		tags: ["Go", "Rails 8", "Cloudflare Workers", "Redis", "PostgreSQL"],
	},
];

export default function CaseStudiesPage() {
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div {...fadeUp} className="mb-16">
					<SectionHeader
						overline="Case Studies"
						heading={
							<>
								Work we've{" "}
								<span className="text-brand-gold">shipped</span>
							</>
						}
						subtitle="Two published so far. Real systems, real decisions, real tradeoffs."
						align="left"
					/>
				</motion.div>

				{/* Case study cards */}
				<div className="space-y-6">
					{caseStudies.map((study, i) => (
						<motion.div
							key={study.slug}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: i * 0.1 }}
						>
							<Link
								href={`/case-studies/${study.slug}`}
								className="group block bg-surface border border-border rounded-2xl p-8 hover:border-border-gold transition-all duration-300"
							>
								<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
									<div>
										<span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-gold">
											{study.tagline}
										</span>
										<h2 className="font-heading text-2xl font-bold text-brand-primary mt-1 group-hover:text-brand-gold transition-colors duration-200">
											{study.title}
										</h2>
									</div>
									<span className="font-body text-brand-gold text-sm shrink-0 mt-1">
										Read case study →
									</span>
								</div>
								<p className="font-body text-brand-primary/60 leading-relaxed mb-6 text-sm">
									{study.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{study.tags.map((tag) => (
										<span
											key={tag}
											className="font-body text-xs text-brand-primary/50 bg-surface border border-border rounded-full px-3 py-1"
										>
											{tag}
										</span>
									))}
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
