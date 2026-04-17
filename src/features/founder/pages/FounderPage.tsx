"use client";

import { motion } from "framer-motion";
import Button from "@/shared/ui/Button";
import SectionHeader from "@/shared/ui/SectionHeader";
import { CAL_LINKS } from "~/lib/constants";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

export default function FounderPage() {
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero */}
				<motion.div {...fadeUp} className="mb-20">
					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						Founder
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						Eliaz Bobadilla
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						Founder and lead engineer at Bobadilla Tech. I build systems that ship
						and hold up — not prototypes dressed as products.
					</p>
				</motion.div>

				{/* Background */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Background
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							I started writing code at 14. Not tutorials — actual projects. That
							early habit of building to understand (instead of reading to
							understand) still defines how I work.
						</p>
						<p>
							Over the past decade I've worked across early-stage startups,
							scale-up teams, and client projects spanning fintech, fitness, developer
							tooling, and infrastructure. Some of those shipped to thousands of
							users. Some got scrapped for the right reasons. All of them taught me
							something concrete.
						</p>
						<p>
							My focus has shifted progressively toward backend architecture, AI
							systems integration, and scalable infrastructure — areas where
							engineering decisions made early compound hard in both directions.
						</p>
					</div>
				</motion.section>

				{/* How he builds */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						How I approach building software
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							I don't start with architecture. I start with the constraint. What's
							the real bottleneck — latency, cost, complexity, time to market? The
							answer changes the design more than any framework choice does.
						</p>
						<p>
							I default toward simple and boring. That means reaching for proven
							tools before new ones, writing code that the next engineer can read
							without context, and treating every abstraction as debt until it proves
							its worth.
						</p>
						<p>
							When AI is part of the stack, I treat it as an integration problem, not
							a research problem. The goal is reliable output, bounded behavior, and
							clear fallback logic — not a demo.
						</p>
					</div>
				</motion.section>

				{/* What to expect */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						What to expect working with me
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{[
							{
								title: "Direct scoping",
								body: "I'll tell you what's achievable, what's not, and where the real unknowns are — before we start.",
							},
							{
								title: "No middlemen",
								body: "You talk to the engineer doing the work. There's no account manager between us.",
							},
							{
								title: "Fast feedback loops",
								body: "I ship early and often. You see real progress, not status updates.",
							},
							{
								title: "Honest tradeoffs",
								body: "If a simpler solution exists, I'll say so. Complexity should be justified, not default.",
							},
						].map((item) => (
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

				{/* CTA */}
				<motion.div
					{...fadeUp}
					className="bg-brand-gold/10 border border-border-gold rounded-2xl p-10 text-center"
				>
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						Want to talk through a project?
					</h2>
					<p className="font-body text-brand-primary/60 mb-8 max-w-lg mx-auto">
						15 minutes. No pitch. Just an honest conversation about what you're
						building and whether we're a fit.
					</p>
					<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
						Book a call
					</Button>
				</motion.div>
			</div>
		</div>
	);
}
