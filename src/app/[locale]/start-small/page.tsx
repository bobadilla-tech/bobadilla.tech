import type { Metadata } from "next";
import { generateSEOMetadata } from "~/lib/seo";
import StartSmallPage from "@/features/start-small/pages/StartSmallPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Start Small — Bobadilla Tech",
		description:
			"A low-risk way to work with Bobadilla Tech. Fixed scope, fixed price starter projects from $500. See the quality before committing to anything larger.",
		keywordSets: ["core", "mvp"],
		path: "/start-small",
		locale,
	});
}

export default StartSmallPage;
