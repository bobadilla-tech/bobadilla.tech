import { getTranslations } from "next-intl/server";
import IndustryCard from "@/shared/ui/IndustryCard";
import SectionHeader from "@/shared/ui/SectionHeader";
import Button from "@/shared/ui/Button";

interface Cause {
	slug: string;
	title: string;
	description: string;
	image: string;
}

export default async function HelpPage() {
	const t = await getTranslations("HelpPage");
	const causes = t.raw("causes") as Cause[];

	return (
		<div className="pt-32 pb-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center mb-16">
					<SectionHeader
						overline={t("overline")}
						heading={
							<>
								{t("heading1")}{" "}
								<span className="text-brand-gold">{t("heading2")}</span>
							</>
						}
						subtitle={t("subtitle")}
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
					{causes.map((cause) => (
						<IndustryCard
							key={cause.slug}
							title={cause.title}
							href={`/help/${cause.slug}`}
							image={cause.image}
							alt={cause.title}
							description={cause.description}
						/>
					))}
				</div>

				<section className="text-center">
					<div className="p-12 bg-brand-gold/10 border border-border-gold rounded-2xl">
						<h2 className="font-heading text-3xl font-bold text-brand-primary mb-4">
							{t("ctaHeading")}
						</h2>
						<p className="font-body text-brand-primary/60 mb-8 max-w-2xl mx-auto">
							{t("ctaBody")}
						</p>
						<Button to="/#contact" variant="gold">
							{t("contactUs")}
						</Button>
					</div>
				</section>
			</div>
		</div>
	);
}
