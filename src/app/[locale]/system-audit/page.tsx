import type { Metadata } from "next";
import { generateSEOMetadata } from "~/lib/seo";
import SystemAuditPage from "@/features/system-audit/pages/SystemAuditPage";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return generateSEOMetadata({
		title: "System Audit & Execution Plan — Bobadilla Tech",
		description:
			"A technical review of your codebase, backend, and infrastructure. Get a structured report, prioritized action plan, and clear direction — before investing more time or money.",
		keywordSets: ["core"],
		path: "/system-audit",
		locale,
	});
}

export default SystemAuditPage;
