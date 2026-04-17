"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/shared/ui/Button";
import { CAL_LINKS } from "~/lib/constants";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6 },
};

const architecture = [
	{
		name: "Go API",
		role: "Core business logic",
		detail:
			"Chi router, pgx driver (jackc/pgx v5), golang-migrate for schema management, Sentry for error tracking. All API categories (email, location, finance, text, technology) are domain-separated. Fast, stateless, horizontally scalable.",
	},
	{
		name: "Auth Gateway",
		role: "Public edge entry point",
		detail:
			"Cloudflare Worker built with Hono. Handles API key validation, rate limiting, and request proxying to the Go API. Cloudflare D1 tracks usage per key. OpenAPI spec generated from route definitions. This is the only service exposed publicly.",
	},
	{
		name: "API Management Worker",
		role: "Internal key + analytics service",
		detail:
			"Second Cloudflare Worker for key issuance, usage exports, and developer analytics. Swagger UI is served directly from the Worker for interactive API exploration. Not publicly routed.",
	},
	{
		name: "Rails 8 Dashboard",
		role: "User and admin UI",
		detail:
			"Rails 8.1 with Hotwire (Turbo + Stimulus) for reactive pages without a separate frontend build. Tailwind CSS for styling. Used by developers managing keys and by admins monitoring usage. PostgreSQL via ActiveRecord.",
	},
];

const stack = [
	{ layer: "API runtime", items: "Go 1.26 — Chi router, pgx v5, golang-migrate" },
	{ layer: "Caching", items: "Redis (go-redis) — response caching, rate limit counters" },
	{ layer: "Edge workers", items: "Cloudflare Workers — Hono framework, TypeScript, Zod" },
	{ layer: "Edge storage", items: "Cloudflare D1 (SQLite) — usage tracking per API key" },
	{ layer: "Dashboard", items: "Rails 8.1 — Hotwire, Turbo, Stimulus, Tailwind CSS" },
	{ layer: "Database", items: "PostgreSQL — shared between Go API and Rails dashboard" },
	{ layer: "Monorepo", items: "pnpm workspaces, Docker Compose for local development" },
	{ layer: "Observability", items: "Sentry (Go), structured logging, Biome for TS linting" },
];

const apiCategories = [
	{ name: "Email", detail: "Validation, disposable detection, MX lookup" },
	{ name: "Location & Geography", detail: "Cities, postal codes, timezone, geocoding, holidays, working days" },
	{ name: "Finance", detail: "Currency, exchange rates, financial data utilities" },
	{ name: "Text", detail: "Formatting, transformation, parsing utilities" },
	{ name: "Technology", detail: "QR code generation, password utilities, user agent parsing" },
];

