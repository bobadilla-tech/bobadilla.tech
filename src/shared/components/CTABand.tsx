"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CAL_LINKS } from "~/lib/constants";
import Button from "@/shared/ui/Button";

export default function CTABand() {
	const t = useTranslations("CTABand");

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="max-w-7xl mx-auto bg-brand-gold rounded-[40px] sm:rounded-[70px] py-10 px-4 sm:py-20 sm:px-8"
			>
				<div className="bg-white rounded-3xl sm:rounded-[40px] max-w-4xl mx-auto py-10 px-6 sm:py-16 sm:px-8 flex flex-col items-center gap-6 text-center">
					<h2 className="font-heading text-black font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
						{t("heading")}
					</h2>
					<p className="font-body text-black/80 text-lg max-w-xl">
						{t("subtitle")}
					</p>
					<Button href={CAL_LINKS.ale} variant="gold" size="lg">
						{t("button")}
					</Button>
				</div>
			</motion.div>
		</section>
	);
}
