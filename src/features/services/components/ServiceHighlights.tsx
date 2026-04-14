"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ServiceHighlight } from "@/features/services/model/types";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/shared/ui/carousel";

interface ServiceHighlightsProps {
	heading: string;
	highlights: ServiceHighlight[];
}

export default function ServiceHighlights({
	heading,
	highlights,
}: ServiceHighlightsProps) {
	return (
		<section className="py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
			</div>

			<div className="px-4 sm:px-6">
				<Carousel opts={{ align: "start", loop: false, dragFree: true }}>
					<CarouselContent className="-ml-4">
						{highlights.map((item, i) => (
							<CarouselItem
								key={item.title}
								className="pl-4 basis-[86%] sm:basis-[56%] lg:basis-[32%]"
							>
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: i * 0.08 }}
									className="bg-white rounded-[26px] p-8 h-full"
								>
									<div className="w-32 h-32 mb-6">
										<Image
											src={item.icon}
											alt={item.title}
											width={128}
											height={128}
											className="w-full h-full object-contain"
											unoptimized
										/>
									</div>
									<div className="w-full h-px bg-black/10 mb-6" />
									<h3 className="font-heading text-[#1a1919] text-2xl font-normal mb-4 leading-tight">
										{item.title}
									</h3>
									<p className="font-body text-[#191818] text-lg font-extralight leading-relaxed">
										{item.description}
									</p>
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
}
