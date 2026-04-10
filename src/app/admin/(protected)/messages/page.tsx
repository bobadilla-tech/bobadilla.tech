import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "~/db/client";
import { contactMessages } from "~/db/schema";
import { desc } from "drizzle-orm";

export default async function MessagesPage() {
	const { env } = await getCloudflareContext();
	const db = getDb(env.DB);
	const messages = await db
		.select()
		.from(contactMessages)
		.orderBy(desc(contactMessages.createdAt));

	return (
		<>
			<h1 className="font-heading text-3xl font-bold text-brand-primary mb-8">
				Contact Messages
				<span className="ml-3 text-base font-body font-normal text-brand-primary/50">
					{messages.length} total
				</span>
			</h1>

			{messages.length === 0 ? (
				<p className="text-brand-primary/50">No messages yet.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-brand-primary border-collapse">
						<thead>
							<tr className="border-b border-border text-left">
								<th className="pb-3 pr-6 font-medium text-brand-primary/50">
									Name
								</th>
								<th className="pb-3 pr-6 font-medium text-brand-primary/50">
									Email
								</th>
								<th className="pb-3 pr-6 font-medium text-brand-primary/50">
									Company
								</th>
								<th className="pb-3 pr-6 font-medium text-brand-primary/50">
									Message
								</th>
								<th className="pb-3 font-medium text-brand-primary/50 whitespace-nowrap">
									Received
								</th>
							</tr>
						</thead>
						<tbody>
							{messages.map((msg) => (
								<tr
									key={msg.id}
									className="border-b border-border/50 hover:bg-surface transition-colors"
								>
									<td className="py-4 pr-6">{msg.name}</td>
									<td className="py-4 pr-6">
										<a
											href={`mailto:${msg.email}`}
											className="text-brand-gold hover:underline"
										>
											{msg.email}
										</a>
									</td>
									<td className="py-4 pr-6 text-brand-primary/70">
										{msg.company ?? "—"}
									</td>
									<td className="py-4 pr-6 max-w-xs">
										<span title={msg.message} className="line-clamp-2">
											{msg.message}
										</span>
									</td>
									<td className="py-4 whitespace-nowrap text-brand-primary/50">
										{new Date(msg.createdAt).toLocaleString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
