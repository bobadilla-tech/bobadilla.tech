"use client";

import { motion } from "framer-motion";
import type { MvpForWho } from "@/data/service-pages";

interface ServiceForWhoProps {
	heading: string;
	forWho: MvpForWho[];
}

export default function ServiceForWho({
	heading,
	forWho,
}: ServiceForWhoProps) {
	const words = heading.split(" ");
	const headingGold = words.slice(0, 3).join(" ");
	const headingWhite = words.slice(3).join(" ");

	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="font-heading font-bold text-4xl sm:text-5xl text-center mb-16"
				>
					<span className="bg-gradient-to-r from-brand-gold to-brand-primary bg-clip-text text-transparent">
						{headingGold}{" "}
					</span>
					<span className="text-brand-primary">{headingWhite}</span>
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{forWho.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							className="bg-white rounded-[26px] p-8 flex flex-col"
						>
							<span className="inline-block font-body text-xs font-semibold tracking-widest uppercase text-brand-gold bg-brand-gold/10 border border-brand-gold/30 rounded-full px-3 py-1 mb-6 self-start">
								{item.tag}
							</span>
							<h3 className="font-heading text-[#1a1919] text-2xl font-semibold mb-4 leading-tight">
								{item.title}
							</h3>
							<p className="font-body text-[#191818] text-base font-extralight leading-relaxed">
								{item.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
