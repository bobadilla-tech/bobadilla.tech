import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/shared/ui/SectionHeader";
import Button from "@/shared/ui/Button";
import {
	getAllPosts,
	getAllCategories,
	getPostsByCategory,
	getPostsByTag,
} from "~/lib/sanity/queries";
import { urlFor } from "~/lib/sanity/image";
import { Calendar, Clock, Tag, FileX } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { SanityPost } from "~/lib/sanity/types";

interface BlogListProps {
	searchParams: { category?: string; tag?: string };
}

export default async function BlogList({ searchParams }: BlogListProps) {
	const { category, tag } = searchParams;
	const t = await getTranslations("BlogPage");

	const posts: SanityPost[] = category
		? await getPostsByCategory(category)
		: tag
			? await getPostsByTag(tag)
			: await getAllPosts();

	const categories = getAllCategories();
	const activeFilter = category || tag;

	const formatCategory = (cat: string) => {
		if (cat === "ai") return "AI";
		return cat.charAt(0).toUpperCase() + cat.slice(1);
	};

	const pageTitle = category ? `${formatCategory(category)} Blog` : "Blog";

	return (
		<main className="pt-32 pb-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Page Header */}
				<div className="flex flex-col items-center mb-16">
					<SectionHeader
						heading={
							<>
								{pageTitle}{" "}
								<span className="text-brand-gold">{t("posts")}</span>
							</>
						}
						subtitle={t("subtitle")}
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
							{t("allPosts")}
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
						{posts.map((post) => {
							const authorImageSrc = post.author.image
								? urlFor(post.author.image).width(64).height(64).url()
								: null;

							return (
								<Link
									key={post._id}
									href={`/blog/${post.slug.current}`}
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
											<span>{t("minRead", { n: post.readingTime })}</span>
										</div>
									</div>

									<div className="flex flex-wrap gap-2 mb-4">
										{post.tags?.slice(0, 3).map((tag_item) => (
											<span
												key={tag_item}
												className="inline-flex items-center gap-1 px-2 py-1 bg-surface text-brand-primary/40 text-xs rounded font-body"
											>
												<Tag className="size-3" />
												{tag_item}
											</span>
										))}
									</div>

									<div className="mt-auto pt-4 border-t border-border flex items-center gap-2">
										{authorImageSrc ? (
											<Image
												src={authorImageSrc}
												alt={post.author.name}
												width={32}
												height={32}
												className="rounded-full object-cover"
											/>
										) : (
											<div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-brand-primary/40 text-xs font-body">
												{post.author.name.charAt(0)}
											</div>
										)}
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
							);
						})}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-24">
						<div className="p-6 bg-surface border border-border rounded-2xl max-w-md text-center">
							<FileX className="size-16 text-brand-primary/20 mx-auto mb-4" />
							<h3 className="font-heading text-xl font-bold text-brand-primary mb-2">
								{t("noPostsFound")}
							</h3>
							<p className="font-body text-brand-primary/50 mb-6">
								{activeFilter
									? t("noPostsFilterMsg", { filter: activeFilter })
									: t("noPostsEmptyMsg")}
							</p>
							<Button to="/blog" variant="gold">
								{t("viewAllPosts")}
							</Button>
						</div>
					</div>
				)}

				{/* CTA Section */}
				<section className="mt-24 text-center">
					<div className="p-12 bg-brand-gold/10 border border-border-gold rounded-2xl">
						<h2 className="font-heading text-3xl font-bold text-brand-primary mb-4">
							{t("ctaHeading")}
						</h2>
						<p className="font-body text-brand-primary/60 mb-8 max-w-2xl mx-auto">
							{t("ctaBody")}
						</p>
						<Button to="/#contact" variant="gold">
							{t("getInTouch")}
						</Button>
					</div>
				</section>
			</div>
		</main>
	);
}
