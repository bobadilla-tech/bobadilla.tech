import type { Metadata } from "next";
import { generateSEOMetadata, SITE_NAME } from "~/shared/lib/seo";
import StartSmallPage from "@/features/start-small/pages/StartSmallPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "Start Small",
		description: `A low-risk way to work with ${SITE_NAME}. Fixed scope, fixed price starter projects from $400. See the quality before committing to anything larger.`,
		keywordSets: ["core", "mvp"],
		path: "/start-small",
		locale,
	});
}

export default StartSmallPage;
