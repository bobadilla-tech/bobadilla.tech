import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const WIDTH = 1200;
const HEIGHT = 630;

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadFont(weight: 400 | 700): ArrayBuffer {
	const file = join(
		__dirname,
		`../node_modules/@fontsource/sora/files/sora-latin-${weight}-normal.woff`
	);
	return readFileSync(file).buffer as ArrayBuffer;
}

async function main() {
	const soraRegular = loadFont(400);
	const soraBold = loadFont(700);

	const element = {
		type: "div",
		props: {
			style: {
				width: WIDTH,
				height: HEIGHT,
				display: "flex",
				flexDirection: "column" as const,
				backgroundColor: "#0b0505",
				fontFamily: "Sora",
			},
			children: [
				// Gold top bar
				{
					type: "div",
					props: {
						style: { width: "100%", height: 4, backgroundColor: "#e6be1a" },
					},
				},
				// Main content area
				{
					type: "div",
					props: {
						style: {
							display: "flex",
							flexDirection: "column" as const,
							flex: 1,
							padding: "60px 80px",
							justifyContent: "space-between",
						},
						children: [
							// Top: badge + heading + subtitle
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										flexDirection: "column" as const,
										gap: 28,
									},
									children: [
										// BLOG badge
										{
											type: "div",
											props: {
												style: {
													display: "flex",
													backgroundColor: "rgba(230,190,26,0.12)",
													border: "1px solid rgba(230,190,26,0.35)",
													borderRadius: 100,
													padding: "6px 18px",
													color: "#e6be1a",
													fontSize: 13,
													fontWeight: 700,
													letterSpacing: 3,
												},
												children: "BLOG",
											},
										},
										// Main heading
										{
											type: "div",
											props: {
												style: {
													color: "#dbdbd7",
													fontSize: 62,
													fontWeight: 700,
													lineHeight: 1.15,
													letterSpacing: -1,
												},
												children: "Engineering insights\nand deep dives",
											},
										},
										// Subtitle
										{
											type: "div",
											props: {
												style: {
													color: "rgba(219,219,215,0.5)",
													fontSize: 22,
													fontWeight: 400,
													letterSpacing: 0.2,
												},
												children:
													"Web development · AI · Architecture · Open source",
											},
										},
									],
								},
							},
							// Footer: domain + gold rule
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 24,
									},
									children: [
										{
											type: "div",
											props: {
												style: {
													color: "#e6be1a",
													fontSize: 18,
													fontWeight: 600,
													whiteSpace: "nowrap" as const,
												},
												children: "bobadilla.tech",
											},
										},
										{
											type: "div",
											props: {
												style: {
													flex: 1,
													height: 1,
													backgroundColor: "rgba(230,190,26,0.2)",
												},
											},
										},
									],
								},
							},
						],
					},
				},
			],
		},
	};

	console.log("Rendering SVG…");
	const svg = await satori(element as Parameters<typeof satori>[0], {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{ name: "Sora", data: soraRegular, weight: 400, style: "normal" },
			{ name: "Sora", data: soraBold, weight: 700, style: "normal" },
		],
	});

	const outPath = join(__dirname, "../public/og-blog.png");

	await sharp(Buffer.from(svg)).png().toFile(outPath);
	console.log(`✓ Generated: public/og-blog.png (${WIDTH}×${HEIGHT})`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
