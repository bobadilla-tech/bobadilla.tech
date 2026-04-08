"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CAL_LINKS } from "~/lib/constants";
import Button from "@/components/ui/Button";

export default function CTABand() {
	const t = useTranslations("CTABand");

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="max-w-7xl mx-auto bg-brand-gold rounded-[70px] py-20 px-8"
			>
				<div className="bg-white rounded-[40px] max-w-4xl mx-auto py-16 px-8 flex flex-col items-center gap-6 text-center">
					<h2 className="font-heading text-black font-semibold text-4xl md:text-5xl leading-tight">
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
