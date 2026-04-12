"use client";

import { useId } from "react";
import { Plus, X } from "lucide-react";

interface FAQItemProps {
	id?: string;
	question: string;
	answer: string;
	isOpen: boolean;
	onToggle: () => void;
}

export default function FAQItem({
	id,
	question,
	answer,
	isOpen,
	onToggle,
}: FAQItemProps) {
	const generatedId = useId();
	const faqId = id ?? generatedId;
	const panelId = `faq-panel-${faqId}`;
	const buttonId = `faq-button-${faqId}`;

	return (
		<div className="border-b border-border">
			<button
				id={buttonId}
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
					aria-labelledby={buttonId}
					className="font-body text-brand-primary/60 pb-6 text-base leading-relaxed"
				>
					{answer}
				</p>
			)}
		</div>
	);
}
