"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeader from "@/shared/ui/SectionHeader";

export default function WhyBobatech() {
	const t = useTranslations("WhyBobatech");
	const rows = t.raw("rows") as string[];

	return (
		<section className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-16 flex flex-col items-center">
					<SectionHeader
						heading={
							<>
								{t("heading1")}{" "}
								<span className="text-brand-gold">{t("heading2")}</span>?
							</>
						}
					/>
				</div>

				<motion.div
					role="table"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="max-w-3xl mx-auto"
				>
					{/* Table header */}
					<div role="row" className="grid grid-cols-3 mb-4">
						<div role="columnheader" />
						<div
							role="columnheader"
							className="text-center font-body text-brand-primary/50 text-sm font-light tracking-wider uppercase py-3"
						>
							{t("others")}
						</div>
						<div
							role="columnheader"
							className="text-center font-heading text-brand-gold font-semibold tracking-wider uppercase py-3"
						>
							{t("bobatech")}
						</div>
					</div>

					{/* Separator */}
					<div className="border-t border-border mb-2" />

					{/* Rows */}
					{rows.map((row, i) => (
						<motion.div
							key={row}
							role="row"
							initial={{ opacity: 0, x: -16 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1, duration: 0.4 }}
							className="grid grid-cols-3 items-center border-b border-border"
						>
							<span
								role="cell"
								className="font-body text-brand-primary text-base py-5"
							>
								{row}
							</span>
							<div role="cell" className="flex justify-center">
								<X className="size-6 text-red-400/80" aria-hidden="true" />
								<span className="sr-only">
									{t("others")}: {t("no")}
								</span>
							</div>
							<div role="cell" className="flex justify-center">
								<Check className="size-6 text-brand-gold" aria-hidden="true" />
								<span className="sr-only">
									{t("bobatech")}: {t("yes")}
								</span>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
