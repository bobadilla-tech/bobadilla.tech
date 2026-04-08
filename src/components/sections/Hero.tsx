"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { CAL_LINKS } from "~/lib/constants";
import Button from "@/components/ui/Button";

export default function Hero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="flex flex-col items-center gap-8"
				>
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className="inline-flex items-center gap-2 border border-brand-gold/30 bg-brand-gold/5 rounded-full px-5 py-2"
					>
						<ShieldCheck className="size-4 text-brand-gold" />
						<span className="font-body text-brand-gold text-sm font-medium tracking-wide">
							TOP LATAM ENGINEERING AGENCY
						</span>
					</motion.div>

					{/* Main Heading */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="font-heading font-bold leading-none tracking-tight"
					>
						<span className="block text-5xl sm:text-7xl lg:text-8xl text-brand-primary">
							CREATING
						</span>
						<span className="block text-6xl sm:text-8xl lg:text-[7rem] text-brand-gold">
							WORLD-CLASS
						</span>
						<span className="block text-5xl sm:text-7xl lg:text-8xl text-brand-primary">
							DIGITAL PRODUCTS
						</span>
					</motion.h1>

					{/* CTA */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.8 }}
					>
						<Button href={CAL_LINKS.ale} variant="gold" size="lg">
							Book a Call
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
