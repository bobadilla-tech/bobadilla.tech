import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import {
	getAllPosts,
	getAllCategories,
	getPostsByCategory,
	getPostsByTag,
} from "@/data/blog";
import { Calendar, Clock, Tag, FileX } from "lucide-react";
import {
	generateMetadata as generateSEOMetadata,
	KEYWORD_SETS,
	BASE_URL,
} from "~/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
	title: "Blog - Engineering Insights & Tutorials",
	description:
		"Technical articles about MVP development, AI integration, Next.js, Cloudflare Workers, and modern web development best practices from the Bobadilla Tech team.",
	keywords: [
		...KEYWORD_SETS.core,
		...KEYWORD_SETS.technologies,
		"technical blog",
		"engineering blog",
		"web development tutorials",
		"AI tutorials",
	],
	canonical: `${BASE_URL}/blog`,
	ogImage: `${BASE_URL}/og-blog.png`,
});

interface BlogPageProps {
	searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const { category, tag } = await searchParams;

	const allPosts = getAllPosts();
	const posts = category
		? getPostsByCategory(
				category as "engineering" | "ai" | "product" | "business" | "tutorial"
			)
		: tag
			? getPostsByTag(tag)
			: allPosts;

	const categories = getAllCategories();

	const activeFilter = category || tag;

	const formatCategory = (cat: string) => {
		if (cat === "ai") return "AI";
		return cat.charAt(0).toUpperCase() + cat.slice(1);
	};

	const pageTitle = category ? `${formatCategory(category)} Blog` : "Blog";

	return (
		<div className="relative min-h-screen">
			<Navbar />

			<main className="pt-32 pb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Page Header */}
					<div className="flex flex-col items-center mb-16">
						<SectionHeader
							heading={
								<>
									{pageTitle}{" "}
									<span className="text-brand-gold">Posts</span>
								</>
							}
							subtitle="Insights, tutorials, and best practices from our team."
						/>
					</div>

					{/* Categories Filter */}
					<div className="mb-12">
						<div className="flex flex-wrap gap-3 justify-center">
							<Link
								href="/blog"
								className={
									!activeFilter
										? "px-5 py-2 bg-brand-gold text-black rounded-full font-body font-medium text-sm"
										: "px-5 py-2 bg-surface border border-border text-brand-primary/70 rounded-full font-body font-medium text-sm hover:border-border-gold hover:text-brand-primary transition-all duration-200"
								}
							>
								All Posts
							</Link>
							{categories.map((cat) => (
								<Link
									key={cat}
									href={`/blog?category=${cat}`}
									className={
										category === cat
											? "px-5 py-2 bg-brand-gold text-black rounded-full font-body font-medium text-sm"
											: "px-5 py-2 bg-surface border border-border text-brand-primary/70 rounded-full font-body font-medium text-sm hover:border-border-gold hover:text-brand-primary transition-all duration-200"
									}
								>
									{cat === "ai" ? "AI" : cat.charAt(0).toUpperCase() + cat.slice(1)}
								</Link>
							))}
						</div>
					</div>

					{/* Blog Posts Grid or Empty State */}
					{posts.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{posts.map((post) => (
								<Link
									key={post.id}
									href={`/blog/${post.slug}`}
									className="group relative flex flex-col p-6 bg-surface border border-border rounded-2xl hover:border-border-gold transition-all duration-300 hover:scale-[1.02]"
								>
									{post.featured && (
										<div className="absolute top-4 right-4 px-3 py-1 bg-brand-gold text-black text-xs font-semibold rounded-full font-body">
											Featured
										</div>
									)}

									<div className="mb-4">
										<span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full font-body">
											{post.category === "ai"
												? "AI"
												: post.category.charAt(0).toUpperCase() +
													post.category.slice(1)}
										</span>
									</div>

									<h3 className="font-heading text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-gold transition-colors duration-200 line-clamp-2">
										{post.title}
									</h3>

									<p className="font-body text-brand-primary/50 text-sm mb-4 line-clamp-3">
										{post.description}
									</p>

									<div className="flex flex-wrap gap-4 text-brand-primary/30 text-xs mb-4 font-body">
										<div className="flex items-center gap-1">
											<Calendar className="size-3.5" />
											<span>
												{new Date(post.publishedAt).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													year: "numeric",
												})}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock className="size-3.5" />
											<span>{post.readingTime} min read</span>
										</div>
									</div>

									<div className="flex flex-wrap gap-2 mb-4">
										{post.tags.slice(0, 3).map((t) => (
											<span
												key={t}
												className="inline-flex items-center gap-1 px-2 py-1 bg-surface text-brand-primary/40 text-xs rounded font-body"
											>
												<Tag className="size-3" />
												{t}
											</span>
										))}
									</div>

									<div className="mt-auto pt-4 border-t border-border flex items-center gap-2">
										<Image
											src={post.author.image}
											alt={post.author.name}
											width={32}
											height={32}
											className="rounded-full object-cover"
										/>
										<div className="flex flex-col">
											<span className="font-body text-brand-primary/70 text-sm font-medium">
												{post.author.name}
											</span>
											<span className="font-body text-brand-primary/30 text-xs">
												{post.author.role}
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-24">
							<div className="p-6 bg-surface border border-border rounded-2xl max-w-md text-center">
								<FileX className="size-16 text-brand-primary/20 mx-auto mb-4" />
								<h3 className="font-heading text-xl font-bold text-brand-primary mb-2">
									No posts found
								</h3>
								<p className="font-body text-brand-primary/50 mb-6">
									{activeFilter
										? `No posts match "${activeFilter}". Try a different filter or browse all posts.`
										: "No blog posts available yet. Check back soon!"}
								</p>
								<Button to="/blog" variant="gold">
									View All Posts
								</Button>
							</div>
						</div>
					)}

					{/* CTA Section */}
					<section className="mt-24 text-center">
						<div className="p-12 bg-brand-gold/10 border border-border-gold rounded-2xl">
							<h2 className="font-heading text-3xl font-bold text-brand-primary mb-4">
								Want to Build Something Amazing?
							</h2>
							<p className="font-body text-brand-primary/60 mb-8 max-w-2xl mx-auto">
								Let&apos;s discuss your project and how we can help you launch faster.
							</p>
							<Button to="/#contact" variant="gold">
								Get in Touch
							</Button>
						</div>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}
