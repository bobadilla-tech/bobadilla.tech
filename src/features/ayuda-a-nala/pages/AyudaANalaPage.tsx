"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Heart, PawPrint } from "lucide-react";

import Button from "@/shared/ui/Button";
import FAQItem from "@/shared/ui/FAQItem";
import { fadeUp } from "@/shared/ui/animations";

const WHATSAPP_LINK = `https://wa.me/51902482231?text=${encodeURIComponent(`¡Hola! Quiero ayudar a Nala`)}`;

const TIERS = [
	{
		name: "Arranca",
		price: "S/. 50",
		badge: null as string | null,
		features: [
			"Portafolio digital publicado en línea",
			"Hosting incluido sin costo recurrente",
			"Entrega en 72 horas",
			"Código fuente 100% transferido",
			"Apoyas los gastos veterinarios de Nala 💜",
		],
	},
	{
		name: "Pro",
		price: "S/. 120",
		badge: "Mayor demanda",
		features: [
			"Todo lo del plan Arranca",
			"Catálogo de 5+ diseños para escoger",
			"Colores y texto personalizados",
			"Foto profesional retocada con IA",
			"CV en formato Harvard listo para enviar",
			"Una ronda de ajustes incluida",
			"Apoyas los gastos veterinarios de Nala 💜",
		],
	},
	{
		name: "Premium",
		price: "S/. 280",
		badge: null,
		features: [
			"Todo lo del plan Pro",
			"Diseño único desde tu referencia visual",
			"Animaciones y micro-interacciones",
			"Optimización para buscadores (SEO)",
			"Previsualización profesional en redes (Open Graph)",
			"Ajustes ilimitados hasta tu aprobación",
			"Entrega en 5 a 7 días hábiles",
			"Apoyas los gastos veterinarios de Nala 💜",
		],
	},
];

const FAQ_ITEMS = [
	{
		q: "¿Quién es Nala?",
		a: "Nala es una perrita rescatada que está recibiendo atención veterinaria. Estamos ayudando en su recuperación.",
	},
	{
		q: "¿En cuánto tiempo tengo mi portafolio?",
		a: "Los planes Arranca y Pro se entregan en 72 horas. El plan Premium se entrega en 5 a 7 días hábiles por el nivel de personalización.",
	},
	{
		q: "¿Puedo personalizar mi portafolio?",
		a: "Sí. En el plan Pro eliges entre 5+ diseños con colores y texto a tu medida. En Premium el diseño es completamente único desde tu referencia.",
	},
	{
		q: "¿Cómo compro un portafolio?",
		a: "Escríbenos por WhatsApp, te daremos los datos de pago y coordinamos los detalles de tu portafolio. Una vez listo, te lo entregamos con hosting incluido.",
	},
	{
		q: "¿Puedo adoptar a Nala?",
		a: "Cuando Nala se haya recuperado por completo, buscaremos un hogar responsable. Si te interesa, escríbenos por WhatsApp.",
	},
];

const NALA_PHOTOS = [
	"WhatsApp Image 2026-07-15 at 17.26.25 (2).jpeg",
	"WhatsApp Image 2026-07-15 at 17.26.25.jpeg",
	"WhatsApp Image 2026-07-15 at 17.26.25 (1).jpeg",
	"WhatsApp Image 2026-07-15 at 17.26.26 (1).jpeg",
	"WhatsApp Image 2026-07-15 at 17.26.26 (2).jpeg",
	"WhatsApp Image 2026-07-15 at 17.26.26 (3).jpeg",
	"WhatsApp Image 2026-07-15 at 17.26.26 (4).jpeg",
	"WhatsApp Image 2026-07-15 at 17.26.27 (1).jpeg",
	"WhatsApp Image 2026-07-15 at 17.26.27.jpeg",
];

const PINK_THEME = {
	"--color-brand-gold": "#ec4899",
	"--color-brand-gold-light": "#fbcfe8",
	"--color-brand-gold-dark": "#db2777",
	"--color-brand-primary": "#831843",
	"--color-brand-bg": "#fff",
	"--color-brand-bg-alt": "#fdf2f8",
	"--color-surface": "#fff",
	"--color-surface-hover": "#fce7f3",
	"--color-border": "#f9a8d4",
	"--color-border-gold": "rgba(236,72,153,0.4)",
} as React.CSSProperties;

