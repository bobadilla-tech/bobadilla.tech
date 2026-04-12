"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/shared/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

export default function ServiceEstimateCTA() {
	const t = useTranslations("ServiceEstimateCTA");

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="bg-brand-bg border border-brand-primary/20 rounded-[40px] sm:rounded-[64px] lg:rounded-[80px] px-6 py-10 sm:p-12 lg:p-16 text-center shadow-[0_10px_10px_0_white/5]"
				>
					<p className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-6">
						{t("subheading")}
					</p>

					<p className="font-body text-brand-primary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
						{t.rich("body", {
							gold: (chunks) => (
								<span className="text-brand-gold font-semibold">{chunks}</span>
							),
						})}
					</p>

					<Button href={CAL_LINKS.ale} variant="gold">
						{t("button")}
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
