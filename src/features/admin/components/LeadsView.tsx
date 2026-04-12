import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";
import { getDb } from "~/db/client";
import { contactMessages, pricingEstimates } from "~/db/schema";
import LeadsTable, { type LeadRow, type LeadSummary } from "./LeadsTable";

function getExcerpt(text: string, maxLength = 120): string {
	const normalized = text.replace(/\s+/g, " ").trim();
	return normalized.length > maxLength ? `${normalized.slice(0, maxLength).trimEnd()}…` : normalized;
}

function formatCurrency(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

export default async function LeadsView() {
	const { env } = await getCloudflareContext();
	const db = getDb(env.DB);
	const [messages, estimates] = await Promise.all([
		db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)),
		db.select().from(pricingEstimates).orderBy(desc(pricingEstimates.createdAt)),
	]);

	const leads: LeadRow[] = [
		...messages.map((message) => ({
			id: `contact-${message.id}`,
			source: "Contact" as const,
			name: message.name,
			email: message.email,
			company: message.company?.trim() || "Contact inquiry",
			summary: getExcerpt(message.message),
			value: "Inbound message",
			createdAt: message.createdAt.toISOString(),
		})),
		...estimates.map((estimate) => ({
			id: `estimate-${estimate.id}`,
			source: "Estimate" as const,
			name: estimate.email,
			email: estimate.email,
			company: "Pricing estimate",
			summary: getExcerpt(estimate.breakdown),
			value: formatCurrency(estimate.totalPrice),
			createdAt: estimate.createdAt.toISOString(),
		})),
	].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

	const summary: LeadSummary = {
		total: leads.length,
		contacts: messages.length,
		estimates: estimates.length,
		totalValue: formatCurrency(estimates.reduce((total, estimate) => total + estimate.totalPrice, 0)),
	};

	return (
		<section className="space-y-8">
			<div className="max-w-3xl">
				<p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Sales dashboard</p>
				<h1 className="mt-3 font-heading text-3xl font-semibold text-brand-primary sm:text-4xl">Leads and estimates in one place</h1>
				<p className="mt-4 max-w-2xl text-base leading-7 text-brand-primary/60">
					This view combines contact form submissions and pricing estimates so the sales team can qualify, search, and follow up faster.
				</p>
			</div>

			<LeadsTable leads={leads} summary={summary} />
		</section>
	);
}