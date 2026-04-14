"use client";

import { motion } from "framer-motion";
import type { ServiceOffer } from "@/features/services/model/types";

interface ServiceOfferingsProps {
	heading: string;
	services: ServiceOffer[];
}

export default function ServiceOfferings({
	heading,
	services,
}: ServiceOfferingsProps) {
	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="font-heading font-bold text-4xl sm:text-5xl text-center mb-16"
				>
					<span className="bg-linear-to-r from-brand-gold to-brand-primary bg-clip-text text-transparent">
						{heading.split(" ").slice(0, 2).join(" ")}{" "}
					</span>
					<span className="text-brand-primary">
						{heading.split(" ").slice(2).join(" ")}
					</span>
				</motion.h2>

				{/* 2×3 grid with dividers */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service, i) => {
						const totalServices = services.length;
						const isLastItem = i === totalServices - 1;
						const mdCol = i % 2;
						const mdRow = Math.floor(i / 2);
						const lgCol = i % 3;
						const lgRow = Math.floor(i / 3);
						const isLastMdRow = mdRow === Math.floor((totalServices - 1) / 2);
						const isLastLgRow = lgRow === Math.floor((totalServices - 1) / 3);
						const hasMdRightNeighbor = mdCol === 0 && i + 1 < totalServices;
						const hasLgRightNeighbor = lgCol < 2 && i + 1 < totalServices;

						return (
							<motion.div
								key={service.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.08 }}
								className={`border-border p-8 ${!isLastItem ? "border-b" : ""} ${!isLastMdRow ? "md:border-b" : "md:border-b-0"} ${!isLastLgRow ? "lg:border-b" : "lg:border-b-0"} ${hasMdRightNeighbor ? "md:border-r" : "md:border-r-0"} ${hasLgRightNeighbor ? "lg:border-r" : "lg:border-r-0"}`}
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
