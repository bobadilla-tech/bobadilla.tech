"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
	overline?: string;
	heading: ReactNode;
	subtitle?: string;
	align?: "center" | "left";
	className?: string;
}

export default function SectionHeader({
	overline,
	heading,
	subtitle,
	align = "center",
	className = "",
}: SectionHeaderProps) {
	const alignClass =
		align === "center" ? "text-center items-center" : "text-left items-start";

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className={`flex flex-col gap-4 ${alignClass} ${className}`}
		>
			{overline && (
				<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
					{overline}
				</span>
			)}
			<h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-primary leading-tight">
				{heading}
			</h2>
			{subtitle && (
				<p className="font-body text-brand-primary/60 text-lg max-w-2xl">
					{subtitle}
				</p>
			)}
		</motion.div>
	);
}
