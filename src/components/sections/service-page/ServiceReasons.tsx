"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";

const AUTOPLAY_MS = 3000;
const FEATURED_INDEX = 2;

interface CardProps {
	title: string;
	body?: string;
	featured?: boolean;
	active: boolean;
	index: number;
}

function Card({ title, body, featured, active, index }: CardProps) {
	return (
		<div
			className={`bg-white rounded-[48px] w-full h-89.5 relative overflow-hidden transition-all duration-500 flex flex-col ${
				active ? "scale-100 opacity-100" : "scale-[0.88] opacity-40"
			}`}
			style={
				active
					? { boxShadow: "inset 0 0 0 2px #e6be1a, 0 24px 64px rgba(230,190,26,0.22)" }
					: undefined
			}
		>
			{/* Top section: icon + number */}
			<div className="flex items-start justify-between px-8 pt-8">
				<div className={`relative ${featured ? "w-24 h-24" : "w-20 h-20"}`}>
					<Image
						src={
							featured
								? "/assets/services/shared/ellipse-circle.svg"
								: "/assets/services/shared/ellipse-gold.svg"
						}
						alt=""
						fill
						className="object-contain"
						unoptimized
					/>
					<Image
						src={
							featured
								? "/assets/services/shared/computer-lg.svg"
								: "/assets/services/shared/computer.svg"
						}
						alt=""
						width={featured ? 56 : 48}
						height={featured ? 56 : 48}
						className="absolute inset-0 m-auto object-contain"
						unoptimized
					/>
				</div>

				{featured ? (
					<Image
						src="/assets/services/shared/ellipse-dot.svg"
						alt=""
						width={36}
						height={36}
						unoptimized
					/>
				) : (
					<span className="font-heading text-sm font-semibold text-black/20 tracking-widest mt-1">
						{String(index).padStart(2, "0")}
					</span>
				)}
			</div>

			{/* Bottom section: text */}
			<div className="mt-auto px-8 pb-8">
				{featured && (
					<div className="w-8 h-0.5 bg-brand-gold mb-4 rounded-full" />
				)}
				<h3
					className={`font-heading text-black font-semibold tracking-tight leading-tight whitespace-pre-line ${
						featured ? "text-3xl" : "text-2xl"
					}`}
				>
					{title}
				</h3>
				{body && (
					<p className="font-body text-black/50 font-light text-sm leading-relaxed mt-2 whitespace-pre-line">
						{body}
					</p>
				)}
			</div>

			{/* Featured: gold bottom accent */}
			{featured && active && (
				<div className="absolute bottom-0 left-8 right-8 h-0.5 bg-linear-to-r from-transparent via-brand-gold to-transparent rounded-full" />
			)}
		</div>
	);
}

export default function ServiceReasons() {
	const t = useTranslations("ServiceReasons");
	const [api, setApi] = useState<CarouselApi>();
	const [selectedIndex, setSelectedIndex] = useState(FEATURED_INDEX);

	const reasons = [
		t("reasons.0"),
		t("reasons.1"),
		t("reasons.2"),
		t("reasons.3"),
		t("reasons.4"),
	];

	// order: reason[0], reason[1], featured, reason[2], reason[3], reason[4]
	const items = [
		...reasons.slice(0, 2).map((title) => ({ featured: false, title, body: undefined })),
		{ featured: true, title: t("featuredTitle"), body: t("featuredBody") },
		...reasons.slice(2).map((title) => ({ featured: false, title, body: undefined })),
	];

	useEffect(() => {
		if (!api) return;

		api.scrollTo(FEATURED_INDEX, false);

		const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
		api.on("select", onSelect);

		const timer = setInterval(() => api.scrollNext(), AUTOPLAY_MS);

		return () => {
			api.off("select", onSelect);
			clearInterval(timer);
		};
	}, [api]);

	return (
		<section className="py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="font-heading font-bold text-5xl sm:text-6xl text-center mb-4 tracking-tight"
				>
					<span className="text-brand-primary">{t("heading1")}</span>
					<br />
					<span className="text-brand-gold">{t("heading2")}</span>
				</motion.h2>
			</div>

			<div className="mt-16 px-6 sm:px-10 lg:px-16">
				<Carousel opts={{ align: "center", loop: true }} setApi={setApi}>
					{/*
					 * viewportClassName="overflow-visible" lets scale(1) active card
					 * render above shrunken neighbours without getting clipped.
					 * The section's own overflow-hidden clips everything at the page edge.
					 */}
					<CarouselContent
						viewportClassName="overflow-visible py-6"
						className="-ml-4"
					>
						{items.map((item, i) => (
							<CarouselItem
								key={item.featured ? "featured" : item.title}
								className="pl-4 basis-[78%] sm:basis-[52%] lg:basis-[36%]"
							>
								<Card
									title={item.title}
									body={item.body}
									featured={item.featured}
									active={selectedIndex === i}
									index={i + 1}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
}
