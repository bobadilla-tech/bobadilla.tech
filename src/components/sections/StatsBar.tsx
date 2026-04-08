"use client";

import { motion } from "framer-motion";
import { Copy, SquarePlus, History, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [
	<Copy key="copy" size={56} strokeWidth={1.5} />,
	<SquarePlus key="plus" size={56} strokeWidth={1.5} />,
	<History key="history" size={56} strokeWidth={1.5} />,
	<Trophy key="trophy" size={56} strokeWidth={1.5} />,
];

export default function StatsBar() {
	const t = useTranslations("StatsBar");
	const stats = t.raw("stats") as { title: string; subtitle: string }[];

	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-primary mb-4">
						{t("heading1")}{" "}
						<span className="text-brand-gold">{t("heading2")}</span>
					</h2>
					<p className="font-body text-brand-primary/50 text-sm sm:text-base tracking-widest uppercase">
						{t("subtitle")}
					</p>
				</motion.div>

				{/* Cards */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
				>
					{stats.map((stat, i) => (
						<motion.div
							key={stat.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.08, duration: 0.5 }}
							className="bg-white text-black rounded-2xl p-8 flex flex-col items-start justify-between gap-6 min-h-50"
						>
							<div className="text-black">{icons[i]}</div>
							<div className="flex flex-col gap-1">
								<span className="font-heading text-3xl sm:text-4xl font-bold tracking-tight leading-none">
									{stat.title}
								</span>
								<span className="font-body text-sm text-black/60">
									{stat.subtitle}
								</span>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
