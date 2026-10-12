export const CAL_LINKS = {
	intro: "https://cal.com/ultirequiem/15min",
	technical: "https://cal.com/ultirequiem/15min",
} as const;

export const CONTACT = {
	email: {
		main: "ale@bobadilla.tech",
	},
	phone: "+51 902 482 231",
} as const;

export const SOCIAL_LINKS = {
	github: "https://github.com/bobadilla-tech",
	linkedin: "https://linkedin.com/company/bobadilla-tech",
	instagram: "https://www.instagram.com/bobadilla.tech",
} as const;

export const EXTERNAL_LINKS = {
	apis: "https://requiemsapi.com",
	tools: "https://requiemsapi.com/en/tools",
	architectureDoc:
		"https://github.com/bobadilla-tech/bobadilla.tech/blob/main/docs/core/architecture.md",
	ciWorkflow:
		"https://github.com/bobadilla-tech/bobadilla.tech/actions/workflows/ci.yml",
} as const;

export const FOOTER_SERVICE_LINKS = [
	{ id: "ourServices", href: "/services" },
	{ id: "hire", href: "/hire" },
	{ id: "startSmall", href: "/start-small" },
	{ id: "systemAudit", href: "/system-audit" },
	{ id: "pricing", href: "/pricing" },
] as const;

export const FOOTER_COMPANY_LINKS = [
	{ id: "about", href: "/company" },
	{ id: "team", href: "/team" },
	{ id: "products", href: "/products" },
	{ id: "caseStudies", href: "/case-studies" },
	{ id: "blog", href: "/blog" },
	{ id: "openSource", href: SOCIAL_LINKS.github, external: true },
	{ id: "contact", href: "/#contact" },
] as const;
