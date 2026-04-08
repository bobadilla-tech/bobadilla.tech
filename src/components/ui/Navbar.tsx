"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CAL_LINKS, SOCIAL_LINKS, EXTERNAL_LINKS } from "~/lib/constants";
import Button from "./Button";

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-brand-bg/85 backdrop-blur-lg border-b border-border"
						: "bg-transparent"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-20">
						{/* Logo */}
						<Link href="/" className="font-heading text-2xl font-bold text-brand-gold">
							Bobadilla Tech
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-8">
							<Link
								href="/services"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200"
							>
								Services
							</Link>
							<Link
								href="/#projects"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200"
							>
								Projects
							</Link>
							<div className="relative group">
								<button
									type="button"
									className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 cursor-pointer"
								>
									Resources
								</button>
								<div className="absolute top-full left-0 mt-2 w-48 bg-[#130a0a]/95 backdrop-blur-lg border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
									<Link
										href="/blog"
										className="block px-4 py-3 font-body text-brand-primary/70 hover:text-brand-primary hover:bg-surface transition-colors duration-200"
									>
										Blog
									</Link>
									<Link
										href="/tools"
										className="block px-4 py-3 font-body text-brand-primary/70 hover:text-brand-primary hover:bg-surface transition-colors duration-200"
									>
										Tools
									</Link>
									<a
										href={SOCIAL_LINKS.github}
										target="_blank"
										rel="noopener noreferrer"
										className="block px-4 py-3 font-body text-brand-primary/70 hover:text-brand-primary hover:bg-surface transition-colors duration-200"
									>
										Open Source
									</a>
									<a
										href={EXTERNAL_LINKS.apis}
										target="_blank"
										rel="noopener noreferrer"
										className="block px-4 py-3 font-body text-brand-primary/70 hover:text-brand-primary hover:bg-surface transition-colors duration-200"
									>
										APIs
									</a>
								</div>
							</div>
							<Link
								href="/pricing"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200"
							>
								Pricing
							</Link>
							<Link
								href="/#contact"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200"
							>
								Contact
							</Link>
							<Button href={CAL_LINKS.ale} variant="gold" size="sm">
								Book a Call
							</Button>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="md:hidden text-brand-primary/70 hover:text-brand-primary transition-colors duration-200"
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay & Content */}
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
								Services
							</Link>
							<Link
								href="/#projects"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Projects
							</Link>
							<div>
								<div className="font-body text-brand-primary/40 text-xs tracking-widest uppercase mb-3">
									Resources
								</div>
								<div className="pl-4 space-y-3">
									<Link
										href="/blog"
										className="block font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-1"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Blog
									</Link>
									<Link
										href="/tools"
										className="block font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-1"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Tools
									</Link>
									<a
										href={SOCIAL_LINKS.github}
										target="_blank"
										rel="noopener noreferrer"
										className="block font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-1"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Open Source
									</a>
									<a
										href={EXTERNAL_LINKS.apis}
										target="_blank"
										rel="noopener noreferrer"
										className="block font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-1"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										APIs
									</a>
								</div>
							</div>
							<Link
								href="/pricing"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Pricing
							</Link>
							<Link
								href="/#contact"
								className="font-body text-brand-primary/70 hover:text-brand-primary transition-colors duration-200 py-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Contact
							</Link>
							<Button
								href={CAL_LINKS.ale}
								variant="gold"
								className="mt-4 w-full justify-center"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Book a Call
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
