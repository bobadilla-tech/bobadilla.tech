"use client";

import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import Button from "@/shared/ui/Button";
import { CONTACT } from "~/lib/constants";

export default function BookConfirmedPage() {
	return (
		<div className="pt-32 pb-24 min-h-screen">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center justify-center size-16 rounded-full bg-brand-gold/10 border border-border-gold mb-6">
						<CalendarCheck className="size-8 text-brand-gold" />
					</div>
					<h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-primary mb-4">
						You&apos;re booked.
					</h1>
					<p className="font-body text-xl text-brand-primary/60 leading-relaxed">
						This is a technical conversation, not a sales call.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.15 }}
					className="bg-surface border border-border rounded-2xl p-8 mb-8"
				>
					<h2 className="font-heading text-lg font-semibold text-brand-primary mb-6">
						Before the call
					</h2>
					<div className="space-y-5">
						{[
							{
								label: "Know what you want to build or fix",
								body: "Even a rough description is fine. The more specific, the more useful the call will be.",
							},
							{
								label: "Be ready to share context",
								body: "A repo link, architecture diagram, or just a written summary of the problem. Whatever you have.",
							},
							{
								label: "Bring the real problem, not the polished version",
								body: "We're engineers. We can handle the messy truth. It'll make the conversation more useful.",
							},
						].map((item, i) => (
							<div key={item.label} className="flex items-start gap-4">
								<span className="font-heading text-2xl font-bold text-brand-gold/30 shrink-0 w-8">
									0{i + 1}
								</span>
								<div>
									<p className="font-body text-brand-primary font-medium mb-1">
										{item.label}
									</p>
									<p className="font-body text-brand-primary/50 text-sm leading-relaxed">
										{item.body}
									</p>
								</div>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="text-center"
				>
					<p className="font-body text-brand-primary/50 text-sm mb-6">
						Want to send details before the call?{" "}
						<a
							href={`mailto:${CONTACT.email.eliaz}?subject=Pre-call context`}
							className="text-brand-gold hover:text-brand-gold-light transition-colors duration-200"
						>
							{CONTACT.email.eliaz}
						</a>
					</p>
					<Button to="/" variant="ghost" size="sm">
						← Back to home
					</Button>
				</motion.div>
			</div>
		</div>
	);
}
