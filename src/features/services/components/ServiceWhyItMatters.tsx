"use client";

import { motion } from "framer-motion";
import type { WhyItMattersData } from "@/features/services/model/types";

const colorMap = {
	gold: "bg-brand-gold",
	red: "bg-[#c0392b]",
	blue: "bg-[#2d6fa3]",
};

interface ServiceWhyItMattersProps {
	data: WhyItMattersData;
}

export default function ServiceWhyItMatters({ data }: ServiceWhyItMattersProps) {
	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-bg">
			<div className="max-w-7xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="font-heading font-bold text-4xl sm:text-5xl text-center mb-16"
				>
					<span className="bg-linear-to-r from-brand-gold to-brand-primary bg-clip-text text-transparent">
						{data.heading.split(" ").slice(0, 2).join(" ")}{" "}
					</span>
					<span className="text-brand-primary">
						{data.heading.split(" ").slice(2).join(" ")}
					</span>
				</motion.h2>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0">
					{data.items.map((item, i) => (
						<motion.div
							key={item.label}
							initial={{ opacity: 0, scale: 0.85 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.15 }}
							className="flex flex-col items-center text-center"
							style={{ zIndex: data.items.length - i, marginLeft: i > 0 ? "-2rem" : "0" }}
						>
							<div
								className={`${colorMap[item.color]} w-40 h-40 sm:w-48 sm:h-48 rounded-full opacity-80 flex items-center justify-center`}
							/>
							<p className="font-body text-brand-primary/80 text-sm sm:text-base leading-snug mt-4 max-w-[140px]">
								{item.label}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
