"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ProcessStep } from "@/data/service-pages";

interface ServiceProcessProps {
	heading: string;
	subtitle: string;
	steps: ProcessStep[];
}

// Union ribbon images alternate normal/flipped per step
const unionImages = [
	"/assets/services/process/union-1.svg",
	"/assets/services/process/union-2.svg",
	"/assets/services/process/union-3.svg",
	"/assets/services/process/union-4.svg",
	"/assets/services/process/union-5.svg",
	"/assets/services/process/union-6.svg",
];

export default function ServiceProcess({ heading, subtitle, steps }: ServiceProcessProps) {
	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-6"
				>
					<h2 className="font-heading font-bold text-4xl sm:text-5xl">
						<span className="bg-gradient-to-r from-brand-gold to-brand-primary bg-clip-text text-transparent">
							{heading}
						</span>
					</h2>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="font-body text-brand-primary/60 text-center text-lg max-w-3xl mx-auto mb-20"
				>
					{subtitle}
				</motion.p>

				{/* Zigzag flow */}
				<div className="relative">
					{steps.map((step, i) => {
						const isEven = i % 2 === 0;
						const descriptionCard = (
							<motion.div
								initial={{ opacity: 0, x: isEven ? 30 : -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 }}
								className="bg-white rounded-[47px] p-8 w-64 flex-shrink-0"
							>
								<p className="font-body text-black text-xl font-light leading-snug text-center">
									{step.description}
								</p>
							</motion.div>
						);

						return (
							<motion.div
								key={step.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08 }}
								className={`flex items-center gap-8 mb-4 ${isEven ? "flex-row" : "flex-row-reverse"}`}
							>
								{/* Description bubble on alternating side */}
								<div className={`flex-1 flex ${isEven ? "justify-end" : "justify-start"}`}>
									{descriptionCard}
								</div>

								{/* Center: Union ribbon + step label */}
								<div className="relative flex items-center justify-center flex-shrink-0 w-[340px] sm:w-[500px]">
									<Image
										src={unionImages[i % unionImages.length]}
										alt=""
										width={593}
										height={289}
										className="w-full"
										unoptimized
									/>
									{/* Step number dot + title overlay */}
									<div className="absolute inset-0 flex items-center justify-center">
										<div className={`flex items-center gap-3 ${isEven ? "" : "flex-row-reverse"}`}>
											<div className="w-20 h-20 flex-shrink-0">
												<Image
													src="/assets/services/shared/ellipse-process.svg"
													alt=""
													width={80}
													height={80}
													unoptimized
												/>
											</div>
											<h3 className="font-heading font-bold text-white text-2xl whitespace-nowrap">
												{step.title}
											</h3>
										</div>
									</div>
								</div>

								{/* Empty spacer on other side */}
								<div className="flex-1" />
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
