import type { ReactNode } from "react";

interface StatCardProps {
	title: string;
	subtitle: string;
	icon?: ReactNode;
	className?: string;
}

export default function StatCard({ title, subtitle, icon, className = "" }: StatCardProps) {
	return (
		<div
			className={`bg-white text-black rounded-2xl p-8 flex flex-col items-center justify-center gap-3 shadow-sm ${className}`}
		>
			{icon && <div className="text-black/60 mb-1">{icon}</div>}
			<span className="font-heading text-4xl font-bold tracking-tight">{title}</span>
			<span className="font-body text-sm text-black/60 text-center">{subtitle}</span>
		</div>
	);
}
