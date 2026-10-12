"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/shared/ui/SectionHeader";
import Button from "@/shared/ui/Button";

export default function EngineeringPrinciples() {
	const t = useTranslations("EngineeringPrinciples");
	const items = t.raw("items") as { title: string; body: string }[];
	return (
		<section className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-16 flex flex-col items-center">
					<SectionHeader
						heading={
							<>
								{t("heading1")}{" "}
								<span className="text-brand-gold">{t("heading2")}</span>
							</>
						}
						subtitle={t("subtitle")}
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
					{items.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.08, duration: 0.5 }}
							className="bg-surface border border-border rounded-2xl p-8"
						>
							<h3 className="font-heading text-xl font-semibold text-brand-primary mb-3">
								{item.title}
							</h3>
							<p className="font-body text-brand-primary/60 leading-relaxed">
								{item.body}
							</p>
						</motion.div>
					))}
				</div>
				<div className="flex justify-center mt-12">
					<Button to="/company" variant="outline" size="md">
						{t("cta")}
					</Button>
				</div>
			</div>
		</section>
	);
}
