"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { CAL_LINKS } from "~/lib/constants";
import Button from "@/components/ui/Button";

export default function Hero() {
	return (
		<section className="relative min-h-screen flex flex-col items-center overflow-hidden">
			{/* Text content */}
			<div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-0 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="flex flex-col items-center gap-5"
				>
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.5 }}
						className="inline-flex items-center gap-2 text-brand-primary/60"
					>
						<BadgeCheck className="size-4 shrink-0" />
						<span className="font-body text-xs sm:text-sm font-medium tracking-widest uppercase">
							Top Latam Engineering Agency
						</span>
					</motion.div>

					{/* Heading */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.7 }}
						className="font-heading font-bold leading-none tracking-tight"
					>
						<span
							className="block whitespace-nowrap text-brand-primary"
							style={{ fontSize: "clamp(1.75rem, 6.5vw, 6.5rem)" }}
						>
							CREATING
						</span>
						<span
							className="block whitespace-nowrap text-brand-gold"
							style={{ fontSize: "clamp(2.25rem, 9.5vw, 9.5rem)" }}
						>
							WORLD&#8211;CLASS
						</span>
						<span
							className="block whitespace-nowrap text-brand-primary"
							style={{ fontSize: "clamp(1.5rem, 5.8vw, 5.8rem)" }}
						>
							DIGITAL PRODUCTS
						</span>
					</motion.h1>
				</motion.div>
			</div>

			{/* Globe illustration */}
			<motion.div
				initial={{ opacity: 0, scale: 0.97 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.3, duration: 1 }}
				className="relative z-0 w-full max-w-5xl mx-auto px-4 -mt-4 sm:-mt-8"
			>
				<Image
					src="/assets/landing/main.png"
					alt="World-class digital products"
					width={1200}
					height={800}
					className="w-full h-auto"
					priority
				/>
			</motion.div>

			{/* Book a Call — below globe */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.7, duration: 0.6 }}
				className="relative z-10 pb-16"
			>
				<Button href={CAL_LINKS.ale} variant="gold" size="lg">
					Book a Call
				</Button>
			</motion.div>
		</section>
	);
}
