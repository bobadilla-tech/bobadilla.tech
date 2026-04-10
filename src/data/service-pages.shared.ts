/**
 * Shared interfaces and non-translatable data for service pages.
 * Tech names are proper nouns — they don't change across locales.
 */

export interface PainPoint {
	icon: string; // path under /assets/services/pain-points/ (SVG)
	title: string;
	description: string;
	stat?: string;       // e.g. "2x" — when present, renders stats variant
	statLabel?: string;  // e.g. "faster launch speed"
}

export interface MvpSolution {
	title: string;
	description: string;
	icon: "prototype" | "functional" | "refinement" | "feature-focused" | "growth";
}

export interface MvpForWho {
	tag: string;
	title: string;
	description: string;
}

export interface ServiceOffer {
	title: string;
	description: string;
}

export interface ProcessStep {
	title: string;
	description: string;
}

export interface TechCategory {
	label: string;
	items: { name: string; icon: string }[]; // icon: path under /assets/services/tech/
}

export interface ServicePageData {
	slug: string;
	eyebrow: string;
	heroLine1: string;
	heroLine2: string;
	heroSubtitle: string;
	painPointsHeading: string;
	painPoints: PainPoint[];
	servicesHeading: string;
	servicesOffered: ServiceOffer[];
	processHeading: string;
	processSubtitle: string;
	processSteps: ProcessStep[];
	techStack: TechCategory[];
	/** Optional per-page overrides for FAQ questions */
	faqOverrides?: { q: string; a: string }[];
	/** Optional urgency band (web-development page only) */
	urgencyBandText?: string;
	urgencyBandCta?: string;
	/** Optional feature badges shown in ServiceHero (MVP page) */
	featureBadges?: { text: string; icon: "zap" | "timer" }[];
	/** Optional MVP-specific sections */
	solutionsHeading?: string;
	mvpSolutions?: MvpSolution[];
	forWhoHeading?: string;
	forWho?: MvpForWho[];
}

// Tech names are proper nouns and don't change across locales.
export const sharedTechStack: TechCategory[] = [
	{
		label: "Front-end",
		items: [
			{ name: "MobX", icon: "/assets/services/tech/mobx.png" },
			{ name: "Webpack", icon: "/assets/services/tech/webpack.png" },
			{ name: "GraphQL", icon: "/assets/services/tech/graphql.png" },
		],
	},
	{
		label: "Back-end",
		items: [
			{ name: "Nest.js", icon: "/assets/services/tech/nestjs.png" },
			{ name: "RabbitMQ", icon: "/assets/services/tech/rabbitmq.png" },
			{ name: "Fastify", icon: "/assets/services/tech/fastify.png" },
			{ name: "Node.js", icon: "/assets/services/tech/nodejs.png" },
			{ name: "Express", icon: "/assets/services/tech/express.png" },
			{ name: "AWS", icon: "/assets/services/tech/aws.png" },
		],
	},
	{
		label: "Database",
		items: [
			{ name: "PostgreSQL", icon: "/assets/services/tech/postgresql.png" },
			{ name: "MongoDB", icon: "/assets/services/tech/mongodb.png" },
			{ name: "MySQL", icon: "/assets/services/tech/mysql.png" },
			{ name: "Redis", icon: "/assets/services/tech/redis.png" },
		],
	},
	{
		label: "CMS",
		items: [
			{ name: "Sanity", icon: "/assets/services/tech/sanity.png" },
			{ name: "Shopify", icon: "/assets/services/tech/shopify.png" },
			{ name: "Strapi", icon: "/assets/services/tech/strapi.png" },
			{ name: "BigCommerce", icon: "/assets/services/tech/bigcommerce.png" },
		],
	},
];
