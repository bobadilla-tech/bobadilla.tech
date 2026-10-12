"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/shared/ui/Button";
import { fadeUp } from "@/shared/ui/animations";
import { BRAND } from "~/shared/lib/brand";

export default function FounderPage() {
	const t = useTranslations("FounderPage");
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div {...fadeUp} className="mb-20">
					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						{t("overline")}
					</span>
					<div className="flex flex-col sm:flex-row sm:items-center gap-8 mt-4 mb-6">
						<div className="flex-1">
							<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mb-2">
								{t("name")}
							</h1>
							<p className="font-body text-brand-gold font-semibold">
								{t("role")}
							</p>
						</div>
						<Image
							src="/faces/eliaz.jpeg"
							alt={t("name")}
							width={120}
							height={120}
							className="rounded-2xl object-cover"
						/>
					</div>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						{t("intro", { brand: BRAND.name })}
					</p>
				</motion.div>
				<motion.section {...fadeUp} className="mb-12">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("story.heading")}
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>{t("story.p1")}</p>
						<p>{t("story.p2", { brand: BRAND.name })}</p>
						<p>{t("story.p3")}</p>
					</div>
				</motion.section>
				<div className="flex flex-col sm:flex-row gap-4">
					<Button href={BRAND.founder.url} variant="gold" size="md">
						{t("links.personalSite")}
					</Button>
					<Button to="/team" variant="outline" size="md">
						{t("links.team")}
					</Button>
					<Button to="/company" variant="ghost" size="md">
						{t("links.company")}
					</Button>
				</div>
			</div>
		</div>
	);
}
