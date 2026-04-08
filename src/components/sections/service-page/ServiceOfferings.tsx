"use client";

import { motion } from "framer-motion";
import type { ServiceOffer } from "@/data/service-pages";

interface ServiceOfferingsProps {
	heading: string;
	services: ServiceOffer[];
}

export default function ServiceOfferings({ heading, services }: ServiceOfferingsProps) {
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
						{heading.split(" ").slice(0, 2).join(" ")}{" "}
					</span>
					<span className="text-brand-primary">
						{heading.split(" ").slice(2).join(" ")}
					</span>
				</motion.h2>

				{/* 2×3 grid with dividers */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service, i) => {
						const col = i % 3;
						const row = Math.floor(i / 3);
						const isLastRow = row === Math.floor((services.length - 1) / 3);
						const isLastCol = col === Math.min(services.length - 1 - row * 3, 2);

						return (
							<motion.div
								key={service.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.08 }}
								className={`p-8 ${!isLastRow ? "border-b border-border" : ""} ${col < 2 ? "lg:border-r lg:border-border" : ""}`}
							>
								<h3 className="font-heading font-bold text-brand-primary text-xl mb-4 leading-snug">
									{service.title}
								</h3>
								<p className="font-body text-brand-primary/60 text-base leading-relaxed">
									{service.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
