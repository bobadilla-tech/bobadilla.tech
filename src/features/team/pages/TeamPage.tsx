"use client";

import { motion } from "framer-motion";
import BookCallCTA from "@/shared/ui/BookCallCTA";
import { fadeUp } from "@/shared/ui/animations";

const coreTeam = [
	{
		role: "Founder & Lead Engineer",
		focus: "Backend architecture, AI systems, infrastructure",
		note: "On every project. Sets technical direction and does the work.",
	},
	{
		role: "Senior Full-Stack Engineer",
		focus: "Frontend systems, API design, performance",
		note: "Owns the client layer end-to-end. Strong opinions on UX.",
	},
	{
		role: "Senior Backend Engineer",
		focus: "Databases, integrations, deployment pipelines",
		note: "Deep in the plumbing. Reliable on complex data models and edge cases.",
	},
];

const extendedTeam = [
	{ label: "Mobile", detail: "iOS and Android, native and cross-platform" },
	{ label: "DevOps / Infra", detail: "Cloudflare, AWS, containerization, CI/CD" },
	{ label: "AI / ML", detail: "Model integration, fine-tuning, evaluation pipelines" },
	{ label: "Design", detail: "Product design, design systems, prototyping" },
	{ label: "QA", detail: "Test strategy, automation, load testing" },
	{ label: "Compliance", detail: "Security review, audit prep, HIPAA / SOC2 context" },
];

export default function TeamPage() {
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div {...fadeUp} className="mb-20">
					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						Team
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						A small team.{" "}
						<span className="text-brand-gold">No overhead.</span>
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						Three senior engineers on every project. Specialists brought in when
						the work calls for it. No juniors learning on your budget.
					</p>
				</motion.div>

				{/* Core Team */}
				<motion.section {...fadeUp} className="mb-20">
					<div className="flex items-center gap-3 mb-8">
						<h2 className="font-heading text-2xl font-bold text-brand-primary">
							Core team
						</h2>
						<span className="font-body text-sm text-brand-gold bg-brand-gold/10 border border-border-gold rounded-full px-3 py-1">
							3 engineers
						</span>
					</div>
					<p className="font-body text-brand-primary/60 mb-8 leading-relaxed">
						These three are consistent across every engagement. High ownership,
						direct communication, no hand-offs.
					</p>
					<div className="space-y-4">
						{coreTeam.map((member) => (
							<div
								key={member.role}
								className="bg-surface border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4"
							>
								<div className="flex-1">
									<h3 className="font-heading text-brand-primary font-semibold text-lg mb-1">
										{member.role}
									</h3>
									<p className="font-body text-brand-gold text-sm mb-2">
										{member.focus}
									</p>
									<p className="font-body text-brand-primary/50 text-sm leading-relaxed">
										{member.note}
									</p>
								</div>
							</div>
						))}
					</div>
				</motion.section>

				{/* Extended Network */}
				<motion.section {...fadeUp} className="mb-20">
					<div className="flex items-center gap-3 mb-8">
						<h2 className="font-heading text-2xl font-bold text-brand-primary">
							Extended network
						</h2>
						<span className="font-body text-sm text-brand-primary/60 bg-surface border border-border rounded-full px-3 py-1">
							5–8 collaborators
						</span>
					</div>
					<p className="font-body text-brand-primary/60 mb-8 leading-relaxed">
						Trusted specialists we've worked with across multiple projects. They
						come in when the scope requires their depth — not to pad headcount.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{extendedTeam.map((item) => (
							<div
								key={item.label}
								className="bg-surface border border-border rounded-xl p-5"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-1">
									{item.label}
								</h3>
								<p className="font-body text-brand-primary/50 text-sm">
									{item.detail}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Why this works */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
						Why this structure works
					</h2>
					<div className="space-y-6">
						{[
							{
								heading: "You get the right people, not the available ones",
								body: "Large agencies staff projects with whoever's free. We staff projects with whoever fits. If a specialist isn't right for your work, they're not on it.",
							},
							{
								heading: "No dilution",
								body: "Senior engineers don't delegate to juniors then review at the end. The people you speak to are the people writing the code.",
							},
							{
								heading: "Tight feedback loops",
								body: "Three engineers who know each other's work can move fast and catch problems early. More people usually means slower cycles, not faster ones.",
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
				<BookCallCTA
					heading="Want to meet the team?"
					body="Book a short call. We'll walk through your project and tell you exactly who would be involved."
				/>
			</div>
		</div>
	);
}
