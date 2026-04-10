"use client";

import { motion } from "framer-motion";
import { MousePointer2, GitBranch, RefreshCw, Target, TrendingUp } from "lucide-react";
import type { MvpSolution } from "@/data/service-pages";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

const solutionIcons = {
	prototype: MousePointer2,
	functional: GitBranch,
	refinement: RefreshCw,
	"feature-focused": Target,
	growth: TrendingUp,
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
		<section className="py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="font-heading font-bold text-4xl sm:text-5xl text-center mb-16"
				>
					<span className="bg-linear-to-r from-brand-gold to-brand-primary bg-clip-text text-transparent">
						{headingStart} {headingMiddle}{" "}
					</span>
					<span className="text-brand-primary">{headingEnd}</span>
				</motion.h2>
			</div>

			<div className="px-4 sm:px-6">
				<Carousel opts={{ align: "start", loop: false, dragFree: true }}>
					<CarouselContent className="-ml-4">
						{solutions.map((solution, i) => {
							const Icon = solutionIcons[solution.icon];
							return (
								<CarouselItem
									key={solution.title}
									className="pl-4 basis-[72%] sm:basis-[44%] lg:basis-[30%]"
								>
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: i * 0.08 }}
										className="bg-linear-to-b from-brand-gold/15 to-brand-bg border border-border-gold rounded-[26px] p-6 flex flex-col h-55"
									>
										<div className="flex-1 flex items-center justify-center">
											<Icon className="w-14 h-14 text-white/90" strokeWidth={1} />
										</div>
										<h3 className="font-heading text-brand-primary text-xl font-semibold mb-2 leading-tight">
											{solution.title}
										</h3>
										<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
											{solution.description}
										</p>
									</motion.div>
								</CarouselItem>
							);
						})}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
}
