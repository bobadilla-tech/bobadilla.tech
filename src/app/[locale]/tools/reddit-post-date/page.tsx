"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import {
	Calendar,
	Clock,
	Globe,
	Copy,
	CheckCircle2,
	AlertCircle,
	Loader2,
} from "lucide-react";
import { fetchRedditPostDate, type RedditPostDate } from "./utils";

export default function RedditPostDateExtractor() {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<RedditPostDate | null>(null);
	const [copied, setCopied] = useState<"utc" | "local" | null>(null);

	const extractPostDate = async () => {
		setLoading(true);
		setError("");
		setResult(null);

		try {
			const postDate = await fetchRedditPostDate(url);
			setResult(postDate);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An error occurred while extracting the date."
			);
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboard = (text: string, type: "utc" | "local") => {
		navigator.clipboard.writeText(text);
		setCopied(type);
		setTimeout(() => setCopied(null), 2000);
	};

	return (
		<div className="relative min-h-screen">
			<Navbar />

			<main className="pt-32 pb-24">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumb */}
					<div className="mb-8">
						<div className="flex items-center space-x-2 text-sm text-brand-primary/40 font-body">
							<Link href="/" className="hover:text-brand-primary transition-colors">
								Home
							</Link>
							<span>/</span>
							<Link
								href="/tools"
								className="hover:text-brand-primary transition-colors"
							>
								Tools
							</Link>
							<span>/</span>
							<span className="text-brand-primary">Reddit Post Date Extractor</span>
						</div>
					</div>

					{/* Header */}
					<div className="mb-12 text-center">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-2xl mb-6">
							<Calendar className="w-8 h-8 text-brand-gold" />
						</div>
						<h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-primary mb-4">
							Reddit Post Date Extractor
						</h1>
						<p className="font-body text-xl text-brand-primary/60 max-w-2xl mx-auto">
							Get the exact creation date and time of any Reddit post
						</p>
					</div>

					{/* Tool Interface */}
					<div className="bg-surface border border-border rounded-2xl p-8 mb-12">
						<div className="space-y-6">
							{/* URL Input */}
							<div>
								<label
									htmlFor="reddit-url"
									className="block text-sm font-medium text-brand-primary/70 mb-2 font-body"
								>
									Reddit Post URL
								</label>
								<input
									type="text"
									id="reddit-url"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									placeholder="https://www.reddit.com/r/help/comments/115a9aq/how_to_see_exact_date_when_you_made_a_post/"
									className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-brand-primary placeholder-brand-primary/30 focus:outline-none focus:border-brand-gold/50 transition-colors duration-300 font-body"
									disabled={loading}
								/>
							</div>

							{/* Extract Button */}
							<button
								onClick={extractPostDate}
								disabled={!url || loading}
								className="w-full py-3 bg-brand-gold text-black rounded-lg font-semibold font-body hover:bg-brand-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
							>
								{loading ? (
									<>
										<Loader2 className="w-5 h-5 animate-spin" />
										<span>Extracting...</span>
									</>
								) : (
									<>
										<Clock className="w-5 h-5" />
										<span>Get Post Date</span>
									</>
								)}
							</button>

							{/* Error Message */}
							{error && (
								<div className="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
									<AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
									<p className="font-body text-red-400 text-sm">{error}</p>
								</div>
							)}

							{/* Results */}
							{result && (
								<div className="space-y-4 pt-4">
									<h3 className="font-heading text-lg font-semibold text-brand-primary">
										Post Date Found!
									</h3>

									{/* UTC Date */}
									<div className="p-4 bg-surface border border-border rounded-lg">
										<div className="flex items-center justify-between mb-2">
											<div className="flex items-center space-x-2">
												<Globe className="w-4 h-4 text-brand-gold" />
												<span className="font-body text-sm font-medium text-brand-primary/50">
													UTC Time
												</span>
											</div>
											<button
												onClick={() => copyToClipboard(result.utcDate, "utc")}
												aria-label={copied === "utc" ? "Copied UTC date" : "Copy UTC date"}
												className="p-1.5 hover:bg-surface-hover rounded transition-colors duration-200"
											>
												{copied === "utc" ? (
													<CheckCircle2 className="w-4 h-4 text-green-400" />
												) : (
													<Copy className="w-4 h-4 text-brand-primary/40" />
												)}
											</button>
										</div>
										<p className="font-mono text-brand-primary">{result.utcDate}</p>
									</div>

									{/* Local Date */}
									<div className="p-4 bg-surface border border-border rounded-lg">
										<div className="flex items-center justify-between mb-2">
											<div className="flex items-center space-x-2">
												<Clock className="w-4 h-4 text-brand-gold" />
												<span className="font-body text-sm font-medium text-brand-primary/50">
													Your Local Time
												</span>
											</div>
											<button
												onClick={() =>
													copyToClipboard(result.localDate, "local")
												}
												aria-label={copied === "local" ? "Copied local date" : "Copy local date"}
												className="p-1.5 hover:bg-surface-hover rounded transition-colors duration-200"
											>
												{copied === "local" ? (
													<CheckCircle2 className="w-4 h-4 text-green-400" />
												) : (
													<Copy className="w-4 h-4 text-brand-primary/40" />
												)}
											</button>
										</div>
										<p className="font-mono text-brand-primary">{result.localDate}</p>
									</div>

									{/* Additional Info */}
									<div className="pt-2 text-sm text-brand-primary/40 font-body">
										<p>
											Post ID:{" "}
											<span className="text-brand-primary font-mono">
												{result.postId}
											</span>
										</p>
										<p>
											Unix Timestamp:{" "}
											<span className="text-brand-primary font-mono">
												{result.timestamp}
											</span>
										</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Information Sections */}
					<div className="space-y-8">
						{/* How It Works */}
						<div className="bg-surface border border-border rounded-2xl p-8">
							<h2 className="font-heading text-2xl font-bold text-brand-primary mb-4">
								How Does It Work?
							</h2>
							<p className="font-body text-brand-primary/70 leading-relaxed">
								Reddit embeds each post&apos;s exact creation date in its
								publicly accessible API. This tool fetches the post data and
								extracts the creation timestamp, then provides it to you in both
								UTC and your local timezone, giving a universal and localized
								perspective on the exact moment the post was made.
							</p>
						</div>

						{/* Use Cases */}
						<div className="bg-surface border border-border rounded-2xl p-8">
							<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
								Why Use This Tool?
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="font-heading text-lg font-semibold text-brand-primary mb-2">
										Research & Investigations
									</h3>
									<p className="font-body text-brand-primary/60 text-sm">
										Journalists and researchers can confirm when a post first
										appeared, ensuring accurate timelines.
									</p>
								</div>
								<div>
									<h3 className="font-heading text-lg font-semibold text-brand-primary mb-2">
										Verification
									</h3>
									<p className="font-body text-brand-primary/60 text-sm">
										Fact-checkers and moderators can validate claims by
										confirming the post&apos;s original publish date.
									</p>
								</div>
								<div>
									<h3 className="font-heading text-lg font-semibold text-brand-primary mb-2">
										Record-Keeping
									</h3>
									<p className="font-body text-brand-primary/60 text-sm">
										Archivists and digital historians can keep precise records
										of internet discussions.
									</p>
								</div>
								<div>
									<h3 className="font-heading text-lg font-semibold text-brand-primary mb-2">
										Accurate Citations
									</h3>
									<p className="font-body text-brand-primary/60 text-sm">
										Writers and students can reference Reddit posts with correct
										date and time stamps.
									</p>
								</div>
							</div>
						</div>

						{/* Instructions */}
						<div className="bg-surface border border-border rounded-2xl p-8">
							<h2 className="font-heading text-2xl font-bold text-brand-primary mb-4">
								Instructions
							</h2>
							<ol className="space-y-3 font-body text-brand-primary/70">
								<li className="flex items-start space-x-3">
									<span className="shrink-0 w-6 h-6 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center text-sm font-semibold">
										1
									</span>
									<span>
										Copy the URL from your browser&apos;s address bar (or use
										the &apos;Share&apos; menu if on mobile).
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="shrink-0 w-6 h-6 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center text-sm font-semibold">
										2
									</span>
									<span>Paste the URL into the input field above.</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="shrink-0 w-6 h-6 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center text-sm font-semibold">
										3
									</span>
									<span>
										Click &quot;Get Post Date&quot; to extract the exact
										creation time.
									</span>
								</li>
							</ol>
						</div>

						{/* Privacy Note */}
						<div className="bg-brand-gold/5 border border-border-gold rounded-2xl p-6">
							<p className="font-body text-brand-primary/60 text-sm">
								<span className="font-semibold text-brand-primary">Privacy Note:</span>{" "}
								We do not store or share your URLs. They&apos;re used solely to
								retrieve the creation date for you. All processing happens in
								your browser.
							</p>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
