import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "~/lib/auth";
import { SignOutButton } from "@/features/admin";

export default async function ProtectedAdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { env } = getCloudflareContext();
	const auth = createAuth(env.DB);
	
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session || session.user.role !== "admin") {
		redirect("/admin/sign-in");
	}

	return (
		<div className="min-h-screen flex flex-col">
			<header className="border-b border-border px-6 py-3.5 flex items-center justify-between shrink-0">
				<div className="flex items-center gap-3">
					<span className="font-heading font-semibold text-brand-gold text-sm">
						bobadilla.tech
					</span>
					<span className="text-border text-xs">/</span>
					<nav className="flex items-center gap-1">
						<a
							href="/admin/leads"
							className="px-3 py-1.5 rounded-lg text-sm text-brand-primary/70 hover:text-brand-primary hover:bg-surface transition-colors"
						>
							Leads
						</a>
						<a
							href="/admin/messages"
							className="px-3 py-1.5 rounded-lg text-sm text-brand-primary/70 hover:text-brand-primary hover:bg-surface transition-colors"
						>
							Messages
						</a>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<span className="text-xs text-brand-primary/40 hidden sm:block">
						{session.user.email}
					</span>
					<SignOutButton />
				</div>
			</header>

			<main className="flex-1 px-6 py-8 max-w-7xl w-full mx-auto">
				{children}
			</main>
		</div>
	);
}
