"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "~/i18n/navigation";
import BookCallCTA from "@/shared/ui/BookCallCTA";
import { fadeUp } from "@/shared/ui/animations";
import {
	teamMembers,
	disciplines,
	SHOW_EXTENDED_NETWORK,
} from "@/features/team/model/team";

export default function TeamPage() {
	const t = useTranslations("TeamPage");
	const collaborationItems = t.raw("collaboration.items") as {
		title: string;
		body: string;
	}[];
	const extendedItems = t.raw("extended.items") as {
		label: string;
		detail: string;
	}[];
	const whyItems = t.raw("why.items") as { heading: string; body: string }[];
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
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("collaboration.heading")}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{collaborationItems.map((item) => (
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
							</article>
						))}
					</div>
				</motion.section>
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						{t("leadership.heading")}
					</h2>
					<div className="space-y-4">
						{teamMembers.map((member) => (
							<article
								key={member.id}
								className="bg-surface border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4"
							>
								{member.photo && (
									<div className="shrink-0">
										<Image
											src={member.photo}
											alt={member.name ?? ""}
											width={64}
											height={64}
											className="rounded-xl object-cover"
										/>
									</div>
								)}
								<div className="flex-1">
									<h3 className="font-heading text-brand-primary font-semibold text-lg mb-1">
										{member.name}
									</h3>
									<p className="font-body text-brand-gold text-sm mb-2">
										{t(`leadership.items.${member.id}.role`)}
									</p>
									<p className="font-body text-brand-primary/50 text-sm leading-relaxed">
										{t(`leadership.items.${member.id}.bio`)}
									</p>
									<div className="flex flex-wrap gap-4 mt-3">
										{member.links?.github && (
											<a
												href={member.links.github}
												target="_blank"
												rel="noopener noreferrer"
												className="font-body text-xs text-brand-primary/50 hover:text-brand-gold transition-colors duration-200"
											>
												GitHub
											</a>
										)}
										{member.links?.linkedin && (
											<a
												href={member.links.linkedin}
												target="_blank"
												rel="noopener noreferrer"
												className="font-body text-xs text-brand-primary/50 hover:text-brand-gold transition-colors duration-200"
											>
												LinkedIn
											</a>
										)}
										{member.links?.website && (
											<a
												href={member.links.website}
												target="_blank"
												rel="noopener noreferrer"
												className="font-body text-xs text-brand-primary/50 hover:text-brand-gold transition-colors duration-200"
											>
												{t("leadership.website")}
											</a>
										)}
										{member.id === "eliaz" && (
											<Link
												href="/founder"
												className="font-body text-xs text-brand-gold"
											>
												{t("leadership.founderLink")}
											</Link>
										)}
									</div>
								</div>
							</article>
						))}
					</div>
				</motion.section>
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-4">
						{t("people.heading")}
					</h2>
					<p className="font-body text-brand-primary/60 mb-8 leading-relaxed">
						{t("people.description")}
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{disciplines.map((id) => (
							<article
								key={id}
								className="bg-surface border border-border rounded-2xl p-6"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{t(`people.items.${id}.role`)}
								</h3>
								<p className="font-body text-brand-gold text-sm mb-2">
									{t(`people.items.${id}.focus`)}
								</p>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{t(`people.items.${id}.bio`)}
								</p>
							</article>
						))}
					</div>
				</motion.section>
				{SHOW_EXTENDED_NETWORK && (
					<motion.section {...fadeUp} className="mb-20">
						<h2 className="font-heading text-2xl font-bold text-brand-primary mb-4">
							{t("extended.heading")}
						</h2>
						<p className="font-body text-brand-primary/60 mb-8 leading-relaxed">
							{t("extended.description")}
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{extendedItems.map((item) => (
								<article
									key={item.label}
									className="bg-surface border border-border rounded-xl p-5"
								>
									<h3 className="font-heading text-brand-primary font-semibold mb-1">
										{item.label}
									</h3>
									<p className="font-body text-brand-primary/50 text-sm">
										{item.detail}
									</p>
								</article>
							))}
						</div>
					</motion.section>
				)}
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
				<BookCallCTA
					heading={t("cta.heading")}
					body={t("cta.body")}
					buttonLabel={t("cta.button")}
				/>
			</div>
		</div>
	);
}
