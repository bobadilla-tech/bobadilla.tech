import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { urlFor } from "./image";

export const portableTextComponents: PortableTextComponents = {
	types: {
		code: ({ value }) => (
			<CodeBlock language={value.language}>{value.code}</CodeBlock>
		),
		image: ({ value }) => {
			const src = urlFor(value).width(800).url();
			return (
				<figure className="my-8">
					<div className="rounded-xl overflow-hidden">
						<Image
							src={src}
							alt={value.alt ?? ""}
							width={800}
							height={450}
							className="w-full"
						/>
					</div>
					{value.caption && (
						<figcaption className="text-center text-brand-primary/40 text-sm font-body mt-2">
							{value.caption}
						</figcaption>
					)}
				</figure>
			);
		},
	},
	block: {
		h2: ({ children }) => (
			<h2 className="font-heading text-2xl font-bold text-brand-primary mt-10 mb-4">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="font-heading text-xl font-semibold text-brand-primary mt-8 mb-3">
				{children}
			</h3>
		),
		h4: ({ children }) => (
			<h4 className="font-heading text-lg font-semibold text-brand-primary mt-6 mb-2">
				{children}
			</h4>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-brand-gold pl-5 italic text-brand-primary/60 my-6">
				{children}
			</blockquote>
		),
		normal: ({ children }) => (
			<p className="font-body text-brand-primary/80 leading-relaxed mb-4">
				{children}
			</p>
		),
	},
	marks: {
		code: ({ children }) => (
			<code className="bg-surface border border-border rounded px-1.5 py-0.5 font-mono text-brand-gold text-sm">
				{children}
			</code>
		),
		strong: ({ children }) => (
			<strong className="font-semibold text-brand-primary">{children}</strong>
		),
		em: ({ children }) => <em className="italic">{children}</em>,
		link: ({ value, children }) => (
			<a
				href={value?.href}
				target={value?.blank ? "_blank" : undefined}
				rel={value?.blank ? "noopener noreferrer" : undefined}
				className="text-brand-gold underline underline-offset-2 hover:text-brand-gold-light transition-colors duration-200"
			>
				{children}
			</a>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="font-body text-brand-primary/80 list-disc pl-6 mb-4 space-y-1">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="font-body text-brand-primary/80 list-decimal pl-6 mb-4 space-y-1">
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => (
			<li className="leading-relaxed">{children}</li>
		),
		number: ({ children }) => (
			<li className="leading-relaxed">{children}</li>
		),
	},
};
