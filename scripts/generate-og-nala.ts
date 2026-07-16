import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { generateOgCard } from "./lib/og-card";

const __dirname = dirname(fileURLToPath(import.meta.url));

generateOgCard({
	badge: "AYUDA A NALA",
	badgeColor: "#db2777",
	badgeBg: "rgba(236,72,153,0.12)",
	badgeBorder: "rgba(236,72,153,0.35)",
	heading: "Portafolios que\nayudan a Nala",
	headingColor: "#831843",
	subtitle: "Compra un portafolio profesional y ayuda con sus gastos veterinarios",
	subtitleColor: "rgba(131,24,67,0.6)",
	backgroundColor: "#fdf2f8",
	topBarColor: "#ec4899",
	footerText: "bobadilla.tech/help/nala-2026",
	footerTextColor: "#db2777",
	footerRuleColor: "rgba(236,72,153,0.25)",
	outPath: join(__dirname, "../public/og-help-nala-2026.png"),
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
