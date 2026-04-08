/**
 * Application Constants
 * Centralized configuration for URLs, links, and other constant values
 */

export const CAL_LINKS = {
	//ale: "https://cal.com/ale-boba-work/15min",
	ale: "https://cal.com/ultirequiem/15min",
	eliaz: "https://cal.com/ultirequiem/15min",
} as const;

export const CONTACT = {
	email: {
		ale: "ale@bobadilla.tech",
		eliaz: "eliaz@bobadilla.tech",
	},
	phone: "+51 902 482 231",
} as const;

export const SOCIAL_LINKS = {
	github: "https://github.com/bobadilla-tech",
	twitter: "https://twitter.com/UltiRequiem",
	linkedin: "https://linkedin.com/company/bobadilla-tech",
	instagram: "https://www.instagram.com/bobadilla.tech",
} as const;

export const EXTERNAL_LINKS = {
	apis: "https://requiems.xyz",
} as const;

export const FOOTER_LINKS = [
	{ label: "Our Services", href: "/services" },
	{ label: "Projects", href: "/#projects" },
	{ label: "Dedicated Team", href: "/services/dedicated-team-development" },
	{ label: "Open Source", href: "https://github.com/bobadilla-tech" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Contact", href: "/#contact" },
] as const;

export const COPYRIGHT_YEAR = new Date().getFullYear();
export const COPYRIGHT_TEXT =
	`© ${COPYRIGHT_YEAR} Bobadilla Tech. All rights reserved.` as const;
