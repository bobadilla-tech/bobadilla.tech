"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import FAQItem from "@/components/ui/FAQItem";
import { CAL_LINKS } from "~/lib/constants";

const defaultFaqs = [
	{ q: "How fast can you deliver a project?", a: "Depending on complexity, MVPs can be delivered in 2–4 weeks, full products in 6–12 weeks. We commit to clear timelines upfront." },
	{ q: "What happens if deadlines aren't met?", a: "We guarantee our delivery commitments. If we miss a deadline, we work overtime at no extra cost until it's done." },
	{ q: "Do you work with startups?", a: "Absolutely — we've worked with early-stage startups through to enterprise teams. We adapt our process to your stage and budget." },
	{ q: "Do you offer support after launch?", a: "Yes. We offer ongoing maintenance, monitoring, and growth packages so your product keeps improving after launch." },
];

interface ServiceFAQProps {
	faqs?: { q: string; a: string }[];
}

export default function ServiceFAQ({ faqs = defaultFaqs }: ServiceFAQProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
					{/* Left column */}
					<div className="flex flex-col gap-8">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="font-heading font-bold text-center"
						>
							<span className="bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-primary bg-clip-text text-transparent text-8xl leading-none">
								FAQ
							</span>
						</motion.h2>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="border border-brand-primary/20 rounded-[38px] p-6"
						>
							<p className="font-body text-brand-primary/60 text-sm leading-relaxed mb-6">
								Have questions or want to explore possibilities? Feel free to reach out on LinkedIn or book a call.
							</p>
							<div className="bg-white rounded-[18px] p-3 text-center mb-4">
								<a
									href="https://www.linkedin.com/company/bobadilla-tech/"
									target="_blank"
									rel="noopener noreferrer"
									className="font-body font-medium text-black text-sm"
								>
									CONNECT ON LINKEDIN
								</a>
							</div>
						</motion.div>

						<Button href={CAL_LINKS.ale} variant="gold">
							Book a Call
						</Button>
					</div>

					{/* Right column — accordion */}
					<div className="lg:col-span-2">
						<div className="space-y-0 divide-y divide-brand-primary/10">
							{faqs.map((faq, i) => (
								<FAQItem
									key={faq.q}
									question={faq.q}
									answer={faq.a}
									isOpen={openIndex === i}
									onToggle={() => setOpenIndex(openIndex === i ? null : i)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
