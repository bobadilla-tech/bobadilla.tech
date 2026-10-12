import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { generateOgCard } from "./lib/og-card";

const __dirname = dirname(fileURLToPath(import.meta.url));

generateOgCard({
	badge: "SOFTWARE ENGINEERING",
	badgeColor: "#e6be1a",
	badgeBg: "rgba(230,190,26,0.12)",
	badgeBorder: "rgba(230,190,26,0.35)",
	heading: "We build software\nand we run it",
	headingColor: "#dbdbd7",
	subtitle: "Client engineering · Our own products · Open source",
	subtitleColor: "rgba(219,219,215,0.5)",
	backgroundColor: "#0b0505",
	topBarColor: "#e6be1a",
	footerText: "bobadilla.tech",
	footerTextColor: "#e6be1a",
	footerRuleColor: "rgba(230,190,26,0.2)",
	outPath: join(__dirname, "../public/og-default.png"),
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
