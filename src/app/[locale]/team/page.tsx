import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BRAND } from "~/shared/lib/brand";
import { generateSEOMetadata } from "~/shared/lib/seo";
import Page from "@/features/team/pages/TeamPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Metadata.team" });
	return generateSEOMetadata({
		title: t("title", { brand: BRAND.name }),
		description: t("description", { brand: BRAND.name }),
		keywordSets: ["core"],
		path: "/team",
		locale,
	});
}

export default Page;