export default function RequiemsApiPage() {
	return (
		<div className="pt-32 pb-24">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Breadcrumb */}
				<motion.div {...fadeUp} className="mb-12">
					<div className="flex items-center gap-2 font-body text-sm text-brand-primary/40 mb-8">
						<Link href="/case-studies" className="hover:text-brand-gold transition-colors">
							Case Studies
						</Link>
						<span>/</span>
						<span className="text-brand-primary/60">Requiems API</span>
					</div>

					<span className="font-body text-sm font-semibold tracking-widest uppercase text-brand-gold">
						Case Study
					</span>
					<h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-primary leading-tight mt-4 mb-6">
						Requiems API
					</h1>
					<p className="font-body text-xl text-brand-primary/70 leading-relaxed max-w-2xl">
						A production API platform that unifies email validation, location,
						finance, and utility APIs under a single key. Built as a multi-language
						monorepo with Go, Rails, and Cloudflare Workers.
					</p>
				</motion.div>

				{/* Overview */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Overview
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							Requiems API is a developer-facing API platform. One API key gives
							access to a growing set of categorized APIs — email validation,
							geographic data, financial utilities, text processing, and technology
							tools. The goal is to eliminate the sourcing, validation, and
							infrastructure overhead that comes with integrating multiple
							third-party data sources.
						</p>
						<p>
							The platform includes a public-facing API (via a Cloudflare Worker
							gateway), a developer dashboard (Rails), a key management service, and
							a high-performance Go backend that handles all business logic.
						</p>
					</div>
				</motion.section>

				{/* Problem */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Problem
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							Developers building real applications need access to reliable data
							APIs — email validation before user registration, timezone data for
							scheduling, currency rates for billing. The status quo is integrating
							five different APIs with five different SDKs, auth schemes, rate limit
							policies, and reliability profiles.
						</p>
						<p>
							The technical challenge here was multi-dimensional: a single platform
							serving different API categories with different data characteristics,
							an auth layer that's fast enough to not add perceptible latency, and a
							management interface that doesn't require a full SPA deployment.
						</p>
					</div>
				</motion.section>

				{/* Solution */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Solution
					</h2>
					<div className="space-y-4 font-body text-brand-primary/70 leading-relaxed">
						<p>
							We chose a polyglot monorepo. Go handles the API core — it's fast,
							compiles to a small binary, and the concurrency model fits high-volume
							request handling. Rails handles the developer dashboard — it's
							batteries-included for admin UIs and Hotwire means no separate
							frontend build pipeline. Two Cloudflare Workers handle the public edge:
							one for auth and rate limiting, one for key management and analytics.
						</p>
						<p>
							pnpm workspaces manages the JavaScript services. Docker Compose
							orchestrates the full stack locally — Go API, Rails, both Workers
							(via Wrangler), PostgreSQL, and Redis — from a single command.
						</p>
					</div>
				</motion.section>

				{/* Architecture */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						Architecture
					</h2>
					<div className="space-y-4">
						{architecture.map((layer) => (
							<div
								key={layer.name}
								className="bg-surface border border-border rounded-2xl p-6"
							>
								<div className="flex items-start gap-4 mb-3">
									<div>
										<h3 className="font-heading text-brand-primary font-semibold text-lg">
											{layer.name}
										</h3>
										<span className="font-body text-brand-gold text-sm">
											{layer.role}
										</span>
									</div>
								</div>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{layer.detail}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Performance & scaling */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-5">
						Performance & scaling decisions
					</h2>
					<div className="space-y-6">
						{[
							{
								heading: "Auth at the edge, logic in Go",
								body: "The Cloudflare Worker validates API keys and checks rate limits before a request ever reaches the Go API. D1 (SQLite at the edge) handles usage counters. This separation means the Go API only processes authenticated, rate-checked requests — it doesn't touch auth overhead.",
							},
							{
								heading: "Redis for hot-path caching",
								body: "Geographic lookups and financial data responses that are expensive to compute or unlikely to change within a time window are cached in Redis. The Go API handles cache-aside logic per API category with independent TTLs.",
							},
							{
								heading: "Domain isolation in Go",
								body: "Each API category (email, location, finance, etc.) is a separate domain package. This makes it straightforward to scale, test, or replace individual API categories without touching the others. The router wires domains together — it doesn't contain business logic.",
							},
							{
								heading: "Rails without a SPA",
								body: "Hotwire (Turbo + Stimulus) gives the dashboard real-time page updates without shipping a React app. The Rails server renders HTML; Turbo handles partial page replacement over websockets or fetch. This simplifies the deployment and removes the need for a separate frontend build.",
							},
						].map((item) => (
							<div
								key={item.heading}
								className="border-l-2 border-brand-gold/40 pl-6"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-2">
									{item.heading}
								</h3>
								<p className="font-body text-brand-primary/60 leading-relaxed text-sm">
									{item.body}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* API Categories */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						API categories
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{apiCategories.map((cat) => (
							<div
								key={cat.name}
								className="bg-surface border border-border rounded-xl p-5"
							>
								<h3 className="font-heading text-brand-primary font-semibold mb-1">
									{cat.name}
								</h3>
								<p className="font-body text-brand-primary/50 text-sm">
									{cat.detail}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Stack */}
				<motion.section {...fadeUp} className="mb-16">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						Stack
					</h2>
					<div className="space-y-3">
						{stack.map((item) => (
							<div
								key={item.layer}
								className="bg-surface border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-3"
							>
								<span className="font-body text-brand-gold text-sm font-semibold shrink-0 w-40">
									{item.layer}
								</span>
								<span className="font-body text-brand-primary/70 text-sm leading-relaxed">
									{item.items}
								</span>
							</div>
						))}
					</div>
				</motion.section>

				{/* Results */}
				<motion.section {...fadeUp} className="mb-20">
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
						Results
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{[
							{
								stat: "5 API categories",
								label: "Unified under one key, one SDK, one billing relationship",
							},
							{
								stat: "Edge auth layer",
								label: "Key validation and rate limiting happen before requests reach Go — minimal latency overhead",
							},
							{
								stat: "Full dev tooling",
								label: "Dashboard, key management, usage analytics, and Swagger docs — all shipped",
							},
						].map((item) => (
							<div
								key={item.stat}
								className="bg-brand-gold/10 border border-border-gold rounded-2xl p-6"
							>
								<p className="font-heading text-brand-primary font-bold text-lg mb-2">
									{item.stat}
								</p>
								<p className="font-body text-brand-primary/60 text-sm leading-relaxed">
									{item.label}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* CTA */}
				<motion.div
					{...fadeUp}
					className="bg-brand-gold/10 border border-border-gold rounded-2xl p-10 text-center"
				>
					<h2 className="font-heading text-2xl font-bold text-brand-primary mb-3">
						Need a backend like this?
					</h2>
					<p className="font-body text-brand-primary/60 mb-8 max-w-md mx-auto">
						API platforms, multi-service architectures, Go backends — let's talk
						about what you're building.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Button href={CAL_LINKS.eliaz} variant="gold" size="md">
							Book a call
						</Button>
						<Button to="/case-studies" variant="ghost" size="md">
							See all case studies
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
