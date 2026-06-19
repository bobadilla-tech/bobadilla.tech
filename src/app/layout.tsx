import type { ReactNode } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Sora, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sora = Sora({
	variable: "--font-sora",
	subsets: ["latin"],
	weight: ["300", "400", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({ children }: { children: ReactNode }) {
	// next-intl middleware sets this header only for public localized routes.
	const heads = await headers();
	const publicLocale = heads.get("x-next-intl-locale");
	const locale = publicLocale ?? "en";

	return (
		<html
			lang={locale}
			className={`${sora.variable} ${spaceGrotesk.variable}`}
		>
			<head>
				<link rel="icon" href="/assets/logo.png" type="image/png" />
				{publicLocale ? (
					<script
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								var choice = localStorage.getItem('consent-choice');
								var state = choice === 'accepted' ? 'granted' : 'denied';
								gtag('consent', 'default', {
									ad_storage: state,
									ad_user_data: state,
									ad_personalization: state,
									analytics_storage: state,
								});
							`,
						}}
					/>
				) : null}
			</head>
			{publicLocale ? <GoogleTagManager gtmId="GTM-NZHKJH48" /> : null}
			<body className="antialiased bg-brand-bg text-brand-primary font-body">
				{children}
			</body>
		</html>
	);
}
