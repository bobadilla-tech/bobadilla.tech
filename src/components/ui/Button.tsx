import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
	variant?: "gold" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	href?: string;
	to?: string;
	target?: "_blank";
	rel?: string;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	children: ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
}

const sizeClasses = {
	sm: "px-5 py-2.5 text-sm",
	md: "px-7 py-3.5 text-base",
	lg: "px-9 py-4 text-lg",
};

const variantClasses = {
	gold: "bg-brand-gold text-black font-semibold hover:bg-brand-gold-light active:bg-brand-gold-dark shadow-sm",
	outline:
		"border border-border-gold text-brand-primary hover:border-brand-gold hover:text-brand-gold bg-transparent",
	ghost:
		"bg-surface border border-border text-brand-primary hover:bg-surface-hover",
};

export default function Button({
	variant = "gold",
	size = "md",
	href,
	to,
	target,
	rel,
	disabled,
	loading,
	className = "",
	children,
	onClick,
	type = "button",
}: ButtonProps) {
	const base =
		"inline-flex items-center justify-center gap-2 rounded-xl font-body transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
	const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

	const content = loading ? (
		<>
			<span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
			{children}
		</>
	) : (
		children
	);

	if (href) {
		return (
			<a
				href={href}
				target={target ?? "_blank"}
				rel={rel ?? "noopener noreferrer"}
				aria-disabled={disabled || loading}
				aria-busy={loading}
				onClick={(e) => {
					if (disabled || loading) e.preventDefault();
				}}
				className={`${classes}${disabled || loading ? " opacity-50 cursor-not-allowed" : ""}`}
			>
				{content}
			</a>
		);
	}

	if (to) {
		return (
			<Link href={to} className={classes}>
				{content}
			</Link>
		);
	}

	return (
		<button
			type={type}
			disabled={disabled || loading}
			onClick={onClick}
			className={classes}
		>
			{content}
		</button>
	);
}
