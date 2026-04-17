"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Button from "@/shared/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

const whoThisIsFor = [
	"You have an MVP idea and need it production-ready — not a prototype",
	"Your backend is breaking under real load",
	"You want AI integrated into your product — not a demo, a real system",
	"You've worked with dev shops and got slow delivery and junior code",
	"You need a second opinion on a system before you scale it",
	"You're technical enough to know when the work is good",
];

const services = [
	{
		title: "MVP Development",
		description:
			"Full-stack or backend-focused. From schema design to deployed API. We scope it tight, build it right, and ship it in weeks — not months.",
		outcome: "A working system in production",
	},
	{
		title: "AI Systems & Automation",
		description:
			"LLM pipelines, RAG, agents, embeddings, fine-tuning. Real integrations into your product — not a wrapper around an API call.",
		outcome: "AI that actually does something useful",
	},
	{
		title: "Backend & Infrastructure",
		description:
			"APIs, databases, queues, cloud infra. Built to scale under real load — not just to pass a demo. Includes architecture decisions, not just code.",
		outcome: "A backend that doesn't break when it matters",
	},
	{
		title: "System Optimization",
		description:
			"Identify bottlenecks, reduce latency, fix what's fragile before it breaks in production. Includes a written report and prioritized action plan.",
		outcome: "Clarity on what to fix and how",
	},
];

const steps = [
	{
		number: "01",
		title: "Understand",
		body: "Short call or written brief. We ask direct questions about what you need, what you've tried, and what actually matters.",
	},
	{
		number: "02",
		title: "Scope",
		body: "We define exactly what gets built and for how much. Fixed price, written down. No surprises after.",
	},
	{
		number: "03",
		title: "Build",
		body: "Senior engineers write the code. You get updates as work progresses. No handoffs to junior devs.",
	},
	{
		number: "04",
		title: "Ship & Iterate",
		body: "We deliver. You review. We adjust. We don't disappear after the first delivery.",
	},
];

const whyUs = [
	"3 core senior engineers — not a staffing firm or an outsourcing operation",
	"We've shipped and maintain internal products (Requiems API, CompileStrength) — real systems we own",
	"Small team means direct accountability — you know who built what and why",
	"No outsourcing, no junior devs handed senior work, no layer of project managers in between",
];

export default function HirePage() {
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero */}
				<motion.div {...fadeUp} className="mb-24">
					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						Bobadilla Tech
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						Production systems, built by{" "}
						<span className="text-brand-gold">the engineers writing the code.</span>
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl mb-10">
						For technical founders and teams who need backend systems, AI
						integrations, or scalable infrastructure — done by senior engineers,
						not delegated down.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
							Get a Technical Assessment
						</Button>
						<Button to="/start-small" variant="outline" size="md">
							Or start with a small project{" "}
							<ArrowRight className="ml-2 size-4 inline" />
						</Button>
					</div>
				</motion.div>

				{/* Who This Is For */}
				<motion.section {...fadeUp} className="mb-24">
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

				{/* What We Do */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						What we do
					</h2>
					<p className="font-body text-brand-primary/50 mb-8 leading-relaxed">
						Focused work in the areas we're actually good at.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{services.map((service) => (
							<div
								key={service.title}
								className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3"
							>
								<h3 className="font-heading text-brand-primary font-semibold text-lg">
									{service.title}
								</h3>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed flex-1">
									{service.description}
								</p>
								<p className="font-body text-brand-gold text-sm font-medium">
									→ {service.outcome}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* How We Work */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						How we work
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
						{steps.map((step) => (
							<div
								key={step.number}
								className="bg-surface border border-border rounded-2xl p-6"
							>
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
					<div className="border-l-2 border-brand-gold/40 pl-6">
						<p className="font-body text-brand-primary/70 leading-relaxed">
							You talk directly to the engineers building your system. No project
							managers, no account managers, no one repeating what you just said
							in a different meeting.
						</p>
					</div>
				</motion.section>

				{/* Why Us */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						Why us
					</h2>
					<div className="space-y-5">
						{whyUs.map((item) => (
							<div key={item} className="border-l-2 border-brand-gold/40 pl-6">
								<p className="font-body text-brand-primary/70 leading-relaxed">
									{item}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Start Small */}
				<motion.section {...fadeUp} className="mb-24">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						Not ready to commit to a full project?
					</h2>
					<p className="font-body text-brand-primary/60 leading-relaxed mb-8">
						The best way to see how we work is to do a small piece of real work
						together. Fixed scope, fixed price, no long-term commitment.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="bg-surface border border-border rounded-2xl p-6">
							<h3 className="font-heading text-brand-primary font-semibold mb-2">
								Start Small
							</h3>
							<p className="font-body text-brand-primary/60 text-sm leading-relaxed mb-4">
								A feature build, an API endpoint, or a scoped piece of work.
								Fixed price, delivered in 1–2 weeks.
							</p>
							<span className="font-body text-brand-gold text-sm font-semibold">
								$400–$1,000
							</span>
							<div className="mt-4">
								<Button to="/start-small" variant="outline" size="sm">
									See examples
								</Button>
							</div>
						</div>
						<div className="bg-surface border border-border rounded-2xl p-6">
							<h3 className="font-heading text-brand-primary font-semibold mb-2">
								System Audit
							</h3>
							<p className="font-body text-brand-primary/60 text-sm leading-relaxed mb-4">
								Review of your codebase, backend, and infrastructure. Written
								report with specific recommendations and a prioritized action
								plan.
							</p>
							<span className="font-body text-brand-gold text-sm font-semibold">
								$1,000–$2,000
							</span>
							<div className="mt-4">
								<Button to="/system-audit" variant="outline" size="sm">
									Learn more
								</Button>
							</div>
						</div>
					</div>
				</motion.section>

				{/* Final CTA */}
				<motion.div
					{...fadeUp}
					className="bg-brand-gold/10 border border-border-gold rounded-2xl p-10 text-center"
				>
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						Ready to talk?
					</h2>
					<p className="font-body text-brand-primary/60 mb-2 max-w-md mx-auto">
						Book a short technical call. We'll understand your problem and tell
						you honestly whether we're the right fit.
					</p>
					<p className="font-body text-brand-primary/40 text-sm mb-8">
						No sales pitch. No pressure. Just a direct conversation.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
							Book a Technical Call
						</Button>
						<Button to="/start-small" variant="outline" size="md">
							Start with a small project
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
