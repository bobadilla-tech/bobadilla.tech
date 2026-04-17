"use client";

import { motion } from "framer-motion";
import { User, Link2, TrendingUp, Shield, Layers, Zap } from "lucide-react";
import type { KeyBenefitsData } from "@/features/services/model/types";

const iconMap = {
	user: User,
	"link-2": Link2,
	"trending-up": TrendingUp,
	shield: Shield,
	layers: Layers,
	zap: Zap,
};

interface ServiceKeyBenefitsProps {
	data: KeyBenefitsData;
}

export default function ServiceKeyBenefits({ data }: ServiceKeyBenefitsProps) {
	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-bg">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="font-heading font-bold text-4xl sm:text-5xl mb-4">
						<span className="bg-linear-to-r from-brand-gold to-brand-primary bg-clip-text text-transparent">
							{data.heading.split(" ").slice(0, 2).join(" ")}{" "}
						</span>
						<span className="text-brand-primary">
							{data.heading.split(" ").slice(2).join(" ")}
						</span>
					</h2>
					<p className="font-body text-brand-primary/60 max-w-2xl mx-auto leading-relaxed">
						{data.subtitle}
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{data.items.map((item, i) => {
						const Icon = iconMap[item.icon];
						return (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.1 }}
								className="bg-surface border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-4"
							>
								<div className="w-14 h-14 rounded-xl bg-brand-gold/10 border border-border-gold flex items-center justify-center">
									<Icon className="w-6 h-6 text-brand-gold" />
								</div>
								<h3 className="font-heading font-bold text-brand-primary text-xl">
									{item.title}
								</h3>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{item.body}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
