"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

const stats = [
	{ title: "Built to Scale", subtitle: "Scalable Architecture" },
	{ title: "100+", subtitle: "Projects Delivered" },
	{ title: "24/7", subtitle: "Support Available" },
	{ title: "100%", subtitle: "Client Satisfaction" },
];

export default function StatsBar() {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="grid grid-cols-2 md:grid-cols-4 gap-6"
				>
					{stats.map((stat) => (
						<StatCard key={stat.title} title={stat.title} subtitle={stat.subtitle} />
					))}
				</motion.div>
			</div>
		</section>
	);
}
