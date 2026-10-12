import { SOCIAL_LINKS } from "~/shared/lib/constants";

export interface Product {
	id: "requiemsApi" | "compileStrength" | "biasMarket";
	name: string;
	url: string;
	logo?: string;
	caseStudyHref?: string;
	tags: string[];
}

export const products: Product[] = [
	{
		id: "requiemsApi",
		name: "Requiems API",
		url: "https://requiemsapi.com",
		logo: "/companies/requiems.png",
		caseStudyHref: "/case-studies/requiems-api",
		tags: ["Go", "Rails 8", "Cloudflare Workers", "Redis", "PostgreSQL"],
	},
	{
		id: "compileStrength",
		name: "CompileStrength",
		url: "https://compilestrength.com",
		logo: "/companies/compile-strength.png",
		caseStudyHref: "/case-studies/compilestrength",
		tags: ["Next.js", "Cloudflare Workers", "Mastra / Gemini", "LemonSqueezy"],
	},
	{
		id: "biasMarket",
		name: "BiasMarket",
		url: "https://biasmarket.com",
		tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Cloudflare R2"],
	},
];

export interface OpenSourceProject {
	id: string;
	name: string;
	url: string;
	language: string;
}
const repo = (name: string) => `${SOCIAL_LINKS.github}/${name}`;
export const openSourceProjects: OpenSourceProject[] = [
	{ id: "lorelai", name: "lorelai", url: repo("lorelai"), language: "Go" },
	{
		id: "isEmailDisposable",
		name: "is-email-disposable",
		url: repo("is-email-disposable"),
		language: "Go",
	},
	{
		id: "goIpIntelligence",
		name: "go-ip-intelligence",
		url: repo("go-ip-intelligence"),
		language: "Go",
	},
	{
		id: "holidaysPerCountry",
		name: "holidays-per-country",
		url: repo("holidays-per-country"),
		language: "Go",
	},
	{
		id: "businessDaysCalculator",
		name: "business-days-calculator",
		url: repo("business-days-calculator"),
		language: "Go",
	},
	{
		id: "sentimentGo",
		name: "sentiment-go",
		url: repo("sentiment-go"),
		language: "Go",
	},
];
