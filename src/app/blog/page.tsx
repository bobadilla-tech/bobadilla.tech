import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import ShaderBackground from "@/components/shaders/ShaderBackground";
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

	// Helper function to format category names
	const formatCategory = (cat: string) => {
		if (cat === "ai") return "AI";
		return cat.charAt(0).toUpperCase() + cat.slice(1);
	};

	// Determine page title based on filter
	const pageTitle = category ? `${formatCategory(category)} Blog` : "Blog";

	return (
		<div className="relative min-h-screen bg-slate-950">
			<ShaderBackground />
			<Navbar />

			<main className="relative z-10 pt-32 pb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Page Header */}
					<div className="text-center mb-16">
						<h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
							{pageTitle}{" "}
							<span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
								Posts
							</span>
						</h1>
						<p className="text-xl text-gray-400 max-w-3xl mx-auto">
							Insights, tutorials, and best practices from our team
						</p>
					</div>

					{/* Categories Filter */}
					<div className="mb-12">
						<div className="flex flex-wrap gap-3 justify-center">
							<Link
								href="/blog"
								className={
									!activeFilter
										? "px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
										: "px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 rounded-full font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
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
											? "px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
											: "px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 rounded-full font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
									}
								>
									{cat === "ai"
										? "AI"
										: cat.charAt(0).toUpperCase() + cat.slice(1)}
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
									className="group relative flex flex-col p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
								>
									{/* Featured Badge */}
									{post.featured && (
										<div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-full">
											Featured
										</div>
									)}

									{/* Category Badge */}
									<div className="mb-4">
										<span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">
											{post.category === "ai"
												? "AI"
												: post.category.charAt(0).toUpperCase() +
													post.category.slice(1)}
										</span>
									</div>

									{/* Title */}
									<h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
										{post.title}
									</h3>

									{/* Description */}
									<p className="text-gray-400 text-sm mb-4 line-clamp-3">
										{post.description}
									</p>

									{/* Meta Information */}
									<div className="flex flex-wrap gap-4 text-gray-500 text-xs mb-4">
										<div className="flex items-center gap-1">
											<Calendar className="w-4 h-4" />
											<span>
												{new Date(post.publishedAt).toLocaleDateString(
													"en-US",
													{
														month: "short",
														day: "numeric",
														year: "numeric",
													}
												)}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock className="w-4 h-4" />
											<span>{post.readingTime} min read</span>
										</div>
									</div>

									{/* Tags */}
									<div className="flex flex-wrap gap-2 mb-4">
										{post.tags.slice(0, 3).map((tag) => (
											<span
												key={tag}
												className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-gray-400 text-xs rounded"
											>
												<Tag className="w-3 h-3" />
												{tag}
											</span>
										))}
									</div>

									{/* Author */}
									<div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2">
										<Image
											src={post.author.image}
											alt={post.author.name}
											width={32}
											height={32}
											className="rounded-full object-cover"
										/>
										<div className="flex flex-col">
											<span className="text-gray-300 text-sm font-medium">
												{post.author.name}
											</span>
											<span className="text-gray-500 text-xs">
												{post.author.role}
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-24">
							<div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl max-w-md text-center">
								<FileX className="w-16 h-16 text-gray-500 mx-auto mb-4" />
								<h3 className="text-xl font-bold text-white mb-2">
									No posts found
								</h3>
								<p className="text-gray-400 mb-6">
									{activeFilter
										? `No posts match "${activeFilter}". Try a different filter or browse all posts.`
										: "No blog posts available yet. Check back soon!"}
								</p>
								<Link
									href="/blog"
									className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
								>
									View All Posts
								</Link>
							</div>
						</div>
					)}

					{/* CTA Section */}
					<section className="mt-24 text-center">
						<div className="p-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl">
							<h2 className="text-3xl font-bold text-white mb-4">
								Want to Build Something Amazing?
							</h2>
							<p className="text-gray-300 mb-8 max-w-2xl mx-auto">
								Let's discuss your project and how we can help you launch
								faster.
							</p>
							<Link
								href="/#contact"
								className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
							>
								Get in Touch
							</Link>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
