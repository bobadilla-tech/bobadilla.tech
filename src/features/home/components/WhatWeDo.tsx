"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import SectionHeader from "@/shared/ui/SectionHeader";
import Button from "@/shared/ui/Button";

export default function WhatWeDo() {
	const t = useTranslations("WhatWeDo");
	return (
		<section id="what-we-do" className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-16 flex flex-col items-center">
					<SectionHeader
						overline={t("overline")}
						heading={
							<>
								{t("heading")}{" "}
								<span className="text-brand-gold">{t("headingGold")}</span>
							</>
						}
						subtitle={t("subtitle")}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{(["services", "products"] as const).map((card) => (
						<div
							key={card}
							className="bg-surface border border-border rounded-2xl p-8 flex flex-col gap-5"
						>
							<h3 className="font-heading text-2xl font-bold text-brand-primary">
								{t(`${card}.title`)}
							</h3>
							<p className="font-body text-brand-primary/60 leading-relaxed">
								{t(`${card}.body`)}
							</p>
							<ul className="flex flex-col gap-3">
								{(t.raw(`${card}.items`) as string[]).map((item) => (
									<li key={item} className="flex items-start gap-3">
										<Check
											className="size-5 text-brand-gold shrink-0 mt-0.5"
											aria-hidden="true"
										/>
										<span className="font-body text-brand-primary/70">
											{item}
										</span>
									</li>
								))}
							</ul>
							<Button
								to={card === "services" ? "/services" : "/products"}
								variant="outline"
								size="sm"
								className="w-fit mt-auto"
							>
								{t(`${card}.cta`)}
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
