"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
	const [activeStep, setActiveStep] = useState<number | null>(null);

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
						const isOpen = activeStep === i;

						return (
							<motion.div
								key={step.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08 }}
								className="flex justify-center mb-4"
							>
								{/* Ribbon wrapper — cards are absolutely positioned relative to this */}
								<div className="relative flex items-center justify-center w-[340px] sm:w-[500px]">
									<Image
										src={unionImages[i % unionImages.length]}
										alt=""
										width={593}
										height={289}
										className="w-full"
										unoptimized
									/>

									{/* Step button + title overlay */}
									<div className="absolute inset-0 flex items-center justify-center">
										<div
											className={`flex items-center gap-3 ${isEven ? "" : "flex-row-reverse"}`}
										>
											<button
												type="button"
												onClick={() =>
													setActiveStep((current) => (current === i ? null : i))
												}
												aria-expanded={isOpen}
												aria-label={`${step.title}: ${isOpen ? "Hide" : "Show"} details`}
												className="w-20 h-20 flex-shrink-0 rounded-full border border-brand-primary/80 flex items-center justify-center font-body text-brand-primary text-4xl leading-none transition-colors hover:bg-brand-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
											>
												{isOpen ? "−" : "+"}
											</button>
											<h3 className="font-heading font-bold text-white text-2xl whitespace-nowrap">
												{step.title}
											</h3>
										</div>
									</div>

									{/* Desktop description card — floats on the alternating side, never shifts the ribbon */}
									<motion.div
										className={`absolute top-1/2 -translate-y-1/2 hidden sm:block ${isEven ? "right-full mr-6" : "left-full ml-6"}`}
										animate={{
											opacity: isOpen ? 1 : 0,
											scale: isOpen ? 1 : 0.95,
											x: isOpen ? 0 : isEven ? 10 : -10,
										}}
										transition={{ duration: 0.2 }}
										style={{ pointerEvents: isOpen ? "auto" : "none" }}
										aria-hidden={!isOpen}
									>
										<div className="bg-white rounded-[47px] p-8 w-64">
											<p className="font-body text-black text-xl font-light leading-snug text-center">
												{step.description}
											</p>
										</div>
									</motion.div>
								</div>

								{/* Mobile description card — expands below the ribbon */}
								<AnimatePresence>
									{isOpen && (
										<motion.div
											className="sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 z-10 w-64"
											initial={{ opacity: 0, y: -8 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -8 }}
											transition={{ duration: 0.2 }}
										>
											<div className="bg-white rounded-[47px] p-8">
												<p className="font-body text-black text-xl font-light leading-snug text-center">
													{step.description}
												</p>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
