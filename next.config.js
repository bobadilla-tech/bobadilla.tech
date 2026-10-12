import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/:locale/tools",
				destination: "https://requiemsapi.com/en/tools",
				permanent: true,
			},
			{
				source: "/:locale(en|es|pt)/about",
				destination: "/:locale/company",
				permanent: true,
			},
		];
	},
	output: "standalone",
	serverExternalPackages: ["@vercel/og"],
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
};

export default withNextIntl(nextConfig);

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
