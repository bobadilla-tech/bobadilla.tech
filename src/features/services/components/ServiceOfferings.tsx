"use client";

import { motion } from "framer-motion";
import type { ServiceOffer } from "@/features/services/model/types";

interface ServiceOfferingsProps {
	heading: string;
	services: ServiceOffer[];
}

/**
 * Returns responsive divider classes for service cards in a 1/2/3-column grid.
 * Mobile: bottom border between items. Medium: right border on left column and
 * bottom border between rows. Large: right border on first two columns and
 * bottom border between rows.
 */
function getServiceItemBorderClasses(index: number, totalServices: number): string {
	const isLastItem = index === totalServices - 1;
	const mediumScreenColumn = index % 2;
	const mediumScreenRow = Math.floor(index / 2);
	const largeScreenColumn = index % 3;
	const largeScreenRow = Math.floor(index / 3);
	const isLastMediumScreenRow =
		mediumScreenRow === Math.floor((totalServices - 1) / 2);
	const isLastLargeScreenRow =
		largeScreenRow === Math.floor((totalServices - 1) / 3);
	const hasMediumScreenRightNeighbor =
		mediumScreenColumn === 0 && index + 1 < totalServices;
	const hasLargeScreenRightNeighbor =
		largeScreenColumn < 2 && index + 1 < totalServices;

	return [
		!isLastItem ? "border-b" : "",
		!isLastMediumScreenRow ? "md:border-b" : "md:border-b-0",
		!isLastLargeScreenRow ? "lg:border-b" : "lg:border-b-0",
		hasMediumScreenRightNeighbor ? "md:border-r" : "md:border-r-0",
		hasLargeScreenRightNeighbor ? "lg:border-r" : "lg:border-r-0",
	]
		.filter(Boolean)
		.join(" ");
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
					{services.map((service, serviceIndex) => {
						return (
							<motion.div
								key={service.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: serviceIndex * 0.08 }}
								className={`border-border p-8 ${getServiceItemBorderClasses(serviceIndex, services.length)}`}
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
