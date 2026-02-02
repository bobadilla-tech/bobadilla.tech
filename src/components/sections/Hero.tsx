"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { CAL_LINKS } from "~/lib/constants";

export default function Hero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="space-y-8"
				>
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-4 py-2 text-sm"
					>
						<Sparkles className="w-4 h-4 text-cyan-400" />
						<span className="text-cyan-400">Top LATAM Engineering Agency</span>
					</motion.div>

					{/* Main Heading */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
					>
						Launch Your MVP in{" "}
						<span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
							Days, Not Months
						</span>
					</motion.h1>

					{/* Subheading */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.8 }}
						className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto"
					>
						Built on Deep Engineering Expertise
					</motion.p>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.8 }}
						className="text-lg text-gray-400 max-w-3xl mx-auto"
					>
						We&apos;re not just another agency. A team led by senior engineering
						talent with a proven track record in building enterprise backend
						systems and cutting-edge AI solutions.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
					>
						<a
							href={CAL_LINKS.ale}
							target="_blank"
							rel="noopener noreferrer"
							className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
						>
							<span>Book a Free Call</span>
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
						</a>
						<a
							href="#pricing"
							className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
						>
							View Pricing
						</a>
					</motion.div>

					{/* Stats */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 0.8 }}
						className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
					>
						<div className="text-center">
							<div className="text-4xl font-bold text-white mb-2">3-14</div>
							<div className="text-gray-400">Days to MVP</div>
						</div>
						<div className="text-center">
							<div className="text-4xl font-bold text-white mb-2">100+</div>
							<div className="text-gray-400">Projects Delivered</div>
						</div>
						<div className="text-center">
							<div className="text-4xl font-bold text-white mb-2">24/7</div>
							<div className="text-gray-400">Support Available</div>
						</div>
						<div className="text-center">
							<div className="text-4xl font-bold text-white mb-2">100%</div>
							<div className="text-gray-400">Client Satisfaction</div>
						</div>
					</motion.div>
				</motion.div>
			</div>

			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />
		</section>
	);
}
