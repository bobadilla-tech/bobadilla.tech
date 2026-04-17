import type { Metadata } from "next";
import { generateSEOMetadata } from "~/lib/seo";
import TeamPage from "@/features/team/pages/TeamPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Team — Bobadilla Tech",
		description:
			"Three senior engineers on every project. Specialists brought in as needed. No juniors, no overhead, no middlemen.",
		keywordSets: ["core"],
		path: "/team",
		locale,
	});
}

export default TeamPage;
