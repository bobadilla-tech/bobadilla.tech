import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { PricingCalculator } from "@/features/pricing";
import { generateMetadata as genMeta, BASE_URL, KEYWORD_SETS } from "~/lib/seo";

export const metadata: Metadata = genMeta({
	title: "Pricing Calculator — Bobadilla Tech",
	description:
		"Get an instant project estimate. Our pricing calculator helps you understand the investment needed to build your product.",
	keywords: [...KEYWORD_SETS.core, ...KEYWORD_SETS.mvp],
	canonical: `${BASE_URL}/pricing`,
});

export default function PricingPage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<PricingCalculator />
			<Footer />
		</div>
	);
}
