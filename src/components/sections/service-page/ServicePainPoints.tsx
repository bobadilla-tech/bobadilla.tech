"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PainPoint } from "@/data/service-pages";

interface ServicePainPointsProps {
	heading: string;
	painPoints: PainPoint[];
}

export default function ServicePainPoints({
	heading,
	painPoints,
}: ServicePainPointsProps) {
	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h2 className="font-heading font-bold text-4xl sm:text-5xl text-brand-primary">
						<span className="bg-gradient-to-r from-brand-gold to-brand-primary bg-clip-text text-transparent">
							{heading.split(" ").slice(0, 2).join(" ")}{" "}
						</span>
						{heading.split(" ").slice(2).join(" ")}
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{painPoints.map((point, i) => (
						<motion.div
							key={point.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							className="bg-white rounded-[26px] p-8 relative overflow-hidden"
						>
							{/* Icon */}
							<div className="w-32 h-32 mb-6">
								<Image
									src={point.icon}
									alt={point.title}
									width={128}
									height={128}
									className="w-full h-full object-contain"
									unoptimized
								/>
							</div>

							{/* Divider */}
							<div className="w-full h-px bg-black/10 mb-6" />

							{/* Content */}
							<h3 className="font-heading text-[#1a1919] text-2xl font-normal mb-4 leading-tight">
								{point.title}
							</h3>
							<p className="font-body text-[#191818] text-lg font-extralight leading-relaxed">
								{point.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
