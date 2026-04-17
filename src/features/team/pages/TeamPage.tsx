"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import BookCallCTA from "@/shared/ui/BookCallCTA";
import { fadeUp } from "@/shared/ui/animations";

const memberPhotos = [
	"/faces/eliaz.jpeg",
	"/faces/alexandra.png",
	"/faces/leo.jpeg",
];

export default function TeamPage() {
	const t = useTranslations("TeamPage");
	const coreMembers = t.raw("core.members") as Array<{ role: string; focus: string; note: string }>;
	const extendedItems = t.raw("extended.items") as Array<{ label: string; detail: string }>;
	const whyItems = t.raw("why.items") as Array<{ heading: string; body: string }>;

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
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

				{/* Core Team */}
				<motion.section {...fadeUp} className="mb-20">
					<div className="flex items-center gap-3 mb-8">
						<h2 className="font-heading text-2xl font-bold text-brand-primary">
							{t("core.heading")}
						</h2>
						<span className="font-body text-sm text-brand-gold bg-brand-gold/10 border border-border-gold rounded-full px-3 py-1">
							{t("core.badge")}
						</span>
					</div>
					<p className="font-body text-brand-primary/60 mb-8 leading-relaxed">
						{t("core.description")}
					</p>
					<div className="space-y-4">
						{coreMembers.map((member, i) => (
							<div
								key={member.role}
								className="bg-surface border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4"
							>
								<div className="shrink-0">
									<Image
										src={memberPhotos[i]}
										alt={member.role}
										width={64}
										height={64}
										className="rounded-xl object-cover"
									/>
								</div>
								<div className="flex-1">
									<h3 className="font-heading text-brand-primary font-semibold text-lg mb-1">
										{member.role}
									</h3>
									<p className="font-body text-brand-gold text-sm mb-2">
										{member.focus}
									</p>
									<p className="font-body text-brand-primary/50 text-sm leading-relaxed">
										{member.note}
									</p>
								</div>
							</div>
						))}
					</div>
				</motion.section>

				{/* Extended Network */}
				<motion.section {...fadeUp} className="mb-20">
					<div className="flex items-center gap-3 mb-8">
						<h2 className="font-heading text-2xl font-bold text-brand-primary">
							{t("extended.heading")}
						</h2>
						<span className="font-body text-sm text-brand-primary/60 bg-surface border border-border rounded-full px-3 py-1">
							{t("extended.badge")}
						</span>
					</div>
					<p className="font-body text-brand-primary/60 mb-8 leading-relaxed">
						{t("extended.description")}
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{extendedItems.map((item) => (
							<div
								key={item.label}
								className="bg-surface border border-border rounded-xl p-5"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-1">
									{item.label}
								</h3>
								<p className="font-body text-brand-primary/50 text-sm">
									{item.detail}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Why this works */}
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
