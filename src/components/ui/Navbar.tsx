"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { CAL_LINKS, SOCIAL_LINKS, EXTERNAL_LINKS } from "~/lib/constants";
import Button from "./Button";

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const t = useTranslations("Navbar");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	const resourceLinks = [
		{ label: t("blog"), href: "/blog" },
		{ label: t("tools"), href: "/tools" },
		{ label: t("openSource"), href: SOCIAL_LINKS.github, external: true },
		{ label: t("apis"), href: EXTERNAL_LINKS.apis, external: true },
	];

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-brand-bg/90 backdrop-blur-lg border-b border-border"
						: "bg-transparent"
				}`}
			>
				<div className="w-full px-6 lg:px-10">
					<div className="grid grid-cols-[auto_1fr_auto] items-center h-28 gap-8">
						{/* Logo — left */}
						<Link href="/" className="shrink-0 h-28 overflow-hidden flex items-center">
							<Image
								src="/assets/logo.png"
								alt="Boba Tech"
								width={500}
								height={500}
								className="w-44 h-auto"
								priority
							/>
						</Link>

						{/* Nav links — centered */}
						<div className="hidden md:flex items-center justify-center gap-8">
							<Link
								href="/services"
								className="font-body text-xl text-brand-primary/80 hover:text-brand-primary transition-colors duration-200"
							>
								{t("services")}
							</Link>
							<Link
								href="/#projects"
								className="font-body text-xl text-brand-primary/80 hover:text-brand-primary transition-colors duration-200"
							>
								{t("projects")}
							</Link>
							<div className="relative group">
								<button
									type="button"
									className="font-body text-xl text-brand-primary/80 hover:text-brand-primary transition-colors duration-200 cursor-pointer"
								>
									{t("resources")}
								</button>
								<div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-[#130a0a]/95 backdrop-blur-lg border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
									{resourceLinks.map((link) =>
										link.external ? (
											<a
												key={link.label}
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className="block px-4 py-3 font-body text-brand-primary/70 hover:text-brand-primary hover:bg-surface transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
											>
												{link.label}
											</a>
										) : (
											<Link
												key={link.label}
												href={link.href}
												className="block px-4 py-3 font-body text-brand-primary/70 hover:text-brand-primary hover:bg-surface transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
											>
												{link.label}
											</Link>
										)
									)}
								</div>
							</div>
							<Link
								href="/pricing"
								className="font-body text-xl text-brand-primary/80 hover:text-brand-primary transition-colors duration-200"
							>
								{t("pricing")}
							</Link>
							<Link
								href="/#contact"
								className="font-body text-xl text-brand-primary/80 hover:text-brand-primary transition-colors duration-200"
							>
								{t("contact")}
							</Link>
						</div>

						{/* Book a Call — right */}
						<div className="hidden md:flex items-center justify-end">
							<Button href={CAL_LINKS.ale} variant="gold" size="lg">
								{t("bookCall")}
							</Button>
						</div>

						{/* Mobile hamburger */}
						<div className="md:hidden flex justify-end">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="text-brand-primary/70 hover:text-brand-primary transition-colors duration-200"
								aria-label="Toggle menu"
							>
								{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<>
					<div
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
						onClick={() => setIsMobileMenuOpen(false)}
						aria-hidden="true"
					/>
					<div className="fixed left-0 right-0 top-20 bottom-0 bg-brand-bg z-50 md:hidden overflow-y-auto">
						<div className="flex flex-col space-y-4 p-6">
							<Link
								href="/services"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{t("services")}
							</Link>
							<Link
								href="/#projects"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{t("projects")}
							</Link>
							<div>
								<div className="font-body text-brand-primary/40 text-xs tracking-widest uppercase mb-3">
									{t("resources")}
								</div>
								<div className="pl-4 space-y-3">
									{resourceLinks.map((link) =>
										link.external ? (
											<a
												key={link.label}
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className="block font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-1"
												onClick={() => setIsMobileMenuOpen(false)}
											>
												{link.label}
											</a>
										) : (
											<Link
												key={link.label}
												href={link.href}
												className="block font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-1"
												onClick={() => setIsMobileMenuOpen(false)}
											>
												{link.label}
											</Link>
										)
									)}
								</div>
							</div>
							<Link
								href="/pricing"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{t("pricing")}
							</Link>
							<Link
								href="/#contact"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{t("contact")}
							</Link>
							<Button
								href={CAL_LINKS.ale}
								variant="gold"
								className="mt-4 w-full justify-center"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{t("bookCall")}
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
