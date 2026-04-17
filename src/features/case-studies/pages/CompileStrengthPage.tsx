"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/shared/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

const stack = [
	{ layer: "Frontend", items: "Next.js 16 App Router, React 19, Tailwind CSS v4" },
	{ layer: "Backend / Runtime", items: "Cloudflare Workers via OpenNext.js — edge-deployed, zero cold starts" },
	{ layer: "Database", items: "Neon PostgreSQL (serverless) + Drizzle ORM with HTTP driver" },
	{ layer: "Auth", items: "Better Auth with Drizzle adapter (Cloudflare-compatible session handling)" },
	{ layer: "Billing", items: "LemonSqueezy — subscriptions, webhooks, usage metering" },
	{ layer: "AI", items: "Mastra agent framework + Google Gemini (workout compiler agent)" },
	{ layer: "State", items: "Zustand for client-side global state" },
	{ layer: "Validation", items: "Zod throughout — API boundaries and form inputs" },
	{ layer: "Tooling", items: "Bun, Biome, TypeScript strict mode" },
];

const takeaways = [
	{
		heading: "Edge-first from day one",
		body: "Running on Cloudflare Workers means no cold starts and global distribution without infrastructure management. The tradeoff is a constrained runtime — no Node.js APIs, limited native modules. We scoped the stack around that constraint, not against it.",
	},
	{
		heading: "AI as a feature, not a proof of concept",
		body: "The Mastra agent doesn't just call a model — it follows a structured workflow, validates outputs, and falls back gracefully when generation fails. Users don't see the model; they see a workout program.",
	},
	{
		heading: "Billing integrated from the start",
		body: "LemonSqueezy webhook handling was part of the initial build, not retrofitted. Subscription state flows into the UI and the AI agent's usage limits from the same source of truth.",
	},
];

export default function CompileStrengthPage() {
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<motion.div {...fadeUp} className="mb-12">
					<div className="flex items-center gap-2 font-body text-sm text-brand-primary/40 mb-8">
						<Link href="/case-studies" className="hover:text-brand-gold transition-colors">
							Case Studies
						</Link>
						<span>/</span>
						<span className="text-brand-primary/60">CompileStrength</span>
					</div>

					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						Case Study
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						CompileStrength
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						An AI-powered fitness SaaS. Users chat with an agent that generates
						personalized, science-based workout programs — and tracks sessions over
						time as training adapts.
					</p>
				</motion.div>

				{/* Overview */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Overview
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							CompileStrength is a subscription SaaS product for serious lifters who
							want programming grounded in training science, not generic templates.
							The core product is an AI agent that asks about training history,
							goals, and constraints — then generates a full periodized program.
						</p>
						<p>
							Beyond generation, users track sessions, log progress, and watch their
							program adapt over time. The product includes a public calculator suite
							for acquisition and a subscription billing layer for monetization.
						</p>
					</div>
				</motion.section>

				{/* Problem */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Problem
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							Fitness apps either give you rigid templates or put you in front of a
							generic chatbot. Neither produces a coherent, periodized program. The
							people who actually know programming — coaches — don't scale. The
							people who want good programming — intermediate and advanced lifters —
							don't have access to them.
						</p>
						<p>
							The technical challenge was building an AI agent that produces
							structured, valid workout programs rather than conversational text.
							Output needed to be machine-readable, consistent, and safe to display
							— not just coherent prose.
						</p>
					</div>
				</motion.section>

				{/* Solution */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Solution
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							We built the AI layer on Mastra — an agent framework that lets you
							define workflows with structured input/output schemas, not just
							free-form prompts. The workout compiler agent follows a fixed workflow:
							gather context, validate constraints, generate program blocks, validate
							output structure, return to the user.
						</p>
						<p>
							Billing (LemonSqueezy) and auth (Better Auth) were integrated as first-class
							concerns from the start. The agent's generation limits are gated by
							subscription tier, and session tracking is tied to the user's program
							history — not a separate data model.
						</p>
					</div>
				</motion.section>

				{/* Technical Approach */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Technical approach
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							The entire backend runs on Cloudflare Workers via OpenNext.js. This
							means no traditional server, no cold starts, and global edge
							distribution — but it also means a constrained runtime. The Node.js
							API surface available on Workers is limited, which ruled out several
							common libraries.
						</p>
						<p>
							Neon PostgreSQL with Drizzle ORM was chosen specifically for its
							HTTP-based driver, which works inside the Workers runtime where
							standard TCP database connections don't. Drizzle handles schema,
							migrations, and queries — all with full TypeScript inference.
						</p>
						<p>
							State management (Zustand) is limited to client-side concerns:
							active workout session UI, animation state, user preferences. No
							server state is duplicated client-side.
						</p>
					</div>
				</motion.section>

				{/* Stack */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						Stack
					</h2>
					<div className="space-y-3">
						{stack.map((item) => (
							<div
								key={item.layer}
								className="bg-surface border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-3"
							>
								<span className="font-body text-brand-gold text-sm font-semibold shrink-0 w-40">
									{item.layer}
								</span>
								<span className="font-body text-brand-primary/70 text-sm leading-relaxed">
									{item.items}
								</span>
							</div>
						))}
					</div>
				</motion.section>

				{/* Results */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Results
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
						{[
							{ stat: "End-to-end SaaS", label: "Fully subscription-ready — billing, auth, AI, and edge deploy all integrated" },
							{ stat: "Zero cold starts", label: "Cloudflare Workers edge runtime, globally distributed from launch" },
							{ stat: "Structured AI output", label: "Agent generates valid, machine-readable programs — not conversational text" },
						].map((item) => (
							<div
								key={item.stat}
								className="bg-brand-gold/10 border border-border-gold rounded-2xl p-6"
							>
								<p className="font-heading text-brand-primary font-bold text-lg mb-2">
									{item.stat}
								</p>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{item.label}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Key Takeaways */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						Key takeaways
					</h2>
					<div className="space-y-6">
						{takeaways.map((item) => (
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
						Building something similar?
					</h2>
					<p className="font-body text-brand-primary/60 mb-8 max-w-md mx-auto">
						AI products, SaaS subscriptions, edge-deployed systems — let's talk
						about your project.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
							Book a call
						</Button>
						<Button to="/case-studies" variant="ghost" size="md">
							See all case studies
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
