"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Heart, PawPrint } from "lucide-react";

import Button from "@/shared/ui/Button";
import FAQItem from "@/shared/ui/FAQItem";
import { fadeUp } from "@/shared/ui/animations";
import { CAL_LINKS } from "~/shared/lib/constants";

const WHATSAPP_NUMBER = "51902482231";

const PINK_THEME_VARS: Record<string, string> = {
	"--color-brand-gold": "#ec4899",
	"--color-brand-gold-light": "#fbcfe8",
	"--color-brand-gold-dark": "#db2777",
	"--color-brand-primary": "#831843",
	"--color-brand-bg": "#fdf2f8",
	"--color-brand-bg-alt": "#fff",
	"--color-surface": "#fff",
	"--color-surface-hover": "#fce7f3",
	"--color-border": "#f9a8d4",
	"--color-border-gold": "rgba(236,72,153,0.4)",
};

interface GalleryImage {
	src: string;
	alt: string;
}

interface ExampleItem {
	title: string;
	url: string;
	image: string;
	description: string;
}

interface Tier {
	name: string;
	price: string;
	badge: string | null;
	features: string[];
}

interface FaqEntry {
	q: string;
	a: string;
}

export default function NalaCausePage() {
	const t = useTranslations("NalaCausePage");
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

	const galleryImages = t.raw("gallery.images") as GalleryImage[];
	const exampleItems = t.raw("examples.items") as ExampleItem[];
	const tiers = t.raw("tiers.items") as Tier[];
	const faqItems = t.raw("faq.items") as FaqEntry[];

	const genericWhatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("whatsapp.genericMessage"))}`;

	useEffect(() => {
		const root = document.documentElement;

		for (const [key, value] of Object.entries(PINK_THEME_VARS)) {
			root.style.setProperty(key, value);
		}
		root.style.backgroundColor = PINK_THEME_VARS["--color-brand-bg"];

		// Switch navbar logo to dark version for light background
		const navbarLogo = document.querySelector<HTMLImageElement>(
			'nav img[alt="Boba Tech"]'
		);
		if (navbarLogo) navbarLogo.src = "/assets/logo-dark.png";

		return () => {
			for (const key of Object.keys(PINK_THEME_VARS)) {
				root.style.removeProperty(key);
			}
			root.style.backgroundColor = "";

			const oldLogo = document.querySelector<HTMLImageElement>(
				'nav img[alt="Boba Tech"]'
			);
			if (oldLogo) oldLogo.src = "/assets/logo.png";
		};
	}, []);

	return (
		<div className="bg-pink-50 min-h-screen">
			<div className="pt-32 pb-24">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* ──── Hero ──── */}
					<motion.div
						{...fadeUp}
						className="mb-20 text-center max-w-3xl mx-auto"
					>
						<span
							className="font-body text-sm font-semibold tracking-widest uppercase"
							style={{ color: "#ec4899" }}
						>
							{t("hero.overline")}
						</span>
						<h1
							className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-4 mb-6"
							style={{ color: "#831843" }}
						>
							{t("hero.heading")}{" "}
							<span style={{ color: "#ec4899" }}>{t("hero.headingGold")}</span>
						</h1>
						<p
							className="font-body text-lg leading-relaxed"
							style={{ color: "#831843bf" }}
						>
							{t("hero.intro")}
						</p>
					</motion.div>

					{/* ──── Photo Gallery ──── */}
					<motion.section {...fadeUp} className="mb-20">
						<h2
							className="font-heading text-3xl md:text-4xl font-bold text-center mb-4"
							style={{ color: "#831843" }}
						>
							{t("gallery.heading")}
						</h2>
						<p
							className="font-body text-center max-w-2xl mx-auto mb-10 leading-relaxed"
							style={{ color: "#83184399" }}
						>
							{t("gallery.subtitle")}
						</p>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto">
							{galleryImages.map((photo, i) => (
								<div
									key={photo.src}
									className={`relative aspect-square rounded-xl overflow-hidden border bg-white shadow-sm ${
										i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
									}`}
									style={{ borderColor: "#f9a8d4" }}
								>
									<img
										src={encodeURI(photo.src)}
										alt={photo.alt}
										className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
									/>
								</div>
							))}
						</div>
					</motion.section>

					{/* ──── Example Portfolios ──── */}
					<motion.section {...fadeUp} className="mb-20">
						<h2
							className="font-heading text-3xl md:text-4xl font-bold text-center mb-4"
							style={{ color: "#831843" }}
						>
							{t("examples.heading")}
						</h2>
						<p
							className="font-body text-center max-w-2xl mx-auto mb-10 leading-relaxed"
							style={{ color: "#83184399" }}
						>
							{t("examples.subtitle")}
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
							{exampleItems.map((p) => (
								<a
									key={p.title}
									href={p.url}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-white border rounded-2xl overflow-hidden transition-all duration-200 group shadow-sm"
									style={{ borderColor: "#f9a8d4" }}
								>
									<div className="aspect-video overflow-hidden bg-pink-50">
										<img
											src={p.image}
											alt={p.title}
											className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<div className="p-5 flex items-center justify-between">
										<h3
											className="font-heading text-lg font-bold"
											style={{ color: "#831843" }}
										>
											{p.title}
										</h3>
										<span
											className="font-body text-sm font-medium"
											style={{ color: "#ec4899" }}
										>
											{t("examples.viewSite")} →
										</span>
									</div>
								</a>
							))}
						</div>
					</motion.section>

					{/* ──── Portfolio Tiers ──── */}
					<motion.section {...fadeUp} className="mb-20">
						<h2
							className="font-heading text-3xl md:text-4xl font-bold text-center mb-4"
							style={{ color: "#831843" }}
						>
							{t("tiers.heading")}
						</h2>
						<p
							className="font-body text-center max-w-3xl mx-auto mb-10 leading-relaxed"
							style={{ color: "#83184399" }}
						>
							{t("tiers.subtitle")}
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
							{tiers.map((tier, i) => {
								const isPro = i === 1;
								return (
									<div
										key={tier.name}
										className="relative flex flex-col rounded-2xl border p-8 bg-white shadow-sm"
										style={{
											borderColor: isPro ? "#ec4899" : "#f9a8d4",
											transform: isPro ? "scale(1.05)" : undefined,
											zIndex: isPro ? 10 : undefined,
										}}
									>
										{tier.badge && (
											<span
												className="absolute -top-3 left-1/2 -translate-x-1/2 font-body text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full whitespace-nowrap text-white"
												style={{ backgroundColor: "#ec4899" }}
											>
												{tier.badge}
											</span>
										)}
										<div className="mb-6">
											<h3
												className="font-heading text-xl font-bold mb-2"
												style={{ color: "#831843" }}
											>
												{tier.name}
											</h3>
											<div className="flex items-baseline gap-1">
												<span
													className="font-heading text-4xl font-bold"
													style={{ color: "#ec4899" }}
												>
													{tier.price}
												</span>
												<span
													className="font-body text-sm"
													style={{ color: "#83184366" }}
												>
													{t("tiers.pricePeriod")}
												</span>
											</div>
										</div>
										<ul className="flex-1 space-y-3 mb-8">
											{tier.features.map((feature) => (
												<li
													key={feature}
													className="flex items-start gap-3 font-body text-sm"
													style={{ color: "#831843b3" }}
												>
													<Check
														className="size-4 mt-0.5 shrink-0"
														style={{ color: "#ec4899" }}
													/>
													<span>{feature}</span>
												</li>
											))}
										</ul>
										<Button
											href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
												t("whatsapp.tierMessage", {
													plan: tier.name,
													price: tier.price,
												})
											)}`}
											variant={isPro ? "gold" : "outline"}
											size="md"
											className="w-full"
										>
											{t("tiers.choose", { plan: tier.name })}
										</Button>
									</div>
								);
							})}
						</div>
					</motion.section>

					{/* ──── FAQ ──── */}
					<motion.section {...fadeUp} className="mb-20 max-w-3xl mx-auto">
						<h2
							className="font-heading text-3xl md:text-4xl font-bold text-center mb-10"
							style={{ color: "#831843" }}
						>
							{t("faq.heading")}
						</h2>
						<div
							className="bg-white border rounded-2xl px-6 md:px-10 shadow-sm"
							style={{ borderColor: "#f9a8d4" }}
						>
							{faqItems.map((item, i) => (
								<FAQItem
									key={item.q}
									question={item.q}
									answer={item.a}
									isOpen={openFaqIndex === i}
									onToggle={() =>
										setOpenFaqIndex(openFaqIndex === i ? null : i)
									}
								/>
							))}
						</div>
					</motion.section>

					{/* ──── Low-key "book a call" CTA ──── */}
					<motion.div
						{...fadeUp}
						className="mb-16 max-w-xl mx-auto text-center"
					>
						<p
							className="font-body text-sm mb-3"
							style={{ color: "#83184399" }}
						>
							{t("bookCall.heading")} {t("bookCall.body")}
						</p>
						<Button href={CAL_LINKS.eliaz} variant="outline" size="sm">
							{t("bookCall.button")}
						</Button>
					</motion.div>

					{/* ──── Final CTA ──── */}
					<motion.div
						{...fadeUp}
						className="rounded-2xl p-12 text-center max-w-3xl mx-auto shadow-sm"
						style={{
							backgroundColor: "rgba(236,72,153,0.08)",
							border: "1px solid rgba(236,72,153,0.3)",
						}}
					>
						<PawPrint
							className="size-12 mx-auto mb-6"
							style={{ color: "#ec4899" }}
						/>
						<h2
							className="font-heading text-2xl md:text-3xl font-bold mb-4 max-w-xl mx-auto"
							style={{ color: "#831843" }}
						>
							{t("cta.heading")}
						</h2>
						<p
							className="font-body max-w-xl mx-auto mb-6 leading-relaxed"
							style={{ color: "#83184399" }}
						>
							{t("cta.body")}
						</p>
						<Button href={genericWhatsappLink} variant="gold" size="lg">
							<Heart className="size-5" />
							{t("cta.button")}
						</Button>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
