"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Button from "@/shared/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

const included = [
	"Review of your codebase, backend architecture, and infrastructure setup",
	"Identification of bottlenecks, fragile points, and scaling risks",
	"Performance and reliability analysis",
	"AI integration opportunities (if relevant to your system)",
	"Clear, step-by-step execution plan with priorities",
];

const deliverables = [
	{
		title: "Structured technical report",
		body: "Not a checklist. A written analysis of what we found, why it matters, and what to do about it.",
	},
	{
		title: "Prioritized action plan",
		body: "What to fix first, what to fix next, and what can wait. Ranked by impact and effort.",
	},
	{
		title: "Optional walkthrough call",
		body: "A follow-up call to walk through the findings, answer questions, and discuss next steps.",
	},
];

const whoThisIsFor = [
	"Your system is getting slow or breaking under load",
	"You're planning to scale and don't want surprises when you do",
	"You've worked with developers but want a second opinion before investing more",
	"You want clarity and a concrete direction before committing to more work",
];

export default function SystemAuditPage() {
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero */}
				<motion.div {...fadeUp} className="mb-20">
					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						Service
					</span>
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-4 mb-6">
						<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight">
							System Audit &{" "}
							<span className="text-brand-gold">Execution Plan</span>
						</h1>
						<div className="shrink-0 sm:mt-2">
							<span className="font-body text-brand-gold font-semibold bg-brand-gold/10 border border-border-gold rounded-full px-5 py-2 text-sm whitespace-nowrap">
								$1,000–$2,000
							</span>
						</div>
					</div>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						If your system feels slow, fragile, or unclear to scale — this is
						where we start. We don't jump into long contracts or vague estimates.
						First, we understand exactly what's going on and give you a clear path
						forward.
					</p>
				</motion.div>

				{/* What's Included */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						What this includes
					</h2>
					<div className="space-y-4">
						{included.map((item) => (
							<div key={item} className="flex items-start gap-4">
								<CheckCircle className="size-5 text-brand-gold shrink-0 mt-0.5" />
								<p className="font-body text-brand-primary/70 leading-relaxed">
									{item}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* What You Get */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						What you get
					</h2>
					<div className="space-y-4">
						{deliverables.map((item) => (
							<div
								key={item.title}
								className="bg-surface border border-border rounded-2xl p-6"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{item.title}
								</h3>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{item.body}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Who This Is For */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						Who this is for
					</h2>
					<div className="space-y-4">
						{whoThisIsFor.map((item) => (
							<div key={item} className="flex items-start gap-4">
								<CheckCircle className="size-5 text-brand-gold shrink-0 mt-0.5" />
								<p className="font-body text-brand-primary/70 leading-relaxed">
									{item}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Why Start Here */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						Why start here
					</h2>
					<div className="space-y-5">
						{[
							{
								heading: "Most projects fail because the foundation is unclear",
								body: "An audit removes guesswork before you build more on top of a shaky base. You get a concrete direction — whether you continue with us or take the plan elsewhere.",
							},
							{
								heading: "You keep the report regardless",
								body: "This isn't a pitch in disguise. The deliverable is a real technical document you own. Use it to guide internal work, bring in other contractors, or inform your own roadmap.",
							},
							{
								heading: "Pricing depends on system complexity",
								body: "A simple backend API is not the same scope as a distributed microservices architecture. We quote after a brief conversation so you know what to expect.",
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

				{/* CTA */}
				<motion.div
					{...fadeUp}
					className="bg-brand-gold/10 border border-border-gold rounded-2xl p-10 text-center"
				>
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						Next step
					</h2>
					<p className="font-body text-brand-primary/60 mb-2 max-w-md mx-auto">
						Book a short call to discuss your system. We'll tell you whether this
						audit is the right starting point — and what it would cost.
					</p>
					<p className="font-body text-brand-primary/40 text-sm mb-8">
						Or reach out with details and we'll respond directly.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
							Book a Call to Discuss
						</Button>
						<Button
							href={`mailto:eliaz@bobadilla.tech?subject=System Audit Inquiry`}
							variant="outline"
							size="md"
						>
							Send details by email
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
