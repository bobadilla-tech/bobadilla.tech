"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { ProcessStep } from "@/features/services/model/types";

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

export default function ServiceProcess({
	heading,
	subtitle,
	steps,
}: ServiceProcessProps) {
	const [activeStep, setActiveStep] = useState<number | null>(0);
	const [hoveredStep, setHoveredStep] = useState<number | null>(null);

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
						const isDescriptionOpen = activeStep === i || hoveredStep === i;
						const descriptionCard = (
							<motion.div
								initial={{ opacity: 0, x: isEven ? 30 : -30 }}
								animate={{
									opacity: isDescriptionOpen ? 1 : 0,
									x: isDescriptionOpen ? 0 : isEven ? 24 : -24,
									scale: isDescriptionOpen ? 1 : 0.96,
								}}
								viewport={{ once: true }}
								transition={{ duration: 0.2 }}
								className="bg-white rounded-[47px] p-8 w-64 flex-shrink-0"
								aria-hidden={!isDescriptionOpen}
								style={{ pointerEvents: isDescriptionOpen ? "auto" : "none" }}
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
								onMouseEnter={() => setHoveredStep(i)}
								onMouseLeave={() => setHoveredStep(null)}
							>
								{/* Description bubble on alternating side */}
								<div
									className={`flex-1 flex ${isEven ? "justify-end" : "justify-start"}`}
								>
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
										<div
											className={`flex items-center gap-3 ${isEven ? "" : "flex-row-reverse"}`}
										>
											<button
												type="button"
												onClick={() =>
													setActiveStep((current) => (current === i ? null : i))
												}
												aria-expanded={isDescriptionOpen}
												aria-label={`${step.title}: ${isDescriptionOpen ? "Hide" : "Show"} details`}
												className="w-20 h-20 flex-shrink-0 rounded-full border border-white/80 flex items-center justify-center font-body text-white text-4xl leading-none transition-colors hover:bg-white/10"
											>
												+
											</button>
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
