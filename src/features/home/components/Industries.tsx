"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { industryServices } from "@/features/services/model/services";
import SectionHeader from "@/components/ui/SectionHeader";
import IndustryCard from "@/components/ui/IndustryCard";

const featured = industryServices.filter((i) =>
	["healthcare", "education", "finance", "transportation"].includes(i.id)
);

export default function Industries() {
	const t = useTranslations("IndustriesSection");

	return (
		<section id="projects" className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-16 flex flex-col items-center">
					<SectionHeader
						heading={
							<>
								<span className="text-brand-gold">{t("heading1")}</span>{" "}
								{t("heading2")}
							</>
						}
						subtitle={t("subtitle")}
					/>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					{featured.map((industry, i) => (
						<motion.div
							key={industry.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1, duration: 0.5 }}
						>
							<IndustryCard
								title={industry.industry}
								image={
									industry.image ??
									"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
								}
								alt={industry.imageAlt ?? industry.industry}
								href={`/services/all/${industry.slug}`}
								description={industry.description}
							/>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
