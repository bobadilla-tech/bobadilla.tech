import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { generateMetadata as generateSEOMetadata, BASE_URL } from "~/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
	title: "Free Online Developer Tools",
	description:
		"Free online tools for developers, researchers, and content creators. Privacy-focused utilities with no sign-up required.",
	keywords: [
		"free developer tools",
		"online tools",
		"developer utilities",
		"free software tools",
		"web tools",
		"no sign-up tools",
		"privacy-focused tools",
	],
	canonical: `${BASE_URL}/tools`,
	ogImage: `${BASE_URL}/og-tools.png`,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tools: any[] = [];

const categories = Array.from(new Set(tools.map((tool) => tool.category)));

export default async function ToolsPage() {
	const t = await getTranslations("ToolsPage");
	const features = t.raw("features") as { title: string; desc: string }[];

	return (
		<div className="relative min-h-screen">
			<Navbar />

			<main className="pt-32 pb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<div className="mb-8">
						<div className="flex items-center gap-2 font-body text-sm text-brand-primary/40">
							<Link
								href="/"
								className="hover:text-brand-primary transition-colors duration-200"
							>
								{t("home")}
							</Link>
							<span>/</span>
							<span className="text-brand-primary">Tools</span>
						</div>
					</div>

					{/* Header */}
					<div className="flex flex-col items-center mb-16">
						<SectionHeader
							heading={
								<>
									{t("heading1")}{" "}
									<span className="text-brand-gold">{t("heading2")}</span>
								</>
							}
							subtitle={t("subtitle")}
						/>
					</div>

					{/* Tools by Category */}
					{categories.map((category) => (
						<div key={category} className="mb-16">
							<h2 className="font-heading text-2xl font-bold text-brand-primary mb-8">
								{category}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{tools
									.filter((tool) => tool.category === category)
									.map((tool) => {
										const Icon = tool.icon;
										return (
											<Link
												key={tool.id}
												href={`/tools/${tool.slug}`}
												className="group p-6 bg-surface border border-border rounded-2xl hover:border-border-gold transition-all duration-300 hover:scale-[1.02] flex flex-col gap-4"
											>
												<div className="size-12 bg-brand-gold/10 rounded-xl flex items-center justify-center">
													<Icon className="size-6 text-brand-gold" />
												</div>

												<h3 className="font-heading text-xl font-semibold text-brand-primary group-hover:text-brand-gold transition-colors duration-200">
													{tool.name}
												</h3>

												<p className="font-body text-brand-primary/50 text-sm line-clamp-2">
													{tool.description}
												</p>

												<div className="flex flex-wrap gap-2">
													{tool.tags.map((tag: string) => (
														<span
															key={tag}
															className="px-2 py-1 bg-surface font-body text-brand-primary/40 text-xs rounded"
														>
															{tag}
														</span>
													))}
												</div>

												<div className="flex items-center gap-2 text-brand-gold font-body text-sm font-medium mt-auto">
													<span>{t("useTool")}</span>
													<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
												</div>
											</Link>
										);
									})}
							</div>
						</div>
					))}

					{/* More Tools Coming Soon */}
					<div className="mt-16 text-center">
						<div className="inline-block p-8 bg-brand-gold/10 border border-border-gold rounded-2xl">
							<h3 className="font-heading text-2xl font-bold text-brand-primary mb-2">
								{t("moreToolsHeading")}
							</h3>
							<p className="font-body text-brand-primary/50 mb-4">
								{t("moreToolsBody")}
							</p>
							<Button to="/#contact" variant="outline">
								{t("suggestTool")}
							</Button>
						</div>
					</div>

					{/* Why Use Our Tools */}
					<div className="mt-16 bg-surface border border-border rounded-2xl p-8">
						<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
							{t("whyUseHeading")}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{features.map((item) => (
								<div key={item.title}>
									<h3 className="font-heading text-lg font-semibold text-brand-primary mb-2">
										{item.title}
									</h3>
									<p className="font-body text-brand-primary/50 text-sm">
										{item.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
