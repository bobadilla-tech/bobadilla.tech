import Link from "next/link";
import type { ReactNode } from "react";

interface ServiceCardProps {
	title: string;
	href: string;
	variant?: "image" | "icon";
	image?: string;
	imageAlt?: string;
	icon?: ReactNode;
	description?: string;
	className?: string;
}

export default function ServiceCard({
	title,
	href,
	variant = "image",
	image,
	imageAlt,
	icon,
	description,
	className = "",
}: ServiceCardProps) {
	if (variant === "image") {
		return (
			<Link
				href={href}
				className={`group relative overflow-hidden rounded-2xl border border-border aspect-[4/3] block ${className}`}
			>
				{image && (
					<img
						src={image}
						alt={imageAlt ?? title}
						className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-5">
					<h3 className="font-heading text-white font-extrabold text-xl leading-tight">
						{title}
					</h3>
				</div>
			</Link>
		);
	}

	return (
		<Link
			href={href}
			className={`group bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 hover:bg-surface-hover hover:border-border-gold transition-colors duration-200 ${className}`}
		>
			{icon && (
				<div className="text-brand-gold size-10 flex items-center justify-center">
					{icon}
				</div>
			)}
			<h3 className="font-heading text-brand-primary font-bold text-lg leading-snug group-hover:text-brand-gold transition-colors duration-200">
				{title}
			</h3>
			{description && (
				<p className="font-body text-brand-primary/50 text-sm">{description}</p>
			)}
		</Link>
	);
}
