"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import BookCallCTA from "@/shared/ui/BookCallCTA";
import { fadeUp } from "@/shared/ui/animations";

export default function FounderPage() {
	const t = useTranslations("FounderPage");
	const expectItems = t.raw("expect.items") as Array<{ title: string; body: string }>;

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero */}
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
						<div className="shrink-0">
							<Image
								src="/faces/eliaz.jpeg"
								alt={t("name")}
								width={120}
								height={120}
								className="rounded-2xl object-cover"
							/>
						</div>
					</div>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						{t("intro")}
					</p>
				</motion.div>

				{/* Background */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("background.heading")}
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>{t("background.p1")}</p>
						<p>{t("background.p2")}</p>
						<p>{t("background.p3")}</p>
					</div>
				</motion.section>

				{/* How he builds */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						{t("approach.heading")}
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>{t("approach.p1")}</p>
						<p>{t("approach.p2")}</p>
						<p>{t("approach.p3")}</p>
					</div>
				</motion.section>

				{/* What to expect */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						{t("expect.heading")}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{expectItems.map((item) => (
							<div
								key={item.title}
								className="bg-surface border border-border rounded-2xl p-6"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{item.title}
								</h3>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{item.body}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* CTA */}
				<BookCallCTA
					heading={t("cta.heading")}
					body={t("cta.body")}
					buttonLabel={t("cta.button")}
				/>
			</div>
		</div>
	);
}
