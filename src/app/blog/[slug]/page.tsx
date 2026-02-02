import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/ui/Navbar";
import ShaderBackground from "@/components/shaders/ShaderBackground";
import { getPostBySlug, getAllPosts } from "@/data/blog";
import { Calendar, Clock, Tag, ArrowLeft, Twitter, Linkedin, Share2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
	generateMetadata as generateSEOMetadata,
	BASE_URL,
	SITE_NAME,
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
			modifiedTime: post.updatedAt,
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
					<div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8 pb-8 border-b border-white/10">
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
						<div className="flex items-center gap-3">
							<Image
								src={post.author.image}
								alt={post.author.name}
								width={40}
								height={40}
								className="rounded-full object-cover"
							/>
							<div className="flex flex-col">
								<span className="font-medium text-white">{post.author.name}</span>
								<span className="text-gray-500 text-xs">{post.author.role}</span>
							</div>
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
					<div className="prose prose-invert prose-cyan max-w-none text-gray-300 leading-relaxed">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							components={{
								h1: ({ children }) => (
									<h1 className="text-3xl font-bold text-white mt-8 mb-4">
										{children}
									</h1>
								),
								h2: ({ children }) => (
									<h2 className="text-2xl font-bold text-white mt-6 mb-3">
										{children}
									</h2>
								),
								h3: ({ children }) => (
									<h3 className="text-xl font-bold text-white mt-4 mb-2">
										{children}
									</h3>
								),
								p: ({ children }) => (
									<p className="mb-4 text-gray-300">{children}</p>
								),
								ul: ({ children }) => (
									<ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
								),
								ol: ({ children }) => (
									<ol className="list-decimal ml-6 mb-4 space-y-2">
										{children}
									</ol>
								),
								li: ({ children }) => (
									<li className="text-gray-300">{children}</li>
								),
								a: ({ href, children }) => (
									<a
										href={href}
										className="text-cyan-400 hover:text-cyan-300 underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										{children}
									</a>
								),
								code: ({ children, className }) => {
									const isInline = !className;
									return isInline ? (
										<code className="bg-slate-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm">
											{children}
										</code>
									) : (
										<code className="block bg-slate-800 text-cyan-400 p-4 rounded-lg overflow-x-auto">
											{children}
										</code>
									);
								},
								blockquote: ({ children }) => (
									<blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-400 my-4">
										{children}
									</blockquote>
								),
							}}
						>
							{post.content}
						</ReactMarkdown>
					</div>

					{/* Share Section */}
					<div className="mt-16 pt-8 border-t border-white/10">
						<h3 className="text-xl font-bold text-white mb-4">
							Found this helpful?
						</h3>
						<p className="text-gray-400 mb-6">
							Share it with your network
						</p>

						{/* Social Share Buttons */}
						<div className="flex flex-wrap gap-4 mb-12">
							{/* Twitter/X */}
							<a
								href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}&via=bobadillatech`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-6 py-3 bg-black/50 hover:bg-black/70 border border-white/10 hover:border-cyan-500/50 text-white rounded-full font-medium transition-all duration-300"
							>
								<Twitter className="w-5 h-5" />
								<span>Share on X</span>
							</a>

							{/* LinkedIn */}
							<a
								href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}&source=${encodeURIComponent(SITE_NAME)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-6 py-3 bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border border-[#0077B5]/30 hover:border-[#0077B5]/50 text-white rounded-full font-medium transition-all duration-300"
							>
								<Linkedin className="w-5 h-5" />
								<span>Share on LinkedIn</span>
							</a>

							{/* Reddit */}
							<a
								href={`https://reddit.com/submit?url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-6 py-3 bg-[#FF4500]/20 hover:bg-[#FF4500]/30 border border-[#FF4500]/30 hover:border-[#FF4500]/50 text-white rounded-full font-medium transition-all duration-300"
							>
								<Share2 className="w-5 h-5" />
								<span>Share on Reddit</span>
							</a>
						</div>

						{/* Promotional CTAs */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
							{/* Requiem API CTA */}
							<div className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all duration-300">
								<h4 className="text-lg font-bold text-white mb-2">
									Need Enterprise APIs?
								</h4>
								<p className="text-gray-400 text-sm mb-4">
									Use our Requiem API for scalable, production-ready solutions
								</p>
								<Link
									href="/#contact"
									className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
								>
									Learn More
									<ArrowLeft className="w-4 h-4 rotate-180" />
								</Link>
							</div>

							{/* Consultancy CTA */}
							<div className="p-6 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all duration-300">
								<h4 className="text-lg font-bold text-white mb-2">
									Need Development Services?
								</h4>
								<p className="text-gray-400 text-sm mb-4">
									Get expert consultancy to build your next product
								</p>
								<Link
									href="/#contact"
									className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
								>
									Get in Touch
									<ArrowLeft className="w-4 h-4 rotate-180" />
								</Link>
							</div>
						</div>
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
