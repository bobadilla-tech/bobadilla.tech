"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

export default function ServiceEstimateCTA() {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="bg-brand-bg border border-brand-primary/20 rounded-[80px] p-16 text-center shadow-[0_10px_10px_0_white/5]"
				>
					<h2 className="font-heading font-bold text-4xl sm:text-5xl text-brand-primary mb-8 max-w-3xl mx-auto">
						Apply for a complimentary discovery workshop and receive a detailed{" "}
						<span className="text-brand-gold">project proposal</span> with{" "}
						<span className="text-brand-gold">timeline </span>
						and{" "}
						<span className="text-brand-gold">cost breakdown</span>.{" "}
						Limited availability — Apply today!
					</h2>

					<h3 className="font-heading font-bold text-3xl text-brand-primary mb-8">
						GET A FREE PROJECT ESTIMATE
					</h3>

					<Button href={CAL_LINKS.ale} variant="gold">
						CHECK IF YOU QUALIFY
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
