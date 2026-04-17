"use client";

import { motion } from "framer-motion";
import Button from "@/shared/ui/Button";
import { fadeUp } from "@/shared/ui/animations";
import { CAL_LINKS } from "~/lib/constants";

interface BookCallCTAProps {
	heading: string;
	body: string;
	subtext?: string;
	buttonLabel?: string;
	href?: string;
}

export default function BookCallCTA({
	heading,
	body,
	subtext,
	buttonLabel = "Book a call",
	href = CAL_LINKS.eliaz,
}: BookCallCTAProps) {
	return (
		<motion.div
			{...fadeUp}
			className="bg-brand-gold/10 border border-border-gold rounded-2xl p-10 text-center"
		>
			<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
				{heading}
			</h2>
			<p className={`font-body text-brand-primary/60 max-w-md mx-auto ${subtext ? "mb-2" : "mb-8"}`}>
				{body}
			</p>
			{subtext && (
				<p className="font-body text-brand-primary/40 text-sm mb-8">{subtext}</p>
			)}
			<Button href={href} variant="gold" size="md">
				{buttonLabel}
			</Button>
		</motion.div>
	);
}
