"use client";

import { motion } from "framer-motion";
import { MousePointer2, GitBranch, RefreshCw } from "lucide-react";
import type { MvpSolution } from "@/data/service-pages";

const solutionIcons = {
	prototype: MousePointer2,
	functional: GitBranch,
	refinement: RefreshCw,
};

interface ServiceSolutionsProps {
	heading: string;
	solutions: MvpSolution[];
}

export default function ServiceSolutions({
	heading,
	solutions,
}: ServiceSolutionsProps) {
	const [headingStart, ...headingRest] = heading.split(" ");
	const headingMiddle = headingRest.slice(0, 1).join(" ");
	const headingEnd = headingRest.slice(1).join(" ");

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
						{headingStart} {headingMiddle}{" "}
					</span>
					<span className="text-brand-primary">{headingEnd}</span>
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{solutions.map((solution, i) => {
						const Icon = solutionIcons[solution.icon];
						return (
							<motion.div
								key={solution.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.1 }}
								className="bg-gradient-to-b from-brand-gold/15 to-brand-bg border border-border-gold rounded-[26px] p-8 flex flex-col min-h-[320px]"
							>
								<div className="flex-1 flex items-center justify-center mb-8">
									<Icon className="w-20 h-20 text-white/90" strokeWidth={1} />
								</div>
								<h3 className="font-heading text-brand-primary text-2xl font-semibold mb-3 leading-tight">
									{solution.title}
								</h3>
								<p className="font-body text-brand-primary/60 text-base leading-relaxed">
									{solution.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
