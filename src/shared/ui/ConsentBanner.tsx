"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "./Button";

declare global {
	interface Window {
		gtag: (...args: unknown[]) => void;
	}
}

const CONSENT_KEY = "consent-choice";

type ConsentChoice = "accepted" | "rejected";

function updateGtagConsent(choice: ConsentChoice) {
	const state = choice === "accepted" ? "granted" : "denied";
	if (typeof window !== "undefined" && typeof window.gtag === "function") {
		window.gtag("consent", "update", {
			ad_storage: state,
			ad_user_data: state,
			ad_personalization: state,
			analytics_storage: state,
		});
	}
}

export default function ConsentBanner() {
	const t = useTranslations("CookieBanner");
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(CONSENT_KEY);
		if (!stored) setVisible(true);
	}, []);

	function handleChoice(choice: ConsentChoice) {
		localStorage.setItem(CONSENT_KEY, choice);
		updateGtagConsent(choice);
		setVisible(false);
	}

	if (!visible) return null;

	return (
		<div className="fixed bottom-0 inset-x-0 z-60 bg-surface/95 backdrop-blur border-t border-border">
			<div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
				<p className="text-sm text-brand-primary/70 text-center sm:text-left">
					{t("message")}
				</p>
				<div className="flex gap-2 shrink-0">
					<Button variant="ghost" size="sm" onClick={() => handleChoice("rejected")}>
						{t("reject")}
					</Button>
					<Button variant="gold" size="sm" onClick={() => handleChoice("accepted")}>
						{t("accept")}
					</Button>
				</div>
			</div>
		</div>
	);
}
