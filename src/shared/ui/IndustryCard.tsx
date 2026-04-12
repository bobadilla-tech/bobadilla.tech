import Link from "next/link";
import Image from "next/image";

interface IndustryCardProps {
	title: string;
	image: string;
	alt: string;
	href: string;
	description?: string;
}

export default function IndustryCard({
	title,
	image,
	alt,
	href,
	description,
}: IndustryCardProps) {
	return (
		<Link
			href={href}
			className="group relative overflow-hidden rounded-t-3xl block h-[420px] focus:outline-none"
		>
			<Image
				src={image}
				alt={alt}
				fill
				className="object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
			<div className="absolute top-0 left-0 right-0 bg-white h-24 flex items-center justify-center">
				<span className="font-heading text-4xl font-semibold text-brand-gold text-center">
					{title}
				</span>
			</div>
			{description && (
				<div className="absolute bottom-0 left-0 right-0 p-5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 sm:group-focus-within:opacity-100 transition-opacity duration-300">
					<p className="font-body text-white text-sm">{description}</p>
				</div>
			)}
		</Link>
	);
}
