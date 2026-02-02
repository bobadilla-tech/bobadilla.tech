import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import ShaderBackground from "@/components/shaders/ShaderBackground";
import { getPostBySlug, getAllPosts } from "@/data/blog";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import {
	generateMetadata as generateSEOMetadata,
	BASE_URL,
} from "~/lib/seo";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return generateSEOMetadata({
		title: post.title,
		description: post.description,
		keywords: post.tags,
		canonical: `${BASE_URL}/blog/${post.slug}`,
		ogImage: post.coverImage || `${BASE_URL}/og-blog.png`,
		ogType: "article",
		article: {
			publishedTime: post.publishedAt,
			updatedTime: post.updatedAt,
			author: post.author.name,
			tags: post.tags,
		},
	});
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<div className="relative min-h-screen bg-slate-950">
			<ShaderBackground />
			<Navbar />

			<main className="relative z-10 pt-32 pb-24">
				<article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Back Button */}
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 mb-8"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Blog
					</Link>

					{/* Category Badge */}
					<div className="mb-6">
						<span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full">
							{post.category}
						</span>
					</div>

					{/* Title */}
					<h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
						{post.title}
					</h1>

					{/* Description */}
					<p className="text-xl text-gray-400 mb-8">{post.description}</p>

					{/* Meta Information */}
					<div className="flex flex-wrap gap-6 text-gray-400 text-sm mb-8 pb-8 border-b border-white/10">
						<div className="flex items-center gap-2">
							<Calendar className="w-5 h-5" />
							<span>
								{new Date(post.publishedAt).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Clock className="w-5 h-5" />
							<span>{post.readingTime} min read</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-medium">By {post.author.name}</span>
							<span className="text-gray-500">•</span>
							<span className="text-gray-500">{post.author.role}</span>
						</div>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-2 mb-12">
						{post.tags.map((tag) => (
							<Link
								key={tag}
								href={`/blog?tag=${encodeURIComponent(tag)}`}
								className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200"
							>
								<Tag className="w-4 h-4" />
								{tag}
							</Link>
						))}
					</div>

					{/* Content */}
					<div className="prose prose-invert prose-cyan max-w-none">
						<div
							className="text-gray-300 leading-relaxed space-y-6"
							// In a real app, you'd use a markdown parser like react-markdown or MDX
							dangerouslySetInnerHTML={{
								__html: post.content
									.split("\n")
									.map((line) => {
										// Simple markdown-like rendering
										if (line.startsWith("# ")) {
											return `<h1 class="text-3xl font-bold text-white mt-8 mb-4">${line.slice(2)}</h1>`;
										}
										if (line.startsWith("## ")) {
											return `<h2 class="text-2xl font-bold text-white mt-6 mb-3">${line.slice(3)}</h2>`;
										}
										if (line.startsWith("- ")) {
											return `<li class="ml-6 mb-2">${line.slice(2)}</li>`;
										}
										if (line.trim() === "") {
											return "<br />";
										}
										return `<p>${line}</p>`;
									})
									.join(""),
							}}
						/>
					</div>

					{/* Share Section */}
					<div className="mt-16 pt-8 border-t border-white/10">
						<h3 className="text-xl font-bold text-white mb-4">
							Found this helpful?
						</h3>
						<p className="text-gray-400 mb-6">
							Share it with your network or reach out to discuss your project.
						</p>
						<Link
							href="/#contact"
							className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
						>
							Get in Touch
						</Link>
					</div>
				</article>

				{/* More Posts Section */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
					<h2 className="text-3xl font-bold text-white mb-8">
						More from our Blog
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{getAllPosts()
							.filter((p) => p.slug !== post.slug)
							.slice(0, 3)
							.map((relatedPost) => (
								<Link
									key={relatedPost.id}
									href={`/blog/${relatedPost.slug}`}
									className="group p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
								>
									<span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">
										{relatedPost.category}
									</span>
									<h3 className="text-lg font-bold text-white mt-4 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
										{relatedPost.title}
									</h3>
									<p className="text-gray-400 text-sm line-clamp-2">
										{relatedPost.description}
									</p>
									<div className="flex items-center gap-2 text-gray-500 text-xs mt-4">
										<Clock className="w-4 h-4" />
										<span>{relatedPost.readingTime} min read</span>
									</div>
								</Link>
							))}
					</div>
				</section>
			</main>
		</div>
	);
}
