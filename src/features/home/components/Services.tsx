"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { allServices } from "@/features/services/model/services";
import { Link } from "~/i18n/navigation";

export default function Services() {
	const t = useTranslations("ServicesSection");

	return (
		<section className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-6"
				>
					<h2
						className="font-heading font-bold leading-none mb-4"
						style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
					>
						<span className="text-brand-primary">{t("heading1")} </span>
						<span className="text-brand-gold">{t("heading2")}</span>
					</h2>
					<p className="font-body text-brand-primary/50 text-sm sm:text-base tracking-widest uppercase">
						{t("subtitle")}
					</p>
				</motion.div>

				{/* 2-column grid */}
				<div className="grid grid-cols-2 gap-4 sm:gap-5 mt-12">
					{allServices.map((service, i) => (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.07, duration: 0.5 }}
						>
							<Link
								href={`/services/${service.slug}`}
								className="group relative overflow-hidden rounded-3xl border border-white/20 aspect-4/3 block"
							>
								{/* Image */}
								{service.image && (
									<img
										src={service.image}
										alt={service.imageAlt ?? service.title}
										className="absolute inset-0 size-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.4]"
									/>
								)}

								{/* Default overlay gradient */}
								<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

								{/* Default state — title at bottom-left */}
								<div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 transition-opacity duration-300 group-hover:opacity-0">
									<h3 className="font-heading text-white font-extrabold text-xl sm:text-2xl leading-tight">
										{service.titleKey
											? t(service.titleKey as any)
											: service.title}
									</h3>
								</div>

								{/* Hover state — description centered */}
								<div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<h3 className="font-heading text-white font-extrabold text-xl sm:text-2xl leading-tight mb-3 text-center">
										{service.titleKey
											? t(service.titleKey as any)
											: service.title}
									</h3>
									<p className="font-body text-white/80 text-sm sm:text-base text-center leading-relaxed">
										{service.descriptionKey
											? t(service.descriptionKey as any)
											: service.description}
									</p>
									<span className="mt-5 inline-block font-body text-brand-gold text-sm font-semibold tracking-wide border-b border-brand-gold/50 pb-0.5">
										{t("learnMore")}
									</span>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
