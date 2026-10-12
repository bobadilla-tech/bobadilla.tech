"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/shared/ui/Button";
import BookCallCTA from "@/shared/ui/BookCallCTA";
import { fadeUp } from "@/shared/ui/animations";
import { BRAND } from "~/shared/lib/brand";
import { EXTERNAL_LINKS, SOCIAL_LINKS } from "~/shared/lib/constants";

export default function CompanyPage() {
	const t = useTranslations("CompanyPage");
	const principles = t.raw("principles.items") as {
		heading: string;
		body: string;
	}[];
	const practices = t.raw("practices.items") as {
		title: string;
		body: string;
		link: string;
	}[];
	const facts = t.raw("facts.items") as { label: string; value: string }[];
	const practiceLinks = [
		EXTERNAL_LINKS.architectureDoc,
		EXTERNAL_LINKS.ciWorkflow,
		SOCIAL_LINKS.github,
	];
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
						{t("intro", { brand: BRAND.name })}
					</p>
				</motion.div>
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("whatWeDo.heading")}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{(["services", "products"] as const).map((id) => (
							<article
								key={id}
								className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3"
							>
								<h3 className="font-heading text-brand-primary font-semibold text-lg">
									{t(`whatWeDo.${id}.title`)}
								</h3>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{t(`whatWeDo.${id}.body`)}
								</p>
								<Button
									to={id === "services" ? "/services" : "/products"}
									variant="outline"
									size="sm"
									className="w-fit mt-auto"
								>
									{t(`whatWeDo.${id}.cta`)}
								</Button>
							</article>
						))}
					</div>
				</motion.section>
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("principles.heading")}
					</h2>
					<div className="space-y-6">
						{principles.map((item) => (
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
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						{t("practices.heading")}
					</h2>
					<p className="font-body text-brand-primary/60 mb-8 leading-relaxed">
						{t("practices.description")}
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{practices.map((item, i) => (
							<article
								key={item.title}
								className="bg-surface border border-border rounded-2xl p-6"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{item.title}
								</h3>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{item.body}
								</p>
								<a
									href={practiceLinks[i]}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-3 inline-block font-body text-brand-gold text-sm hover:text-brand-gold-light transition-colors duration-200"
								>
									{item.link} →
								</a>
							</article>
						))}
					</div>
				</motion.section>
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("origin.heading")}
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed mb-6">
						<p>
							{t("origin.p1", {
								brand: BRAND.name,
								founder: BRAND.founder.name,
							})}
						</p>
						<p>{t("origin.p2")}</p>
					</div>
					<Button to="/founder" variant="ghost" size="sm">
						{t("origin.cta")}
					</Button>
				</motion.section>
				<motion.section {...fadeUp} className="mb-20">
					<div className="bg-surface border border-border rounded-2xl p-6">
						<dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
							{facts.map((item) => (
								<div key={item.label}>
									<dt className="font-body text-xs font-semibold tracking-widest uppercase text-brand-primary/40 mb-1">
										{item.label}
									</dt>
									<dd className="font-body text-brand-primary">{item.value}</dd>
								</div>
							))}
						</dl>
					</div>
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