export default function AyudaANalaPage() {
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

	useEffect(() => {
		const root = document.documentElement;

		root.style.setProperty("--color-brand-gold", "#ec4899");
		root.style.setProperty("--color-brand-gold-light", "#fbcfe8");
		root.style.setProperty("--color-brand-gold-dark", "#db2777");
		root.style.setProperty("--color-brand-primary", "#831843");
		root.style.setProperty("--color-brand-bg", "#fdf2f8");
		root.style.setProperty("--color-brand-bg-alt", "#fff");
		root.style.setProperty("--color-surface", "#fff");
		root.style.setProperty("--color-surface-hover", "#fce7f3");
		root.style.setProperty("--color-border", "#f9a8d4");
		root.style.setProperty("--color-border-gold", "rgba(236,72,153,0.4)");
		root.style.backgroundColor = "#fdf2f8";

		// Switch navbar logo to dark version for light background
		const navbarLogo = document.querySelector<HTMLImageElement>(
			'nav img[alt="Boba Tech"]'
		);
		if (navbarLogo) navbarLogo.src = "/assets/logo-dark.png";

		return () => {
			root.style.removeProperty("--color-brand-gold");
			root.style.removeProperty("--color-brand-gold-light");
			root.style.removeProperty("--color-brand-gold-dark");
			root.style.removeProperty("--color-brand-primary");
			root.style.removeProperty("--color-brand-bg");
			root.style.removeProperty("--color-brand-bg-alt");
			root.style.removeProperty("--color-surface");
			root.style.removeProperty("--color-surface-hover");
			root.style.removeProperty("--color-border");
			root.style.removeProperty("--color-border-gold");
			root.style.backgroundColor = "";

			const oldLogo = document.querySelector<HTMLImageElement>(
				'nav img[alt="Boba Tech"]'
			);
			if (oldLogo) oldLogo.src = "/assets/logo.png";
		};
	}, []);

	return (
		<div className="bg-pink-50 min-h-screen" style={PINK_THEME}>
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
							AYUDA A NALA 🐾
						</span>
						<h1
							className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-4 mb-6"
							style={{ color: "#831843" }}
						>
							Ayúdanos a cuidar{" "}
							<span style={{ color: "#ec4899" }}>de Nala</span>
						</h1>
						<p
							className="font-body text-lg leading-relaxed"
							style={{ color: "#831843bf" }}
						>
							Estamos apoyando en los gastos veterinarios de Nala, una perrita
							rescatada. Al comprar un portafolio profesional, nos ayudas a
							cubrir sus consultas, medicamentos y cuidados. Tú te llevas un
							portafolio increíble y ella recibe la atención que necesita.
						</p>
					</motion.div>

					{/* ──── Photo Gallery ──── */}
					<motion.section {...fadeUp} className="mb-20">
						<h2
							className="font-heading text-3xl md:text-4xl font-bold text-center mb-4"
							style={{ color: "#831843" }}
						>
							Conoce a Nala 🐾
						</h2>
						<p
							className="font-body text-center max-w-2xl mx-auto mb-10 leading-relaxed"
							style={{ color: "#83184399" }}
						>
							Así está Nala hoy, recuperándose poquito a poco.
						</p>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto">
							{NALA_PHOTOS.map((filename, i) => (
								<div
									key={filename}
									className={`relative aspect-square rounded-xl overflow-hidden border bg-white shadow-sm ${
										i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
									}`}
									style={{ borderColor: "#f9a8d4" }}
								>
									<img
										src={`/ayuda-a-nala/${encodeURI(filename)}`}
										alt="Foto de Nala"
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
							Portafolios que hemos hecho
						</h2>
						<p
							className="font-body text-center max-w-2xl mx-auto mb-10 leading-relaxed"
							style={{ color: "#83184399" }}
						>
							Así se ven los portafolios que entregamos. Cada compra ayuda con
							los gastos veterinarios de Nala.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
							{[
								{
									title: "Leonardo Estacio",
									url: "https://crydafan.dev/",
									image: "/portfolios/crydafan.png",
								},
								{
									title: "Eliaz Bobadilla",
									url: "https://ultirequiem.xyz/",
									image: "/portfolios/ultirequiem.png",
								},
							].map((p) => (
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
											Ver sitio →
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
							Elige tu portafolio
						</h2>
						<p
							className="font-body text-center max-w-3xl mx-auto mb-10 leading-relaxed"
							style={{ color: "#83184399" }}
						>
							Tu compra ayuda con los gastos veterinarios de Nala. Tú recibes un
							portafolio profesional y ella recibe los cuidados que necesita.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
							{TIERS.map((tier, i) => {
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
													pago único
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
											href={`https://wa.me/51902482231?text=${encodeURIComponent(`¡Hola! Quiero ayudar a Nala eligiendo el plan ${tier.name} (${tier.price})`)}`}
											variant={isPro ? "gold" : "outline"}
											size="md"
											className="w-full"
										>
											Elegir {tier.name}
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
							Preguntas frecuentes
						</h2>
						<div
							className="bg-white border rounded-2xl px-6 md:px-10 shadow-sm"
							style={{ borderColor: "#f9a8d4" }}
						>
							{FAQ_ITEMS.map((item, i) => (
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
							Elige tu portafolio y ayuda a Nala 💛
						</h2>
						<p
							className="font-body max-w-xl mx-auto mb-6 leading-relaxed"
							style={{ color: "#83184399" }}
						>
							Cada portafolio que compras ayuda a cubrir sus gastos
							veterinarios. Gracias por ser parte de esta cadena de ayuda.
						</p>
						<Button href={WHATSAPP_LINK} variant="gold" size="lg">
							<Heart className="size-5" />
							Contáctanos por WhatsApp
						</Button>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
