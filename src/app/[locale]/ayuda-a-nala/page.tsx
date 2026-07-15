import type { Metadata } from "next";
import { generateSEOMetadata } from "~/shared/lib/seo";
import AyudaANalaPage from "@/features/ayuda-a-nala/pages/AyudaANalaPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Ayuda a Nala 🐾",
		description:
			"Nala necesita tu ayuda. Compra un portafolio profesional y ayuda a cubrir sus gastos veterinarios.",
		keywordSets: ["core"],
		path: "/ayuda-a-nala",
		locale,
	});
}

export default AyudaANalaPage;
