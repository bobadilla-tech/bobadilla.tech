import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import ShaderBackground from "@/components/shaders/ShaderBackgroundLazy";
import Navbar from "@/components/ui/Navbar";
import { generateOrganizationSchema } from "~/lib/seo";
import { COPYRIGHT_TEXT } from "~/lib/constants";

export default function Home() {
	const organizationSchema = generateOrganizationSchema();

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
			<div className="relative min-h-screen bg-slate-950">
				<ShaderBackground />
				<Navbar />
				<main>
					<Hero />
					<Services />
					<Projects />
					<Pricing />
					<Contact />
				</main>
				<footer className="relative py-12 border-t border-white/10">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center text-gray-400">
							<p className="mb-2">{COPYRIGHT_TEXT}</p>
							<p className="text-sm">Built with Deep Engineering Expertise</p>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}
