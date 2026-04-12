import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getAllPosts } from "~/lib/sanity/queries";
import { urlFor } from "~/lib/sanity/image";
import { portableTextComponents } from "~/lib/sanity/portable-text";
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import { Twitter, Linkedin } from "@/components/ui/BrandIcons";
import { getTranslations } from "next-intl/server";
import { BASE_URL, SITE_NAME } from "~/lib/seo";
import { EXTERNAL_LINKS } from "~/lib/constants";

interface BlogPostProps {
	slug: string;
}

export default async function BlogPost({ slug }: BlogPostProps) {
	const t = await getTranslations("BlogPostPage");
	const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);

	if (!post) {
		notFound();
	}

	const authorImageSrc = post.author.image
		? urlFor(post.author.image).width(80).height(80).url()
		: null;

	const relatedPosts = allPosts
		.filter((p) => p.slug.current !== post.slug.current)
		.slice(0, 3);

	return (
		<main className="pt-32 pb-24">
			<article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Back Button */}
				<Link
					href="/blog"
					className="inline-flex items-center gap-2 text-brand-primary/50 hover:text-brand-gold transition-colors duration-200 mb-8 font-body"
				>
					<ArrowLeft className="w-4 h-4" />
					{t("backToBlog")}
				</Link>

				{/* Category Badge */}
				<div className="mb-6">
					<span className="px-4 py-2 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full font-body">
						{post.category === "ai"
							? "AI"
							: post.category.charAt(0).toUpperCase() + post.category.slice(1)}
					</span>
				</div>

				{/* Title */}
				<h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-primary mb-6">
					{post.title}
				</h1>

				{/* Description */}
				<p className="font-body text-xl text-brand-primary/60 mb-8">
					{post.description}
				</p>

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
						<span>{t("minRead", { n: post.readingTime })}</span>
					</div>
					<div className="flex items-center gap-3">
						{authorImageSrc ? (
							<Image
								src={authorImageSrc}
								alt={post.author.name}
								width={40}
								height={40}
								className="rounded-full object-cover"
							/>
						) : (
							<div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-brand-primary/40 font-body">
								{post.author.name.charAt(0)}
							</div>
						)}
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
					{post.tags?.map((tag) => (
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

				{/* Cover Image */}
				{post.coverImage && (
					<div className="mb-12 rounded-2xl overflow-hidden">
						<Image
							src={urlFor(post.coverImage).width(896).height(504).url()}
							alt={post.title}
							width={896}
							height={504}
							className="w-full"
						/>
					</div>
				)}

				{/* Body */}
				<div className="prose prose-invert max-w-none">
					<PortableText value={post.body} components={portableTextComponents} />
				</div>

				{/* Share Section */}
				<div className="mt-16 pt-8 border-t border-border">
					<h3 className="font-heading text-xl font-bold text-brand-primary mb-4">
						{t("foundHelpful")}
					</h3>
					<p className="font-body text-brand-primary/50 mb-6">
						{t("shareNetwork")}
					</p>

					<div className="flex flex-wrap gap-4 mb-12">
						<a
							href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug.current}`)}&via=bobadillatech`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-6 py-3 bg-surface hover:bg-surface-hover border border-border hover:border-border-gold text-brand-primary rounded-full font-body font-medium transition-all duration-300"
						>
							<Twitter className="w-5 h-5" />
							<span>{t("shareOnX")}</span>
						</a>

						<a
							href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug.current}`)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}&source=${encodeURIComponent(SITE_NAME)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-6 py-3 bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border border-[#0077B5]/30 hover:border-[#0077B5]/50 text-brand-primary rounded-full font-body font-medium transition-all duration-300"
						>
							<Linkedin className="w-5 h-5" />
							<span>{t("shareOnLinkedIn")}</span>
						</a>

						<a
							href={`https://reddit.com/submit?url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug.current}`)}&title=${encodeURIComponent(post.title)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-6 py-3 bg-[#FF4500]/20 hover:bg-[#FF4500]/30 border border-[#FF4500]/30 hover:border-[#FF4500]/50 text-brand-primary rounded-full font-body font-medium transition-all duration-300"
						>
							<Share2 className="w-5 h-5" />
							<span>{t("shareOnReddit")}</span>
						</a>
					</div>
				</div>

				{/* Promotional CTAs */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-8 border-t border-border">
					<div className="p-6 bg-surface border border-border rounded-xl hover:border-border-gold transition-all duration-300">
						<h4 className="font-heading text-lg font-bold text-brand-primary mb-2">
							{t("enterpriseAPIsHeading")}
						</h4>
						<p className="font-body text-brand-primary/50 text-sm mb-4">
							{t("enterpriseAPIsBody")}
						</p>
						<a
							href={EXTERNAL_LINKS.apis}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-body font-medium transition-colors duration-300"
						>
							{t("learnMore")}
							<ArrowLeft className="w-4 h-4 rotate-180" />
						</a>
					</div>

					<div className="p-6 bg-brand-gold/10 border border-border-gold rounded-xl hover:border-brand-gold/60 transition-all duration-300">
						<h4 className="font-heading text-lg font-bold text-brand-primary mb-2">
							{t("devServicesHeading")}
						</h4>
						<p className="font-body text-brand-primary/50 text-sm mb-4">
							{t("devServicesBody")}
						</p>
						<Link
							href="/#contact"
							className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-body font-medium transition-colors duration-300"
						>
							{t("getInTouch")}
							<ArrowLeft className="w-4 h-4 rotate-180" />
						</Link>
					</div>
				</div>
			</article>

			{/* More Posts Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
				{relatedPosts.length === 0 ? (
					<div className="text-center py-12">
						<h2 className="font-heading text-3xl font-bold text-brand-primary mb-4">
							{t("stayTuned")}
						</h2>
						<p className="font-body text-brand-primary/50 text-lg">
							{t("moreSoonMsg")}
						</p>
					</div>
				) : (
					<>
						<h2 className="font-heading text-3xl font-bold text-brand-primary mb-8">
							{t("morePosts")}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{relatedPosts.map((relatedPost) => (
								<Link
									key={relatedPost._id}
									href={`/blog/${relatedPost.slug.current}`}
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
										<span>{t("minRead", { n: relatedPost.readingTime })}</span>
									</div>
								</Link>
							))}
						</div>
					</>
				)}
			</section>
		</main>
	);
}
