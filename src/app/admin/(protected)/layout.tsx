import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "~/lib/auth";

export default async function ProtectedAdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { env } = await getCloudflareContext();
	const auth = createAuth(env.DB);
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session || session.user.role !== "admin") {
		redirect("/admin/sign-in");
	}

	return (
		<>
			<header className="border-b border-border px-8 py-4 flex items-center justify-between">
				<span className="font-heading font-semibold text-brand-gold">
					bobadilla.tech / admin
				</span>
				<nav className="flex gap-6 text-sm text-brand-primary/70">
					<a
						href="/admin/messages"
						className="hover:text-brand-primary transition-colors"
					>
						Messages
					</a>
				</nav>
			</header>
			<main className="p-8">{children}</main>
		</>
	);
}
