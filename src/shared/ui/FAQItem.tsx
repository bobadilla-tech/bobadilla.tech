"use client";

import { Plus, X } from "lucide-react";

interface FAQItemProps {
	question: string;
	answer: string;
	isOpen: boolean;
	onToggle: () => void;
}

export default function FAQItem({
	question,
	answer,
	isOpen,
	onToggle,
}: FAQItemProps) {
	const panelId = `faq-panel-${question.replace(/\s+/g, "-").toLowerCase().slice(0, 40)}`;

	return (
		<div className="border-b border-border">
			<button
				type="button"
				onClick={onToggle}
				aria-expanded={isOpen}
				aria-controls={panelId}
				className="w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer"
			>
				<span className="font-body text-brand-primary text-lg font-light">
					{question}
				</span>
				<span className="shrink-0 text-brand-gold">
					{isOpen ? <X className="size-5" /> : <Plus className="size-5" />}
				</span>
			</button>
			{isOpen && (
				<p
					id={panelId}
					role="region"
					className="font-body text-brand-primary/60 pb-6 text-base leading-relaxed"
				>
					{answer}
				</p>
			)}
		</div>
	);
}
