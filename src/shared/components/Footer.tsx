import { Github, Linkedin, Instagram } from "@/shared/ui/BrandIcons";
import { getTranslations } from "next-intl/server";
import { Link } from "~/i18n/navigation";
import { CONTACT, SOCIAL_LINKS, FOOTER_LINKS } from "~/lib/constants";

function toTelUri(phoneNumber: string): string {
	const trimmed = phoneNumber.trim();
	const hasLeadingPlus = trimmed.startsWith("+");
	const digitsOnly = trimmed.replace(/\D/g, "");
	return `${hasLeadingPlus ? "+" : ""}${digitsOnly}`;
}

export default async function Footer() {
	const t = await getTranslations("Footer");

	return (
		<footer className="bg-surface border-t border-border">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
					{/* Logo + social */}
					<div className="flex flex-col gap-6">
						<Link
							href="/"
							className="font-heading text-2xl font-bold text-brand-gold"
						>
							Bobadilla Tech
						</Link>
						<div className="flex items-center gap-4">
							<a
								href={SOCIAL_LINKS.instagram}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								className="text-brand-primary/50 hover:text-brand-gold transition-colors duration-200"
							>
								<Instagram className="size-6" />
							</a>
							<a
								href={SOCIAL_LINKS.github}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
								className="text-brand-primary/50 hover:text-brand-gold transition-colors duration-200"
							>
								<Github className="size-6" />
							</a>
							<a
								href={SOCIAL_LINKS.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								className="text-brand-primary/50 hover:text-brand-gold transition-colors duration-200"
							>
								<Linkedin className="size-6" />
							</a>
						</div>
					</div>

					{/* Nav links */}
					<div className="flex flex-col gap-4">
						<span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-primary/40">
							{t("navigation")}
						</span>
						<nav className="flex flex-col gap-3">
							{FOOTER_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="font-body text-brand-primary/60 hover:text-brand-primary text-sm transition-colors duration-200"
								>
									{t(`links.${link.id}` as Parameters<typeof t>[0])}
								</Link>
							))}
						</nav>
					</div>

					{/* Company */}
					<div className="flex flex-col gap-4">
						<span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-primary/40">
							{t("company")}
						</span>
						<nav className="flex flex-col gap-3">
							{[
								{ href: "/hire", label: "Work With Us" },
								{ href: "/start-small", label: "Start Small" },
								{ href: "/system-audit", label: "System Audit" },
								{ href: "/case-studies", label: "Case Studies" },
								{ href: "/team", label: "Team" },
								{ href: "/founder", label: "Founder" },
							].map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="font-body text-brand-primary/60 hover:text-brand-primary text-sm transition-colors duration-200"
								>
									{link.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Drop us a line */}
					<div className="flex flex-col gap-4">
						<span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-primary/40">
							{t("dropUsALine")}
						</span>
						<div className="flex flex-col gap-2">
							<a
								href={`mailto:${CONTACT.email.eliaz}`}
								className="font-body text-brand-primary/60 hover:text-brand-primary text-sm transition-colors duration-200"
							>
								{CONTACT.email.eliaz}
							</a>
							<a
								href={`mailto:${CONTACT.email.ale}`}
								className="font-body text-brand-primary/60 hover:text-brand-primary text-sm transition-colors duration-200"
							>
								{CONTACT.email.ale}
							</a>
						</div>
					</div>

					{/* Call us */}
					<div className="flex flex-col gap-4">
						<span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-primary/40">
							{t("callUs")}
						</span>
						<a
							href={`tel:${toTelUri(CONTACT.phone)}`}
							className="font-body text-brand-primary/60 hover:text-brand-primary text-sm transition-colors duration-200"
						>
							{CONTACT.phone}
						</a>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-border">
					<p className="font-body text-brand-primary/30 text-sm text-center">
						{t("copyright", { year: new Date().getFullYear() })}
					</p>
				</div>
			</div>
		</footer>
	);
}
