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
		`../../node_modules/@fontsource/sora/files/sora-latin-${weight}-normal.woff`
	);
	const buf = readFileSync(file);
	return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export interface OgCardConfig {
	badge: string;
	badgeColor: string;
	badgeBg: string;
	badgeBorder: string;
	heading: string;
	headingColor: string;
	subtitle: string;
	subtitleColor: string;
	backgroundColor: string;
	topBarColor: string;
	footerText: string;
	footerTextColor: string;
	footerRuleColor: string;
	outPath: string;
}

export async function generateOgCard(config: OgCardConfig): Promise<void> {
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
				backgroundColor: config.backgroundColor,
				fontFamily: "Sora",
			},
			children: [
				{
					type: "div",
					props: {
						style: { width: "100%", height: 4, backgroundColor: config.topBarColor },
					},
				},
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
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										flexDirection: "column" as const,
										gap: 28,
									},
									children: [
										{
											type: "div",
											props: {
												style: {
													display: "flex",
													backgroundColor: config.badgeBg,
													border: `1px solid ${config.badgeBorder}`,
													borderRadius: 100,
													padding: "6px 18px",
													color: config.badgeColor,
													fontSize: 13,
													fontWeight: 700,
													letterSpacing: 3,
												},
												children: config.badge,
											},
										},
										{
											type: "div",
											props: {
												style: {
													color: config.headingColor,
													fontSize: 62,
													fontWeight: 700,
													lineHeight: 1.15,
													letterSpacing: -1,
												},
												children: config.heading,
											},
										},
										{
											type: "div",
											props: {
												style: {
													color: config.subtitleColor,
													fontSize: 22,
													fontWeight: 400,
													letterSpacing: 0.2,
												},
												children: config.subtitle,
											},
										},
									],
								},
							},
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
													color: config.footerTextColor,
													fontSize: 18,
													fontWeight: 600,
													whiteSpace: "nowrap" as const,
												},
												children: config.footerText,
											},
										},
										{
											type: "div",
											props: {
												style: {
													flex: 1,
													height: 1,
													backgroundColor: config.footerRuleColor,
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

	console.log(`Rendering SVG for ${config.outPath}…`);
	const svg = await satori(element as Parameters<typeof satori>[0], {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{ name: "Sora", data: soraRegular, weight: 400, style: "normal" },
			{ name: "Sora", data: soraBold, weight: 700, style: "normal" },
		],
	});

	await sharp(Buffer.from(svg)).png().toFile(config.outPath);
	console.log(`✓ Generated: ${config.outPath} (${WIDTH}×${HEIGHT})`);
}
