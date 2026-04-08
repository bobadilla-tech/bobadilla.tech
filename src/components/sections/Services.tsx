"use client";

import { motion } from "framer-motion";
import { allServices } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";

export default function Services() {
	return (
		<section className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-16 flex flex-col items-center gap-6">
					<SectionHeader
						overline="Our Services"
						heading={
							<>
								FULL-STACK DEVELOPMENT, AI{" "}
								<span className="text-brand-gold">INTEGRATION</span> AND
								ENTERPRISE SOLUTIONS
							</>
						}
						subtitle="From web apps to mobile, CMS to MVP — we build it all."
					/>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="grid grid-cols-2 md:grid-cols-4 gap-4"
				>
					{allServices.map((service, i) => (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.07, duration: 0.5 }}
						>
							<ServiceCard
								title={service.title}
								href={`/services/${service.slug}`}
								variant="image"
								image={service.image}
								imageAlt={service.imageAlt}
							/>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="text-center mt-12"
				>
					<Button to="/services" variant="outline">
						View All Services
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
