"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SectionHeader from "@/shared/ui/SectionHeader";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

const studyTags: Record<string, string[]> = {
	compilestrength: ["Next.js", "Cloudflare Workers", "Mastra / Gemini", "LemonSqueezy"],
	"requiems-api": ["Go", "Rails 8", "Cloudflare Workers", "Redis", "PostgreSQL"],
};

export default function CaseStudiesPage() {
	const t = useTranslations("CaseStudiesPage");
	const studies = t.raw("studies") as Array<{
		slug: string;
		title: string;
		tagline: string;
		description: string;
	}>;

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div {...fadeUp} className="mb-16">
					<SectionHeader
						overline={t("overline")}
						heading={
							<>
								{t("heading1")}{" "}
								<span className="text-brand-gold">{t("heading2")}</span>
							</>
						}
						subtitle={t("subtitle")}
						align="left"
					/>
				</motion.div>

				{/* Case study cards */}
				<div className="space-y-6">
					{studies.map((study, i) => (
						<motion.div
							key={study.slug}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: i * 0.1 }}
						>
							<Link
								href={`/case-studies/${study.slug}`}
								className="group block bg-surface border border-border rounded-2xl p-8 hover:border-brand-gold/40 transition-colors duration-300"
							>
								<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
									<div>
										<span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-gold mb-2 block">
											{study.tagline}
										</span>
										<h2 className="font-heading text-2xl font-bold text-brand-primary group-hover:text-brand-gold transition-colors duration-200">
											{study.title}
										</h2>
									</div>
									<span className="font-body text-sm text-brand-primary/40 group-hover:text-brand-gold transition-colors duration-200 shrink-0 mt-1">
										{t("readCaseStudy")} →
									</span>
								</div>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed mb-5">
									{study.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{(studyTags[study.slug] ?? []).map((tag) => (
										<span
											key={tag}
											className="font-body text-xs text-brand-primary/50 bg-brand-primary/5 border border-border rounded-full px-3 py-1"
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
