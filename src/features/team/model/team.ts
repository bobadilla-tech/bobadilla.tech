import { BRAND } from "~/shared/lib/brand";

export interface TeamMember {
	id: string;
	name?: string;
	photo?: string;
	links?: { github?: string; linkedin?: string; website?: string };
}

export const teamMembers: TeamMember[] = [
	{ id: "alexandra", name: "Alexandra", photo: "/faces/alexandra.png" },
	{
		id: "eliaz",
		name: BRAND.founder.name,
		photo: "/faces/eliaz.jpeg",
		links: { website: BRAND.founder.url },
	},
];

export const disciplines = ["fullstack", "backend", "backendAi"] as const;
export const SHOW_EXTENDED_NETWORK = false;
