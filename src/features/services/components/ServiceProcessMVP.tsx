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

				{/* Mobile: vertical stacked steps */}
				<div className="flex flex-col items-center gap-0 sm:hidden">
					{steps.map((step, i) => (
						<div key={step.label} className="flex flex-col items-start w-full max-w-xs">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.1 }}
								className="flex flex-row items-center gap-4 w-full"
							>
								<div
									className="w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center shrink-0"
									style={{ borderColor: step.bg }}
								>
									<span
										className="font-heading text-[9px] font-semibold tracking-widest uppercase"
										style={{ color: step.bg }}
									>
										{step.label}
									</span>
									<span
										className="font-heading text-3xl font-bold leading-none"
										style={{ color: step.bg }}
									>
										{step.number}
									</span>
								</div>
								<p className="font-body text-sm text-brand-primary/70 leading-snug">
									{step.description}
								</p>
							</motion.div>

							{i < steps.length - 1 && (
								<div className="w-px h-5 bg-brand-primary/20 ml-10 my-1" />
							)}
						</div>
					))}
				</div>

				{/* Desktop: overlapping chain of rings */}
				<div className="hidden sm:flex items-center justify-center">
					{steps.map((step, i) => (
						<motion.div
							key={step.label}
							initial={{ opacity: 0, scale: 0.85 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							className="relative flex flex-col items-center"
							style={{ marginLeft: i > 0 ? "-2rem" : 0, zIndex: i + 1 }}
						>
							<div
								className="w-44 h-44 rounded-full border-10 flex flex-col items-center justify-center shadow-lg"
								style={{ borderColor: step.bg }}
							>
								<span
									className="font-heading text-xs font-semibold tracking-widest uppercase mb-1"
									style={{ color: step.bg, opacity: 0.9 }}
								>
									{step.label}
								</span>
								<span
									className="font-heading text-5xl font-bold leading-none"
									style={{ color: step.bg }}
								>
									{step.number}
								</span>
							</div>
							<p className="font-body text-sm text-brand-primary/60 text-center mt-3 max-w-30 leading-snug">
								{step.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
