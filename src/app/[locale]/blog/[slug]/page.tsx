import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getPostBySlug, getAllPosts } from "@/data/blog";
import {
	Calendar,
	Clock,
	Tag,
	ArrowLeft,
	Twitter,
	Linkedin,
	Share2,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
	generateMetadata as generateSEOMetadata,
	BASE_URL,
	SITE_NAME,
} from "~/lib/seo";
import { EXTERNAL_LINKS } from "~/lib/constants";

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
		<div className="relative min-h-screen">
			<Navbar />

			<main className="pt-32 pb-24">
				<article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Back Button */}
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-brand-primary/50 hover:text-brand-gold transition-colors duration-200 mb-8 font-body"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Blog
					</Link>

					{/* Category Badge */}
					<div className="mb-6">
						<span className="px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full font-body">
							{post.category}
						</span>
					</div>

					{/* Title */}
					<h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-primary mb-6">
						{post.title}
					</h1>

					{/* Description */}
					<p className="font-body text-xl text-brand-primary/60 mb-8">{post.description}</p>

					{/* Meta Information */}
					<div className="flex flex-wrap items-center gap-6 text-brand-primary/40 text-sm mb-8 pb-8 border-b border-border font-body">
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
								<span className="font-medium text-brand-primary">
									{post.author.name}
								</span>
								<span className="text-brand-primary/30 text-xs">
									{post.author.role}
								</span>
							</div>
						</div>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-2 mb-12">
						{post.tags.map((tag) => (
							<Link
								key={tag}
								href={`/blog?tag=${encodeURIComponent(tag)}`}
								className="inline-flex items-center gap-1 px-3 py-1 bg-surface text-brand-primary/50 text-sm rounded-lg hover:bg-brand-gold/10 hover:text-brand-gold transition-all duration-200 font-body"
							>
								<Tag className="w-4 h-4" />
								{tag}
							</Link>
						))}
					</div>

					{/* Content */}
					<div className="prose prose-invert max-w-none text-brand-primary/80 leading-relaxed">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							components={{
								h1: ({ children }) => (
									<h1 className="font-heading text-3xl font-bold text-brand-primary mt-8 mb-4">
										{children}
									</h1>
								),
								h2: ({ children }) => (
									<h2 className="font-heading text-2xl font-bold text-brand-primary mt-6 mb-3">
										{children}
									</h2>
								),
								h3: ({ children }) => (
									<h3 className="font-heading text-xl font-bold text-brand-primary mt-4 mb-2">
										{children}
									</h3>
								),
								p: ({ children }) => (
									<p className="font-body mb-4 text-brand-primary/70">{children}</p>
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
									<li className="font-body text-brand-primary/70">{children}</li>
								),
								a: ({ href, children }) => (
									<a
										href={href}
										className="text-brand-gold hover:text-brand-gold-light underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										{children}
									</a>
								),
								code: ({ children, className }) => {
									const match = /language-(\w+)/.exec(className || "");
									const language = match ? match[1] : "";
									const isInline = !className;

									return isInline ? (
										<code className="bg-surface text-brand-gold px-1.5 py-0.5 rounded text-sm font-mono">
											{children}
										</code>
									) : (
										<div className="my-6 rounded-xl overflow-hidden">
											<CodeBlock language={language}>
												{String(children).replace(/\n$/, "")}
											</CodeBlock>
										</div>
									);
								},
								blockquote: ({ children }) => (
									<blockquote className="border-l-4 border-brand-gold pl-4 italic text-brand-primary/50 my-4">
										{children}
									</blockquote>
								),
							}}
						>
							{post.content}
						</ReactMarkdown>
					</div>

					{/* Share Section */}
					<div className="mt-16 pt-8 border-t border-border">
						<h3 className="font-heading text-xl font-bold text-brand-primary mb-4">
							Found this helpful?
						</h3>
						<p className="font-body text-brand-primary/50 mb-6">Share it with your network</p>

						{/* Social Share Buttons */}
						<div className="flex flex-wrap gap-4 mb-12">
							{/* Twitter/X */}
							<a
								href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}&via=bobadillatech`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-6 py-3 bg-surface hover:bg-surface-hover border border-border hover:border-border-gold text-brand-primary rounded-full font-body font-medium transition-all duration-300"
							>
								<Twitter className="w-5 h-5" />
								<span>Share on X</span>
							</a>

							{/* LinkedIn */}
							<a
								href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}&source=${encodeURIComponent(SITE_NAME)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-6 py-3 bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border border-[#0077B5]/30 hover:border-[#0077B5]/50 text-brand-primary rounded-full font-body font-medium transition-all duration-300"
							>
								<Linkedin className="w-5 h-5" />
								<span>Share on LinkedIn</span>
							</a>

							{/* Reddit */}
							<a
								href={`https://reddit.com/submit?url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-6 py-3 bg-[#FF4500]/20 hover:bg-[#FF4500]/30 border border-[#FF4500]/30 hover:border-[#FF4500]/50 text-brand-primary rounded-full font-body font-medium transition-all duration-300"
							>
								<Share2 className="w-5 h-5" />
								<span>Share on Reddit</span>
							</a>
						</div>
					</div>

					{/* Promotional CTAs */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-8 border-t border-border">
						{/* Requiem API CTA */}
						<div className="p-6 bg-surface border border-border rounded-xl hover:border-border-gold transition-all duration-300">
							<h4 className="font-heading text-lg font-bold text-brand-primary mb-2">
								Need Enterprise APIs?
							</h4>
							<p className="font-body text-brand-primary/50 text-sm mb-4">
								Use our Requiem API for scalable, production-ready solutions
							</p>
							<a
								href={EXTERNAL_LINKS.apis}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-body font-medium transition-colors duration-300"
							>
								Learn More
								<ArrowLeft className="w-4 h-4 rotate-180" />
							</a>
						</div>

						{/* Consultancy CTA */}
						<div className="p-6 bg-brand-gold/10 border border-border-gold rounded-xl hover:border-brand-gold/60 transition-all duration-300">
							<h4 className="font-heading text-lg font-bold text-brand-primary mb-2">
								Need Development Services?
							</h4>
							<p className="font-body text-brand-primary/50 text-sm mb-4">
								Get expert consultancy to build your next product
							</p>
							<Link
								href="/#contact"
								className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-body font-medium transition-colors duration-300"
							>
								Get in Touch
								<ArrowLeft className="w-4 h-4 rotate-180" />
							</Link>
						</div>
					</div>
				</article>

				{/* More Posts Section */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
					{(() => {
						const relatedPosts = getAllPosts()
							.filter((p) => p.slug !== post.slug)
							.slice(0, 3);

						if (relatedPosts.length === 0) {
							return (
								<div className="text-center py-12">
									<h2 className="font-heading text-3xl font-bold text-brand-primary mb-4">
										Stay Tuned
									</h2>
									<p className="font-body text-brand-primary/50 text-lg">
										More content coming soon. Follow us for updates!
									</p>
								</div>
							);
						}

						return (
							<>
								<h2 className="font-heading text-3xl font-bold text-brand-primary mb-8">
									More from our Blog
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									{relatedPosts.map((relatedPost) => (
										<Link
											key={relatedPost.id}
											href={`/blog/${relatedPost.slug}`}
											className="group p-6 bg-surface border border-border rounded-2xl hover:border-border-gold transition-all duration-300 hover:scale-[1.02]"
										>
											<span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full font-body">
												{relatedPost.category}
											</span>
											<h3 className="font-heading text-lg font-bold text-brand-primary mt-4 mb-2 group-hover:text-brand-gold transition-colors duration-300">
												{relatedPost.title}
											</h3>
											<p className="font-body text-brand-primary/50 text-sm line-clamp-2">
												{relatedPost.description}
											</p>
											<div className="flex items-center gap-2 text-brand-primary/30 text-xs mt-4 font-body">
												<Clock className="w-4 h-4" />
												<span>{relatedPost.readingTime} min read</span>
											</div>
										</Link>
									))}
								</div>
							</>
						);
					})()}
				</section>
			</main>

			<Footer />
		</div>
	);
}
