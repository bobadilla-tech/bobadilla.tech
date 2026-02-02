/**
 * Application Constants
 * Centralized configuration for URLs, links, and other constant values
 */

// Cal.com Booking Links
export const CAL_LINKS = {
	ale: "https://cal.com/ale-boba-work/15min",
	eliaz: "https://cal.com/ultirequiem/15min",
} as const;

// Contact Information
export const CONTACT = {
	email: {
		ale: "ale@bobadilla.tech",
		eliaz: "eliaz@bobadilla.tech",
	},
} as const;

// Social Links
export const SOCIAL_LINKS = {
	github: "https://github.com/bobadilla-tech",
	twitter: "https://twitter.com/UltiRequiem",
	linkedin: "https://linkedin.com/company/bobadilla-tech",
} as const;

// External Links
export const EXTERNAL_LINKS = {
	apis: "https://requiems-api.xyz/",
} as const;

// Copyright
export const COPYRIGHT_YEAR = new Date().getFullYear();
export const COPYRIGHT_TEXT = `© ${COPYRIGHT_YEAR} Bobadilla Tech. All rights reserved.` as const;
