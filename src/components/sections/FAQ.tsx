"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FAQItem from "@/components/ui/FAQItem";
import Button from "@/components/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const t = useTranslations("HomeFAQ");
	const faqs = t.raw("faqs") as { q: string; a: string }[];

	return (
		<section className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
					{/* Left: FAQ label + CTA */}
					<motion.div
						initial={{ opacity: 0, x: -24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="flex flex-col justify-between gap-8"
					>
						<div className="flex flex-col gap-4">
							<span className="font-heading text-8xl font-bold text-brand-primary leading-none">
								FAQ
							</span>
							<p className="font-body text-brand-primary/50 text-base">
								{t("description")}
							</p>
						</div>
						<Button href={CAL_LINKS.ale} variant="gold" size="md" className="w-fit">
							{t("bookCall")}
						</Button>
					</motion.div>

					{/* Right: Questions */}
					<motion.div
						initial={{ opacity: 0, x: 24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="lg:col-span-2"
					>
						{faqs.map((faq, i) => (
							<FAQItem
								key={faq.q}
								question={faq.q}
								answer={faq.a}
								isOpen={openIndex === i}
								onToggle={() => setOpenIndex(openIndex === i ? null : i)}
							/>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
