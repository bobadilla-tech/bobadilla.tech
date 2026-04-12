import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "~/db/client";
import { contactMessages } from "~/db/schema";
import { desc } from "drizzle-orm";

export default async function MessagesView() {
	const { env } = await getCloudflareContext();
	const db = getDb(env.DB);
	const messages = await db
		.select()
		.from(contactMessages)
		.orderBy(desc(contactMessages.createdAt));

	return (
		<>
			{/* Page header */}
			<div className="flex items-baseline gap-3 mb-8">
				<h1 className="font-heading text-2xl font-bold text-brand-primary">
					Messages
				</h1>
				<span className="text-sm text-brand-primary/40">
					{messages.length} total
				</span>
			</div>

			{messages.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-24 text-center">
					<div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center mb-4">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-brand-primary/30"
						>
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
						</svg>
					</div>
					<p className="font-heading font-medium text-brand-primary/50 mb-1">
						No messages yet
					</p>
					<p className="text-sm text-brand-primary/30">
						Contact form submissions will appear here.
					</p>
				</div>
			) : (
				<div className="space-y-3">
					{messages.map((msg) => (
						<div
							key={msg.id}
							className="bg-surface border border-border rounded-xl p-5 hover:border-border-gold/50 transition-colors"
						>
							{/* Card header */}
							<div className="flex items-start justify-between gap-4 mb-3">
								<div className="flex items-center gap-3 min-w-0">
									{/* Avatar */}
									<div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-border-gold flex items-center justify-center shrink-0">
										<span className="text-brand-gold text-xs font-heading font-semibold">
											{msg.name.charAt(0).toUpperCase()}
										</span>
									</div>
									<div className="min-w-0">
										<p className="font-heading font-semibold text-brand-primary text-sm truncate">
											{msg.name}
										</p>
										<div className="flex items-center gap-2 flex-wrap">
											<a
												href={`mailto:${msg.email}`}
												className="text-xs text-brand-gold hover:underline"
											>
												{msg.email}
											</a>
											{msg.company && (
												<>
													<span className="text-border text-xs">·</span>
													<span className="text-xs text-brand-primary/50">
														{msg.company}
													</span>
												</>
											)}
										</div>
									</div>
								</div>

								<time className="text-xs text-brand-primary/40 whitespace-nowrap shrink-0 pt-0.5">
									{new Date(msg.createdAt).toLocaleString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</time>
							</div>

							{/* Message body */}
							<p className="text-sm text-brand-primary/80 leading-relaxed pl-11 whitespace-pre-wrap">
								{msg.message}
							</p>
						</div>
					))}
				</div>
			)}
		</>
	);
}
