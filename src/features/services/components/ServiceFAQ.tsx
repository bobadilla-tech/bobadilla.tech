"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FAQItem from "@/shared/ui/FAQItem";
import { SOCIAL_LINKS } from "~/lib/constants";
import { Linkedin } from "@/shared/ui/BrandIcons";

interface ServiceFAQProps {
	faqs?: { q: string; a: string }[];
}

export default function ServiceFAQ({ faqs }: ServiceFAQProps) {
	const t = useTranslations("ServiceFAQ");
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const defaultFaqs = [
		{ q: t("defaults.0.q"), a: t("defaults.0.a") },
		{ q: t("defaults.1.q"), a: t("defaults.1.a") },
		{ q: t("defaults.2.q"), a: t("defaults.2.a") },
		{ q: t("defaults.3.q"), a: t("defaults.3.a") },
	];

	const activeFaqs = faqs ?? defaultFaqs;

	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
					{/* Left column */}
					<div className="flex flex-col gap-8">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="font-heading font-bold text-center"
						>
							<span className="bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-primary bg-clip-text text-transparent text-8xl leading-none">
								FAQ
							</span>
						</motion.h2>

						<div className="hidden lg:block">
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 }}
								className="border border-brand-primary/20 rounded-[38px] p-6"
							>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed mb-6">
									{t("infoBoxBody")}
								</p>
								<a
									href={SOCIAL_LINKS.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-white rounded-[18px] p-3 flex items-center justify-center gap-2 mb-4 hover:bg-white/90 transition-colors duration-200"
								>
									<Linkedin size={16} className="text-[#0A66C2]" />
									<span className="font-body font-medium text-black text-sm">
										{t("linkedinCta")}
									</span>
								</a>
							</motion.div>
						</div>

					</div>

					{/* Right column — accordion */}
					<div className="lg:col-span-2">
						<div className="space-y-0 divide-y divide-brand-primary/10">
							{activeFaqs.map((faq, i) => (
								<FAQItem
									id={`service-${i}`}
									key={faq.q}
									question={faq.q}
									answer={faq.a}
									isOpen={openIndex === i}
									onToggle={() => setOpenIndex(openIndex === i ? null : i)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
