"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { TechCategory } from "@/data/service-pages";

interface ServiceTechStackProps {
	categories: TechCategory[];
}

export default function ServiceTechStack({
	categories,
}: ServiceTechStackProps) {
	const t = useTranslations("ServiceTechStack");

	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="font-heading font-bold text-4xl sm:text-5xl text-center mb-16"
				>
					<span className="bg-gradient-to-r from-brand-gold to-brand-primary bg-clip-text text-transparent">
						{t("heading")}
					</span>
				</motion.h2>

				<div className="border-t border-brand-primary/20">
					{categories.map((cat, i) => (
						<motion.div
							key={cat.label}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="flex items-start gap-12 py-8 border-b border-brand-primary/20"
						>
							{/* Category label */}
							<div className="w-32 flex-shrink-0 flex items-center h-12">
								<span className="font-heading font-bold text-brand-primary text-2xl">
									{cat.label}
								</span>
							</div>

							{/* Tech badges */}
							<div className="flex flex-wrap gap-3">
								{cat.items.map((tech) => (
									<div
										key={tech.name}
										className="flex items-center gap-2 border border-brand-gold/40 rounded-full px-3 py-1.5 h-12"
									>
										<div className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden">
											<Image
												src={tech.icon}
												alt={tech.name}
												width={36}
												height={36}
												className="w-full h-full object-cover"
												unoptimized
											/>
										</div>
										<span className="font-body font-light text-brand-primary text-base whitespace-nowrap">
											{tech.name}
										</span>
									</div>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
