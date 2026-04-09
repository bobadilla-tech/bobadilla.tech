"use client";

import { motion } from "framer-motion";

const steps = [
	{
		label: "Discover",
		number: "1",
		description: "Understand your idea",
		bg: "#f5c842",
		textColor: "#1a1200",
	},
	{
		label: "Design",
		number: "2",
		description: "Shape the experience",
		bg: "#e05a3a",
		textColor: "#fff",
	},
	{
		label: "Build",
		number: "3",
		description: "Develop your MVP",
		bg: "#4caf50",
		textColor: "#fff",
	},
	{
		label: "Launch",
		number: "4",
		description: "Go live with real results",
		bg: "#3b82f6",
		textColor: "#fff",
	},
];

export default function ServiceProcessMVP() {
	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="font-heading font-bold text-4xl sm:text-5xl text-center mb-16 tracking-tight"
				>
					<span className="text-brand-primary">FROM </span>
					<span className="text-brand-gold">IDEA </span>
					<span className="text-brand-primary">TO LAUNCH</span>
				</motion.h2>

				{/* Circle chain — scrollable on mobile */}
				<div className="overflow-x-auto pb-4">
					<div className="flex items-center justify-center min-w-[480px] px-4">
						{steps.map((step, i) => (
							<motion.div
								key={step.label}
								initial={{ opacity: 0, scale: 0.85 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.1 }}
								className="relative flex flex-col items-center"
								style={{ marginLeft: i > 0 ? "-2rem" : 0 }}
							>
								{/* Circle */}
								<div
									className="w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center relative z-10 shadow-lg"
									style={{ backgroundColor: step.bg }}
								>
									<span
										className="font-heading text-xs font-semibold tracking-widest uppercase mb-1"
										style={{ color: step.textColor, opacity: 0.8 }}
									>
										{step.label}
									</span>
									<span
										className="font-heading text-4xl sm:text-5xl font-bold leading-none"
										style={{ color: step.textColor }}
									>
										{step.number}
									</span>
								</div>

								{/* Description below */}
								<p
									className="font-body text-xs sm:text-sm text-brand-primary/60 text-center mt-3 max-w-[120px] leading-snug"
								>
									{step.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
