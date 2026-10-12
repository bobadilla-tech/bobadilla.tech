"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/shared/ui/Button";
import BookCallCTA from "@/shared/ui/BookCallCTA";
import { fadeUp } from "@/shared/ui/animations";
import { SOCIAL_LINKS } from "~/shared/lib/constants";
import {
	products,
	openSourceProjects,
} from "@/features/products/model/products";

export default function ProductsPage() {
	const t = useTranslations("ProductsPage");
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
				<motion.section {...fadeUp} className="mb-20 space-y-6">
					{products.map((product) => (
						<article
							key={product.id}
							className="bg-surface border border-border rounded-2xl p-6 sm:p-8"
						>
							<div className="flex items-start gap-5">
								{product.logo && (
									<Image
										src={product.logo}
										alt=""
										width={64}
										height={64}
										className="rounded-xl object-cover shrink-0"
									/>
								)}
								<div className="min-w-0">
									<span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-gold mb-1 block">
										{t(`items.${product.id}.tagline`)}
									</span>
									<h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-primary wrap-break-word">
										{product.name}
									</h2>
								</div>
							</div>
							<p className="font-body text-brand-primary/60 text-sm leading-relaxed my-5">
								{t(`items.${product.id}.description`)}
							</p>
							<div className="flex flex-wrap gap-2">
								{product.tags.map((tag) => (
									<span
										key={tag}
										className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-body rounded-full"
									>
										{tag}
									</span>
								))}
							</div>
							<div className="flex flex-col sm:flex-row gap-3 mt-6">
								<Button href={product.url} variant="gold" size="sm">
									{t("visitSite", { name: product.name })}
								</Button>
								{product.caseStudyHref && (
									<Button
										to={product.caseStudyHref}
										variant="outline"
										size="sm"
									>
										{t("readWriteUp", { name: product.name })}
									</Button>
								)}
							</div>
						</article>
					))}
				</motion.section>
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						{t("openSource.heading")}
					</h2>
					<p className="font-body text-brand-primary/60 mb-8 leading-relaxed">
						{t("openSource.description")}
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{openSourceProjects.map((project) => (
							<a
								key={project.id}
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className="block bg-surface border border-border rounded-xl p-5 hover:border-border-gold transition-colors duration-200"
							>
								<div>
									<span className="font-heading text-brand-primary font-semibold">
										{project.name}
									</span>
									<span className="font-body text-xs text-brand-gold ml-2">
										{project.language}
									</span>
								</div>
								<p className="font-body text-brand-primary/50 text-sm mt-1">
									{t(`openSource.items.${project.id}`)}
								</p>
							</a>
						))}
					</div>
					<Button
						href={SOCIAL_LINKS.github}
						variant="ghost"
						size="sm"
						className="mt-6"
					>
						{t("openSource.viewAll")}
					</Button>
				</motion.section>
				<BookCallCTA
					heading={t("cta.heading")}
					body={t("cta.body")}
					buttonLabel={t("cta.button")}
				/>
			</div>
		</div>
	);
}
