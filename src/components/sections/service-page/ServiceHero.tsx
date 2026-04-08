"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { CAL_LINKS } from "~/lib/constants";
import { ArrowRight } from "lucide-react";

interface ServiceHeroProps {
	eyebrow: string;
	line1: string;
	line2: string;
	subtitle: string;
}

export default function ServiceHero({ eyebrow, line1, line2, subtitle }: ServiceHeroProps) {
	const t = useTranslations("ServiceHero");

	return (
		<section className="pt-40 pb-20 text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<p className="font-body font-medium text-brand-primary/50 tracking-widest text-sm uppercase mb-6">
					{eyebrow}
				</p>

				<h1 className="font-heading font-bold leading-none tracking-tight mb-8">
					<span className="block text-4xl sm:text-6xl lg:text-7xl text-brand-primary">
						{line1}
					</span>
					<span className="block text-5xl sm:text-7xl lg:text-8xl text-brand-gold">
						{line2}
					</span>
				</h1>

				<p className="font-body text-xl text-brand-primary/60 max-w-3xl mx-auto mb-12">
					{subtitle}
				</p>

				<Button href={CAL_LINKS.ale} variant="gold" size="lg" className="inline-flex items-center gap-3">
					{t("bookCall")}
					<ArrowRight className="w-5 h-5" />
				</Button>
			</motion.div>
		</section>
	);
}
