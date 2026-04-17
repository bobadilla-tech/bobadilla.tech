"use client";

import { motion } from "framer-motion";
import Button from "@/shared/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

const exampleProjects = [
	{
		title: "Feature build",
		description:
			"A scoped, production-ready feature added to your existing codebase. Authentication flow, payment integration, notification system, dashboard widget — something real, something shipped.",
		price: "$500–$800",
	},
	{
		title: "API endpoint",
		description:
			"A single API endpoint or small group of endpoints, fully implemented — validation, error handling, tests, documented. Not a scaffold. A finished piece of backend.",
		price: "$400–$700",
	},
	{
		title: "System audit",
		description:
			"A technical review of your architecture, codebase, or infrastructure. We'll identify the real risks and bottlenecks, not a checklist. You get a written report and a follow-up call.",
		price: "$600–$1,000",
	},
];

const steps = [
	{
		number: "01",
		title: "Brief",
		body: "Tell us what you need. A short conversation or a written brief — either works.",
	},
	{
		number: "02",
		title: "Quote",
		body: "We scope it, price it, and send you a fixed quote. No surprises after.",
	},
	{
		number: "03",
		title: "Deliver",
		body: "We build it. You review it. We ship it. Typically 1–2 weeks.",
	},
];

export default function StartSmallPage() {
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero */}
				<motion.div {...fadeUp} className="mb-20">
					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						Start Small
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						Work together{" "}
						<span className="text-brand-gold">before committing big.</span>
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						The best way to know if we're a fit is to do a small piece of real work
						together. A focused project — fixed scope, fixed price — so you can see
						how we think and what we ship before deciding anything larger.
					</p>
				</motion.div>

				{/* Why start small */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						Why starting small works
					</h2>
					<div className="space-y-6">
						{[
							{
								heading: "You see the actual quality",
								body: "A small deliverable tells you more than any sales call. You see how we scope work, how we communicate, and what the code looks like — before any long-term commitment.",
							},
							{
								heading: "The risk is low",
								body: "Fixed scope, fixed price. If the output isn't what you expected, you're not locked in. Most clients who start small come back for more, but that's your call to make.",
							},
							{
								heading: "We learn your codebase",
								body: "Even a small project gives us real context on your stack, your constraints, and how your team works. That pays off immediately if we continue.",
							},
						].map((item) => (
							<div
								key={item.heading}
								className="border-l-2 border-brand-gold/40 pl-6"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{item.heading}
								</h3>
								<p className="font-body text-brand-primary/60 leading-relaxed text-sm">
									{item.body}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Example projects */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						Example starter projects
					</h2>
					<p className="font-body text-brand-primary/50 mb-8 leading-relaxed">
						These are illustrative — we'll scope your specific work before quoting.
					</p>
					<div className="space-y-4">
						{exampleProjects.map((project) => (
							<div
								key={project.title}
								className="bg-surface border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-6"
							>
								<div className="flex-1">
									<h3 className="font-heading text-brand-primary font-semibold text-lg mb-2">
										{project.title}
									</h3>
									<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
										{project.description}
									</p>
								</div>
								<div className="shrink-0">
									<span className="font-body text-brand-gold font-semibold text-sm bg-brand-gold/10 border border-border-gold rounded-full px-4 py-2 whitespace-nowrap">
										{project.price}
									</span>
								</div>
							</div>
						))}
					</div>
				</motion.section>

				{/* How it works */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						How it works
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
						{steps.map((step) => (
							<div key={step.number} className="bg-surface border border-border rounded-2xl p-6">
								<span className="font-heading text-4xl font-bold text-brand-gold/30 block mb-3">
									{step.number}
								</span>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{step.title}
								</h3>
								<p className="font-body text-brand-primary/50 text-sm leading-relaxed">
									{step.body}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* CTA */}
				<motion.div
					{...fadeUp}
					className="bg-brand-gold/10 border border-border-gold rounded-2xl p-10 text-center"
				>
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						Ready to start?
					</h2>
					<p className="font-body text-brand-primary/60 mb-2 max-w-md mx-auto">
						Tell us what you need. We'll scope it and send you a fixed quote within
						24 hours.
					</p>
					<p className="font-body text-brand-primary/40 text-sm mb-8">
						No retainer. No minimum. Just the work.
					</p>
					<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
						Book a 15-min call
					</Button>
				</motion.div>
			</div>
		</div>
	);
}
