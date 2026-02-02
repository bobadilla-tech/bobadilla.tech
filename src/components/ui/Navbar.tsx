"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CAL_LINKS, SOCIAL_LINKS, EXTERNAL_LINKS } from "~/lib/constants";

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

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-slate-950/80 backdrop-blur-lg border-b border-white/10"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Bobadilla Tech
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="/services"
							className="text-gray-300 hover:text-white transition-colors duration-200"
						>
							Services
						</Link>
						<Link
							href="/#projects"
							className="text-gray-300 hover:text-white transition-colors duration-200"
						>
							Projects
						</Link>
						<div className="relative group">
							<button className="text-gray-300 hover:text-white transition-colors duration-200">
								Resources
							</button>
							<div className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
								<Link
									href="/blog"
									className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
								>
									Blog
								</Link>
								<Link
									href="/tools"
									className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
								>
									Tools
								</Link>
								<a
									href={SOCIAL_LINKS.github}
									target="_blank"
									rel="noopener noreferrer"
									className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
								>
									Open Source
								</a>
								<a
									href={EXTERNAL_LINKS.apis}
									target="_blank"
									rel="noopener noreferrer"
									className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
								>
									APIs
								</a>
							</div>
						</div>
						<Link
							href="/#pricing"
							className="text-gray-300 hover:text-white transition-colors duration-200"
						>
							Pricing
						</Link>
						<Link
							href="/#contact"
							className="text-gray-300 hover:text-white transition-colors duration-200"
						>
							Contact
						</Link>
						<a
							href={CAL_LINKS.ale}
							target="_blank"
							rel="noopener noreferrer"
							className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
						>
							Book a Call
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden py-4 border-t border-white/10">
						<div className="flex flex-col space-y-4">
							<Link
								href="/services"
								className="text-gray-300 hover:text-white transition-colors duration-200 px-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Services
							</Link>
							<Link
								href="/#projects"
								className="text-gray-300 hover:text-white transition-colors duration-200 px-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Projects
							</Link>
							<div className="px-2">
								<div className="text-gray-400 text-sm mb-2">Resources</div>
								<div className="pl-4 space-y-2">
									<Link
										href="/blog"
										className="block text-gray-300 hover:text-white transition-colors duration-200"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Blog
									</Link>
									<Link
										href="/tools"
										className="block text-gray-300 hover:text-white transition-colors duration-200"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Tools
									</Link>
									<a
										href={SOCIAL_LINKS.github}
										target="_blank"
										rel="noopener noreferrer"
										className="block text-gray-300 hover:text-white transition-colors duration-200"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Open Source
									</a>
									<a
										href={EXTERNAL_LINKS.apis}
										target="_blank"
										rel="noopener noreferrer"
										className="block text-gray-300 hover:text-white transition-colors duration-200"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										APIs
									</a>
								</div>
							</div>
							<Link
								href="/#pricing"
								className="text-gray-300 hover:text-white transition-colors duration-200 px-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Pricing
							</Link>
							<Link
								href="/#contact"
								className="text-gray-300 hover:text-white transition-colors duration-200 px-2"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Contact
							</Link>
							<a
								href={CAL_LINKS.ale}
								target="_blank"
								rel="noopener noreferrer"
								className="mx-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium text-center"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Book a Call
							</a>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
