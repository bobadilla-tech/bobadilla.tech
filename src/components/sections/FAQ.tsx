"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "@/components/ui/FAQItem";
import Button from "@/components/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

const faqs = [
	{
		question: "How fast can you deliver a project?",
		answer:
			"Depending on the scope, we can deliver an MVP in as little as 3–14 days. For larger projects, we work in tight 2-week sprints and keep you updated every step of the way with clear milestones.",
	},
	{
		question: "What happens if deadlines aren't met?",
		answer:
			"We take delivery commitments seriously. If a deadline is at risk, we flag it early and work overtime at no extra cost to meet it. Transparent communication is core to how we operate.",
	},
	{
		question: "Do you work with startups?",
		answer:
			"Absolutely — startups are our sweet spot. We understand the pace and constraints of early-stage companies and can adapt to your runway, whether that means a lean MVP or a full product build.",
	},
	{
		question: "Do you offer support after launch?",
		answer:
			"Yes. All of our engagements include 6 months of post-launch support. We're here to fix bugs, monitor performance, and iterate with you as your product grows.",
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
					{/* Left: FAQ label + CTA */}
					<motion.div
						initial={{ opacity: 0, x: -24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="flex flex-col justify-between gap-8"
					>
						<div className="flex flex-col gap-4">
							<span className="font-heading text-8xl font-bold text-brand-primary leading-none">
								FAQ
							</span>
							<p className="font-body text-brand-primary/50 text-base">
								Have questions or want to explore possibilities? Feel free to reach out or book a call.
							</p>
						</div>
						<Button href={CAL_LINKS.ale} variant="gold" size="md" className="w-fit">
							Book a Call
						</Button>
					</motion.div>

					{/* Right: Questions */}
					<motion.div
						initial={{ opacity: 0, x: 24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="lg:col-span-2"
					>
						{faqs.map((faq, i) => (
							<FAQItem
								key={faq.question}
								question={faq.question}
								answer={faq.answer}
								isOpen={openIndex === i}
								onToggle={() => setOpenIndex(openIndex === i ? null : i)}
							/>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
