import type { Metadata } from "next";
import { generateSEOMetadata, BASE_URL } from "~/shared/lib/seo";
import NalaCausePage from "@/features/help/pages/NalaCausePage";

const META = {
	en: {
		title: "Help Nala 🐾",
		description:
			"Nala needs your help. Buy a professional portfolio and help cover her vet bills.",
	},
	es: {
		title: "Ayuda a Nala 🐾",
		description:
			"Nala necesita tu ayuda. Compra un portafolio profesional y ayuda a cubrir sus gastos veterinarios.",
	},
	pt: {
		title: "Ajude a Nala 🐾",
		description:
			"A Nala precisa da sua ajuda. Compre um portfólio profissional e ajude a cobrir suas despesas veterinárias.",
	},
} as const;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const { title, description } =
		META[locale as keyof typeof META] ?? META.en;

	return generateSEOMetadata({
		title,
		description,
		keywordSets: ["core"],
		path: "/help/nala-2026",
		ogImage: `${BASE_URL}/og-help-nala-2026.png`,
		locale,
	});
}

export default NalaCausePage;
